import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import TrackedLink from "@/components/TrackedLink";
import { SITE, vendingMachines, incinerators, formatINR, priceInclGst } from "@/lib/data";
import AddToCartButton from "@/components/AddToCartButton";

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
      dateModified: "2026-09-25",
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
  "flex items-baseline justify-between gap-4 border-t border-gray-100 py-1.5 text-gray-600 before:text-xs before:font-medium before:text-gray-500 before:content-[attr(data-label)] md:table-cell md:border-0 md:px-4 md:py-3 md:before:content-none";

export default function PricePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-10 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Price list" }]} />
            <h1 className="mt-6 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Sanitary Napkin Vending Machine Price in India
            </h1>
            <p className="mt-4 sm:mt-5 text-gray-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Lyra Enterprises publishes its prices openly. Vending machines range from{" "}
              <strong>{formatINR(lowest)}</strong> to <strong>{formatINR(highest)}</strong> ex-GST, and incinerators from{" "}
              <strong>{formatINR(incLow)}</strong> to <strong>{formatINR(incHigh)}</strong>. Manufactured in Chennai and
              supplied across India.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Prices are ex-GST pricelist MRP. GST at 18% and freight are extra. Updated September 2026.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-12 max-w-5xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Sanitary napkin vending machine price list</h2>
          {/* Below md each table row becomes a stacked card (no sideways scrolling on phones) */}
          <div className="md:overflow-x-auto md:rounded-xl md:border md:border-gray-200">
            <table className="block w-full text-sm md:table">
              <thead className="hidden md:table-header-group">
                <tr className="bg-gray-50 text-left text-gray-700">
                  <th className="px-4 py-3 font-semibold">Model</th>
                  <th className="px-4 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 font-semibold">Connectivity</th>
                  <th className="px-4 py-3 font-semibold text-right">Price (ex-GST)</th>
                  <th className="px-4 py-3 font-semibold text-right">With 18% GST</th>
                  <th className="px-4 py-3 font-semibold text-right"><span className="sr-only">Add to cart</span></th>
                </tr>
              </thead>
              <tbody className="block space-y-3 md:table-row-group md:space-y-0">
                {vendingMachines.map((p, i) => (
                  <tr key={p.slug} className={`block rounded-xl border border-gray-200 p-4 md:table-row md:rounded-none md:border-0 md:p-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                    <td className="block pb-2 text-base font-semibold md:table-cell md:px-4 md:py-3 md:pb-3 md:text-sm md:font-medium">
                      <Link href={`/products/${p.slug}`} className="text-primary-700 hover:underline">
                        {p.fullName}
                      </Link>
                    </td>
                    <td data-label="Payment" className={cell}>{p.compare?.payment ?? "—"}</td>
                    <td data-label="Connectivity" className={cell}>{p.compare?.connectivity ?? "—"}</td>
                    <td data-label="Price (ex-GST)" className={`${cell} md:text-right md:font-semibold md:text-gray-900`}><span className="font-semibold text-gray-900">{formatINR(p.price)}</span></td>
                    <td data-label="With 18% GST" className={`${cell} md:text-right`}>{formatINR(priceInclGst(p.price))}</td>
                    <td className="block pt-3 md:table-cell md:px-4 md:py-3 md:pt-3 md:text-right">
                      <AddToCartButton slug={p.slug} name={p.fullName} price={p.price} variant="compact" className="w-full md:w-auto [&_button]:w-full [&_button]:py-2.5 md:[&_button]:w-auto md:[&_button]:py-1.5" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 sm:mt-14 mb-6">Sanitary napkin incinerator price list</h2>
          <div className="md:overflow-x-auto md:rounded-xl md:border md:border-gray-200">
            <table className="block w-full text-sm md:table">
              <thead className="hidden md:table-header-group">
                <tr className="bg-gray-50 text-left text-gray-700">
                  <th className="px-4 py-3 font-semibold">Model</th>
                  <th className="px-4 py-3 font-semibold text-right">Price (ex-GST)</th>
                  <th className="px-4 py-3 font-semibold text-right">With 18% GST</th>
                  <th className="px-4 py-3 font-semibold text-right"><span className="sr-only">Add to cart</span></th>
                </tr>
              </thead>
              <tbody className="block space-y-3 md:table-row-group md:space-y-0">
                {incinerators.map((p, i) => (
                  <tr key={p.slug} className={`block rounded-xl border border-gray-200 p-4 md:table-row md:rounded-none md:border-0 md:p-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                    <td className="block pb-2 text-base font-semibold md:table-cell md:px-4 md:py-3 md:pb-3 md:text-sm md:font-medium">
                      <Link href={`/products/${p.slug}`} className="text-primary-700 hover:underline">
                        {p.fullName}
                      </Link>
                    </td>
                    <td data-label="Price (ex-GST)" className={`${cell} md:text-right`}><span className="font-semibold text-gray-900">{formatINR(p.price)}</span></td>
                    <td data-label="With 18% GST" className={`${cell} md:text-right`}>{formatINR(priceInclGst(p.price))}</td>
                    <td className="block pt-3 md:table-cell md:px-4 md:py-3 md:pt-3 md:text-right">
                      <AddToCartButton slug={p.slug} name={p.fullName} price={p.price} variant="compact" className="w-full md:w-auto [&_button]:w-full [&_button]:py-2.5 md:[&_button]:w-auto md:[&_button]:py-1.5" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50 p-5 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-1">Combo: vending machine + incinerator</h3>
            <p className="text-sm text-gray-700">
              Push Button vending machine with Lyra Micro incinerator for ₹19,999 + GST + freight.{" "}
              <Link href="/offers/push-button-micro-combo" className="text-primary-600 font-semibold hover:underline">
                See the combo offer →
              </Link>
            </p>
          </div>
        </section>

        <section className="py-4 pb-12 max-w-5xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">What affects the total cost?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li><strong>GST:</strong> 18% is added to every listed price at billing.</li>
            <li><strong>Freight:</strong> quoted by delivery pincode. Machines dispatch from Chennai and take about 3–7 business days.</li>
            <li><strong>Running cost:</strong> the Push Button, coin, multi-coin, wave, WiFi and Ethernet models need no SIM. The Solo QR uses a SIM whose monthly recharge you manage.</li>
            <li><strong>Quantity:</strong> volume pricing applies from 5 units. CSR, school and government purchases can also go through GeM.</li>
            <li><strong>Add-ons:</strong> some incinerators support an optional WiFi IoT module for remote temperature logging.</li>
          </ul>
          <p className="mt-4 text-gray-700 leading-relaxed [&_a]:inline-block [&_a]:py-1">
            Not sure which model fits? <Link href="/compare-sanitary-napkin-vending-machines" className="text-primary-600 hover:underline">Compare all 8 models side by side</Link>, see refills ({" "}<Link href="/products/xl-sanitary-napkin" className="text-primary-600 hover:underline">XL 280 mm</Link>,{" "}<Link href="/products/xxl-sanitary-napkin" className="text-primary-600 hover:underline">XXL 320 mm</Link>{" "}), or read our{" "}
            <Link href="/blog/best-sanitary-napkin-vending-machine-india" className="text-primary-600 hover:underline">comparison of all 8 models</Link>,{" "}
            <Link href="/blog/upi-vs-coin-vending-machine" className="text-primary-600 hover:underline">UPI vs coin</Link>, or check{" "}
            <Link href="/government-schemes-menstrual-hygiene" className="text-primary-600 hover:underline">government schemes and CSR funding</Link>{" "}
            that can pay for the purchase.
          </p>
        </section>

        <section className="py-10 sm:py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Price FAQs</h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-gray-200 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14 bg-gradient-to-r from-blue-600 to-teal-500">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-4">Get a quote for your site</h2>
            <p className="text-white/80 mb-8">Tell us your location and quantity. We reply with freight and any volume pricing.</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4">
              <TrackedLink method="call" detail="price-page" href="tel:+918122378860" className="px-8 py-4 text-center bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition-colors">
                {SITE.phoneDisplay}
              </TrackedLink>
              <Link href="/contact" className="px-8 py-4 text-center bg-white/20 text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                Request a quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
