import type { Metadata } from "next";
import StaticInfoPage from "@/components/StaticInfoPage";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shipping and Delivery Policy | Lyra Enterprises",
  description:
    "Shipping and Delivery Policy for Lyra Enterprises product orders across India.",
  alternates: { canonical: `${SITE.url}/shipping-delivery-policy` },
};

export default function ShippingDeliveryPolicyPage() {
  return (
    <StaticInfoPage
      title="Shipping and Delivery Policy"
      description="This Shipping and Delivery Policy explains dispatch timelines, transit expectations and delivery conditions for Lyra Enterprises product orders."
      crumbs={[{ label: "Home", href: "/" }, { label: "Shipping and Delivery Policy" }]}
    >
      <p><strong>Effective date:</strong> March 21, 2026</p>

      <h2>Service Area</h2>
      <p>Lyra Enterprises ships products across India, subject to transporter availability and delivery access at the destination address.</p>

      <h2>Dispatch Timeline</h2>
      <p>Standard orders are typically dispatched within 1 to 2 business days after order confirmation. Bulk, customized or out-of-stock items may require additional lead time.</p>

      <h2>Transit Timeline</h2>
      <p>Typical transit time is 3 to 7 business days, depending on destination city, transporter schedule and local conditions.</p>

      <h2>Delivery Conditions</h2>
      <ul>
        <li>The customer must provide an accurate shipping address and reachable contact number.</li>
        <li>Delivery timelines are estimates and may vary due to weather, strikes, holidays, remote location access or transporter delays.</li>
        <li>Installation scheduling, where applicable, may be separate from physical shipment delivery.</li>
      </ul>

      <h2>Damage or Short Shipment</h2>
      <p>If a shipment arrives visibly damaged or incomplete, notify Lyra Enterprises within 48 hours of delivery with photos, invoice details and package condition notes.</p>

      <h2>Support</h2>
      <p>For dispatch status, delivery coordination or shipment issues, contact sales@lyraenterprise.co.in or +91-81223 78860.</p>
    </StaticInfoPage>
  );
}