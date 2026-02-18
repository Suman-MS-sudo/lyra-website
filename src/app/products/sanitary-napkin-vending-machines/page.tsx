import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { vendingMachines, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sanitary Napkin Vending Machines — All Models & Prices India | Lyra Enterprise",
  description:
    "Buy sanitary napkin vending machines in India. Compare push-button, coin, UPI QR WiFi and Ethernet models. Prices from ₹10,000. Pan-India delivery from Chennai manufacturer. Call +91-8122378860.",
  keywords: [
    "sanitary napkin vending machine india",
    "napkin vending machine price india",
    "coin vending machine india",
    "upi vending machine india",
    "wifi vending machine india",
    "vending machine manufacturer india",
    "napkin machine for schools hospitals offices",
  ],
  alternates: { canonical: `${SITE.url}/products/sanitary-napkin-vending-machines` },
  openGraph: {
    title: "Sanitary Napkin Vending Machines — All Models India | Lyra Enterprise",
    description: "Compare all 4 models: push-button, coin, WiFi UPI and Ethernet. Prices from ₹10,000. Pan-India delivery.",
    url: `${SITE.url}/products/sanitary-napkin-vending-machines`,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sanitary Napkin Vending Machines — Lyra Enterprise",
  url: `${SITE.url}/products/sanitary-napkin-vending-machines`,
  numberOfItems: vendingMachines.length,
  itemListElement: vendingMachines.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE.url}/products/${p.slug}`,
    name: p.fullName,
  })),
};

const comparison = [
  { label: "Payment", pb: "Manual", sc: "₹5 Coin", wifi: "UPI QR + Coin", eth: "UPI QR + Coin" },
  { label: "Connectivity", pb: "None", sc: "None", wifi: "WiFi 2.4GHz", eth: "Ethernet/LAN" },
  { label: "Cloud Reports", pb: "No", sc: "No", wifi: "Yes", eth: "Yes" },
  { label: "Touch Display", pb: "No", sc: "No", wifi: "Yes", eth: "Yes" },
  { label: "IoT Monitoring", pb: "No", sc: "No", wifi: "Yes", eth: "Yes" },
  { label: "Price (Offer)", pb: "₹10,000", sc: "₹11,500", wifi: "₹23,500", eth: "₹23,500" },
];

export default function VendingMachinesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Vending Machines" },
          ]} />
          <h1 className="mt-6 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Sanitary Napkin <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">Vending Machines</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl">
            4 models to match every budget and facility — from simple push-button dispensers to IoT-enabled smart machines with UPI payments and cloud analytics. Manufactured in Chennai, delivered across India.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 font-medium">✓ 1-Year Warranty</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">✓ Pan-India Delivery</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200 font-medium">✓ Free Installation Support</span>
          </div>
        </section>

        {/* Product Cards */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendingMachines.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                <div className={`h-2 bg-gradient-to-r ${p.accent}`} />
                <div className="p-6 flex flex-col flex-1">
                  {p.popular && (
                    <span className="inline-block mb-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-primary-100 text-primary-700 rounded-full w-fit">⭐ Most Popular</span>
                  )}
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

        {/* Comparison Table */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Feature</th>
                  {vendingMachines.map((p) => (
                    <th key={p.slug} className="px-4 py-3 text-center font-semibold text-gray-700">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-4 py-3 text-gray-600 font-medium">{row.label}</td>
                    {([row.pb, row.sc, row.wifi, row.eth] as string[]).map((val, j) => (
                      <td key={j} className={`px-4 py-3 text-center ${val === "Yes" ? "text-green-600 font-semibold" : val === "No" ? "text-gray-400" : "text-gray-700"}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#6B1FA8] via-[#A0268A] to-[#E8477A] py-14 text-white text-center px-5">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 mb-4">
              <span className="text-sm">🌸</span>
              <span className="text-xs font-bold text-white tracking-widest uppercase">Women&apos;s Day 2026 · Save ₹1,000</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Not sure which model to choose?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Tell us your facility type and budget — our team will recommend the right machine with Women&apos;s Day pricing within 30 minutes.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`https://wa.me/918122378860?text=${encodeURIComponent("Hi! I want to claim the Women's Day ₹1,000 offer on a Lyra vending machine. Please help me choose the right model.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-[#A0268A] font-bold rounded-full">WhatsApp — Claim Offer</Link>
              <Link href="tel:+918122378860" className="px-8 py-3 bg-white/20 border border-white/30 text-white font-bold rounded-full">Call +91-81223 78860</Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
