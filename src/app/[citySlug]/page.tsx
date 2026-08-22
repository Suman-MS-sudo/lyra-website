import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { vendingMachines, incinerators, cities, SITE } from "@/lib/data";

/* ─── Static params for all state pages ────────────────────── */
export function generateStaticParams() {
  return cities.map((c) => ({ citySlug: c.slug }));
}

function getCity(citySlug: string) {
  return cities.find((c) => c.slug === citySlug);
}

/* ─── Per-state dynamic metadata ───────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { citySlug: string };
}): Promise<Metadata> {
  const city = getCity(params.citySlug);
  if (!city) return {};

  const canonical = `${SITE.url}/${city.slug}`;
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    keywords: city.keywords,
    alternates: { canonical },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: canonical,
      type: "website",
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
    },
  };
}

export default function CityPage({ params }: { params: { citySlug: string } }) {
  const city = getCity(params.citySlug);
  if (!city) notFound();

  const canonical = `${SITE.url}/${city.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: city.state, item: canonical },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Lyra Enterprises — ${city.state}`,
    url: canonical,
    description: city.description,
    areaServed: city.cities.map((c) => ({ "@type": "City", name: c })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    telephone: SITE.phone,
    email: SITE.email,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: city.state }]} />
          <h1 className="mt-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Sanitary Napkin Vending Machines &amp; Incinerators in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">{city.state}</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-3xl">{city.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {city.cities.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                {c}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
            <a href="#vending-machines" className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors">Vending Machines ↓</a>
            <a href="#incinerators" className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors">Incinerators ↓</a>
          </div>
        </section>

        {/* Local install / service note */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-14">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Serving {city.state} from our Chennai facility</h2>
            <p className="text-gray-600 leading-relaxed">
              Lyra Enterprises manufactures every vending machine and incinerator in-house at our Chennai facility and dispatches pan-India, including
              same-week delivery to {city.capital} and all major {city.state} districts. Our team handles on-site installation guidance, staff training and
              after-sales service for schools, hospitals, colleges, IT campuses and government offices across {city.cities.slice(0, 4).join(", ")} and
              beyond. All machines ship with a 1-year manufacturer warranty and GST invoice, and comply with Solid Waste Management Rules 2016 and CPCB
              guidelines for menstrual waste disposal.
            </p>
          </div>
        </section>

        {/* Vending Machines */}
        <section id="vending-machines" className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">Category</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sanitary Napkin Vending Machines in {city.state}</h2>
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
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{p.code}</p>
                  <h3 className="font-bold text-gray-900 mt-1 text-lg group-hover:text-primary-600 transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4 leading-snug">{p.tagline}</p>
                  <span className="mt-3 block text-xs font-semibold text-primary-600 group-hover:underline">View Details / Enquire →</span>
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
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sanitary Napkin Incinerators in {city.state}</h2>
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
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{p.code}</p>
                  <h3 className="font-bold text-gray-900 mt-1 text-lg group-hover:text-primary-600 transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4 leading-snug">{p.tagline}</p>
                  <span className="mt-3 block text-xs font-semibold text-primary-600 group-hover:underline">View Details / Enquire →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#6B1FA8] via-[#A0268A] to-[#E8477A] py-14 text-white text-center px-5">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Need help choosing the right machine for {city.state}?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Our team will recommend the perfect model for your facility and coordinate delivery to {city.capital} and beyond. Free consultation, no obligation.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-[#A0268A] font-bold rounded-full shadow hover:-translate-y-0.5 transition-all">WhatsApp Us</Link>
              <Link href={`tel:${SITE.phone}`} className="px-8 py-3 bg-white/20 border border-white/30 text-white font-bold rounded-full hover:-translate-y-0.5 transition-all">Call Now</Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
