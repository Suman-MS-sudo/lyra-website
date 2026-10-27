import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Image from "next/image";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import FaqList from "@/components/page/FaqList";
import { Callout, CtaBand, StatRow } from "@/components/page/Blocks";
import { SITE, vendingMachines, incinerators, formatINR, priceInclGst, type Product } from "@/lib/data";
import AddToCartButton from "@/components/AddToCartButton";
import RentalPlanCards from "@/components/rental/RentalPlanCards";
import { RENTAL_PATH } from "@/lib/rental";

const URL = `${SITE.url}/sanitary-napkin-vending-machine-price-india`;
const TITLE = "Sanitary Napkin Vending Machine Price in India (2026)";
const DESC =
  "Sanitary napkin vending machine price in India: ₹12,000 to ₹26,500 ex-GST. 2026 price list for push-button, coin, UPI QR, RFID, WiFi models and incinerators.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "sanitary napkin vending machine price in india",
    "sanitary pad vending machine price",
    "napkin vending machine price",
    "automatic sanitary napkin dispenser price",
    "coin operated sanitary pad vending machine price",
    "upi qr sanitary pad vending machine price",
    "sanitary napkin incinerator machine price",
    "sanitary pad incinerator price",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    type: "article",
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises price list" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const lowest = Math.min(...vendingMachines.map((p) => p.price));
const highest = Math.max(...vendingMachines.map((p) => p.price));
const incLow = Math.min(...incinerators.map((p) => p.price));
const incHigh = Math.max(...incinerators.map((p) => p.price));

const faqs = [
  {
    q: "What is the price of a sanitary napkin vending machine in India?",
    a: `Lyra Enterprises sanitary napkin vending machines cost ${formatINR(lowest)} to ${formatINR(highest)} ex-GST. The Push Button model starts at ${formatINR(lowest)} and the Solo Ethernet IoT model is ${formatINR(highest)}. GST at 18% and freight are extra.`,
  },
  {
    q: "What is the monthly rent for a sanitary napkin vending machine?",
    a: "Lyra's all-inclusive rental, available across India, is ₹999 per month for a 25-napkin machine, ₹1,499 for 50 napkins and ₹1,999 for 100 napkins, plus 18% GST, for an IoT WiFi, IoT Ethernet or RFID machine. Installation, servicing, repairs, parts, online monitoring and napkin supply are handled by Lyra; the customer only refills napkins. A 3-year minimum agreement applies, with a refundable ₹4,999 deposit plus the first month's rent (or 3 months in advance) at signing.",
  },
  {
    q: "Are these prices inclusive of GST?",
    a: "No. All listed prices are ex-GST pricelist MRP. GST at 18% is added at billing. The GST-inclusive amount is shown next to each price in the table above.",
  },
  {
    q: "Does the price include delivery and installation?",
    a: "Freight is quoted separately based on your delivery pincode. Machines dispatch from our Chennai facility. Installation guidance and remote support are included, and on-site installation is available across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh and Telangana.",
  },
  {
    q: "What is the cheapest sanitary napkin vending machine?",
    a: `The Lyra Push Button at ${formatINR(lowest)} ex-GST is the lowest-priced machine. It runs offline with no SIM, data plan or subscription, and includes usage analytics you can download over its built-in WiFi hotspot.`,
  },
  {
    q: "Is there a discount for bulk or institutional orders?",
    a: `Yes. Volume pricing is available for orders of 5 or more units. Call ${SITE.phoneDisplay} or WhatsApp us for a bulk or institutional quote, including CSR and government purchases through GeM.`,
  },
  {
    q: "How much does a sanitary napkin incinerator cost?",
    a: `Lyra incinerators range from ${formatINR(incLow)} (Micro, 1–5 napkins per cycle) to ${formatINR(incHigh)} (Maxi, 25–50 napkins per cycle) ex-GST.`,
  },
  {
    q: "Do you supply sanitary napkins in bulk for the vending machines?",
    a: `Yes. Lyra supplies XL (280 mm regular flow) and XXL (320 mm heavy flow) individually wrapped sanitary napkins in bulk for institutions, made to fit all Lyra vending machines. Call ${SITE.phoneDisplay} for quantities and a quote.`,
  },
  {
    q: "Is there a combo price for a vending machine and incinerator?",
    a: "Yes. The Push Button vending machine plus Lyra Micro incinerator combo is ₹19,999 + GST + freight, which covers both dispensing and SWM Rules 2016-compliant disposal in one order.",
  },
];

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
      datePublished: "2026-09-25",
      dateModified: "2026-10-26",
    },
    {
      "@type": "ItemList",
      name: "Lyra Enterprises price list",
      itemListElement: [...vendingMachines, ...incinerators].map((p, i) => ({
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
        { "@type": "ListItem", position: 3, name: "Price list", item: URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// Mobile: label/value rows inside each card. Desktop: normal table cells.
const cell =
  "flex items-center justify-between gap-4 border-t border-line py-2 text-body before:text-xs before:font-medium before:text-muted before:content-[attr(data-label)] md:table-cell md:border-0 md:px-5 md:py-4 md:before:content-none";

function PriceTable({ items, withSpecs }: { items: Product[]; withSpecs?: boolean }) {
  return (
    <div className="md:overflow-hidden md:rounded-[24px] md:border md:border-line md:bg-surface">
      <table className="block w-full text-sm md:table">
        <thead className="hidden bg-subtle md:table-header-group">
          <tr className="text-left">
            <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Model</th>
            {withSpecs && <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Payment</th>}
            {withSpecs && <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Connectivity</th>}
            <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Price (ex-GST)</th>
            <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">With 18% GST</th>
            <th className="px-5 py-4"><span className="sr-only">Add to cart</span></th>
          </tr>
        </thead>
        <tbody className="block space-y-3 md:table-row-group md:space-y-0 md:divide-y md:divide-line">
          {items.map((p) => (
            <tr key={p.slug} className="block rounded-[20px] border border-line bg-surface p-4 md:table-row md:rounded-none md:border-0 md:p-0 md:hover:bg-subtle/60">
              <td className="block pb-3 md:table-cell md:px-5 md:py-4">
                <Link href={`/products/${p.slug}`} className="group flex items-center gap-3">
                  <span className="relative h-14 w-14 flex-none overflow-hidden rounded-xl bg-subtle">
                    <Image src={p.image} alt="" fill sizes="56px" className="object-contain p-1.5" />
                  </span>
                  <span className="font-display text-[15px] font-semibold leading-snug text-ink group-hover:text-brand">{p.fullName}</span>
                </Link>
              </td>
              {withSpecs && <td data-label="Payment" className={cell}>{p.compare?.payment ?? "—"}</td>}
              {withSpecs && <td data-label="Connectivity" className={cell}>{p.compare?.connectivity ?? "—"}</td>}
              <td data-label="Price (ex-GST)" className={`${cell} md:text-right`}>
                <span className="font-display text-base font-semibold text-ink tabular">{formatINR(p.price)}</span>
              </td>
              <td data-label="With 18% GST" className={`${cell} md:text-right tabular`}>{formatINR(priceInclGst(p.price))}</td>
              <td className="block pt-3 md:table-cell md:px-5 md:py-4 md:text-right">
                <AddToCartButton slug={p.slug} name={p.fullName} price={p.price} variant="compact" className="w-full md:w-auto [&_button]:w-full md:[&_button]:w-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Price list" }]}
          eyebrow="Price list · 2026"
          title={<>Sanitary Napkin Vending Machine <span className="text-gradient">Price in India</span></>}
          lead={
            <>
              <p>
                Lyra Enterprises publishes its prices openly. Vending machines range from{" "}
                <strong className="text-ink">{formatINR(lowest)}</strong> to <strong className="text-ink">{formatINR(highest)}</strong> ex-GST, and incinerators from{" "}
                <strong className="text-ink">{formatINR(incLow)}</strong> to <strong className="text-ink">{formatINR(incHigh)}</strong>. Manufactured in Chennai and
                supplied across India.
              </p>
              <p className="mt-3 text-sm text-muted">Prices are ex-GST pricelist MRP. GST at 18% and freight are extra. Updated September 2026.</p>
            </>
          }
        >
          <div className="mt-10 max-w-2xl">
            <StatRow
              items={[
                { label: "Vending from", value: formatINR(lowest) },
                { label: "Vending up to", value: formatINR(highest) },
                { label: "Incinerator from", value: formatINR(incLow) },
                { label: "Incinerator up to", value: formatINR(incHigh) },
              ]}
            />
          </div>
        </PageHero>

        <Section kicker="Vending machines" title="Sanitary napkin vending machine price list">
          <PriceTable items={vendingMachines} withSpecs />
        </Section>

        <Section
          id="rental"
          tone="subtle"
          kicker="Rental plans"
          title="Sanitary napkin vending machine rent per month"
          lead="Prefer a monthly cost? IoT WiFi, IoT Ethernet and RFID machines are available on rent, priced by napkin capacity."
          action={{ href: RENTAL_PATH, label: "Rental details" }}
        >
          <RentalPlanCards />
        </Section>

        <Section kicker="Incinerators" title="Sanitary napkin incinerator price list">
          <PriceTable items={incinerators} />
          <div className="mt-8">
            <Callout
              title="Combo: vending machine + incinerator"
              body="Push Button vending machine with Lyra Micro incinerator for ₹19,999 + GST + freight."
              href="/offers/push-button-micro-combo"
              label="See the combo offer →"
            />
          </div>
        </Section>

        <Section kicker="Total cost" title="What affects the total cost?">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["GST", "18% is added to every listed price at billing."],
              ["Freight", "quoted by delivery pincode. Machines dispatch from Chennai and take about 3–7 business days."],
              ["Running cost", "the Push Button, coin, multi-coin, wave, WiFi and Ethernet models need no SIM. The Solo QR uses a SIM whose monthly recharge you manage."],
              ["Quantity", "volume pricing applies from 5 units. CSR, school and government purchases can also go through GeM."],
              ["Add-ons", "some incinerators support an optional WiFi IoT module for remote temperature logging."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-[20px] border border-line bg-surface p-6">
                <h3 className="font-display text-base font-semibold text-ink">{t}:</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-4xl text-[15px] leading-relaxed text-body">
            Not sure which model fits? <Link href="/compare-sanitary-napkin-vending-machines" className="font-medium text-brand hover:underline">Compare all 8 models side by side</Link>, see refills ({" "}<Link href="/products/xl-sanitary-napkin" className="font-medium text-brand hover:underline">XL 280 mm</Link>,{" "}<Link href="/products/xxl-sanitary-napkin" className="font-medium text-brand hover:underline">XXL 320 mm</Link>{" "}), or read our{" "}
            <Link href="/blog/best-sanitary-napkin-vending-machine-india" className="font-medium text-brand hover:underline">comparison of all 8 models</Link>,{" "}
            <Link href="/blog/upi-vs-coin-vending-machine" className="font-medium text-brand hover:underline">UPI vs coin</Link>, or check{" "}
            <Link href="/government-schemes-menstrual-hygiene" className="font-medium text-brand hover:underline">government schemes and CSR funding</Link>{" "}
            that can pay for the purchase.
          </p>
        </Section>

        <Section tone="subtle" kicker="FAQ" title="Price FAQs" narrow>
          <FaqList items={faqs} />
        </Section>

        <CtaBand
          title="Get a quote for your site"
          body="Tell us your location and quantity. We reply with freight and any volume pricing."
          primary={{ href: "/contact", label: "Request a quote" }}
        />
      </main>
      <PageFooter />
    </>
  );
}
