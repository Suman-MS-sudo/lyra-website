import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import FeatureGrid from "@/components/page/FeatureGrid";
import CategoryProductCard from "@/components/page/CategoryProductCard";
import { CtaBand } from "@/components/page/Blocks";
import { IconArrowRight } from "@/components/store/icons";
import { incinerators, SITE } from "@/lib/data";
import { offerPolicies } from "@/lib/offer-schema";

export const metadata: Metadata = {
  title: { absolute: "Napkin Incinerators — Models & Prices | Lyra Enterprises" },
  description:
    "Buy sanitary napkin incinerators in India: Micro (1–5), Mini (5–15) and Maxi (25–50 napkins/cycle). CPCB & SWM compliant. Call +91-8122378860.",
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
    title: "Sanitary Napkin Incinerators — All Models India | Lyra Enterprises",
    description: "Micro, Mini & Maxi incinerators. CPCB & SWM compliant. Pan-India delivery from Chennai.",
    url: `${SITE.url}/products/sanitary-napkin-incinerators`,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanitary Napkin Incinerators — All Models India | Lyra Enterprises",
    description: "Micro, Mini & Maxi incinerators. CPCB & SWM compliant. Pan-India delivery from Chennai.",
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const PAGE_URL = `${SITE.url}/products/sanitary-napkin-incinerators`;
const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sanitary Napkin Incinerators — Lyra Enterprises",
  url: PAGE_URL,
  numberOfItems: incinerators.length,
  itemListElement: incinerators.map((p, i) => ({
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
    { "@type": "ListItem", position: 3, name: "Incinerators", item: PAGE_URL },
  ],
};

export default function IncineratorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Incinerators" },
          ]}
          eyebrow="Category"
          title={<>Sanitary Napkin <span className="text-gradient">Incinerators</span></>}
          lead={
            <p>
              3 capacity models for every institution — from compact school units to hospital-grade high-capacity incinerators. Fully compliant with CPCB and Solid Waste Management Rules 2016.
            </p>
          }
          points={["CPCB Compliant", "SWM Rules 2016", "Zero Manual Handling"]}
          actions={
            <>
              <Link href="#models" className="btn btn-primary h-12 px-6">Browse 3 models</Link>
              <Link href="/blog/napkin-incinerator-vs-sanitary-bin" className="btn btn-secondary h-12 px-6">Incinerator vs bio-bin</Link>
            </>
          }
          images={incinerators.filter((p) => p.slug !== "lyra-micro-incinerator").map((p) => ({ src: p.image, alt: p.fullName }))}
        />

        <Section kicker="Why incinerate" title="Why incinerators over bio-bins?">
          <FeatureGrid
            items={[
              { icon: "🏥", title: "Zero infection risk", body: "High-temperature incineration kills all pathogens. Bio-bins accumulate bacteria and require manual handling." },
              { icon: "🌿", title: "Odour-free", body: "Complete combustion leaves only sterile ash. No odour, no leakage, no pest attraction." },
              { icon: "⚖️", title: "Legal compliance", body: "SWM Rules 2016 and CPCB guidelines mandate proper menstrual waste disposal for institutions." },
            ]}
          />
        </Section>

        <section id="models" className="scroll-mt-36 border-y border-line bg-subtle py-14 sm:py-20">
          <div className="lyra-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {incinerators.map((p, k) => (
              <CategoryProductCard key={p.slug} p={p} priority={k < 3} />
            ))}
          </div>
        </section>

        <Section>
          <div className="flex flex-col gap-6 rounded-[24px] border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold text-ink">Also see: Vending Machines</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-body">Many institutions pair incinerators with vending machines for a complete menstrual hygiene solution — one machine dispenses, the other safely disposes.</p>
            </div>
            <Link href="/products/sanitary-napkin-vending-machines" className="btn btn-ink h-12 flex-none px-6">
              Browse Vending Machines <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>

        <CtaBand
          title="Get the right incinerator for your facility"
          body="Tell us your daily user count — we'll recommend Micro, Mini or Maxi for your needs."
          primary={{ href: "https://wa.me/918122378860?text=Hi%21%20I%27m%20interested%20in%20a%20Lyra%20incinerator.%20Please%20share%20details.", label: "WhatsApp Us" }}
        />
      </main>
      <PageFooter />
    </>
  );
}
