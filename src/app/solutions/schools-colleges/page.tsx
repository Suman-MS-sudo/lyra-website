import type { Metadata } from "next";
import Link from "next/link";
import SolutionPage from "@/components/page/SolutionPage";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Napkin Vending Machines for Schools & Colleges | Lyra" },
  description:
    "Napkin vending machines and incinerators for school & college washrooms. Cut girl student absenteeism, meet Swachh Bharat and SWM Rules 2016. GeM vendor.",
  keywords: [
    "sanitary napkin vending machine for schools india",
    "napkin vending machine for colleges india",
    "menstrual hygiene school program india",
    "sanitary napkin dispenser school toilet india",
    "swachh bharat school napkin vending machine",
    "GeM vending machine for schools india",
    "girl absenteeism menstrual hygiene india",
    "napkin vending machine for hostel india",
    "incinerator for school toilet india",
    "MHS menstrual hygiene school india",
  ],
  alternates: { canonical: `${SITE.url}/solutions/schools-colleges` },
  openGraph: {
    title: "Sanitary Napkin Vending Machine for Schools & Colleges | Lyra Enterprises India",
    description:
      "Lyra vending machines reduce girl absenteeism, meet Swachh Bharat compliance, and are available on GeM for direct government procurement.",
    url: `${SITE.url}/solutions/schools-colleges`,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanitary Napkin Vending Machine for Schools & Colleges | Lyra Enterprises India",
    description:
      "Lyra vending machines reduce girl absenteeism, meet Swachh Bharat compliance, and are available on GeM for direct government procurement.",
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sanitary Napkin Vending Machine for Schools & Colleges",
  url: `${SITE.url}/solutions/schools-colleges`,
  description:
    "Lyra Enterprises supplies CPCB-compliant, Swachh Bharat-approved sanitary napkin vending machines and incinerators to schools and colleges across India.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE.url}/solutions` },
      { "@type": "ListItem", position: 3, name: "Schools & Colleges", item: `${SITE.url}/solutions/schools-colleges` },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which vending machine is best for a school or college?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most schools, the Push Button is the most affordable compliant option. For colleges and hostels with higher footfall, the Solo Coin or Solo QR are recommended.",
      },
    },
    {
      "@type": "Question",
      name: "Are Lyra machines available on GeM portal for government schools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Lyra Enterprises is a registered GeM (Government e-Marketplace) vendor. Government schools, Kendriya Vidyalayas, Navodaya Vidyalayas, and state government institutions can procure directly via GeM without a separate tender.",
      },
    },
    {
      "@type": "Question",
      name: "Is a sanitary napkin incinerator required in schools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Under the Solid Waste Management Rules 2016, educational institutions are required to segregate and dispose of sanitary waste properly. An incinerator ensures CPCB and SWM Rules 2016 compliance and eliminates infection risk.",
      },
    },
  ],
};

const features = [
  {
    icon: "📉",
    heading: "Reduces Girl Absenteeism",
    body: "UNICEF data shows 23 million girls drop out annually due to menstrual hygiene barriers. A vending machine in the girls' toilet changes this directly — private, 24×7 access means no more missed school days.",
  },
  {
    icon: "🇮🇳",
    heading: "Swachh Bharat & MHS Compliant",
    body: "Lyra machines meet Swachh Bharat Mission and Menstrual Hygiene Scheme (MHS) guidelines for institutional deployment in schools and colleges across India.",
  },
  {
    icon: "🏛️",
    heading: "GeM Portal Procurement",
    body: "We are a registered GeM (Government e-Marketplace) vendor. Government schools, KV, NV and state board schools can procure Lyra machines directly through GeM — no lengthy tender process.",
  },
  {
    icon: "♻️",
    heading: "CPCB-Compliant Incinerators",
    body: "Pair vending machines with Lyra incinerators to achieve full menstrual waste compliance under SWM Rules 2016. Smoke-control technology and auto-cutoff ensure safe operation inside school premises.",
  },
  {
    icon: "🔧",
    heading: "Low Maintenance, Long Lasting",
    body: "Stainless steel body, vandal-resistant construction, and simple mechanism make Lyra machines ideal for school environments. 1-Year warranty on all models.",
  },
  {
    icon: "💰",
    heading: "Multiple Models Available",
    body: "The Push Button vending machine is the most affordable compliant solution in India. Coin-operated Solo Coin machines add self-funding revenue collection.",
  },
];

const products = [
  {
    name: "Push Button",
    slug: "push-button-vending-machine",
    tag: "Most Affordable",
    desc: "Simple push-button dispenser, no coins needed. Best for schools, hostels and government institutions.",
    badge: "bg-primary-100 text-primary-700",
  },
  {
    name: "Solo Coin",
    slug: "solo-coin-vending-machine",
    tag: "Revenue Generating",
    desc: "Coin-operated dispenser — recovers cost through small per-use fee. Perfect for attended hostels and PU colleges.",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    name: "Solo QR (UPI)",
    slug: "solo-qr-vending-machine",
    tag: "Cashless",
    desc: "UPI QR + coin payment. Ideal for urban schools and colleges wanting a cashless menstrual hygiene solution.",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    name: "Lyra Micro Incinerator",
    slug: "lyra-micro-incinerator",
    tag: "SWM Compliant",
    desc: "Compact wall-mount incinerator for girls' toilet. CPCB-compliant, smoke-free, ash tray included.",
    badge: "bg-blue-100 text-blue-700",
  },
];

export default function SchoolsSolutionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SolutionPage
        crumb="Schools & Colleges"
        tags={["Schools & Colleges", "GeM Vendor", "Swachh Bharat"]}
        title={<>Sanitary Napkin Vending Machines <span className="text-gradient">for Schools &amp; Colleges</span></>}
        lead={
          <p>
            36% of Indian girls miss school during menstruation. Lyra vending machines installed in school toilets give girls private, on-demand access to sanitary napkins — improving attendance, meeting Swachh Bharat compliance, and available on GeM for easy government procurement. Housing students? See our <Link href="/solutions/womens-hostels-colleges" className="font-semibold text-brand hover:underline">women&apos;s hostel and college solutions</Link>.
          </p>
        }
        callLabel="Call for School Quote"
        points={["GeM Registered Vendor", "CPCB Compliant", "SWM Rules 2016", "1-Year Warranty", "Pan-India Delivery"]}
        callout={{
          title: "Not sure how to fund it?",
          body: "Samagra Shiksha, Swachh Bharat SLWM funds, state schemes and CSR all cover napkin vending machines and incinerators for government and aided schools.",
          href: "/government-schemes-menstrual-hygiene",
          label: "See government schemes & subsidies →",
        }}
        featuresTitle="Why Lyra for Schools?"
        featuresLead="Built for Indian school environments — compliant, durable, and affordable."
        features={features}
        productsTitle={<>Recommended for Schools &amp; Colleges</>}
        productsLead="Most popular choices for government schools, private schools, hostels and colleges."
        products={products}
        faqs={faqSchema.mainEntity}
        ctaTitle="Ready to install in your school?"
        ctaBody="Get a tailored quote for your school — including GeM procurement details, SWM compliance plan, and installation support."
      />
    </>
  );
}
