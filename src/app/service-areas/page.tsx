import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import IndiaServiceMap from "@/components/IndiaServiceMap";
import { cities, regionOrder, SITE, type IndiaRegion } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Napkin Vending Machines Across India — All States | Lyra" },
  description:
    "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across all 28 states and 8 union territories of India. Chennai manufacturer, pan-India delivery. Call +91-8122378860.",
  keywords: [
    "sanitary napkin vending machine india",
    "napkin vending machine manufacturer india",
    "sanitary napkin vending machine all india",
    "napkin vending machine supplier india",
    "sanitary napkin incinerator india",
    "pan india napkin vending machine delivery",
    "vending machine dealer india",
    "sanitary napkin machine near me india",
  ],
  alternates: { canonical: `${SITE.url}/service-areas` },
  openGraph: {
    title: "Service Areas — Lyra Enterprises Across India",
    description:
      "Sanitary napkin vending machines and incinerators delivered and installed across all Indian states and union territories. Chennai manufacturer.",
    url: `${SITE.url}/service-areas`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas — Lyra Enterprises Across India",
    description:
      "Sanitary napkin vending machines and incinerators delivered and installed across all Indian states and union territories.",
  },
};

const byRegion: Record<IndiaRegion, typeof cities> = regionOrder.reduce((acc, r) => {
  acc[r] = cities.filter((c) => c.region === r);
  return acc;
}, {} as Record<IndiaRegion, typeof cities>);

const stateCount = cities.filter((c) => c.kind === "state").length;
const utCount = cities.filter((c) => c.kind === "union territory").length;

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lyra Enterprises Service Areas — States & Union Territories of India",
  url: `${SITE.url}/service-areas`,
  numberOfItems: cities.length,
  itemListElement: cities.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.state,
    item: `${SITE.url}/${c.slug}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE.url}/service-areas` },
  ],
};

export default function ServiceAreasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
          <h1 className="mt-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Sanitary Napkin Vending Machines &amp; Incinerators{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">Across India</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-3xl">
            Lyra Enterprises manufactures every machine in-house in Chennai and delivers and installs across all {stateCount} states and {utCount} union
            territories of India. Below is where we ship, the districts we cover and typical dispatch timelines — pick your state for local details,
            pricing and an installation enquiry.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 font-medium">✓ 1-Year Warranty</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">✓ Pan-India Delivery</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200 font-medium">✓ GST Invoice</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 text-pink-700 rounded-full border border-pink-200 font-medium">✓ Installation Support</span>
          </div>
        </section>

        {/* Interactive India map */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-8">
          <div className="rounded-3xl border border-gray-100 bg-white/70 p-4 sm:p-8 shadow-sm">
            <IndiaServiceMap />
          </div>
        </section>

        {/* Regions */}
        {regionOrder.map((region) => {
          const list = byRegion[region];
          if (!list.length) return null;
          return (
            <section key={region} className="max-w-7xl mx-auto px-5 sm:px-8 pb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-primary-400 to-pink-500 flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{region}</h2>
                <span className="px-2.5 py-0.5 text-xs font-bold text-primary-600 bg-primary-50 border border-primary-200 rounded-full">
                  {list.length}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{c.state}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{c.kind === "union territory" ? "UT" : c.stateCode}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {c.capital} · ≈{c.districtsApprox} districts · dispatch {c.dispatch}
                    </p>
                    <p className="mt-3 text-sm text-gray-600 leading-snug">
                      {c.cities.slice(0, 6).join(", ")}
                      {c.cities.length > 6 ? " and more" : ""}
                    </p>
                    <span className="mt-3 inline-block text-xs font-semibold text-primary-600 group-hover:underline">
                      View {c.state} page →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#6B1FA8] via-[#A0268A] to-[#E8477A] py-14 text-white text-center px-5">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Not sure if we deliver to your location?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              We ship to every pincode in India. Tell us your city and facility type — we&apos;ll confirm delivery time and quote freight.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-[#A0268A] font-bold rounded-full shadow hover:-translate-y-0.5 transition-all">WhatsApp Us</Link>
              <Link href={`tel:${SITE.phone}`} className="px-8 py-3 bg-white/20 border border-white/30 text-white font-bold rounded-full hover:-translate-y-0.5 transition-all">Call {SITE.phoneDisplay}</Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
