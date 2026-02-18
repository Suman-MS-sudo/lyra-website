export const SITE = {
  name: "Lyra Enterprise",
  tagline: "#1 Vending Machine & Incinerator Manufacturer India",
  url: "https://www.lyraenterprise.co.in",
  phone: "+91-8122378860",
  phoneDisplay: "+91-81223 78860",
  email: "sales@lyraenterprise.co.in",
  address: "10/21, Vasuki Street, Cholapuram, Ambattur, Chennai – 600053",
  city: "Chennai",
  state: "Tamil Nadu",
  whatsapp: "https://wa.me/918122378860?text=Hi%21%20I%27m%20interested%20in%20Lyra%20Enterprise%27s%20vending%20machines%20%2F%20incinerators.%20Please%20share%20details.",
};

export type Product = {
  slug: string;
  name: string;
  fullName: string;
  code: string;
  category: "vending-machine" | "incinerator";
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
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
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
    discountedPrice: 10000,
    badge: "Essential",
    tagline: "Simple, reliable dispensing for every facility",
    description:
      "Manual push-button sanitary napkin vending machine. Ideal for schools, hostels and budget-conscious institutions.",
    longDescription:
      "The Lyra Push Button sanitary napkin vending machine is the most affordable and reliable dispensing solution for educational institutions, government facilities and small offices across India. With a straightforward manual operation, it requires zero maintenance and works without any electricity-based payment system. The tamper-proof stainless steel body and transparent view panel make restocking easy for facility managers. Trusted by 50+ schools and government institutions across Tamil Nadu and Kerala.",
    features: [
      "Manual push-button dispensing",
      "30 napkins capacity",
      "Electronic operation",
      "Transparent view panel",
      "Tamper-proof body",
      "Wall-mountable design",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "30 napkins" },
      { label: "Operation", value: "Manual push-button" },
      { label: "Power", value: "Not required" },
      { label: "Material", value: "Powder-coated steel" },
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
    keywords: [
      "push button vending machine india",
      "manual napkin vending machine",
      "sanitary napkin machine for schools",
      "cheap napkin vending machine india",
      "napkin dispenser machine school",
    ],
    metaTitle:
      "Push Button Sanitary Napkin Vending Machine — Buy Online India | Lyra Enterprise",
    metaDescription:
      "Buy Lyra Push Button sanitary napkin vending machine at ₹10,000. Manual dispensing, 30-napkin capacity. Best for schools, hostels & government facilities. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-coin-vending-machine",
    name: "Solo Coin",
    fullName: "Solo Coin Operated Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/SC",
    category: "vending-machine",
    price: 12500,
    discountedPrice: 11500,
    badge: "Standard",
    tagline: "Coin-operated hygiene on demand, 24×7",
    description:
      "₹5 coin-operated sanitary napkin vending machine. Perfect for public toilets, malls, railway stations and corporate offices.",
    longDescription:
      "The Lyra Solo Coin sanitary napkin vending machine is India's best-selling coin-operated dispensing solution. Accepting ₹5 coins, it provides hygienic, on-demand access to sanitary napkins in public restrooms, shopping malls, railway stations, corporate offices and educational institutions. The robust coin acceptor is tested for 100,000+ cycles. The compact 700×160×160 mm body fits standard wall spaces. No internet or electricity payment infrastructure required — making it ideal for locations with basic amenities.",
    features: [
      "₹5 coin acceptor",
      "30 napkins capacity",
      "Electronic operation",
      "Transparent view panel",
      "Anti-jam mechanism",
      "Tamper-proof lock",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "30 napkins" },
      { label: "Payment", value: "₹5 coin" },
      { label: "Power", value: "230V AC / Battery backup" },
      { label: "Material", value: "Powder-coated steel" },
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
    keywords: [
      "coin operated vending machine india",
      "coin napkin vending machine",
      "5 rupee coin vending machine",
      "sanitary napkin coin machine",
      "public toilet napkin machine india",
    ],
    metaTitle:
      "Coin Operated Sanitary Napkin Vending Machine — ₹5 Coin | Lyra Enterprise India",
    metaDescription:
      "Buy Lyra Solo Coin sanitary napkin vending machine at ₹11,500. ₹5 coin acceptor, 30-napkin capacity. Best for malls, railway stations & offices. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-wifi-vending-machine",
    name: "Solo WiFi",
    fullName: "Solo WiFi UPI QR Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/W-QR-SC",
    category: "vending-machine",
    price: 24500,
    discountedPrice: 23500,
    badge: "Most Popular",
    popular: true,
    tagline: "Smart UPI + coin machine with cloud analytics",
    description:
      "WiFi-enabled sanitary napkin vending machine with UPI QR code & coin payment. Touch display, IoT monitoring and cloud reports.",
    longDescription:
      "The Lyra Solo WiFi is India's most advanced sanitary napkin vending machine — combining UPI QR code payments, coin operation, WiFi connectivity and a touch display panel in one compact unit. Real-time cloud-based reports let facility managers track dispensing count, revenue and refill alerts remotely. The IoT-enabled architecture integrates with existing building management systems. This is the #1 choice for technology-forward hospitals, IT parks, premium malls and smart campuses across India.",
    features: [
      "UPI QR code payment",
      "₹5 coin acceptor",
      "WiFi connectivity",
      "Touch display panel",
      "Cloud-based reports",
      "IoT remote monitoring",
      "Low stock alerts",
      "Usage analytics",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "30 napkins" },
      { label: "Payment", value: "UPI QR code + ₹5 coin" },
      { label: "Connectivity", value: "WiFi 2.4GHz" },
      { label: "Display", value: "Touch screen panel" },
      { label: "Power", value: "230V AC" },
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
    keywords: [
      "wifi vending machine india",
      "upi vending machine india",
      "qr code vending machine india",
      "iot vending machine india",
      "smart vending machine india",
      "cloud vending machine india",
      "touch screen vending machine india",
    ],
    metaTitle:
      "WiFi UPI QR Sanitary Napkin Vending Machine — Smart IoT | Lyra Enterprise India",
    metaDescription:
      "Buy Lyra Solo WiFi smart vending machine at ₹23,500. UPI QR + coin payment, WiFi IoT, cloud reports. Best for IT parks, hospitals & smart campuses. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "solo-ethernet-vending-machine",
    name: "Solo Ethernet",
    fullName: "Solo Ethernet UPI QR Sanitary Napkin Vending Machine",
    code: "Lyra/SNVM/ET-QR-SC",
    category: "vending-machine",
    price: 24500,
    discountedPrice: 23500,
    badge: "Premium",
    tagline: "Wired reliability for high-traffic institutions",
    description:
      "Ethernet-connected UPI QR vending machine for hospitals and large institutions requiring stable wired connectivity and cloud analytics.",
    longDescription:
      "The Lyra Solo Ethernet sanitary napkin vending machine offers the same smart features as the WiFi model — UPI QR payments, touch display and cloud analytics — but over a stable wired Ethernet connection. This makes it the preferred choice for hospitals, government buildings and large institutions where WiFi signals may be unreliable or security policies restrict wireless devices. The LAN connection ensures 99.9% uptime for payment processing and data reporting.",
    features: [
      "UPI QR code payment",
      "₹5 coin acceptor",
      "Ethernet (LAN) connectivity",
      "Touch display panel",
      "Cloud-based reports",
      "99.9% payment uptime",
      "Remote monitoring",
      "Low stock alerts",
    ],
    specs: [
      { label: "Dimensions", value: "700 × 160 × 160 mm" },
      { label: "Capacity", value: "30 napkins" },
      { label: "Payment", value: "UPI QR code + ₹5 coin" },
      { label: "Connectivity", value: "Ethernet / LAN" },
      { label: "Display", value: "Touch screen panel" },
      { label: "Power", value: "230V AC" },
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
    keywords: [
      "ethernet vending machine india",
      "wired vending machine india",
      "upi vending machine hospital",
      "lan vending machine india",
      "vending machine government hospital",
    ],
    metaTitle:
      "Ethernet UPI QR Sanitary Napkin Vending Machine — Wired IoT | Lyra Enterprise",
    metaDescription:
      "Buy Lyra Solo Ethernet vending machine at ₹23,500. Stable LAN connection, UPI QR + coin, cloud reports. Best for government hospitals & large institutions. Call +91-8122378860.",
  },

  // ─── INCINERATORS ────────────────────────────────────────────
  {
    slug: "lyra-micro-incinerator",
    name: "Lyra Micro",
    fullName: "Lyra Micro Sanitary Napkin Incinerator",
    code: "Lyra/SND/Micro",
    category: "incinerator",
    price: 13500,
    discountedPrice: 12500,
    badge: "Compact",
    tagline: "Compact, safe disposal for small facilities",
    description:
      "Compact sanitary napkin incinerator for 1–5 napkins per cycle. Ideal for small schools, clinics and offices.",
    longDescription:
      "The Lyra Micro is the most compact sanitary napkin incinerator available in India, designed for small to medium washrooms with limited wall space. Processing 1–5 napkins per cycle at up to 100 napkins per day, it completely burns sanitary waste at high temperature — eliminating odour, infection risk and manual handling. Digital temperature display ensures safe operation. Wall-mountable with a sleek stainless steel body, it meets CPCB (Central Pollution Control Board) hygiene guidelines for menstrual waste disposal.",
    features: [
      "1–5 napkins per cycle",
      "100 napkins/day capacity",
      "Digital temperature display",
      "Auto shut-off safety",
      "Wall mountable",
      "CPCB-compliant disposal",
      "Odour-free operation",
    ],
    specs: [
      { label: "Dimensions", value: "520 × 230 × 230 mm" },
      { label: "Cycle Capacity", value: "1–5 napkins" },
      { label: "Daily Capacity", value: "100 napkins/day" },
      { label: "Temperature", value: "Digital control" },
      { label: "Power", value: "230V AC, 1200W" },
      { label: "Mounting", value: "Wall mount" },
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
    keywords: [
      "micro incinerator india",
      "compact sanitary napkin incinerator",
      "napkin incinerator for schools india",
      "small incinerator machine india",
      "sanitary waste disposal machine small",
    ],
    metaTitle:
      "Lyra Micro Sanitary Napkin Incinerator — Compact Wall Mount | Buy India",
    metaDescription:
      "Buy Lyra Micro sanitary napkin incinerator at ₹12,500. 1–5 napkins/cycle, 100/day, digital temp control. Best for small schools & clinics. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "lyra-mini-incinerator",
    name: "Lyra Mini",
    fullName: "Lyra Mini Sanitary Napkin Incinerator",
    code: "Lyra/SND/Mini",
    category: "incinerator",
    price: 18500,
    discountedPrice: 17500,
    badge: "Standard",
    tagline: "Mid-capacity disposal for colleges and offices",
    description:
      "Mid-size sanitary napkin incinerator for 5–15 napkins per cycle. Perfect for colleges, medium offices and hospitals.",
    longDescription:
      "The Lyra Mini sanitary napkin incinerator handles 5–15 napkins per cycle, processing up to 100 napkins per day — making it the go-to choice for colleges, medium-sized corporate offices and community health centres. Unlike bio-bins that require manual emptying and create infection risk, the Lyra Mini completely incinerate'sanitary waste at high temperature, leaving only sterile ash. Compliant with Solid Waste Management Rules 2016 for menstrual waste. Includes digital temperature monitoring and wall-mount hardware.",
    features: [
      "5–15 napkins per cycle",
      "100 napkins/day capacity",
      "Digital temperature display",
      "Auto shut-off safety",
      "Wall mountable",
      "SWM Rules 2016 compliant",
      "Zero touch waste handling",
    ],
    specs: [
      { label: "Dimensions", value: "650 × 330 × 330 mm" },
      { label: "Cycle Capacity", value: "5–15 napkins" },
      { label: "Daily Capacity", value: "100 napkins/day" },
      { label: "Temperature", value: "Digital control" },
      { label: "Power", value: "230V AC, 1800W" },
      { label: "Mounting", value: "Wall mount" },
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
    keywords: [
      "mini incinerator india",
      "napkin incinerator for colleges india",
      "sanitary napkin incinerator office",
      "mid capacity incinerator india",
      "menstrual waste incinerator india",
    ],
    metaTitle:
      "Lyra Mini Sanitary Napkin Incinerator — 5 to 15 Napkins/Cycle | India",
    metaDescription:
      "Buy Lyra Mini sanitary napkin incinerator at ₹17,500. 5–15 napkins/cycle, 100/day, digital temp. Best for colleges & offices. SWM compliant. Chennai manufacturer. Call +91-8122378860.",
  },
  {
    slug: "lyra-maxi-incinerator",
    name: "Lyra Maxi",
    fullName: "Lyra Maxi High Capacity Sanitary Napkin Incinerator",
    code: "Lyra/SND/Maxi",
    category: "incinerator",
    price: 39500,
    discountedPrice: 38500,
    badge: "High Capacity",
    tagline: "Industrial-grade disposal for hospitals & institutions",
    description:
      "High-capacity sanitary napkin incinerator for 25–50 napkins per cycle. Designed for hospitals, large institutions and industrial use.",
    longDescription:
      "The Lyra Maxi is the highest-capacity sanitary napkin incinerator in Lyra Enterprise's range, handling 25–50 napkins per cycle — essential for large hospitals, government medical colleges, industrial facilities and large institutional campuses with high daily sanitary waste volumes. The top-loading design allows quick restocking. Robust 900×500×500 mm stainless steel construction is built for continuous operation. Fully compliant with Biomedical Waste Management Rules 2016. Includes remote temperature logging for hospital facility management teams.",
    features: [
      "25–50 napkins per cycle",
      "100+ napkins/day capacity",
      "Digital temperature display",
      "Top-loading design",
      "Auto shut-off safety",
      "Biomedical Waste Rules compliant",
      "Remote temperature logging",
      "Heavy-duty SS construction",
    ],
    specs: [
      { label: "Dimensions", value: "900 × 500 × 500 mm" },
      { label: "Cycle Capacity", value: "25–50 napkins" },
      { label: "Daily Capacity", value: "100+ napkins/day" },
      { label: "Temperature", value: "Digital + remote logging" },
      { label: "Power", value: "230V AC, 3000W" },
      { label: "Loading", value: "Top loading" },
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
    keywords: [
      "high capacity incinerator india",
      "hospital sanitary incinerator india",
      "large napkin incinerator india",
      "industrial incinerator india",
      "biomedical waste incinerator india",
    ],
    metaTitle:
      "Lyra Maxi High Capacity Sanitary Napkin Incinerator — Hospital Grade | India",
    metaDescription:
      "Buy Lyra Maxi high-capacity napkin incinerator at ₹38,500. 25–50 napkins/cycle. Hospital & industrial grade. Biomedical Waste Rules compliant. Chennai manufacturer. Call +91-8122378860.",
  },
];

export const vendingMachines = products.filter(
  (p) => p.category === "vending-machine"
);
export const incinerators = products.filter(
  (p) => p.category === "incinerator"
);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export type StateLocation = {
  slug: string;
  state: string;
  stateCode: string;
  capital: string;
  description: string;
  cities: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export const cities: StateLocation[] = [
  {
    slug: "vending-machine-tamil-nadu",
    state: "Tamil Nadu",
    stateCode: "TN",
    capital: "Chennai",
    description:
      "Lyra Enterprise is headquartered in Chennai, Tamil Nadu. We supply and install sanitary napkin vending machines and incinerators across all major cities and districts in Tamil Nadu.",
    cities: ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Vellore", "Erode", "Thanjavur", "Tiruppur"],
    metaTitle:
      "Sanitary Napkin Vending Machine in Tamil Nadu — Buy & Install | Lyra Enterprise",
    metaDescription:
      "Buy sanitary napkin vending machines & incinerators in Tamil Nadu. Lyra Enterprise Chennai manufacturer supplies to Chennai, Coimbatore, Madurai, Trichy & all districts. Call +91-8122378860.",
    keywords: [
      "vending machine tamil nadu",
      "napkin vending machine tamil nadu",
      "sanitary machine chennai",
      "incinerator tamil nadu",
      "vending machine manufacturer chennai",
      "napkin dispenser tamilnadu",
      "sanitary napkin machine coimbatore",
      "vending machine madurai",
    ],
  },
  {
    slug: "vending-machine-kerala",
    state: "Kerala",
    stateCode: "KL",
    capital: "Thiruvananthapuram",
    description:
      "Serving schools, hospitals, IT campuses and government offices across Kerala. Lyra Enterprise delivers to all 14 districts of Kerala with same-week dispatch.",
    cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram"],
    metaTitle:
      "Sanitary Napkin Vending Machine in Kerala — Buy & Install | Lyra Enterprise",
    metaDescription:
      "Buy sanitary napkin vending machines & incinerators in Kerala. Lyra Enterprise supplies to Kochi, Thiruvananthapuram, Kozhikode, Thrissur & all districts. Call +91-8122378860.",
    keywords: [
      "vending machine kerala",
      "napkin vending machine kerala",
      "sanitary machine kochi",
      "incinerator kerala",
      "vending machine kochi",
      "napkin dispenser kerala",
      "sanitary napkin machine thiruvananthapuram",
      "vending machine kozhikode",
    ],
  },
  {
    slug: "vending-machine-andhra-pradesh",
    state: "Andhra Pradesh",
    stateCode: "AP",
    capital: "Amaravati",
    description:
      "Supplying and installing sanitary napkin vending machines and incinerators across Andhra Pradesh — from Visakhapatnam to Tirupati. Ideal for schools, colleges, hospitals and government facilities.",
    cities: ["Visakhapatnam", "Vijayawada", "Tirupati", "Guntur", "Kakinada", "Nellore", "Kurnool", "Rajahmundry", "Kadapa", "Anantapur"],
    metaTitle:
      "Sanitary Napkin Vending Machine in Andhra Pradesh — Buy & Install | Lyra Enterprise",
    metaDescription:
      "Buy sanitary napkin vending machines & incinerators in Andhra Pradesh. Lyra Enterprise supplies to Visakhapatnam, Vijayawada, Tirupati & all districts. Call +91-8122378860.",
    keywords: [
      "vending machine andhra pradesh",
      "napkin vending machine andhra pradesh",
      "sanitary machine visakhapatnam",
      "incinerator andhra pradesh",
      "vending machine vijayawada",
      "napkin dispenser ap",
      "sanitary napkin machine tirupati",
      "vending machine guntur",
    ],
  },
  {
    slug: "vending-machine-karnataka",
    state: "Karnataka",
    stateCode: "KA",
    capital: "Bengaluru",
    description:
      "Serving IT parks, hospitals, educational institutions and government offices across Karnataka. Lyra Enterprise supplies to Bengaluru, Mysuru, Hubli, Mangaluru and all major Karnataka districts.",
    cities: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Tumkur", "Shivamogga", "Udupi"],
    metaTitle:
      "Sanitary Napkin Vending Machine in Karnataka — Buy & Install | Lyra Enterprise",
    metaDescription:
      "Buy sanitary napkin vending machines & incinerators in Karnataka. Lyra Enterprise supplies to Bengaluru, Mysuru, Hubli, Mangaluru & all districts. Call +91-8122378860.",
    keywords: [
      "vending machine karnataka",
      "napkin vending machine karnataka",
      "sanitary machine bangalore",
      "incinerator karnataka",
      "vending machine bangalore",
      "napkin dispenser karnataka",
      "sanitary napkin machine mysuru",
      "vending machine hubli",
    ],
  },
  {
    slug: "vending-machine-telangana",
    state: "Telangana",
    stateCode: "TG",
    capital: "Hyderabad",
    description:
      "Supplying and installing vending machines and incinerators across Telangana — from Hyderabad's IT corridors to schools and hospitals in Warangal, Nizamabad and Karimnagar.",
    cities: ["Hyderabad", "Secunderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad"],
    metaTitle:
      "Sanitary Napkin Vending Machine in Telangana — Buy & Install | Lyra Enterprise",
    metaDescription:
      "Buy sanitary napkin vending machines & incinerators in Telangana. Lyra Enterprise supplies to Hyderabad, Warangal, Nizamabad & all districts. Call +91-8122378860.",
    keywords: [
      "vending machine telangana",
      "napkin vending machine telangana",
      "sanitary machine hyderabad",
      "incinerator telangana",
      "vending machine hyderabad",
      "napkin dispenser telangana",
      "sanitary napkin machine warangal",
      "vending machine warangal",
    ],
  },
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
      "Why Every School Needs a Sanitary Napkin Vending Machine | Lyra Enterprise",
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
      "Compare UPI QR code vs coin-operated sanitary napkin vending machines. Price, features, maintenance costs — full guide to help you choose. Lyra Enterprise India.",
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
      "Napkin Incinerator vs Sanitary Bio Bin — Which is Better? | Lyra Enterprise",
    metaDescription:
      "Incinerator vs bio bin for sanitary waste disposal in India. Health risks, compliance, cost comparison — full guide. Lyra Enterprise Chennai manufacturer.",
    keywords: [
      "napkin incinerator vs bio bin",
      "best sanitary waste disposal india",
      "incinerator or bin for napkins",
    ],
  },
];
