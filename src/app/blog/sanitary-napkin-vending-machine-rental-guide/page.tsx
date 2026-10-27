import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import ArticleAside from "@/components/page/ArticleAside";
import Breadcrumb from "@/components/Breadcrumb";
import BlogFaq, { type Faq } from "@/components/BlogFaq";
import RentalBundle from "@/components/rental/RentalBundle";
import { SITE, formatINR, getProductBySlug } from "@/lib/data";
import {
  RECHARGE_PLANS,
  RECHARGE_PATH,
  RENTAL_ANSWER,
  RENTAL_DEPOSIT,
  RENTAL_GRACE_DAYS,
  RENTAL_MIN_YEARS,
  RENTAL_PATH,
  RENTAL_PLANS,
  rechargeCharge,
  rentWithGst,
  rupees,
  signingCharge,
} from "@/lib/rental";
import { AGREEMENT_PATH, EARLY_TERMINATION_MONTHS, NOTICE_DAYS } from "@/lib/rental-agreement";

const SLUG = "sanitary-napkin-vending-machine-rental-guide";
const URL = `${SITE.url}/blog/${SLUG}`;
const HEADLINE = "Sanitary Napkin Vending Machine on Rent in India: Cost, What's Included and How It Works (2026)";
const DESC =
  "Renting a sanitary napkin vending machine in India: monthly rent from ₹999 + GST, what an all-inclusive rental covers, signing costs, rent vs buy and contract terms.";
const PUBLISHED = "2026-10-27";

export const metadata: Metadata = {
  title: { absolute: "Sanitary Napkin Vending Machine on Rent: 2026 Guide & Cost" },
  description: DESC,
  keywords: [
    "sanitary napkin vending machine on rent",
    "sanitary napkin vending machine rental cost india",
    "sanitary pad vending machine rent per month",
    "napkin vending machine rental with maintenance",
    "rent vs buy sanitary napkin vending machine",
    "all inclusive vending machine rental india",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: HEADLINE,
    description: DESC,
    url: URL,
    type: "article",
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra all-inclusive vending machine rental" }],
  },
  twitter: { card: "summary_large_image", title: HEADLINE, description: DESC, images: [`${SITE.url}/images/og-image.jpg`] },
};

const [p25, p50, p100] = RENTAL_PLANS;
const wifi = getProductBySlug("solo-wifi-vending-machine");
const months = RENTAL_MIN_YEARS * 12;
// 3-year rent for the 25-napkin plan, paid monthly vs yearly (ex-GST).
const threeYearMonthly = p25.price * months;
const threeYearYearly = rechargeCharge(p25.price, "yearly").base * RENTAL_MIN_YEARS;

const faqs: Faq[] = [
  {
    q: "How much does it cost to rent a sanitary napkin vending machine in India?",
    a: `At Lyra Enterprises, ${rupees(p25.price)} per month for a 25-napkin machine, ${rupees(p50.price)} for 50 napkins and ${rupees(p100.price)} for 100 napkins, plus 18% GST (${rupees(rentWithGst(p25.price))}, ${rupees(rentWithGst(p50.price))} and ${rupees(rentWithGst(p100.price))} including GST). The rent includes installation, servicing, repairs, parts and online monitoring.`,
  },
  {
    q: "What is included in an all-inclusive vending machine rental?",
    a: "With Lyra, everything except the napkins themselves: the machine, installation, regular servicing, breakdown repairs, replacement of parts, software updates, an online monitoring dashboard and low-stock alerts. Napkins are supplied by Lyra and billed separately. The customer only refills the machine.",
  },
  {
    q: "How much do I pay upfront to rent a napkin vending machine?",
    a: `For one 25-napkin machine, ${rupees(signingCharge(p25, 1, "deposit").total)} including GST: a refundable ${rupees(RENTAL_DEPOSIT)} deposit plus the first month's rent of ${rupees(p25.price)}, plus 18% GST. Alternatively pay 3 months' rent in advance (${rupees(signingCharge(p25, 1, "advance").total)} including GST) with no deposit.`,
  },
  {
    q: "Is it cheaper to rent or buy a sanitary napkin vending machine?",
    a: wifi
      ? `Buying costs less over three years if you will handle maintenance yourself: a Lyra Solo WiFi is ${formatINR(wifi.price)} + GST with a 1-year warranty. Renting costs more in total (${rupees(threeYearYearly)} + GST over three years on the 25-napkin plan with yearly recharges) but needs no purchase budget and includes installation, servicing, repairs, parts, monitoring and napkin supply for the whole term, plus 50 and 100-napkin capacities that are only available on rent.`
      : "Buying costs less over three years if you handle maintenance yourself; renting needs no purchase budget and includes all servicing, repairs and monitoring.",
  },
  {
    q: "What is the minimum period for renting a vending machine?",
    a: `${RENTAL_MIN_YEARS} years from installation. You can leave early with ${NOTICE_DAYS} days' notice by paying ${EARLY_TERMINATION_MONTHS} months' rent plus GST per machine.`,
  },
  {
    q: "What happens if rent is not paid on time?",
    a: `Reminders go out 7 days and 1 day before the due date. The machine keeps working for a ${RENTAL_GRACE_DAYS}-day grace period; after that, UPI and RFID vending is paused until rent is recharged online.`,
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${URL}#article`,
      headline: HEADLINE,
      description: DESC,
      abstract: RENTAL_ANSWER,
      author: { "@type": "Organization", name: "Lyra Enterprises", url: SITE.url },
      publisher: {
        "@type": "Organization",
        name: "Lyra Enterprises",
        url: SITE.url,
        logo: { "@type": "ImageObject", url: `${SITE.url}/images/logo.png`, width: 442, height: 454 },
      },
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      image: [`${SITE.url}/images/og-image.jpg`],
      mainEntityOfPage: { "@type": "WebPage", "@id": URL },
      url: URL,
      about: { "@type": "Service", name: "All-inclusive sanitary napkin vending machine rental", url: `${SITE.url}${RENTAL_PATH}` },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr"] },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
        { "@type": "ListItem", position: 3, name: "Vending machine rental guide", item: URL },
      ],
    },
  ],
};

const link = "text-primary-600 font-semibold hover:underline";

export default function RentalGuidePost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageNavbar />
      <main className="bg-canvas">
        <div className="lyra-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-20">
          <article className="lyra-article max-w-3xl">
            <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Vending machine rental guide" }]} />

            <div className="article-meta mt-8">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest">Rental</span>
              <span className="ml-3 text-sm text-gray-500">27 October 2026 · 8 min read</span>
            </div>

            <h1 className="mt-5 font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">{HEADLINE}</h1>

            <p id="tldr" className="mt-4 text-xl text-gray-600 leading-relaxed border-l-4 border-primary-300 pl-5">
              {RENTAL_ANSWER}
            </p>

            <div className="article-body">
              <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-gray-900">Why rent instead of buy?</h2>
                <p>
                  Most schools, hospitals and offices don&apos;t want to own a vending machine. They want napkins available in the washroom, every day, without a
                  purchase approval, a service contract or someone chasing repairs. Renting turns the machine into a fixed monthly cost and hands the upkeep to the
                  manufacturer. With Lyra&apos;s <Link href={RENTAL_PATH} className={link}>all-inclusive rental</Link>, the only task left with your staff is refilling
                  napkins when the low-stock alert arrives.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">What &quot;all-inclusive&quot; means</h2>
                <p>Here is exactly who does what under a Lyra rental:</p>
              </div>
            </div>

            <div className="not-prose mt-6">
              <RentalBundle />
            </div>

            <div className="article-body">
              <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-gray-900">Sanitary napkin vending machine rent per month (2026)</h2>
                <p>Rent depends only on how many napkins the machine holds per fill. The model (WiFi, Ethernet or RFID) is your choice at the same price.</p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 pr-4">Capacity</th>
                        <th className="py-2 pr-4">Rent per month</th>
                        <th className="py-2 pr-4">With 18% GST</th>
                        <th className="py-2">Suits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RENTAL_PLANS.map((p) => (
                        <tr key={p.id} className="border-t border-gray-200">
                          <td className="py-2 pr-4 font-semibold">{p.capacity} napkins</td>
                          <td className="py-2 pr-4">{rupees(p.price)}</td>
                          <td className="py-2 pr-4">{rupees(rentWithGst(p.price))}</td>
                          <td className="py-2">{p.idealFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  After the first month, pay rent online with a{" "}
                  {RECHARGE_PLANS.map((r, k) => (
                    <span key={r.id}>
                      {k > 0 && (k === RECHARGE_PLANS.length - 1 ? " or " : ", ")}
                      <strong>{r.label.toLowerCase()}</strong>
                      {r.discountPct ? ` (${r.discountPct}% off rent)` : ""}
                    </span>
                  ))}{" "}
                  recharge. On the 25-napkin plan, a yearly recharge is {rupees(rechargeCharge(p25.price, "yearly").base)} + GST instead of{" "}
                  {rupees(p25.price * 12)}. See <Link href={RECHARGE_PATH} className={link}>rent recharge</Link>.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">What you pay at signing</h2>
                <p>
                  Rent starts from month 1. When you book, you pay either a refundable {rupees(RENTAL_DEPOSIT)} deposit plus the first month&apos;s rent, or three
                  months&apos; rent in advance with no deposit, plus 18% GST either way. Per machine, that is:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  {RENTAL_PLANS.map((p) => (
                    <li key={p.id}>
                      <strong>{p.capacity} napkins:</strong> {rupees(signingCharge(p, 1, "deposit").total)} (deposit + month 1) or{" "}
                      {rupees(signingCharge(p, 1, "advance").total)} (3 months in advance), including GST
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900">Rent or buy: a three-year comparison</h2>
                {wifi && (
                  <p>
                    Take a Lyra Solo WiFi. Buying it costs {formatINR(wifi.price)} + GST once, with a 1-year manufacturer warranty; servicing and repairs after that
                    are yours to arrange. Renting the 25-napkin version costs {rupees(threeYearMonthly)} + GST over {months} months paid monthly, or{" "}
                    {rupees(threeYearYearly)} + GST with yearly recharges, and covers installation, servicing, repairs, parts, monitoring and napkin supply for the
                    whole period. Buy if you have a one-time budget (for example a grant or CSR fund) and an in-house team to maintain it. Rent if you want a fixed
                    monthly cost with nothing to manage, or need 50 or 100-napkin capacity, which is only offered on rent.
                  </p>
                )}

                <h2 className="text-2xl font-bold text-gray-900">Which machine to rent</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <Link href="/products/solo-wifi-vending-machine" className={link}>Solo WiFi</Link>: UPI QR and coin payment over your WiFi, with a touch
                    display and cloud dashboard. The default choice for most offices and campuses.
                  </li>
                  <li>
                    <Link href="/products/solo-ethernet-vending-machine" className={link}>Solo Ethernet</Link>: the same features over a wired LAN, for hospitals
                    and government buildings where WiFi is restricted.
                  </li>
                  <li>
                    <Link href="/products/solo-rfid-vending-machine" className={link}>Solo RFID</Link>: prepaid or postpaid issue by staff or student ID card, with
                    per-card usage reports.
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900">How renting works</h2>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Choose a capacity and a machine on the <Link href={RENTAL_PATH} className={link}>rental page</Link>.</li>
                  <li>Enter the installation address, accept the rental agreement and pay the signing amount online.</li>
                  <li>Your executed rental agreement arrives by email as a PDF; Lyra calls to fix the installation date.</li>
                  <li>Lyra installs the machine and gives you a monitoring login. From then on, you refill napkins and recharge rent.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-900">Contract terms to know</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Minimum term:</strong> {RENTAL_MIN_YEARS} years from installation. Early exit: {NOTICE_DAYS} days&apos; notice plus{" "}
                    {EARLY_TERMINATION_MONTHS} months&apos; rent + GST per machine.
                  </li>
                  <li>
                    <strong>Grace period:</strong> {RENTAL_GRACE_DAYS} days after the due date; then UPI and RFID vending pauses until rent is paid.
                  </li>
                  <li>
                    <strong>Damage:</strong> normal wear and faults are Lyra&apos;s cost; damage from misuse, vandalism, theft, fire or water is charged, capped at
                    the machine&apos;s list price.
                  </li>
                  <li>
                    <strong>Napkins:</strong> bought from Lyra (XL 280 mm or XXL 320 mm), billed separately from rent.
                  </li>
                </ul>
                <p>
                  The full terms are public: read the <Link href={AGREEMENT_PATH} className={link}>Equipment Rental Agreement</Link>.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">Who rents vending machines</h2>
                <p>
                  Renting suits <Link href="/solutions/schools-colleges" className={link}>schools and colleges</Link>,{" "}
                  <Link href="/solutions/hospitals" className={link}>hospitals</Link>, <Link href="/solutions/offices" className={link}>offices and factories</Link> and{" "}
                  <Link href="/solutions/womens-hostels-colleges" className={link}>women&apos;s hostels</Link>: any site that wants napkins always available without
                  owning and maintaining the equipment. For compliant disposal, pair the machine with a{" "}
                  <Link href="/products/sanitary-napkin-incinerators" className={link}>sanitary napkin incinerator</Link>.
                </p>
              </div>
            </div>

            <BlogFaq faqs={faqs} />

            <div className="article-related mt-14">
              <p className="text-sm font-bold text-gray-900 mb-4">Related</p>
              <div className="space-y-3">
                <Link href="/sanitary-napkin-vending-machine-price-india" className="block text-sm text-primary-600 hover:underline">Sanitary napkin vending machine price list (2026) →</Link>
                <Link href="/blog/best-sanitary-napkin-vending-machine-india" className="block text-sm text-primary-600 hover:underline">Best sanitary napkin vending machine in India (2026) →</Link>
                <Link href="/blog/iot-vending-machine-technology-india" className="block text-sm text-primary-600 hover:underline">How Lyra&apos;s IoT WiFi, Ethernet and RFID machines work →</Link>
              </div>
            </div>

            <div className="article-cta mt-10">
              <h3 className="font-bold text-gray-900 mb-2">Rent a machine with nothing to manage</h3>
              <p className="text-sm text-gray-600 mb-4">From {rupees(p25.price)} a month + GST. Book online in a few minutes.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={RENTAL_PATH} className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-blue-500 text-white font-bold rounded-full text-sm">See rental plans</Link>
                <Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-green-500 text-white font-bold rounded-full text-sm">Ask our team</Link>
              </div>
            </div>
          </article>
          <ArticleAside />
        </div>
      </main>
      <PageFooter />
    </>
  );
}
