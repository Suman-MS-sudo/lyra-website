import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE, vendingMachines, formatINR, priceInclGst } from "@/lib/data";

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

export default function ComparePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Compare models" }]} />
            <h1 className="mt-6 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Compare Sanitary Napkin Vending Machines
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-3xl leading-relaxed">
              All 8 Lyra models side by side. Choose by how users pay, how the machine connects, and whether you need
              usage reporting. Prices are ex-GST; see the{" "}
              <Link href="/sanitary-napkin-vending-machine-price-india" className="text-primary-600 hover:underline">full price list</Link>.
            </p>
          </div>
        </section>

        <section className="py-12 max-w-6xl mx-auto px-5 sm:px-8">
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-700">
                  <th className="px-4 py-3 font-semibold">Model</th>
                  <th className="px-4 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 font-semibold">Connectivity</th>
                  <th className="px-4 py-3 font-semibold text-center">Cloud reports</th>
                  <th className="px-4 py-3 font-semibold text-center">Touch display</th>
                  <th className="px-4 py-3 font-semibold">Capacity</th>
                  <th className="px-4 py-3 font-semibold text-right">Price (ex-GST)</th>
                </tr>
              </thead>
              <tbody>
                {vendingMachines.map((p, i) => (
                  <tr key={p.slug} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-4 py-3 font-medium">
                      <Link href={`/products/${p.slug}`} className="text-primary-600 hover:underline">{p.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.compare?.payment ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{p.compare?.connectivity ?? "—"}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{p.compare?.cloudReports ?? "—"}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{p.compare?.touchDisplay ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{capacity(p)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatINR(p.price)}
                      <span className="block text-xs font-normal text-gray-500">{formatINR(priceInclGst(p.price))} with GST</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="pb-14 max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to choose</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li><strong>Lowest cost, no connectivity:</strong> Push Button, Solo Coin or Solo Multi.</li>
            <li><strong>Cashless payment:</strong> Solo QR for UPI on a SIM, or Solo WiFi and Solo Ethernet for UPI plus coin with cloud reports.</li>
            <li><strong>Hostels and controlled access:</strong> Solo RFID card access.</li>
            <li><strong>Free-issue, touch-free dispensing:</strong> Solo Wave.</li>
          </ul>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Read the deeper guides on{" "}
            <Link href="/blog/upi-vs-coin-vending-machine" className="text-primary-600 hover:underline">UPI vs coin</Link>{" "}
            and{" "}
            <Link href="/blog/manual-vs-automatic-napkin-vending-machine" className="text-primary-600 hover:underline">manual vs automatic</Link>,
            or explore{" "}
            <Link href="/solutions" className="text-primary-600 hover:underline">solutions by sector</Link>.
            Machines take XL (280 mm) and XXL (320 mm) napkin refills:{" "}
            <Link href="/products/xl-sanitary-napkin" className="text-primary-600 hover:underline">XL</Link>,{" "}
            <Link href="/products/xxl-sanitary-napkin" className="text-primary-600 hover:underline">XXL</Link>.
          </p>
          <p className="mt-6 text-sm text-gray-500">
            Need help choosing? Call <a href="tel:+918122378860" className="text-primary-600 hover:underline">{SITE.phoneDisplay}</a>.
          </p>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
