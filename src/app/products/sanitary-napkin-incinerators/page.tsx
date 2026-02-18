import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { incinerators, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sanitary Napkin Incinerators — All Models & Prices India | Lyra Enterprise",
  description:
    "Buy sanitary napkin incinerators in India. Compare Micro (1–5), Mini (5–15) and Maxi (25–50 napkins/cycle). CPCB & SWM compliant. Prices from ₹12,500. Pan-India delivery. Call +91-8122378860.",
  keywords: [
    "sanitary napkin incinerator india",
    "napkin incinerator price india",
    "sanitary waste incinerator india",
    "menstrual waste incinerator india",
    "incinerator manufacturer india",
    "napkin destroyer machine india",
    "CPCB incinerator india",
  ],
  alternates: { canonical: `${SITE.url}/products/sanitary-napkin-incinerators` },
  openGraph: {
    title: "Sanitary Napkin Incinerators — All Models India | Lyra Enterprise",
    description: "Micro, Mini & Maxi incinerators. CPCB & SWM compliant. Prices from ₹12,500. Pan-India delivery from Chennai.",
    url: `${SITE.url}/products/sanitary-napkin-incinerators`,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sanitary Napkin Incinerators — Lyra Enterprise",
  url: `${SITE.url}/products/sanitary-napkin-incinerators`,
  numberOfItems: incinerators.length,
  itemListElement: incinerators.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE.url}/products/${p.slug}`,
    name: p.fullName,
  })),
};

export default function IncineratorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Incinerators" },
          ]} />
          <h1 className="mt-6 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Sanitary Napkin <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">Incinerators</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl">
            3 capacity models for every institution — from compact school units to hospital-grade high-capacity incinerators. Fully compliant with CPCB and Solid Waste Management Rules 2016.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 font-medium">✓ CPCB Compliant</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">✓ SWM Rules 2016</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200 font-medium">✓ Zero Manual Handling</span>
          </div>
        </section>

        {/* Why Incinerator */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-12">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Why incinerators over bio-bins?</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              {[
                { title: "Zero infection risk", desc: "High-temperature incineration kills all pathogens. Bio-bins accumulate bacteria and require manual handling." },
                { title: "Odour-free", desc: "Complete combustion leaves only sterile ash. No odour, no leakage, no pest attraction." },
                { title: "Legal compliance", desc: "SWM Rules 2016 and CPCB guidelines mandate proper menstrual waste disposal for institutions." },
              ].map((item) => (
                <div key={item.title}>
                  <p className="font-semibold text-gray-900 mb-1">✓ {item.title}</p>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Cards */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {incinerators.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                <div className={`h-2 bg-gradient-to-r ${p.accent}`} />
                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-block mb-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 rounded-full w-fit">{p.badge}</span>
                  <h2 className="font-bold text-gray-900 text-xl group-hover:text-primary-600 transition-colors">{p.name}</h2>
                  <p className="text-xs text-gray-400 mt-0.5 mb-3">{p.code}</p>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{p.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {p.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-4 h-4 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through">₹{p.price.toLocaleString("en-IN")}</p>
                      <p className="text-xl font-bold text-primary-600">₹{p.discountedPrice.toLocaleString("en-IN")}</p>
                      <p className="text-[10px] text-[#A0268A] font-semibold mt-0.5">🌸 Save ₹{(p.price - p.discountedPrice).toLocaleString("en-IN")}</p>
                    </div>
                    <span className="text-xs font-semibold text-primary-600 group-hover:underline">Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Also see */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Also see: Vending Machines</h2>
          <p className="text-gray-600 text-sm mb-4">Many institutions pair incinerators with vending machines for a complete menstrual hygiene solution — one machine dispenses, the other safely disposes.</p>
          <Link href="/products/sanitary-napkin-vending-machines" className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:underline">
            Browse Vending Machines →
          </Link>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#6B1FA8] via-[#A0268A] to-[#E8477A] py-14 text-white text-center px-5">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 mb-4">
              <span className="text-sm">🌸</span>
              <span className="text-xs font-bold text-white tracking-widest uppercase">Women&apos;s Day 2026 · Save ₹1,000</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Get the right incinerator for your facility</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Tell us your daily user count — we&apos;ll recommend Micro, Mini or Maxi with Women&apos;s Day pricing.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`https://wa.me/918122378860?text=${encodeURIComponent("Hi! I want the Women's Day offer on a Lyra incinerator. Please share details.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-[#A0268A] font-bold rounded-full">WhatsApp — Claim Offer</Link>
              <Link href="tel:+918122378860" className="px-8 py-3 bg-white/20 border border-white/30 text-white font-bold rounded-full">Call +91-81223 78860</Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
