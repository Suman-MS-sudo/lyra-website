import type { Metadata } from "next";
import StaticInfoPage from "@/components/StaticInfoPage";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Cancellation, Return, Refund & Warranty Policy | Lyra Enterprises" },
  description:
    "Cancellation, return, refund and 1-year warranty policy for Lyra vending machine and incinerator orders: refund timelines and defect replacement.",
  alternates: { canonical: `${SITE.url}/cancellation-refund-policy` },
};

export default function CancellationRefundPolicyPage() {
  return (
    <StaticInfoPage
      title="Cancellation, Return, Refund & Warranty Policy"
      description="This policy explains how Lyra Enterprises handles order cancellation, post-delivery defect replacement under warranty, and refunds for orders confirmed through our enquiry and quotation process."
      crumbs={[{ label: "Home", href: "/" }, { label: "Cancellation, Return, Refund & Warranty Policy" }]}
    >
      <p><strong>Effective date:</strong> September 19, 2026</p>

      <h2>Order Cancellation (Before Dispatch)</h2>
      <p>Orders are confirmed only after our team shares a quotation and the customer accepts it. Customers may request cancellation any time before the product is dispatched. Once an order has been dispatched, it is governed by the Post-Delivery Returns and Warranty section below, not this cancellation process.</p>

      <h2>Custom and Bulk Orders</h2>
      <p>Orders involving bulk quantities, custom configurations, institution-specific branding or special procurement may not be eligible for cancellation once production or sourcing has started.</p>

      <h2>Post-Delivery Returns and Warranty</h2>
      <p>
        Because our vending machines and incinerators are installed institutional equipment rather than everyday consumer goods, we do not offer &ldquo;change of mind&rdquo; returns after delivery. Instead, every machine is covered by our <strong>1-year manufacturer warranty</strong> against manufacturing defects, as follows:
      </p>
      <ul>
        <li><strong>What is covered:</strong> Manufacturing defects in parts or workmanship that appear during normal use within 1 year of delivery — for example, a faulty coin acceptor, dispensing mechanism, sensor, display, or control board fitted at the factory.</li>
        <li><strong>What is not covered:</strong> Damage from improper installation, misuse, unauthorized modification, water ingress from improper siting, electrical damage from unstable power supply, or normal wear items (e.g. consumable coin-acceptor cleaning).</li>
        <li><strong>Reporting window:</strong> Report a suspected manufacturing defect within 1 year of delivery, and report transit damage or missing parts within 48 hours of delivery (see our <a href="/shipping-delivery-policy">Shipping and Delivery Policy</a>).</li>
        <li><strong>How it&apos;s resolved:</strong> On receiving a defect report, our team will troubleshoot remotely first. If the fault is confirmed as a manufacturing defect, we will repair the unit on-site where feasible, or arrange replacement of the defective part/unit. Lyra Enterprises bears the cost of the replacement part and its outbound shipping; return freight for a defective unit being sent back is coordinated case-by-case and confirmed with the customer before pickup.</li>
        <li><strong>Refund vs. replacement:</strong> Our default remedy for a confirmed manufacturing defect is repair or replacement, not a cash refund, since the machine has typically already been installed and used. A refund is considered only where repair or replacement is not possible.</li>
      </ul>
      <p className="text-sm text-gray-500">
        These are our standard terms; if your quotation or purchase order specifies different warranty terms, those terms take precedence.
      </p>

      <h2>Refund Eligibility (Pre-Dispatch)</h2>
      <ul>
        <li>If an advance or payment is received but the order cannot be fulfilled by Lyra Enterprises, the amount paid will be refunded.</li>
        <li>If a duplicate payment is made for the same order, the excess amount will be refunded after verification.</li>
        <li>If a cancellation request is approved before dispatch, any amount paid may be refunded after deducting applicable processing or committed procurement cost.</li>
      </ul>

      <h2>Refund Timeline</h2>
      <p>Approved refunds are generally processed within 7 to 10 business days to the original payment source, subject to bank timelines.</p>

      <h2>Non-Refundable / Non-Warranty Situations</h2>
      <ul>
        <li>Products damaged due to improper installation, misuse or unauthorized modification</li>
        <li>Delays caused by incomplete customer information or site-readiness issues</li>
        <li>Bulk or customized orders after manufacturing or dispatch has begun</li>
        <li>Defect or damage reports made after the applicable reporting window above</li>
      </ul>

      <h2>How to Request Cancellation, a Warranty Repair, or a Refund</h2>
      <p>Email <ObfuscatedEmail>us</ObfuscatedEmail> or call +91-81223 78860 with your order/enquiry reference, contact details, machine model/serial if available, and a description (with photos if possible) of the issue.</p>
    </StaticInfoPage>
  );
}