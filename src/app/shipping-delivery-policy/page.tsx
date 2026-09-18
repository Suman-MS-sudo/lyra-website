import type { Metadata } from "next";
import Link from "next/link";
import StaticInfoPage from "@/components/StaticInfoPage";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { SITE } from "@/lib/data";

const PAGE_URL = `${SITE.url}/shipping-delivery-policy`;
const PAGE_TITLE = "Shipping and Delivery Policy | Lyra Enterprises";
const PAGE_DESCRIPTION =
  "Shipping and Delivery Policy for Lyra Enterprises sanitary napkin vending machine and incinerator orders — dispatch timelines, transit time, freight charges and delivery conditions across India.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    "lyra enterprises shipping policy",
    "vending machine delivery india",
    "sanitary napkin machine dispatch time",
    "pan india delivery vending machine",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Shipping and Delivery Policy",
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  isPartOf: { "@type": "WebSite", "@id": `${SITE.url}/#website` },
  publisher: { "@type": "Organization", name: "Lyra Enterprises", url: SITE.url },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Shipping and Delivery Policy", item: PAGE_URL },
  ],
};

const faqs = [
  {
    q: "Does Lyra Enterprises deliver across all of India?",
    a: "Yes, subject to transporter availability and delivery access at the destination address.",
  },
  {
    q: "How long does dispatch and delivery take?",
    a: "Standard orders are dispatched within 1 to 2 business days after order confirmation, with typical transit time of 3 to 7 business days depending on destination.",
  },
  {
    q: "Is freight included in the product price?",
    a: "No. Product prices are ex-works Chennai and exclude freight, which is calculated separately based on the delivery destination, order weight and transporter rates at the time of dispatch.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const sections = [
  {
    id: "service-area",
    title: "Service Area",
    body: "Lyra Enterprises ships products across India, subject to transporter availability and delivery access at the destination address.",
  },
  {
    id: "dispatch-timeline",
    title: "Dispatch Timeline",
    body: "Standard orders are typically dispatched within 1 to 2 business days after order confirmation. Bulk, customized or out-of-stock items may require additional lead time.",
  },
  {
    id: "transit-timeline",
    title: "Transit Timeline",
    body: "Typical transit time is 3 to 7 business days, depending on destination city, transporter schedule and local conditions.",
  },
  {
    id: "shipping-charges",
    title: "Shipping Charges",
    body: "Product prices listed on our website and product pages are ex-works Chennai and exclude freight. Freight is calculated separately based on the delivery destination, order weight/volume and current transporter rates, and is confirmed to you before dispatch as part of your quotation or order confirmation.",
  },
];

export default function ShippingDeliveryPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <StaticInfoPage
        title="Shipping and Delivery Policy"
        description="This Shipping and Delivery Policy explains dispatch timelines, transit expectations, freight charges and delivery conditions for Lyra Enterprises product orders."
        crumbs={[{ label: "Home", href: "/" }, { label: "Shipping and Delivery Policy" }]}
      >
        <p><strong>Effective date:</strong> September 19, 2026</p>

        <nav aria-label="Table of contents" className="not-prose mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">On this page</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            {[...sections, { id: "delivery-conditions", title: "Delivery Conditions" }, { id: "damage-or-short-shipment", title: "Damage or Short Shipment" }, { id: "support", title: "Support" }].map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-primary-600 hover:underline">{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        {sections.map((s) => (
          <div key={s.id}>
            <h2 id={s.id}>{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}

        <h2 id="delivery-conditions">Delivery Conditions</h2>
        <ul>
          <li>The customer must provide an accurate shipping address and reachable contact number.</li>
          <li>Delivery timelines are estimates and may vary due to weather, strikes, holidays, remote location access or transporter delays.</li>
          <li>Installation scheduling, where applicable, may be separate from physical shipment delivery.</li>
        </ul>

        <h2 id="damage-or-short-shipment">Damage or Short Shipment</h2>
        <p>If a shipment arrives visibly damaged or incomplete, notify Lyra Enterprises within 48 hours of delivery with photos, invoice details and package condition notes.</p>

        <h2 id="support">Support</h2>
        <p>For dispatch status, delivery coordination or shipment issues, contact <ObfuscatedEmail>us</ObfuscatedEmail> or +91-81223 78860.</p>

        <p className="text-sm text-gray-500 mt-8">
          For product returns and warranty terms, see our{" "}
          <Link href="/cancellation-refund-policy" className="text-primary-600 hover:underline">
            Cancellation, Return, Refund &amp; Warranty Policy
          </Link>
          .
        </p>
      </StaticInfoPage>
    </>
  );
}