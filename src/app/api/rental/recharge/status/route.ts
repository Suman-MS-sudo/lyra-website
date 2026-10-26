import { NextRequest, NextResponse } from "next/server";
import { clean, rateLimited } from "@/lib/mail";
import { fetchOrder, fetchOrderPayments, razorpayConfigured } from "@/lib/razorpay";
import { markRechargeFailed } from "@/lib/rental-db";
import { confirmPaidRecharge } from "@/lib/rental-recharge-mail";

export const runtime = "nodejs";

/** Called when the Razorpay window is closed: asks Razorpay whether the recharge was paid anyway. */
export async function POST(req: NextRequest) {
  if (!razorpayConfigured()) return NextResponse.json({ paid: false }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited("rental-recharge-status", ip, 20)) return NextResponse.json({ paid: false }, { status: 429 });
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const orderId = clean(body.order_id, 64);
    if (!/^order_[A-Za-z0-9]+$/.test(orderId)) return NextResponse.json({ paid: false }, { status: 400 });

    const order = await fetchOrder(orderId);
    if (order.notes?.kind !== "recharge") return NextResponse.json({ paid: false }, { status: 400 });
    if (order.status !== "paid") {
      // Left unpaid: mark it so it doesn't look pending forever (a later webhook can still apply it).
      await markRechargeFailed(orderId).catch(() => undefined);
      return NextResponse.json({ paid: false, status: order.status });
    }
    const payments = await fetchOrderPayments(orderId);
    const paymentId = (payments.find((p) => p.status === "captured") ?? payments.find((p) => p.status === "authorized"))?.id ?? "";
    const a = await confirmPaidRecharge(order, paymentId);
    return NextResponse.json({ paid: true, code: a?.rental_code, paidUntil: a?.paid_until, prepaidMonths: a?.prepaid_months, amount: order.amount / 100, paymentId });
  } catch (err) {
    console.error("Rental recharge status error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
