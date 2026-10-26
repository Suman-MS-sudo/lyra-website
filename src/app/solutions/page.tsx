import { RentalBand } from "@/components/rental/RentalCallout";
import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/Blocks";
import { IconArrowRight, IconBuilding, IconHospital, IconSchool, IconUsers } from "@/components/store/icons";
import BlogFaq, { type Faq } from "@/components/BlogFaq";
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

const quickPick = [
  { sector: "Government & budget schools", vm: "Push Button (₹12,000)", inc: "Lyra Micro (₹13,000)", why: "Free issue, offline, lowest cost" },
  { sector: "Private schools & colleges", vm: "Solo Coin (₹13,500) or Solo Multi-Coin (₹15,500)", inc: "Lyra Micro or Mini", why: "Coin fee makes the programme self-funding" },
  { sector: "Women's hostels", vm: "Solo RFID (₹16,000)", inc: "Lyra Mini (₹16,000)", why: "Links dispensing to resident ID cards" },
  { sector: "Welfare & free-issue schemes", vm: "Solo Wave (₹23,000)", inc: "Lyra Mini", why: "Touchless, stainless steel, up to 35 napkins" },
  { sector: "Offices & IT parks", vm: "Solo WiFi (₹24,500)", inc: "Lyra Micro or Mini", why: "UPI + coin, cloud dashboard for facility teams" },
  { sector: "Hospitals", vm: "Solo WiFi (₹24,500); Solo Ethernet (₹26,500) where WiFi is restricted", inc: "Lyra Maxi (₹40,000)", why: "UPI + coin with remote monitoring; high-capacity disposal" },
];

const faqs: Faq[] = [
  {
    q: "Which sanitary napkin vending machine is best for my institution?",
    a: "Government and budget schools usually pick the Push Button, private schools the Solo Coin, hostels the Solo RFID, free-issue schemes the touchless Solo Wave, offices and hospitals the Solo WiFi, or the wired Solo Ethernet where WiFi is restricted. Each sector page explains why.",
  },
  {
    q: "Do I need an incinerator as well as a vending machine?",
    a: "In most institutions, yes. The SWM Rules 2016 expect a safe way to dispose of used napkins, and an on-site incinerator removes manual handling. Match the incinerator to daily users: Micro for small sites, Mini for colleges and offices, Maxi for hospitals and large campuses.",
  },
  {
    q: "Can government institutions buy these through GeM?",
    a: "Yes. Lyra Enterprises is a registered GeM vendor, and our GeM and tender guide lists what to put in the specification.",
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

const SECTOR_ICONS = [IconSchool, IconUsers, IconHospital, IconBuilding];

export default function SolutionsHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
          eyebrow="Solutions"
          title={<>Sanitary Napkin Vending Machine Solutions <span className="text-gradient">by Sector</span></>}
          lead={
            <p>
              Every institution needs different access, capacity and disposal. Pick your sector to see the models we
              recommend, how they are used, and pricing. Lyra Enterprises manufactures in Chennai and supplies across India.
            </p>
          }
        />

        <section className="bg-canvas py-14 sm:py-20">
          <div className="lyra-container">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sectors.map((s, k) => {
                const Icon = SECTOR_ICONS[k] ?? IconBuilding;
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="spotlight group flex flex-col rounded-[22px] border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h2 className="mt-6 font-display text-xl font-semibold text-ink">{s.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{s.body}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      See the solution <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-16">
              <p className="kicker">Quick pick</p>
              <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight text-ink sm:text-4xl">Quick pick: recommended setup by sector</h2>
              <p className="mt-2 text-sm text-muted">Prices ex-GST, ex-works Chennai.</p>
              <div className="mt-6 overflow-x-auto rounded-[20px] border border-line bg-surface">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="bg-subtle text-left">
                    <tr>
                      {["Sector", "Vending machine", "Incinerator", "Why"].map((h) => (
                        <th key={h} scope="col" className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {quickPick.map((r) => (
                      <tr key={r.sector}>
                        <th scope="row" className="px-5 py-4 text-left font-semibold text-ink">{r.sector}</th>
                        <td className="px-5 py-4 text-body">{r.vm}</td>
                        <td className="px-5 py-4 text-body">{r.inc}</td>
                        <td className="px-5 py-4 text-body">{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mx-auto max-w-4xl">
              <BlogFaq faqs={faqs} />
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["/sanitary-napkin-vending-machine-price-india", "Price list"],
                ["/compare-sanitary-napkin-vending-machines", "Compare all models"],
                ["/government-schemes-menstrual-hygiene", "Funding and government schemes"],
                ["/blog/gem-tender-sanitary-napkin-vending-machine-guide", "Buying through GeM"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand">
                  {label} <IconArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <RentalBand />
        <CtaBand title="Not sure which sector fits?" body="Tell us about your site and we will recommend the right machines, quantity and disposal setup." primary={{ href: "/contact", label: "Talk to sales" }} />
      </main>
      <PageFooter />
    </>
  );
}
