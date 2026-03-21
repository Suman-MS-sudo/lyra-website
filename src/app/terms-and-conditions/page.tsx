import type { Metadata } from "next";
import StaticInfoPage from "@/components/StaticInfoPage";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms and Conditions | Lyra Enterprises",
  description:
    "Terms and Conditions governing use of the Lyra Enterprises website and online purchases made through Razorpay.",
  alternates: { canonical: `${SITE.url}/terms-and-conditions` },
};

export default function TermsPage() {
  return (
    <StaticInfoPage
      title="Terms and Conditions"
      description="These Terms and Conditions govern your use of the Lyra Enterprises website and any product orders placed through our online checkout or direct sales channels."
      crumbs={[{ label: "Home", href: "/" }, { label: "Terms and Conditions" }]}
    >
      <p><strong>Effective date:</strong> March 21, 2026</p>

      <h2>Products and Pricing</h2>
      <p>All product prices displayed on the website are in Indian Rupees. GST and other applicable charges are shown separately where relevant. Lyra Enterprises reserves the right to update pricing, product specifications and availability without prior notice.</p>

      <h2>Order Acceptance</h2>
      <p>An online payment or order request does not automatically guarantee acceptance. Orders are processed subject to stock availability, serviceability, technical suitability and payment confirmation.</p>

      <h2>Customer Responsibility</h2>
      <p>You are responsible for providing accurate billing, shipping and contact information. Delays or errors caused by incorrect details may affect dispatch and delivery timelines.</p>

      <h2>Installation and Usage</h2>
      <p>Products must be installed and used according to Lyra Enterprises guidelines. Warranty support may be limited if products are modified, misused or installed in unsuitable conditions.</p>

      <h2>Intellectual Property</h2>
      <p>All content on this website, including text, branding, product information, graphics and images, belongs to Lyra Enterprises unless otherwise stated. Unauthorized reuse is prohibited.</p>

      <h2>Limitation of Liability</h2>
      <p>Lyra Enterprises is not liable for indirect, incidental or consequential damages arising from website use, delayed delivery, temporary unavailability, or improper installation and use of products.</p>

      <h2>Governing Law</h2>
      <p>These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Chennai, Tamil Nadu.</p>
    </StaticInfoPage>
  );
}