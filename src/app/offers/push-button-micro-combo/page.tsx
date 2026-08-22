import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import { SITE } from "@/lib/data";
import { WhatsAppCTA, CallCTA } from "./ComboCTA";
import ExitPopup from "./ExitPopup";

const PRICE = 19999;
const PAGE_URL = `${SITE.url}/offers/push-button-micro-combo`;

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
      <ExitPopup />
      <main className="pt-16 bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-pink-50 py-12 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest">Combo Offer</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest">SWM Rules 2016 Compliant</span>
            </div>
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Push Button Vending Machine +{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">
                Lyra Micro Incinerator
              </span>
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-2xl leading-relaxed">
              Complete menstrual hygiene compliance in a single order — napkin access and CPCB-compliant disposal together. Built for schools, hostels and small institutions.
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-4">
              <div className="p-6 rounded-2xl bg-white border border-primary-100 shadow-purple">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Combo Price</p>
                <p className="text-4xl font-bold text-gray-900">
                  ₹{PRICE.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-500 mt-1">+ GST + Freight</p>
              </div>
              <div className="flex flex-col gap-3">
                <WhatsAppCTA
                  text="Hi! I'm interested in the Push Button Vending Machine + Lyra Micro Incinerator combo offer at ₹19,999 + GST + Freight. Please share more details."
                  className="px-7 py-3.5 bg-gradient-to-r from-primary-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
                />
                <CallCTA className="px-7 py-3 border border-primary-200 text-primary-700 font-semibold rounded-full hover:bg-primary-50 transition-colors text-center">
                  📞 Call +91-81223 78860
                </CallCTA>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              {["1-Year Warranty on Both Units", "CPCB & SWM Rules 2016 Compliant", "Pan-India Delivery", "50+ Institutions Already Trust Lyra"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-14 max-w-5xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">What&apos;s in the Box</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
              <div className="relative w-full h-48 mb-5">
                <Image src="/images/products/push-button-vm.png" alt="Push Button Sanitary Napkin Vending Machine" fill sizes="(max-width: 640px) 90vw, 400px" className="object-contain" quality={70} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Push Button Vending Machine</h3>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>• 25 napkins capacity</li>
                <li>• Manual push-button dispensing — no power needed</li>
                <li>• Tamper-proof, epoxy-coated steel body</li>
                <li>• Wall-mountable, 700 × 160 × 160 mm</li>
              </ul>
              <Link href="/products/push-button-vending-machine" className="inline-block mt-4 text-sm font-semibold text-primary-600 hover:underline">
                Full specifications →
              </Link>
            </div>
            <div className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
              <div className="relative w-full h-48 mb-5">
                <Image src="/images/products/lyra-micro.png" alt="Lyra Micro Sanitary Napkin Incinerator" fill sizes="(max-width: 640px) 90vw, 400px" className="object-contain" quality={70} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Lyra Micro Incinerator</h3>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>• 1–5 napkins per cycle, up to 100/day</li>
                <li>• Automatic digital temperature control</li>
                <li>• Auto shut-off, smoke & odour control</li>
                <li>• Wall-mountable, CPCB-compliant disposal</li>
              </ul>
              <Link href="/products/lyra-micro-incinerator" className="inline-block mt-4 text-sm font-semibold text-primary-600 hover:underline">
                Full specifications →
              </Link>
            </div>
          </div>
        </section>

        {/* Why this combo */}
        <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Why This Combo</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: "⚖️", title: "Full Compliance", body: "SWM Rules 2016 requires both napkin access and safe disposal. This combo covers both in one order." },
                { icon: "💰", title: "Best Value", body: "Buying together works out cheaper than ordering the vending machine and incinerator separately." },
                { icon: "🔧", title: "One Vendor, One Invoice", body: "Single order, single installation guide, single point of contact for warranty and support." },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl border border-gray-100 bg-white">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-20 max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-gray-100 pb-6">
                <p className="font-semibold text-gray-900 mb-2">{f.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky-style bottom CTA */}
        <section className="py-14 bg-gradient-to-r from-primary-600 to-pink-500">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-2">₹{PRICE.toLocaleString("en-IN")} + GST + Freight</h2>
            <p className="text-white/80 mb-8">Push Button Vending Machine + Lyra Micro Incinerator. Order today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppCTA
                text="Hi! I'm interested in the Push Button Vending Machine + Lyra Micro Incinerator combo offer at ₹19,999 + GST + Freight. Please share more details."
                className="px-8 py-4 bg-white text-primary-700 font-bold rounded-full hover:bg-gray-100 transition-colors"
              />
              <CallCTA className="px-8 py-4 bg-white/20 text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                📞 +91-81223 78860
              </CallCTA>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
