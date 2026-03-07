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
    name: "Push Button",
    slug: "push-button-vending-machine",
    code: "Lyra/SNVM/PB",
    price: "₹11,500",
    badge: "Essential",
    features: ["Manual dispensing", "25 napkins capacity", "Tamper-proof body"],
    accent: "from-gray-400 to-gray-600",
  },
  {
    name: "Solo Manual",
    slug: "solo-manual-vending-machine",
    code: "Lyra/SNVM/SM",
    price: "₹11,500",
    badge: "Free Vend",
    features: ["Push-to-dispense, no payment", "25 napkins capacity", "For sponsored facilities"],
    accent: "from-slate-400 to-slate-600",
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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Visual header */}
      <div className={`relative h-36 bg-gradient-to-br ${product.accent} overflow-hidden`}>
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            {product.badge}
          </span>
        </div>
        {product.popular && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full">
              ★ Popular
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white/15 text-7xl font-black tracking-tighter leading-none select-none">
            {product.name.split(" ").pop()}
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">{product.code}</p>
        <h3 className="mt-1 font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
          {product.name}
        </h3>

        <ul className="mt-3 space-y-1.5 flex-1">
          {product.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2 text-xs text-gray-500">
              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${product.accent} flex-shrink-0`} />
              {feat}
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-gray-900">{product.price}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">+ 18% GST applicable</p>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="text-xs font-semibold text-primary-500 hover:text-primary-700 hover:underline"
            >
              Details →
            </Link>
          </div>
          <Link
            href="#contact"
            className={`w-full py-2.5 text-center text-sm font-bold rounded-xl bg-gradient-to-r ${product.accent} text-white hover:opacity-90 hover:shadow-lg transition-all duration-200 block`}
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
      initial={{ opacity: 0, y: -20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-8"
    >
      <div className="flex items-center gap-4">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-primary-400 to-pink-400 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
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
        <Link href={href} className="text-sm font-semibold text-primary-600 hover:underline hidden sm:flex items-center gap-1">
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
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
      <div className="absolute -right-40 top-40 w-[500px] h-[500px] rounded-full bg-primary-100/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold tracking-wider uppercase mb-6">
            Product Innovation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
            From <span className="text-gradient">Basic</span> to{" "}
            <span className="text-gradient">Smart</span> — a Solution for Every Space
          </h2>
          <p className="text-lg text-gray-500">
            Every product is precision-engineered in Chennai, shipped across
            India, and backed by our expert support team.
          </p>
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
