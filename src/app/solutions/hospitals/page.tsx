import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sanitary Napkin Vending Machine for Hospitals & Clinics India | Lyra Enterprises",
  description:
    "Supply sanitary napkin vending machines and CPCB-compliant incinerators to hospitals, clinics and healthcare facilities. Biomedical Waste Rules 2016 compliant. GeM vendor. From ₹11,500.",
  keywords: [
    "sanitary napkin vending machine for hospitals india",
    "napkin vending machine for clinics india",
    "biomedical waste incinerator for hospitals india",
    "cpcb compliant napkin incinerator hospital india",
    "sanitary waste management hospital india",
    "napkin dispenser for hospital toilet india",
    "GeM vending machine hospital india",
    "menstrual hygiene hospital india",
    "sanitary napkin machine for healthcare india",
    "napkin incinerator biomedical waste rules 2016",
  ],
  alternates: { canonical: `${SITE.url}/solutions/hospitals` },
  openGraph: {
    title: "Sanitary Napkin Vending Machine for Hospitals | Lyra Enterprises India",
    description:
      "CPCB-compliant vending machines and incinerators for hospitals, clinics and healthcare facilities. Biomedical Waste Rules 2016 compliant. GeM procurement available.",
    url: `${SITE.url}/solutions/hospitals`,
  },
};

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sanitary Napkin Vending Machine for Hospitals & Clinics",
  url: `${SITE.url}/solutions/hospitals`,
  description:
    "Lyra Enterprises supplies CPCB-compliant, Biomedical Waste Rules 2016-compliant sanitary napkin vending machines and incinerators to hospitals and clinics across India.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE.url}/solutions` },
      { "@type": "ListItem", position: 3, name: "Hospitals", item: `${SITE.url}/solutions/hospitals` },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which Lyra incinerator is best for hospitals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most hospitals, the Lyra Maxi (₹39,500) is recommended — it handles 25–50 napkins per cycle, includes remote temperature logging for compliance monitoring, and meets Biomedical Waste Management Rules 2016. Medium clinics and day-care hospitals can use the Lyra Mini (₹18,500).",
      },
    },
    {
      "@type": "Question",
      name: "Are Lyra products compliant with Biomedical Waste Management Rules 2016?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Lyra Maxi incinerator is specifically designed and certified for biomedical waste management compliance under the Biomedical Waste Management Rules 2016. All incinerators meet CPCB disposal guidelines for menstrual waste.",
      },
    },
    {
      "@type": "Question",
      name: "Can government hospitals procure Lyra products through GeM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Lyra Enterprises is a registered GeM (Government e-Marketplace) vendor. Government hospitals, ESIC hospitals, AIIMS affiliate hospitals and state government healthcare facilities can procure through GeM without a separate tender.",
      },
    },
  ],
};

const features = [
  {
    icon: "🏥",
    heading: "Biomedical Waste Compliant",
    body: "Lyra incinerators meet Biomedical Waste Management Rules 2016 and CPCB guidelines for menstrual waste disposal — essential for hospitals seeking compliance certification.",
  },
  {
    icon: "🌡️",
    heading: "Remote Temperature Logging",
    body: "Lyra Maxi includes remote temperature logging for hospital facility managers, enabling audit trails required for biomedical waste compliance records.",
  },
  {
    icon: "🏛️",
    heading: "GeM Government Procurement",
    body: "Government hospitals, ESIC hospitals and state healthcare facilities can procure Lyra machines through the GeM portal — fast, transparent, tender-free.",
  },
  {
    icon: "💧",
    heading: "Smoke-Control Technology",
    body: "Our incinerators use smoke-control technology to ensure odour-free, smoke-minimal operation — safe for use inside hospital toilets and patient areas.",
  },
  {
    icon: "✅",
    heading: "CPCB & ISO Certified",
    body: "All products meet ISO 9001:2015 quality standards and CPCB environmental compliance guidelines for menstrual waste disposal in healthcare settings.",
  },
  {
    icon: "📦",
    heading: "Pan-India Supply & Install",
    body: "We supply to government and private hospitals across India — delivery within 7–10 days, installation support, and 1-Year warranty on all equipment.",
  },
];

const products = [
  {
    name: "Solo Coin",
    price: "₹12,500",
    slug: "solo-coin-vending-machine",
    tag: "Small Clinics",
    desc: "Coin-operated vending machine for clinics, nursing homes and small hospitals. Easy to use, durable SS body.",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    name: "Solo WiFi (UPI)",
    price: "₹22,500",
    slug: "solo-wifi-vending-machine",
    tag: "Smart Hospitals",
    desc: "UPI QR payment integration — no coins, remote monitoring, usage analytics. Perfect for large private hospitals.",
    badge: "bg-primary-100 text-primary-700",
  },
  {
    name: "Lyra Mini Incinerator",
    price: "₹18,500",
    slug: "lyra-mini-incinerator",
    tag: "Mid-Size Hospitals",
    desc: "5–15 napkins per cycle. SWM Rules 2016 compliant. Ideal for community health centres and nursing homes.",
    badge: "bg-teal-100 text-teal-700",
  },
  {
    name: "Lyra Maxi Incinerator",
    price: "₹39,500",
    slug: "lyra-maxi-incinerator",
    tag: "Large Hospitals",
    desc: "25–50 napkins per cycle, remote temperature logging, Biomedical Waste Rules compliant. For large hospitals and medical colleges.",
    badge: "bg-purple-100 text-purple-700",
  },
];

export default function HospitalsSolutionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Solutions", href: "/solutions" },
              { label: "Hospitals & Clinics" },
            ]} />
            <div className="mt-6 flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">Hospitals & Clinics</span>
              <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest">Biomedical Compliant</span>
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest">GeM Vendor</span>
            </div>
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Sanitary Napkin Machines{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                for Hospitals &amp; Clinics
              </span>
            </h1>
            <p className="mt-5 text-gray-600 text-lg max-w-3xl leading-relaxed">
              Hospitals and healthcare facilities need both napkin vending machines for patient and staff access, and CPCB-compliant incinerators for biomedical waste disposal. Lyra Enterprises supplies both — with Biomedical Waste Rules 2016 compliance, GeM procurement support and pan-India installation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="tel:+918122378860"
                className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Call for Hospital Quote
              </Link>
              <Link
                href="/#contact"
                className="px-7 py-3.5 border border-blue-200 text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              {["GeM Registered", "Biomedical Waste Rules 2016", "CPCB Compliant", "ISO 9001:2015", "Pan-India Delivery"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-14 sm:py-20 max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Why Lyra for Healthcare?</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">Certified, compliant equipment trusted by hospitals across India.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.heading} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{f.heading}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Products */}
        <section className="py-14 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Recommended for Hospitals &amp; Clinics</h2>
            <p className="text-gray-500 mb-10">From small clinics to large government hospitals — machines for every scale.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                  <span className={`self-start px-3 py-1 rounded-full text-xs font-bold ${p.badge} mb-4`}>{p.tag}</span>
                  <p className="font-bold text-gray-900 text-lg mb-1">{p.name}</p>
                  <p className="text-teal-600 font-semibold text-base mb-3">{p.price}</p>
                  <p className="text-gray-500 text-sm flex-1 mb-5">{p.desc}</p>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-auto text-center py-2.5 px-4 rounded-xl bg-teal-50 text-teal-700 font-semibold text-sm hover:bg-teal-100 transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-20 max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="border-b border-gray-100 pb-6">
                <p className="font-semibold text-gray-900 mb-2">{q.name}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-gradient-to-r from-blue-600 to-teal-500">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-4">Equip your hospital today</h2>
            <p className="text-white/80 mb-8">Get a quote tailored for your facility — including GeM procurement, compliance documentation and installation support.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+918122378860" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition-colors">
                📞 +91-81223 78860
              </Link>
              <Link href="/#contact" className="px-8 py-4 bg-white/20 text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
