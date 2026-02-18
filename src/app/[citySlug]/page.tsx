import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { cities, products, SITE } from "@/lib/data";

type Props = { params: { citySlug: string } };

export async function generateStaticParams() {
  return cities.map((s) => ({ citySlug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loc = cities.find((s) => s.slug === params.citySlug);
  if (!loc) return {};
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: loc.keywords,
    alternates: { canonical: `${SITE.url}/${loc.slug}` },
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
      url: `${SITE.url}/${loc.slug}`,
    },
  };
}

export default function StatePage({ params }: Props) {
  const loc = cities.find((s) => s.slug === params.citySlug);
  if (!loc) notFound();

  const stateSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Lyra Enterprise — ${loc.state}`,
    description: `Lyra Enterprise supplies and installs sanitary napkin vending machines and incinerators across ${loc.state}.`,
    url: `${SITE.url}/${loc.slug}`,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: { "@type": "State", name: loc.state },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: `Vending Machine ${loc.state}`, item: `${SITE.url}/${loc.slug}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(stateSchema) }} />
      <PageNavbar />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-10">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: `Vending Machine ${loc.state}` },
          ]} />
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest">
            Serving all of {loc.state}
          </div>
          {/* Women's Day offer pill */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#6B1FA8]/10 to-[#E8477A]/10 border border-[#A0268A]/25 rounded-full text-xs font-bold text-[#6B1FA8]">
            🌸 Women&apos;s Day — ₹1,000 OFF till March 8, 2026
          </div>
          <h1 className="mt-4 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Sanitary Napkin Vending Machine in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">
              {loc.state}
            </span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl leading-relaxed">
            Lyra Enterprise — India&apos;s #1 manufacturer — supplies and installs sanitary napkin vending machines and incinerators across {loc.state}. Coin, UPI/QR and WiFi IoT models available. Same-week delivery and installation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`https://wa.me/918122378860?text=${encodeURIComponent(`Hi! I need a sanitary napkin vending machine in ${loc.state}. Please share details.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow hover:-translate-y-0.5 transition-all"
            >
              WhatsApp — Get {loc.state} Price
            </Link>
            <Link href="tel:+918122378860" className="px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-500 text-white font-bold rounded-full shadow hover:-translate-y-0.5 transition-all">
              Call Now
            </Link>
          </div>
        </section>

        {/* Cities covered */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-3">Cities &amp; Districts we serve in {loc.state}</h2>
            <div className="flex flex-wrap gap-2">
              {loc.cities.map((city) => (
                <span key={city} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100">
                  📍 {city}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Don&apos;t see your city? We deliver to all locations in {loc.state}. Call us at {SITE.phoneDisplay}.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <h2 className="font-bold text-2xl text-gray-900 mb-6">
            Available Products for {loc.state}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${p.accent}`} />
                <div className="p-5">
                  <p className="text-[9px] text-gray-400 uppercase font-semibold tracking-widest mb-1">
                    {p.category === "vending-machine" ? "Vending Machine" : "Incinerator"}
                  </p>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{p.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-3 leading-snug">{p.tagline}</p>
                  <p className="text-lg font-bold text-primary-600">₹{p.discountedPrice.toLocaleString("en-IN")}</p>
                  <p className="text-xs text-gray-400">Free delivery to {loc.state}</p>
                  <span className="mt-3 block text-xs text-primary-600 group-hover:underline">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Lyra */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <div className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-2xl border border-primary-100 p-6 sm:p-8">
            <h2 className="font-bold text-2xl text-gray-900 mb-6">Why institutions in {loc.state} choose Lyra Enterprise</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Pan-India manufacturer", desc: `We manufacture in Chennai and deliver directly to ${loc.state} — no middlemen, best price guaranteed.` },
                { title: "Same-week delivery", desc: `Most orders in ${loc.state} are delivered within 5–7 working days. Express delivery available.` },
                { title: "1-Year warranty", desc: "Every machine comes with 1-year manufacturer warranty and dedicated after-sales support." },
                { title: "200+ installations", desc: "Trusted by schools, hospitals, IT parks and government offices across South India including your state." },
                { title: "All payment modes", desc: "Coin, UPI QR, WiFi IoT models available to match your facility and visitor demographics." },
                { title: "Free consultation", desc: "Our team will assess your requirements and recommend the right machine for your institution." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-4 border border-primary-100/50">
                  <p className="font-semibold text-gray-900 mb-1">✓ {item.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-16">
          <h2 className="font-bold text-2xl text-gray-900 mb-6">Frequently Asked Questions — {loc.state}</h2>
          <div className="space-y-4">
            {[
              {
                q: `How do I buy a sanitary napkin vending machine in ${loc.state}?`,
                a: `Call us at ${SITE.phoneDisplay} or WhatsApp — we process your order, arrange delivery to ${loc.state} and provide installation support. No local showroom visit needed.`,
              },
              {
                q: `What is the price of a vending machine in ${loc.state}?`,
                a: `Prices start from ₹10,000 (push button) to ₹23,500 (WiFi UPI model). Delivery to ${loc.state} is included. Women's Day offer active — save ₹1,000 on all models.`,
              },
              {
                q: `Do you install the machine in ${loc.state}?`,
                a: `We provide detailed installation guides and video support for ${loc.state}. For large orders (5+ machines), our team can arrange on-site installation assistance.`,
              },
              {
                q: `Do you supply incinerators in ${loc.state}?`,
                a: `Yes. We ship all 3 Lyra incinerator models (Micro, Mini, Maxi) to ${loc.state}. CPCB-compliant sanitary waste disposal for schools, hospitals and offices.`,
              },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm group">
                <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-primary-500 ml-3 flex-shrink-0">+</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other states */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <h2 className="font-bold text-xl text-gray-900 mb-4">We also serve</h2>
          <div className="flex flex-wrap gap-3">
            {cities.filter((s) => s.slug !== loc.slug).map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium hover:border-primary-300 hover:text-primary-600 transition-all shadow-sm">
                {s.state}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary-600 to-pink-500 py-14 text-white text-center px-5">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Get your machine delivered to {loc.state}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">Talk to our team — quote, delivery timeline and installation support in one call.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`https://wa.me/918122378860?text=${encodeURIComponent(`Hi! I want to order a vending machine for ${loc.state}. Please share details.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-primary-700 font-bold rounded-full"
            >
              WhatsApp Us
            </Link>
            <Link href="tel:+918122378860" className="px-8 py-3 bg-white/20 border border-white/30 text-white font-bold rounded-full">
              Call {SITE.phoneDisplay}
            </Link>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

