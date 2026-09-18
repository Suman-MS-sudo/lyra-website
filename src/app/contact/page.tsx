import type { Metadata } from "next";
import Link from "next/link";
import StaticInfoPage from "@/components/StaticInfoPage";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Contact Us | Lyra Enterprises" },
  description:
    "Contact Lyra Enterprises for product enquiries, quotes, installation assistance and shipping questions. Sanitary napkin vending machine & incinerator manufacturer with offices in Chennai (South India) and West Bengal (North India). Pan-India delivery.",
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
        <li><strong>Email:</strong> <ObfuscatedEmail /></li>
        <li><strong>Website:</strong> https://lyraenterprise.co.in</li>
        <li><strong>IndiaMART:</strong> <Link href={SITE.social.indiamart} target="_blank" rel="noopener noreferrer">lyraenterprises-chennai on IndiaMART</Link> (GST verified, TrustSEAL supplier)</li>
        <li><strong>Justdial:</strong> <Link href={SITE.social.justdial} target="_blank" rel="noopener noreferrer">Lyra Enterprises on Justdial</Link> (Ambattur, Chennai)</li>
      </ul>

      <h2>South India Office — Chennai (Head Office)</h2>
      <ul>
        <li><strong>Phone:</strong> <Link href="tel:+918122378860">+91-81223 78860</Link></li>
        <li><strong>Address:</strong> 10/21, Vasuki Street, Cholapuram, Ambattur, Chennai - 600053, Tamil Nadu, India</li>
        <li><strong>Serves:</strong> Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana and surrounding South India regions</li>
      </ul>

      <h2>North India Office — West Bengal</h2>
      <ul>
        <li><strong>Phone:</strong> <Link href="tel:+917010857506">070108 57506</Link></li>
        <li><strong>Address:</strong> No. 203, Jagannath Apartments, Sheoraphuli, Hooghly, West Bengal - 712223, India</li>
        <li><strong>Serves:</strong> North India operations and enquiries</li>
      </ul>

      <h2>Manufacturing Facility</h2>
      <p>
        All Lyra Enterprises machines are manufactured at our factory: No. 109, High Tech City, Pazhanallur,
        Somangalam, Chennai - 600069, Tamil Nadu, India. This is a production facility — for orders, quotes and
        support, please use the South or North India office contacts above.
      </p>

      <h2>Support Hours</h2>
      <p>Monday to Saturday, 9:30 AM to 6:30 PM IST.</p>

      <h2>Enquiry and Order Support</h2>
      <p>For pricing enquiries, order confirmation, invoice details, dispatch timelines, shipping coordination or order amendments, contact us through any of the channels below.</p>
      <ul>
        <li><Link href="tel:+918122378860">Call +91-81223 78860</Link></li>
        <li><ObfuscatedEmail>Email us</ObfuscatedEmail></li>
        <li><Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp Support</Link></li>
      </ul>

      <h2>Escalation</h2>
      <p>If your request concerns refund processing, cancellation, payment disputes or delivery issues, mention your order ID, payment ID and contact number so the team can resolve it faster.</p>
    </StaticInfoPage>
  );
}