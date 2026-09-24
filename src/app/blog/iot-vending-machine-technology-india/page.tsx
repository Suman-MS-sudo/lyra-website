import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Inside Lyra's IoT Vending Machine Technology — WiFi, Ethernet & RFID" },
  description:
    "How Lyra Solo WiFi, Ethernet and RFID napkin vending machines work: server-side payment checks, offline queuing, OTA rollback, encrypted cloud sync.",
  keywords: [
    "iot sanitary napkin vending machine india",
    "smart napkin vending machine technology india",
    "server verified payment vending machine india",
    "offline sync vending machine india",
    "cloud dashboard napkin vending machine india",
  ],
  alternates: { canonical: `${SITE.url}/blog/iot-vending-machine-technology-india` },
  openGraph: {
    title: "Inside Lyra's IoT Vending Machine Technology — WiFi, Ethernet & RFID",
    description: "The engineering behind India's most advanced sanitary napkin vending machines — explained model by model.",
    url: `${SITE.url}/blog/iot-vending-machine-technology-india`,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inside Lyra's IoT Vending Machine Technology — WiFi, Ethernet & RFID",
    description: "The engineering behind India's most advanced sanitary napkin vending machines — explained model by model.",
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Inside Lyra's IoT Vending Machine Technology — WiFi, Ethernet & RFID",
  description: "A technical breakdown of how Lyra's IoT-enabled sanitary napkin vending machines handle payment verification, offline resilience and remote management.",
  author: { "@type": "Organization", name: "Lyra Enterprises" },
  publisher: {
    "@type": "Organization",
    name: "Lyra Enterprises",
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.url}/images/logo.png`, width: 442, height: 454 },
  },
  datePublished: "2026-09-23",
  dateModified: "2026-09-23",
  image: [`${SITE.url}/images/og-image.jpg`],
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/iot-vending-machine-technology-india` },
  url: `${SITE.url}/blog/iot-vending-machine-technology-india`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does server-side payment verification prevent fake payments on a vending machine?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On Lyra's Solo WiFi and Solo Ethernet machines, the machine never trusts a payment screenshot or a locally-displayed success message. It waits for the backend to independently confirm the transaction with the payment gateway before releasing a napkin, which blocks spoofed or replayed QR payment attempts that simpler machines are vulnerable to.",
      },
    },
    {
      "@type": "Question",
      name: "Do Lyra IoT vending machines lose sales data during an internet outage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Solo WiFi, Solo Ethernet and Solo RFID models continue operating and store transactions and usage logs locally during a connectivity outage. When the connection is restored, everything syncs automatically to the cloud dashboard — no lost sales, no lost stock count, no gap in the audit trail.",
      },
    },
    {
      "@type": "Question",
      name: "How are firmware updates delivered to Lyra vending machines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Firmware updates are pushed remotely over the air (OTA) to every IoT-enabled Lyra machine. If an update ever fails to apply correctly, the machine automatically rolls back to the previous working version, so a facility never loses vending capability waiting for a technician visit.",
      },
    },
  ],
};

export default function IoTTechnologyPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />
      <main className="pt-16 bg-white min-h-screen">
        <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-12 pb-20">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "IoT Vending Machine Technology" },
          ]} />

          <div className="mt-6">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest">Technology</span>
            <span className="ml-3 text-sm text-gray-500">23 September 2026 · 7 min read</span>
          </div>

          <h1 className="mt-5 font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
            Inside Lyra&apos;s IoT Vending Machine Technology — WiFi, Ethernet & RFID
          </h1>

          <p className="mt-4 text-xl text-gray-600 leading-relaxed border-l-4 border-primary-300 pl-5">
            Most vending machines just dispense. Ours verify, log, recover and report — even when the network doesn&apos;t cooperate.
          </p>

          <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-gray-900">Why the engineering matters</h2>
            <p>
              A sanitary napkin vending machine in a washroom is unattended for most of its life. It has to handle real-world conditions across India — patchy WiFi, IT-restricted networks in hospitals and government buildings, fraudulent payment attempts, and staff who won&apos;t check on it daily. Lyra&apos;s <Link href="/products/solo-wifi-vending-machine" className="text-primary-600 hover:underline">Solo WiFi</Link>, <Link href="/products/solo-ethernet-vending-machine" className="text-primary-600 hover:underline">Solo Ethernet</Link> and <Link href="/products/solo-rfid-vending-machine" className="text-primary-600 hover:underline">Solo RFID</Link> machines are built around that reality, not around a demo-day happy path.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">1. Payment is verified, never assumed</h2>
            <p>
              On the WiFi and Ethernet models, every UPI QR or coin transaction is confirmed server-side before the machine dispenses a napkin. Dispense is instant once payment clears — there&apos;s no manual approval step slowing down the user — but the machine never releases stock on the strength of a fake payment screen or a spoofed callback. This single design choice closes off the most common fraud vector on cheaper, unverified vending hardware sold in India.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">2. The network can fail without the machine failing</h2>
            <p>
              Connectivity in the field is never 100% reliable — WiFi routers reboot, ISPs have outages, LAN switches get reconfigured. Lyra&apos;s IoT machines are built to keep working anyway:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Solo WiFi & Solo Ethernet:</strong> continue accepting and queuing transactions offline; queued sales sync automatically the moment the connection returns.</li>
              <li><strong>Solo RFID:</strong> tap-and-dispense keeps working with logs stored locally first, then synced to the cloud dashboard on reconnect — so the per-card audit trail is never broken.</li>
              <li><strong>Real-time push with fallback:</strong> payment confirmation is pushed to the machine instantly rather than polled for, with an automatic fallback check so a payment is never missed even if that instant push fails.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">3. Remote management that actually reduces site visits</h2>
            <p>
              Every IoT model reports into a single live cloud dashboard — stock levels, sales, and machine status from any browser. Facility teams get automatic low-stock alerts instead of discovering an empty machine from a user complaint, plus usage analytics for planning refills and budgeting. If firmware needs updating, it happens over the air with automatic rollback if anything goes wrong — no technician visit required to fix a bad update. If the machine itself hangs, it self-resets automatically.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">4. Security isn&apos;t an afterthought</h2>
            <p>
              All communication between the machine and the cloud — whether over 2.4GHz WiFi or wired Ethernet — is encrypted. For institutions with strict IT policies (hospitals, government buildings, defence and PSU facilities), the Solo Ethernet delivers the exact same verified, encrypted, offline-resilient behaviour as the WiFi model, just over a LAN cable that plugs straight into existing network infrastructure with no router or SIM dependency.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Which model fits your network</h2>
            <p>
              <strong>Open WiFi available, standard offices/campuses:</strong> <Link href="/products/solo-wifi-vending-machine" className="text-primary-600 font-semibold hover:underline">Solo WiFi</Link> — no SIM, 2.4GHz connection, touch display.
            </p>
            <p>
              <strong>Restricted wireless policy, hospitals, government buildings:</strong> <Link href="/products/solo-ethernet-vending-machine" className="text-primary-600 font-semibold hover:underline">Solo Ethernet</Link> — same IoT stack over wired LAN.
            </p>
            <p>
              <strong>Access-controlled campuses with existing ID cards:</strong> <Link href="/products/solo-rfid-vending-machine" className="text-primary-600 font-semibold hover:underline">Solo RFID</Link> — ISO 14443/15693 compatible, per-card audit trail.
            </p>
            <p>
              Have a specific IT policy or network constraint? Call <Link href="tel:+918122378860" className="text-primary-600 font-semibold hover:underline">{SITE.phoneDisplay}</Link> and we&apos;ll confirm the right fit before you order.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm font-bold text-gray-900 mb-4">Related Articles</p>
            <div className="space-y-3">
              <Link href="/blog/best-sanitary-napkin-vending-machine-india" className="block text-sm text-primary-600 hover:underline">Best Sanitary Napkin Vending Machine in India (2026) — Full Comparison →</Link>
              <Link href="/blog/upi-vs-coin-vending-machine" className="block text-sm text-primary-600 hover:underline">UPI QR vs Coin Vending Machine — Which One Should You Buy? →</Link>
              <Link href="/blog/lnt-manapakkam-case-study" className="block text-sm text-primary-600 hover:underline">25 IoT Vending Machines at L&amp;T Manapakkam, Chennai — Case Study →</Link>
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border border-primary-100 p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-2">See the IoT machines in detail</h3>
            <p className="text-sm text-gray-600 mb-4">Full specs, FAQs and pricing for Solo WiFi, Ethernet and RFID.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/products/solo-wifi-vending-machine" className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-blue-500 text-white font-bold rounded-full text-sm">View Solo WiFi</Link>
              <Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-green-500 text-white font-bold rounded-full text-sm">Ask Our Team</Link>
            </div>
          </div>
        </article>
      </main>
      <PageFooter />
    </>
  );
}
