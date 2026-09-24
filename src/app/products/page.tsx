import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { vendingMachines, incinerators, SITE, GST_RATE, priceInclGst, formatINR } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Napkin Vending Machines & Incinerators | Lyra Enterprises" },
  description:
    "Browse Lyra sanitary napkin vending machines (coin, UPI, RFID, WiFi, IoT) and incinerators. 1-year warranty, pan-India delivery. Call +91-8122378860.",
  keywords: [
    "sanitary napkin vending machine india",
    "napkin vending machine price india",
    "sanitary napkin incinerator india",
    "free vend napkin machine india",
    "upi napkin vending machine india",
    "vending machine manufacturer india",
    "Lyra Enterprises products",
    "best sanitary napkin machine india",
  ],
  alternates: { canonical: `${SITE.url}/products` },
  openGraph: {
    title: "All Products — Lyra Enterprises Vending Machines & Incinerators",
    description: "Browse coin, UPI, WiFi vending machines and compact/high-capacity incinerators. Pan-India delivery from Chennai manufacturer.",
    url: `${SITE.url}/products`,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Products — Lyra Enterprises Vending Machines & Incinerators",
    description: "Browse coin, UPI, WiFi vending machines and compact/high-capacity incinerators. Pan-India delivery from Chennai manufacturer.",
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const allListedProducts = [...vendingMachines, ...incinerators];
const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;
const vmPrices = vendingMachines.map((p) => p.price);
const incPrices = incinerators.map((p) => p.price);
const vmMin = Math.min(...vmPrices);
const vmMax = Math.max(...vmPrices);
const incMin = Math.min(...incPrices);
const incMax = Math.max(...incPrices);

const faqs = [
  {
    q: "What is the price range of Lyra sanitary napkin vending machines?",
    a: `Lyra Enterprises sanitary napkin vending machines range from ${formatINR(vmMin)} for the Push Button model to ${formatINR(vmMax)} for the Solo Ethernet IoT model, ex-works Chennai plus 18% GST and freight.`,
  },
  {
    q: "What is the price range of Lyra sanitary napkin incinerators?",
    a: `Lyra Enterprises incinerators range from ${formatINR(incMin)} for the Micro model to ${formatINR(incMax)} for the high-capacity Maxi model, ex-works Chennai plus 18% GST and freight.`,
  },
  {
    q: "Are all products in stock and ready to ship?",
    a: "Yes. All Lyra Enterprises vending machines and incinerators are manufactured in-house and typically dispatched within 1–3 business days of order confirmation, with pan-India delivery in 2–7 business days depending on destination.",
  },
  {
    q: "Do Lyra products come with a warranty?",
    a: "Yes. Every Lyra vending machine and incinerator carries a 1-year manufacturer warranty covering manufacturing defects in parts and workmanship.",
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

const productSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Lyra Enterprises Products — Vending Machines & Incinerators",
  url: `${SITE.url}/products`,
  description: "All Lyra Enterprises sanitary napkin vending machine and incinerator models",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
    ],
  },
};

/** Product + Offer schema per listed item — the part Google actually needs for image/price rich results. */
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lyra Enterprises — All Products",
  url: `${SITE.url}/products`,
  numberOfItems: allListedProducts.length,
  itemListElement: allListedProducts.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      "@id": `${SITE.url}/products/${p.slug}#product`,
      name: p.fullName,
      sku: p.code,
      mpn: p.code,
      description: p.description,
      image: [`${SITE.url}${p.image}`],
      url: `${SITE.url}/products/${p.slug}`,
      brand: { "@type": "Brand", name: "Lyra Enterprises" },
      manufacturer: { "@type": "Organization", name: "Lyra Enterprises", url: SITE.url },
      offers: {
        "@type": "Offer",
        url: `${SITE.url}/products/${p.slug}`,
        priceCurrency: "INR",
        price: p.price,
        priceValidUntil,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: "Lyra Enterprises" },
      },
    },
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <h1 className="mt-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">Products</span>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendingMachines.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className={`relative aspect-square bg-gradient-to-br ${p.accent} overflow-hidden`}>
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
                  <Image
                    src={p.image}
                    alt={p.fullName}
                    fill
                    className="object-contain p-8 drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> In Stock
                  </span>
                  {p.popular && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-yellow-400 text-yellow-900 rounded-full">★ Popular</span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{p.code}</p>
                  <h3 className="font-bold text-gray-900 mt-1 text-lg group-hover:text-primary-600 transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4 leading-snug flex-1">{p.tagline}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-gray-900">{formatINR(p.price)}</span>
                    <span className="text-[11px] text-gray-500">+ 18% GST · {formatINR(priceInclGst(p.price))} incl.</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-primary-600 group-hover:underline">View Details →</span>
                    <span className={`px-3 py-1.5 rounded-lg text-white text-xs font-bold bg-gradient-to-r ${p.accent}`}>Buy Now</span>
                  </div>
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
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className={`relative aspect-square bg-gradient-to-br ${p.accent} overflow-hidden`}>
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
                  <Image
                    src={p.image}
                    alt={p.fullName}
                    fill
                    className="object-contain p-8 drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> In Stock
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{p.code}</p>
                  <h3 className="font-bold text-gray-900 mt-1 text-lg group-hover:text-primary-600 transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4 leading-snug flex-1">{p.tagline}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-gray-900">{formatINR(p.price)}</span>
                    <span className="text-[11px] text-gray-500">+ 18% GST · {formatINR(priceInclGst(p.price))} incl.</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-primary-600 group-hover:underline">View Details →</span>
                    <span className={`px-3 py-1.5 rounded-lg text-white text-xs font-bold bg-gradient-to-r ${p.accent}`}>Buy Now</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm list-none">
                  {faq.q}
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 group-open:bg-primary-100 flex items-center justify-center text-gray-500 group-open:text-primary-600 transition-colors text-xs font-bold">+</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#3b82f6] py-14 text-white text-center px-5">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Need help choosing the right machine?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Our team will recommend the perfect model for your facility. Free consultation, no obligation.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="https://wa.me/918122378860?text=Hi%21%20I%27m%20interested%20in%20Lyra%27s%20vending%20machines%20%2F%20incinerators.%20Please%20share%20details." target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-[#1d4ed8] font-bold rounded-full shadow hover:-translate-y-0.5 transition-all">WhatsApp Us</Link>
              <Link href="tel:+918122378860" className="px-8 py-3 bg-white/20 border border-white/30 text-white font-bold rounded-full hover:-translate-y-0.5 transition-all">Call Now</Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
