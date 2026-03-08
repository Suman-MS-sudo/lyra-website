"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

type Product = {
  name: string;
  slug: string;
  code: string;
  price: string;
  badge: string;
  popular?: boolean;
  features: string[];
  accent: string;
};

const vendingMachines: Product[] = [
  {
    name: "Solo Manual",
    slug: "solo-manual-vending-machine",
    code: "Lyra/SNVM/SM",
    price: "₹5,000",
    badge: "Free Vend",
    features: ["Push-to-dispense, no payment", "25 napkins capacity", "For sponsored facilities"],
    accent: "from-slate-400 to-slate-600",
  },
  {
    name: "Push Button",
    slug: "push-button-vending-machine",
    code: "Lyra/SNVM/PB",
    price: "₹11,500",
    badge: "Essential",
    features: ["Manual dispensing", "25 napkins capacity", "Tamper-proof body"],
    accent: "from-gray-400 to-gray-600",
  },
  {
    name: "Solo Coin",
    slug: "solo-coin-vending-machine",
    code: "Lyra/SNVM/SC",
    price: "₹12,500",
    badge: "Standard",
    features: ["₹5 coin acceptor", "25 napkins capacity", "Anti-jam mechanism"],
    accent: "from-primary-400 to-primary-600",
  },
  {
    name: "Solo RFID",
    slug: "solo-rfid-vending-machine",
    code: "Lyra/SNVM/RF",
    price: "₹12,500",
    badge: "Contactless",
    features: ["RFID / smart card tap", "25 napkins capacity", "ISO 14443/15693 compatible"],
    accent: "from-teal-400 to-cyan-600",
  },
  {
    name: "Solo WiFi",
    slug: "solo-wifi-vending-machine",
    code: "Lyra/SNVM/W-QR-SC",
    price: "₹22,500",
    badge: "Most Popular",
    popular: true,
    features: ["UPI QR + Coin payment", "WiFi connectivity", "Cloud-based reports"],
    accent: "from-pink-400 to-primary-500",
  },
  {
    name: "Solo Ethernet",
    slug: "solo-ethernet-vending-machine",
    code: "Lyra/SNVM/ET-QR-SC",
    price: "₹24,500",
    badge: "Premium",
    features: ["UPI QR + Coin payment", "Ethernet / LAN", "99.9% uptime"],
    accent: "from-fuchsia-400 to-primary-600",
  },
];

const incinerators: Product[] = [
  {
    name: "Lyra Micro",
    slug: "lyra-micro-incinerator",
    code: "Lyra/SND/Micro",
    price: "₹13,500",
    badge: "Compact",
    features: ["1–5 napkins/cycle", "Front loading", "230V, 1.25kW"],
    accent: "from-primary-300 to-primary-500",
  },
  {
    name: "Lyra Mini",
    slug: "lyra-mini-incinerator",
    code: "Lyra/SND/Mini",
    price: "₹18,500",
    badge: "Standard",
    features: ["5–15 napkins/cycle", "IoT WiFi add-on", "Front loading"],
    accent: "from-primary-400 to-primary-600",
  },
  {
    name: "Lyra Maxi",
    slug: "lyra-maxi-incinerator",
    code: "Lyra/SND/Maxi",
    price: "₹39,500",
    badge: "High Capacity",
    features: ["25–50 napkins/cycle", "Top loading", "IoT WiFi add-on"],
    accent: "from-pink-400 to-primary-700",
  },
];

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`group relative bg-white rounded-3xl overflow-hidden flex flex-col transition-all duration-300
        ${product.popular
          ? "shadow-xl hover:shadow-2xl ring-2 ring-primary-400 ring-offset-2"
          : "shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary-100"
        }`}
    >
      {/* Gradient header panel */}
      <div className={`relative h-40 bg-gradient-to-br ${product.accent} overflow-hidden`}>
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
        {/* Ghost name watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white/[0.12] text-8xl font-black tracking-tight leading-none select-none">
            {product.name.split(" ").pop()}
          </span>
        </div>
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/20 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            {product.badge}
          </span>
        </div>
        {product.popular && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow">
              ★ Popular
            </span>
          </div>
        )}
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">{product.code}</p>
        <h3 className="mt-1 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
          {product.name}
        </h3>

        <ul className="mt-4 space-y-2 flex-1">
          {product.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br ${product.accent} flex items-center justify-center`}>
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                  <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {feat}
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-end justify-between mb-3.5">
            <div>
              <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{product.price}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">excl. 18% GST</p>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors"
            >
              View Details →
            </Link>
          </div>
          <Link
            href="#contact"
            className={`w-full py-2.5 text-center text-sm font-bold rounded-xl bg-gradient-to-r ${product.accent} text-white hover:opacity-90 hover:shadow-md active:scale-[0.98] transition-all duration-200 block`}
          >
            Get Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryHeader({
  title,
  sub,
  count,
  href,
}: {
  title: string;
  sub: string;
  count?: number;
  href?: string;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100"
    >
      <div className="flex items-center gap-4">
        <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-primary-400 to-pink-500 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">{title}</h3>
            {count && (
              <span className="px-2.5 py-0.5 text-xs font-bold text-primary-600 bg-primary-50 border border-primary-200 rounded-full">
                {count} models
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
        </div>
      </div>
      {href && (
        <Link href={href} className="text-sm font-semibold text-primary-600 hover:text-primary-800 hover:underline hidden sm:flex items-center gap-1 shrink-0">
          View All →
        </Link>
      )}
    </motion.div>
  );
}

export default function Products() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="products"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-pink-blush/20 to-white"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      <div className="absolute -right-40 top-40 w-[500px] h-[500px] rounded-full bg-primary-100/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-60 bottom-40 w-[400px] h-[400px] rounded-full bg-pink-100/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold tracking-wider uppercase mb-6">
            Product Range
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
            From <span className="text-gradient">Basic</span> to{" "}
            <span className="text-gradient">Smart</span> — a Solution for Every Space
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Every product is precision-engineered in Chennai, shipped across
            India, and backed by our expert support team.
          </p>
          {/* Stats strip */}
          <div className="inline-flex items-center gap-2 flex-wrap justify-center text-sm text-gray-500 font-medium">
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">6 VM&nbsp;Models</span>
            <span className="text-gray-300">·</span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">3 Incinerators</span>
            <span className="text-gray-300">·</span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-primary-600 font-semibold">From ₹5,000</span>
          </div>
        </motion.div>

        {/* Vending Machines */}
        <CategoryHeader
          title="Vending Machines"
          sub="Sanitary napkin dispensers for every environment"
          count={6}
          href="/products/sanitary-napkin-vending-machines"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {vendingMachines.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>

        {/* Incinerators */}
        <CategoryHeader
          title="Sanitary Napkin Incinerators"
          sub="Eco-friendly, safe disposal systems"
          count={3}
          href="/products/sanitary-napkin-incinerators"
        />
        <div className="grid sm:grid-cols-3 gap-5">
          {incinerators.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
