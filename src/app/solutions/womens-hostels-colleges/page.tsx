import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import ProductPicks from "@/components/page/ProductPicks";
import FaqList from "@/components/page/FaqList";
import { CtaBand } from "@/components/page/Blocks";
import TrackedLink from "@/components/TrackedLink";
import GoogleReviews from "@/components/GoogleReviews";
import { SITE, getProductBySlug } from "@/lib/data";

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
    a: "Yes. A sanitary napkin incinerator burns used pads on site, so waste never sits in open bins. The Lyra Mini handles 5–15 napkins per 30-minute cycle, up to 240 over an 8-hour day, and the Micro handles 1–5 per cycle, up to 80. Both are designed for SWM Rules 2016 compliance.",
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
    desc: "5–15 napkins per 30-minute cycle, up to 240 per 8-hour day, digital temperature display. SWM Rules 2016 compliant. For hostel blocks and colleges.",
  },
];

export default function WomensHostelsPage() {
  const heroImages = recommended
    .slice(0, 2)
    .map((r) => getProductBySlug(r.slug))
    .filter(Boolean)
    .map((p) => ({ src: p!.image, alt: p!.fullName }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Solutions", href: "/solutions/schools-colleges" },
            { label: "Women's Hostels & Colleges" },
          ]}
          eyebrow="Solutions"
          tags={["Hostels", "Colleges", "Universities"]}
          title={<>Sanitary Napkin Vending Machines &amp; Incinerators <span className="text-gradient">for Women&apos;s Hostels and Colleges</span></>}
          lead={
            <p>
              Hostel residents need napkins at any hour and a safe way to dispose of them. Lyra Enterprises supplies
              vending machines with RFID, touch-free and coin options, plus on-site incinerators, for women&apos;s hostels,
              colleges and universities across India.
            </p>
          }
          actions={
            <>
              <TrackedLink method="call" detail="hostels-page" href="tel:+918122378860" className="btn btn-primary h-12 px-6">
                Call for a quote
              </TrackedLink>
              <Link href="/sanitary-napkin-vending-machine-price-india" className="btn btn-secondary h-12 px-6">
                See prices
              </Link>
            </>
          }
          images={heroImages}
        />

        <Section kicker="Recommended" title="Recommended for hostels and colleges" lead="Pick by how you want to manage access, then add an incinerator for disposal." action={{ href: "/products", label: "All products" }}>
          <ProductPicks items={recommended.map((r) => ({ slug: r.slug, tag: r.tag, desc: r.desc }))} />
        </Section>

        <GoogleReviews limit={2} />

        <Section tone="subtle" kicker="Planning" title="How to plan a hostel or campus installation">
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[
              <>Count washroom blocks and floors. Place one machine per block so residents never walk far.</>,
              <>Decide the access model: RFID cards, free issue under a scheme, or coin.</>,
              <>Match incinerator size to daily volume, and plan a power point for it near the washroom.</>,
              <>Choose funding: institutional budget, CSR, or a government scheme. See <Link href="/government-schemes-menstrual-hygiene" className="font-medium text-brand hover:underline">funding options</Link>.</>,
              <>For government institutions, buy through GeM. See our <Link href="/blog/gem-tender-sanitary-napkin-vending-machine-guide" className="font-medium text-brand hover:underline">GeM and tender guide</Link>.</>,
            ].map((step, k) => (
              <li key={k} className="rounded-[20px] border border-line bg-surface p-6">
                <span className="font-display text-sm font-semibold text-brand">{String(k + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-[14.5px] leading-relaxed text-body">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">
            Also see <Link href="/solutions/schools-colleges" className="font-medium text-brand hover:underline">solutions for schools and colleges</Link> and the{" "}
            <Link href="/blog/solid-waste-management-rules-2016-india-guide" className="font-medium text-brand hover:underline">SWM Rules 2016 guide</Link>.
          </p>
        </Section>

        <Section kicker="FAQ" title="Frequently asked questions" narrow>
          <FaqList items={faqs} />
        </Section>

        <CtaBand
          title="Equip your hostel or campus"
          body="Share your headcount and location. We recommend models, quantity and freight."
          primary={{ href: "/contact", label: "Request a quote" }}
        />
      </main>
      <PageFooter />
    </>
  );
}
