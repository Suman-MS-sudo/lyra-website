export const SITE = {
  name: "Lyra Enterprises",
  tagline: "#1 Vending Machine & Incinerator Manufacturer India",
  url: "https://lyraenterprise.co.in",
  phone: "+91-8122378860",
  phoneDisplay: "+91-81223 78860",
  email: "sales@lyraenterprise.co.in",
  address: "10/21, Vasuki Street, Cholapuram, Ambattur, Chennai – 600053",
  city: "Chennai",
  state: "Tamil Nadu",
  whatsapp: "https://wa.me/918122378860?text=Hi%21%20I%27m%20interested%20in%20Lyra%20Enterprise%27s%20vending%20machines%20%2F%20incinerators.%20Please%20share%20details.",
  social: {
    instagram: "https://www.instagram.com/lyraenterprises_/",
    facebook: "https://www.facebook.com/profile.php?id=61578649496806",
    linkedin: "https://www.linkedin.com/company/lyra-enterprises/",
    indiamart: "https://www.indiamart.com/lyraenterprises-chennai/",
    justdial: "https://www.justdial.com/Chennai/Lyra-Enterprises-Municipal-School-Ambattur/044PXX44-XX44-260521175245-A8M4_BZDET"
  }
};

/** GST rate applied to all machine prices. Pricelist MRP is quoted ex-GST. */
export const GST_RATE = 0.18;

/** Price shown to buyers is the ex-GST MRP from the Lyra pricelist (Nov 2025). */
export function priceInclGst(exGst: number): number {
  return Math.round(exGst * (1 + GST_RATE));
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export type CompareRow = {
  payment: string;
  connectivity: string;
  cloudReports: "Yes" | "No";
  touchDisplay: "Yes" | "No";
  iotMonitoring: "Yes" | "No";
};

export type Product = {
  slug: string;
  name: string;
  fullName: string;
  code: string;
  category: "vending-machine" | "incinerator" | "napkin";
  /** ex-GST MRP in INR (pricelist Nov 2025). GST 18% extra, freight additional. */
  price: number;
  discountedPrice: number;
  badge: string;
  popular?: boolean;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  specs: { label: string; value: string }[];
  useCases: string[];
  accent: string;
  image: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  /** Google Merchant Center: unit weight for shipping */
  weightKg?: number;
  /** Comparison-table row — vending machines only */
  compare?: CompareRow;
};

export const products: Product[] = [
  // ─── VENDING MACHINES ───────────────────────────────────────
  {
    slug: "push-button-vending-machine",
    name: "Push Button",
    fullName: "Push Button Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/PB",
    category: "vending-machine",
    price: 11000,
    discountedPrice: 11000,
    badge: "Essential",
    tagline: "Simple, reliable dispensing for every facility",
    description:
      "Manual push-button sanitary napkin vending machine. Ideal for schools, hostels and budget-conscious institutions.",
    longDescription:
      "The Lyra Push Button sanitary napkin vending machine is the most affordable and reliable dispensing solution for educational institutions, government facilities and small offices across India. With a straightforward push-button operation, it requires minimal maintenance and works without any electronic payment system. The tamper-proof sheet metal cabinet with epoxy coating and transparent view panel make restocking easy for facility managers. Trusted by 50+ schools and government institutions across Tamil Nadu and Kerala.",
    features: [
      "Manual push-button dispensing",
      "25 napkins capacity",
      "Electronic operation",
      "Transparent view panel",
      "Tamper-proof body",
      "Wall-mountable design",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "25 napkins per selection" },
      { label: "No. of Selection", value: "One" },
      { label: "Operation", value: "Electronic push-button" },
      { label: "Weight", value: "10 kg" },
      { label: "Housing", value: "Sheet metal cabinet, epoxy coated" },
      { label: "Loading", value: "Vertical" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Model Code", value: "Lyra/SNVM/PB" },
    ],
    useCases: [
      "Government schools & colleges",
      "Hostels & dormitories",
      "Rural health centres",
      "Small offices & workshops",
      "Public restrooms",
    ],
    accent: "from-gray-400 to-gray-600",
    image: "/images/products/push-button-vm.png",
    weightKg: 10,
    compare: { payment: "Push Button", connectivity: "None", cloudReports: "No", touchDisplay: "No", iotMonitoring: "No" },
    keywords: [
      "push button sanitary napkin vending machine india",
      "sanitary napkin vending machine price india",
      "manual sanitary napkin vending machine india",
      "sanitary napkin machine for schools india",
      "napkin vending machine for hostels india",
      "napkin dispenser machine government institution",
      "cheap sanitary napkin vending machine india",
      "affordable napkin vending machine india",
      "best sanitary napkin machine schools india",
      "wall mount sanitary napkin dispenser india",
    ],
    metaTitle:
      "Push Button Sanitary Napkin Vending Machine | Price ₹11,000 | Lyra Enterprises",
    metaDescription:
      "Buy Lyra Push Button sanitary napkin vending machine at ₹11,000 (+18% GST). Manual dispensing, 25-napkin capacity. Best for schools, hostels & government facilities. 1-year warranty. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-coin-vending-machine",
    name: "Solo Coin",
    fullName: "Solo Coin Operated Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/SC",
    category: "vending-machine",
    price: 12500,
    discountedPrice: 12500,
    badge: "Standard",
    tagline: "Coin-operated hygiene on demand, 24×7",
    description:
      "Coin-operated sanitary napkin vending machine accepting ₹5 coins. Perfect for public toilets, malls, railway stations and corporate offices.",
    longDescription:
      "The Lyra Solo Coin sanitary napkin vending machine is India's best-selling coin-operated dispensing solution. Accepting ₹5 coins, it provides hygienic, on-demand access to sanitary napkins in public restrooms, shopping malls, railway stations, corporate offices and educational institutions. The robust coin acceptor is tested for 100,000+ cycles. The compact 700×160×160 mm body fits standard wall spaces. No internet or SIM infrastructure required — making it ideal for locations with basic amenities.",
    features: [
      "₹5 coin acceptor",
      "25 napkins capacity",
      "Electronic operation",
      "Transparent view panel",
      "Anti-jam mechanism",
      "Tamper-proof lock",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "25 napkins per selection" },
      { label: "Payment", value: "Coin acceptor — 1 × ₹5" },
      { label: "No. of Selection", value: "One" },
      { label: "Operation", value: "Electronic" },
      { label: "Weight", value: "10 kg" },
      { label: "Housing", value: "Sheet metal cabinet, epoxy coated" },
      { label: "Loading", value: "Vertical" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Model Code", value: "Lyra/SNVM/SC" },
    ],
    useCases: [
      "Shopping malls & retail stores",
      "Railway stations & airports",
      "Corporate offices",
      "Hospitals & clinics",
      "Public restrooms",
    ],
    accent: "from-primary-400 to-primary-600",
    image: "/images/products/solo-coin.png",
    weightKg: 10,
    compare: { payment: "₹5 Coin", connectivity: "None", cloudReports: "No", touchDisplay: "No", iotMonitoring: "No" },
    keywords: [
      "coin operated sanitary napkin vending machine india",
      "5 rupee coin napkin vending machine",
      "sanitary napkin vending machine price india",
      "coin napkin machine for public toilet",
      "napkin vending machine railway station india",
      "napkin vending machine shopping mall india",
      "sanitary napkin coin dispenser india",
      "best coin operated napkin machine india",
      "napkin machine for corporate offices india",
      "sanitary napkin machine hospital india",
    ],
    metaTitle:
      "Coin Operated Sanitary Napkin Vending Machine | Price ₹12,500 | Lyra Enterprises",
    metaDescription:
      "Buy Lyra Solo Coin sanitary napkin vending machine at ₹12,500 (+18% GST). ₹5 coin acceptor, 25-napkin capacity, tested 100,000+ cycles. Best for malls, railway stations, offices & hospitals. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-multi-coin-vending-machine",
    name: "Solo Multi",
    fullName: "Solo Multi-Coin Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/SC-M",
    category: "vending-machine",
    price: 14500,
    discountedPrice: 14500,
    badge: "Multi-Coin",
    tagline: "Accepts ₹1, ₹2 and ₹5 coins — flexible pricing per pad",
    description:
      "Multi-coin sanitary napkin vending machine with a ₹1 / ₹2 / ₹5 coin acceptor. Set any per-napkin price and let users pay with the coins they carry.",
    longDescription:
      "The Lyra Solo Multi sanitary napkin vending machine upgrades the popular Solo Coin with a multi-denomination coin acceptor that recognises ₹1, ₹2 and ₹5 coins. This lets institutions set a subsidised per-pad price — ₹1, ₹2 or ₹3 — instead of being locked to ₹5, which improves affordability for students and lower-income users while still recovering consumable cost. The tamper-proof sheet metal cabinet with epoxy coating, transparent view panel and vertical loading are identical to the rest of the Solo range, so restocking and servicing stay simple. Ideal for government schools, colleges, PSU welfare programmes and NGO installations where the price point matters.",
    features: [
      "₹1 / ₹2 / ₹5 multi-coin acceptor",
      "Configurable per-napkin price",
      "25 napkins capacity",
      "Electronic operation",
      "Transparent view panel",
      "Tamper-proof lock",
      "Wall-mountable design",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "25 napkins per selection" },
      { label: "Payment", value: "Coin acceptor — ₹1, ₹2, ₹5" },
      { label: "No. of Selection", value: "One" },
      { label: "Operation", value: "Electronic" },
      { label: "Weight", value: "10 kg" },
      { label: "Housing", value: "Sheet metal cabinet, epoxy coated" },
      { label: "Loading", value: "Vertical" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Model Code", value: "Lyra/SNVM/SC-M" },
    ],
    useCases: [
      "Government schools & colleges",
      "PSU & welfare programmes",
      "NGO & social sector installations",
      "Community health centres",
      "Hostels & dormitories",
    ],
    accent: "from-amber-400 to-primary-500",
    image: "/images/products/solo-multi.png",
    weightKg: 10,
    compare: { payment: "₹1 / ₹2 / ₹5 Coin", connectivity: "None", cloudReports: "No", touchDisplay: "No", iotMonitoring: "No" },
    keywords: [
      "multi coin sanitary napkin vending machine india",
      "1 2 5 rupee coin napkin vending machine",
      "sanitary napkin vending machine price india",
      "subsidised napkin vending machine schools india",
      "multi denomination coin napkin dispenser india",
      "napkin vending machine for government schools india",
      "cheap coin napkin machine india",
    ],
    metaTitle:
      "Solo Multi-Coin Sanitary Napkin Vending Machine | ₹1 ₹2 ₹5 | Price ₹14,500 | Lyra Enterprises",
    metaDescription:
      "Buy Lyra Solo Multi sanitary napkin vending machine at ₹14,500 (+18% GST). Accepts ₹1, ₹2 and ₹5 coins with configurable per-pad pricing. 25-napkin capacity. Best for schools, colleges & welfare programmes. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-rfid-vending-machine",
    name: "Solo RFID",
    fullName: "RFID-Based Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/RFID",
    category: "vending-machine",
    price: 15000,
    discountedPrice: 15000,
    badge: "RFID",
    tagline: "Contactless RFID card dispensing for controlled-access spaces",
    description:
      "RFID card/tag operated sanitary napkin vending machine. No coins, no QR scanning — secure tap-and-dispense access for corporate campuses and hostels.",
    longDescription:
      "The Lyra Solo RFID sanitary napkin vending machine delivers touchless, cashless dispensing via RFID card or tag — one tap to vend. No coins or QR scanning required. Usage data can be logged and reports generated per card, making it ideal for corporate campuses and hostel blocks where RFID access cards are already in daily use and management wants an audit trail. Compact 700×160×160 mm sheet metal cabinet with view panel and vertical loading.",
    features: [
      "RFID card / tag access — 1 tap to vend",
      "No coin required",
      "No QR scanning needed",
      "Usage reports can be generated",
      "25 napkins capacity",
      "Transparent view panel",
      "Wall-mountable design",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "25 napkins (varies with thickness)" },
      { label: "Payment", value: "RFID Card / Tag — 1 tap to vend" },
      { label: "Data", value: "Reports can be generated" },
      { label: "No. of Selection", value: "One" },
      { label: "Weight", value: "10 kg" },
      { label: "Housing", value: "Sheet metal cabinet, epoxy coated" },
      { label: "Loading", value: "Vertical" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Model Code", value: "Lyra/SNVM/RFID" },
    ],
    useCases: [
      "Corporate campuses",
      "Hostel blocks",
      "Controlled-access restrooms",
      "Institutions with RFID systems",
    ],
    accent: "from-teal-400 to-cyan-600",
    image: "/images/products/solo-rfid.png",
    weightKg: 10,
    compare: { payment: "RFID Card", connectivity: "None", cloudReports: "No", touchDisplay: "No", iotMonitoring: "No" },
    keywords: [
      "rfid sanitary napkin vending machine india",
      "rfid napkin dispenser india",
      "contactless napkin vending machine india",
      "rfid card napkin machine corporate",
      "sanitary napkin vending machine rfid",
    ],
    metaTitle:
      "RFID Sanitary Napkin Vending Machine | Contactless | Price ₹15,000 | Lyra Enterprises",
    metaDescription:
      "Buy Lyra Solo RFID sanitary napkin vending machine at ₹15,000 (+18% GST). RFID card/tag access, usage reports, 25-napkin capacity, no coin needed. Best for campuses and hostels. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-qr-vending-machine",
    name: "Solo QR",
    fullName: "QR-Based Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/QR",
    category: "vending-machine",
    price: 18500,
    discountedPrice: 18500,
    badge: "UPI / QR",
    tagline: "Fully cashless UPI dispensing — scan, pay, dispense",
    description:
      "QR-based sanitary napkin vending machine with UPI QR code payment. Accepts GPay, PhonePe and all UPI apps. SIM connectivity managed by customer.",
    longDescription:
      "The Lyra Solo QR sanitary napkin vending machine delivers fully cashless dispensing via UPI QR code — compatible with GPay, PhonePe and all major UPI apps. The SIM-based connectivity keeps the machine online for payment processing; the monthly SIM recharge is managed by the customer. A compact 700×160×160 mm sheet metal cabinet with view panel and vertical loading makes it easy to install and restock in any washroom.",
    features: [
      "UPI QR code payment",
      "GPay & PhonePe compatible",
      "25 napkins capacity",
      "Transparent view panel",
      "SIM-based connectivity",
      "Wall-mountable design",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "25 napkins (varies with thickness)" },
      { label: "Payment", value: "UPI QR scanner — GPay, PhonePe etc." },
      { label: "Connectivity", value: "SIM-based (monthly recharge by customer)" },
      { label: "No. of Selection", value: "One" },
      { label: "Weight", value: "10 kg" },
      { label: "Housing", value: "Sheet metal cabinet, epoxy coated" },
      { label: "Loading", value: "Vertical" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Model Code", value: "Lyra/SNVM/QR" },
    ],
    useCases: [
      "Digital-first campuses",
      "Corporate offices",
      "Shopping malls",
      "Colleges & universities",
      "Public restrooms",
    ],
    accent: "from-pink-400 to-rose-500",
    image: "/images/products/solo-qr.png",
    weightKg: 10,
    compare: { payment: "UPI QR", connectivity: "SIM-based", cloudReports: "No", touchDisplay: "No", iotMonitoring: "No" },
    keywords: [
      "qr code sanitary napkin vending machine india",
      "upi sanitary napkin machine india",
      "gpay phonepe napkin vending machine india",
      "cashless napkin dispenser india",
      "sanitary napkin vending machine price india",
      "digital payment napkin vending machine",
      "sim based napkin vending machine india",
      "qr napkin machine for offices india",
    ],
    metaTitle:
      "QR-Based Sanitary Napkin Vending Machine | UPI GPay PhonePe | Price ₹18,500 | Lyra Enterprises",
    metaDescription:
      "Buy Lyra Solo QR sanitary napkin vending machine at ₹18,500 (+18% GST). UPI QR payment, 25-napkin capacity, SIM-based. Best for campuses, offices & malls. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-wave-vending-machine",
    name: "Solo Wave",
    fullName: "Solo Wave Sensor Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/Wave",
    category: "vending-machine",
    price: 22000,
    discountedPrice: 22000,
    badge: "Touchless",
    tagline: "Single wave to vend — free-issue hygiene, zero contact",
    description:
      "Touchless wave-sensor sanitary napkin vending machine in a stainless steel cabinet. A single hand wave dispenses a napkin — no coins, no payment. LCD shows live stock.",
    longDescription:
      "The Lyra Solo Wave is a fully touchless, free-issue sanitary napkin vending machine built for institutions that provide napkins at no cost to users. A single wave of the hand in front of the sensor dispenses one napkin — nothing to touch, no coins, no app. The heavier-gauge stainless steel cabinet resists corrosion in damp washrooms and vandalism in high-traffic public areas. An LCD display shows current stock level so housekeeping knows exactly when to refill, and the larger body holds up to 35 napkins depending on thickness. Ideal for government welfare schemes, women's colleges, hospitals and PSU facilities running free menstrual-hygiene programmes.",
    features: [
      "Touchless wave sensor — single wave to vend",
      "Free-issue (no payment) operation",
      "Stainless steel cabinet — corrosion & vandal resistant",
      "Up to 35 napkins capacity",
      "LCD stock-level display",
      "Transparent view panel",
      "Vertical loading",
      "Wall-mountable design",
    ],
    specs: [
      { label: "Dimensions", value: "900 × 250 × 135 mm" },
      { label: "Capacity", value: "35 napkins (varies with thickness)" },
      { label: "Dispensing", value: "Wave sensor — single wave to vend" },
      { label: "Payment", value: "None — free issue" },
      { label: "Display", value: "LCD — live stock level" },
      { label: "No. of Selection", value: "One" },
      { label: "Weight", value: "15 kg" },
      { label: "Housing", value: "Stainless steel cabinet" },
      { label: "Loading", value: "Vertical" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Model Code", value: "Lyra/SNVM/Wave" },
    ],
    useCases: [
      "Government free-napkin welfare schemes",
      "Women's colleges & universities",
      "Government & private hospitals",
      "PSU & defence facilities",
      "High-traffic public restrooms",
    ],
    accent: "from-slate-400 to-slate-600",
    image: "/images/products/solo-wave.png",
    weightKg: 15,
    compare: { payment: "Wave Sensor (free)", connectivity: "None", cloudReports: "No", touchDisplay: "No", iotMonitoring: "No" },
    keywords: [
      "touchless sanitary napkin vending machine india",
      "wave sensor napkin vending machine india",
      "free sanitary napkin dispenser machine india",
      "stainless steel napkin vending machine india",
      "sensor operated napkin vending machine india",
      "sanitary napkin vending machine price india",
      "free issue napkin machine for colleges india",
      "napkin vending machine for hospitals india",
    ],
    metaTitle:
      "Touchless Wave Sensor Sanitary Napkin Vending Machine | Free Issue | Price ₹22,000 | Lyra Enterprises",
    metaDescription:
      "Buy Lyra Solo Wave touchless sanitary napkin vending machine at ₹22,000 (+18% GST). Wave sensor, free-issue dispensing, stainless steel cabinet, LCD stock display, 35-napkin capacity. Best for welfare schemes, women's colleges & hospitals. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-wifi-vending-machine",
    name: "Solo WiFi",
    fullName: "Solo WiFi UPI QR Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/W-QR-SC",
    category: "vending-machine",
    price: 24500,
    discountedPrice: 24500,
    badge: "Most Popular",
    popular: true,
    tagline: "Smart IoT UPI + coin machine with touch display & cloud analytics",
    description:
      "WiFi-enabled IoT sanitary napkin vending machine with UPI QR code & coin payment. Touch display, centralised cloud reports — no SIM card needed.",
    longDescription:
      "The Lyra Solo WiFi is India's most advanced IoT-enabled sanitary napkin vending machine — combining UPI QR code payments, ₹5 coin operation, WiFi connectivity and a touch display in one compact unit. It needs no SIM card; it connects to your facility's existing 2.4GHz WiFi. Real-time centralised cloud reports let facility managers track dispensing count, revenue and refill alerts remotely. This is the #1 choice for technology-forward hospitals, IT parks, premium malls and smart campuses across India.",
    features: [
      "UPI QR code payment",
      "₹5 coin acceptor",
      "25 napkins capacity",
      "No SIM card needed",
      "WiFi connectivity",
      "Touch display",
      "Centralised cloud reports",
      "IoT remote monitoring",
      "Low stock alerts",
      "Usage analytics",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "25 napkins (varies with thickness)" },
      { label: "Payment", value: "UPI QR scanner + ₹5 coin acceptor" },
      { label: "Connectivity", value: "WiFi module — no SIM card needed" },
      { label: "Display", value: "Touch display" },
      { label: "Data", value: "Reports can be generated" },
      { label: "Cloud", value: "Centralised cloud maintenance" },
      { label: "No. of Selection", value: "One" },
      { label: "Weight", value: "10 kg" },
      { label: "Housing", value: "Sheet metal cabinet, epoxy coated" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Model Code", value: "Lyra/SNVM/W-QR-SC" },
    ],
    useCases: [
      "IT parks & tech campuses",
      "Premium hospitals",
      "Smart schools & colleges",
      "5-star hotels & resorts",
      "Corporate headquarters",
    ],
    accent: "from-pink-400 to-primary-500",
    image: "/images/products/solo-wifi.png",
    weightKg: 10,
    compare: { payment: "UPI QR + Coin", connectivity: "WiFi 2.4GHz", cloudReports: "Yes", touchDisplay: "Yes", iotMonitoring: "Yes" },
    keywords: [
      "wifi upi sanitary napkin vending machine india",
      "upi qr napkin vending machine india",
      "iot enabled sanitary napkin vending machine india",
      "smart iot napkin vending machine india",
      "iot sanitary napkin machine india",
      "cloud connected napkin vending machine",
      "touch display sanitary napkin dispenser india",
      "sanitary napkin vending machine price india",
      "gpay phonepe napkin machine india",
      "wifi napkin machine for it park india",
      "remote monitoring napkin vending machine india",
    ],
    metaTitle:
      "WiFi UPI QR Smart Sanitary Napkin Vending Machine | IoT | Price ₹24,500 | Lyra Enterprises",
    metaDescription:
      "Buy Lyra Solo WiFi smart IoT sanitary napkin vending machine at ₹24,500 (+18% GST). UPI QR (GPay/PhonePe) + ₹5 coin, WiFi, touch display, cloud reports. No SIM needed. Best for IT parks, hospitals & smart campuses. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-ethernet-vending-machine",
    name: "Solo Ethernet",
    fullName: "Solo Ethernet UPI QR Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/ET-QR-SC",
    category: "vending-machine",
    price: 26500,
    discountedPrice: 26500,
    badge: "Premium",
    tagline: "Wired IoT reliability for high-traffic institutions",
    description:
      "Ethernet-connected IoT UPI QR + coin vending machine for hospitals and large institutions requiring stable wired connectivity, with touch display and cloud analytics.",
    longDescription:
      "The Lyra Solo Ethernet sanitary napkin vending machine offers the same smart IoT features as the WiFi model — UPI QR payments, ₹5 coin acceptor, touch display and centralised cloud analytics — but over a stable wired Ethernet connection with no SIM card. This makes it the preferred choice for hospitals, government buildings and large institutions where WiFi signals may be unreliable or security policies restrict wireless devices. The LAN connection ensures dependable uptime for payment processing and IoT data reporting.",
    features: [
      "UPI QR code payment",
      "₹5 coin acceptor",
      "25 napkins capacity",
      "No SIM card needed",
      "Ethernet (LAN) connectivity",
      "Touch display",
      "Centralised cloud reports",
      "IoT remote monitoring",
      "Low stock alerts",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "25 napkins (varies with thickness)" },
      { label: "Payment", value: "UPI QR scanner + ₹5 coin acceptor" },
      { label: "Connectivity", value: "Ethernet module — no SIM card needed" },
      { label: "Display", value: "Touch display" },
      { label: "Data", value: "Reports can be generated" },
      { label: "Cloud", value: "Centralised cloud maintenance" },
      { label: "No. of Selection", value: "One" },
      { label: "Weight", value: "10 kg" },
      { label: "Housing", value: "Sheet metal cabinet, epoxy coated" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Model Code", value: "Lyra/SNVM/ET-QR-SC" },
    ],
    useCases: [
      "Government hospitals",
      "Large corporate offices",
      "Railways & metro stations",
      "Universities & IITs",
      "Defence & PSU facilities",
    ],
    accent: "from-fuchsia-400 to-primary-600",
    image: "/images/products/solo-ethernet.png",
    weightKg: 10,
    compare: { payment: "UPI QR + Coin", connectivity: "Ethernet/LAN", cloudReports: "Yes", touchDisplay: "Yes", iotMonitoring: "Yes" },
    keywords: [
      "ethernet upi sanitary napkin vending machine india",
      "wired napkin vending machine india",
      "ethernet iot sanitary napkin vending machine india",
      "lan iot napkin vending machine india",
      "upi napkin vending machine hospital india",
      "sanitary napkin vending machine government hospital",
      "sanitary napkin vending machine price india",
      "wired iot napkin machine india",
      "ethernet napkin machine for universities india",
      "napkin vending machine defence government india",
    ],
    metaTitle:
      "Ethernet UPI QR Sanitary Napkin Vending Machine | Wired IoT | Price ₹26,500 | Lyra Enterprises",
    metaDescription:
      "Buy Lyra Solo Ethernet sanitary napkin vending machine at ₹26,500 (+18% GST). Stable LAN/Ethernet IoT, UPI QR + ₹5 coin, touch display, cloud reports. No SIM. Best for hospitals, universities & govt institutions. Chennai. Call +91-8122378860.",
  },

  // ─── INCINERATORS ────────────────────────────────────────────
  {
    slug: "lyra-micro-incinerator",
    name: "Lyra Micro",
    fullName: "Lyra Micro Sanitary Napkin Incinerator",
    code: "Lyra/SND/Micro",
    category: "incinerator",
    price: 12500,
    discountedPrice: 12500,
    badge: "Compact",
    tagline: "Compact, safe disposal for small facilities",
    description:
      "Compact sanitary napkin incinerator for 1–5 napkins per cycle. Ideal for small schools, clinics and offices.",
    longDescription:
      "The Lyra Micro is the most compact sanitary napkin incinerator available in India, designed for small to medium washrooms with limited wall space. Processing 1–5 napkins per cycle at up to 100 napkins per day, it completely burns sanitary waste at high temperature — eliminating odour, infection risk and manual handling. An automatic digital temperature controller ensures safe operation, and a start-up timer saves power. Wall-mountable with an MS cabinet and epoxy coating, it meets CPCB (Central Pollution Control Board) hygiene guidelines for menstrual waste disposal.",
    features: [
      "1–5 napkins per cycle",
      "100 napkins/day capacity",
      "Automatic digital temperature controller",
      "MCB safety provided",
      "Unique thermal insulation — prevents heat loss",
      "Start-up timer (power saving)",
      "Front loading",
      "Wall mountable",
      "CPCB-compliant disposal",
      "Swachh Bharat Mission compliant",
    ],
    specs: [
      { label: "Dimensions", value: "520 × 230 × 230 mm" },
      { label: "Cycle Capacity", value: "1–5 napkins" },
      { label: "Daily Capacity", value: "Up to 100 napkins/day" },
      { label: "Electrical", value: "230V ±10%, 50 Hz, single phase, 5A" },
      { label: "Power Consumption", value: "1.25 kW" },
      { label: "Temp Control", value: "Automatic digital controller" },
      { label: "Safety", value: "MCB provided" },
      { label: "Loading", value: "Front" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Weight", value: "15 kg approx." },
      { label: "Model Code", value: "Lyra/SND/Micro" },
    ],
    useCases: [
      "Small schools & clinics",
      "Offices (up to 50 women)",
      "Petrol pumps & highway restrooms",
      "Small factories",
      "Rural health centres",
    ],
    accent: "from-primary-300 to-primary-500",
    image: "/images/products/lyra-micro.png",
    weightKg: 15,
    keywords: [
      "sanitary napkin incinerator india",
      "micro sanitary napkin incinerator india",
      "compact napkin incinerator price india",
      "napkin incinerator for schools india",
      "small sanitary waste disposal machine india",
      "cpcb approved napkin incinerator india",
      "menstrual waste incinerator india",
      "wall mount napkin incinerator india",
      "sanitary napkin incinerator price india",
      "swachh bharat napkin incinerator india",
      "GeM napkin incinerator india",
      "napkin incinerator for clinics india",
    ],
    metaTitle:
      "Sanitary Napkin Incinerator | Compact Wall Mount | Price ₹12,500 | Lyra Micro",
    metaDescription:
      "Buy Lyra Micro sanitary napkin incinerator at ₹12,500 (+18% GST). 1–5 napkins/cycle, 100 napkins/day, automatic digital temperature control, CPCB-compliant. Best for schools, clinics & small offices. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "lyra-mini-incinerator",
    name: "Lyra Mini",
    fullName: "Lyra Mini Sanitary Napkin Incinerator",
    code: "Lyra/SND/Mini",
    category: "incinerator",
    price: 15500,
    discountedPrice: 15500,
    badge: "Standard",
    tagline: "Mid-capacity disposal for colleges and offices",
    description:
      "Mid-size sanitary napkin incinerator for 5–15 napkins per cycle. Perfect for colleges, medium offices and hospitals.",
    longDescription:
      "The Lyra Mini sanitary napkin incinerator handles 5–15 napkins per cycle, processing up to 100 napkins per day — making it the go-to choice for colleges, medium-sized corporate offices and community health centres. Unlike bio-bins that require manual emptying and create infection risk, the Lyra Mini completely incinerates sanitary waste at high temperature, leaving only sterile ash. Compliant with Solid Waste Management Rules 2016 for menstrual waste. Includes a digital display for actual and set temperature, MCB safety, thermal insulation and an optional WiFi IoT module (no SIM needed).",
    features: [
      "5–15 napkins per cycle",
      "100 napkins/day capacity",
      "Digital temperature display (actual & set)",
      "Automatic digital temperature controller",
      "MCB safety provided",
      "Unique thermal insulation",
      "Start-up timer (power saving)",
      "IoT WiFi module add-on (no SIM needed)",
      "Wall mountable",
      "SWM Rules 2016 / CPCB compliant",
    ],
    specs: [
      { label: "Dimensions", value: "650 × 330 × 330 mm" },
      { label: "Cycle Capacity", value: "5–15 napkins" },
      { label: "Daily Capacity", value: "Up to 100 napkins/day" },
      { label: "Electrical", value: "230V ±10%, 50 Hz, single phase, 5A" },
      { label: "Power Consumption", value: "1.25 kW" },
      { label: "Display", value: "Digital — actual & set temperature" },
      { label: "Temp Control", value: "Automatic digital controller" },
      { label: "Safety", value: "MCB provided" },
      { label: "IoT", value: "WiFi module add-on (no SIM needed)" },
      { label: "Loading", value: "Front" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Weight", value: "23 kg approx." },
      { label: "Model Code", value: "Lyra/SND/Mini" },
    ],
    useCases: [
      "Colleges & universities",
      "Corporate offices (50–200 women)",
      "Community health centres",
      "Hotels & resorts",
      "NGO & social sector facilities",
    ],
    accent: "from-primary-400 to-primary-600",
    image: "/images/products/lyra-mini.png",
    weightKg: 23,
    keywords: [
      "sanitary napkin incinerator for colleges india",
      "mini sanitary napkin incinerator india",
      "napkin incinerator price india",
      "sanitary napkin incinerator for offices india",
      "mid capacity napkin incinerator india",
      "menstrual waste incinerator office india",
      "swm rules compliant napkin incinerator",
      "sanitary incinerator machine for hospitals india",
      "GeM napkin incinerator india",
      "swachh bharat mission incinerator india",
      "napkin incinerator for hotels india",
      "best napkin incinerator india",
    ],
    metaTitle:
      "Sanitary Napkin Incinerator | 5–15 Napkins/Cycle | Price ₹15,500 | Lyra Mini",
    metaDescription:
      "Buy Lyra Mini sanitary napkin incinerator at ₹15,500 (+18% GST). 5–15 napkins/cycle, 100/day, digital temperature display, optional WiFi IoT, SWM Rules 2016 compliant. Best for colleges, offices & hospitals. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "lyra-maxi-incinerator",
    name: "Lyra Maxi",
    fullName: "Lyra Maxi High Capacity Sanitary Napkin Incinerator",
    code: "Lyra/SND/Maxi",
    category: "incinerator",
    price: 39500,
    discountedPrice: 39500,
    badge: "High Capacity",
    tagline: "Industrial-grade disposal for hospitals & institutions",
    description:
      "High-capacity sanitary napkin incinerator for 25–50 napkins per cycle. Designed for hospitals, large institutions and industrial use.",
    longDescription:
      "The Lyra Maxi is the highest-capacity sanitary napkin incinerator in Lyra Enterprises' range, handling 25–50 napkins per cycle — essential for large hospitals, government medical colleges, industrial facilities and large institutional campuses with high daily sanitary waste volumes. The top-loading design allows quick restocking. Robust 900×500×500 mm MS construction with epoxy coating is built for continuous operation. Includes a digital temperature display, automatic controller, MCB safety, thermal insulation and an optional WiFi IoT module for remote temperature logging.",
    features: [
      "25–50 napkins per cycle",
      "100+ napkins/day capacity",
      "Digital temperature display (actual & set)",
      "Automatic digital temperature controller",
      "Top-loading design",
      "MCB safety provided",
      "Unique thermal insulation",
      "Start-up timer (power saving)",
      "IoT WiFi module add-on (no SIM needed)",
      "CPCB & Swachh Bharat compliant",
      "Heavy-duty MS construction",
    ],
    specs: [
      { label: "Dimensions", value: "900 × 500 × 500 mm" },
      { label: "Cycle Capacity", value: "25–50 napkins" },
      { label: "Daily Capacity", value: "Up to 100 napkins/day" },
      { label: "Electrical", value: "230V ±10%, 50 Hz, single phase, 5A" },
      { label: "Power Consumption", value: "1.25 kW" },
      { label: "Display", value: "Digital — actual & set temperature" },
      { label: "Temp Control", value: "Automatic digital controller" },
      { label: "Safety", value: "MCB provided" },
      { label: "IoT", value: "WiFi module add-on (no SIM needed)" },
      { label: "Loading", value: "Top" },
      { label: "Mounting", value: "Wall mount" },
      { label: "Weight", value: "50 kg approx." },
      { label: "Model Code", value: "Lyra/SND/Maxi" },
    ],
    useCases: [
      "Government & private hospitals",
      "Medical colleges",
      "Large IT campuses (500+ women)",
      "Industrial factories",
      "Defence establishments",
    ],
    accent: "from-pink-400 to-primary-700",
    image: "/images/products/lyra-maxi.png",
    weightKg: 50,
    keywords: [
      "high capacity sanitary napkin incinerator india",
      "hospital grade napkin incinerator india",
      "large sanitary napkin incinerator india",
      "industrial napkin incinerator india",
      "biomedical waste incinerator india",
      "napkin incinerator price india",
      "25 to 50 napkins incinerator india",
      "top loading napkin incinerator india",
      "napkin incinerator for medical college india",
      "GeM registered sanitary incinerator india",
      "swachh bharat high capacity incinerator",
      "heavy duty sanitary incinerator india",
    ],
    metaTitle:
      "High Capacity Sanitary Napkin Incinerator | Hospital Grade | Price ₹39,500 | Lyra Maxi",
    metaDescription:
      "Buy Lyra Maxi high-capacity sanitary napkin incinerator at ₹39,500 (+18% GST). 25–50 napkins/cycle, top-loading, digital temperature, optional WiFi IoT logging. Best for hospitals, medical colleges & large institutions. Chennai. Call +91-8122378860.",
  },

  // ─── SANITARY NAPKINS ────────────────────────────────────────
  {
    slug: "xl-sanitary-napkin",
    name: "XL Napkin",
    fullName: "Lyra XL Sanitary Napkin (280 mm)",
    code: "Lyra/SN/XL",
    category: "napkin",
    price: 5,
    discountedPrice: 5,
    badge: "XL",
    tagline: "Soft, leak-proof protection — 280 mm",
    description:
      "Lyra XL sanitary napkin — 280 mm regular-flow pad, individually wrapped, compatible with all Lyra vending machines.",
    longDescription:
      "Lyra XL sanitary napkins are manufactured to strict hygiene standards and are designed for compatibility with all Lyra vending machines. The 280 mm pad offers dependable regular-flow protection with a soft, breathable top sheet and leak-proof base. Individually wrapped for hygiene and affordable for every user. Ideal for schools, hostels, offices and public facilities where Lyra vending machines are installed.",
    features: [
      "280 mm length",
      "Regular-flow protection",
      "Soft breathable top sheet",
      "Leak-proof base layer",
      "Individually wrapped",
      "Compatible with all Lyra vending machines",
    ],
    specs: [
      { label: "Length", value: "280 mm" },
      { label: "Type", value: "Regular flow" },
      { label: "Wrapping", value: "Individual hygienic wrap" },
      { label: "Model Code", value: "Lyra/SN/XL" },
    ],
    useCases: [
      "Schools & colleges",
      "Corporate offices",
      "Hostels & dormitories",
      "Public restrooms",
      "Hospitals & clinics",
    ],
    accent: "from-pink-300 to-rose-400",
    image: "/images/products/xl-napkin.png",
    keywords: [
      "xl sanitary napkin india",
      "sanitary napkin 280mm india",
      "sanitary napkin for vending machine india",
      "lyra xl napkin price 5 rupees",
      "individually wrapped sanitary napkin india",
      "napkin for coin vending machine india",
    ],
    metaTitle:
      "Lyra XL Sanitary Napkin 280mm | Vending Machine Compatible | India",
    metaDescription:
      "Buy Lyra XL sanitary napkin (280 mm). Soft, leak-proof, individually wrapped. Compatible with all Lyra vending machines. Best for schools, offices & public facilities. Chennai manufacturer.",
  },
  {
    slug: "xxl-sanitary-napkin",
    name: "XXL Napkin",
    fullName: "Lyra XXL Sanitary Napkin (320 mm)",
    code: "Lyra/SN/XXL",
    category: "napkin",
    price: 10,
    discountedPrice: 10,
    badge: "XXL",
    tagline: "Extra-long overnight protection — 320 mm",
    description:
      "Lyra XXL sanitary napkin — 320 mm heavy-flow/overnight pad, individually wrapped, compatible with all Lyra vending machines.",
    longDescription:
      "Lyra XXL sanitary napkins offer extra-length 320 mm coverage for heavy flow and overnight use. The wider, longer design with reinforced leak guards provides all-round protection. Soft breathable top sheet keeps users comfortable during extended wear. Individually wrapped for hygiene. Compatible with all Lyra vending machines. Ideal for hospitals, women's hostels and any facility where complete overnight protection is needed.",
    features: [
      "320 mm length",
      "Heavy-flow / overnight protection",
      "Reinforced leak guards",
      "Soft breathable top sheet",
      "Individually wrapped",
      "Compatible with all Lyra vending machines",
    ],
    specs: [
      { label: "Length", value: "320 mm" },
      { label: "Type", value: "Heavy flow / overnight" },
      { label: "Wrapping", value: "Individual hygienic wrap" },
      { label: "Model Code", value: "Lyra/SN/XXL" },
    ],
    useCases: [
      "Women's hostels & dormitories",
      "Hospitals & maternity wards",
      "Colleges & universities",
      "Corporate offices",
      "Public restrooms",
    ],
    accent: "from-fuchsia-300 to-pink-500",
    image: "/images/products/xxl-napkin.png",
    keywords: [
      "xxl sanitary napkin india",
      "sanitary napkin 320mm india",
      "overnight sanitary napkin vending machine india",
      "lyra xxl napkin price india",
      "heavy flow sanitary napkin india",
      "extra long napkin for vending machine india",
    ],
    metaTitle:
      "Lyra XXL Sanitary Napkin 320mm | Overnight Protection | Vending Machine Compatible",
    metaDescription:
      "Buy Lyra XXL sanitary napkin (320 mm). Heavy-flow overnight, reinforced leak guards, individually wrapped. Compatible with all Lyra vending machines. Chennai manufacturer.",
  },
];

export const vendingMachines = products.filter(
  (p) => p.category === "vending-machine"
);
export const incinerators = products.filter(
  (p) => p.category === "incinerator"
);
export const napkins = products.filter(
  (p) => p.category === "napkin"
);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export type IndiaRegion =
  | "South India"
  | "West India"
  | "North India"
  | "Central India"
  | "East India"
  | "Northeast India"
  | "Island Territories";

export type StateLocation = {
  slug: string;
  state: string;
  stateCode: string;
  /** "state" or "union territory" — used in copy */
  kind: "state" | "union territory";
  region: IndiaRegion;
  capital: string;
  /** approximate current district count — rendered with a "≈" qualifier */
  districtsApprox: number;
  /** typical dispatch/transit window from the Chennai facility */
  dispatch: string;
  /** one clause on the local institutional / industrial context */
  context: string;
  description: string;
  cities: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

function stateMeta(state: string, c: string[]): Pick<StateLocation, "metaTitle" | "metaDescription"> {
  return {
    metaTitle: `Sanitary Napkin Vending Machine in ${state} — Buy & Install | Lyra Enterprises`,
    metaDescription: `Buy sanitary napkin vending machines & incinerators in ${state}. Lyra Enterprises (Chennai manufacturer) supplies and installs in ${c[0]}, ${c[1]}, ${c[2]} & all districts. Prices from ₹11,000. Call +91-8122378860.`,
  };
}

export const cities: StateLocation[] = [
  // ─── SOUTH INDIA ─────────────────────────────────────────────
  {
    slug: "vending-machine-tamil-nadu",
    state: "Tamil Nadu",
    stateCode: "TN",
    kind: "state",
    region: "South India",
    capital: "Chennai",
    districtsApprox: 38,
    dispatch: "2–4 business days",
    context:
      "our home state — the Chennai manufacturing facility plus education and industrial hubs in Coimbatore, Madurai, Salem and Tiruppur",
    description:
      "Lyra Enterprises is headquartered in Chennai, Tamil Nadu. We manufacture every sanitary napkin vending machine and incinerator in-house and supply and install across all districts of Tamil Nadu — schools, colleges, hospitals, government offices and factories.",
    cities: ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Vellore", "Erode", "Thanjavur", "Tiruppur"],
    ...stateMeta("Tamil Nadu", ["Chennai", "Coimbatore", "Madurai"]),
    keywords: [
      "vending machine tamil nadu",
      "napkin vending machine tamil nadu",
      "sanitary napkin machine chennai",
      "incinerator tamil nadu",
      "vending machine manufacturer chennai",
      "sanitary napkin machine coimbatore",
      "napkin vending machine madurai",
    ],
  },
  {
    slug: "vending-machine-kerala",
    state: "Kerala",
    stateCode: "KL",
    kind: "state",
    region: "South India",
    capital: "Thiruvananthapuram",
    districtsApprox: 14,
    dispatch: "3–5 business days",
    context:
      "Kerala's high-literacy school network, dense hospital system and IT parks in Kochi and Thiruvananthapuram",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across all 14 districts of Kerala, serving schools, higher-secondary institutions, hospitals, IT campuses and government offices with same-week dispatch from Chennai.",
    cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram"],
    ...stateMeta("Kerala", ["Kochi", "Thiruvananthapuram", "Kozhikode"]),
    keywords: [
      "vending machine kerala",
      "napkin vending machine kerala",
      "sanitary napkin machine kochi",
      "incinerator kerala",
      "napkin vending machine thiruvananthapuram",
      "sanitary napkin machine kozhikode",
      "napkin dispenser kerala",
    ],
  },
  {
    slug: "vending-machine-andhra-pradesh",
    state: "Andhra Pradesh",
    stateCode: "AP",
    kind: "state",
    region: "South India",
    capital: "Amaravati",
    districtsApprox: 26,
    dispatch: "2–5 business days",
    context:
      "government schools, ANM and health sub-centres, and the port-industrial belt from Visakhapatnam to Tirupati",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Andhra Pradesh — from Visakhapatnam and Vijayawada to Tirupati, Guntur and Kurnool. Ideal for government and private schools, colleges, hospitals and PSU facilities.",
    cities: ["Visakhapatnam", "Vijayawada", "Tirupati", "Guntur", "Kakinada", "Nellore", "Kurnool", "Rajahmundry", "Kadapa", "Anantapur"],
    ...stateMeta("Andhra Pradesh", ["Visakhapatnam", "Vijayawada", "Tirupati"]),
    keywords: [
      "vending machine andhra pradesh",
      "napkin vending machine andhra pradesh",
      "sanitary napkin machine visakhapatnam",
      "incinerator andhra pradesh",
      "napkin vending machine vijayawada",
      "sanitary napkin machine tirupati",
      "napkin dispenser andhra pradesh",
    ],
  },
  {
    slug: "vending-machine-karnataka",
    state: "Karnataka",
    stateCode: "KA",
    kind: "state",
    region: "South India",
    capital: "Bengaluru",
    districtsApprox: 31,
    dispatch: "2–4 business days",
    context:
      "IT campuses in Bengaluru plus universities, medical colleges and hospitals across Mysuru, Hubballi and Mangaluru",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Karnataka — IT parks, hospitals, universities, schools and government offices from Bengaluru to Mysuru, Hubballi, Belagavi and Mangaluru.",
    cities: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Tumakuru", "Shivamogga", "Udupi"],
    ...stateMeta("Karnataka", ["Bengaluru", "Mysuru", "Hubballi"]),
    keywords: [
      "vending machine karnataka",
      "napkin vending machine karnataka",
      "sanitary napkin machine bangalore",
      "incinerator karnataka",
      "napkin vending machine bengaluru",
      "sanitary napkin machine mysuru",
      "napkin dispenser karnataka",
    ],
  },
  {
    slug: "vending-machine-telangana",
    state: "Telangana",
    stateCode: "TG",
    kind: "state",
    region: "South India",
    capital: "Hyderabad",
    districtsApprox: 33,
    dispatch: "2–5 business days",
    context:
      "Hyderabad's IT and pharma corridors alongside district schools and government hospitals in Warangal, Nizamabad and Karimnagar",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Telangana — from Hyderabad's IT and pharma corridors to schools, colleges and government hospitals in Warangal, Nizamabad, Karimnagar and Khammam.",
    cities: ["Hyderabad", "Secunderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda", "Siddipet"],
    ...stateMeta("Telangana", ["Hyderabad", "Warangal", "Nizamabad"]),
    keywords: [
      "vending machine telangana",
      "napkin vending machine telangana",
      "sanitary napkin machine hyderabad",
      "incinerator telangana",
      "napkin vending machine warangal",
      "sanitary napkin machine karimnagar",
      "napkin dispenser telangana",
    ],
  },
  {
    slug: "vending-machine-puducherry",
    state: "Puducherry",
    stateCode: "PY",
    kind: "union territory",
    region: "South India",
    capital: "Puducherry",
    districtsApprox: 4,
    dispatch: "2–4 business days",
    context:
      "colleges, JIPMER and government schools across the Puducherry, Karaikal, Yanam and Mahe regions",
    description:
      "Puducherry is close to our Chennai facility, so Lyra Enterprises offers fast delivery and on-site installation of sanitary napkin vending machines and incinerators to colleges, JIPMER, government schools and offices across all four regions of the union territory.",
    cities: ["Puducherry", "Karaikal", "Yanam", "Mahe", "Ozhukarai", "Villianur", "Bahour"],
    ...stateMeta("Puducherry", ["Puducherry", "Karaikal", "Yanam"]),
    keywords: [
      "vending machine puducherry",
      "napkin vending machine pondicherry",
      "sanitary napkin machine puducherry",
      "incinerator puducherry",
      "napkin vending machine karaikal",
      "napkin dispenser pondicherry",
    ],
  },

  // ─── WEST INDIA ──────────────────────────────────────────────
  {
    slug: "vending-machine-maharashtra",
    state: "Maharashtra",
    stateCode: "MH",
    kind: "state",
    region: "West India",
    capital: "Mumbai",
    districtsApprox: 36,
    dispatch: "4–7 business days",
    context:
      "corporate HQs and IT parks in Mumbai and Pune, industrial belts at Nashik and Aurangabad, and a large government school and hospital system",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Maharashtra — corporate offices and IT parks in Mumbai and Pune, factories in Nashik, Aurangabad and Nagpur, and schools, colleges and hospitals statewide.",
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Chhatrapati Sambhajinagar", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai"],
    ...stateMeta("Maharashtra", ["Mumbai", "Pune", "Nagpur"]),
    keywords: [
      "vending machine maharashtra",
      "napkin vending machine mumbai",
      "sanitary napkin machine pune",
      "incinerator maharashtra",
      "napkin vending machine nagpur",
      "sanitary napkin machine nashik",
      "napkin dispenser maharashtra",
    ],
  },
  {
    slug: "vending-machine-gujarat",
    state: "Gujarat",
    stateCode: "GJ",
    kind: "state",
    region: "West India",
    capital: "Gandhinagar",
    districtsApprox: 33,
    dispatch: "4–7 business days",
    context:
      "textile and chemical industry clusters in Surat, Vadodara and Ankleshwar, plus a wide network of schools and primary health centres",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Gujarat — textile and chemical clusters in Surat, Vadodara and Bharuch, plus schools, colleges, hospitals and government offices in Ahmedabad, Rajkot and Gandhinagar.",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand", "Bharuch"],
    ...stateMeta("Gujarat", ["Ahmedabad", "Surat", "Vadodara"]),
    keywords: [
      "vending machine gujarat",
      "napkin vending machine ahmedabad",
      "sanitary napkin machine surat",
      "incinerator gujarat",
      "napkin vending machine vadodara",
      "sanitary napkin machine rajkot",
      "napkin dispenser gujarat",
    ],
  },
  {
    slug: "vending-machine-goa",
    state: "Goa",
    stateCode: "GA",
    kind: "state",
    region: "West India",
    capital: "Panaji",
    districtsApprox: 2,
    dispatch: "4–7 business days",
    context:
      "the hospitality and tourism workforce, colleges and government hospitals across North and South Goa",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Goa — hotels and resorts, colleges, government hospitals and schools in Panaji, Margao, Vasco da Gama and Mapusa.",
    cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Valpoi"],
    ...stateMeta("Goa", ["Panaji", "Margao", "Vasco da Gama"]),
    keywords: [
      "vending machine goa",
      "napkin vending machine goa",
      "sanitary napkin machine panaji",
      "incinerator goa",
      "napkin vending machine margao",
      "napkin dispenser goa",
    ],
  },
  {
    slug: "vending-machine-rajasthan",
    state: "Rajasthan",
    stateCode: "RJ",
    kind: "state",
    region: "West India",
    capital: "Jaipur",
    districtsApprox: 41,
    dispatch: "5–8 business days",
    context:
      "the coaching hub in Kota, universities in Jaipur and Udaipur, and government schools across the desert districts",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Rajasthan — coaching institutes in Kota, universities in Jaipur, Udaipur and Ajmer, and government schools and district hospitals statewide.",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bhilwara", "Sikar", "Sri Ganganagar"],
    ...stateMeta("Rajasthan", ["Jaipur", "Jodhpur", "Udaipur"]),
    keywords: [
      "vending machine rajasthan",
      "napkin vending machine jaipur",
      "sanitary napkin machine jodhpur",
      "incinerator rajasthan",
      "napkin vending machine kota",
      "sanitary napkin machine udaipur",
      "napkin dispenser rajasthan",
    ],
  },
  {
    slug: "vending-machine-dadra-nagar-haveli-daman-diu",
    state: "Dadra & Nagar Haveli and Daman & Diu",
    stateCode: "DN",
    kind: "union territory",
    region: "West India",
    capital: "Daman",
    districtsApprox: 3,
    dispatch: "5–8 business days",
    context:
      "the industrial estates around Silvassa and Vapi with their large factory workforce",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Dadra & Nagar Haveli and Daman & Diu — factory washrooms in the Silvassa industrial estates, plus schools and health centres in Daman and Diu.",
    cities: ["Silvassa", "Daman", "Diu", "Amli", "Naroli", "Khanvel"],
    ...stateMeta("Dadra & Nagar Haveli and Daman & Diu", ["Silvassa", "Daman", "Diu"]),
    keywords: [
      "vending machine silvassa",
      "napkin vending machine daman",
      "sanitary napkin machine dadra nagar haveli",
      "incinerator silvassa",
      "napkin vending machine diu",
      "napkin dispenser silvassa",
    ],
  },

  // ─── CENTRAL INDIA ───────────────────────────────────────────
  {
    slug: "vending-machine-madhya-pradesh",
    state: "Madhya Pradesh",
    stateCode: "MP",
    kind: "state",
    region: "Central India",
    capital: "Bhopal",
    districtsApprox: 55,
    dispatch: "4–7 business days",
    context:
      "Indore's education and industry base plus a very large rural school and Anganwadi network",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Madhya Pradesh — colleges and industry in Indore, government schools and district hospitals from Bhopal and Gwalior to Jabalpur, Ujjain and Rewa.",
    cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Rewa", "Satna", "Ratlam", "Dewas"],
    ...stateMeta("Madhya Pradesh", ["Bhopal", "Indore", "Gwalior"]),
    keywords: [
      "vending machine madhya pradesh",
      "napkin vending machine bhopal",
      "sanitary napkin machine indore",
      "incinerator madhya pradesh",
      "napkin vending machine gwalior",
      "sanitary napkin machine jabalpur",
      "napkin dispenser madhya pradesh",
    ],
  },
  {
    slug: "vending-machine-chhattisgarh",
    state: "Chhattisgarh",
    stateCode: "CG",
    kind: "state",
    region: "Central India",
    capital: "Raipur",
    districtsApprox: 33,
    dispatch: "4–8 business days",
    context:
      "steel and power townships around Bhilai, Korba and Raigarh, and tribal-district schools",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Chhattisgarh — steel and power townships at Bhilai, Korba and Raigarh, plus government schools, colleges and district hospitals from Raipur to Bilaspur and Jagdalpur.",
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari"],
    ...stateMeta("Chhattisgarh", ["Raipur", "Bhilai", "Bilaspur"]),
    keywords: [
      "vending machine chhattisgarh",
      "napkin vending machine raipur",
      "sanitary napkin machine bhilai",
      "incinerator chhattisgarh",
      "napkin vending machine bilaspur",
      "napkin dispenser chhattisgarh",
    ],
  },

  // ─── EAST INDIA ──────────────────────────────────────────────
  {
    slug: "vending-machine-west-bengal",
    state: "West Bengal",
    stateCode: "WB",
    kind: "state",
    region: "East India",
    capital: "Kolkata",
    districtsApprox: 23,
    dispatch: "4–7 business days",
    context:
      "Kolkata's universities and hospitals and the industrial belts at Durgapur–Asansol and Haldia",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across West Bengal — universities, schools and hospitals in Kolkata and Howrah, plus industrial townships at Durgapur, Asansol and Haldia and district facilities in Siliguri and Malda.",
    cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Kharagpur", "Haldia", "Darjeeling"],
    ...stateMeta("West Bengal", ["Kolkata", "Howrah", "Durgapur"]),
    keywords: [
      "vending machine west bengal",
      "napkin vending machine kolkata",
      "sanitary napkin machine howrah",
      "incinerator west bengal",
      "napkin vending machine siliguri",
      "sanitary napkin machine durgapur",
      "napkin dispenser west bengal",
    ],
  },
  {
    slug: "vending-machine-bihar",
    state: "Bihar",
    stateCode: "BR",
    kind: "state",
    region: "East India",
    capital: "Patna",
    districtsApprox: 38,
    dispatch: "5–8 business days",
    context:
      "one of India's largest government school systems and a fast-expanding network of medical colleges and district hospitals",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Bihar — government and residential schools, new medical colleges and district hospitals from Patna and Gaya to Muzaffarpur, Bhagalpur and Purnia.",
    cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Ara", "Begusarai", "Katihar", "Munger"],
    ...stateMeta("Bihar", ["Patna", "Gaya", "Bhagalpur"]),
    keywords: [
      "vending machine bihar",
      "napkin vending machine patna",
      "sanitary napkin machine gaya",
      "incinerator bihar",
      "napkin vending machine muzaffarpur",
      "sanitary napkin machine bhagalpur",
      "napkin dispenser bihar",
    ],
  },
  {
    slug: "vending-machine-jharkhand",
    state: "Jharkhand",
    stateCode: "JH",
    kind: "state",
    region: "East India",
    capital: "Ranchi",
    districtsApprox: 24,
    dispatch: "5–8 business days",
    context:
      "mining and steel townships at Jamshedpur, Bokaro and Dhanbad and a large tribal-welfare residential school network",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Jharkhand — steel and mining townships at Jamshedpur, Bokaro and Dhanbad, plus government and residential schools and district hospitals from Ranchi to Hazaribagh and Deoghar.",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Phusro", "Medininagar"],
    ...stateMeta("Jharkhand", ["Ranchi", "Jamshedpur", "Dhanbad"]),
    keywords: [
      "vending machine jharkhand",
      "napkin vending machine ranchi",
      "sanitary napkin machine jamshedpur",
      "incinerator jharkhand",
      "napkin vending machine dhanbad",
      "napkin dispenser jharkhand",
    ],
  },
  {
    slug: "vending-machine-odisha",
    state: "Odisha",
    stateCode: "OD",
    kind: "state",
    region: "East India",
    capital: "Bhubaneswar",
    districtsApprox: 30,
    dispatch: "4–8 business days",
    context:
      "the education city of Bhubaneswar, port-industrial Paradip and Rourkela, and coastal and tribal district schools",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Odisha — universities and institutes in Bhubaneswar, steel and port industry at Rourkela and Paradip, and government schools and district hospitals from Cuttack to Berhampur and Sambalpur.",
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"],
    ...stateMeta("Odisha", ["Bhubaneswar", "Cuttack", "Rourkela"]),
    keywords: [
      "vending machine odisha",
      "napkin vending machine bhubaneswar",
      "sanitary napkin machine cuttack",
      "incinerator odisha",
      "napkin vending machine rourkela",
      "napkin dispenser odisha",
    ],
  },

  // ─── NORTH INDIA ─────────────────────────────────────────────
  {
    slug: "vending-machine-delhi",
    state: "Delhi",
    stateCode: "DL",
    kind: "union territory",
    region: "North India",
    capital: "New Delhi",
    districtsApprox: 11,
    dispatch: "5–8 business days",
    context:
      "a dense concentration of schools, universities, hospitals and corporate offices across the National Capital Territory",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Delhi NCR — government and private schools, universities, hospitals and corporate offices in New Delhi, Dwarka, Rohini, Saket and Narela.",
    cities: ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh", "Pitampura", "Janakpuri", "Nehru Place", "Narela", "Najafgarh"],
    ...stateMeta("Delhi", ["New Delhi", "Dwarka", "Rohini"]),
    keywords: [
      "vending machine delhi",
      "napkin vending machine delhi",
      "sanitary napkin machine delhi ncr",
      "incinerator delhi",
      "napkin vending machine new delhi",
      "sanitary napkin machine for schools delhi",
      "napkin dispenser delhi",
    ],
  },
  {
    slug: "vending-machine-uttar-pradesh",
    state: "Uttar Pradesh",
    stateCode: "UP",
    kind: "state",
    region: "North India",
    capital: "Lucknow",
    districtsApprox: 75,
    dispatch: "5–8 business days",
    context:
      "India's largest school system, the Noida–Ghaziabad corporate belt, and major universities and AIIMS/medical-college hospitals",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Uttar Pradesh — the Noida and Ghaziabad corporate belt, universities in Lucknow, Kanpur, Varanasi and Prayagraj, and one of the country's largest government school networks.",
    cities: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Noida", "Bareilly", "Gorakhpur"],
    ...stateMeta("Uttar Pradesh", ["Lucknow", "Kanpur", "Noida"]),
    keywords: [
      "vending machine uttar pradesh",
      "napkin vending machine lucknow",
      "sanitary napkin machine noida",
      "incinerator uttar pradesh",
      "napkin vending machine kanpur",
      "sanitary napkin machine ghaziabad",
      "napkin dispenser uttar pradesh",
    ],
  },
  {
    slug: "vending-machine-haryana",
    state: "Haryana",
    stateCode: "HR",
    kind: "state",
    region: "North India",
    capital: "Chandigarh",
    districtsApprox: 22,
    dispatch: "5–8 business days",
    context:
      "the Gurugram–Faridabad corporate and manufacturing hubs plus state government schools and colleges",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Haryana — corporate offices and factories in Gurugram and Faridabad, and government schools, colleges and hospitals in Panipat, Ambala, Rohtak and Karnal.",
    cities: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Rohtak", "Hisar", "Karnal", "Sonipat", "Yamunanagar", "Panchkula"],
    ...stateMeta("Haryana", ["Gurugram", "Faridabad", "Panipat"]),
    keywords: [
      "vending machine haryana",
      "napkin vending machine gurugram",
      "sanitary napkin machine faridabad",
      "incinerator haryana",
      "napkin vending machine gurgaon",
      "napkin dispenser haryana",
    ],
  },
  {
    slug: "vending-machine-punjab",
    state: "Punjab",
    stateCode: "PB",
    kind: "state",
    region: "North India",
    capital: "Chandigarh",
    districtsApprox: 23,
    dispatch: "5–8 business days",
    context:
      "Ludhiana's manufacturing industry, universities in Amritsar and Patiala, and rural school clusters",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Punjab — Ludhiana's hosiery and cycle industry, universities in Amritsar, Patiala and Mohali, and government schools and hospitals statewide.",
    cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Pathankot", "Moga", "Firozpur"],
    ...stateMeta("Punjab", ["Ludhiana", "Amritsar", "Jalandhar"]),
    keywords: [
      "vending machine punjab",
      "napkin vending machine ludhiana",
      "sanitary napkin machine amritsar",
      "incinerator punjab",
      "napkin vending machine jalandhar",
      "napkin dispenser punjab",
    ],
  },
  {
    slug: "vending-machine-himachal-pradesh",
    state: "Himachal Pradesh",
    stateCode: "HP",
    kind: "state",
    region: "North India",
    capital: "Shimla",
    districtsApprox: 12,
    dispatch: "6–9 business days",
    context:
      "hill-district residential schools, medical colleges, and the Baddi–Solan pharmaceutical belt",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Himachal Pradesh — the Baddi–Solan pharma belt, medical colleges and residential schools in the hill districts from Shimla and Mandi to Dharamshala and Kullu.",
    cities: ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu", "Bilaspur", "Hamirpur", "Una", "Nahan", "Palampur"],
    ...stateMeta("Himachal Pradesh", ["Shimla", "Dharamshala", "Mandi"]),
    keywords: [
      "vending machine himachal pradesh",
      "napkin vending machine shimla",
      "sanitary napkin machine solan",
      "incinerator himachal pradesh",
      "napkin vending machine dharamshala",
      "napkin dispenser himachal pradesh",
    ],
  },
  {
    slug: "vending-machine-uttarakhand",
    state: "Uttarakhand",
    stateCode: "UK",
    kind: "state",
    region: "North India",
    capital: "Dehradun",
    districtsApprox: 13,
    dispatch: "6–9 business days",
    context:
      "Dehradun's schools and institutes, the SIDCUL industrial areas at Haridwar and Rudrapur, and hill-district facilities",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Uttarakhand — boarding schools and institutes in Dehradun and Nainital, SIDCUL factories at Haridwar and Rudrapur, and hill-district schools and hospitals.",
    cities: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Nainital", "Pithoragarh", "Kotdwar"],
    ...stateMeta("Uttarakhand", ["Dehradun", "Haridwar", "Haldwani"]),
    keywords: [
      "vending machine uttarakhand",
      "napkin vending machine dehradun",
      "sanitary napkin machine haridwar",
      "incinerator uttarakhand",
      "napkin vending machine haldwani",
      "napkin dispenser uttarakhand",
    ],
  },
  {
    slug: "vending-machine-jammu-kashmir",
    state: "Jammu & Kashmir",
    stateCode: "JK",
    kind: "union territory",
    region: "North India",
    capital: "Srinagar / Jammu",
    districtsApprox: 20,
    dispatch: "7–10 business days",
    context:
      "government schools and district hospitals across the Kashmir and Jammu divisions",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Jammu & Kashmir — government schools, colleges and district hospitals in Srinagar, Jammu, Anantnag, Baramulla and Udhampur.",
    cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Kathua", "Sopore", "Kupwara", "Pulwama", "Rajouri"],
    ...stateMeta("Jammu & Kashmir", ["Srinagar", "Jammu", "Anantnag"]),
    keywords: [
      "vending machine jammu kashmir",
      "napkin vending machine srinagar",
      "sanitary napkin machine jammu",
      "incinerator jammu kashmir",
      "napkin vending machine anantnag",
      "napkin dispenser jammu kashmir",
    ],
  },
  {
    slug: "vending-machine-ladakh",
    state: "Ladakh",
    stateCode: "LA",
    kind: "union territory",
    region: "North India",
    capital: "Leh",
    districtsApprox: 7,
    dispatch: "8–12 business days",
    context:
      "high-altitude residential schools and hospitals in Leh and Kargil, with seasonal road access",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to Ladakh — residential schools, colleges and hospitals in Leh, Kargil and the Nubra and Zanskar valleys. Dispatch timelines depend on seasonal road access.",
    cities: ["Leh", "Kargil", "Nubra", "Zanskar", "Drass", "Diskit", "Khaltse", "Nyoma"],
    ...stateMeta("Ladakh", ["Leh", "Kargil", "Nubra"]),
    keywords: [
      "vending machine ladakh",
      "napkin vending machine leh",
      "sanitary napkin machine kargil",
      "incinerator ladakh",
      "napkin dispenser leh",
    ],
  },
  {
    slug: "vending-machine-chandigarh",
    state: "Chandigarh",
    stateCode: "CH",
    kind: "union territory",
    region: "North India",
    capital: "Chandigarh",
    districtsApprox: 1,
    dispatch: "5–8 business days",
    context:
      "a compact city of universities, PGIMER and government offices serving the wider tricity",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Chandigarh — Panjab University, PGIMER, government schools and offices, and the wider Mohali–Panchkula tricity.",
    cities: ["Chandigarh", "Manimajra", "Sector 17", "Sector 22", "Sector 35", "Sector 43"],
    ...stateMeta("Chandigarh", ["Chandigarh", "Manimajra", "the tricity"]),
    keywords: [
      "vending machine chandigarh",
      "napkin vending machine chandigarh",
      "sanitary napkin machine chandigarh",
      "incinerator chandigarh",
      "napkin dispenser chandigarh",
    ],
  },

  // ─── NORTHEAST INDIA ─────────────────────────────────────────
  {
    slug: "vending-machine-assam",
    state: "Assam",
    stateCode: "AS",
    kind: "state",
    region: "Northeast India",
    capital: "Dispur",
    districtsApprox: 35,
    dispatch: "6–9 business days",
    context:
      "the tea-belt workforce, Guwahati's universities and hospitals, and the logistics gateway for the rest of the Northeast",
    description:
      "Lyra Enterprises supplies and installs sanitary napkin vending machines and incinerators across Assam — tea-estate welfare facilities, universities and hospitals in Guwahati, and government schools and district hospitals from Dibrugarh and Jorhat to Silchar and Nagaon.",
    cities: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri", "Sivasagar"],
    ...stateMeta("Assam", ["Guwahati", "Dibrugarh", "Silchar"]),
    keywords: [
      "vending machine assam",
      "napkin vending machine guwahati",
      "sanitary napkin machine dibrugarh",
      "incinerator assam",
      "napkin vending machine silchar",
      "napkin dispenser assam",
    ],
  },
  {
    slug: "vending-machine-arunachal-pradesh",
    state: "Arunachal Pradesh",
    stateCode: "AR",
    kind: "state",
    region: "Northeast India",
    capital: "Itanagar",
    districtsApprox: 25,
    dispatch: "7–11 business days",
    context:
      "remote hill districts served largely by residential schools and district hospitals",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to Arunachal Pradesh — residential schools, colleges and district hospitals in Itanagar, Naharlagun, Pasighat, Tawang and Ziro.",
    cities: ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila", "Tezu", "Aalo", "Roing", "Namsai"],
    ...stateMeta("Arunachal Pradesh", ["Itanagar", "Naharlagun", "Pasighat"]),
    keywords: [
      "vending machine arunachal pradesh",
      "napkin vending machine itanagar",
      "sanitary napkin machine arunachal pradesh",
      "incinerator arunachal pradesh",
      "napkin dispenser itanagar",
    ],
  },
  {
    slug: "vending-machine-manipur",
    state: "Manipur",
    stateCode: "MN",
    kind: "state",
    region: "Northeast India",
    capital: "Imphal",
    districtsApprox: 16,
    dispatch: "7–10 business days",
    context:
      "Imphal valley colleges and hospitals plus hill-district residential schools",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to Manipur — colleges and hospitals in Imphal, and residential and government schools across the valley and hill districts.",
    cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati", "Jiribam", "Moreh", "Kangpokpi"],
    ...stateMeta("Manipur", ["Imphal", "Thoubal", "Bishnupur"]),
    keywords: [
      "vending machine manipur",
      "napkin vending machine imphal",
      "sanitary napkin machine manipur",
      "incinerator manipur",
      "napkin dispenser imphal",
    ],
  },
  {
    slug: "vending-machine-meghalaya",
    state: "Meghalaya",
    stateCode: "ML",
    kind: "state",
    region: "Northeast India",
    capital: "Shillong",
    districtsApprox: 12,
    dispatch: "6–10 business days",
    context:
      "Shillong's universities and the NEIGRIHMS hospital, and Khasi and Garo hills schools",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to Meghalaya — universities and NEIGRIHMS in Shillong, and government and mission schools across the Khasi, Jaintia and Garo hills.",
    cities: ["Shillong", "Tura", "Jowai", "Nongstoin", "Baghmara", "Williamnagar", "Nongpoh", "Resubelpara", "Mairang", "Cherrapunji"],
    ...stateMeta("Meghalaya", ["Shillong", "Tura", "Jowai"]),
    keywords: [
      "vending machine meghalaya",
      "napkin vending machine shillong",
      "sanitary napkin machine meghalaya",
      "incinerator meghalaya",
      "napkin dispenser shillong",
    ],
  },
  {
    slug: "vending-machine-mizoram",
    state: "Mizoram",
    stateCode: "MZ",
    kind: "state",
    region: "Northeast India",
    capital: "Aizawl",
    districtsApprox: 11,
    dispatch: "7–10 business days",
    context:
      "one of India's highest female-literacy rates and a dense school network across the hill districts",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to Mizoram — schools, colleges and district hospitals in Aizawl, Lunglei, Champhai and Serchhip.",
    cities: ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Saiha", "Lawngtlai", "Mamit", "Khawzawl", "Hnahthial"],
    ...stateMeta("Mizoram", ["Aizawl", "Lunglei", "Champhai"]),
    keywords: [
      "vending machine mizoram",
      "napkin vending machine aizawl",
      "sanitary napkin machine mizoram",
      "incinerator mizoram",
      "napkin dispenser aizawl",
    ],
  },
  {
    slug: "vending-machine-nagaland",
    state: "Nagaland",
    stateCode: "NL",
    kind: "state",
    region: "Northeast India",
    capital: "Kohima",
    districtsApprox: 17,
    dispatch: "7–10 business days",
    context:
      "the Dimapur commercial hub, Kohima institutions and district mission schools",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to Nagaland — the commercial centre at Dimapur, government offices and institutions in Kohima, and mission and government schools across the districts.",
    cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Phek", "Kiphire", "Longleng"],
    ...stateMeta("Nagaland", ["Kohima", "Dimapur", "Mokokchung"]),
    keywords: [
      "vending machine nagaland",
      "napkin vending machine dimapur",
      "sanitary napkin machine kohima",
      "incinerator nagaland",
      "napkin dispenser dimapur",
    ],
  },
  {
    slug: "vending-machine-tripura",
    state: "Tripura",
    stateCode: "TR",
    kind: "state",
    region: "Northeast India",
    capital: "Agartala",
    districtsApprox: 8,
    dispatch: "6–10 business days",
    context:
      "Agartala's colleges and hospitals and a well-covered rural school system",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to Tripura — colleges and hospitals in Agartala, and government schools and health centres from Udaipur and Dharmanagar to Belonia and Kailashahar.",
    cities: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia", "Ambassa", "Khowai", "Teliamura", "Sabroom", "Sonamura"],
    ...stateMeta("Tripura", ["Agartala", "Udaipur", "Dharmanagar"]),
    keywords: [
      "vending machine tripura",
      "napkin vending machine agartala",
      "sanitary napkin machine tripura",
      "incinerator tripura",
      "napkin dispenser agartala",
    ],
  },
  {
    slug: "vending-machine-sikkim",
    state: "Sikkim",
    stateCode: "SK",
    kind: "state",
    region: "Northeast India",
    capital: "Gangtok",
    districtsApprox: 6,
    dispatch: "6–9 business days",
    context:
      "a compact state with strong school enrolment and a large tourism-sector workforce",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to Sikkim — schools, colleges and hospitals in Gangtok and Namchi, and hotels and offices across the tourism belt.",
    cities: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Singtam", "Jorethang", "Ravangla", "Soreng", "Pakyong"],
    ...stateMeta("Sikkim", ["Gangtok", "Namchi", "Gyalshing"]),
    keywords: [
      "vending machine sikkim",
      "napkin vending machine gangtok",
      "sanitary napkin machine sikkim",
      "incinerator sikkim",
      "napkin dispenser gangtok",
    ],
  },

  // ─── ISLAND TERRITORIES ──────────────────────────────────────
  {
    slug: "vending-machine-andaman-nicobar",
    state: "Andaman & Nicobar Islands",
    stateCode: "AN",
    kind: "union territory",
    region: "Island Territories",
    capital: "Port Blair",
    districtsApprox: 3,
    dispatch: "8–14 business days (sea freight)",
    context:
      "island schools and the GB Pant Hospital network, with dispatch by ship from Chennai or Kolkata",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to the Andaman & Nicobar Islands — schools, colleges and the GB Pant Hospital in Port Blair and health centres on the outer islands. Units are shipped by sea from Chennai.",
    cities: ["Port Blair", "Sri Vijaya Puram", "Rangat", "Mayabunder", "Diglipur", "Car Nicobar", "Swaraj Dweep", "Little Andaman"],
    ...stateMeta("Andaman & Nicobar Islands", ["Port Blair", "Rangat", "Diglipur"]),
    keywords: [
      "vending machine andaman nicobar",
      "napkin vending machine port blair",
      "sanitary napkin machine andaman",
      "incinerator andaman nicobar",
      "napkin dispenser port blair",
    ],
  },
  {
    slug: "vending-machine-lakshadweep",
    state: "Lakshadweep",
    stateCode: "LD",
    kind: "union territory",
    region: "Island Territories",
    capital: "Kavaratti",
    districtsApprox: 1,
    dispatch: "10–16 business days (sea freight)",
    context:
      "island schools and health centres, with dispatch by ship via Kochi",
    description:
      "Lyra Enterprises supplies sanitary napkin vending machines and incinerators to Lakshadweep — island schools and primary health centres on Kavaratti, Agatti, Amini and Andrott. Units are shipped by sea via Kochi.",
    cities: ["Kavaratti", "Agatti", "Amini", "Andrott", "Kalpeni", "Minicoy", "Kadmat", "Kiltan"],
    ...stateMeta("Lakshadweep", ["Kavaratti", "Agatti", "Andrott"]),
    keywords: [
      "vending machine lakshadweep",
      "napkin vending machine kavaratti",
      "sanitary napkin machine lakshadweep",
      "incinerator lakshadweep",
      "napkin dispenser lakshadweep",
    ],
  },
];

export const regionOrder: IndiaRegion[] = [
  "South India",
  "West India",
  "Central India",
  "North India",
  "East India",
  "Northeast India",
  "Island Territories",
];

export const blogPosts = [
  {
    slug: "why-every-school-needs-napkin-vending-machine",
    title: "Why Every School in India Needs a Sanitary Napkin Vending Machine",
    excerpt:
      "Menstrual hygiene in schools directly impacts girls' attendance and learning outcomes. Here's why vending machines are the answer.",
    date: "2026-01-15",
    readTime: "5 min read",
    category: "Education",
    metaTitle:
      "Why Every School Needs a Sanitary Napkin Vending Machine | Lyra Enterprises",
    metaDescription:
      "Discover why installing a sanitary napkin vending machine in schools reduces absenteeism and promotes menstrual health among girls in India.",
    keywords: [
      "napkin vending machine for schools india",
      "menstrual hygiene school india",
      "girl student absenteeism india",
    ],
  },
  {
    slug: "upi-vs-coin-vending-machine",
    title: "UPI QR vs Coin Vending Machine — Which One Should You Buy?",
    excerpt:
      "Coin machines are cheaper upfront, smart UPI machines pay back in operational savings. Here's a full comparison to help you decide.",
    date: "2026-01-28",
    readTime: "6 min read",
    category: "Buying Guide",
    metaTitle:
      "UPI vs Coin Vending Machine — Complete Comparison Guide India 2026",
    metaDescription:
      "Compare UPI QR code vs coin-operated sanitary napkin vending machines. Price, features, maintenance costs — full guide to help you choose. Lyra Enterprises India.",
    keywords: [
      "upi vending machine vs coin",
      "best vending machine india 2026",
      "which vending machine to buy india",
    ],
  },
  {
    slug: "napkin-incinerator-vs-sanitary-bin",
    title: "Sanitary Napkin Incinerator vs Bio Bin — What's Better for India?",
    excerpt:
      "Bio bins create infection risk and require manual disposal. Incinerators eliminate waste completely. See the full comparison.",
    date: "2026-02-05",
    readTime: "5 min read",
    category: "Hygiene Guide",
    metaTitle:
      "Napkin Incinerator vs Sanitary Bio Bin — Which is Better? | Lyra Enterprises",
    metaDescription:
      "Incinerator vs bio bin for sanitary waste disposal in India. Health risks, compliance, cost comparison — full guide. Lyra Enterprises Chennai manufacturer.",
    keywords: [
      "napkin incinerator vs bio bin",
      "best sanitary waste disposal india",
      "incinerator or bin for napkins",
    ],
  },
  {
    slug: "manual-vs-automatic-napkin-vending-machine",
    title: "Manual vs Automatic Sanitary Napkin Vending Machine — Which Is Right for You?",
    excerpt:
      "Push Button machines cost less upfront. Coin/UPI automatics cost more but add payment automation. Here's exactly when to choose each — and how to avoid the wrong pick.",
    date: "2026-02-20",
    readTime: "6 min read",
    category: "Buying Guide",
    metaTitle:
      "Manual vs Automatic Napkin Vending Machine India 2026 — Full Comparison | Lyra Enterprises",
    metaDescription:
      "Compare manual and automatic sanitary napkin vending machines — price, features, maintenance, and which is best for your school, office or hospital in India. Lyra Enterprises guide.",
    keywords: [
      "manual vs automatic vending machine india",
      "sanitary napkin vending machine comparison india",
      "which napkin vending machine to buy india",
      "manual napkin vending machine price india",
    ],
  },
  {
    slug: "solid-waste-management-rules-2016-india-guide",
    title: "Solid Waste Management Rules 2016 — What Every Institution Must Know",
    excerpt:
      "India's SWM Rules 2016 legally mandate segregated menstrual waste disposal. Non-compliance risks fines. Here's what your institution must do.",
    date: "2026-03-01",
    readTime: "7 min read",
    category: "Compliance",
    metaTitle:
      "Solid Waste Management Rules 2016 India — Menstrual Waste Compliance Guide | Lyra Enterprises",
    metaDescription:
      "Everything institutions need to know about Solid Waste Management Rules 2016 for menstrual waste. CPCB compliance, required equipment, penalties. Lyra Enterprises India.",
    keywords: [
      "solid waste management rules 2016 india",
      "swm rules menstrual waste india",
      "cpcb menstrual waste disposal india",
      "swachh bharat menstrual hygiene india",
    ],
  },
];
