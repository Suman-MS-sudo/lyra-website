import type { Metadata } from "next";
import SolutionPage from "@/components/page/SolutionPage";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Napkin Vending Machines for Hospitals & Clinics | Lyra" },
  description:
    "Napkin vending machines and CPCB-compliant incinerators for hospitals and clinics. Biomedical Waste Rules 2016 compliant. GeM vendor.",
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
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanitary Napkin Vending Machine for Hospitals | Lyra Enterprises India",
    description:
      "CPCB-compliant vending machines and incinerators for hospitals, clinics and healthcare facilities. Biomedical Waste Rules 2016 compliant. GeM procurement available.",
    images: [`${SITE.url}/images/og-image.jpg`],
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
        text: "For most hospitals, the Lyra Maxi is recommended — it handles 25–50 napkins per cycle, includes remote temperature logging for compliance monitoring, and meets Biomedical Waste Management Rules 2016. Medium clinics and day-care hospitals can use the Lyra Mini.",
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
    slug: "solo-coin-vending-machine",
    tag: "Small Clinics",
    desc: "Coin-operated vending machine for clinics, nursing homes and small hospitals. Easy to use, durable SS body.",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    name: "Solo WiFi (UPI)",
    slug: "solo-wifi-vending-machine",
    tag: "Smart Hospitals",
    desc: "UPI QR payment integration — no coins, remote monitoring, usage analytics. Perfect for large private hospitals.",
    badge: "bg-primary-100 text-primary-700",
  },
  {
    name: "Lyra Mini Incinerator",
    slug: "lyra-mini-incinerator",
    tag: "Mid-Size Hospitals",
    desc: "5–15 napkins per cycle. SWM Rules 2016 compliant. Ideal for community health centres and nursing homes.",
    badge: "bg-teal-100 text-teal-700",
  },
  {
    name: "Lyra Maxi Incinerator",
    slug: "lyra-maxi-incinerator",
    tag: "Large Hospitals",
    desc: "25–50 napkins per cycle, remote temperature logging, Biomedical Waste Rules compliant. For large hospitals and medical colleges.",
    badge: "bg-blue-100 text-blue-700",
  },
];

export default function HospitalsSolutionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SolutionPage
        crumb="Hospitals & Clinics"
        tags={["Hospitals & Clinics", "Biomedical Compliant", "GeM Vendor"]}
        title={<>Sanitary Napkin Machines <span className="text-gradient">for Hospitals &amp; Clinics</span></>}
        lead={
          <p>
            Hospitals and healthcare facilities need both napkin vending machines for patient and staff access, and CPCB-compliant incinerators for biomedical waste disposal. Lyra Enterprises supplies both — with Biomedical Waste Rules 2016 compliance, GeM procurement support and pan-India installation.
          </p>
        }
        callLabel="Call for Hospital Quote"
        points={["GeM Registered", "Biomedical Waste Rules 2016", "CPCB Compliant", "ISO 9001:2015", "Pan-India Delivery"]}
        featuresTitle="Why Lyra for Healthcare?"
        featuresLead="Certified, compliant equipment trusted by hospitals across India."
        features={features}
        productsTitle={<>Recommended for Hospitals &amp; Clinics</>}
        productsLead="From small clinics to large government hospitals — machines for every scale."
        products={products}
        faqs={faqSchema.mainEntity}
        ctaTitle="Equip your hospital today"
        ctaBody="Get a quote tailored for your facility — including GeM procurement, compliance documentation and installation support."
      />
    </>
  );
}
