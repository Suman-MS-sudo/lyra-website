import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Why Every School in India Needs a Napkin Vending Machine" },
  description:
    "Menstrual hygiene in schools directly impacts girls' attendance and learning outcomes. Discover why sanitary napkin vending machines are the most effective solution for Indian schools.",
  keywords: [
    "napkin vending machine for schools india",
    "menstrual hygiene school india",
    "girl student absenteeism india",
    "sanitary napkin machine school toilet",
    "period hygiene school india",
  ],
  alternates: { canonical: `${SITE.url}/blog/why-every-school-needs-napkin-vending-machine` },
  openGraph: {
    title: "Why Every School in India Needs a Sanitary Napkin Vending Machine",
    description: "Menstruation-related absenteeism is a major barrier to girls' education in India. Vending machines solve this directly. See how.",
    url: `${SITE.url}/blog/why-every-school-needs-napkin-vending-machine`,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Every School in India Needs a Sanitary Napkin Vending Machine",
    description: "Menstruation-related absenteeism is a major barrier to girls' education in India. Vending machines solve this directly. See how.",
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Every School in India Needs a Sanitary Napkin Vending Machine",
  description: "Menstrual hygiene in schools directly impacts girls' attendance and learning outcomes.",
  author: { "@type": "Organization", name: "Lyra Enterprises" },
  publisher: {
    "@type": "Organization",
    name: "Lyra Enterprises",
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.url}/images/logo.png`, width: 442, height: 454 },
  },
  datePublished: "2026-01-15",
  dateModified: "2026-01-15",
  image: [`${SITE.url}/images/og-image.jpg`],
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/why-every-school-needs-napkin-vending-machine` },
  url: `${SITE.url}/blog/why-every-school-needs-napkin-vending-machine`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
    { "@type": "ListItem", position: 3, name: "Schools & Vending Machines", item: `${SITE.url}/blog/why-every-school-needs-napkin-vending-machine` },
  ],
};

export default function BlogPost1() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-12 pb-20">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Schools & Vending Machines" },
          ]} />

          <div className="mt-6">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest">Education</span>
            <span className="ml-3 text-sm text-gray-500">15 January 2026 · 5 min read</span>
          </div>

          <h1 className="mt-5 font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
            Why Every School in India Needs a Sanitary Napkin Vending Machine
          </h1>

          <p className="mt-4 text-xl text-gray-600 leading-relaxed border-l-4 border-primary-300 pl-5">
            Menstruation-related absenteeism keeps many Indian girls out of school every month. A vending machine in the school toilet can change that permanently.
          </p>

          <div className="mt-10 prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-gray-900">The real cost of inadequate menstrual hygiene in schools</h2>
            <p>
              Multiple studies and government surveys point to menstruation-related absenteeism as a significant factor behind school dropout among adolescent girls in India. The primary reason is not the biology — it is the lack of access to sanitary products at school. Girls who cannot manage their periods discreetly and hygienically in school toilets are left with one option: stay home.
            </p>
            <p>
              The economic cost of this is enormous. Each girl who drops out loses years of education and earning potential. Schools that install sanitary napkin vending machines consistently report improved attendance rates among girl students — particularly significant in government schools, rural schools, tribal residential schools and hostels.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Why a vending machine — not just a store or nurse&apos;s office?</h2>
            <p>
              Many schools keep napkins at the canteen or nurse&apos;s office. But this model fails for a simple reason: embarrassment. Adolescent girls will not ask a male peon, a male teacher or even other students for a sanitary napkin in public. The result is that even where napkins are available in school, girls don&apos;t access them.
            </p>
            <p>
              A vending machine installed inside a girls&apos; toilet provides <strong>private, on-demand, 24×7 access</strong> — removing the social barrier completely. No asking, no eye contact, no embarrassment.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Which vending machine model works best for schools?</h2>
            <p>
              For most schools, two Lyra Enterprises models work best:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Lyra Push Button</strong> — For government schools and budget-constrained institutions where napkins are supplied free to students. No payment required — staff simply stock the machine regularly.
              </li>
              <li>
                <strong>Lyra Solo Coin</strong> — For private schools where students pay a small coin fee per napkin. Revenue from the machine covers the cost of napkins, making the program self-sustaining.
              </li>
            </ul>
            <p>
              Both models are wall-mountable, compact (700×160×160 mm) and fit standard school toilet dimensions. The transparent view panel makes restocking simple for maintenance staff.
            </p>

            <div className="not-prose grid grid-cols-2 gap-4 max-w-sm">
              <Link href="/products/push-button-vending-machine" className="group text-center">
                <div className="relative aspect-square rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                  <Image src="/images/products/push-button-vm.png" alt="Lyra Push Button Vending Machine" fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" sizes="180px" />
                </div>
                <p className="mt-1.5 text-xs font-semibold text-gray-600 group-hover:text-primary-600 transition-colors">Push Button</p>
              </Link>
              <Link href="/products/solo-coin-vending-machine" className="group text-center">
                <div className="relative aspect-square rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                  <Image src="/images/products/solo-coin.png" alt="Lyra Solo Coin Vending Machine" fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" sizes="180px" />
                </div>
                <p className="mt-1.5 text-xs font-semibold text-gray-600 group-hover:text-primary-600 transition-colors">Solo Coin</p>
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Government mandate and CBSE guidelines</h2>
            <p>
              The Menstrual Hygiene Management (MHM) guidelines issued by the Ministry of Drinking Water and Sanitation, Government of India, recommend the provision of sanitary napkins in school toilets as a standard hygiene infrastructure requirement. Several state governments — including Tamil Nadu, Kerala, Karnataka and Maharashtra — have made it mandatory for schools to provide menstrual hygiene facilities in girls&apos; washrooms.
            </p>
            <p>
              Installing a vending machine is both a compliance measure and a meaningful welfare step for institutions that care about their girl students.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">How to install one at your school</h2>
            <p>
              Lyra Enterprises supplies and delivers pan-India. Installation requires a standard power outlet and a flat wall surface. The entire process — from order to installed machine — takes less than a week for most locations.
            </p>
            <p>
              Call us at <Link href="tel:+918122378860" className="text-primary-600 font-semibold hover:underline">{SITE.phoneDisplay}</Link> or <Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">WhatsApp us</Link> to get a quote for your school.
            </p>
          </div>

          {/* Related links */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm font-bold text-gray-900 mb-4">Related Articles</p>
            <div className="space-y-3">
              <Link href="/blog/upi-vs-coin-vending-machine" className="block text-sm text-primary-600 hover:underline">UPI QR vs Coin Vending Machine — Which Should You Buy? →</Link>
              <Link href="/blog/napkin-incinerator-vs-sanitary-bin" className="block text-sm text-primary-600 hover:underline">Napkin Incinerator vs Bio Bin — What&apos;s Better for India? →</Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border border-primary-100 p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-2">Install a vending machine at your school</h3>
            <p className="text-sm text-gray-600 mb-4">Pan-India delivery. 1-year warranty.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/products/push-button-vending-machine" className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-blue-500 text-white font-bold rounded-full text-sm">View School Models</Link>
              <Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-green-500 text-white font-bold rounded-full text-sm">WhatsApp Us</Link>
            </div>
          </div>
        </article>
      </main>
      <PageFooter />
    </>
  );
}
