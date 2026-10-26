import { NextRequest, NextResponse } from "next/server";
import { clean } from "@/lib/mail";
import { parseCustomer } from "@/lib/order-core";
import { fetchOrder, razorpayConfigured, verifyPaymentSignature } from "@/lib/razorpay";
import { confirmPaidRental, parseRental } from "@/lib/rental-order";

export const runtime = "nodejs";

/** Rental step 2: verify Razorpay's signed payment, load the order, then email the team and the customer. */
export async function POST(req: NextRequest) {
  if (!razorpayConfigured()) return NextResponse.json({ error: "Payments are not configured." }, { status: 503 });

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const orderId = clean(body.razorpay_order_id, 64);
    const paymentId = clean(body.razorpay_payment_id, 64);
    const signature = clean(body.razorpay_signature, 128);

    if (!orderId || !paymentId || !signature || !verifyPaymentSignature(orderId, paymentId, signature)) {
      return NextResponse.json({ error: "We could not verify this payment. If money was debited, call us with your UPI/bank reference." }, { status: 400 });
    }

    const order = await fetchOrder(orderId);
    const ref = order.receipt || order.notes?.ref || orderId;
    const { customer } = parseCustomer(body);

    const codes = await confirmPaidRental({ ref, order, paymentId, customer, rental: parseRental(body) });

    return NextResponse.json({ success: true, reference: ref, paymentId, amount: order.amount / 100, codes });
  } catch (err) {
    console.error("Rental verify error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Payment received but confirmation failed. We'll contact you; please keep your payment reference." }, { status: 500 });
  }
}
