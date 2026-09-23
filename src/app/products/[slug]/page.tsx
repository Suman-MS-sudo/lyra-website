import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import { products, vendingMachines, getProductBySlug, testimonials, SITE, GST_RATE, priceInclGst, formatINR } from "@/lib/data";

/* ─── Static params for all product pages ─────────────────── */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/* ─── Per-product dynamic metadata ────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  const canonical = `${SITE.url}/products/${product.slug}`;
  const productImage = `${SITE.url}${product.image}`;
  return {
    title: { absolute: product.metaTitle },
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: { canonical },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: canonical,
      type: "website",
      siteName: SITE.name,
      images: [{ url: productImage, width: 800, height: 800, alt: product.fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
      images: [productImage],
    },
  };
}

/* ─── Comparison table rows (VMs only) — driven by product.compare ── */
const comparisonRows: { label: string; key: "payment" | "connectivity" | "cloudReports" | "touchDisplay" | "iotMonitoring" }[] = [
  { label: "Payment", key: "payment" },
  { label: "Connectivity", key: "connectivity" },
  { label: "Cloud Reports", key: "cloudReports" },
  { label: "Touch Display", key: "touchDisplay" },
  { label: "IoT Monitoring", key: "iotMonitoring" },
];

/* ─── FAQ content per product ──────────────────────────────── */
function getFaqs(slug: string) {
  const common = [
    { q: "Do you provide installation support?", a: "Yes — Lyra Enterprises provides free installation guidance and remote support for all machines. On-site installation is available in Tamil Nadu, Kerala, Karnataka, Andhra Pradesh and Telangana." },
    { q: "What is the warranty period?", a: "All Lyra machines come with a 1-year manufacturer warranty covering defects in parts and workmanship." },
    { q: "Can I get a bulk order discount?", a: "Yes. We offer volume pricing for orders of 5 or more units. Contact us on +91-8122378860 or WhatsApp to get a bulk quote." },
    { q: "Do you deliver across India?", a: "Yes. We deliver pan-India. Machines are securely packed and dispatched from our Chennai facility. Transit time is typically 3–7 business days." },
  ];

  const productFaqs: Record<string, { q: string; a: string }[]> = {
    "push-button-vending-machine": [
      { q: "Does the Push Button machine need internet or WiFi to work?", a: "No. The machine operates completely offline on 230V AC mains power. Its WiFi hotspot is only used for pulling usage reports on demand — it never needs an internet connection, SIM card or data plan." },
      { q: "Is there a monthly fee or subscription?", a: "No. There is no SIM card, no data plan and no subscription of any kind. The ₹12,000 price is the only cost, for the life of the machine." },
      { q: "How do I check how much stock is left?", a: "Press the WiFi button on the machine to open its private hotspot, connect with any phone, and pull a spreadsheet-ready CSV usage report in seconds — no app or login needed." },
      { q: "What happens if someone tampers with the button?", a: "The built-in anti-abuse system detects rapid or repeated tampering, locks out the vend button temporarily, and logs the incident." },
      { q: "How many napkins can it hold?", a: "The Push Button machine holds 25 sanitary napkins per fill." },
    ],
    "solo-coin-vending-machine": [
      { q: "Which coin does the Solo Coin machine accept?", a: "It accepts standard Indian ₹5 coins. The coin acceptor is tested for over 100,000 cycles." },
      { q: "Can it work without internet?", a: "Yes — the Solo Coin machine is fully offline. It needs only 230V AC power, no SIM card or internet." },
    ],
    "solo-rfid-vending-machine": [
      { q: "What type of RFID cards work with the Solo RFID?", a: "The Solo RFID is compatible with standard ISO 14443 and ISO 15693 contactless smart cards — the same type used in most corporate access control systems." },
      { q: "Can it integrate with our existing access cards?", a: "Yes, if your cards are ISO 14443 or ISO 15693, they will work directly. Contact us to verify compatibility with your existing access control infrastructure." },
      { q: "Does the Solo RFID track who used the machine?", a: "Yes. Every dispense is logged against the specific card or tag used, giving a full per-card audit trail viewable from the cloud dashboard — useful for departmental billing, hostel allotments or misuse monitoring." },
      { q: "Does the Solo RFID have a cloud dashboard?", a: "Yes. It includes the same live cloud dashboard, automatic low-stock alerts and usage analytics as the WiFi and Ethernet models, plus remote OTA firmware updates and automatic fault recovery." },
      { q: "Does the Solo RFID still work if the internet or WiFi goes down?", a: "Yes. Tap-and-dispense keeps working even during a connectivity outage — each transaction is logged locally on the machine first. Once the connection is restored, all queued logs sync automatically to the cloud dashboard, so no usage record or audit trail entry is ever lost." },
    ],
    "solo-wifi-vending-machine": [
      { q: "Does the Solo WiFi need a SIM card?", a: "No — it uses your facility's existing 2.4GHz WiFi network. No SIM card or separate data plan is required." },
      { q: "Which UPI apps are supported?", a: "It supports all NPCI-standard UPI apps including GPay, PhonePe, Paytm and BHIM." },
      { q: "Can I see live sales reports?", a: "Yes — the cloud dashboard shows real-time stock levels, sales, dispensing count and machine status from any browser, plus automatic low-stock alerts and usage analytics." },
      { q: "Is the payment verified before the napkin is dispensed?", a: "Yes. Every transaction is verified server-side before the machine dispenses, which blocks spoofed or fake payment attempts. Dispense happens instantly once payment is confirmed — there's no manual approval step." },
      { q: "What happens if the WiFi goes down during a transaction?", a: "The machine keeps accepting and queuing transactions offline during a WiFi outage. Once connectivity is restored, queued transactions sync automatically — no lost sales and no lost stock count. Payment confirmation is also pushed to the machine in real time with an automatic fallback check, so a payment is never missed even if the instant push fails." },
      { q: "Are firmware updates automatic?", a: "Yes. Firmware updates are delivered over the air (OTA) with automatic rollback if an update ever fails, so there's no technician visit needed. The machine also self-resets automatically if it ever hangs." },
      { q: "Is the connection between the machine and the cloud secure?", a: "Yes. All communication between the machine and the cloud dashboard is encrypted." },
    ],
    "solo-ethernet-vending-machine": [
      { q: "Why choose Ethernet over WiFi?", a: "Ethernet provides a stable, low-latency wired connection — preferred in hospitals, government buildings and large campuses where WiFi signal is unreliable or IT policy restricts wireless devices, and it suits environments with strict network segmentation." },
      { q: "Does the Solo Ethernet need a SIM card or WiFi router?", a: "No — it connects via your existing LAN/Ethernet cable and plugs straight into existing network infrastructure. No SIM card or WiFi router dependency at all." },
      { q: "Is the payment verified before the napkin is dispensed?", a: "Yes. Every transaction is verified server-side before dispensing, blocking spoofed or fake payment attempts, with instant dispense once payment is confirmed." },
      { q: "What happens if the network connection drops during a transaction?", a: "The machine queues transactions offline during a connection loss and automatically syncs them once the connection is restored — no lost sales, no lost stock count." },
      { q: "Are firmware updates automatic?", a: "Yes. Firmware is updated remotely over the air with automatic rollback if an update fails, and the machine self-resets automatically if it ever hangs — no technician visit needed." },
      { q: "Is the LAN connection encrypted?", a: "Yes. The Solo Ethernet uses the same encrypted, verified communication channel as the WiFi model — nothing is sent in the open over the wire." },
    ],
    "lyra-micro-incinerator": [
      { q: "Is the Lyra Micro incinerator CPCB approved?", a: "The Lyra Micro follows CPCB menstrual waste disposal guidelines. It burns sanitary waste at high temperature, producing only sterile ash — no liquid effluent." },
      { q: "How many napkins can the Micro handle per day?", a: "The Lyra Micro can process up to 100 napkins per day, handling 1–5 napkins per cycle." },
    ],
    "lyra-mini-incinerator": [
      { q: "Is the Lyra Mini SWM Rules 2016 compliant?", a: "Yes — the Lyra Mini is compliant with India's Solid Waste Management Rules 2016 for menstrual waste. It completely incinerates sanitary waste leaving only sterile ash." },
      { q: "What size facility is the Mini suitable for?", a: "The Lyra Mini suits facilities with 50–200 women — colleges, medium corporates, community health centres and hotels." },
    ],
    "lyra-maxi-incinerator": [
      { q: "Is the Lyra Maxi compliant with Biomedical Waste Management Rules?", a: "Yes — the Lyra Maxi is fully compliant with Biomedical Waste Management Rules 2016, making it suitable for hospitals and medical colleges." },
      { q: "How much sanitary waste can the Maxi handle daily?", a: "The Lyra Maxi handles 100+ napkins per day, processing 25–50 napkins per cycle — designed for large hospitals and industrial facilities." },
    ],
    "solo-multi-coin-vending-machine": [
      { q: "Which coins does the Solo Multi machine accept?", a: "It accepts Indian ₹1, ₹2 and ₹5 coins through a multi-denomination coin acceptor. You can configure the per-napkin price to ₹1, ₹2, ₹3 or ₹5." },
      { q: "How is it different from the Solo Coin machine?", a: "The Solo Coin accepts only ₹5 coins. The Solo Multi adds ₹1 and ₹2 acceptance so institutions can offer napkins at a subsidised price while still recovering cost." },
      { q: "Does it need internet or a SIM card?", a: "No — the Solo Multi is fully offline. It needs only 230V AC power." },
    ],
    "solo-wave-vending-machine": [
      { q: "How does the Solo Wave dispense a napkin?", a: "The user waves a hand once in front of the sensor and one napkin is dispensed. There is no button to press, no coin and no payment — it is a free-issue machine." },
      { q: "Why does the Solo Wave use a stainless steel cabinet?", a: "Stainless steel resists rust in damp washrooms and withstands rough handling in high-traffic public areas, so the Solo Wave lasts longer than epoxy-coated sheet metal in those conditions." },
      { q: "How many napkins does the Solo Wave hold?", a: "Up to 35 napkins depending on pad thickness. An LCD display shows the live stock level so housekeeping knows when to refill." },
    ],
  };

  return [...(productFaqs[slug] ?? []), ...common];
}

/* ─── Page component ───────────────────────────────────────── */
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const isVM = product.category === "vending-machine";
  const isNapkinCat = product.category === "napkin";
  const categoryLabel = isVM
    ? "Vending Machines"
    : isNapkinCat
      ? "Sanitary Napkins"
      : "Incinerators";
  const categoryHref = isVM
    ? "/products/sanitary-napkin-vending-machines"
    : isNapkinCat
      ? "/products"
      : "/products/sanitary-napkin-incinerators";

  const canonical = `${SITE.url}/products/${product.slug}`;
  const faqs = getFaqs(product.slug);
  const isNapkin = product.category === "napkin";

  /* Pricing — pricelist MRP is ex-GST; GST 18% extra, freight additional */
  const priceExGst = product.price;
  const priceGstInc = priceInclGst(priceExGst);
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;
  const categorySchemaName = isVM
    ? "Sanitary Napkin Vending Machine"
    : isNapkin
      ? "Sanitary Napkin"
      : "Sanitary Napkin Incinerator";

  /* JSON-LD schemas */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName,
    description: product.description,
    sku: product.code,
    mpn: product.code,
    ...(product.image ? { image: [`${SITE.url}${product.image}`] } : {}),
    brand: { "@type": "Brand", name: "Lyra Enterprises" },
    manufacturer: {
      "@type": "Organization",
      name: "Lyra Enterprises",
      url: SITE.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    ...(product.weightKg
      ? { weight: { "@type": "QuantitativeValue", value: product.weightKg, unitCode: "KGM" } }
      : {}),
    category: categorySchemaName,
    url: canonical,
    keywords: product.keywords.join(", "),
    additionalProperty: product.features.map((feat) => ({
      "@type": "PropertyValue",
      name: feat,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: "INR",
      price: priceExGst,
      priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "Lyra Enterprises", url: SITE.url },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: priceExGst,
        priceCurrency: "INR",
        valueAddedTaxIncluded: false,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 7, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
        merchantReturnLink: `${SITE.url}/cancellation-refund-policy`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
      { "@type": "ListItem", position: 3, name: categoryLabel, item: `${SITE.url}${categoryHref}` },
      { "@type": "ListItem", position: 4, name: product.name, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: categoryLabel, href: categoryHref },
            { label: product.name },
          ]} />

          <div className="mt-6 grid lg:grid-cols-2 gap-10 items-start">
            {/* Left: product info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full text-white bg-gradient-to-r ${product.accent}`}>
                  {product.badge}
                </span>
                {product.popular && (
                  <span className="px-3 py-1 text-xs font-bold bg-yellow-400 text-yellow-900 rounded-full">★ Most Popular</span>
                )}
              </div>
              <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
                {product.fullName}
              </h1>
              <p className="mt-2 text-sm text-gray-500 font-mono">{product.code}</p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{product.description}</p>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className={`text-4xl font-extrabold bg-gradient-to-r ${product.accent} bg-clip-text text-transparent`}>
                  {isNapkin ? `${formatINR(priceExGst)} / napkin` : formatINR(priceExGst)}
                </span>
                {!isNapkin && (
                  <span className="text-sm text-gray-500">
                    + {Math.round(GST_RATE * 100)}% GST &nbsp;·&nbsp; {formatINR(priceGstInc)} incl. GST &nbsp;·&nbsp; freight extra
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-400">Ex-works Chennai. Price as per current Lyra pricelist and subject to revision.</p>

              {/* Stock + trust badges */}
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  In Stock — Ships in 1–3 Days
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 font-medium">✓ 1-Year Warranty</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">✓ Pan-India Delivery</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">✓ Free Installation Support</span>
              </div>

              {/* CTA buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="#enquiry"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-blue-500 text-white font-bold text-sm hover:from-primary-700 hover:to-blue-600 shadow hover:shadow-lg transition-all"
                >
                  Request a Quote
                </Link>
                <Link
                  href={`https://wa.me/918122378860?text=Hi%21%20I%27m%20interested%20in%20${encodeURIComponent(product.fullName)}.%20Please%20share%20pricing%20and%20delivery%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-xl text-white font-bold text-sm bg-gradient-to-r ${product.accent} hover:opacity-90 shadow hover:shadow-lg transition-all`}
                >
                  Get Quote on WhatsApp
                </Link>
                <Link
                  href="tel:+918122378860"
                  className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-800 font-bold text-sm hover:border-primary-400 hover:text-primary-700 transition-all"
                >
                  Call +91-81223 78860
                </Link>
              </div>
            </div>

            {/* Right: visual card */}
            <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${product.accent} h-72 lg:h-96 flex items-center justify-center shadow-2xl`}>
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/10" />
              
              {/* Product Image */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                  <Image
                    src={product.image}
                    alt={product.fullName}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1024px) 160px, 192px"
                  />
                </div>
              </div>
              
              {/* Ghost text behind image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <p className="text-7xl font-black tracking-tight opacity-[0.08] leading-none text-white select-none">
                  {product.name.split(" ").pop()}
                </p>
              </div>
              
              {/* Scrim for guaranteed text legibility regardless of accent color */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent z-[5]" />

              {/* Product info overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <p className="text-lg lg:text-xl font-bold drop-shadow-sm">{product.name}</p>
                <p className="text-white/90 text-sm mt-1 drop-shadow-sm">{product.tagline}</p>
                <p className="mt-2 text-sm font-semibold text-white drop-shadow-sm">
                  {isNapkin ? `${formatINR(priceExGst)} / napkin` : `${formatINR(priceExGst)} + GST`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProductPurchasePanel product={product} />

        {/* ── Sticky mobile buy bar ─────────────────────────── */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-gray-900 truncate">
              {isNapkin ? `${formatINR(priceExGst)} / napkin` : formatINR(priceExGst)}
            </p>
            <p className="text-[11px] text-gray-500 truncate">+{Math.round(GST_RATE * 100)}% GST · freight extra</p>
          </div>
          <a
            href={`https://wa.me/918122378860?text=Hi%21%20I%27m%20interested%20in%20${encodeURIComponent(product.fullName)}.%20Please%20share%20pricing%20and%20delivery%20details.`}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 rounded-xl text-white font-bold text-sm bg-gradient-to-r ${product.accent} shadow whitespace-nowrap`}
          >
            Get Quote
          </a>
        </div>
        {/* Spacer so the sticky bar doesn't cover the footer on mobile */}
        <div className="lg:hidden h-20" />

        {/* ── Differentiators: why nothing else at this price competes ─ */}
        {product.differentiators && product.differentiators.length > 0 && (
          <section className={`bg-gradient-to-br ${product.accent} py-14`}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-widest mb-4">
                  Unmatched At This Price
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
                  Why nothing else near {formatINR(priceExGst)} comes close
                </h2>
                <p className="mt-3 text-white/85 text-sm sm:text-base">
                  The {product.name} packs intelligence normally reserved for machines costing ₹18,000 and up — with zero recurring cost.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.differentiators.map((d) => (
                  <div key={d.title} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5">
                    <p className="font-bold text-white text-sm mb-2">{d.title}</p>
                    <p className="text-white/80 text-xs leading-relaxed">{d.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Features ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((feat) => (
              <div key={feat} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-4">
                <span className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${product.accent} flex items-center justify-center`}>
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm text-gray-700 font-medium leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Specs ────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={spec.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                    <td className="px-5 py-3.5 font-semibold text-gray-600 w-1/3">{spec.label}</td>
                    <td className="px-5 py-3.5 text-gray-900">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {product.booklet && (
            <a
              href={product.booklet}
              download
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-primary-400 hover:text-primary-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 12.5a.75.75 0 0 0 .53-.22l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V3.75a.75.75 0 0 0-1.5 0v6.19L7.53 8.22a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 .53.22Z" clipRule="evenodd" />
                <path d="M3.5 12.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 0 .75.75h10a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 15 17.75H5a2.25 2.25 0 0 1-2.25-2.25v-2a.75.75 0 0 1 .75-.75Z" />
              </svg>
              Download Product Booklet (PDF)
            </a>
          )}
        </section>

        {/* ── Use Cases ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideal For</h2>
          <div className="flex flex-wrap gap-3">
            {product.useCases.map((uc) => (
              <span key={uc} className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${product.accent}`}>
                {uc}
              </span>
            ))}
          </div>
        </section>

        {/* ── Combo offer callout ──────────────────────────── */}
        {(product.slug === "push-button-vending-machine" || product.slug === "lyra-micro-incinerator") && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 py-8 border-t border-gray-100">
            <Link
              href="/offers/push-button-micro-combo"
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100 px-6 py-5 hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-1">🔥 Combo Offer</p>
                <p className="font-semibold text-gray-900">
                  {product.slug === "push-button-vending-machine"
                    ? "Get this + a Lyra Micro Incinerator together — see the ₹19,999 combo offer"
                    : "Get this + a Push Button Vending Machine together — see the ₹19,999 combo offer"}
                </p>
              </div>
              <span className="px-5 py-2.5 rounded-full bg-primary-600 text-white text-sm font-semibold whitespace-nowrap">
                View Offer →
              </span>
            </Link>
          </section>
        )}

        {/* ── Long description ─────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the {product.name}</h2>
          <p className="text-gray-600 leading-relaxed max-w-4xl">{product.longDescription}</p>
        </section>

        {/* ── Comparison Table (VMs only) ───────────────────── */}
        {isVM && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Compare All Models</h2>
            <p className="text-sm text-gray-500 mb-6">See how {product.name} compares to our full vending machine range</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Feature</th>
                    {vendingMachines.map((p) => (
                      <th
                        key={p.slug}
                        className={`px-4 py-3 text-center font-semibold ${p.slug === product.slug ? "text-primary-700 bg-primary-50" : "text-gray-700"}`}
                      >
                        {p.name}
                        {p.slug === product.slug && (
                          <span className="block text-[9px] font-bold text-primary-500 uppercase tracking-widest">← this</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 text-gray-600 font-medium">{row.label}</td>
                      {vendingMachines.map((p) => {
                        const val = p.compare ? p.compare[row.key] : "—";
                        const isActive = p.slug === product.slug;
                        return (
                          <td key={p.slug} className={`px-4 py-3 text-center font-medium ${isActive ? "bg-primary-50/60 text-primary-800" : val === "Yes" ? "text-green-600" : val === "No" ? "text-gray-500" : "text-gray-700"}`}>
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link href="/products/sanitary-napkin-vending-machines" className="text-sm font-semibold text-primary-600 hover:underline">
                View all vending machines →
              </Link>
            </div>
          </section>
        )}

        {/* ── Customer testimonials (real, verified Google reviews) ── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-full bg-gradient-to-br ${product.accent} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                    <p className="text-xs text-gray-500">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm list-none">
                  {faq.q}
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 group-open:bg-primary-100 flex items-center justify-center text-gray-500 group-open:text-primary-600 transition-colors text-xs font-bold">+</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#3b82f6] py-14 text-white text-center px-5">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to order the {product.name}?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Get a confirmed quote and place your order today. Pan-India delivery in 3–7 business days.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`https://wa.me/918122378860?text=Hi%21%20I%27d%20like%20to%20order%20the%20${encodeURIComponent(product.fullName)}.%20Please%20confirm%20price%20%26%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-[#1d4ed8] font-bold rounded-full hover:bg-gray-50 transition-colors"
              >
                WhatsApp Order
              </Link>
              <Link href="tel:+918122378860" className="px-8 py-3 bg-white/20 border border-white/30 text-white font-bold rounded-full hover:bg-white/30 transition-colors">
                Call +91-81223 78860
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
