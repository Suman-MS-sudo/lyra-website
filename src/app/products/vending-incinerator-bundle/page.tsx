import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vending Machine + Incinerator Bundle India | Best Combo for Schools & Hostels | Lyra",
  description:
    "Buy a sanitary napkin vending machine and incinerator combo from Lyra Enterprises. Save on bundled pricing, get full SWM Rules 2016 compliance in one order. Ideal for schools, hostels and hospitals. Pan-India delivery.",
  keywords: [
    "vending machine incinerator combo india",
    "napkin vending machine incinerator bundle india",
    "vending machine and incinerator together india",
    "complete menstrual hygiene solution india",
    "swm rules compliant combo india",
    "napkin vending machine incinerator school india",
    "vending machine incinerator hostel india",
    "bundle offer vending machine incinerator india",
    "sanitary napkin machine combo package india",
    "complete washroom hygiene solution india",
  ],
  alternates: { canonical: `${SITE.url}/products/vending-incinerator-bundle` },
  openGraph: {
    title: "Vending Machine + Incinerator Bundle | Complete Menstrual Hygiene Solution | Lyra India",
    description:
      "Get a complete menstrual hygiene solution — vending machine + incinerator combo. Full SWM Rules 2016 compliance. Best for schools, hostels and hospitals. Bundle pricing available.",
    url: `${SITE.url}/products/vending-incinerator-bundle`,
  },
};

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Sanitary Napkin Vending Machine + Incinerator Bundle",
  description:
    "Complete menstrual hygiene solution — Lyra vending machine paired with incinerator for full SWM Rules 2016 and CPCB compliance. Ideal for schools, hostels, hospitals and offices.",
  brand: { "@type": "Brand", name: "Lyra Enterprises" },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "18500",
    highPrice: "62000",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Lyra Enterprises" },
  },
  url: `${SITE.url}/products/vending-incinerator-bundle`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
    { "@type": "ListItem", position: 3, name: "Bundle", item: `${SITE.url}/products/vending-incinerator-bundle` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why should I buy a vending machine and incinerator together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buying both together achieves full menstrual hygiene compliance under Solid Waste Management Rules 2016. The vending machine provides napkins; the incinerator safely disposes of used ones. This closed-loop system is what government inspectors and compliance auditors expect to see in schools, hospitals and hostels.",
      },
    },
    {
      "@type": "Question",
      name: "Which combo is best for a school or hostel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most schools and hostels, the Push Button (₹11,500) + Lyra Micro Incinerator (₹13,500) combo works best — total ₹25,000 for fully compliant menstrual hygiene infrastructure. For higher footfall, upgrade to Solo Coin + Lyra Mini.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a bundle discount?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. When ordering a vending machine and incinerator together, Lyra Enterprises offers bundled pricing with additional savings. Call +91-81223 78860 or fill the quote form for current bundle pricing.",
      },
    },
    {
      "@type": "Question",
      name: "Does the combo cover SWM Rules 2016 compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A vending machine + CPCB-compliant incinerator combination covers the full requirements of Solid Waste Management Rules 2016 for menstrual waste in institutional settings — from access to disposal.",
      },
    },
  ],
};

const bundles = [
  {
    title: "School Bundle",
    tag: "Most Popular",
    badge: "bg-primary-100 text-primary-700",
    vending: { name: "Push Button", price: 11500, slug: "push-button-vending-machine" },
    incinerator: { name: "Lyra Micro", price: 13500, slug: "lyra-micro-incinerator" },
    total: 25000,
    savings: 2000,
    bestFor: "Government schools, private schools, hostels",
    highlights: ["Push-button vending — no coins needed", "Micro incinerator handles 1–5 napkins/cycle", "CPCB & SWM Rules 2016 compliant", "Wall-mount both units side by side"],
  },
  {
    title: "College & Hospital Bundle",
    tag: "Best Value",
    badge: "bg-amber-100 text-amber-700",
    vending: { name: "Solo Coin", price: 12500, slug: "solo-coin-vending-machine" },
    incinerator: { name: "Lyra Mini", price: 18500, slug: "lyra-mini-incinerator" },
    total: 31000,
    savings: 3000,
    bestFor: "Colleges, community hospitals, NGOs, offices",
    highlights: ["Coin-operated — self-funding over time", "Mini incinerator handles 5–15 napkins/cycle", "SWM Rules 2016 compliant", "Ideal for 50–200 women daily"],
  },
  {
    title: "Enterprise Bundle",
    tag: "Full Compliance",
    badge: "bg-purple-100 text-purple-700",
    vending: { name: "Solo WiFi (UPI)", price: 22500, slug: "solo-wifi-vending-machine" },
    incinerator: { name: "Lyra Maxi", price: 39500, slug: "lyra-maxi-incinerator" },
    total: 62000,
    savings: 5000,
    bestFor: "Large hospitals, IT campuses, industrial facilities",
    highlights: ["UPI cashless vending with remote monitoring", "Maxi incinerator: 25–50 napkins/cycle", "Biomedical Waste Rules 2016 compliant", "Remote temperature logging for audit trails"],
  },
];

export default function BundlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-pink-50 py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Vending + Incinerator Bundle" },
            ]} />
            <div className="mt-6 flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest">Bundle Offer</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest">SWM Rules 2016</span>
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest">Save on Combo</span>
            </div>
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Vending Machine +{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">
                Incinerator Bundle
              </span>
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-3xl leading-relaxed">
              The complete menstrual hygiene solution in one order. A vending machine provides napkins on demand; an incinerator handles safe, CPCB-compliant disposal. Together, they satisfy the full requirements of India&apos;s Solid Waste Management Rules 2016 for schools, hospitals and hostels.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="tel:+918122378860"
                className="px-7 py-3.5 bg-gradient-to-r from-primary-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Bundle Price
              </Link>
              <Link
                href="/#contact"
                className="px-7 py-3.5 border border-primary-200 text-primary-700 font-semibold rounded-full hover:bg-primary-50 transition-colors"
              >
                Request Quote
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              {["Bundle Savings Available", "SWM Rules 2016 Compliant", "CPCB Approved", "1-Year Warranty", "Pan-India Delivery"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why Bundle */}
        <section className="py-14 max-w-5xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Buy Both Together?</h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {[
              { icon: "⚖️", title: "Full Legal Compliance", body: "SWM Rules 2016 requires both access to sanitary products AND proper disposal. A machine alone without an incinerator is only half the solution." },
              { icon: "💰", title: "Bundle Savings", body: "Ordering vending machine and incinerator together comes with bundled pricing from Lyra — saving ₹2,000–₹5,000 vs buying separately." },
              { icon: "🔧", title: "Single Vendor, One Install", body: "One order, one invoice, one installation team — simplifying procurement and compliance documentation for schools and institutions." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-primary-50 to-white">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bundle Options */}
        <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Choose Your Bundle</h2>
            <p className="text-gray-500 mb-10">Three bundle options for every institution size. Call for custom combinations.</p>
            <div className="grid lg:grid-cols-3 gap-8">
              {bundles.map((b) => (
                <div key={b.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.badge} mb-3 inline-block`}>{b.tag}</span>
                    <h3 className="font-bold text-gray-900 text-xl mb-1">{b.title}</h3>
                    <p className="text-gray-500 text-sm">{b.bestFor}</p>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between py-2 border-b border-gray-50">
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold">Vending Machine</p>
                          <Link href={`/products/${b.vending.slug}`} className="text-gray-900 font-semibold hover:text-primary-600 transition-colors">
                            {b.vending.name}
                          </Link>
                        </div>
                        <span className="text-primary-600 font-bold">₹{b.vending.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold">Incinerator</p>
                          <Link href={`/products/${b.incinerator.slug}`} className="text-gray-900 font-semibold hover:text-primary-600 transition-colors">
                            {b.incinerator.name}
                          </Link>
                        </div>
                        <span className="text-primary-600 font-bold">₹{b.incinerator.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="bg-primary-50 rounded-xl px-4 py-3 mb-5">
                      <div className="flex items-center justify-between">
                        <span className="text-primary-700 font-bold text-sm">Bundle Total</span>
                        <span className="text-primary-700 font-bold text-lg">₹{b.total.toLocaleString()}</span>
                      </div>
                      <p className="text-primary-500 text-xs mt-1">Save up to ₹{b.savings.toLocaleString()} on bundle</p>
                    </div>
                    <ul className="space-y-2">
                      {b.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      href="tel:+918122378860"
                      className="w-full block text-center py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-pink-500 text-white font-semibold hover:shadow-lg transition-shadow"
                    >
                      Get This Bundle →
                    </Link>
                  </div>
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
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-4">Get your compliance combo today</h2>
            <p className="text-white/80 mb-8">Bundle pricing available. Contact us with your institution type and quantity for a tailored quote.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+918122378860" className="px-8 py-4 bg-white text-primary-700 font-bold rounded-full hover:bg-gray-100 transition-colors">
                📞 +91-81223 78860
              </Link>
              <Link href="/#contact" className="px-8 py-4 bg-white/20 text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                Request Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
