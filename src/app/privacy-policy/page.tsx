import type { Metadata } from "next";
import StaticInfoPage from "@/components/StaticInfoPage";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Lyra Enterprises" },
  description:
    "Privacy Policy for Lyra Enterprises covering customer information collected through product enquiries and quotation requests.",
  alternates: { canonical: `${SITE.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <StaticInfoPage
      title="Privacy Policy"
      description="This Privacy Policy explains how Lyra Enterprises collects, uses and protects customer information when you browse our website or submit an enquiry."
      crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
    >
      <p><strong>Effective date:</strong> March 21, 2026</p>

      <h2>Information We Collect</h2>
      <p>We may collect your name, phone number, email address, company or institution name, city, state, product preferences and order quantity when you use our website or submit an enquiry.</p>

      <h2>How We Use Information</h2>
      <ul>
        <li>To process enquiries and product orders</li>
        <li>To share quotations, pricing and product details</li>
        <li>To coordinate shipping, installation support and invoicing</li>
        <li>To respond to refund, cancellation or support requests</li>
        <li>To improve our products, services and website experience</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>We share customer information only with service providers and partners required to complete business operations, including logistics, delivery coordination and customer support. We do not sell personal data.</p>

      <h2>Data Retention</h2>
      <p>We retain order and inquiry information for business, accounting, legal and support purposes for as long as reasonably necessary.</p>

      <h2>Your Rights</h2>
      <p>You may contact us to request correction or deletion of your personal information, subject to legal, accounting and operational requirements.</p>

      <h2>Contact</h2>
      <p>For privacy-related requests, contact Lyra Enterprises at <ObfuscatedEmail>our email</ObfuscatedEmail> or +91-81223 78860.</p>
    </StaticInfoPage>
  );
}