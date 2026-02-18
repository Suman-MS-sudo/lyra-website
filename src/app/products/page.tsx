import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { vendingMachines, incinerators, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Sanitary Napkin Vending Machines & Incinerators — Lyra Enterprise India",
  description:
    "Browse all Lyra Enterprise products — sanitary napkin vending machines (coin, UPI, WiFi, IoT) and incinerators. Best prices, pan-India delivery. Manufacturer in Chennai.",
  keywords: [
    "sanitary napkin vending machine india",
    "napkin vending machine price india",
    "incinerator india",
    "vending machine manufacturer india",
    "lyra enterprise products",
  ],
  alternates: { canonical: `${SITE.url}/products` },
  openGraph: {
    title: "All Products — Lyra Enterprise Vending Machines & Incinerators",
    description: "Browse coin, UPI, WiFi vending machines and compact/high-capacity incinerators. Pan-India delivery from Chennai manufacturer.",
    url: `${SITE.url}/products`,
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Lyra Enterprise Products — Vending Machines & Incinerators",
  url: `${SITE.url}/products`,
  description: "All Lyra Enterprise sanitary napkin vending machine and incinerator models",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
    ],
  },
};

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <h1 className="mt-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">Products</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl">
            India&apos;s most complete range of sanitary napkin vending machines and incinerators. Every model is manufactured at our Chennai facility with 1-year warranty and pan-India service.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
            <a href="#vending-machines" className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors">Vending Machines ↓</a>
            <a href="#incinerators" className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors">Incinerators ↓</a>
          </div>
        </section>

        {/* Vending Machines */}
        <section id="vending-machines" className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">Category</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sanitary Napkin Vending Machines</h2>
            </div>
            <Link href="/products/sanitary-napkin-vending-machines" className="ml-auto text-sm text-primary-600 font-semibold hover:underline whitespace-nowrap">
              View All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendingMachines.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${p.accent}`} />
                <div className="p-5">
                  {p.popular && (
                    <span className="inline-block mb-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-primary-100 text-primary-700 rounded-full">Most Popular</span>
                  )}
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{p.code}</p>
                  <h3 className="font-bold text-gray-900 mt-1 text-lg group-hover:text-primary-600 transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4 leading-snug">{p.tagline}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-bold text-primary-600">₹{p.discountedPrice.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-gray-400 line-through">₹{p.price.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-[10px] text-[#A0268A] font-semibold mt-0.5">🌸 Women&apos;s Day — Save ₹{(p.price - p.discountedPrice).toLocaleString("en-IN")}</p>
                  <span className="mt-3 block text-xs font-semibold text-primary-600 group-hover:underline">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Incinerators */}
        <section id="incinerators" className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">Category</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sanitary Napkin Incinerators</h2>
            </div>
            <Link href="/products/sanitary-napkin-incinerators" className="ml-auto text-sm text-primary-600 font-semibold hover:underline whitespace-nowrap">
              View All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {incinerators.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${p.accent}`} />
                <div className="p-5">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{p.code}</p>
                  <h3 className="font-bold text-gray-900 mt-1 text-lg group-hover:text-primary-600 transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4 leading-snug">{p.tagline}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-bold text-primary-600">₹{p.discountedPrice.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-gray-400 line-through">₹{p.price.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-[10px] text-[#A0268A] font-semibold mt-0.5">🌸 Women&apos;s Day — Save ₹{(p.price - p.discountedPrice).toLocaleString("en-IN")}</p>
                  <span className="mt-3 block text-xs font-semibold text-primary-600 group-hover:underline">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#6B1FA8] via-[#A0268A] to-[#E8477A] py-14 text-white text-center px-5">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 mb-4">
              <span className="text-sm">🌸</span>
              <span className="text-xs font-bold text-white tracking-widest uppercase">Women&apos;s Day 2026 · Save ₹1,000 on Every Machine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Need help choosing the right machine?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Our team will recommend the perfect model for your facility — with Women&apos;s Day pricing. Free consultation, no obligation.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`https://wa.me/918122378860?text=${encodeURIComponent("Hi! I want to claim the Women's Day ₹1,000 offer on a Lyra machine.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-[#A0268A] font-bold rounded-full shadow hover:-translate-y-0.5 transition-all">WhatsApp — Claim Offer</Link>
              <Link href="tel:+918122378860" className="px-8 py-3 bg-white/20 border border-white/30 text-white font-bold rounded-full hover:-translate-y-0.5 transition-all">Call Now</Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
