import type { Metadata } from "next";
import SolutionPage from "@/components/page/SolutionPage";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Napkin Vending Machines for Offices & Corporates | Lyra" },
  description:
    "Install smart sanitary napkin vending machines in corporate offices. UPI / coin / IoT models. POSH-compliant workplace hygiene. GeM vendor. Pan-India delivery.",
  keywords: [
    "sanitary napkin vending machine for offices india",
    "napkin vending machine for corporate india",
    "upi vending machine for office india",
    "sanitary dispenser for workplace india",
    "posh compliant hygiene machine office india",
    "smart napkin vending machine corporate india",
    "wifi vending machine for it park india",
    "coin vending machine office india",
    "menstrual hygiene workplace india",
    "sanitary napkin machine for factory india",
  ],
  alternates: { canonical: `${SITE.url}/solutions/offices` },
  openGraph: {
    title: "Sanitary Napkin Vending Machine for Offices | Lyra Enterprises India",
    description:
      "Smart, UPI-enabled vending machines for corporate offices, IT parks and factories. POSH-compliant, remote monitoring, usage analytics.",
    url: `${SITE.url}/solutions/offices`,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanitary Napkin Vending Machine for Offices | Lyra Enterprises India",
    description:
      "Smart, UPI-enabled vending machines for corporate offices, IT parks and factories. POSH-compliant, remote monitoring, usage analytics.",
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sanitary Napkin Vending Machine for Offices & Corporates",
  url: `${SITE.url}/solutions/offices`,
  description:
    "Smart sanitary napkin vending machines for corporate offices, IT parks and factories. UPI, coin and IoT models. POSH-compliant.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE.url}/solutions` },
      { "@type": "ListItem", position: 3, name: "Offices", item: `${SITE.url}/solutions/offices` },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can an office rent a sanitary napkin vending machine instead of buying one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Offices, IT parks and factories can rent a Lyra Solo WiFi, Solo Ethernet or Solo RFID (works with employee ID cards) on Lyra's all-inclusive plan for ₹999 (25 napkins), ₹1,499 (50 napkins) or ₹1,999 (100 napkins) per month plus GST. Lyra installs, services, repairs, replaces parts, monitors the machine online and supplies the napkins; staff only refill it. See lyraenterprise.co.in/sanitary-napkin-vending-machine-on-rent.",
      },
    },
    {
      "@type": "Question",
      name: "Which vending machine is best for a corporate office?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For small to mid-size offices (20–100 women), the Solo Coin or Push Button works well. For large corporate campuses, IT parks or multi-floor offices, the Solo WiFi UPI or Solo Ethernet with remote monitoring and usage analytics is recommended.",
      },
    },
    {
      "@type": "Question",
      name: "Is a sanitary napkin vending machine required under POSH Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While the POSH Act focuses on sexual harassment prevention, providing adequate menstrual hygiene infrastructure (including vending machines) is now considered part of a dignified, compliant workplace under broader labour welfare and POSH compliance best practices in India.",
      },
    },
    {
      "@type": "Question",
      name: "Can machines be monitored remotely for large campuses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Solo WiFi and Solo Ethernet models include remote monitoring and real-time usage alerts — allowing facility managers to track stock levels, usage patterns and service needs across multiple locations from one dashboard.",
      },
    },
  ],
};

const features = [
  {
    icon: "📱",
    heading: "UPI & Cashless Payment",
    body: "Solo WiFi and Solo Ethernet models accept UPI via QR code — no coin collection needed, fully cashless operation ideal for modern corporate environments.",
  },
  {
    icon: "📊",
    heading: "Remote Monitoring & Analytics",
    body: "Track stock levels, usage counts and service requirements remotely — essential for large multi-floor offices, IT parks and factory campuses.",
  },
  {
    icon: "⚖️",
    heading: "POSH-Compliant Workplace",
    body: "Providing private, on-demand access to sanitary napkins in office washrooms is a best practice for POSH-compliant, gender-inclusive workplaces in India.",
  },
  {
    icon: "🔇",
    heading: "Silent, Discreet Dispensing",
    body: "Lyra machines operate silently with a discreet design — no visible branding on the dispenser hatch, preserving employee privacy and dignity.",
  },
  {
    icon: "🏭",
    heading: "Durable SS Construction",
    body: "Stainless steel body resists vandalism and cleaning chemicals — built to withstand busy corporate washrooms with 1-Year warranty and pan-India service.",
  },
  {
    icon: "♻️",
    heading: "Add Incinerator for Full Compliance",
    body: "Pair with a Lyra Mini incinerator for SWM Rules 2016 compliant sanitary waste disposal — complete the hygiene loop in your office washroom.",
  },
];

const products = [
  {
    name: "Push Button",
    slug: "push-button-vending-machine",
    tag: "Small Offices",
    desc: "Simple push-button dispenser, no electricity needed. Best for small offices up to 50 women.",
    badge: "bg-gray-100 text-gray-700",
  },
  {
    name: "Solo Coin",
    slug: "solo-coin-vending-machine",
    tag: "Mid Offices",
    desc: "Coin-operated vending machine. Recovers cost through per-use fee. Ideal for mid-size offices and factories.",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    name: "Solo WiFi (UPI)",
    slug: "solo-wifi-vending-machine",
    tag: "Corporate Campuses",
    desc: "UPI QR cashless payment, real-time monitoring, usage analytics. Perfect for large IT parks and corporate offices.",
    badge: "bg-primary-100 text-primary-700",
  },
  {
    name: "Solo Ethernet",
    slug: "solo-ethernet-vending-machine",
    tag: "Enterprise",
    desc: "Wired network for multi-machine enterprise deployments. Most stable connectivity for large campus installations.",
    badge: "bg-sky-100 text-sky-700",
  },
];

export default function OfficesSolutionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SolutionPage
        crumb="Offices & Corporates"
        tags={["Offices & Corporates", "UPI Cashless", "Remote Monitoring"]}
        title={<>Sanitary Napkin Machines <span className="text-gradient">for Offices &amp; Corporates</span></>}
        lead={
          <p>
            Build a dignified, POSH-compliant workplace with Lyra smart vending machines. UPI cashless payment, remote monitoring, and real-time analytics — designed for modern Indian offices, IT parks and factories.
          </p>
        }
        callLabel="Call for Corporate Quote"
        points={["UPI Cashless Models", "Remote Monitoring", "POSH Compliant", "1-Year Warranty", "Pan-India Delivery"]}
        featuresTitle="Why Lyra for Offices?"
        featuresLead="Smart, cashless, connected — built for modern corporate workplaces."
        features={features}
        productsTitle={<>Recommended for Offices &amp; Corporates</>}
        productsLead="From small offices to large enterprise campuses — the right machine for every scale."
        products={products}
        faqs={faqSchema.mainEntity}
        ctaTitle="Build a better workplace today"
        ctaBody="Get a corporate quote — volume discounts available for multi-location offices and IT parks."
      />
    </>
  );
}
