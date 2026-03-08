import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { products, vendingMachines, getProductBySlug, SITE } from "@/lib/data";

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
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: { canonical },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: canonical,
      type: "website",
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
    },
  };
}

/* ─── Comparison table data (VMs only) ─────────────────────── */
const comparison = [
  { label: "Payment", sm: "Free (no payment)", pb: "Manual", sc: "₹5 Coin", rf: "RFID Card", wifi: "UPI QR + Coin", eth: "UPI QR + Coin" },
  { label: "Connectivity", sm: "None", pb: "None", sc: "None", rf: "None", wifi: "WiFi 2.4GHz", eth: "Ethernet/LAN" },
  { label: "Cloud Reports", sm: "No", pb: "No", sc: "No", rf: "No", wifi: "Yes", eth: "Yes" },
  { label: "Touch Display", sm: "No", pb: "No", sc: "No", rf: "No", wifi: "Yes", eth: "Yes" },
  { label: "IoT Monitoring", sm: "No", pb: "No", sc: "No", rf: "No", wifi: "Yes", eth: "Yes" },
  { label: "Price", sm: "₹5,000", pb: "₹11,500", sc: "₹12,500", rf: "₹12,500", wifi: "₹22,500", eth: "₹24,500" },
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
    "solo-manual-vending-machine": [
      { q: "What is a free-vend sanitary napkin vending machine?", a: "A free-vend machine dispenses napkins at no cost to the user — the organisation stocks it and users simply press a button to collect. Ideal for CSR programmes, factories, schools and NGOs." },
      { q: "Who should buy the Solo Manual?", a: "Any organisation running a sponsored hygiene programme — factories, NGOs, government schools, hospitals — where napkins are provided free to women." },
    ],
    "push-button-vending-machine": [
      { q: "Does the Push Button machine need electricity?", a: "Yes, it runs on 230V AC mains power for the dispensing mechanism. However, it does not need any internet, SIM or payment processing infrastructure." },
      { q: "How many napkins can it hold?", a: "The Push Button machine holds 25 sanitary napkins per fill." },
    ],
    "solo-coin-vending-machine": [
      { q: "Which coin does the Solo Coin machine accept?", a: "It accepts standard Indian ₹5 coins. The coin acceptor is tested for over 100,000 cycles." },
      { q: "Can it work without internet?", a: "Yes — the Solo Coin machine is fully offline. It needs only 230V AC power, no SIM card or internet." },
    ],
    "solo-rfid-vending-machine": [
      { q: "What type of RFID cards work with the Solo RFID?", a: "The Solo RFID is compatible with standard ISO 14443 and ISO 15693 contactless smart cards — the same type used in most corporate access control systems." },
      { q: "Can it integrate with our existing access cards?", a: "Yes, if your cards are ISO 14443 or ISO 15693, they will work directly. Contact us to verify compatibility with your existing access control infrastructure." },
    ],
    "solo-wifi-vending-machine": [
      { q: "Does the Solo WiFi need a SIM card?", a: "No — it uses your facility's existing WiFi network (2.4GHz). No SIM card or separate data plan is required." },
      { q: "Which UPI apps are supported?", a: "It supports all UPI apps including GPay, PhonePe, Paytm, BHIM and any bank UPI. The QR code is NPCI-standard." },
      { q: "Can I see live sales reports?", a: "Yes — the cloud dashboard shows real-time dispensing count, revenue, refill alerts and usage trends accessible from any browser." },
    ],
    "solo-ethernet-vending-machine": [
      { q: "Why choose Ethernet over WiFi?", a: "Ethernet provides a stable, wired connection with 99.9% uptime — preferred in hospitals, government buildings and large campuses where WiFi may be patchy or security policies restrict wireless devices." },
      { q: "Does the Solo Ethernet need a SIM card?", a: "No — it connects via your existing LAN/Ethernet cable. No SIM card or WiFi router needed." },
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
  };

  return [...(productFaqs[slug] ?? []), ...common];
}

/* ─── Page component ───────────────────────────────────────── */
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const isVM = product.category === "vending-machine";
  const categoryLabel = isVM ? "Vending Machines" : "Incinerators";
  const categoryHref = isVM
    ? "/products/sanitary-napkin-vending-machines"
    : "/products/sanitary-napkin-incinerators";

  const canonical = `${SITE.url}/products/${product.slug}`;
  const faqs = getFaqs(product.slug);

  /* JSON-LD schemas */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName,
    description: product.description,
    sku: product.code,
    mpn: product.code,
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
    category: isVM ? "Sanitary Napkin Vending Machine" : "Sanitary Napkin Incinerator",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.discountedPrice,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      url: canonical,
      seller: { "@type": "Organization", name: "Lyra Enterprises", url: SITE.url },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 3, maxValue: 7, unitCode: "DAY" },
        },
      },
    },
    keywords: product.keywords.join(", "),
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
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">

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
              <p className="mt-2 text-sm text-gray-400 font-mono">{product.code}</p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{product.description}</p>

              {/* Price block */}
              <div className="mt-6 flex items-end gap-4 flex-wrap">
                <div>
                  <p className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    ₹{product.discountedPrice.toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">+ 18% GST applicable &nbsp;·&nbsp; 1-Year Warranty</p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 font-medium">✓ 1-Year Warranty</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">✓ Pan-India Delivery</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200 font-medium">✓ Free Installation Support</span>
              </div>

              {/* CTA buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
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
              <div className="text-center text-white relative z-10 px-8">
                <p className="text-7xl font-black tracking-tight opacity-20 leading-none">{product.name.split(" ").pop()}</p>
                <p className="text-2xl font-bold mt-2">{product.name}</p>
                <p className="text-white/70 text-sm mt-1">{product.tagline}</p>
                <p className="mt-4 text-3xl font-extrabold">₹{product.discountedPrice.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((feat) => (
              <div key={feat} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
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
                  {comparison.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 text-gray-600 font-medium">{row.label}</td>
                      {([row.sm, row.pb, row.sc, row.rf, row.wifi, row.eth] as string[]).map((val, j) => {
                        const isActive = vendingMachines[j]?.slug === product.slug;
                        return (
                          <td key={j} className={`px-4 py-3 text-center font-medium ${isActive ? "bg-primary-50/60 text-primary-800" : val === "Yes" ? "text-green-600" : val === "No" ? "text-gray-400" : "text-gray-700"}`}>
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
        <section className="relative overflow-hidden bg-gradient-to-r from-[#6B1FA8] via-[#A0268A] to-[#E8477A] py-14 text-white text-center px-5">
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
                className="px-8 py-3 bg-white text-[#A0268A] font-bold rounded-full hover:bg-gray-50 transition-colors"
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
