import { RentalBand } from "@/components/rental/RentalCallout";
import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Image from "next/image";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import { CtaBand } from "@/components/page/Blocks";
import { IconCheck } from "@/components/store/icons";
import { SITE, vendingMachines, formatINR, priceInclGst } from "@/lib/data";
import AddToCartButton from "@/components/AddToCartButton";

const URL = `${SITE.url}/compare-sanitary-napkin-vending-machines`;
const TITLE = "Compare Sanitary Napkin Vending Machines (8 Models)";
const DESC =
  "Compare all 8 Lyra sanitary napkin vending machines side by side: payment, connectivity, IoT reports, capacity and price. Push button, coin, RFID, UPI QR, WiFi.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "compare sanitary napkin vending machines",
    "sanitary pad vending machine comparison india",
    "coin vs upi vs rfid napkin vending machine",
    "best sanitary napkin vending machine india",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

function capacity(p: (typeof vendingMachines)[number]): string {
  const spec = p.specs.find((s) => /capacity/i.test(s.label));
  return spec ? spec.value : "—";
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#webpage`,
      url: URL,
      name: TITLE,
      description: DESC,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${SITE.url}/#website` },
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "ItemList",
      name: "Lyra sanitary napkin vending machines",
      itemListElement: vendingMachines.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.fullName,
        url: `${SITE.url}/products/${p.slug}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
        { "@type": "ListItem", position: 3, name: "Compare models", item: URL },
      ],
    },
  ],
};

const YesNo = ({ v }: { v?: string }) =>
  v === "Yes" ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700" aria-label="Yes">
      <IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
    </span>
  ) : v === "No" ? (
    <span className="text-muted" aria-label="No">—</span>
  ) : (
    <>{v ?? "—"}</>
  );

export default function ComparePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Compare models" }]}
          eyebrow="Compare"
          title={<>Compare Sanitary Napkin <span className="text-gradient">Vending Machines</span></>}
          lead={
            <p>
              All 8 Lyra models side by side. Choose by how users pay, how the machine connects, and whether you need
              usage reporting. Prices are ex-GST; see the{" "}
              <Link href="/sanitary-napkin-vending-machine-price-india" className="font-semibold text-brand hover:underline">full price list</Link>.
            </p>
          }
        />

        <section className="bg-canvas py-12 sm:py-16">
          <div className="lyra-container">
            <div className="overflow-x-auto rounded-[24px] border border-line bg-surface">
              <table className="w-full min-w-[960px] text-sm">
                <thead className="bg-subtle text-left">
                  <tr>
                    {["Model", "Payment", "Connectivity", "Cloud reports", "Capacity", "Price (ex-GST)"].map((h, k) => (
                      <th key={h} className={`px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted ${k === 3 || k === 4 ? "text-center" : ""} ${k === 6 ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                    <th className="px-5 py-4"><span className="sr-only">Add to cart</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {vendingMachines.map((p) => (
                    <tr key={p.slug} className="transition-colors hover:bg-subtle/60">
                      <td className="px-5 py-4">
                        <Link href={`/products/${p.slug}`} className="group flex items-center gap-3">
                          <span className="relative h-14 w-14 flex-none overflow-hidden rounded-xl bg-subtle">
                            <Image src={p.image} alt="" fill sizes="56px" className="object-contain p-1.5" />
                          </span>
                          <span>
                            <span className="block font-display font-semibold text-ink group-hover:text-brand">{p.name}</span>
                            <span className="block text-xs text-muted">{p.badge}</span>
                          </span>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-body">{p.compare?.payment ?? "—"}</td>
                      <td className="px-5 py-4 text-body">{p.compare?.connectivity ?? "—"}</td>
                      <td className="px-5 py-4 text-center"><YesNo v={p.compare?.cloudReports} /></td>
                      <td className="px-5 py-4 text-body">{capacity(p)}</td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-display text-base font-semibold text-ink tabular">{formatINR(p.price)}</span>
                        <span className="block text-xs text-muted tabular">{formatINR(priceInclGst(p.price))} with GST</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <AddToCartButton slug={p.slug} name={p.fullName} price={p.price} variant="compact" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Section tone="subtle" kicker="Guide" title="How to choose">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Lowest cost, no connectivity", "Push Button, Solo Coin or Solo Multi."],
              ["Cashless payment", "Solo QR for UPI on a SIM, or Solo WiFi and Solo Ethernet for UPI plus coin with cloud reports."],
              ["Hostels and controlled access", "Solo RFID card access."],
              ["Free-issue, touch-free dispensing", "Solo Wave."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-[20px] border border-line bg-surface p-6">
                <h3 className="font-display text-base font-semibold text-ink">{t}:</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-body">
            Read the deeper guides on{" "}
            <Link href="/blog/upi-vs-coin-vending-machine" className="font-medium text-brand hover:underline">UPI vs coin</Link>{" "}
            and{" "}
            <Link href="/blog/manual-vs-automatic-napkin-vending-machine" className="font-medium text-brand hover:underline">manual vs automatic</Link>,
            or explore{" "}
            <Link href="/solutions" className="font-medium text-brand hover:underline">solutions by sector</Link>.
            Machines take XL (280 mm) and XXL (320 mm) napkin refills:{" "}
            <Link href="/products/xl-sanitary-napkin" className="font-medium text-brand hover:underline">XL</Link>,{" "}
            <Link href="/products/xxl-sanitary-napkin" className="font-medium text-brand hover:underline">XXL</Link>.
          </p>
        </Section>

        <RentalBand />
        <CtaBand
          title="Need help choosing?"
          body="Describe your facility and footfall. We will recommend the right model and quantity."
          primary={{ href: "/products/sanitary-napkin-vending-machines", label: "Shop vending machines" }}
        />
      </main>
      <PageFooter />
    </>
  );
}
