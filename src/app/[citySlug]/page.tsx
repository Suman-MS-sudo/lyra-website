import { RentalBand } from "@/components/rental/RentalCallout";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import FaqList from "@/components/page/FaqList";
import { stateFacts } from "@/lib/state-facts";
import ProductCard from "@/components/store/ProductCard";
import { CtaBand, StatRow } from "@/components/page/Blocks";
import { IconArrowRight } from "@/components/store/icons";
import { toCatalogItem } from "@/lib/catalog";
import GoogleReviews from "@/components/GoogleReviews";
import { offerPolicies } from "@/lib/offer-schema";
import {
  vendingMachines,
  incinerators,
  cities,
  SITE,
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
  const facts = stateFacts(city.stateCode, city.region);
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
      a: `Pricing is the same nationwide: from ₹12,000 (+18% GST) for the Push Button model up to ₹26,500 for the Solo Ethernet IoT machine. Incinerators range ₹13,000–₹40,000. Freight to ${city.state} is quoted separately based on the delivery pincode.`,
    },
    {
      q: `Do you provide on-site installation and service in ${city.state}?`,
      a: facts.onsite
        ? `Yes. Lyra installs purchased machines on-site in ${city.state}, trains your staff and provides after-sales service. Every machine carries a 1-year manufacturer warranty, and rented machines are installed and serviced by Lyra.`
        : `For machines bought outright, Lyra provides installation guidance and remote support in ${city.state}; the machines wall-mount on standard 230V mains. Every machine carries a 1-year manufacturer warranty. If you want Lyra to install and look after the machine, choose the all-inclusive rental, which Lyra installs and services across India.`,
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
      q: `What GST applies to a Lyra machine delivered to ${city.state}?`,
      a: `${facts.taxNote}. ${city.state}'s GST state code is ${facts.gstCode}; add your GSTIN at checkout to claim input tax credit. Sanitary napkins are GST-exempt.`,
    },
    {
      q: `Which Lyra office serves ${city.state}?`,
      a: `${city.state} is served by Lyra's ${facts.office.name} in ${facts.office.place}, with machines manufactured and dispatched from Chennai. Call +91-81223 78860 or WhatsApp for a quote.`,
    },
    ...(facts.scheme
      ? [
          {
            q: `Does ${city.state} have a government scheme for sanitary napkins?`,
            a: `Yes. The ${facts.scheme.name} provides ${facts.scheme.note}. Institutions distributing napkins under such programmes often use free-issue machines such as the Lyra Push Button or the touchless Solo Wave. See all central and CSR funding routes on our government schemes page.`,
          },
        ]
      : []),
    {
      q: `Can we rent a sanitary napkin vending machine in ${city.state}?`,
      a: `Yes. Lyra's all-inclusive rental is available in ${city.state}: an IoT WiFi, IoT Ethernet or RFID machine from ₹999 per month plus GST, with installation, servicing, repairs, parts and online monitoring included. You only refill napkins, which Lyra supplies.`,
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
    body: "GeM-ready models, GST invoicing and multi-site supply for welfare schemes and public institutions — see which schemes fund it.",
    href: "/government-schemes-menstrual-hygiene",
  },
];

export default function CityPage({ params }: { params: { citySlug: string } }) {
  const city = getCity(params.citySlug);
  if (!city) notFound();

  const canonical = `${SITE.url}/${city.slug}`;
  // Rotate through the region (the next 6 states after this one, wrapping) so every
  // state page receives internal links, instead of the first 6 in the region always winning.
  const regionStates = cities.filter((c) => c.region === city.region);
  const at = regionStates.findIndex((c) => c.slug === city.slug);
  const nearby = [...regionStates.slice(at + 1), ...regionStates.slice(0, at)].slice(0, 6);
  const faqs = getStateFaqs(city);
  const facts = stateFacts(city.stateCode, city.region);
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
    openingHours: "Mo-Sa 09:30-18:30",
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
    hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "18:30" },
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
          ...offerPolicies,
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

  const heroImages = ["solo-wifi-vending-machine", "lyra-mini-incinerator"]
    .map((slug) => [...vendingMachines, ...incinerators].find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => ({ src: p!.image, alt: p!.fullName }));

  const schemas = [breadcrumbSchema, localBusinessSchema, serviceSchema, productListSchema, faqSchema];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/service-areas" }, { label: city.state }]}
          eyebrow={`${city.region} · Service area`}
          title={
            <>
              Sanitary Napkin Vending Machines &amp; Incinerators in <span className="text-gradient">{city.state}</span>
            </>
          }
          lead={<p>{city.description}</p>}
          actions={
            <>
              <a href="#vending-machines" className="btn btn-primary h-12 px-6">Vending Machines ↓</a>
              <a href="#incinerators" className="btn btn-secondary h-12 px-6">Incinerators ↓</a>
              <a href="#faq" className="btn btn-ghost h-12 px-4">{city.state} FAQs ↓</a>
            </>
          }
          images={heroImages}
        >
          <div className="mt-10 max-w-2xl">
            <StatRow
              items={[
                { label: "Region", value: city.region },
                { label: city.kind === "union territory" ? "HQ / Capital" : "Capital", value: city.capital },
                { label: "Districts", value: <>≈ {city.districtsApprox}</> },
                { label: "Dispatch", value: city.dispatch },
              ]}
            />
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Cities served in ${city.state}`}>
              {city.cities.map((c) => (
                <li key={c} className="rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </PageHero>

        {/* Local install / service note */}
        <section className="bg-canvas pt-14 sm:pt-20">
          <div className="lyra-container">
            <div className="grid gap-8 rounded-[24px] border border-line bg-surface p-7 sm:p-10 lg:grid-cols-[0.8fr_1.6fr]">
              <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-ink">Serving {city.state} pan-India from our South and North India offices</h2>
              <div>
                <p className="text-[15.5px] leading-relaxed text-body">
                  Lyra Enterprises manufactures every sanitary napkin vending machine and incinerator in-house at our Chennai facility and dispatches to{" "}
                  {city.state} in a typical {city.dispatch} — covering {city.capital} and {city.kind === "union territory" ? "the whole territory" : `all ≈${city.districtsApprox} districts`}.
                  We supply {city.context}. With offices in South India (Chennai) and North India (West Bengal), our team handles installation guidance,
                  staff training and after-sales service for schools, colleges, hospitals, IT campuses and government offices across{" "}
                  {city.cities.slice(0, 4).join(", ")} and beyond. Every machine ships with a 1-year manufacturer
                  warranty and GST invoice, and complies with Solid Waste Management Rules 2016 and CPCB guidelines for menstrual waste disposal.
                </p>
                <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                  {[
                    ["GST state code", `${facts.gstCode} · ${facts.taxNote.split(":")[0]}`],
                    ["Serving office", `${facts.office.name}, ${facts.office.place}`],
                    ["Typical dispatch", `${city.dispatch} from Chennai`],
                    ["Installation", facts.onsite ? "On-site installation and service" : "Guided installation + remote support"],
                    ["Rental", "All-inclusive rental available, from ₹999/month + GST"],
                    ["State scheme", facts.scheme ? facts.scheme.name : "Central schemes and CSR funding apply"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-surface px-4 py-3">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{k}</dt>
                      <dd className="mt-1 text-sm font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-muted">
                  Machine prices start at ₹12,000 (+18% GST); freight to {city.state} is quoted separately based on destination.{" "}
                  <Link href="/products/sanitary-napkin-vending-machines" className="font-semibold text-brand hover:underline">See all models and prices →</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <Section
          id="vending-machines"
          kicker="Category"
          title={<>Sanitary Napkin Vending Machines in {city.state}</>}
          action={{ href: "/products/sanitary-napkin-vending-machines", label: "View all vending machines" }}
        >
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {vendingMachines.map((p, k) => (
              <li key={p.slug}>
                <ProductCard product={toCatalogItem(p)} index={k} />
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="incinerators"
          tone="subtle"
          kicker="Category"
          title={<>Sanitary Napkin Incinerators in {city.state}</>}
          action={{ href: "/products/sanitary-napkin-incinerators", label: "View all incinerators" }}
        >
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {incinerators.map((p, k) => (
              <li key={p.slug}>
                <ProductCard product={toCatalogItem(p)} index={k} />
              </li>
            ))}
          </ul>
        </Section>

        <Section
          kicker="Sectors"
          title={<>Who we supply in {city.state}</>}
          lead="Menstrual-hygiene infrastructure for every kind of institution — with the right machine and disposal capacity for each."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col rounded-[22px] border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift"
              >
                <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{s.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Learn more <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-6 rounded-[24px] border border-primary-200 bg-primary-50 p-7 sm:p-9 lg:grid-cols-[1.6fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Menstrual waste compliance in {city.state}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                Institutions in {city.state} are covered by India&apos;s <strong className="text-ink">Solid Waste Management Rules 2016</strong>, which require sanitary waste to be
                handled separately and disposed of safely, and by CPCB guidance on menstrual-waste incineration. Pairing a Lyra vending machine with a
                CPCB-compliant Lyra incinerator gives schools, colleges and hospitals in {city.capital} and across {city.state} an audit-ready closed loop —
                from access to disposal — in a single procurement.
              </p>
            </div>
            <div className="grid gap-2 text-sm font-semibold">
              <Link href="/blog/solid-waste-management-rules-2016-india-guide" className="flex items-center justify-between rounded-xl border border-primary-200 bg-surface px-4 py-3 text-ink hover:border-brand">
                SWM Rules 2016 guide <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/products/vending-incinerator-bundle" className="flex items-center justify-between rounded-xl border border-primary-200 bg-surface px-4 py-3 text-ink hover:border-brand">
                Vending + incinerator bundle <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Section>

        <GoogleReviews limit={2} />

        <Section id="faq" tone="subtle" kicker="FAQ" title={<>Sanitary Napkin Vending Machines in {city.state} — FAQs</>}>
          <div className="max-w-4xl">
            <FaqList items={faqs} />
          </div>
        </Section>

        {nearby.length > 0 && (
          <section className="bg-canvas pt-14 sm:pt-16">
            <div className="lyra-container">
              <h2 className="font-display text-xl font-semibold text-ink">Also serving {city.region}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {nearby.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    className="inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    {c.state}
                  </Link>
                ))}
                <Link href="/service-areas" className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-semibold text-canvas hover:bg-ink/85">
                  All states &amp; UTs →
                </Link>
              </div>
            </div>
          </section>
        )}

        <RentalBand />
        <CtaBand
          title={<>Need help choosing the right machine for {city.state}?</>}
          body={<>Our team will recommend the perfect model for your facility and coordinate delivery to {city.capital} and beyond. Free consultation, no obligation.</>}
          primary={{ href: SITE.whatsapp, label: "WhatsApp Us" }}
        />
      </main>
      <PageFooter />
    </>
  );
}
