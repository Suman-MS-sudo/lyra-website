import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import GoogleReviews from "@/components/GoogleReviews";
import { SITE, getProductBySlug, formatINR } from "@/lib/data";

const URL = `${SITE.url}/solutions/womens-hostels-colleges`;
const TITLE = "Napkin Vending Machine & Incinerator for Women's Hostels";
const DESC =
  "Napkin vending machines and sanitary pad incinerators for women's hostels and colleges. RFID, wave-sensor and coin models. GeM vendor. Chennai manufacturer.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "sanitary pad incinerator for women hostel",
    "sanitary napkin vending machine for hostels",
    "sanitary pad vending machine for women's college",
    "rfid card access sanitary napkin dispenser for hostels",
    "touchless wave sensor sanitary pad vending machine",
    "napkin vending machine for college campus india",
    "girls hostel sanitary pad disposal",
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

const faqs = [
  {
    q: "Which vending machine is best for a women's hostel?",
    a: "For hostels that want controlled, trackable access, the Solo RFID uses prepaid or postpaid RFID cards and needs no coins. For free-issue dispensing under a welfare scheme, the Solo Wave dispenses touch-free with a wave sensor. For a low-cost option with no connectivity needs, the Solo Multi accepts ₹1, ₹2 and ₹5 coins.",
  },
  {
    q: "Can a hostel dispose of used sanitary pads safely on site?",
    a: "Yes. A sanitary napkin incinerator burns used pads on site, so waste never sits in open bins. The Lyra Mini handles 5–15 napkins per cycle and up to 100 a day, and the Micro handles 1–5 per cycle. Both are designed for SWM Rules 2016 compliance.",
  },
  {
    q: "Which incinerator size suits a college or hostel block?",
    a: "The Micro suits a single washroom block or small hostel floor. The Mini suits a full college block or larger hostel. Busy campuses and medical colleges with high daily volume can use the Maxi at 25–50 napkins per cycle. Call us with your headcount and we will recommend a size.",
  },
  {
    q: "Can government colleges and hostels buy through GeM?",
    a: "Yes. Lyra Enterprises is a registered GeM vendor, so government and aided institutions can procure through GeM. Funding routes such as Samagra Shiksha, state schemes and CSR are covered on our government schemes page.",
  },
  {
    q: "Is installation included?",
    a: `Installation guidance and remote support come with every order, and on-site installation is available across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh and Telangana. Every machine carries a 1-year warranty. Call ${SITE.phoneDisplay}.`,
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
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE.url}/solutions/schools-colleges` },
        { "@type": "ListItem", position: 3, name: "Women's hostels & colleges", item: URL },
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

const recommended = [
  {
    tag: "Hostels",
    slug: "solo-rfid-vending-machine",
    name: "Solo RFID",
    desc: "Prepaid or postpaid RFID card access, no coins needed, with usage reports. Suits hostels and campuses that want controlled, trackable access.",
  },
  {
    tag: "Welfare schemes",
    slug: "solo-wave-vending-machine",
    name: "Solo Wave",
    desc: "Touch-free wave sensor with free-issue dispensing, stainless steel cabinet and LCD stock display. For women's colleges and welfare programmes.",
  },
  {
    tag: "Budget colleges",
    slug: "solo-multi-coin-vending-machine",
    name: "Solo Multi",
    desc: "Accepts ₹1, ₹2 and ₹5 coins with configurable per-pad pricing. No connectivity needed.",
  },
  {
    tag: "Disposal",
    slug: "lyra-mini-incinerator",
    name: "Lyra Mini Incinerator",
    desc: "5–15 napkins per cycle, up to 100 a day, digital temperature display. SWM Rules 2016 compliant. For hostel blocks and colleges.",
  },
];

export default function WomensHostelsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Solutions", href: "/solutions/schools-colleges" },
              { label: "Women's Hostels & Colleges" },
            ]} />
            <h1 className="mt-6 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Sanitary Napkin Vending Machines &amp; Incinerators for Women&apos;s Hostels and Colleges
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-3xl leading-relaxed">
              Hostel residents need napkins at any hour and a safe way to dispose of them. Lyra Enterprises supplies
              vending machines with RFID, touch-free and coin options, plus on-site incinerators, for women&apos;s hostels,
              colleges and universities across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="tel:+918122378860" className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-full shadow-lg">
                Call for a quote
              </Link>
              <Link href="/sanitary-napkin-vending-machine-price-india" className="px-7 py-3.5 border border-blue-200 text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors">
                See prices
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Recommended for hostels and colleges</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Pick by how you want to manage access, then add an incinerator for disposal.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((p) => {
              const dp = getProductBySlug(p.slug);
              return (
                <div key={p.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                  <span className="self-start px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-700 mb-4">{p.tag}</span>
                  <p className="font-bold text-gray-900 text-lg mb-1">{p.name}</p>
                  <p className="text-gray-900 font-bold text-sm mb-3">{dp ? `${formatINR(dp.price)} + 18% GST` : "Contact for pricing"}</p>
                  <p className="text-gray-500 text-sm flex-1 mb-5">{p.desc}</p>
                  <Link href={`/products/${p.slug}`} className="mt-auto text-center py-2.5 px-4 rounded-xl bg-teal-50 text-teal-700 font-semibold text-sm hover:bg-teal-100 transition-colors">
                    View details →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <GoogleReviews limit={2} />

        <section className="py-14 max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to plan a hostel or campus installation</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
            <li>Count washroom blocks and floors. Place one machine per block so residents never walk far.</li>
            <li>Decide the access model: RFID cards, free issue under a scheme, or coin.</li>
            <li>Match incinerator size to daily volume, and plan a power point for it near the washroom.</li>
            <li>Choose funding: institutional budget, CSR, or a government scheme. See <Link href="/government-schemes-menstrual-hygiene" className="text-primary-600 hover:underline">funding options</Link>.</li>
            <li>For government institutions, buy through GeM. See our <Link href="/blog/gem-tender-sanitary-napkin-vending-machine-guide" className="text-primary-600 hover:underline">GeM and tender guide</Link>.</li>
          </ol>
          <p className="mt-6 text-sm text-gray-500">
            Also see <Link href="/solutions/schools-colleges" className="text-primary-600 hover:underline">solutions for schools and colleges</Link> and the{" "}
            <Link href="/blog/solid-waste-management-rules-2016-india-guide" className="text-primary-600 hover:underline">SWM Rules 2016 guide</Link>.
          </p>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
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

        <section className="py-14 bg-gradient-to-r from-blue-600 to-teal-500">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-4">Equip your hostel or campus</h2>
            <p className="text-white/80 mb-8">Share your headcount and location. We recommend models, quantity and freight.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+918122378860" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition-colors">{SITE.phoneDisplay}</Link>
              <Link href="/contact" className="px-8 py-4 bg-white/20 text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-colors">Request a quote</Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
