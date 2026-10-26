import type { Metadata } from "next";
import { RentalBand } from "@/components/rental/RentalCallout";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import CategoryProductCard from "@/components/page/CategoryProductCard";
import { CtaBand } from "@/components/page/Blocks";
import { IconCheck } from "@/components/store/icons";
import { vendingMachines, SITE } from "@/lib/data";
import { offerPolicies } from "@/lib/offer-schema";

export const metadata: Metadata = {
  title: { absolute: "Napkin (Pad) Vending Machines — 8 Models & Prices | Lyra" },
  description:
    "Buy sanitary napkin vending machines in India. 8 models from ₹12,000: push-button, coin, RFID, UPI QR, wave, WiFi, Ethernet. 1-year warranty.",
  keywords: [
    "sanitary napkin vending machine india",
    "napkin vending machine price india",
    "coin operated napkin vending machine india",
    "upi qr napkin vending machine india",
    "wifi iot napkin vending machine india",
    "rfid napkin vending machine india",
    "push button napkin vending machine india",
    "vending machine manufacturer chennai india",
    "sanitary napkin machine for schools hospitals offices",
    "best napkin vending machine india",
    "sanitary pad vending machine price india",
    "pad vending machine for schools india",
  ],
  alternates: { canonical: `${SITE.url}/products/sanitary-napkin-vending-machines` },
  openGraph: {
    title: "Sanitary Napkin Vending Machines — All Models India | Lyra Enterprises",
    description: "Compare all 8 models: push-button, coin, multi-coin, RFID, QR/UPI, wave sensor, WiFi and Ethernet. Prices from ₹12,000. Pan-India delivery.",
    url: `${SITE.url}/products/sanitary-napkin-vending-machines`,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanitary Napkin Vending Machines — All Models India | Lyra Enterprises",
    description: "Compare all 8 models: push-button, coin, multi-coin, RFID, QR/UPI, wave sensor, WiFi and Ethernet. Prices from ₹12,000. Pan-India delivery.",
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const PAGE_URL = `${SITE.url}/products/sanitary-napkin-vending-machines`;
const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sanitary Napkin Vending Machines — Lyra Enterprises",
  url: PAGE_URL,
  numberOfItems: vendingMachines.length,
  itemListElement: vendingMachines.map((p, i) => ({
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
    { "@type": "ListItem", position: 3, name: "Vending Machines", item: PAGE_URL },
  ],
};

const comparisonRows: { label: string; key: "payment" | "connectivity" | "cloudReports" | "touchDisplay" | "iotMonitoring" }[] = [
  { label: "Payment", key: "payment" },
  { label: "Connectivity", key: "connectivity" },
  { label: "Cloud Reports", key: "cloudReports" },
  { label: "Touch Display", key: "touchDisplay" },
  { label: "IoT Monitoring", key: "iotMonitoring" },
];

export default function VendingMachinesPage() {
  const picks = vendingMachines.filter((p) => p.popular || p.slug === "push-button-vending-machine");
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
            { label: "Vending Machines" },
          ]}
          eyebrow="Category"
          title={<>Sanitary Napkin <span className="text-gradient">Vending Machines</span></>}
          lead={
            <p>
              8 models to match every budget and facility — from ₹12,000 push-button dispensers to touchless wave-sensor units and IoT-enabled smart machines with UPI payments and cloud analytics. Manufactured in Chennai, delivered across India. Prices exclude 18% GST; freight additional.
            </p>
          }
          points={["1-Year Warranty", "Pan-India Delivery", "Free Installation Support"]}
          actions={
            <>
              <Link href="#models" className="btn btn-primary h-12 px-6">Browse 8 models</Link>
              <Link href="/compare-sanitary-napkin-vending-machines" className="btn btn-secondary h-12 px-6">Compare side by side</Link>
            </>
          }
          images={picks.map((p) => ({ src: p.image, alt: p.fullName }))}
        />

        <section id="models" className="scroll-mt-36 bg-canvas py-14 sm:py-20">
          <div className="lyra-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vendingMachines.map((p, k) => (
              <CategoryProductCard key={p.slug} p={p} priority={k < 3} />
            ))}
          </div>
        </section>

        <Section tone="subtle" kicker="Compare" title="Quick Comparison" action={{ href: "/compare-sanitary-napkin-vending-machines", label: "Full comparison" }}>
          <div className="overflow-x-auto rounded-[20px] border border-line bg-surface">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-subtle">
                <tr>
                  <th className="sticky left-0 bg-subtle px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Feature</th>
                  {vendingMachines.map((p) => (
                    <th key={p.slug} className="px-4 py-4 text-center font-display text-[13px] font-semibold text-ink">
                      <Link href={`/products/${p.slug}`} className="hover:text-brand">{p.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td className="sticky left-0 bg-surface px-5 py-3.5 font-medium text-ink">{row.label}</td>
                    {vendingMachines.map((p) => {
                      const val = p.compare ? p.compare[row.key] : "—";
                      return (
                        <td key={p.slug} className="px-4 py-3.5 text-center text-body">
                          {val === "Yes" ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700" aria-label="Yes"><IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} /></span>
                          ) : val === "No" ? (
                            <span className="text-muted" aria-label="No">—</span>
                          ) : (
                            val
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <RentalBand />
        <CtaBand
          title="Not sure which model to choose?"
          body="Tell us your facility type and budget — our team will recommend the right machine within 30 minutes."
          primary={{ href: "https://wa.me/918122378860?text=Hi%21%20I%27m%20interested%20in%20a%20Lyra%20vending%20machine.%20Please%20help%20me%20choose%20the%20right%20model.", label: "WhatsApp Us" }}
        />
      </main>
      <PageFooter />
    </>
  );
}
