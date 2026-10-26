import { NextRequest, NextResponse } from "next/server";
import { clean } from "@/lib/mail";
import { fetchOrder, razorpayConfigured, verifyPaymentSignature } from "@/lib/razorpay";
import { confirmPaidRecharge } from "@/lib/rental-recharge-mail";

export const runtime = "nodejs";

/** Recharge step 2: verify Razorpay's signed payment, then extend the rental and email the receipt. */
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
    const a = await confirmPaidRecharge(order, paymentId);
    if (!a) return NextResponse.json({ error: "This payment is not a rental recharge." }, { status: 400 });
    return NextResponse.json({ success: true, code: a.rental_code, paidUntil: a.paid_until, prepaidMonths: a.prepaid_months, amount: order.amount / 100, paymentId });
  } catch (err) {
    console.error("Rental recharge verify error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Payment received but confirmation failed. We'll contact you; please keep your payment reference." }, { status: 500 });
  }
}
