/**
 * JSON-LD Structured Data for Lyra Enterprises
 * Covers: Organization, LocalBusiness, ItemList (Products), FAQPage (from lib/home-faqs), WebSite.
 * Per-page BreadcrumbList schema lives on the individual route files.
 * These schemas help Google understand the site and improve rich results ranking.
 */

import { cities } from "@/lib/data";
import { offerPolicies } from "@/lib/offer-schema";
import { homeFaqs } from "@/lib/home-faqs";
import { RENTAL_ANSWER, RENTAL_PATH, RENTAL_PLANS } from "@/lib/rental";

const SITE_URL = "https://lyraenterprise.co.in";

/** Every Indian state & UT Lyra serves — keeps Organization areaServed in sync with the location pages. */
const areaServedIndia = [
  { "@type": "Country", name: "India" },
  ...cities.map((c) => ({ "@type": c.kind === "union territory" ? "AdministrativeArea" : "State", name: c.state })),
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Lyra Enterprises",
  alternateName: ["Lyra Vending", "Lyra Enterprises Chennai"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo.png`,
    width: 442,
    height: 454,
  },
  image: `${SITE_URL}/images/og-image.jpg`,
  description:
    "India's #1 manufacturer of sanitary napkin vending machines and incinerators. Coin operated, UPI/QR, WiFi and IoT-enabled models for schools, hospitals, offices and colleges, sold outright or rented as an all-inclusive bundle from ₹999/month (installation, servicing, repairs, monitoring and napkin supply by Lyra; the customer only refills). Based in Chennai, Tamil Nadu.",
  // The all-inclusive rental, as offers the organisation makes (prices per machine per month, ex-GST).
  makesOffer: RENTAL_PLANS.map((p) => ({
    "@type": "Offer",
    name: `All-inclusive sanitary napkin vending machine rental, ${p.capacity}-napkin capacity`,
    url: `${SITE_URL}${RENTAL_PATH}`,
    businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.price,
      priceCurrency: "INR",
      valueAddedTaxIncluded: false,
      unitCode: "MON",
      unitText: "month",
    },
    itemOffered: {
      "@type": "Service",
      name: "All-inclusive sanitary napkin vending machine rental",
      description: RENTAL_ANSWER,
    },
  })),
  foundingDate: "2018",
  numberOfEmployees: { "@type": "QuantitativeValue", value: "20" },
  areaServed: areaServedIndia,
  address: {
    "@type": "PostalAddress",
    streetAddress: "10/21, Vasuki Street, Cholapuram, Ambattur",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600053",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.122041492078642,
    longitude: 80.14473080170454,
  },
  telephone: "+91-8122378860",
  email: "sales@lyraenterprise.co.in",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-8122378860",
      email: "sales@lyraenterprise.co.in",
      contactType: "sales",
      areaServed: "South India",
      availableLanguage: ["English", "Tamil", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-8122378860",
      contactType: "customer support",
      areaServed: "South India",
      availableLanguage: ["English", "Tamil", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-7010857506",
      email: "sales@lyraenterprise.co.in",
      contactType: "sales",
      areaServed: "North India",
      availableLanguage: ["English", "Hindi", "Bengali"],
    },
  ],
  /** Manufacturing facility — production only, not a public sales/support contact point. */
  location: {
    "@type": "Place",
    name: "Lyra Enterprises Manufacturing Facility",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 109, High Tech City, Pazhanallur, Somangalam",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600069",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.957928570733447,
      longitude: 80.0332898772614,
    },
    hasMap: "https://www.google.com/maps?q=12.957928570733447,80.0332898772614",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61578649496806",
    "https://www.instagram.com/lyraenterprises_/",
    "https://www.linkedin.com/company/lyra-enterprises/",
    "https://www.indiamart.com/lyraenterprises-chennai/",
    "https://www.justdial.com/Chennai/Lyra-Enterprises-Municipal-School-Ambattur/044PXX44-XX44-260521175245-A8M4_BZDET",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sanitary Napkin Vending Machines & Incinerators",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Sanitary Napkin Vending Machines" },
      { "@type": "OfferCatalog", name: "Sanitary Napkin Incinerators" },
      {
        "@type": "OfferCatalog",
        name: "Sanitary Napkin Vending Machine Rental",
        url: "https://lyraenterprise.co.in/sanitary-napkin-vending-machine-on-rent",
      },
    ],
  },
  // Business categories
  knowsAbout: [
    "Sanitary Napkin Vending Machines",
    "Sanitary Napkin Vending Machine Rental",
    "Menstrual Hygiene Solutions",
    "Sanitary Waste Incinerators",
    "IoT Vending Machines",
    "UPI Payment Vending Machines",
    "Women Health Products",
  ],
  slogan: "Empowering Women's Health Across India",
  openingHours: "Mo-Sa 09:30-18:30",
  paymentAccepted: ["Cash", "UPI", "Bank Transfer", "Cheque"],
  currenciesAccepted: "INR",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness-south`,
  name: "Lyra Enterprises — South India Office",
  image: `${SITE_URL}/images/og-image.jpg`,
  url: SITE_URL,
  telephone: "+91-8122378860",
  email: "sales@lyraenterprise.co.in",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10/21, Vasuki Street, Cholapuram, Ambattur",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600053",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.122041492078642,
    longitude: 80.14473080170454,
  },
  hasMap: "https://www.google.com/maps?q=13.122041492078642,80.14473080170454",
  openingHours: "Mo-Sa 09:30-18:30",
  areaServed: [
    { "@type": "State", name: "Tamil Nadu" },
    { "@type": "State", name: "Kerala" },
    { "@type": "State", name: "Karnataka" },
    { "@type": "State", name: "Andhra Pradesh" },
    { "@type": "State", name: "Telangana" },
  ],
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
};

/** North India branch — Hooghly, West Bengal. Handles North India operations & enquiries. */
const localBusinessNorthSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness-north`,
  name: "Lyra Enterprises — North India Office",
  image: `${SITE_URL}/images/og-image.jpg`,
  url: SITE_URL,
  telephone: "+91-7010857506",
  email: "sales@lyraenterprise.co.in",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 203, Jagannath Apartments, Sheoraphuli",
    addressLocality: "Hooghly",
    addressRegion: "West Bengal",
    postalCode: "712223",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.77103758410416,
    longitude: 88.322645,
  },
  hasMap: "https://www.google.com/maps?q=22.77103758410416,88.322645",
  openingHours: "Mo-Sa 09:30-18:30",
  areaServed: { "@type": "AdministrativeArea", name: "North India" },
  branchOf: { "@id": `${SITE_URL}/#organization` },
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
};

const vendingMachineProducts = [
  {
    name: "Push Button Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/PB",
    slug: "push-button-vending-machine",
    image: "push-button-vm.png",
    price: 12000,
    description:
      "Smart push-button sanitary napkin vending machine with offline usage analytics, anti-tampering lockout and 25-napkin capacity. On-demand WiFi hotspot reporting, zero subscription. Ideal for schools, hostels and small offices.",
    keywords: "push button vending machine, smart napkin vending machine, offline usage analytics vending machine, school vending machine",
  },
  {
    name: "Solo Coin Operated Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/SC",
    slug: "solo-coin-vending-machine",
    image: "solo-coin.png",
    price: 13500,
    description:
      "Coin operated sanitary napkin vending machine with ₹5 coin acceptor. 25-napkin capacity, electronic operation. Perfect for public toilets, malls and offices.",
    keywords: "coin vending machine india, coin operated napkin vending machine",
  },
  {
    name: "Solo Multi-Coin Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/SC-M",
    slug: "solo-multi-coin-vending-machine",
    image: "solo-multi.png",
    price: 15500,
    description:
      "Multi-coin sanitary napkin vending machine accepting ₹1, ₹2 and ₹5 coins with configurable per-napkin pricing. 25-napkin capacity. Ideal for schools, colleges and welfare programmes.",
    keywords: "multi coin vending machine india, 1 2 5 rupee napkin vending machine, subsidised napkin machine",
  },
  {
    name: "Solo RFID Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/RFID",
    slug: "solo-rfid-vending-machine",
    image: "solo-rfid.png",
    price: 16000,
    description:
      "IoT RFID card/tag operated sanitary napkin vending machine. Prepaid & postpaid billing, per-card monthly limits, remote card activation, wired network with offline resilience, live cloud dashboard, per-card audit trail and OTA firmware updates. 25-napkin capacity. Ideal for corporate campuses and hostels.",
    keywords: "rfid vending machine india, contactless napkin vending machine, rfid card napkin machine, prepaid postpaid rfid vending machine, per card usage audit trail vending machine, offline sync rfid vending machine, iot rfid vending machine india",
  },
  {
    name: "Solo QR UPI Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/QR",
    slug: "solo-qr-vending-machine",
    image: "solo-qr.png",
    price: 19500,
    description:
      "UPI QR code sanitary napkin vending machine. SIM-based connectivity managed by customer. 25-napkin capacity. Ideal for campuses and offices.",
    keywords: "upi qr vending machine india, sim based napkin vending machine, qr code napkin machine",
  },
  {
    name: "Solo Wave Sensor Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/Wave",
    slug: "solo-wave-vending-machine",
    image: "solo-wave.png",
    price: 23000,
    description:
      "Touchless wave-sensor sanitary napkin vending machine in a stainless steel cabinet. Free-issue dispensing, LCD stock display, up to 35-napkin capacity. Ideal for welfare schemes, women's colleges and hospitals.",
    keywords: "touchless napkin vending machine india, wave sensor napkin vending machine, free sanitary napkin dispenser",
  },
  {
    name: "Solo WiFi UPI QR Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/W-QR-SC",
    slug: "solo-wifi-vending-machine",
    image: "solo-wifi.png",
    price: 24500,
    description:
      "Smart WiFi-enabled sanitary napkin vending machine with UPI QR code and ₹5 coin backup payment. Server-side payment verification, offline transaction queuing with auto-sync, live cloud dashboard, low-stock alerts, OTA firmware updates with auto-rollback and encrypted communication. Touch display. Best seller across India.",
    keywords: "UPI vending machine, QR code vending machine, WiFi vending machine India, smart vending machine, offline queue napkin vending machine, server verified payment vending machine, OTA firmware update vending machine",
  },
  {
    name: "Solo Ethernet UPI QR Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/ET-QR-SC",
    slug: "solo-ethernet-vending-machine",
    image: "solo-ethernet.png",
    price: 26500,
    description:
      "Ethernet-connected sanitary napkin vending machine with UPI QR code and ₹5 coin backup payment. Wired LAN connectivity, server-side payment verification, offline transaction queuing, live cloud dashboard, OTA firmware updates with auto-rollback and encrypted communication. Touch display. Ideal for hospitals and large offices with strict IT/network policies.",
    keywords: "ethernet vending machine, UPI vending machine, cloud vending machine India, wired lan napkin vending machine, hospital napkin vending machine encrypted",
  },
];

const incineratorProducts = [
  {
    name: "Lyra Micro Sanitary Napkin Incinerator",
    sku: "Lyra/SND/Micro",
    slug: "lyra-micro-incinerator",
    image: "lyra-micro.png",
    price: 13000,
    description:
      "Compact sanitary napkin incinerator for 1–5 napkins per cycle. Up to 80 napkins per 8-hour day (30-minute cycles), automatic temperature controller, wall mounting. Best for schools and small offices.",
    keywords: "micro incinerator, napkin incinerator for schools, compact incinerator india",
  },
  {
    name: "Lyra Mini Sanitary Napkin Incinerator",
    sku: "Lyra/SND/Mini",
    slug: "lyra-mini-incinerator",
    image: "lyra-mini.png",
    price: 16000,
    description:
      "Mid-size sanitary napkin incinerator for 5–15 napkins per cycle. Up to 240 napkins per 8-hour day (30-minute cycles), digital temperature display, wall mounting. Ideal for colleges and medium offices.",
    keywords: "mini incinerator, napkin incinerator for colleges, sanitary waste incinerator",
  },
  {
    name: "Lyra Maxi High Capacity Sanitary Napkin Incinerator",
    sku: "Lyra/SND/Maxi",
    slug: "lyra-maxi-incinerator",
    image: "lyra-maxi.png",
    price: 40000,
    description:
      "High-capacity sanitary napkin incinerator for 25–50 napkins per cycle. Designed for hospitals, large institutions and industrial use. Digital temperature, wall mountable.",
    keywords: "high capacity incinerator, hospital incinerator, industrial napkin incinerator india",
  },
];

const OFFER_VALID_UNTIL = `${new Date().getFullYear() + 1}-12-31`;

function offerFor(price: number, url: string) {
  return {
    "@type": "Offer",
    url,
    priceCurrency: "INR",
    price,
    priceValidUntil: OFFER_VALID_UNTIL,
    ...offerPolicies,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": `${SITE_URL}/#organization` },
  };
}

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lyra Enterprises — Sanitary Napkin Vending Machines & Incinerators",
  description:
    "Complete range of sanitary napkin vending machines (coin, UPI, WiFi, IoT) and incinerators manufactured in Chennai, India by Lyra Enterprises.",
  url: SITE_URL,
  numberOfItems: vendingMachineProducts.length + incineratorProducts.length,
  itemListElement: [
    ...vendingMachineProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        "@id": `${SITE_URL}/#product-${p.sku.toLowerCase().replace(/\//g, "-")}`,
        name: p.name,
        sku: p.sku,
        mpn: p.sku,
        description: p.description,
        keywords: p.keywords,
        brand: { "@type": "Brand", name: "Lyra Enterprises" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        category: "Sanitary Napkin Vending Machine",
        url: `${SITE_URL}/products/${p.slug}`,
        image: `${SITE_URL}/images/products/${p.image}`,
        offers: offerFor(p.price, `${SITE_URL}/products/${p.slug}`),
      },
    })),
    ...incineratorProducts.map((p, i) => ({
      "@type": "ListItem",
      position: vendingMachineProducts.length + i + 1,
      item: {
        "@type": "Product",
        "@id": `${SITE_URL}/#product-${p.sku.toLowerCase().replace(/\//g, "-")}`,
        name: p.name,
        sku: p.sku,
        mpn: p.sku,
        description: p.description,
        keywords: p.keywords,
        brand: { "@type": "Brand", name: "Lyra Enterprises" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        category: "Sanitary Napkin Incinerator",
        url: `${SITE_URL}/products/${p.slug}`,
        image: `${SITE_URL}/images/products/${p.image}`,
        offers: offerFor(p.price, `${SITE_URL}/products/${p.slug}`),
      },
    })),
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Lyra Enterprises",
  description:
    "India's #1 manufacturer of sanitary napkin vending machines and incinerators",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export default function JsonLd() {
  const schemas = [
    organizationSchema,
    localBusinessSchema,
    localBusinessNorthSchema,
    productListSchema,
    faqSchema,
    websiteSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
