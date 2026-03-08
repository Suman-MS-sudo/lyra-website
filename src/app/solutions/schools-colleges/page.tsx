import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sanitary Napkin Vending Machine for Schools & Colleges India | Lyra Enterprises",
  description:
    "Install sanitary napkin vending machines and incinerators in school & college washrooms. Reduce girl student absenteeism, meet Swachh Bharat & SWM Rules 2016 compliance. GeM vendor. From ₹5,000.",
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
      "Lyra vending machines reduce girl absenteeism, meet Swachh Bharat compliance, and are available on GeM for direct government procurement. Prices from ₹5,000.",
    url: `${SITE.url}/solutions/schools-colleges`,
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
        text: "For most schools, the Lyra Solo Manual (₹5,000) is the most affordable option and works without electricity. For colleges and hostels with higher footfall, the Push Button (₹11,500) or Solo Coin (₹12,500) are recommended.",
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
    heading: "Starts at ₹5,000",
    body: "The Solo Manual vending machine at ₹5,000 is the most affordable compliant solution in India. Push Button coin machines start at ₹11,500.",
  },
];

const products = [
  {
    name: "Solo Manual",
    price: "₹5,000",
    slug: "solo-manual-vending-machine",
    tag: "Most Affordable",
    desc: "Manual push-access, no electricity required. Best for rural schools and small government schools.",
    badge: "bg-green-100 text-green-700",
  },
  {
    name: "Push Button",
    price: "₹11,500",
    slug: "push-button-vending-machine",
    tag: "Best Seller",
    desc: "Simple coin-free push-button dispenser. Ideal for most schools, hostels and government institutions.",
    badge: "bg-primary-100 text-primary-700",
  },
  {
    name: "Solo Coin",
    price: "₹12,500",
    slug: "solo-coin-vending-machine",
    tag: "Revenue Generating",
    desc: "Coin-operated dispenser — recovers cost through small per-use fee. Perfect for attended hostels and PU colleges.",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    name: "Lyra Micro Incinerator",
    price: "₹13,500",
    slug: "lyra-micro-incinerator",
    tag: "SWM Compliant",
    desc: "Compact wall-mount incinerator for girls' toilet. CPCB-compliant, smoke-free, ash tray included.",
    badge: "bg-purple-100 text-purple-700",
  },
];

export default function SchoolsSolutionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Solutions", href: "/solutions" },
              { label: "Schools & Colleges" },
            ]} />
            <div className="mt-6 flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest">Schools & Colleges</span>
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest">GeM Vendor</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest">Swachh Bharat</span>
            </div>
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Sanitary Napkin Vending Machines{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">
                for Schools &amp; Colleges
              </span>
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-3xl leading-relaxed">
              36% of Indian girls miss school during menstruation. Lyra vending machines installed in school toilets give girls private, on-demand access to sanitary napkins — improving attendance, meeting Swachh Bharat compliance, and available on GeM for easy government procurement.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="tel:+918122378860"
                className="px-7 py-3.5 bg-gradient-to-r from-primary-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Call for School Quote
              </Link>
              <Link
                href="/#contact"
                className="px-7 py-3.5 border border-primary-200 text-primary-700 font-semibold rounded-full hover:bg-primary-50 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              {["GeM Registered Vendor", "CPCB Compliant", "SWM Rules 2016", "1-Year Warranty", "Pan-India Delivery"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-14 sm:py-20 max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Why Lyra for Schools?</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Built for Indian school environments — compliant, durable, and affordable.</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Recommended for Schools &amp; Colleges</h2>
            <p className="text-gray-500 mb-10">Most popular choices for government schools, private schools, hostels and colleges.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                  <span className={`self-start px-3 py-1 rounded-full text-xs font-bold ${p.badge} mb-4`}>{p.tag}</span>
                  <p className="font-bold text-gray-900 text-lg mb-1">{p.name}</p>
                  <p className="text-primary-600 font-semibold text-base mb-3">{p.price}</p>
                  <p className="text-gray-500 text-sm flex-1 mb-5">{p.desc}</p>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-auto text-center py-2.5 px-4 rounded-xl bg-primary-50 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition-colors"
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
        <section className="py-14 bg-gradient-to-r from-primary-600 to-pink-500">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-4">Ready to install in your school?</h2>
            <p className="text-white/80 mb-8">Get a tailored quote for your school — including GeM procurement details, SWM compliance plan, and installation support.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+918122378860" className="px-8 py-4 bg-white text-primary-700 font-bold rounded-full hover:bg-gray-100 transition-colors">
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
