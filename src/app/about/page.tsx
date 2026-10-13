import type { Metadata } from "next";
import Link from "next/link";
import StaticInfoPage from "@/components/StaticInfoPage";
import OurLocations from "@/components/OurLocations";
import { SITE } from "@/lib/data";

const PAGE_URL = `${SITE.url}/about`;
const PAGE_TITLE = "About Lyra Enterprises | Napkin Vending Machine Maker";
const PAGE_DESCRIPTION =
  "Lyra Enterprises is a Chennai manufacturer of sanitary napkin vending machines and incinerators, founded in 2018, with 200+ installations across India.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "en-IN",
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: { "@id": `${SITE.url}/#organization` },
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: "Lyra Enterprises",
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    foundingDate: "2018",
    foundingLocation: { "@type": "Place", name: "Chennai, Tamil Nadu, India" },
    numberOfEmployees: { "@type": "QuantitativeValue", value: 20 },
    address: {
      "@type": "PostalAddress",
      streetAddress: "10/21, Vasuki Street, Cholapuram, Ambattur",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600053",
      addressCountry: "IN",
    },
    telephone: "+91-8122378860",
    email: "sales@lyraenterprise.co.in",
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ISO 9001:2015 Quality Management" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ISO 14001:2015 Environmental Management" },
    ],
    sameAs: [
      SITE.social.linkedin,
      SITE.social.indiamart,
      "https://www.facebook.com/profile.php?id=61578649496806",
      "https://www.instagram.com/lyraenterprises_/",
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "About Us", item: PAGE_URL },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StaticInfoPage
        title="About Lyra Enterprises"
        description="Lyra Enterprises designs and manufactures sanitary napkin vending machines and sanitary napkin incinerators in Chennai, Tamil Nadu, and supplies them to schools, colleges, hospitals, offices and government programmes across India."
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      >
        <h2>Company at a glance</h2>
        <ul>
          <li><strong>Founded:</strong> 2018, Chennai, Tamil Nadu</li>
          <li><strong>What we make:</strong> 8 sanitary napkin vending machine models and 3 sanitary napkin incinerator models</li>
          <li><strong>Installations:</strong> 200+ machines in schools, colleges, hospitals, offices and public institutions</li>
          <li><strong>Team:</strong> around 20 people across design, manufacturing, installation and support</li>
          <li><strong>Head office:</strong> Ambattur, Chennai &middot; <strong>North India office:</strong> Hooghly, West Bengal &middot; <strong>Factory:</strong> Somangalam, Chennai</li>
          <li><strong>Certifications:</strong> ISO 9001:2015, ISO 14001:2015, CE; CPCB and Solid Waste Management Rules 2016 compliant</li>
          <li><strong>Government procurement:</strong> registered vendor on the Government e-Marketplace (GeM)</li>
        </ul>

        <h2>What Lyra Enterprises does</h2>
        <p>
          Lyra Enterprises is an Indian manufacturer of menstrual hygiene infrastructure. We build two kinds of
          equipment: <Link href="/products/sanitary-napkin-vending-machines">sanitary napkin vending machines</Link>,
          which let women buy or collect a pad privately inside a washroom, and{" "}
          <Link href="/products/sanitary-napkin-incinerators">sanitary napkin incinerators</Link>, which burn used
          pads on site instead of sending them to a bin or drain.
        </p>
        <p>
          The vending range runs from a simple push-button model for free-issue schemes to coin, multi-coin, RFID-card,
          UPI QR, touchless wave-sensor, WiFi and Ethernet machines with a cloud dashboard. Prices start at
          ₹12,000 (ex-GST, ex-works Chennai); the full list is on our{" "}
          <Link href="/sanitary-napkin-vending-machine-price-india">price page</Link>, and the{" "}
          <Link href="/compare-sanitary-napkin-vending-machines">comparison table</Link> shows which model suits which
          facility.
        </p>

        <h2>Who we work with</h2>
        <p>
          Our machines are installed at manufacturing companies such as Larsen &amp; Toubro, TVS Motor, Saint-Gobain,
          Parker Hannifin and Ashok Leyland; at research organisations including ISRO; and at educational institutions
          including Vels University, Stella Maris College, DG Vaishnav College and Mar Baselios College. Read how one
          installation works in practice in our <Link href="/blog/lnt-manapakkam-case-study">L&amp;T Manapakkam case study</Link>.
        </p>
        <p>
          We serve every Indian state and union territory. See{" "}
          <Link href="/service-areas">service areas</Link> for dispatch and installation details by state, or the{" "}
          <Link href="/solutions">solutions by sector</Link> for schools, hospitals, offices and hostels.
        </p>

        <h2>How we build and support machines</h2>
        <ul>
          <li><strong>Made in Chennai:</strong> machines are manufactured at our Somangalam facility, which lets us control quality and dispatch quickly.</li>
          <li><strong>1-year warranty:</strong> every machine carries a manufacturer warranty against defects, with a 10-day return window for damaged or defective units. See the <Link href="/cancellation-refund-policy">warranty policy</Link>.</li>
          <li><strong>Installation and training:</strong> we help with siting, mounting and staff training, and troubleshoot remotely first when an issue is reported.</li>
          <li><strong>Compliance:</strong> our incinerators are designed for CPCB norms and the Solid Waste Management Rules 2016. Our <Link href="/blog/solid-waste-management-rules-2016-india-guide">SWM Rules 2016 guide</Link> explains what institutions must do.</li>
          <li><strong>Public funding:</strong> many buyers fund machines through CSR or government schemes. Our <Link href="/government-schemes-menstrual-hygiene">government schemes guide</Link> and <Link href="/blog/gem-tender-sanitary-napkin-vending-machine-guide">GeM tender guide</Link> cover the process.</li>
        </ul>

        <h2>Our mission</h2>
        <p>
          We want sanitary hygiene infrastructure to be normal in every school, office, hospital and public space in
          India, so no girl misses class and no woman leaves work early because a pad or a safe disposal option was not
          available.
        </p>

        <h2>Our locations</h2>
        <OurLocations />
        <p className="text-sm text-gray-500 mt-4">
          Office hours: Monday to Saturday, 9:30 AM to 6:30 PM IST. For quotes and orders, visit the{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </StaticInfoPage>
    </>
  );
}
