/**
 * JSON-LD Structured Data for Lyra Enterprise
 * Covers: Organization, LocalBusiness, ItemList (Products), FAQPage, BreadcrumbList
 * These schemas help Google understand the site and improve rich results ranking.
 */

const SITE_URL = "https://www.lyraenterprise.co.in";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "Store"],
  "@id": `${SITE_URL}/#organization`,
  name: "Lyra Enterprise",
  alternateName: ["Lyra Vending", "Lyra Enterprise Chennai"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo.png`,
    width: 200,
    height: 200,
  },
  image: `${SITE_URL}/images/og-image.jpg`,
  description:
    "India's #1 manufacturer of sanitary napkin vending machines and incinerators. Coin operated, UPI/QR, WiFi and IoT-enabled models for schools, hospitals, offices and colleges. Based in Chennai, Tamil Nadu.",
  foundingDate: "2018",
  numberOfEmployees: { "@type": "QuantitativeValue", value: "20" },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "State", name: "Tamil Nadu" },
    { "@type": "State", name: "Kerala" },
    { "@type": "State", name: "Karnataka" },
    { "@type": "State", name: "Andhra Pradesh" },
    { "@type": "State", name: "Telangana" },
    { "@type": "State", name: "Maharashtra" },
    { "@type": "State", name: "Delhi" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chennai",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.0827,
    longitude: 80.2707,
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
  priceRange: "₹₹",
  openingHours: "Mo-Sa 09:00-18:00",
  paymentAccepted: ["Cash", "UPI", "Bank Transfer", "Cheque"],
  currenciesAccepted: "INR",
};

const vendingMachineProducts = [
  {
    name: "Push Button Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/PB",
    description:
      "Manual push button sanitary napkin vending machine with 30-napkin capacity. Ideal for schools, hostels and small offices. Electronic operation, view panel provided.",
    price: "10000",
    keywords: "push button vending machine, manual napkin vending machine, school vending machine",
  },
  {
    name: "Solo Coin Operated Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/SC",
    description:
      "Coin operated sanitary napkin vending machine with ₹5 coin acceptor. 30-napkin capacity, electronic operation. Perfect for public toilets, malls and offices.",
    price: "11500",
    keywords: "coin vending machine india, coin operated napkin vending machine",
  },
  {
    name: "Solo WiFi UPI QR Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/W-QR-SC",
    description:
      "Smart WiFi-enabled sanitary napkin vending machine with UPI QR code and coin payment. Touch display, cloud-based reports and IoT monitoring. Best seller across India.",
    price: "23500",
    keywords: "UPI vending machine, QR code vending machine, WiFi vending machine India, smart vending machine",
  },
  {
    name: "Solo Ethernet UPI QR Sanitary Napkin Vending Machine",
    sku: "Lyra/SNVM/ET-QR-SC",
    description:
      "Ethernet-connected sanitary napkin vending machine with UPI QR code and coin payment. Touch display panel, cloud-based analytics. Ideal for hospitals and large offices.",
    price: "23500",
    keywords: "ethernet vending machine, UPI vending machine, cloud vending machine India",
  },
];

const incineratorProducts = [
  {
    name: "Lyra Micro Sanitary Napkin Incinerator",
    sku: "Lyra/SND/Micro",
    description:
      "Compact sanitary napkin incinerator for 1–5 napkins per cycle. 100 napkins/day capacity, digital temperature control, wall mounting. Best for schools and small offices.",
    price: "12500",
    keywords: "micro incinerator, napkin incinerator for schools, compact incinerator india",
  },
  {
    name: "Lyra Mini Sanitary Napkin Incinerator",
    sku: "Lyra/SND/Mini",
    description:
      "Mid-size sanitary napkin incinerator for 5–15 napkins per cycle. 100 napkins/day, digital temperature display, wall mounting. Ideal for colleges and medium offices.",
    price: "17500",
    keywords: "mini incinerator, napkin incinerator for colleges, sanitary waste incinerator",
  },
  {
    name: "Lyra Maxi High Capacity Sanitary Napkin Incinerator",
    sku: "Lyra/SND/Maxi",
    description:
      "High-capacity sanitary napkin incinerator for 25–50 napkins per cycle. Designed for hospitals, large institutions and industrial use. Digital temperature, wall mountable.",
    price: "38500",
    keywords: "high capacity incinerator, hospital incinerator, industrial napkin incinerator india",
  },
];

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lyra Enterprise — Sanitary Napkin Vending Machines & Incinerators",
  description:
    "Complete range of sanitary napkin vending machines (coin, UPI, WiFi, IoT) and incinerators manufactured in Chennai, India by Lyra Enterprise.",
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
        description: p.description,
        keywords: p.keywords,
        brand: { "@type": "Brand", name: "Lyra Enterprise" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        category: "Sanitary Napkin Vending Machine",
        url: `${SITE_URL}/#products`,
        image: `${SITE_URL}/images/og-image.jpg`,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: p.price,
          priceValidUntil: "2027-03-31",
          availability: "https://schema.org/InStock",
          seller: { "@id": `${SITE_URL}/#organization` },
          url: `${SITE_URL}/#contact`,
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "IN",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 7,
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: "INR",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "IN",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" },
              transitTime: { "@type": "QuantitativeValue", minValue: 3, maxValue: 7, unitCode: "DAY" },
            },
          },
        },
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
        description: p.description,
        keywords: p.keywords,
        brand: { "@type": "Brand", name: "Lyra Enterprise" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        category: "Sanitary Napkin Incinerator",
        url: `${SITE_URL}/#products`,
        image: `${SITE_URL}/images/og-image.jpg`,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: p.price,
          priceValidUntil: "2027-03-31",
          availability: "https://schema.org/InStock",
          seller: { "@id": `${SITE_URL}/#organization` },
          url: `${SITE_URL}/#contact`,
        },
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
        text: "Lyra Enterprise sanitary napkin vending machines start from ₹10,000 for the push-button model up to ₹23,500 for advanced WiFi/UPI models. Prices vary based on payment mode (coin, UPI, WiFi, IoT). Contact us at +91-8122378860 for bulk pricing.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I buy a sanitary napkin vending machine in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lyra Enterprise manufactures and sells sanitary napkin vending machines across India. We are based in Chennai, Tamil Nadu and deliver to all states including Delhi, Mumbai, Bangalore, Hyderabad, Kochi and more. Reach us at sales@lyraenterprise.co.in or call +91-8122378860.",
      },
    },
    {
      "@type": "Question",
      name: "Which is the best sanitary napkin vending machine manufacturer in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lyra Enterprise is India's #1 sanitary napkin vending machine manufacturer based in Chennai, Tamil Nadu. With 200+ installations across schools, hospitals and offices in 4+ states, we offer coin-operated, UPI, WiFi and IoT-enabled models with after-sales support.",
      },
    },
    {
      "@type": "Question",
      name: "What is a sanitary napkin incinerator and how much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A sanitary napkin incinerator is a machine that safely burns and disposes of used sanitary pads, maintaining hygiene in toilet facilities. Lyra Enterprise incinerators start from ₹12,500 (Micro) to ₹38,500 (Maxi high-capacity). They come in wall-mountable designs with digital temperature control.",
      },
    },
    {
      "@type": "Question",
      name: "Do Lyra vending machines support UPI and QR code payments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Lyra Enterprise's Solo WiFi (Lyra/SNVM/W-QR-SC) and Solo Ethernet (Lyra/SNVM/ET-QR-SC) models support UPI QR code payments in addition to coin operation. They also have WiFi/Ethernet connectivity for cloud-based monitoring and reports.",
      },
    },
    {
      "@type": "Question",
      name: "Are Lyra vending machines suitable for schools and colleges?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Lyra Enterprise vending machines are widely installed in schools, colleges, hostels, hospitals and corporate offices across India. The compact 700×160×160 mm design fits standard toilet cubicles. The push-button and coin models are especially popular for educational institutions.",
      },
    },
    {
      "@type": "Question",
      name: "Does Lyra Enterprise provide installation and after-sales service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Lyra Enterprise provides installation support, user training and after-sales service across India. We service Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana, Maharashtra and Delhi NCR. Call +91-8122378860 or email sales@lyraenterprise.co.in.",
      },
    },
    {
      "@type": "Question",
      name: "What is the capacity of Lyra sanitary napkin vending machines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All Lyra sanitary napkin vending machines hold 30 napkins per load. They are designed to accommodate standard-size sanitary napkins and can be refilled easily by maintenance staff. Dimensions are 700×160×160 mm fitting standard wall spaces.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Lyra Enterprise",
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
