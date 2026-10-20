import { NextRequest, NextResponse } from "next/server";
import { formatINR } from "@/lib/data";
import { clean, describeMailError, esc, missingMailSettings, sendToCustomer, sendToTeam } from "@/lib/mail";
import { buildLines, customerEmailHtml, parseCustomer, teamEmailHtml, totalsFor } from "@/lib/order-core";
import { fetchOrder, razorpayConfigured, verifyPaymentSignature } from "@/lib/razorpay";

export const runtime = "nodejs";

/**
 * Step 2 of online payment: Razorpay Checkout hands the browser a signed payment.
 * We verify the signature, confirm the amount against a fresh server-side price of the cart,
 * then email the team and the buyer.
 */
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
    const lines = buildLines(body.items);
    const { total } = totalsFor(lines);
    const amountOk = total * 100 === order.amount;

    if (missingMailSettings().length) {
      console.error(`PAID order ${ref} (${paymentId}) could not be emailed: mail settings missing`);
    } else {
      const extraRows: [string, string][] = [
        ["Payment", `<strong style="color:#15803d;">Paid ${formatINR(order.amount / 100)}</strong> via Razorpay`],
        ["Payment ID", esc(paymentId)],
        ["Razorpay order", esc(orderId)],
      ];
      if (!amountOk) {
        extraRows.push([
          "⚠ Check",
          `Cart re-priced to ${formatINR(total)} but Razorpay order is ${formatINR(order.amount / 100)}. Items from Razorpay notes: ${esc(order.notes?.items ?? "")}`,
        ]);
      }

      await sendToTeam({
        replyTo: customer.email || undefined,
        subject: `PAID order ${ref}: ${customer.name || order.notes?.name} – ${formatINR(order.amount / 100)}`,
        html: teamEmailHtml({ ref, heading: "New paid order", badge: `Paid ${formatINR(order.amount / 100)}`, customer, lines, paid: true, extraRows }),
      }).catch((e) => console.error("Paid order team email error:", describeMailError(e)));

      if (customer.email) {
        sendToCustomer({
          to: customer.email,
          subject: `Payment received: order ${ref} | Lyra Enterprises`,
          html: customerEmailHtml({
            ref,
            title: "Payment received, order confirmed",
            intro: `We have received your payment of <strong>${formatINR(order.amount / 100)}</strong> (Razorpay ID ${esc(paymentId)}). Our team will call you within one working day to confirm the dispatch date and freight to your pincode. Your GST invoice is issued when the order is dispatched.`,
            customer,
            lines,
            paid: true,
          }),
        }).catch((e) => console.error("Paid order confirmation email error:", describeMailError(e)));
      }
    }

    return NextResponse.json({ success: true, reference: ref, paymentId, amount: order.amount / 100 });
  } catch (err) {
    console.error("Checkout verify error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Payment received but confirmation failed. We'll contact you; please keep your payment reference." }, { status: 500 });
  }
}
