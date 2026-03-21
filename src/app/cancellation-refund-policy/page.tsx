import type { Metadata } from "next";
import StaticInfoPage from "@/components/StaticInfoPage";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy | Lyra Enterprises",
  description:
    "Cancellation and Refund Policy for Lyra Enterprises online orders and Razorpay payments.",
  alternates: { canonical: `${SITE.url}/cancellation-refund-policy` },
};

export default function CancellationRefundPolicyPage() {
  return (
    <StaticInfoPage
      title="Cancellation and Refund Policy"
      description="This policy explains how Lyra Enterprises handles order cancellation requests, payment reversals and refunds for website orders paid through Razorpay."
      crumbs={[{ label: "Home", href: "/" }, { label: "Cancellation and Refund Policy" }]}
    >
      <p><strong>Effective date:</strong> March 21, 2026</p>

      <h2>Order Cancellation</h2>
      <p>Customers may request cancellation before the product is dispatched. Once an order has been dispatched, cancellation may not be possible.</p>

      <h2>Custom and Bulk Orders</h2>
      <p>Orders involving bulk quantities, custom configurations, institution-specific branding or special procurement may not be eligible for cancellation once production or sourcing has started.</p>

      <h2>Refund Eligibility</h2>
      <ul>
        <li>If payment is received but the order cannot be fulfilled by Lyra Enterprises, the amount paid will be refunded.</li>
        <li>If a duplicate payment is made for the same order, the excess amount will be refunded after verification.</li>
        <li>If a cancellation request is approved before dispatch, the paid amount may be refunded after deducting any applicable processing or committed procurement cost.</li>
      </ul>

      <h2>Refund Timeline</h2>
      <p>Approved refunds are generally processed within 7 to 10 business days to the original payment source, subject to Razorpay, bank and card network timelines.</p>

      <h2>Non-Refundable Situations</h2>
      <ul>
        <li>Products damaged due to improper installation, misuse or unauthorized modification</li>
        <li>Delays caused by incomplete customer information or site-readiness issues</li>
        <li>Bulk or customized orders after manufacturing or dispatch has begun</li>
      </ul>

      <h2>How to Request Cancellation or Refund</h2>
      <p>Email sales@lyraenterprise.co.in or call +91-81223 78860 with your order ID, payment ID, contact details and reason for the request.</p>
    </StaticInfoPage>
  );
}