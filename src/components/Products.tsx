"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";

type Product = {
  name: string;
  slug: string;
  code: string;
  price: string;
  badge: string;
  popular?: boolean;
  features: string[];
  accent: string;
  image: string;
};

const vendingMachines: Product[] = [
  {
    name: "Push Button",
    slug: "push-button-vending-machine",
    code: "Lyra/SNVM/PB",
    price: "₹9,000",
    badge: "Essential",
    features: ["Manual dispensing", "25 napkins capacity", "Tamper-proof body"],
    accent: "from-gray-400 to-gray-600",
    image: "/images/products/push-button-vm.png",
  },
  {
    name: "Solo Coin",
    slug: "solo-coin-vending-machine",
    code: "Lyra/SNVM/SC",
    price: "₹9,500",
    badge: "Standard",
    features: ["₹5 coin acceptor", "25 napkins capacity", "Anti-jam mechanism"],
    accent: "from-primary-400 to-primary-600",
    image: "/images/products/solo-coin.png",
  },
  {
    name: "Solo RFID",
    slug: "solo-rfid-vending-machine",
    code: "Lyra/SNVM/RF",
    price: "₹13,000",
    badge: "RFID",
    features: ["RFID card / tag access", "25 napkins capacity", "Contactless dispensing"],
    accent: "from-teal-400 to-cyan-600",
    image: "/images/products/solo-rfid.png",
  },
  {
    name: "Solo QR",
    slug: "solo-qr-vending-machine",
    code: "Lyra/SNVM/QR",
    price: "₹15,000",
    badge: "QR + Coin",
    features: ["UPI QR + coin payment", "25 napkins capacity", "SIM-based connectivity"],
    accent: "from-pink-400 to-rose-500",
    image: "/images/products/solo-qr.png",
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
    image: "/images/products/solo-wifi.png",
  },
  {
    name: "Solo Ethernet",
    slug: "solo-ethernet-vending-machine",
    code: "Lyra/SNVM/ET-QR-SC",
    price: "₹24,500",
    badge: "Premium",
    features: ["UPI QR + Coin payment", "Ethernet / LAN", "99.9% uptime"],
    accent: "from-fuchsia-400 to-primary-600",
    image: "/images/products/solo-ethernet.png",
  },
];

const incinerators: Product[] = [
  {
    name: "Lyra Micro",
    slug: "lyra-micro-incinerator",
    code: "Lyra/SND/Micro",
    price: "₹9,500",
    badge: "Compact",
    features: ["1–5 napkins/cycle", "Front loading", "230V, 1.25kW"],
    accent: "from-primary-300 to-primary-500",
    image: "/images/products/lyra-micro.png",
  },
  {
    name: "Lyra Mini",
    slug: "lyra-mini-incinerator",
    code: "Lyra/SND/Mini",
    price: "₹12,500",
    badge: "Standard",
    features: ["5–15 napkins/cycle", "IoT WiFi add-on", "Front loading"],
    accent: "from-primary-400 to-primary-600",
    image: "/images/products/lyra-mini.png",
  },
  {
    name: "Lyra Maxi",
    slug: "lyra-maxi-incinerator",
    code: "Lyra/SND/Maxi",
    price: "₹30,000",
    badge: "High Capacity",
    features: ["25–50 napkins/cycle", "Top loading", "IoT WiFi add-on"],
    accent: "from-pink-400 to-primary-700",
    image: "/images/products/lyra-maxi.png",
  },
];

const napkins: Product[] = [
  {
    name: "XL Napkin",
    slug: "xl-sanitary-napkin",
    code: "Lyra/SN/XL",
    price: "₹5 / napkin",
    badge: "XL",
    features: ["280 mm length", "Regular-flow protection", "Individually wrapped"],
    accent: "from-pink-300 to-rose-400",
    image: "/images/products/xl-napkin.png",
  },
  {
    name: "XXL Napkin",
    slug: "xxl-sanitary-napkin",
    code: "Lyra/SN/XXL",
    price: "₹10 / napkin",
    badge: "XXL",
    features: ["320 mm length", "Heavy-flow / overnight", "Individually wrapped"],
    accent: "from-fuchsia-300 to-pink-500",
    image: "/images/products/xxl-napkin.png",
  },
];

function EnquiryButton({ slug }: { slug: string }) {
  return (
    <div className="space-y-2">
      <Link
        href={`/products/${slug}#enquiry`}
        className="block w-full py-3.5 text-center text-sm font-bold rounded-2xl bg-gradient-to-r from-primary-600 to-pink-500 hover:from-primary-700 hover:to-pink-600 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      >
        Send Enquiry for Rate
      </Link>
    </div>
  );
}

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
      className={`group relative bg-white rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2
        ${product.popular
          ? "shadow-3xl hover:shadow-3xl ring-2 ring-primary-400/50 ring-offset-4 shadow-glow"
          : "shadow-card hover:shadow-card-hover border border-gray-100/50 hover:border-primary-200"
        }`}
    >
      {/* Modern gradient header with large image */}
      <div className={`relative h-52 bg-gradient-to-br ${product.accent} overflow-hidden`}>
        {/* Animated gradient orbs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/8 animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/8 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/5 animate-pulse delay-500" />
        
        {/* Large centered product image */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 group-hover:scale-110 transition-transform duration-500">
            {/* Enhanced image background with glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl group-hover:bg-white/25 transition-all duration-500"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute inset-0 rounded-2xl shadow-inner"></div>
            
            {/* Product image */}
            <div className="absolute inset-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
              />
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-white/10 group-hover:to-white/20 transition-all duration-500"></div>
          </div>
        </div>
        
        {/* Modern badge with better styling */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-4 py-2 bg-black/25 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-lg">
            {product.badge}
          </span>
        </div>
        
        {/* Popular badge with animation */}
        {product.popular && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-4 py-2 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-2xl shadow-lg animate-bounce">
              ⭐ Popular
            </span>
          </div>
        )}
        
        {/* Modern bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Enhanced content section */}
      <div className="p-4 sm:p-6 flex flex-col flex-1 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-500 font-mono tracking-wider uppercase bg-gray-100 px-2 py-1 rounded-lg">{product.code}</p>
          <div className="flex items-center gap-1 text-yellow-500">
            {"⭐".repeat(5)}
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight mb-4">
          {product.name}
        </h3>

        <ul className="space-y-3 flex-1">
          {product.features.slice(0, 3).map((feat, idx) => (
            <li key={feat} className="flex items-start gap-3 text-sm text-gray-700">
              <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-lg bg-gradient-to-br ${product.accent} flex items-center justify-center shadow-sm`}>
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                  <path d="M2.5 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-medium leading-snug">{feat}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-5 border-t border-gray-200/60">
          <div className="flex items-end justify-between mb-4">
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-primary-600">Contact for pricing</p>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group/link"
            >
              Details
              <svg className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <EnquiryButton slug={product.slug} />
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
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20"
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
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">2 Napkin Variants</span>
            <span className="text-gray-300">·</span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-primary-600 font-semibold">From ₹5</span>
          </div>
        </motion.div>

        {/* Vending Machines */}
        <CategoryHeader
          title="Vending Machines"
          sub="Sanitary napkin dispensers for every environment"
          count={6}
          href="/products/sanitary-napkin-vending-machines"
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-14 sm:mb-20">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 mb-14 sm:mb-20">
          {incinerators.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>

        {/* Sanitary Napkins */}
        <CategoryHeader
          title="Sanitary Napkins"
          sub="Compatible with all Lyra vending machines — XL & XXL variants"
          count={2}
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {napkins.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
