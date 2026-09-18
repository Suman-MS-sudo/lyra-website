import type { Metadata } from "next";
import Link from "next/link";
import StaticInfoPage from "@/components/StaticInfoPage";
import { SITE } from "@/lib/data";

const PAGE_URL = `${SITE.url}/terms-and-conditions`;
const PAGE_TITLE = "Terms and Conditions | Lyra Enterprises";
const PAGE_DESCRIPTION =
  "Terms and Conditions for Lyra Enterprises — sanitary napkin vending machine and incinerator orders, pricing, warranty, installation and liability terms for our Chennai manufacturing business.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    "lyra enterprises terms and conditions",
    "sanitary napkin vending machine terms india",
    "vending machine order terms chennai",
    "lyra enterprises legal policy",
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
  name: "Terms and Conditions",
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
    { "@type": "ListItem", position: 2, name: "Terms and Conditions", item: PAGE_URL },
  ],
};

const sections = [
  {
    id: "products-and-pricing",
    title: "Products and Pricing",
    body: "Product prices are published on our website in Indian Rupees, ex-works Chennai, exclusive of 18% GST and freight unless stated otherwise. Freight, installation charges (where applicable) and other charges are communicated separately at the time of quotation. Lyra Enterprises reserves the right to update pricing, product specifications and availability without prior notice; the price confirmed on your accepted quotation applies to your order.",
  },
  {
    id: "order-acceptance",
    title: "Order Acceptance",
    body: "An enquiry or order request does not automatically guarantee acceptance. Orders are confirmed subject to stock availability, serviceability, technical suitability and quotation acceptance.",
  },
  {
    id: "customer-responsibility",
    title: "Customer Responsibility",
    body: "You are responsible for providing accurate billing, shipping and contact information. Delays or errors caused by incorrect details may affect dispatch and delivery timelines.",
  },
  {
    id: "installation-and-usage",
    title: "Installation and Usage",
    body: "Products must be installed and used according to Lyra Enterprises guidelines. Warranty support may be limited if products are modified, misused or installed in unsuitable conditions. See our Cancellation, Return, Refund & Warranty Policy for full warranty terms.",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: "All content on this website, including text, branding, product information, graphics and images, belongs to Lyra Enterprises unless otherwise stated. Unauthorized reuse is prohibited.",
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: "Lyra Enterprises is not liable for indirect, incidental or consequential damages arising from website use, delayed delivery, temporary unavailability, or improper installation and use of products.",
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: "These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Chennai, Tamil Nadu.",
  },
];

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StaticInfoPage
        title="Terms and Conditions"
        description="These Terms and Conditions govern your use of the Lyra Enterprises website and any product orders placed through our enquiry, quotation or direct sales channels."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms and Conditions" }]}
      >
        <p><strong>Effective date:</strong> September 19, 2026</p>

        <nav aria-label="Table of contents" className="not-prose mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">On this page</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            {sections.map((s) => (
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

        <p className="text-sm text-gray-500 mt-8">
          For warranty, return and refund terms, see our{" "}
          <Link href="/cancellation-refund-policy" className="text-primary-600 hover:underline">
            Cancellation, Return, Refund &amp; Warranty Policy
          </Link>
          . For dispatch and delivery terms, see our{" "}
          <Link href="/shipping-delivery-policy" className="text-primary-600 hover:underline">
            Shipping and Delivery Policy
          </Link>
          .
        </p>
      </StaticInfoPage>
    </>
  );
}