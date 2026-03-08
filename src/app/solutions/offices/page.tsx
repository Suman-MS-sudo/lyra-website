import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sanitary Napkin Vending Machine for Offices & Corporates India | Lyra Enterprises",
  description:
    "Install smart sanitary napkin vending machines in corporate offices. UPI / coin / IoT models. POSH-compliant workplace hygiene. From ₹12,500. GeM vendor. Pan-India delivery.",
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
      "Smart, UPI-enabled vending machines for corporate offices, IT parks and factories. POSH-compliant, remote monitoring, usage analytics. From ₹12,500.",
    url: `${SITE.url}/solutions/offices`,
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
      name: "Which vending machine is best for a corporate office?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For small to mid-size offices (20–100 women), the Solo Coin (₹12,500) or Push Button (₹11,500) works well. For large corporate campuses, IT parks or multi-floor offices, the Solo WiFi UPI (₹22,500) or Solo Ethernet (₹24,500) with remote monitoring and usage analytics is recommended.",
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
    body: "Pair with a Lyra Mini incinerator (₹18,500) for SWM Rules 2016 compliant sanitary waste disposal — complete the hygiene loop in your office washroom.",
  },
];

const products = [
  {
    name: "Push Button",
    price: "₹11,500",
    slug: "push-button-vending-machine",
    tag: "Small Offices",
    desc: "Simple push-button dispenser, no electricity needed. Best for small offices up to 50 women.",
    badge: "bg-gray-100 text-gray-700",
  },
  {
    name: "Solo Coin",
    price: "₹12,500",
    slug: "solo-coin-vending-machine",
    tag: "Mid Offices",
    desc: "Coin-operated vending machine. Recovers cost through per-use fee. Ideal for mid-size offices and factories.",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    name: "Solo WiFi (UPI)",
    price: "₹22,500",
    slug: "solo-wifi-vending-machine",
    tag: "Corporate Campuses",
    desc: "UPI QR cashless payment, real-time monitoring, usage analytics. Perfect for large IT parks and corporate offices.",
    badge: "bg-primary-100 text-primary-700",
  },
  {
    name: "Solo Ethernet",
    price: "₹24,500",
    slug: "solo-ethernet-vending-machine",
    tag: "Enterprise",
    desc: "Wired network for multi-machine enterprise deployments. Most stable connectivity for large campus installations.",
    badge: "bg-indigo-100 text-indigo-700",
  },
];

export default function OfficesSolutionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Solutions", href: "/solutions" },
              { label: "Offices & Corporates" },
            ]} />
            <div className="mt-6 flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest">Offices & Corporates</span>
              <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest">UPI Cashless</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest">Remote Monitoring</span>
            </div>
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Sanitary Napkin Machines{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-primary-500">
                for Offices &amp; Corporates
              </span>
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-3xl leading-relaxed">
              Build a dignified, POSH-compliant workplace with Lyra smart vending machines. UPI cashless payment, remote monitoring, and real-time analytics — designed for modern Indian offices, IT parks and factories.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="tel:+918122378860"
                className="px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-primary-500 text-white font-semibold rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Call for Corporate Quote
              </Link>
              <Link
                href="/#contact"
                className="px-7 py-3.5 border border-indigo-200 text-indigo-700 font-semibold rounded-full hover:bg-indigo-50 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              {["UPI Cashless Models", "Remote Monitoring", "POSH Compliant", "1-Year Warranty", "Pan-India Delivery"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-14 sm:py-20 max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Why Lyra for Offices?</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Smart, cashless, connected — built for modern corporate workplaces.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.heading} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{f.heading}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Products */}
        <section className="py-14 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Recommended for Offices &amp; Corporates</h2>
            <p className="text-gray-500 mb-10">From small offices to large enterprise campuses — the right machine for every scale.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                  <span className={`self-start px-3 py-1 rounded-full text-xs font-bold ${p.badge} mb-4`}>{p.tag}</span>
                  <p className="font-bold text-gray-900 text-lg mb-1">{p.name}</p>
                  <p className="text-indigo-600 font-semibold text-base mb-3">{p.price}</p>
                  <p className="text-gray-500 text-sm flex-1 mb-5">{p.desc}</p>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-auto text-center py-2.5 px-4 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm hover:bg-indigo-100 transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-20 max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="border-b border-gray-100 pb-6">
                <p className="font-semibold text-gray-900 mb-2">{q.name}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-gradient-to-r from-indigo-600 to-primary-500">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-4">Build a better workplace today</h2>
            <p className="text-white/80 mb-8">Get a corporate quote — volume discounts available for multi-location offices and IT parks.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+918122378860" className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-full hover:bg-gray-100 transition-colors">
                📞 +91-81223 78860
              </Link>
              <Link href="/#contact" className="px-8 py-4 bg-white/20 text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
