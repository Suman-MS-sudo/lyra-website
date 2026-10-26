import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import FaqList from "@/components/page/FaqList";
import { CtaBand } from "@/components/page/Blocks";
import RentalPlanCards from "@/components/rental/RentalPlanCards";
import RentalCheckout from "@/components/rental/RentalCheckout";
import { SITE, cities, formatINR, getProductBySlug, type Product } from "@/lib/data";
import RentalIncluded from "@/components/rental/RentalIncluded";
import { AGREEMENT_PATH, AGREEMENT_TITLE, AGREEMENT_VERSION, EARLY_TERMINATION_MONTHS, NOTICE_DAYS } from "@/lib/rental-agreement";
import {
  RENTAL_ADVANCE_MONTHS,
  RENTAL_DEPOSIT,
  RENTAL_FROM,
  RENTAL_MIN_YEARS,
  RENTAL_MODELS,
  RENTAL_PATH,
  RENTAL_PLANS,
  RENTAL_TERMS_TEXT,
  RECHARGE_PATH,
  RECHARGE_PLANS,
  RENTAL_GRACE_DAYS,
  rechargeCharge,
  rentWithGst,
  rupees,
  signingCharge,
} from "@/lib/rental";
import { IconArrowRight, IconBarChart, IconCard, IconCheck, IconDownload, IconLock, IconReceipt, IconWifi } from "@/components/store/icons";

const URL = `${SITE.url}${RENTAL_PATH}`;
const TITLE = `Sanitary Napkin Vending Machine on Rent from ₹${RENTAL_FROM}/month`;
const DESC = `Rent an IoT WiFi, Ethernet or RFID sanitary napkin vending machine from ₹999/month + GST. Installation, servicing, parts and live monitoring included.`;
const UPDATED = "2026-10-26";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "sanitary napkin vending machine on rent",
    "sanitary napkin vending machine rental",
    "sanitary pad vending machine on rent",
    "napkin vending machine rent per month",
    "sanitary napkin vending machine monthly rental",
    "sanitary pad vending machine lease",
    "iot sanitary napkin vending machine rent",
    "rfid sanitary napkin vending machine rent",
    "sanitary napkin vending machine rental india",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    type: "website",
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra sanitary napkin vending machine rental plans" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const models = RENTAL_MODELS.map((m) => ({ ...m, product: getProductBySlug(m.slug) })).filter(
  (m): m is (typeof RENTAL_MODELS)[number] & { product: Product } => Boolean(m.product)
);
const [p25, p50, p100] = RENTAL_PLANS;
const wifi = models.find((m) => m.slug === "solo-wifi-vending-machine")?.product;
const breakEven = wifi ? Math.ceil(wifi.price / p25.price) : 0;

const faqs = [
  {
    q: "What is the rent for a sanitary napkin vending machine?",
    a: `Lyra Enterprises rents sanitary napkin vending machines at ${rupees(p25.price)} per month for a 25-napkin machine, ${rupees(p50.price)} per month for 50 napkins and ${rupees(p100.price)} per month for 100 napkins. GST at 18% is added, so the monthly totals are ${rupees(rentWithGst(p25.price))}, ${rupees(rentWithGst(p50.price))} and ${rupees(rentWithGst(p100.price))}.`,
  },
  {
    q: "Which vending machines are available on rent?",
    a: "Three smart models: the Solo WiFi (IoT over WiFi, UPI QR and coin payment with a cloud dashboard), the Solo Ethernet (the same IoT features over a wired LAN connection) and the Solo RFID (card-based access with per-card usage reports).",
  },
  {
    q: "What do 25, 50 and 100 napkin capacity mean?",
    a: "Capacity is how many napkins the machine holds per fill. A 25-napkin machine suits a single washroom with light use, 50 suits busy washrooms, hostels and wards, and 100 suits high-footfall sites such as large campuses, factories and public restrooms where refilling often is impractical.",
  },
  {
    q: "What is included in the monthly rent?",
    a: "Installation at your site, regular preventive servicing, replacement of worn or faulty parts, breakdown support, over-the-air software updates, and live monitoring with low-stock and fault alerts on the Lyra website. The only thing not included is napkin refills, which are purchased from Lyra.",
  },
  {
    q: "Is there a deposit to rent a sanitary napkin vending machine?",
    a: `Yes. Rent starts from month 1, so at signing you pay either a refundable security deposit of ${rupees(RENTAL_DEPOSIT)} per machine plus the first month's rent, or ${RENTAL_ADVANCE_MONTHS} months' rent in advance with no deposit. GST at 18% is added to both. On the 25-napkin plan that is ${rupees(signingCharge(p25, 1, "deposit").total)} or ${rupees(signingCharge(p25, 1, "advance").total)} per machine, including GST.`,
  },
  {
    q: "What is the minimum rental period?",
    a: `Rentals run on a minimum ${RENTAL_MIN_YEARS}-year agreement for use of the machine. Servicing, parts replacement and monitoring are covered for the full term.`,
  },
  {
    q: "Who pays for repairs and spare parts on a rented machine?",
    a: "Lyra does. Regular servicing, breakdown repairs and replacement of parts are covered by the monthly rent for the whole agreement, so there are no surprise repair bills.",
  },
  {
    q: "Can I monitor a rented vending machine?",
    a: "Yes. You keep your own login on the Lyra website to see stock levels, usage and machine status at any time, and you receive regular alerts when stock runs low or the machine reports a fault.",
  },
  {
    q: "Who supplies the napkins for a rented machine?",
    a: "Napkin refills are not included in the rent and are purchased from Lyra: individually wrapped XL (280 mm) and XXL (320 mm) sanitary napkins made to fit every Lyra machine. Low-stock alerts tell you when to reorder.",
  },
  {
    q: "Is it better to rent or buy a sanitary napkin vending machine?",
    a: wifi
      ? `Rent if you want installation, servicing, parts and monitoring handled by Lyra for a fixed monthly cost, or need 50 or 100-napkin capacity. Buy if you prefer to own the machine outright: the Solo WiFi costs ${formatINR(wifi.price)} + GST with a 1-year warranty, while the ${rupees(p25.price)} plan totals ${rupees(p25.price * 12 * RENTAL_MIN_YEARS)} + GST over the ${RENTAL_MIN_YEARS}-year minimum term with service and parts included throughout.`
      : "Rent if you want servicing, parts and monitoring handled by Lyra for a fixed monthly cost; buy if you prefer to own the machine outright.",
  },
  {
    q: "Is GST charged on the monthly rent?",
    a: "Yes. GST at 18% is charged on the rent and shown on a GST invoice, so GST-registered institutions and companies can claim input tax credit.",
  },
  {
    q: "How do I pay the monthly rent?",
    a: `Recharge online at ${SITE.url}${RECHARGE_PATH} with your rental code and registered mobile number, by UPI, card or net banking. Choose Monthly, Quarterly (save ${RECHARGE_PLANS[1].discountPct}% on rent) or Yearly (save ${RECHARGE_PLANS[2].discountPct}% on rent); GST at 18% is added. For example, a yearly recharge on the 25-napkin plan is ${rupees(rechargeCharge(p25.price, "yearly").base)} + GST instead of ${rupees(p25.price * 12)}.`,
  },
  {
    q: "What happens if the rent is not recharged on time?",
    a: `You get email reminders 7 days and 1 day before rent runs out. After the due date the machine keeps working for a ${RENTAL_GRACE_DAYS}-day grace period; if rent is still unpaid, UPI and RFID vending on the machine is paused until it is recharged. Recharges always continue from the last paid date, so overdue months are covered first.`,
  },
  {
    q: "Can I end the rental before 3 years?",
    a: `Yes. Give ${NOTICE_DAYS} days' written notice and pay an early-termination fee of ${EARLY_TERMINATION_MONTHS} months' rent plus GST per machine, for example ${rupees(p25.price * EARLY_TERMINATION_MONTHS)} + GST on the 25-napkin plan, along with any rent due. After the ${RENTAL_MIN_YEARS}-year minimum term, either side can end the rental with ${NOTICE_DAYS} days' notice and no fee.`,
  },
  {
    q: "What if a rented machine is damaged or stolen?",
    a: "Normal wear and tear and manufacturing faults are repaired by Lyra at no extra cost. Loss or damage caused by misuse, vandalism, theft, fire, water or faulty site wiring is charged at Lyra's repair or replacement rates, capped at the machine's published list price.",
  },
  {
    q: "Is there a written rental agreement?",
    a: `Yes. Every rental is covered by Lyra's ${AGREEMENT_TITLE}, which you accept online at booking. Your executed copy, completed with your booking details and an electronic acceptance record, is emailed to you as a PDF immediately after payment. You can read the full terms at ${SITE.url}${AGREEMENT_PATH}.`,
  },
  {
    q: "Can I rent machines for several washrooms or sites?",
    a: `Yes. Rent as many machines as you need, mixing capacities and models across washrooms or locations. Set the number of machines in the booking form (up to 50 online), or call ${SITE.phoneDisplay} for larger or multi-site rentals.`,
  },
  {
    q: "How do I start renting a vending machine?",
    a: `Book online on this page: choose a plan, machine and quantity, enter the installation address, and pay the ${rupees(RENTAL_DEPOSIT)} refundable deposit with the first month's rent, or ${RENTAL_ADVANCE_MONTHS} months' advance rent (plus GST), securely by UPI, card or net banking via Razorpay. Your executed ${RENTAL_MIN_YEARS}-year rental agreement is emailed to you as a PDF straight away, and our team calls within one working day to fix the installation date. Prefer to talk first? Request a callback or WhatsApp ${SITE.phoneDisplay}.`,
  },
  {
    q: "Can I pay the rental deposit online?",
    a: `Yes. The signing amount, either the ${rupees(RENTAL_DEPOSIT)} refundable deposit plus the first month's rent or ${RENTAL_ADVANCE_MONTHS} months' advance rent, plus 18% GST, can be paid online on this page by UPI, credit or debit card, or net banking through Razorpay. You get an emailed receipt straight away.`,
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
      mainEntity: { "@id": `${URL}#service` },
      datePublished: UPDATED,
      dateModified: UPDATED,
    },
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "Sanitary napkin vending machine rental",
      serviceType: "Sanitary napkin vending machine rental",
      description: `${DESC} ${RENTAL_TERMS_TEXT}`,
      url: URL,
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      audience: { "@type": "BusinessAudience", audienceType: "Schools, colleges, hospitals, offices, factories and hostels" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Vending machine rental plans",
        itemListElement: RENTAL_PLANS.map((p) => ({
          "@type": "Offer",
          name: `${p.capacity}-napkin capacity rental plan`,
          description: `${p.name} plan: IoT WiFi, Ethernet or RFID sanitary napkin vending machine holding ${p.capacity} napkins per fill. ${RENTAL_TERMS_TEXT}`,
          eligibleDuration: { "@type": "QuantitativeValue", minValue: RENTAL_MIN_YEARS * 12, unitCode: "MON" },
          url: `${URL}?plan=${p.id}`,
          price: p.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.price,
            priceCurrency: "INR",
            valueAddedTaxIncluded: false,
            unitCode: "MON",
            unitText: "month",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
          itemOffered: models.map((m) => ({
            "@type": "Product",
            name: m.product.fullName,
            url: `${SITE.url}/products/${m.slug}`,
            image: `${SITE.url}${m.product.image}`,
            brand: { "@type": "Brand", name: "Lyra" },
          })),
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
        { "@type": "ListItem", position: 3, name: "Rental plans", item: URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const STATES = Array.from(new Set(cities.map((c) => c.state))).sort();

const steps = [
  { title: "Pick a plan", body: "Choose 25, 50 or 100-napkin capacity based on how many people use the washroom." },
  { title: "Pick a machine", body: "IoT WiFi, IoT Ethernet or RFID card, depending on your network and how users should pay or access." },
  {
    title: "Book and pay online",
    body: `Pay the ${rupees(RENTAL_DEPOSIT)} refundable deposit with month 1's rent, or ${RENTAL_ADVANCE_MONTHS} months' rent in advance, plus GST, by UPI, card or net banking. Your executed ${RENTAL_MIN_YEARS}-year agreement is emailed to you instantly.`,
  },
  { title: "We install and look after it", body: "Lyra installs the machine, services it, replaces parts and gives you a monitoring login. Order napkin refills from Lyra." },
];

const MODEL_ICONS = { "solo-wifi-vending-machine": IconWifi, "solo-ethernet-vending-machine": IconBarChart, "solo-rfid-vending-machine": IconCard } as const;

export default function RentalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Rental plans" }]}
          eyebrow="New · Rental plans"
          title={
            <>
              Sanitary Napkin Vending Machine <span className="text-gradient">on Rent</span>
            </>
          }
          lead={
            <>
              <p>
                Rent an IoT WiFi, IoT Ethernet or RFID sanitary napkin vending machine from Lyra Enterprises for a fixed monthly rent of{" "}
                <strong className="text-ink">{rupees(p25.price)}</strong> (25 napkins), <strong className="text-ink">{rupees(p50.price)}</strong> (50 napkins) or{" "}
                <strong className="text-ink">{rupees(p100.price)}</strong> (100 napkins) + GST, instead of buying one outright.
              </p>
            </>
          }
          actions={
            <>
              <Link href="#enquire" className="btn btn-primary h-12 px-6">
                Book online <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#plans" className="btn h-12 border-white/15 bg-white/5 px-6 text-white hover:bg-white/10">
                See the plans
              </Link>
            </>
          }
          points={["Installation, service and parts included", "Live monitoring and alerts", "IoT WiFi, Ethernet or RFID"]}
          aside={
            <div className="spotlight relative mx-auto w-full max-w-md rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Monthly rent, ex-GST</p>
              <ul className="mt-5 space-y-3">
                {RENTAL_PLANS.map((p) => (
                  <li key={p.id} className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 ${p.popular ? "border-primary-500/60 bg-primary-500/10" : "border-line"}`}>
                    <span>
                      <span className="block font-display text-[15px] font-semibold text-ink">{p.capacity} napkins</span>
                      <span className="block text-xs text-muted">{p.name} plan</span>
                    </span>
                    <span className="font-display text-2xl font-semibold text-ink tabular">
                      {rupees(p.price)}
                      <span className="ml-1 text-xs font-medium text-muted">/mo</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-end justify-center gap-2">
                {models.map((m) => (
                  <span key={m.slug} className="relative h-28 w-20">
                    <Image src={m.product.image} alt={`${m.product.fullName} on rent`} fill sizes="80px" priority className="product-shot object-contain" />
                  </span>
                ))}
              </div>
            </div>
          }
        />

        <Section
          id="plans"
          kicker="Rental plans"
          title="Three plans, priced by capacity"
          lead="Every plan includes your choice of an IoT WiFi, IoT Ethernet or RFID machine, plus installation, servicing, parts and monitoring. Pick the capacity that matches your daily footfall."
        >
          <RentalPlanCards planHref={(p) => `?plan=${p.id}#enquire`} />
          <p className="mt-6 text-sm text-muted">
            Prices are per machine per month, ex-GST. GST at 18% is added on the invoice. Updated October 2026.
          </p>
        </Section>

        <Section
          id="included"
          tone="subtle"
          kicker="Included in the rent"
          title="Everything except the napkins"
          lead="The monthly rent covers the machine and its upkeep for the full agreement, so you never pay separately for a service visit or a spare part."
        >
          <RentalIncluded />
        </Section>

        <Section
          id="terms"
          kicker="Rental terms"
          title="Simple, upfront terms"
          lead={`Every rental is covered by Lyra's ${AGREEMENT_TITLE} (${AGREEMENT_VERSION}), accepted online at booking. Your executed copy, with your booking details, is emailed to you as a PDF after payment.`}
        >
          <div className="mb-8 flex flex-wrap gap-3">
            <Link href={AGREEMENT_PATH} className="btn btn-primary h-11 px-5">
              Read the full rental agreement <IconArrowRight className="h-4 w-4" />
            </Link>
            <a href="/api/rental/agreement" target="_blank" rel="noopener" className="btn btn-secondary h-11 px-5">
              <IconDownload className="h-4 w-4" /> Specimen PDF
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[22px] border border-line bg-surface p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Agreement</p>
              <p className="mt-3 font-display text-3xl font-semibold text-ink">{RENTAL_MIN_YEARS} years</p>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Minimum agreement for use of the machine. Servicing, parts replacement and monitoring are covered for the whole term.
              </p>
            </div>
            <div className="rounded-[22px] border border-primary-500/40 bg-brand-soft p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Pay at signing (choose one)</p>
              <p className="mt-3 font-display text-3xl font-semibold text-ink tabular">{rupees(RENTAL_DEPOSIT)} + 1st month</p>
              <p className="text-sm font-medium text-ink">refundable deposit plus month 1&apos;s rent, + GST</p>
              <p className="mt-1 text-sm text-body">
                {RENTAL_PLANS.map((p) => `${rupees(signingCharge(p, 1, "deposit").total)} (${p.capacity})`).join(" · ")} incl. GST
              </p>
              <p className="my-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
              </p>
              <p className="font-display text-xl font-semibold text-ink">{RENTAL_ADVANCE_MONTHS} months&apos; rent in advance</p>
              <p className="mt-1 text-sm text-body">
                {RENTAL_PLANS.map((p) => `${rupees(signingCharge(p, 1, "advance").total)} (${p.capacity})`).join(" · ")} incl. GST, no deposit
              </p>
              <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">Rent starts from month 1. Per machine; after that, recharge monthly, quarterly or yearly.</p>
            </div>
            <div className="rounded-[22px] border border-line bg-surface p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Napkin refills</p>
              <p className="mt-3 font-display text-3xl font-semibold text-ink">From Lyra</p>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Refills are not included in the rent and are purchased from Lyra:{" "}
                <Link href="/products/xl-sanitary-napkin" className="font-medium text-brand hover:underline">XL 280 mm</Link> and{" "}
                <Link href="/products/xxl-sanitary-napkin" className="font-medium text-brand hover:underline">XXL 320 mm</Link> napkins made for Lyra machines.
              </p>
            </div>
          </div>

          {/* Recharge plans */}
          <div id="recharge-plans" className="mt-14 scroll-mt-36">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">Recharge plans: pay rent your way</h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-body">
                  After your first payment, recharge rent online with your rental code. Pay longer in advance and save on rent.
                </p>
              </div>
              <Link href={RECHARGE_PATH} className="btn btn-secondary h-11">
                Recharge rent <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 overflow-x-auto rounded-[22px] border border-line bg-surface">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-subtle">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Plan</th>
                    {RENTAL_PLANS.map((p) => (
                      <th key={p.id} scope="col" className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        {p.capacity} napkins
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-body">
                  {RECHARGE_PLANS.map((r) => (
                    <tr key={r.id}>
                      <th scope="row" className="px-5 py-4 font-semibold text-ink">
                        {r.label}
                        {r.discountPct > 0 && (
                          <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300">SAVE {r.discountPct}%</span>
                        )}
                        <span className="block text-xs font-normal text-muted">{r.months === 1 ? "1 month" : `${r.months} months`}</span>
                      </th>
                      {RENTAL_PLANS.map((p) => {
                        const c = rechargeCharge(p.price, r.id);
                        return (
                          <td key={p.id} className="px-5 py-4 text-right">
                            <span className="font-display text-base font-semibold text-ink tabular">{rupees(c.base)}</span>
                            <span className="block text-xs text-muted">+ GST · {rupees(c.total)}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted">
              Prices per machine. Reminders are emailed 7 days and 1 day before rent runs out. The machine keeps working for a {RENTAL_GRACE_DAYS}-day grace period
              after the due date; after that, UPI and RFID vending is paused until rent is recharged. Recharges always continue from the last paid date.
            </p>
          </div>
        </Section>

        <Section tone="subtle" kicker="Machines on rent" title="Choose your machine" lead="Every rented machine comes with a monitoring login on the Lyra website, with stock, usage and status at a glance.">
          <div className="grid gap-4 md:grid-cols-3">
            {models.map((m) => {
              const Icon = MODEL_ICONS[m.slug];
              return (
                <article key={m.slug} className="spotlight group flex flex-col overflow-hidden rounded-[24px] border border-line bg-surface">
                  <Link href={`/products/${m.slug}`} className="relative block aspect-[4/3] bg-subtle" tabIndex={-1} aria-hidden>
                    <Image src={m.product.image} alt="" fill sizes="(max-width: 768px) 90vw, 400px" className="product-shot object-contain p-8 transition-transform duration-700 group-hover:-translate-y-1.5" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink backdrop-blur">
                      <Icon className="h-3.5 w-3.5 text-brand" /> {m.tech}
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      <Link href={`/products/${m.slug}`} className="hover:text-brand">
                        {m.product.fullName}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-body">{m.summary}</p>
                    <ul className="mt-4 space-y-2 border-t border-line pt-4">
                      {m.product.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-body">
                          <IconCheck className="mt-0.5 h-4 w-4 flex-none text-brand" strokeWidth={2.2} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto flex items-baseline justify-between gap-3 pt-6 text-sm">
                      <span className="text-muted">
                        Rent from <strong className="font-display text-lg text-ink">{rupees(RENTAL_FROM)}</strong>/mo
                      </span>
                      <span className="text-muted">or buy {formatINR(m.product.price)}</span>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section kicker="Rent or buy" title="Renting vs buying a vending machine">
          <div className="overflow-x-auto rounded-[24px] border border-line bg-surface">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-subtle">
                <tr>
                  <th scope="col" className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"><span className="sr-only">Factor</span></th>
                  <th scope="col" className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Rent</th>
                  <th scope="col" className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Buy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-body">
                {[
                  [
                    "Upfront cost",
                    `${rupees(RENTAL_DEPOSIT)} refundable deposit + 1st month's rent, or ${RENTAL_ADVANCE_MONTHS} months' rent in advance (plus GST)`,
                    models.length
                      ? `${formatINR(Math.min(...models.map((m) => m.product.price)))} to ${formatINR(Math.max(...models.map((m) => m.product.price)))} + GST for these models`
                      : "Full machine price",
                  ],
                  ["Monthly cost", `${rupees(p25.price)}, ${rupees(p50.price)} or ${rupees(p100.price)} + GST`, "None after purchase"],
                  ["Installation", "Included", "On-site in South India; guided set-up elsewhere"],
                  ["Servicing and parts", "Included for the whole agreement", "1-year manufacturer warranty"],
                  ["Monitoring and alerts", "Included, on the Lyra website", "Cloud dashboard on IoT and RFID models"],
                  ["Capacity options", "25, 50 or 100 napkins per fill", "25 napkins per fill (35 on Solo Wave)"],
                  ["Commitment", `${RENTAL_MIN_YEARS}-year minimum agreement; napkins from Lyra`, "None; you own the machine"],
                  ["Best for", "Fixed monthly budgets with upkeep handled by Lyra", "Outright ownership and one-time grants or CSR funds"],
                ].map(([k, rent, buy]) => (
                  <tr key={k}>
                    <th scope="row" className="px-5 py-4 font-semibold text-ink">{k}</th>
                    <td className="px-5 py-4">{rent}</td>
                    <td className="px-5 py-4">{buy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {wifi && (
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-body">
              <strong className="text-ink">Quick maths:</strong> buying a Solo WiFi costs {formatINR(wifi.price)} + GST, about {breakEven} months of the{" "}
              {rupees(p25.price)} plan, with a 1-year warranty. Renting costs more over time, but servicing, parts and monitoring stay covered for the full{" "}
              {RENTAL_MIN_YEARS}-year agreement, and only renting offers 50 and 100-napkin capacity. See the{" "}
              <Link href="/sanitary-napkin-vending-machine-price-india" className="font-medium text-brand hover:underline">
                full purchase price list
              </Link>
              .
            </p>
          )}
        </Section>

        <Section tone="subtle" kicker="How renting works" title="From enquiry to installed machine">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="spotlight rounded-[22px] border border-line bg-surface p-6">
                <span className="font-display text-sm font-semibold text-brand">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-4xl text-[15px] leading-relaxed text-body">
            Renting works for{" "}
            <Link href="/solutions/schools-colleges" className="font-medium text-brand hover:underline">schools and colleges</Link>,{" "}
            <Link href="/solutions/hospitals" className="font-medium text-brand hover:underline">hospitals</Link>,{" "}
            <Link href="/solutions/offices" className="font-medium text-brand hover:underline">offices and factories</Link> and{" "}
            <Link href="/solutions/womens-hostels-colleges" className="font-medium text-brand hover:underline">women&apos;s hostels</Link>. Pair a rented machine with a{" "}
            <Link href="/products/sanitary-napkin-incinerators" className="font-medium text-brand hover:underline">sanitary napkin incinerator</Link> for compliant disposal.
          </p>
        </Section>

        <Section
          id="enquire"
          kicker="Book online"
          title="Book your rental machine"
          lead="Choose a plan, machine and quantity, add the installation address, and pay the deposit with your first month's rent, or 3 months in advance, securely online."
        >
          <Suspense fallback={<div className="h-[760px] rounded-[24px] border border-line bg-surface" />}>
            <RentalCheckout states={STATES} />
          </Suspense>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2"><IconLock className="h-4 w-4 text-brand" /> Secure payment via Razorpay</span>
            <span className="inline-flex items-center gap-2"><IconReceipt className="h-4 w-4 text-brand" /> Service, parts and monitoring included</span>
            <span className="inline-flex items-center gap-2">
              <IconCheck className="h-4 w-4 text-brand" /> Made by Lyra in Chennai, 200+ institutions served
            </span>
          </div>
        </Section>

        <Section tone="subtle" kicker="FAQ" title="Rental FAQs" narrow>
          <FaqList items={faqs} />
        </Section>

        <CtaBand
          title="Rather own the machine?"
          body="Every Lyra vending machine is also for sale at published prices, with checkout online and pan-India dispatch."
          primary={{ href: "/products/sanitary-napkin-vending-machines", label: "Shop vending machines" }}
        />
      </main>
      <PageFooter />
    </>
  );
}
