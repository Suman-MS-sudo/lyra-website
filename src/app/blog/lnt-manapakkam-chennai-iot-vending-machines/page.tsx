import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

const SLUG = "lnt-manapakkam-chennai-iot-vending-machines";

export const metadata: Metadata = {
  title: { absolute: "25 IoT Vending Machines at L&T Manapakkam, Chennai — Case Study" },
  description:
    "How Lyra Enterprises equipped Larsen & Toubro's Manapakkam, Chennai campus with 25 IoT-enabled sanitary napkin vending machines, backed by regular support visits.",
  keywords: [
    "iot vending machine case study india",
    "l&t sanitary napkin vending machine",
    "corporate vending machine installation chennai",
  ],
  alternates: { canonical: `${SITE.url}/blog/${SLUG}` },
  openGraph: {
    title: "25 IoT Vending Machines at L&T Manapakkam, Chennai — Case Study",
    description:
      "25 IoT-enabled sanitary napkin vending machines installed and supported by Lyra Enterprises at Larsen & Toubro's Manapakkam campus.",
    url: `${SITE.url}/blog/${SLUG}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "25 IoT Vending Machines at L&T Manapakkam, Chennai — Case Study",
    description:
      "25 IoT-enabled sanitary napkin vending machines installed and supported by Lyra Enterprises at Larsen & Toubro's Manapakkam campus.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "25 IoT Vending Machines at L&T Manapakkam, Chennai — Case Study",
  description:
    "Lyra Enterprises installed 25 IoT-enabled sanitary napkin vending machines across Larsen & Toubro's Manapakkam campus in Chennai, with regular on-site support.",
  author: { "@type": "Organization", name: "Lyra Enterprises" },
  publisher: {
    "@type": "Organization",
    name: "Lyra Enterprises",
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.url}/images/logo.png`, width: 442, height: 454 },
  },
  datePublished: "2026-09-15",
  dateModified: "2026-09-15",
  image: [`${SITE.url}/images/og-image.jpg`],
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${SLUG}` },
  url: `${SITE.url}/blog/${SLUG}`,
};

export default function LnTCaseStudy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-12 pb-20">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "L&T Manapakkam Case Study" },
          ]} />

          <div className="mt-6">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest">Case Study</span>
            <span className="ml-3 text-sm text-gray-500">15 September 2026 · 3 min read</span>
          </div>

          <h1 className="mt-5 font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
            25 IoT Vending Machines at L&amp;T Manapakkam, Chennai
          </h1>

          <p className="mt-4 text-xl text-gray-600 leading-relaxed border-l-4 border-primary-300 pl-5">
            Lyra Enterprises equipped Larsen &amp; Toubro&apos;s Manapakkam campus in Chennai with 25 IoT-enabled sanitary napkin vending machines — not a one-off installation, but an ongoing, supported deployment.
          </p>

          <div className="mt-10 prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-gray-900">The deployment</h2>
            <p>
              Larsen &amp; Toubro&apos;s Manapakkam facility in Chennai needed sanitary napkin
              vending across multiple restrooms at corporate scale. Lyra Enterprises supplied
              and installed <strong>25 IoT-enabled vending machines</strong> across the campus,
              each connected for remote stock and status monitoring.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">How it runs today</h2>
            <p>
              All 25 machines are operating normally. Lyra Enterprises conducts{" "}
              <strong>regular on-site visits</strong> to the Manapakkam campus for
              restocking, servicing and IoT connectivity checks, backed by our support team.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Why IoT vending for a corporate campus</h2>
            <p>
              IoT-enabled machines report stock levels remotely, so facilities teams don&apos;t
              have to physically check every restroom to know when a machine needs refilling.
              For a multi-building campus like Manapakkam, that turns maintenance into a
              scheduled visit rather than a reactive one.
            </p>

            <p>
              Talk to us about an IoT vending deployment for your campus — call{" "}
              <Link href="tel:+918122378860" className="text-primary-600 font-semibold hover:underline">{SITE.phoneDisplay}</Link>{" "}
              or <Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">WhatsApp us</Link>.
            </p>
          </div>

          {/* Related links */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm font-bold text-gray-900 mb-4">Related</p>
            <div className="space-y-3">
              <Link href="/products/solo-wifi-vending-machine" className="block text-sm text-primary-600 hover:underline">Solo WiFi — IoT Vending Machine with Cloud Reports →</Link>
              <Link href="/solutions/offices" className="block text-sm text-primary-600 hover:underline">Vending Machine Solutions for Offices →</Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border border-primary-100 p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-2">Deploying across a corporate campus?</h3>
            <p className="text-sm text-gray-600 mb-4">IoT vending, remote monitoring, ongoing on-site support.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/products/solo-wifi-vending-machine" className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-blue-500 text-white font-bold rounded-full text-sm">View IoT Model</Link>
              <Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-green-500 text-white font-bold rounded-full text-sm">WhatsApp Us</Link>
            </div>
          </div>
        </article>
      </main>
      <PageFooter />
    </>
  );
}
