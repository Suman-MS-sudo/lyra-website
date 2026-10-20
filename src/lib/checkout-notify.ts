import { formatINR } from "@/lib/data";
import { describeMailError, esc, missingMailSettings, sendToCustomer, sendToTeam } from "@/lib/mail";
import { customerEmailHtml, teamEmailHtml, totalsFor, type Customer, type Line } from "@/lib/order-core";
import type { RazorpayOrder } from "@/lib/razorpay";

/**
 * Emails the team and the buyer about a payment Razorpay has confirmed.
 * Never throws: a mail problem must not turn a paid order into an error for the buyer.
 */
export async function notifyPaidOrder(o: { ref: string; order: RazorpayOrder; paymentId: string; customer: Customer; lines: Line[] }) {
  const { ref, order, paymentId, customer, lines } = o;
  if (missingMailSettings().length) {
    console.error(`PAID order ${ref} (${paymentId}) could not be emailed: mail settings missing`);
    return;
  }
  const paid = formatINR(order.amount / 100);
  const { total } = totalsFor(lines);
  const extraRows: [string, string][] = [
    ["Payment", `<strong style="color:#15803d;">Paid ${paid}</strong> via Razorpay`],
    ["Payment ID", esc(paymentId)],
    ["Razorpay order", esc(order.id)],
  ];
  if (total * 100 !== order.amount) {
    extraRows.push([
      "⚠ Check",
      `Cart re-priced to ${formatINR(total)} but Razorpay order is ${paid}. Items from Razorpay notes: ${esc(order.notes?.items ?? "")}`,
    ]);
  }

  // Team and buyer emails go out in parallel so the buyer isn't kept waiting on two SMTP round-trips.
  const team = sendToTeam({
    replyTo: customer.email || undefined,
    subject: `PAID order ${ref}: ${customer.name || order.notes?.name} – ${paid}`,
    html: teamEmailHtml({ ref, heading: "New paid order", badge: `Paid ${paid}`, customer, lines, paid: true, extraRows }),
  }).catch((e) => console.error("Paid order team email error:", describeMailError(e)));

  const buyer = !customer.email
    ? Promise.resolve()
    : sendToCustomer({
        to: customer.email,
        subject: `Payment received: order ${ref} | Lyra Enterprises`,
        html: customerEmailHtml({
          ref,
          title: "Payment received, order confirmed",
          intro: `We have received your payment of <strong>${paid}</strong> (Razorpay ID ${esc(paymentId)}). Our team will call you within one working day to confirm the dispatch date and freight to your pincode. Your GST invoice is issued when the order is dispatched.`,
          customer,
          lines,
          paid: true,
        }),
      }).catch((e) => console.error("Paid order confirmation email error:", describeMailError(e)));

  await Promise.all([team, buyer]);
}
