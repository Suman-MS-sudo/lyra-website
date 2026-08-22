import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import { SITE } from "@/lib/data";
import { WhatsAppCTA, CallCTA } from "./ComboCTA";
import ExitPopup from "@/components/ExitPopup";
import StickyBar from "./StickyBar";
import Reveal from "./Reveal";

const PRICE = 19999;
const PAGE_URL = `${SITE.url}/offers/push-button-micro-combo`;
const WA_MESSAGE =
  "Hi! I'm interested in the Push Button Vending Machine + Lyra Micro Incinerator combo offer at ₹19,999 + GST + Freight. Please share more details.";

export const metadata: Metadata = {
  title: "Push Button Vending Machine + Micro Incinerator Combo Offer ₹19,999 | Lyra",
  description:
    "Limited combo offer: Push Button Sanitary Napkin Vending Machine + Lyra Micro Incinerator for ₹19,999 + GST + Freight. Full SWM Rules 2016 compliance in one order. Pan-India delivery.",
  keywords: [
    "vending machine incinerator combo offer",
    "sanitary napkin vending machine incinerator price",
    "push button vending machine micro incinerator combo",
    "sanitary napkin machine combo offer india",
    "vending machine incinerator 19999",
    "school hostel hygiene combo offer",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Push Button + Micro Incinerator Combo Offer ₹19,999 | Lyra Enterprises",
    description:
      "Complete menstrual hygiene compliance in one order — Push Button Vending Machine + Lyra Micro Incinerator for ₹19,999 + GST + Freight.",
    url: PAGE_URL,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Push Button + Micro Incinerator Combo Offer ₹19,999 | Lyra Enterprises",
    description:
      "Complete menstrual hygiene compliance in one order — Push Button Vending Machine + Lyra Micro Incinerator for ₹19,999 + GST + Freight.",
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Push Button Vending Machine + Lyra Micro Incinerator Combo",
  description:
    "Push Button Sanitary Napkin Vending Machine bundled with Lyra Micro Incinerator — complete menstrual hygiene compliance solution for schools, hostels and small institutions.",
  brand: { "@type": "Brand", name: "Lyra Enterprises" },
  image: `${SITE.url}/images/products/push-button-vm.png`,
  url: PAGE_URL,
  offers: {
    "@type": "Offer",
    price: PRICE,
    priceCurrency: "INR",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: PAGE_URL,
    seller: { "@type": "Organization", name: "Lyra Enterprises" },
    itemCondition: "https://schema.org/NewCondition",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "INR" },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Combo Offer", item: PAGE_URL },
  ],
};

const faqs = [
  {
    q: "What's included in the ₹19,999 combo offer?",
    a: "One Push Button Sanitary Napkin Vending Machine and one Lyra Micro Incinerator. Price is ₹19,999 plus applicable GST and freight charges to your location.",
  },
  {
    q: "Does this combo meet compliance requirements?",
    a: "Yes. Together, the vending machine and incinerator satisfy the full requirements of Solid Waste Management Rules 2016 for menstrual hygiene infrastructure — access to napkins plus CPCB-compliant disposal.",
  },
  {
    q: "Is installation included?",
    a: "Both units are wall-mountable and come with an installation guide. Our team can guide your facility team through setup over call, or arrange assisted installation depending on your location — ask us when you enquire.",
  },
  {
    q: "What's the warranty?",
    a: "Both machines come with Lyra Enterprises' standard 1-year warranty covering manufacturing defects.",
  },
  {
    q: "How is freight calculated?",
    a: "Freight depends on your delivery location and is calculated at the time of order confirmation. Contact us with your pincode for an exact freight quote.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ComboOfferPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />
      <ExitPopup
        storageKey="lyra_combo_popup_dismissed"
        source="combo-offer-popup"
        title="Get a callback about the ₹19,999 combo"
        body="Leave your number and we'll call you back with full details on the Push Button + Micro Incinerator offer."
      />
      <StickyBar price={PRICE} />
      <main className="bg-gray-950 min-h-screen overflow-hidden">
        {/* Hero — dark, bold, gradient-mesh */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
          {/* Animated gradient orbs */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary-600/30 blur-[100px] pointer-events-none" />
          <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:32px_32px] pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-500/30">
                🔥 Combo Offer
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                ✓ SWM Rules 2016 Compliant
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
              Push Button Vending Machine{" "}
              <span className="text-white/40">+</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-pink-300 to-orange-300">
                Micro Incinerator
              </span>
            </h1>
            <p className="mt-6 text-white/60 text-lg sm:text-xl max-w-2xl leading-relaxed">
              Complete menstrual hygiene compliance in one order. Napkin access and CPCB-compliant disposal, delivered anywhere in India.
            </p>

            {/* Price + CTA card */}
            <div className="mt-10 p-1 rounded-3xl bg-gradient-to-r from-primary-500 via-pink-500 to-orange-400 shadow-2xl shadow-primary-900/50 max-w-xl">
              <div className="rounded-[22px] bg-gray-950/95 backdrop-blur-xl p-6 sm:p-8">
                <div className="flex items-end justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Combo Price</p>
                    <p className="text-5xl sm:text-6xl font-bold text-white leading-none">
                      ₹{PRICE.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-white/50 mt-2">+ GST + Freight, calculated at order</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <WhatsAppCTA
                    text={WA_MESSAGE}
                    className="flex-1 text-center px-6 py-4 bg-gradient-to-r from-primary-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:-translate-y-0.5 hover:shadow-primary-500/30 transition-all duration-200"
                  />
                  <CallCTA className="flex-1 text-center px-6 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-200">
                    📞 Call Now
                  </CallCTA>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/40">
              {["1-Year Warranty on Both Units", "CPCB & SWM Rules 2016 Compliant", "Pan-India Delivery", "50+ Institutions Trust Lyra"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* What's included — light section, high contrast break */}
        <section className="relative bg-white py-16 sm:py-24 rounded-t-[2.5rem] sm:rounded-t-[3rem]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Reveal className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-500">What&apos;s In The Box</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">Two Machines. One Order.</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <Reveal delay={0.05} className="group rounded-3xl border border-gray-100 p-6 sm:p-8 bg-gradient-to-b from-gray-50 to-white hover:shadow-xl hover:shadow-primary-100/50 hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-full h-52 mb-6">
                  <Image src="/images/products/push-button-vm.png" alt="Push Button Sanitary Napkin Vending Machine" fill sizes="(max-width: 640px) 90vw, 400px" className="object-contain group-hover:scale-105 transition-transform duration-500" quality={70} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Push Button Vending Machine</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {["25 napkins capacity", "Manual push-button — no power needed", "Tamper-proof, epoxy-coated steel body", "Wall-mountable, 700 × 160 × 160 mm"].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/products/push-button-vending-machine" className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-primary-600 hover:gap-2 transition-all">
                  Full specifications <span>→</span>
                </Link>
              </Reveal>
              <Reveal delay={0.15} className="group rounded-3xl border border-gray-100 p-6 sm:p-8 bg-gradient-to-b from-gray-50 to-white hover:shadow-xl hover:shadow-primary-100/50 hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-full h-52 mb-6">
                  <Image src="/images/products/lyra-micro.png" alt="Lyra Micro Sanitary Napkin Incinerator" fill sizes="(max-width: 640px) 90vw, 400px" className="object-contain group-hover:scale-105 transition-transform duration-500" quality={70} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Lyra Micro Incinerator</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {["1–5 napkins per cycle, up to 100/day", "Automatic digital temperature control", "Auto shut-off, smoke & odour control", "Wall-mountable, CPCB-compliant disposal"].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/products/lyra-micro-incinerator" className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-primary-600 hover:gap-2 transition-all">
                  Full specifications <span>→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Why this combo */}
        <section className="bg-gradient-to-b from-white to-primary-50/40 py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Reveal className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-500">Why This Combo</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">Built for Institutions Like Yours</h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: "⚖️", title: "Full Compliance", body: "SWM Rules 2016 requires both napkin access and safe disposal. This combo covers both in one order." },
                { icon: "🚚", title: "Pan-India Delivery", body: "Delivered to your institution anywhere in India, with freight calculated at order confirmation." },
                { icon: "🔧", title: "One Vendor, One Invoice", body: "Single order, single installation guide, single point of contact for warranty and support." },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1} className="p-7 rounded-3xl border border-primary-100/60 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-pink-100 flex items-center justify-center text-2xl mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <Reveal className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-500">FAQ</span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </Reveal>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6">
                  <p className="font-semibold text-gray-900 mb-2">{f.q}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA — bold dark closer */}
        <section className="relative bg-gray-950 py-16 sm:py-24 overflow-hidden">
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary-600/25 blur-[100px] pointer-events-none" />
          <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
            <Reveal>
              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-500/30 inline-block mb-6">
                🔥 Combo Offer
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl text-white mb-3">
                ₹{PRICE.toLocaleString("en-IN")} <span className="text-white/40 text-2xl font-medium">+ GST + Freight</span>
              </h2>
              <p className="text-white/60 mb-9">Push Button Vending Machine + Lyra Micro Incinerator. Order today.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <WhatsAppCTA
                  text={WA_MESSAGE}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                />
                <CallCTA className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-colors">
                  📞 +91-81223 78860
                </CallCTA>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
