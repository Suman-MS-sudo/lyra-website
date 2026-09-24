import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

const SLUG = "gem-tender-sanitary-napkin-vending-machine-guide";
const URL = `${SITE.url}/blog/${SLUG}`;
const TITLE = "How to Buy Napkin Vending Machines on GeM or Tender (2026)";
const DESC =
  "A buyer's guide to procuring sanitary napkin vending machines and incinerators through GeM or a tender: spec checklist, documents to ask for, common mistakes.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "gem portal sanitary napkin vending machine supplier",
    "sanitary pad dispenser for government schools tender",
    "sanitary napkin vending machine tender specification",
    "swachh bharat mission sanitary pad incinerator specification",
    "samagra shiksha abhiyan sanitary pad vending machine",
    "csr funding for sanitary pad vending machine in schools",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    type: "article",
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const faqs = [
  {
    q: "Is Lyra Enterprises a registered GeM seller?",
    a: "Yes. Lyra Enterprises is a registered GeM vendor. Government schools, colleges, hospitals and offices can procure sanitary napkin vending machines and incinerators through GeM.",
  },
  {
    q: "What should a tender specification for a napkin vending machine include?",
    a: "Capacity per fill, payment mode, power supply, cabinet material, usage reporting, warranty, installation and after-sales support. For incinerators, add napkins per cycle, daily capacity, temperature control and compliance with the Solid Waste Management Rules 2016 and CPCB guidelines.",
  },
  {
    q: "Which documents should I ask the supplier for?",
    a: "GST registration, GeM seller registration, quality certificates such as ISO 9001:2015, product specification sheets, warranty terms and references from similar institutions.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: TITLE,
      description: DESC,
      author: { "@type": "Organization", name: "Lyra Enterprises" },
      publisher: {
        "@type": "Organization",
        name: "Lyra Enterprises",
        url: SITE.url,
        logo: { "@type": "ImageObject", url: `${SITE.url}/images/logo.png`, width: 442, height: 454 },
      },
      datePublished: "2026-09-25",
      dateModified: "2026-09-25",
      image: [`${SITE.url}/images/og-image.jpg`],
      mainEntityOfPage: { "@type": "WebPage", "@id": URL },
      url: URL,
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

const vmChecklist = [
  ["Capacity", "Napkins held per fill (Lyra models hold 25, or 35 for the Wave)"],
  ["Payment mode", "Free issue, coin, RFID card or UPI QR, matched to your users"],
  ["Power", "230V AC mains for the machine, and a power point near the washroom"],
  ["Build", "Epoxy-coated sheet metal or stainless steel, with a view panel to check stock"],
  ["Reporting", "Usage records for audits: offline CSV export, or cloud dashboard for IoT models"],
  ["Warranty", "Manufacturer warranty period (Lyra offers 1 year) and who handles service"],
];

const incChecklist = [
  ["Capacity", "Napkins per cycle and per day (Micro 1–5 per cycle, Mini 5–15, Maxi 25–50)"],
  ["Control", "Automatic digital temperature controller and display"],
  ["Safety", "MCB safety, thermal insulation and a smoke-control design"],
  ["Compliance", "SWM Rules 2016 and CPCB guidelines for sanitary waste"],
  ["Power", "Electrical rating (Maxi: 230V, 50 Hz, single phase, 1.25 kW)"],
];

export default function GemGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-12 pb-20">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "GeM & tender guide" }]} />

          <div className="mt-6">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest">Procurement Guide</span>
            <span className="ml-3 text-sm text-gray-500">25 September 2026 · 6 min read</span>
          </div>

          <h1 className="mt-5 font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
            How to Buy Sanitary Napkin Vending Machines Through GeM or a Tender
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed border-l-4 border-primary-300 pl-5">
            Government schools, colleges, hospitals and offices often must buy through GeM or a tender. Here is what to specify, what to ask suppliers for, and what to avoid.
          </p>

          <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-gray-900">GeM or tender: which route?</h2>
            <p>
              GeM (Government e-Marketplace) is the national online portal where government departments buy goods and services. Many institutions buy through GeM directly, while others still float a tender or quotation request. The rules and value limits differ by department and state, so confirm the correct route with your procurement officer before you start.
            </p>
            <p>
              Lyra Enterprises is a registered GeM vendor and also responds to tenders and quotation requests. Either way, the steps below help you get equipment that works and can be audited.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Step 1: Decide what you need</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Count the washroom blocks.</strong> One vending machine per block is a common starting point.</li>
              <li><strong>Choose the access model.</strong> Free issue for welfare schemes, coin for low-cost sites, RFID for hostels, UPI for offices and hospitals.</li>
              <li><strong>Plan disposal.</strong> Under the <Link href="/blog/solid-waste-management-rules-2016-india-guide" className="text-primary-600 hover:underline">SWM Rules 2016</Link>, sanitary waste needs separate collection and safe disposal, which is what an incinerator does on site.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">Step 2: Write the specification</h2>
            <p>Include these points for the vending machine:</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <tbody>
                  {vmChecklist.map(([k, v], i) => (
                    <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 font-semibold text-gray-800 w-36">{k}</td>
                      <td className="px-4 py-3 text-gray-600">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>And for the incinerator:</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <tbody>
                  {incChecklist.map(([k, v], i) => (
                    <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 font-semibold text-gray-800 w-36">{k}</td>
                      <td className="px-4 py-3 text-gray-600">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Step 3: Ask suppliers for documents</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>GST registration and GeM seller registration</li>
              <li>Quality certificates such as ISO 9001:2015 (Lyra also holds ISO 14001:2015)</li>
              <li>Product specification sheet or booklet</li>
              <li>Warranty terms and after-sales contact</li>
              <li>References from similar institutions</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">Step 4: Budget correctly</h2>
            <p>
              Compare quotes on the same basis. Lyra prices are ex-GST, with 18% GST and freight extra. Check every quote for GST, freight, installation and warranty so the lowest bid is genuinely the lowest cost. See the full{" "}
              <Link href="/sanitary-napkin-vending-machine-price-india" className="text-primary-600 font-semibold hover:underline">price list</Link>, and check{" "}
              <Link href="/government-schemes-menstrual-hygiene" className="text-primary-600 font-semibold hover:underline">funding schemes</Link>{" "}
              such as Samagra Shiksha, Swachh Bharat Mission and CSR.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Common mistakes to avoid</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Choosing on lowest price alone, without matching capacity, build and warranty.</li>
              <li>Forgetting a power point and mounting space near the washroom.</li>
              <li>Buying vending machines with no plan for used-pad disposal.</li>
              <li>Skipping usage reporting, which you need to justify refills and renewals.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">Frequently asked questions</h2>
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-gray-900">{f.q}</h3>
                <p className="mt-1 text-gray-600">{f.a}</p>
              </div>
            ))}

            <p>
              Need a quotation, specification sheet or GeM listing details? Call{" "}
              <Link href="tel:+918122378860" className="text-primary-600 font-semibold hover:underline">{SITE.phoneDisplay}</Link>.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm font-bold text-gray-900 mb-4">Related</p>
            <div className="space-y-3">
              <Link href="/solutions/womens-hostels-colleges" className="block text-sm text-primary-600 hover:underline">Solutions for women&apos;s hostels and colleges →</Link>
              <Link href="/solutions/schools-colleges" className="block text-sm text-primary-600 hover:underline">Solutions for schools and colleges →</Link>
              <Link href="/blog/best-sanitary-napkin-vending-machine-india" className="block text-sm text-primary-600 hover:underline">Best sanitary napkin vending machine in India →</Link>
            </div>
          </div>
        </article>
      </main>
      <PageFooter />
    </>
  );
}
