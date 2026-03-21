import type { Metadata } from "next";
import StaticInfoPage from "@/components/StaticInfoPage";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy | Lyra Enterprises",
  description:
    "Privacy Policy for Lyra Enterprises covering customer information collected through product inquiries and Razorpay-powered online purchases.",
  alternates: { canonical: `${SITE.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <StaticInfoPage
      title="Privacy Policy"
      description="This Privacy Policy explains how Lyra Enterprises collects, uses and protects customer information when you browse our website, submit inquiries or complete an online payment."
      crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
    >
      <p><strong>Effective date:</strong> March 21, 2026</p>

      <h2>Information We Collect</h2>
      <p>We may collect your name, phone number, email address, company or institution name, city, state, product preferences, order quantity and payment-related identifiers when you use our website or place an order.</p>

      <h2>How We Use Information</h2>
      <ul>
        <li>To process inquiries and product orders</li>
        <li>To create and verify Razorpay payment transactions</li>
        <li>To coordinate shipping, installation support and invoicing</li>
        <li>To respond to refund, cancellation or support requests</li>
        <li>To improve our products, services and website experience</li>
      </ul>

      <h2>Payment Information</h2>
      <p>Online payments are processed through Razorpay. We do not store your full card or banking information on our website. Payment processing is subject to Razorpay&apos;s security and compliance standards.</p>

      <h2>Data Sharing</h2>
      <p>We share customer information only with service providers and partners required to complete business operations, including payment processing, logistics, delivery coordination and customer support. We do not sell personal data.</p>

      <h2>Data Retention</h2>
      <p>We retain order and inquiry information for business, accounting, legal and support purposes for as long as reasonably necessary.</p>

      <h2>Your Rights</h2>
      <p>You may contact us to request correction or deletion of your personal information, subject to legal, accounting and operational requirements.</p>

      <h2>Contact</h2>
      <p>For privacy-related requests, contact Lyra Enterprises at sales@lyraenterprise.co.in or +91-81223 78860.</p>
    </StaticInfoPage>
  );
}