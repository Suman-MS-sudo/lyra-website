import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import ProductImageGallery from "@/components/ProductImageGallery";
import AddToCartButton from "@/components/AddToCartButton";
import NapkinQuickAdd from "@/components/NapkinQuickAdd";
import ViewItemTracker from "@/components/ViewItemTracker";
import { getPngSize } from "@/lib/image-meta";
import GoogleReviews from "@/components/GoogleReviews";
import FaqList from "@/components/page/FaqList";
import { CtaBand } from "@/components/page/Blocks";
import ProductCard from "@/components/store/ProductCard";
import { toCatalogItem } from "@/lib/catalog";
import { products, vendingMachines, getProductBySlug, SITE, GST_RATE, priceInclGst, formatINR } from "@/lib/data";
import { offerPolicies } from "@/lib/offer-schema";
import { RENTAL_FROM, RENTAL_PATH, RENTAL_PLANS, RENTAL_SLUGS, RENTAL_TERMS_TEXT, rupees } from "@/lib/rental";
import { IconArrowRight, IconCheck, IconDownload, IconHeadset, IconLock, IconPhone, IconReceipt, IconShield, IconStar, IconTruck, IconWhatsApp } from "@/components/store/icons";

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
  const imageSize = getPngSize(product.image);
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
      images: [{ url: productImage, ...(imageSize ?? {}), alt: product.fullName }],
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
      { q: "Does the Solo RFID support both prepaid and postpaid cards?", a: "Yes. It supports prepaid, balance-based cards as well as postpaid cards that are billed later, with per-card monthly usage limits that admins can configure remotely from the cloud dashboard." },
      { q: "Can we activate or deactivate a card remotely?", a: "Yes. Cards can be activated or deactivated at any time from the cloud dashboard — useful when an employee leaves or a lost card needs to be blocked instantly." },
      { q: "What happens if someone taps a card issued by a different organization?", a: "The Solo RFID includes cross-organization protection — a card issued elsewhere is politely rejected at the machine without revealing where it actually belongs, which keeps multi-tenant campuses secure." },
      { q: "Does the Solo RFID track who used the machine?", a: "Yes. Every dispense is logged against the specific card or tag used, giving a full per-card audit trail viewable from the cloud dashboard — useful for departmental billing, hostel allotments or misuse monitoring." },
      { q: "Does the Solo RFID have a cloud dashboard?", a: "Yes. It includes a live cloud dashboard showing stock levels, machine status and sales/usage from any browser, plus automatic low-stock alerts, usage analytics, remote OTA firmware updates and automatic fault recovery." },
      { q: "Does the Solo RFID still work if the network goes down?", a: "Yes. The machine keeps a secure local copy of authorized cards and continues dispensing during a network outage, safely queuing every transaction with an accurate timestamp. Once the connection is restored, everything syncs automatically to the cloud — no usage record or audit trail entry is ever lost." },
      { q: "Does the Solo RFID use WiFi or a wired connection?", a: "It connects over a wired network for stable, uninterrupted operation, which suits institutions with strict IT policies or unreliable WiFi. If the connection drops, it reconnects automatically with no manual intervention needed." },
      { q: "How many cards can the Solo RFID handle?", a: "It's engineered to scale to large card rosters — thousands of employees or residents — not just a handful of users, making it suitable for large corporate campuses and hostel complexes." },
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
      { q: "How many napkins can the Micro handle per day?", a: "Each cycle takes 30 minutes and handles 1–5 napkins, so the Lyra Micro processes up to 10 napkins an hour, up to 80 napkins over an 8-hour working day, or up to 240 napkins over 24 hours of continuous back-to-back cycles, all at full load." },
    ],
    "lyra-mini-incinerator": [
      { q: "Is the Lyra Mini SWM Rules 2016 compliant?", a: "Yes — the Lyra Mini is compliant with India's Solid Waste Management Rules 2016 for menstrual waste. It completely incinerates sanitary waste leaving only sterile ash." },
      { q: "What size facility is the Mini suitable for?", a: "The Lyra Mini suits facilities with 50–200 women — colleges, medium corporates, community health centres and hotels." },
    ],
    "lyra-maxi-incinerator": [
      { q: "Is the Lyra Maxi compliant with Biomedical Waste Management Rules?", a: "Yes — the Lyra Maxi is fully compliant with Biomedical Waste Management Rules 2016, making it suitable for hospitals and medical colleges." },
      { q: "How much sanitary waste can the Maxi handle daily?", a: "Each cycle takes 30 minutes and handles 25–50 napkins, so the Lyra Maxi processes up to 100 napkins an hour, up to 800 napkins over an 8-hour working day, or up to 2,400 napkins over 24 hours of continuous back-to-back cycles, all at full load — designed for large hospitals and industrial facilities." },
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
  const related = [
    ...products.filter((p) => p.category === product.category && p.slug !== product.slug),
    ...products.filter((p) => p.category !== product.category && p.category !== "napkin"),
  ].slice(0, 4);
  const isRentable = RENTAL_SLUGS.has(product.slug);
  const faqs = isRentable
    ? [
        {
          q: `Can I rent the ${product.fullName}?`,
          a: `Yes. The ${product.name} is available on Lyra's monthly rental plans: ${rupees(RENTAL_PLANS[0].price)} per month for 25-napkin capacity, ${rupees(RENTAL_PLANS[1].price)} for 50 napkins and ${rupees(RENTAL_PLANS[2].price)} for 100 napkins, plus 18% GST. ${RENTAL_TERMS_TEXT} See ${SITE.url}${RENTAL_PATH} for details.`,
        },
        ...getFaqs(product.slug),
      ]
    : getFaqs(product.slug);
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

  const imageSize = getPngSize(product.image);
  const imageObject = {
    "@type": "ImageObject",
    url: `${SITE.url}${product.image}`,
    contentUrl: `${SITE.url}${product.image}`,
    name: product.fullName,
    description: `${product.fullName} (${product.code}) — ${product.tagline}`,
    ...(imageSize ?? {}),
  };

  /* JSON-LD schemas */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName,
    description: product.description,
    sku: product.code,
    mpn: product.code,
    ...(product.image
      ? {
          image: [
            imageObject,
            ...(product.gallery ?? []).map((g) => ({
              "@type": "ImageObject",
              url: `${SITE.url}${g.src}`,
              contentUrl: `${SITE.url}${g.src}`,
              name: `${product.fullName} — features and specifications`,
              width: g.width,
              height: g.height,
            })),
          ],
        }
      : {}),
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
      ...offerPolicies,
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
      <ViewItemTracker slug={product.slug} name={product.fullName} price={product.price} category={categoryLabel} />
      <PageNavbar />
      <main className="min-h-screen bg-canvas">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="lyra-container pt-6 pb-12 sm:pt-8">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: categoryLabel, href: categoryHref },
            { label: product.name },
          ]} />

          <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
            {/* Left: image gallery (photo + feature poster), sticky on desktop */}
            <div className="lg:sticky lg:top-36">
              <ProductImageGallery
                fullName={product.fullName}
                code={product.code}
                image={product.image}
                imageSize={imageSize ?? undefined}
                gallery={product.gallery}
              />
            </div>

            {/* Right: title, price, buy box, highlights */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                <span className="text-brand">Lyra Enterprises</span>
                <span className="text-line-strong">/</span>
                <span className="text-muted">{categoryLabel}</span>
                {product.popular && (
                  <span className="rounded-full bg-primary-600 px-2.5 py-1 text-[10px] tracking-wider text-white">Most Popular</span>
                )}
              </div>
              <h1 className="mt-3 text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
                {product.fullName}
              </h1>
              <p className="mt-3 text-base text-body">{product.tagline}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <a
                  href={SITE.googleReviews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                  aria-label={`Lyra Enterprises is rated ${SITE.googleReviews.rating.toFixed(1)} out of 5 from ${SITE.googleReviews.count} Google reviews`}
                >
                  <span className="flex text-amber-400" aria-hidden>
                    {[0, 1, 2, 3, 4].map((k) => <IconStar key={k} className="h-4 w-4" />)}
                  </span>
                  <span className="font-semibold text-ink">{SITE.googleReviews.rating.toFixed(1)}</span>
                  <span className="text-muted">· {SITE.googleReviews.count} Google reviews</span>
                </a>
                <span className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">Model {product.code}</span>
              </div>

              {/* Price + buy box */}
              <div className="mt-6 rounded-[22px] border border-line bg-subtle p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-4xl font-semibold tracking-tight text-ink tabular sm:text-[2.6rem]">{formatINR(priceExGst)}</span>
                  {isNapkin ? (
                    <span className="text-lg text-muted">/ napkin</span>
                  ) : (
                    <span className="text-sm font-medium text-muted">+ {Math.round(GST_RATE * 100)}% GST</span>
                  )}
                </div>
                {!isNapkin && (
                  <p className="mt-1 text-sm text-body">
                    {formatINR(priceGstInc)} inclusive of GST · freight extra
                  </p>
                )}
                {isNapkin && (
                  <p className="mt-1 text-sm text-body">
                    Sold in 100s: 100 napkins = {formatINR(product.price * 100)} · 1,000 napkins = {formatINR(product.price * 1000)}
                  </p>
                )}
                <p className="mt-1 text-xs text-muted">
                  Ex-works Chennai. Price as per current Lyra pricelist and subject to revision.
                </p>

                <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  In stock · Ships in 1–3 days
                </p>

                <div className="mt-4 grid gap-2.5">
                  <AddToCartButton slug={product.slug} name={product.fullName} price={product.price} variant="primary" qty={isNapkin ? 100 : 1} />
                  {isNapkin && <NapkinQuickAdd slug={product.slug} name={product.fullName} price={product.price} />}
                  <Link href={`/checkout?add=${product.slug}`} className="btn btn-ink h-12 w-full text-[15px]">
                    Buy now
                  </Link>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href={`https://wa.me/918122378860?text=Hi%21%20I%27m%20interested%20in%20${encodeURIComponent(product.fullName)}.%20Please%20share%20pricing%20and%20delivery%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn h-11 bg-[#25D366] text-sm text-white hover:bg-[#1fb457]"
                    >
                      <IconWhatsApp className="h-4 w-4" /> WhatsApp
                    </Link>
                    <Link href="tel:+918122378860" className="btn btn-secondary h-11 text-sm">
                      <IconPhone className="h-4 w-4" /> Call sales
                    </Link>
                  </div>
                </div>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
                  <IconLock className="h-3.5 w-3.5" /> Pay securely online with UPI, cards, net banking or wallets.
                </p>
              </div>

              {isRentable && (
                <Link
                  href={`${RENTAL_PATH}?plan=r25#enquire`}
                  className="theme-light group mt-3 flex items-center justify-between gap-4 rounded-[18px] bg-night px-5 py-4 text-white"
                >
                  <span>
                    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary-300">New · Or rent it</span>
                    <span className="mt-0.5 block font-display text-[15px] font-semibold">
                      Rent the {product.name} from {rupees(RENTAL_FROM)}/month + GST
                    </span>
                    <span className="block text-xs text-white/60">
                      {RENTAL_PLANS.map((p) => `${p.capacity} napkins ${rupees(p.price)}`).join(" · ")}
                    </span>
                    <span className="block text-xs text-white/60">Installation, servicing, parts and monitoring included</span>
                  </span>
                  <IconArrowRight className="h-4 w-4 flex-none transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              <ul className="mt-5 grid gap-3 text-sm text-body sm:grid-cols-2">
                {[
                  { t: "1-year manufacturer warranty", I: IconShield },
                  { t: "Pan-India delivery (freight extra)", I: IconTruck },
                  { t: "Free installation support", I: IconHeadset },
                  { t: "GST invoice on every order", I: IconReceipt },
                ].map(({ t, I }) => (
                  <li key={t} className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-3">
                    <I className="h-[18px] w-[18px] flex-none text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                Sold and shipped by <strong className="font-semibold text-ink">Lyra Enterprises</strong>, Chennai: direct from the manufacturer.{" "}
                <Link href="#enquiry" className="font-semibold text-brand hover:underline">Need a formal quote?</Link>
              </p>

              {/* About this item */}
              <div className="mt-6 border-t border-line pt-5">
                <h2 className="text-base font-semibold text-ink">About this item</h2>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                  {product.features.slice(0, 6).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a href="#specs" className="mt-3 inline-block text-sm font-semibold text-primary-600 hover:underline">
                  See full specifications ↓
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* ── Sticky mobile buy bar ─────────────────────────── */}
        <div className="glass fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line px-4 py-3 lg:hidden">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-semibold text-ink tabular">
              {isNapkin ? `${formatINR(priceExGst)} / napkin` : formatINR(priceExGst)}
            </p>
            <p className="truncate text-[11px] text-muted">+{Math.round(GST_RATE * 100)}% GST · freight extra</p>
          </div>
          <AddToCartButton slug={product.slug} name={product.fullName} price={product.price} variant="compact" qty={isNapkin ? 100 : 1} className="flex-none" />
          <Link href={`/checkout?add=${product.slug}`} className="btn btn-ink h-9 min-h-0 whitespace-nowrap px-4 text-xs">
            Buy now
          </Link>
        </div>
        {/* Spacer so the sticky bar doesn't cover the footer on mobile */}
        <div className="lg:hidden h-20" />

        {/* ── In-page section tabs ─────────────────────────── */}
        <nav aria-label="Product sections" className="glass sticky top-[88px] z-30 hidden border-y border-line lg:block">
          <div className="lyra-container flex h-12 items-center gap-1 overflow-x-auto text-sm font-medium text-body">
            {[
              ["#features", "Features"],
              ["#specs", "Specifications"],
              ["#about-product", "Overview"],
              ...(isVM ? [["#compare", "Compare"]] : []),
              ["#reviews", "Reviews"],
              ["#faq", "FAQ"],
              ["#enquiry", "Formal quote"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="whitespace-nowrap rounded-lg px-3 py-1.5 transition-colors hover:bg-subtle hover:text-ink">
                {label}
              </a>
            ))}
            <span className="ml-auto flex items-center gap-3 pl-4">
              <span className="font-display text-sm font-semibold text-ink tabular">{formatINR(priceExGst)}{isNapkin ? " / napkin" : " + GST"}</span>
              <AddToCartButton slug={product.slug} name={product.fullName} price={product.price} variant="compact" qty={isNapkin ? 100 : 1} />
            </span>
          </div>
        </nav>

        {/* ── Differentiators: why nothing else at this price competes ─ */}
        {product.differentiators && product.differentiators.length > 0 && (
          <section className="bg-canvas py-14 sm:py-20">
            <div className="lyra-container">
              <div className="theme-light relative overflow-hidden rounded-[28px] bg-night px-6 py-12 text-white sm:px-12 sm:py-14">
                <div aria-hidden className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-primary-600/35 blur-3xl" />
                <div className="relative max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-400">Unmatched At This Price</p>
                  <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                    Why nothing else near {formatINR(priceExGst)} comes close
                  </h2>
                  <p className="mt-3 text-[15px] text-white/70">
                    The {product.name} packs intelligence normally reserved for machines costing ₹18,000 and up — with zero recurring cost.
                  </p>
                </div>
                <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {product.differentiators.map((d, k) => (
                    <div key={d.title} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6">
                      <span className="font-mono text-xs text-white/40">{String(k + 1).padStart(2, "0")}</span>
                      <p className="mt-3 font-display text-base font-semibold text-white">{d.title}</p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">{d.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Features + specs ─────────────────────────────── */}
        <section className="scroll-mt-44 border-t border-line bg-canvas py-14 sm:py-20" id="features">
          <div className="lyra-container grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="kicker">Features</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Key Features</h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-soft text-brand">
                      <IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                    <span className="text-[14px] font-medium leading-snug text-ink">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="specs" className="scroll-mt-44">
              <p className="kicker">Specifications</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Technical Specifications</h2>
              <dl className="mt-8 divide-y divide-line overflow-hidden rounded-[22px] border border-line bg-surface">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[40%_1fr] gap-4 px-5 py-3.5 text-sm">
                    <dt className="font-medium text-muted">{spec.label}</dt>
                    <dd className="text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              {product.booklet && (
                <a href={product.booklet} download className="btn btn-secondary mt-5">
                  <IconDownload className="h-4 w-4" />
                  Download Product Booklet (PDF)
                </a>
              )}
              <div className="mt-5 rounded-[20px] border border-primary-200 bg-primary-50 px-5 py-4 text-sm text-body">
                <p className="font-semibold text-ink">Buying for a government institution?</p>
                <p className="mt-1">
                  Lyra Enterprises is a registered GeM vendor, and a GST invoice is provided with every order.{" "}
                  <Link href="/blog/gem-tender-sanitary-napkin-vending-machine-guide" className="font-semibold text-brand hover:underline">
                    How to buy through GeM →
                  </Link>
                </p>
              </div>
              {isVM && (
                <p className="mt-4 text-sm text-body">
                  Refills: <Link href="/products/xl-sanitary-napkin" className="font-semibold text-brand hover:underline">XL 280 mm</Link> and{" "}
                  <Link href="/products/xxl-sanitary-napkin" className="font-semibold text-brand hover:underline">XXL 320 mm</Link> napkins are made for all Lyra machines.{" "}
                  <Link href="/compare-sanitary-napkin-vending-machines" className="font-semibold text-brand hover:underline">Compare all models →</Link>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Overview + ideal for ─────────────────────────── */}
        <section id="about-product" className="scroll-mt-44 border-y border-line bg-subtle py-14 sm:py-20">
          <div className="lyra-container grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <p className="kicker">Overview</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">About the {product.name}</h2>
              <p className="mt-6 text-[16px] leading-[1.8] text-body">{product.longDescription}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">Ideal For</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.useCases.map((uc) => (
                  <li key={uc} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink">
                    {uc}
                  </li>
                ))}
              </ul>
              {(product.slug === "push-button-vending-machine" || product.slug === "lyra-micro-incinerator") && (
                <Link
                  href="/offers/push-button-micro-combo"
                  className="group mt-8 flex items-center justify-between gap-4 rounded-[20px] bg-night p-5 text-white"
                >
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-400">Combo Offer</span>
                    <span className="mt-1 block text-[15px] font-semibold">
                      {product.slug === "push-button-vending-machine"
                        ? "Get this + a Lyra Micro Incinerator together — see the ₹19,999 combo offer"
                        : "Get this + a Push Button Vending Machine together — see the ₹19,999 combo offer"}
                    </span>
                  </span>
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white text-night transition-transform group-hover:translate-x-1">
                    <IconArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ── Comparison Table (VMs only) ───────────────────── */}
        {isVM && (
          <section id="compare" className="scroll-mt-44 bg-canvas py-14 sm:py-20">
            <div className="lyra-container">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="kicker">Compare</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Compare All Models</h2>
                  <p className="mt-2 text-sm text-muted">See how {product.name} compares to our full vending machine range</p>
                </div>
                <Link href="/products/sanitary-napkin-vending-machines" className="text-sm font-semibold text-brand hover:underline">
                  View all vending machines →
                </Link>
              </div>
              <div className="overflow-x-auto rounded-[22px] border border-line bg-surface">
                <table className="w-full min-w-[860px] text-sm">
                  <thead className="bg-subtle">
                    <tr>
                      <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Feature</th>
                      {vendingMachines.map((p) => (
                        <th key={p.slug} className={`px-4 py-4 text-center font-display text-[13px] font-semibold ${p.slug === product.slug ? "bg-primary-50 text-primary-700" : "text-ink"}`}>
                          {p.slug === product.slug ? (
                            <>
                              {p.name}
                              <span className="block text-[9px] font-bold uppercase tracking-widest text-brand">This model</span>
                            </>
                          ) : (
                            <Link href={`/products/${p.slug}`} className="hover:text-brand">
                              {p.name}
                            </Link>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {comparisonRows.map((row) => (
                      <tr key={row.label}>
                        <td className="px-5 py-3.5 font-medium text-ink">{row.label}</td>
                        {vendingMachines.map((p) => {
                          const val = p.compare ? p.compare[row.key] : "—";
                          const isActive = p.slug === product.slug;
                          return (
                            <td key={p.slug} className={`px-4 py-3.5 text-center ${isActive ? "bg-primary-50/60 font-medium text-primary-800" : "text-body"}`}>
                              {val === "Yes" ? (
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700" aria-label="Yes">
                                  <IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                                </span>
                              ) : val === "No" ? (
                                <span className="text-muted" aria-label="No">—</span>
                              ) : (
                                val
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── You may also like (same category) ───────────── */}
        <section className="border-t border-line bg-canvas py-14 sm:py-20">
          <div className="lyra-container">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kicker">More from Lyra</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">You may also like</h2>
              </div>
              <Link href="/products" className="text-sm font-semibold text-brand hover:underline">Shop all products →</Link>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((p, k) => (
                <li key={p.slug}>
                  <ProductCard product={toCatalogItem(p)} index={k} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Related reading (internal links to guides) ───── */}
        {product.category !== "napkin" && (
          <section className="border-t border-line bg-canvas py-14">
            <div className="lyra-container">
              <h2 className="font-display text-xl font-semibold text-ink">Related Reading</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {(isVM
                  ? [
                      ["/blog/upi-vs-coin-vending-machine", "UPI vs coin vending machines: which to choose →"],
                      ["/blog/manual-vs-automatic-napkin-vending-machine", "Manual vs automatic napkin vending machines →"],
                      ["/sanitary-napkin-vending-machine-price-india", "Sanitary napkin vending machine price in India →"],
                      ["/government-schemes-menstrual-hygiene", "Government schemes that fund vending machines →"],
                    ]
                  : [
                      ["/blog/napkin-incinerator-vs-sanitary-bin", "Napkin incinerator vs sanitary bin →"],
                      ["/blog/solid-waste-management-rules-2016-india-guide", "SWM Rules 2016: sanitary waste disposal rules →"],
                      ["/government-schemes-menstrual-hygiene", "Government schemes that fund incinerators →"],
                      ["/solutions/schools-colleges", "Menstrual hygiene setup for schools & colleges →"],
                    ]
                ).map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="flex h-full items-center rounded-2xl border border-line bg-surface px-5 py-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Customer reviews (real Google reviews, linked back) ── */}
        <div id="reviews" className="scroll-mt-44 border-t border-line">
          <GoogleReviews />
        </div>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section id="faq" className="scroll-mt-44 border-t border-line bg-subtle py-14 sm:py-20">
          <div className="lyra-container max-w-4xl">
            <p className="kicker">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Frequently Asked Questions</h2>
            <FaqList items={faqs} className="mt-8" />
          </div>
        </section>

        <ProductPurchasePanel product={product} />

        <CtaBand
          title={<>Ready to order the {product.name}?</>}
          body="Get a confirmed quote and place your order today. Pan-India delivery in 3–7 business days."
          primary={{ href: `/checkout?add=${product.slug}`, label: "Buy now" }}
          secondary={{
            href: `https://wa.me/918122378860?text=Hi%21%20I%27d%20like%20to%20order%20the%20${encodeURIComponent(product.fullName)}.%20Please%20confirm%20price%20%26%20availability.`,
            label: "WhatsApp Order",
          }}
        />
      </main>
      <PageFooter />
    </>
  );
}
