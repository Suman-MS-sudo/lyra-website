import { NextRequest, NextResponse } from "next/server";
import { clean, rateLimited } from "@/lib/mail";
import { createOrder, razorpayConfigured, razorpayKeyId } from "@/lib/razorpay";
import { createRecharge, findAgreement, supabaseConfigured } from "@/lib/rental-db";
import { RECHARGE_PLANS, rechargeCharge, type RechargePeriod } from "@/lib/rental";

export const runtime = "nodejs";

const normPhone = (v: unknown) => clean(v, 20).replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");

/** Recharge step 1: re-check code + mobile, price the period server-side and open a Razorpay order. */
export async function POST(req: NextRequest) {
  if (!razorpayConfigured() || !supabaseConfigured()) {
    return NextResponse.json({ error: "Online recharge is temporarily unavailable. Please call +91-81223 78860." }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited("rental-recharge", ip, 12)) {
    return NextResponse.json({ error: "Too many attempts. Please wait a few minutes or call us." }, { status: 429 });
  }
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const code = clean(body.code, 40).toUpperCase();
    const phone = normPhone(body.phone);
    const period = RECHARGE_PLANS.find((p) => p.id === body.period)?.id as RechargePeriod | undefined;
    const source = body.source === "dashboard" ? "dashboard" : "website";
    if (!period) return NextResponse.json({ error: "Choose Monthly, Quarterly or Yearly." }, { status: 400 });

    const a = await findAgreement(code, phone);
    if (!a || a.status !== "open") return NextResponse.json({ error: "We couldn't find an active rental with that code and mobile number." }, { status: 404 });

    const c = rechargeCharge(Number(a.monthly_rent), period);
    const order = await createOrder({
      amountPaise: Math.round(c.total * 100),
      receipt: `${a.rental_code}-${period[0].toUpperCase()}${Date.now().toString(36).slice(-4).toUpperCase()}`.slice(0, 40),
      notes: {
        kind: "recharge",
        ref: a.rental_code,
        code: a.rental_code,
        agreement_id: a.id,
        period,
        name: a.customer_name.slice(0, 250),
        phone: a.customer_phone,
        email: a.customer_email.slice(0, 250),
        items: `RECHARGE ${a.rental_code} ${period} (${c.months} mo)`,
      },
    });
    await createRecharge(a, period, order.id, source);

    return NextResponse.json({
      keyId: razorpayKeyId(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      reference: a.rental_code,
      prefill: { name: a.customer_name, email: a.customer_email, contact: a.customer_phone },
    });
  } catch (err) {
    console.error("Rental recharge create error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "We couldn't start the payment. Please try again or call +91-81223 78860." }, { status: 502 });
  }
}
