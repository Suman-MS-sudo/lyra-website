/**
 * JSON-LD Structured Data for Lyra Enterprises
 * Covers: Organization, LocalBusiness, ItemList (Products), FAQPage, BreadcrumbList
 * These schemas help Google understand the site and improve rich results ranking.
 */

import { cities } from "@/lib/data";

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
    "India's #1 manufacturer of sanitary napkin vending machines and incinerators. Coin operated, UPI/QR, WiFi and IoT-enabled models for schools, hospitals, offices and colleges. Based in Chennai, Tamil Nadu.",
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
    latitude: 13.1143,
    longitude: 80.1548,
  },
  telephone: "+91-8122378860",
  email: "sales@lyraenterprise.co.in",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-8122378860",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-8122378860",
      contactType: "customer service",
      contactOption: "TollFree",
      areaServed: "IN",
    },
  ],
  sameAs: [
    "https://wa.me/918122378860",
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
    ],
  },
  // Business categories
  knowsAbout: [
    "Sanitary Napkin Vending Machines",
    "Menstrual Hygiene Solutions",
    "Sanitary Waste Incinerators",
    "IoT Vending Machines",
    "UPI Payment Vending Machines",
    "Women Health Products",
  ],
  slogan: "Empowering Women's Health Across India",
  openingHours: "Mo-Sa 09:00-18:00",
  paymentAccepted: ["Cash", "UPI", "Bank Transfer", "Cheque"],
  currenciesAccepted: "INR",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Lyra Enterprises",
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
    latitude: 13.1143,
    longitude: 80.1548,
  },
  openingHours: "Mo-Sa 09:00-18:00",
  areaServed: areaServedIndia,
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
};

const vendingMachineProducts = [
  {
    name: "Push Button Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/PB",
    slug: "push-button-vending-machine",
    image: "push-button-vm.png",
    price: 11000,
    description:
      "Manual push button sanitary napkin vending machine with 25-napkin capacity. Ideal for schools, hostels and small offices. Electronic operation, view panel provided.",
    keywords: "push button vending machine, manual napkin vending machine, school vending machine",
  },
  {
    name: "Solo Coin Operated Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/SC",
    slug: "solo-coin-vending-machine",
    image: "solo-coin.png",
    price: 12500,
    description:
      "Coin operated sanitary napkin vending machine with ₹5 coin acceptor. 25-napkin capacity, electronic operation. Perfect for public toilets, malls and offices.",
    keywords: "coin vending machine india, coin operated napkin vending machine",
  },
  {
    name: "Solo Multi-Coin Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/SC-M",
    slug: "solo-multi-coin-vending-machine",
    image: "solo-multi.png",
    price: 14500,
    description:
      "Multi-coin sanitary napkin vending machine accepting ₹1, ₹2 and ₹5 coins with configurable per-napkin pricing. 25-napkin capacity. Ideal for schools, colleges and welfare programmes.",
    keywords: "multi coin vending machine india, 1 2 5 rupee napkin vending machine, subsidised napkin machine",
  },
  {
    name: "Solo RFID Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/RFID",
    slug: "solo-rfid-vending-machine",
    image: "solo-rfid.png",
    price: 15000,
    description:
      "RFID card/tag operated sanitary napkin vending machine. One tap to vend, usage reports can be generated. 25-napkin capacity. Ideal for corporate campuses and hostels.",
    keywords: "rfid vending machine india, contactless napkin vending machine, rfid card napkin machine",
  },
  {
    name: "Solo QR UPI Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/QR",
    slug: "solo-qr-vending-machine",
    image: "solo-qr.png",
    price: 18500,
    description:
      "UPI QR code sanitary napkin vending machine. SIM-based connectivity managed by customer. 25-napkin capacity. Ideal for campuses and offices.",
    keywords: "upi qr vending machine india, sim based napkin vending machine, qr code napkin machine",
  },
  {
    name: "Solo Wave Sensor Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/Wave",
    slug: "solo-wave-vending-machine",
    image: "solo-wave.png",
    price: 22000,
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
      "Smart WiFi-enabled sanitary napkin vending machine with UPI QR code and ₹5 coin payment. Touch display, centralised cloud reports and IoT monitoring. Best seller across India.",
    keywords: "UPI vending machine, QR code vending machine, WiFi vending machine India, smart vending machine",
  },
  {
    name: "Solo Ethernet UPI QR Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/ET-QR-SC",
    slug: "solo-ethernet-vending-machine",
    image: "solo-ethernet.png",
    price: 26500,
    description:
      "Ethernet-connected sanitary napkin vending machine with UPI QR code and ₹5 coin payment. Touch display panel, centralised cloud analytics. Ideal for hospitals and large offices.",
    keywords: "ethernet vending machine, UPI vending machine, cloud vending machine India",
  },
];

const incineratorProducts = [
  {
    name: "Lyra Micro Sanitary Napkin Incinerator",
    sku: "Lyra/SND/Micro",
    slug: "lyra-micro-incinerator",
    image: "lyra-micro.png",
    price: 12500,
    description:
      "Compact sanitary napkin incinerator for 1–5 napkins per cycle. Up to 100 napkins/day, automatic temperature controller, wall mounting. Best for schools and small offices.",
    keywords: "micro incinerator, napkin incinerator for schools, compact incinerator india",
  },
  {
    name: "Lyra Mini Sanitary Napkin Incinerator",
    sku: "Lyra/SND/Mini",
    slug: "lyra-mini-incinerator",
    image: "lyra-mini.png",
    price: 15500,
    description:
      "Mid-size sanitary napkin incinerator for 5–15 napkins per cycle. 100 napkins/day, digital temperature display, wall mounting. Ideal for colleges and medium offices.",
    keywords: "mini incinerator, napkin incinerator for colleges, sanitary waste incinerator",
  },
  {
    name: "Lyra Maxi High Capacity Sanitary Napkin Incinerator",
    sku: "Lyra/SND/Maxi",
    slug: "lyra-maxi-incinerator",
    image: "lyra-maxi.png",
    price: 39500,
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
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the price of a sanitary napkin vending machine in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lyra Enterprises sanitary napkin vending machines are priced from ₹11,000 for the Push Button model, ₹12,500 for Solo Coin, ₹14,500 for Solo Multi-Coin, ₹15,000 for Solo RFID, ₹18,500 for Solo QR (UPI), ₹22,000 for the touchless Solo Wave, ₹24,500 for Solo WiFi and ₹26,500 for Solo Ethernet. All prices are ex-works Chennai, exclude 18% GST and freight is additional. Call +91-8122378860 for a firm quote.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I buy a sanitary napkin vending machine in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lyra Enterprises manufactures and sells sanitary napkin vending machines across India. We are based in Chennai, Tamil Nadu and deliver to all states including Delhi, Mumbai, Bangalore, Hyderabad, Kochi and more. Reach us at sales@lyraenterprise.co.in or call +91-8122378860.",
      },
    },
    {
      "@type": "Question",
      name: "Which is the best sanitary napkin vending machine manufacturer in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lyra Enterprises is India's #1 sanitary napkin vending machine manufacturer based in Chennai, Tamil Nadu. With 200+ installations across schools, hospitals and offices in 4+ states, we offer coin-operated, UPI, WiFi and IoT-enabled models with after-sales support.",
      },
    },
    {
      "@type": "Question",
      name: "What is a sanitary napkin incinerator and how much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A sanitary napkin incinerator is a machine that safely burns and disposes of used sanitary pads, maintaining hygiene in toilet facilities. Lyra Enterprises offers the Micro (₹12,500, 1–5 napkins/cycle), Mini (₹15,500, 5–15 napkins/cycle) and Maxi (₹39,500, 25–50 napkins/cycle) models in wall-mountable designs with automatic digital temperature control. Prices are ex-works Chennai and exclude 18% GST. Call +91-8122378860 for a firm quote.",
      },
    },
    {
      "@type": "Question",
      name: "Do Lyra vending machines support UPI and QR code payments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Solo QR (Lyra/SNVM/QR), Solo WiFi (Lyra/SNVM/W-QR-SC) and Solo Ethernet (Lyra/SNVM/ET-QR-SC) models support UPI QR code payments — GPay, PhonePe and any UPI app. The WiFi and Ethernet models add coin operation, a touch display and cloud-based monitoring and reports.",
      },
    },
    {
      "@type": "Question",
      name: "Are Lyra vending machines suitable for schools and colleges?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Lyra Enterprises vending machines are widely installed in schools, colleges, hostels, hospitals and corporate offices across India. The compact 700×160×160 mm design fits standard toilet cubicles. The push-button and coin models are especially popular for educational institutions.",
      },
    },
    {
      "@type": "Question",
      name: "Does Lyra Enterprises provide installation and after-sales service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Lyra Enterprises provides installation support, user training and after-sales service across India. We service Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana, Maharashtra and Delhi NCR. Call +91-8122378860 or email sales@lyraenterprise.co.in.",
      },
    },
    {
      "@type": "Question",
      name: "What is the capacity of Lyra sanitary napkin vending machines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Lyra sanitary napkin vending machines hold 25 napkins per load; the larger stainless-steel Solo Wave holds up to 35. They accommodate standard-size sanitary napkins and are refilled easily by maintenance staff. The Solo range measures 700×160×160 mm to fit standard wall spaces; the Solo Wave is 900×250×135 mm.",
      },
    },
    {
      "@type": "Question",
      name: "Which is the best sanitary napkin vending machine manufacturer in South India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lyra Enterprises, headquartered in Chennai, Tamil Nadu, is the leading sanitary napkin vending machine and incinerator manufacturer serving South India — Tamil Nadu, Kerala, Karnataka, Andhra Pradesh and Telangana — with 200+ installations, same-week dispatch, on-site installation support and a 1-year warranty on every machine.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I find a sanitary napkin vending machine supplier near me in Chennai, Bengaluru, Kochi or Hyderabad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lyra Enterprises manufactures in Chennai and delivers and installs sanitary napkin vending machines and incinerators across Chennai, Coimbatore, Bengaluru/Bangalore, Mysuru, Kochi, Thiruvananthapuram, Hyderabad, Visakhapatnam, Vijayawada and all other major South Indian cities. Call or WhatsApp +91-8122378860 to get connected with the nearest installation team.",
      },
    },
  ],
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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
      item: `${SITE_URL}/#products`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "About Us",
      item: `${SITE_URL}/#about`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: `${SITE_URL}/#contact`,
    },
  ],
};

export default function JsonLd() {
  const schemas = [
    organizationSchema,
    localBusinessSchema,
    productListSchema,
    faqSchema,
    websiteSchema,
    breadcrumbSchema,
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
