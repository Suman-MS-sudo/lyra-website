import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import {
  vendingMachines,
  incinerators,
  cities,
  SITE,
  formatINR,
  type StateLocation,
} from "@/lib/data";

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
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    keywords: city.keywords,
    alternates: { canonical },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: canonical,
      type: "website",
      siteName: SITE.name,
      images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: `Lyra Enterprises — ${city.state}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
      images: [`${SITE.url}/images/og-image.jpg`],
    },
  };
}

/* ─── State-specific FAQ content ───────────────────────────── */
function getStateFaqs(city: StateLocation) {
  const [c1, c2, c3] = city.cities;
  const coverage =
    city.kind === "union territory"
      ? "the whole territory"
      : `all ≈${city.districtsApprox} districts`;
  return [
    {
      q: `Do you deliver sanitary napkin vending machines to ${city.state}?`,
      a: `Yes. Lyra Enterprises manufactures in Chennai and delivers and installs sanitary napkin vending machines and incinerators across ${city.state} — ${city.capital} and ${coverage} — with a typical dispatch of ${city.dispatch}.`,
    },
    {
      q: `What is the price of a sanitary napkin vending machine in ${city.state}?`,
      a: `Pricing is the same nationwide: from ₹11,000 (+18% GST) for the Push Button model up to ₹26,500 for the Solo Ethernet IoT machine. Incinerators range ₹12,500–₹39,500. Freight to ${city.state} is quoted separately based on the delivery pincode.`,
    },
    {
      q: `Do you provide on-site installation and service in ${city.state}?`,
      a: `Yes. Installation guidance, staff training and after-sales support are included with every order in ${city.state}${c1 ? ` — on-site in ${c1}, ${c2} and ${c3}` : ""} and by remote support elsewhere. Every machine carries a 1-year manufacturer warranty.`,
    },
    {
      q: `Are Lyra machines compliant for schools, colleges and hospitals in ${city.state}?`,
      a: `Yes. Every Lyra vending machine and incinerator meets Solid Waste Management Rules 2016 and CPCB guidelines for menstrual waste, which apply across ${city.state}. A GST invoice is provided for institutional and government procurement.`,
    },
    {
      q: `How long does delivery to ${city.capital} take?`,
      a: `Dispatch from our Chennai facility to ${city.state} is typically ${city.dispatch}; ${city.capital} and nearby districts are usually at the faster end of that window. We confirm an exact timeline when you send an enquiry.`,
    },
    {
      q: `Can we order in bulk for multiple locations across ${city.state}?`,
      a: `Yes. Lyra handles multi-site rollouts for state education departments, hospital groups, universities and corporates across ${city.state} with consolidated pricing and phased delivery. Call +91-8122378860 or WhatsApp for a bulk quote.`,
    },
  ];
}

const sectors = [
  {
    title: "Schools & Colleges",
    body: "Push-button and coin models that cut period-related absenteeism, plus Micro/Mini incinerators for compliant disposal.",
    href: "/solutions/schools-colleges",
  },
  {
    title: "Hospitals & Clinics",
    body: "UPI and IoT machines for OPD and ward washrooms; Mini and Maxi incinerators sized for high daily volumes.",
    href: "/solutions/hospitals",
  },
  {
    title: "Offices & IT Parks",
    body: "Cashless UPI/WiFi machines with cloud reports and low-stock alerts for facilities teams.",
    href: "/solutions/offices",
  },
  {
    title: "Government & PSU",
    body: "GeM-ready models, GST invoicing and multi-site supply for welfare schemes and public institutions.",
    href: "/products",
  },
];

export default function CityPage({ params }: { params: { citySlug: string } }) {
  const city = getCity(params.citySlug);
  if (!city) notFound();

  const canonical = `${SITE.url}/${city.slug}`;
  const nearby = cities
    .filter((c) => c.region === city.region && c.slug !== city.slug)
    .slice(0, 6);
  const faqs = getStateFaqs(city);
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE.url}/service-areas` },
      { "@type": "ListItem", position: 3, name: city.state, item: canonical },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonical}#business`,
    name: `Lyra Enterprises — ${city.state}`,
    url: canonical,
    description: city.description,
    image: `${SITE.url}/images/og-image.jpg`,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: ["Cash", "UPI", "Bank Transfer", "Cheque"],
    telephone: SITE.phone,
    email: SITE.email,
    openingHours: "Mo-Sa 09:00-18:00",
    parentOrganization: { "@id": `${SITE.url}/#organization` },
    areaServed: [
      { "@type": "State", name: city.state },
      ...city.cities.map((c) => ({ "@type": "City", name: c })),
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "10/21, Vasuki Street, Cholapuram, Ambattur",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600053",
      addressCountry: "IN",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Sanitary Napkin Vending Machine & Incinerator Supply and Installation in ${city.state}`,
    serviceType: "Sanitary napkin vending machine and incinerator supply, delivery and installation",
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "State", name: city.state },
    url: canonical,
    hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
  };

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Sanitary Napkin Vending Machines & Incinerators available in ${city.state}`,
    numberOfItems: vendingMachines.length + incinerators.length,
    itemListElement: [...vendingMachines, ...incinerators].map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.fullName,
        sku: p.code,
        mpn: p.code,
        image: `${SITE.url}${p.image}`,
        brand: { "@type": "Brand", name: "Lyra Enterprises" },
        category:
          p.category === "vending-machine"
            ? "Sanitary Napkin Vending Machine"
            : "Sanitary Napkin Incinerator",
        url: `${SITE.url}/products/${p.slug}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: p.price,
          priceValidUntil,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "State", name: city.state },
        },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const schemas = [breadcrumbSchema, localBusinessSchema, serviceSchema, productListSchema, faqSchema];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/service-areas" }, { label: city.state }]} />
          <h1 className="mt-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Sanitary Napkin Vending Machines &amp; Incinerators in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">{city.state}</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-3xl">{city.description}</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-500">Region</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{city.region}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-500">{city.kind === "union territory" ? "HQ / Capital" : "Capital"}</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{city.capital}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-500">Districts</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">≈ {city.districtsApprox}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-500">Dispatch</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{city.dispatch}</p>
            </div>
          </div>

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
            <a href="#faq" className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors">{city.state} FAQs ↓</a>
          </div>
        </section>

        {/* Local install / service note */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-14">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Serving {city.state} from our Chennai facility</h2>
            <p className="text-gray-600 leading-relaxed">
              Lyra Enterprises manufactures every sanitary napkin vending machine and incinerator in-house at our Chennai facility and dispatches to{" "}
              {city.state} in a typical {city.dispatch} — covering {city.capital} and {city.kind === "union territory" ? "the whole territory" : `all ≈${city.districtsApprox} districts`}.
              We supply {city.context}. Our team handles installation guidance, staff training and after-sales service for schools, colleges, hospitals,
              IT campuses and government offices across {city.cities.slice(0, 4).join(", ")} and beyond. Every machine ships with a 1-year manufacturer
              warranty and GST invoice, and complies with Solid Waste Management Rules 2016 and CPCB guidelines for menstrual waste disposal.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Machine prices start at ₹11,000 (+18% GST); freight to {city.state} is quoted separately based on destination.{" "}
              <Link href="/products/sanitary-napkin-vending-machines" className="font-semibold text-primary-600 hover:underline">See all models and prices →</Link>
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
                  <p className="text-sm text-gray-500 mt-1 mb-3 leading-snug">{p.tagline}</p>
                  <p className="text-sm font-bold text-gray-900">{formatINR(p.price)} <span className="text-[11px] font-medium text-gray-500">+ 18% GST</span></p>
                  <span className="mt-3 block text-xs font-semibold text-primary-600 group-hover:underline">View Details / Enquire →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Incinerators */}
        <section id="incinerators" className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
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
                  <p className="text-sm text-gray-500 mt-1 mb-3 leading-snug">{p.tagline}</p>
                  <p className="text-sm font-bold text-gray-900">{formatINR(p.price)} <span className="text-[11px] font-medium text-gray-500">+ 18% GST</span></p>
                  <span className="mt-3 block text-xs font-semibold text-primary-600 group-hover:underline">View Details / Enquire →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Sectors served */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Who we supply in {city.state}</h2>
          <p className="text-gray-500 mb-8 max-w-2xl">Menstrual-hygiene infrastructure for every kind of institution — with the right machine and disposal capacity for each.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sectors.map((s) => (
              <Link key={s.title} href={s.href} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5">
                <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-snug">{s.body}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-primary-600 group-hover:underline">Learn more →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Compliance */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-pink-50 border border-primary-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Menstrual waste compliance in {city.state}</h2>
            <p className="text-gray-600 leading-relaxed">
              Institutions in {city.state} are covered by India&apos;s <strong>Solid Waste Management Rules 2016</strong>, which require sanitary waste to be
              handled separately and disposed of safely, and by CPCB guidance on menstrual-waste incineration. Pairing a Lyra vending machine with a
              CPCB-compliant Lyra incinerator gives schools, colleges and hospitals in {city.capital} and across {city.state} an audit-ready closed loop —
              from access to disposal — in a single procurement.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
              <Link href="/blog/solid-waste-management-rules-2016-india-guide" className="text-primary-600 hover:underline">SWM Rules 2016 guide →</Link>
              <Link href="/products/vending-incinerator-bundle" className="text-primary-600 hover:underline">Vending + incinerator bundle →</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Sanitary Napkin Vending Machines in {city.state} — FAQs</h2>
          <div className="space-y-4 max-w-3xl">
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

        {/* Nearby states — internal linking */}
        {nearby.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Also serving {city.region}</h2>
            <div className="flex flex-wrap gap-2">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary-300 hover:text-primary-700 transition-colors"
                >
                  {c.state}
                </Link>
              ))}
              <Link
                href="/service-areas"
                className="px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                All states &amp; UTs →
              </Link>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#6B1FA8] via-[#A0268A] to-[#E8477A] py-14 text-white text-center px-5">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Need help choosing the right machine for {city.state}?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Our team will recommend the perfect model for your facility and coordinate delivery to {city.capital} and beyond. Free consultation, no obligation.</p>
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
