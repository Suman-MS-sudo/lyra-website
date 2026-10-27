import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import ShopGrid from "@/components/store/ShopGrid";
import RentalCallout from "@/components/rental/RentalCallout";
import { vendingMachines, incinerators, SITE, formatINR } from "@/lib/data";
import { offerPolicies } from "@/lib/offer-schema";

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
    q: "Can I rent a Lyra vending machine instead of buying?",
    a: "Yes. Lyra Enterprises rents IoT WiFi, IoT Ethernet and RFID sanitary napkin vending machines across India as an all-inclusive bundle: ₹999 per month for 25-napkin capacity, ₹1,499 for 50 napkins and ₹1,999 for 100 napkins, plus 18% GST. Lyra installs, services, repairs, replaces parts, monitors the machine online and supplies the napkins; the customer only refills the machine. A 3-year minimum agreement applies, with a refundable ₹4,999 deposit plus the first month's rent (or 3 months' rent in advance) at signing.",
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
        ...offerPolicies,
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
      <main className="min-h-screen bg-canvas">
        {/* Hero */}
        <section className="border-b border-line bg-subtle">
          <div className="lyra-container pb-10 pt-6 sm:pt-8">
            <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]} />
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="kicker">Shop</p>
                <h1 className="mt-3 text-display-lg font-semibold text-ink">
                  All <span className="text-gradient">Products</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-body">
                  India&apos;s most complete range of sanitary napkin vending machines and incinerators. Every model is manufactured at our Chennai facility with 1-year warranty and pan-India service.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm font-medium">
                <a href="#vending-machines" className="inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 text-ink hover:border-brand hover:text-brand">Vending Machines ↓</a>
                <a href="#incinerators" className="inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 text-ink hover:border-brand hover:text-brand">Incinerators ↓</a>
                <Link href="/sanitary-napkin-vending-machine-price-india" className="inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 text-ink hover:border-brand hover:text-brand">Price list →</Link>
                <Link href="/compare-sanitary-napkin-vending-machines" className="inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 text-ink hover:border-brand hover:text-brand">Compare models →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="lyra-container py-10 sm:py-14" aria-label="Product catalogue">
          <ShopGrid />
        </section>

        <section className="lyra-container pb-14">
          <RentalCallout />
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
