import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import FeatureGrid from "@/components/page/FeatureGrid";
import FaqList from "@/components/page/FaqList";
import { CtaBand } from "@/components/page/Blocks";
import AddBundleButton from "@/components/store/AddBundleButton";
import { IconCheck } from "@/components/store/icons";
import { SITE, getProductBySlug, formatINR } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Vending Machine + Incinerator Bundle — Schools & Hostels | Lyra" },
  description:
    "Buy a napkin vending machine and incinerator combo from Lyra Enterprises. Bundled pricing, full SWM Rules 2016 compliance in one order. Pan-India delivery.",
  keywords: [
    "vending machine incinerator combo india",
    "napkin vending machine incinerator bundle india",
    "vending machine and incinerator together india",
    "complete menstrual hygiene solution india",
    "swm rules compliant combo india",
    "napkin vending machine incinerator school india",
    "vending machine incinerator hostel india",
    "bundle offer vending machine incinerator india",
    "sanitary napkin machine combo package india",
    "complete washroom hygiene solution india",
  ],
  alternates: { canonical: `${SITE.url}/products/vending-incinerator-bundle` },
  openGraph: {
    title: "Vending Machine + Incinerator Bundle | Complete Menstrual Hygiene Solution | Lyra India",
    description:
      "Get a complete menstrual hygiene solution — vending machine + incinerator combo. Full SWM Rules 2016 compliance. Best for schools, hostels and hospitals. Bundle pricing available.",
    url: `${SITE.url}/products/vending-incinerator-bundle`,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vending Machine + Incinerator Bundle | Complete Menstrual Hygiene Solution | Lyra India",
    description:
      "Get a complete menstrual hygiene solution — vending machine + incinerator combo. Full SWM Rules 2016 compliance. Best for schools, hostels and hospitals. Bundle pricing available.",
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Sanitary Napkin Vending Machine + Incinerator Bundle",
  description:
    "Complete menstrual hygiene solution — Lyra vending machine paired with incinerator for full SWM Rules 2016 and CPCB compliance. Ideal for schools, hostels, hospitals and offices.",
  image: [`${SITE.url}/images/products/push-button-vm.png`, `${SITE.url}/images/products/lyra-micro.png`],
  brand: { "@type": "Brand", name: "Lyra Enterprises" },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Lyra Enterprises" },
  },
  url: `${SITE.url}/products/vending-incinerator-bundle`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
    { "@type": "ListItem", position: 3, name: "Bundle", item: `${SITE.url}/products/vending-incinerator-bundle` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why should I buy a vending machine and incinerator together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buying both together achieves full menstrual hygiene compliance under Solid Waste Management Rules 2016. The vending machine provides napkins; the incinerator safely disposes of used ones. This closed-loop system is what government inspectors and compliance auditors expect to see in schools, hospitals and hostels.",
      },
    },
    {
      "@type": "Question",
      name: "Which combo is best for a school or hostel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most schools and hostels, the Push Button + Lyra Micro Incinerator combo works best — an affordable, fully compliant menstrual hygiene setup. For higher footfall, upgrade to Solo Coin + Lyra Mini.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a bundle discount?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. When ordering a vending machine and incinerator together, Lyra Enterprises offers bundled pricing with additional savings. Call +91-81223 78860 or fill the quote form for current bundle pricing.",
      },
    },
    {
      "@type": "Question",
      name: "Does the combo cover SWM Rules 2016 compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A vending machine + CPCB-compliant incinerator combination covers the full requirements of Solid Waste Management Rules 2016 for menstrual waste in institutional settings — from access to disposal.",
      },
    },
  ],
};

const bundles = [
  {
    title: "School Bundle",
    tag: "Most Popular",
    badge: "bg-primary-100 text-primary-700",
    vending: { name: "Push Button", price: 12000, slug: "push-button-vending-machine" },
    incinerator: { name: "Lyra Micro", price: 13000, slug: "lyra-micro-incinerator" },
    total: 23500,
    savings: 1500,
    bestFor: "Government schools, private schools, hostels",
    highlights: ["Push-button vending — no coins needed", "Micro incinerator handles 1–5 napkins/cycle", "CPCB & SWM Rules 2016 compliant", "Wall-mount both units side by side"],
  },
  {
    title: "College & Hospital Bundle",
    tag: "Best Value",
    badge: "bg-amber-100 text-amber-700",
    vending: { name: "Solo Coin", price: 13500, slug: "solo-coin-vending-machine" },
    incinerator: { name: "Lyra Mini", price: 16000, slug: "lyra-mini-incinerator" },
    total: 27000,
    savings: 2500,
    bestFor: "Colleges, community hospitals, NGOs, offices",
    highlights: ["Coin-operated — self-funding over time", "Mini incinerator handles 5–15 napkins/cycle", "SWM Rules 2016 compliant", "Ideal for 50–200 women daily"],
  },
  {
    title: "Enterprise Bundle",
    tag: "Full Compliance",
    badge: "bg-blue-100 text-blue-700",
    vending: { name: "Solo WiFi (UPI)", price: 24500, slug: "solo-wifi-vending-machine" },
    incinerator: { name: "Lyra Maxi", price: 40000, slug: "lyra-maxi-incinerator" },
    total: 59000,
    savings: 5500,
    bestFor: "Large hospitals, IT campuses, industrial facilities",
    highlights: ["UPI cashless vending with remote monitoring", "Maxi incinerator: 25–50 napkins/cycle", "Biomedical Waste Rules 2016 compliant", "Remote temperature logging for audit trails"],
  },
];

export default function BundlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Vending + Incinerator Bundle" },
          ]}
          eyebrow="Bundles"
          tags={["Bundle Offer", "SWM Rules 2016", "Save on Combo"]}
          title={<>Vending Machine + <span className="text-gradient">Incinerator Bundle</span></>}
          lead={
            <p>
              The complete menstrual hygiene solution in one order. A vending machine provides napkins on demand; an incinerator handles safe, CPCB-compliant disposal. Together, they satisfy the full requirements of India&apos;s Solid Waste Management Rules 2016 for schools, hospitals and hostels.
            </p>
          }
          actions={
            <>
              <a href="#bundles" className="btn btn-primary h-12 px-6">Choose a bundle</a>
              <a href="tel:+918122378860" className="btn btn-secondary h-12 px-6">Get Bundle Price</a>
              <Link href="/contact" className="btn btn-ghost h-12 px-4">Request Quote</Link>
            </>
          }
          points={["Bundle Savings Available", "SWM Rules 2016 Compliant", "CPCB Approved", "1-Year Warranty", "Pan-India Delivery"]}
          images={[
            { src: getProductBySlug("solo-wifi-vending-machine")?.image ?? "", alt: "Solo WiFi vending machine" },
            { src: getProductBySlug("lyra-mini-incinerator")?.image ?? "", alt: "Lyra Mini incinerator" },
          ]}
        />

        <Section kicker="Why bundle" title="Why Buy Both Together?">
          <FeatureGrid
            items={[
              { icon: "⚖️", title: "Full Legal Compliance", body: "SWM Rules 2016 requires both access to sanitary products AND proper disposal. A machine alone without an incinerator is only half the solution." },
              { icon: "💰", title: "Bundle Savings", body: "Ordering vending machine and incinerator together comes with bundled pricing from Lyra — contact us for a combined quote and available savings vs buying separately." },
              { icon: "🔧", title: "Single Vendor, One Install", body: "One order, one invoice, one installation team — simplifying procurement and compliance documentation for schools and institutions." },
            ]}
          />
        </Section>

        <Section id="bundles" tone="subtle" kicker="Bundles" title="Choose Your Bundle" lead="Three bundle options for every institution size. Call for custom combinations.">
          <div className="grid gap-5 lg:grid-cols-3">
            {bundles.map((b, k) => {
              const vm = getProductBySlug(b.vending.slug);
              const inc = getProductBySlug(b.incinerator.slug);
              const separate = (vm?.price ?? 0) + (inc?.price ?? 0);
              return (
                <article
                  key={b.title}
                  className={`flex flex-col overflow-hidden rounded-[24px] border bg-surface ${k === 0 ? "border-primary-600 shadow-[0_0_0_3px_rgb(var(--brand)/0.1)]" : "border-line"}`}
                >
                  <div className="relative flex aspect-[2/1] items-end justify-center gap-2 bg-subtle px-6 pt-6">
                    <div aria-hidden className="absolute inset-x-[15%] bottom-0 top-1/4 rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.16),transparent)]" />
                    <Image src={vm?.image ?? ""} alt={b.vending.name} width={120} height={180} className="product-shot relative h-[88%] w-auto object-contain" />
                    <span className="relative mb-10 font-display text-2xl font-semibold text-muted">+</span>
                    <Image src={inc?.image ?? ""} alt={b.incinerator.name} width={120} height={180} className="product-shot relative h-[72%] w-auto object-contain" />
                    <span
                      className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider ${k === 0 ? "bg-primary-600 text-white" : "border border-line bg-surface/90 text-ink"}`}
                    >
                      {b.tag}
                    </span>
                  </div>
                  <div className="border-b border-line p-6">
                    <h3 className="font-display text-xl font-semibold text-ink">{b.title}</h3>
                    <p className="mt-1 text-sm text-muted">{b.bestFor}</p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <dl className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-line p-3">
                        <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Vending Machine</dt>
                        <dd className="mt-1">
                          <Link href={`/products/${b.vending.slug}`} className="font-semibold text-ink hover:text-brand">{b.vending.name}</Link>
                        </dd>
                      </div>
                      <div className="rounded-xl border border-line p-3">
                        <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Incinerator</dt>
                        <dd className="mt-1">
                          <Link href={`/products/${b.incinerator.slug}`} className="font-semibold text-ink hover:text-brand">{b.incinerator.name}</Link>
                        </dd>
                      </div>
                    </dl>
                    <ul className="mt-5 space-y-2.5">
                      {b.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm text-body">
                          <IconCheck className="mt-0.5 h-4 w-4 flex-none text-brand" strokeWidth={2.2} />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <div className="rounded-xl bg-primary-50 px-4 py-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-primary-700">Bundle Pricing</span>
                          <span className="font-semibold text-primary-700">On Request</span>
                        </div>
                        <p className="mt-1 text-xs text-primary-700/80">Contact us for a combined quote and bundle savings · individually {formatINR(separate)} + GST</p>
                      </div>
                      <div className="mt-4 grid gap-2">
                        <AddBundleButton
                          items={[
                            { slug: b.vending.slug, name: vm?.fullName ?? b.vending.name, price: vm?.price ?? 0 },
                            { slug: b.incinerator.slug, name: inc?.fullName ?? b.incinerator.name, price: inc?.price ?? 0 },
                          ]}
                        />
                        <a href="tel:+918122378860" className="py-2 text-center text-sm font-semibold text-brand hover:underline">
                          Get This Bundle → call for bundle price
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section kicker="FAQ" title="Frequently Asked Questions" narrow>
          <FaqList items={faqSchema.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text }))} />
        </Section>

        <CtaBand
          title="Get your compliance combo today"
          body="Bundle pricing available. Contact us with your institution type and quantity for a tailored quote."
          primary={{ href: "/contact", label: "Request Quote" }}
        />
      </main>
      <PageFooter />
    </>
  );
}
