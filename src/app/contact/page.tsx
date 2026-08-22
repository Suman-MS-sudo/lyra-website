import type { Metadata } from "next";
import Link from "next/link";
import StaticInfoPage from "@/components/StaticInfoPage";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Contact Us | Lyra Enterprises" },
  description:
    "Contact Lyra Enterprises for product enquiries, quotes, installation assistance and shipping questions. Sanitary napkin vending machine & incinerator manufacturer, Chennai. Pan-India, serving all of South India.",
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: "Contact Us | Lyra Enterprises",
    description:
      "Contact Lyra Enterprises for product enquiries, quotes, installation assistance and shipping questions. Chennai manufacturer, pan-India delivery.",
    url: `${SITE.url}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Lyra Enterprises",
    description:
      "Contact Lyra Enterprises for product enquiries, quotes, installation assistance and shipping questions. Chennai manufacturer, pan-India delivery.",
  },
};

export default function ContactPage() {
  return (
    <StaticInfoPage
      title="Contact Us"
      description="Use this page for product enquiries, quote requests, shipping updates, invoice requests, cancellation requests and general assistance."
      crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
    >
      <h2>Business Details</h2>
      <ul>
        <li><strong>Business Name:</strong> Lyra Enterprises</li>
        <li><strong>Phone:</strong> +91-81223 78860</li>
        <li><strong>Email:</strong> sales@lyraenterprise.co.in</li>
        <li><strong>Address:</strong> 10/21, Vasuki Street, Cholapuram, Ambattur, Chennai - 600053, Tamil Nadu, India</li>
        <li><strong>Website:</strong> https://lyraenterprise.co.in</li>
        <li><strong>IndiaMART:</strong> <Link href={SITE.social.indiamart} target="_blank" rel="noopener noreferrer">lyraenterprises-chennai on IndiaMART</Link> (GST verified, TrustSEAL supplier)</li>
        <li><strong>Justdial:</strong> <Link href={SITE.social.justdial} target="_blank" rel="noopener noreferrer">Lyra Enterprises on Justdial</Link> (Ambattur, Chennai)</li>
      </ul>

      <h2>Support Hours</h2>
      <p>Monday to Saturday, 9:30 AM to 6:30 PM IST.</p>

      <h2>Enquiry and Order Support</h2>
      <p>For pricing enquiries, order confirmation, invoice details, dispatch timelines, shipping coordination or order amendments, contact us through any of the channels below.</p>
      <ul>
        <li><Link href="tel:+918122378860">Call +91-81223 78860</Link></li>
        <li><Link href="mailto:sales@lyraenterprise.co.in">Email sales@lyraenterprise.co.in</Link></li>
        <li><Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp Support</Link></li>
      </ul>

      <h2>Escalation</h2>
      <p>If your request concerns refund processing, cancellation, payment disputes or delivery issues, mention your order ID, payment ID and contact number so the team can resolve it faster.</p>
    </StaticInfoPage>
  );
}