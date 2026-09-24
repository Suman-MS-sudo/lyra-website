import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

const URL = `${SITE.url}/solutions`;
const TITLE = "Napkin Vending Machine Solutions by Sector | Lyra";
const DESC =
  "Sanitary napkin vending machine and incinerator solutions for schools, women's hostels, hospitals and offices across India. GeM vendor. Chennai manufacturer.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "sanitary napkin vending machine for institutions india",
    "napkin vending machine for schools colleges hospitals offices",
    "menstrual hygiene infrastructure supplier india",
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

const sectors = [
  {
    title: "Schools & Colleges",
    href: "/solutions/schools-colleges",
    body: "Napkin vending machines and incinerators for school and college washrooms. Helps girl-student attendance and meets Swachh Bharat and SWM Rules 2016 compliance.",
  },
  {
    title: "Women's Hostels & Colleges",
    href: "/solutions/womens-hostels-colleges",
    body: "RFID card access, touch-free free-issue and coin models for hostels and campuses, with on-site incinerators for safe disposal.",
  },
  {
    title: "Hospitals & Clinics",
    href: "/solutions/hospitals",
    body: "Vending machines for patients and staff, plus CPCB-compliant incinerators aligned with Biomedical Waste Rules 2016.",
  },
  {
    title: "Offices & Corporates",
    href: "/solutions/offices",
    body: "UPI, WiFi and Ethernet IoT machines for offices, IT parks and campuses, with usage reporting for facility teams.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
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
      itemListElement: sectors.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: `${SITE.url}${s.href}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Solutions", item: URL },
      ],
    },
  ],
};

export default function SolutionsHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />
            <h1 className="mt-6 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Sanitary Napkin Vending Machine Solutions by Sector
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-3xl leading-relaxed">
              Every institution needs different access, capacity and disposal. Pick your sector to see the models we
              recommend, how they are used, and pricing. Lyra Enterprises manufactures in Chennai and supplies across India.
            </p>
          </div>
        </section>

        <section className="py-14 max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {sectors.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{s.title}</h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.body}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary-600 group-hover:underline">See the solution →</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/sanitary-napkin-vending-machine-price-india" className="text-primary-600 hover:underline">Price list →</Link>
            <Link href="/compare-sanitary-napkin-vending-machines" className="text-primary-600 hover:underline">Compare all models →</Link>
            <Link href="/government-schemes-menstrual-hygiene" className="text-primary-600 hover:underline">Funding and government schemes →</Link>
            <Link href="/blog/gem-tender-sanitary-napkin-vending-machine-guide" className="text-primary-600 hover:underline">Buying through GeM →</Link>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
