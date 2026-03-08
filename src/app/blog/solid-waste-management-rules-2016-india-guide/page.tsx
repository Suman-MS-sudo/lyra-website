import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Solid Waste Management Rules 2016 — Menstrual Waste Compliance Guide India | Lyra",
  description:
    "India's SWM Rules 2016 legally mandate separate collection and disposal of sanitary waste. What schools, hospitals, offices and institutions must do — and what equipment is required for CPCB compliance.",
  keywords: [
    "solid waste management rules 2016 india",
    "swm rules menstrual waste india",
    "cpcb menstrual waste disposal india",
    "swachh bharat menstrual hygiene india",
    "sanitary waste disposal rules india",
    "institutional menstrual waste compliance india",
    "napkin incinerator swm rules 2016",
    "biomedical waste rules menstrual hygiene",
    "menstrual hygiene policy india schools",
  ],
  alternates: { canonical: `${SITE.url}/blog/solid-waste-management-rules-2016-india-guide` },
  openGraph: {
    title: "Solid Waste Management Rules 2016 — Menstrual Waste Compliance Guide India",
    description: "India's SWM Rules 2016 legally mandate segregated menstrual waste disposal. Non-compliance risks fines. Here's what your institution must do.",
    url: `${SITE.url}/blog/solid-waste-management-rules-2016-india-guide`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Solid Waste Management Rules 2016 — What Every Institution Must Know About Menstrual Waste",
  description:
    "India's SWM Rules 2016 require institutions to segregate, collect and properly dispose of sanitary waste. This guide explains what is required, what equipment is necessary, and how to achieve CPCB compliance.",
  author: { "@type": "Organization", name: "Lyra Enterprises" },
  publisher: { "@type": "Organization", name: "Lyra Enterprises", url: SITE.url },
  datePublished: "2026-03-01",
  url: `${SITE.url}/blog/solid-waste-management-rules-2016-india-guide`,
};

export default function SWMRulesBlog() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-12 pb-20">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "SWM Rules 2016 Guide" },
          ]} />

          <div className="mt-6">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">Compliance</span>
            <span className="ml-3 text-sm text-gray-400">1 March 2026 · 7 min read</span>
          </div>

          <h1 className="mt-5 font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
            Solid Waste Management Rules 2016 — What Every Institution Must Know
          </h1>

          <p className="mt-4 text-xl text-gray-600 leading-relaxed border-l-4 border-green-300 pl-5">
            India&apos;s SWM Rules 2016 legally mandate segregated menstrual waste disposal. Non-compliance risks fines and failed government inspections. Here&apos;s what your institution must do.
          </p>

          <div className="mt-10 prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-gray-900">What are the Solid Waste Management Rules 2016?</h2>
            <p>
              The <strong>Solid Waste Management (SWM) Rules 2016</strong> were notified by India&apos;s Ministry of Environment, Forest and Climate Change (MoEFCC) under the Environment Protection Act, 1986. They replaced the older Municipal Solid Waste (Management and Handling) Rules 2000 and introduced far more comprehensive, mandatory provisions — including, for the first time, <strong>specific mention of sanitary waste and menstrual hygiene products</strong>.
            </p>
            <p>
              Under the SWM Rules 2016, sanitary waste (including used sanitary napkins, tampons and diapers) is classified as a <strong>dry waste</strong> category that requires <strong>separate collection and disposal</strong>. Institutions cannot simply throw napkins into mixed waste bins or general trash — they must have a dedicated disposal mechanism.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">What does Rule 15 say about menstrual waste?</h2>
            <p>
              Rule 15 of the SWM Rules 2016 specifically addresses responsibilities of manufacturers and product users for <strong>sanitary waste</strong>. Sanitary product manufacturers must <strong>educate consumers on proper disposal</strong>. Consumers and institutions must <strong>wrap used products and place them in dry waste bins</strong> — not in wet or mixed waste.
            </p>
            <p>
              Additionally, under the Swachh Bharat Mission guidelines and CPCB (Central Pollution Control Board) implementation advisories, institutions such as <strong>schools, colleges, hospitals, hostels and offices</strong> are expected to have:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Dedicated sanitary waste collection bins in all women&apos;s toilets</li>
              <li>A compliant sanitary waste disposal mechanism — such as a <strong>CPCB-approved napkin incinerator</strong></li>
              <li>Staff awareness and waste segregation protocols</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900">Do schools need a sanitary napkin incinerator?</h2>
            <p>
              Yes. Under SWM Rules 2016 and CPCB advisory guidelines for schools, <strong>educational institutions are expected to have a safe, hygienic sanitary waste disposal mechanism</strong>. In practice, the most compliant and practical solution for school toilets is a <strong>wall-mounted napkin incinerator</strong> — which completely eliminates used napkins through high-temperature incineration, leaving only a small quantity of sterile ash.
            </p>
            <p>
              Bio-bins (the plastic bins some schools use) do not meet the spirit of SWM Rules 2016 because they require manual emptying by staff, creating infection risk and exposure to biological waste. An incinerator eliminates this entirely.
            </p>
            <p>
              Government school inspections under Swachh Vidyalaya Puraskar and state-level Swachh Bharat inspections now specifically check for <strong>both a napkin dispensing mechanism (vending machine) and a disposal mechanism (incinerator)</strong> in girls&apos; toilets.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Biomedical Waste Management Rules 2016 — for hospitals</h2>
            <p>
              Hospitals have additional obligations under the <strong>Biomedical Waste Management Rules 2016</strong>. Used sanitary napkins from hospital wards and patient areas may be classified as biomedical waste depending on contamination. The Lyra Maxi incinerator is specifically designed for hospital environments with:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>25–50 napkin per cycle capacity for high-volume disposal</li>
              <li>Remote temperature logging for compliance audit records</li>
              <li>Biomedical Waste Rules 2016 compliant construction</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">What is the Menstrual Hygiene Scheme (MHS)?</h2>
            <p>
              The <strong>Menstrual Hygiene Scheme (MHS)</strong> is a Government of India programme under the National Health Mission (NHM) that subsidises sanitary napkins for adolescent girls in rural areas and promotes menstrual hygiene awareness in schools. Under MHS, government schools are encouraged to install napkin dispensers in girls&apos; toilets to improve access.
            </p>
            <p>
              Schools participating in MHS or Swachh Bharat Abhiyan activities can procure vending machines and incinerators through the <strong>GeM (Government e-Marketplace) portal</strong> — Lyra Enterprises is a registered GeM vendor and supplies directly to government institutions without a separate tender process.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Practical compliance checklist for institutions</h2>
          </div>

          {/* Checklist */}
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
            <p className="font-bold text-gray-900 mb-4">SWM Rules 2016 Compliance Checklist</p>
            <ul className="space-y-3">
              {[
                "Dedicate dry waste bins for sanitary products in all women's toilets",
                "Install a CPCB-compliant sanitary napkin incinerator (Lyra Micro / Mini / Maxi)",
                "Install a napkin dispensing mechanism (vending machine) for access",
                "Train housekeeping staff on sanitary waste segregation",
                "Maintain an incinerator usage log for compliance audits",
                "For hospitals: ensure Biomedical Waste Management Records are maintained",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-200 text-green-700 text-xs font-bold flex items-center justify-center">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-gray-900">Recommended equipment for SWM compliance</h2>
            <p>
              Lyra Enterprises manufactures the most complete range of SWM Rules 2016 and CPCB-compliant menstrual hygiene equipment in India:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Napkin vending machines:</strong> From ₹5,000 (Solo Manual) to ₹24,500 (Solo Ethernet) — providing access to sanitary napkins on demand</li>
              <li><strong><Link href="/products/lyra-micro-incinerator" className="text-primary-600 hover:underline">Lyra Micro Incinerator (₹13,500)</Link>:</strong> For small schools, clinics and offices (1–5 napkins/cycle)</li>
              <li><strong><Link href="/products/lyra-mini-incinerator" className="text-primary-600 hover:underline">Lyra Mini Incinerator (₹18,500)</Link>:</strong> For colleges, offices and hospitals (5–15 napkins/cycle)</li>
              <li><strong><Link href="/products/lyra-maxi-incinerator" className="text-primary-600 hover:underline">Lyra Maxi Incinerator (₹39,500)</Link>:</strong> For large hospitals and institutions (25–50 napkins/cycle, Biomedical Waste compliant)</li>
            </ul>
            <p>
              Consider the <Link href="/products/vending-incinerator-bundle" className="text-primary-600 hover:underline">Vending Machine + Incinerator Bundle</Link> for the most cost-effective path to full compliance — available with bundled pricing.
            </p>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 border border-green-100">
            <p className="font-bold text-gray-900 text-lg mb-2">Need help achieving SWM Rules 2016 compliance?</p>
            <p className="text-gray-600 text-sm mb-5">Our team advises institutions across India on the right equipment, installation, and compliance documentation.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products/vending-incinerator-bundle" className="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-full text-sm hover:bg-green-700 transition-colors">
                View Compliance Bundle
              </Link>
              <Link href="tel:+918122378860" className="px-5 py-2.5 border border-green-300 text-green-700 font-semibold rounded-full text-sm hover:bg-green-50 transition-colors">
                Call +91-81223 78860
              </Link>
            </div>
          </div>
        </article>
      </main>
      <PageFooter />
    </>
  );
}
