import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/Blocks";
import { IconArrowRight } from "@/components/store/icons";
import IndiaServiceMap from "@/components/IndiaServiceMap";
import { cities, regionOrder, SITE, type IndiaRegion } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Napkin Vending Machines Across India — All States | Lyra" },
  description:
    "Lyra supplies and installs napkin vending machines and incinerators across all 28 states and 8 UTs of India. Chennai manufacturer. Call +91-8122378860.",
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
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas — Lyra Enterprises Across India",
    description:
      "Sanitary napkin vending machines and incinerators delivered and installed across all Indian states and union territories.",
    images: [`${SITE.url}/images/og-image.jpg`],
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
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
          eyebrow="Service areas"
          title={<>Sanitary Napkin Vending Machines &amp; Incinerators <span className="text-gradient">Across India</span></>}
          lead={
            <p>
              Lyra Enterprises manufactures every machine in-house in Chennai and delivers and installs across all {stateCount} states and {utCount} union
              territories of India. Below is where we ship, the districts we cover and typical dispatch timelines — pick your state for local details,
              pricing and an installation enquiry.
            </p>
          }
          points={["1-Year Warranty", "Pan-India Delivery", "GST Invoice", "Installation Support"]}
        />

        <section className="bg-canvas py-12 sm:py-16">
          <div className="lyra-container">
            <div className="rounded-[28px] border border-line bg-surface p-4 sm:p-8">
              <IndiaServiceMap />
            </div>
          </div>
        </section>

        {regionOrder.map((region, r) => {
          const list = byRegion[region];
          if (!list.length) return null;
          return (
            <section key={region} className={`py-12 sm:py-14 ${r % 2 === 1 ? "border-y border-line bg-subtle" : "bg-canvas"}`}>
              <div className="lyra-container">
                <div className="mb-6 flex items-baseline gap-3">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{region}</h2>
                  <span className="text-sm font-medium text-muted tabular">{list.length} {list.length === 1 ? "area" : "areas"}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}`}
                      className="group flex flex-col rounded-[20px] border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-ink group-hover:text-brand">{c.state}</h3>
                        <span className="rounded-md border border-line px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                          {c.kind === "union territory" ? "UT" : c.stateCode}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {c.capital} · ≈{c.districtsApprox} districts · dispatch {c.dispatch}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                        {c.cities.slice(0, 6).join(", ")}
                        {c.cities.length > 6 ? " and more" : ""}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                        View {c.state} page <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <CtaBand
          title="Not sure if we deliver to your location?"
          body={<>We ship to every pincode in India. Tell us your city and facility type — we&apos;ll confirm delivery time and quote freight.</>}
          primary={{ href: SITE.whatsapp, label: "WhatsApp Us" }}
        />
      </main>
      <PageFooter />
    </>
  );
}
