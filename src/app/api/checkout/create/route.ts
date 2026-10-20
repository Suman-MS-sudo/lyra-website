import { NextRequest, NextResponse } from "next/server";
import { clean, rateLimited } from "@/lib/mail";
import { buildLines, compactItems, parseCustomer, reference, totalsFor } from "@/lib/order-core";
import { createOrder, razorpayConfigured, razorpayKeyId } from "@/lib/razorpay";

export const runtime = "nodejs";

/**
 * Step 1 of online payment: validate the cart + buyer, price it from the catalogue and open a
 * Razorpay order for exactly that amount. The browser then opens Razorpay Checkout with it.
 */
export async function POST(req: NextRequest) {
  if (!razorpayConfigured()) {
    return NextResponse.json(
      { error: "Online payment is temporarily unavailable. Please call +91-81223 78860 to place your order.", code: "not_configured" },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited("checkout", ip, 12)) {
    return NextResponse.json({ error: "Too many attempts. Please wait a few minutes or call us." }, { status: 429 });
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (clean(body.website, 200)) return NextResponse.json({ error: "Please check your details." }, { status: 400 });

    const { customer, errors } = parseCustomer(body);
    const lines = buildLines(body.items);
    if (lines.length === 0) errors.push("items");
    if (errors.length) return NextResponse.json({ error: "Please check your details.", fields: errors }, { status: 400 });

    const { total } = totalsFor(lines);
    const ref = reference();
    const c = customer;

    // Notes travel with the payment, so the webhook can still identify the order if the tab is closed.
    const order = await createOrder({
      amountPaise: total * 100,
      receipt: ref,
      notes: {
        ref,
        name: c.name.slice(0, 250),
        phone: c.phone,
        email: c.email.slice(0, 250),
        organisation: c.organisation.slice(0, 250),
        gstin: c.gstin,
        address: `${c.address}, ${c.city}, ${c.state} - ${c.pincode}`.slice(0, 250),
        items: compactItems(lines),
      },
    });

    return NextResponse.json({
      keyId: razorpayKeyId(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      reference: ref,
    });
  } catch (err) {
    console.error("Checkout create error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "We couldn't start the payment. Please try again or call +91-81223 78860." }, { status: 502 });
  }
}
