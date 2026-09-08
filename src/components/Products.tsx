"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";

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
  /** extra inset for source images that are cropped tighter than the rest */
  imgInset?: boolean;
};

const vendingMachines: Product[] = [
  {
    name: "Push Button",
    slug: "push-button-vending-machine",
    code: "Lyra/SNVM/PB",
    price: "₹11,000",
    badge: "Essential",
    features: ["Manual dispensing", "25 napkins capacity", "Tamper-proof body"],
    accent: "",
    image: "/images/products/push-button-vm.png",
  },
  {
    name: "Solo Coin",
    slug: "solo-coin-vending-machine",
    code: "Lyra/SNVM/SC",
    price: "₹12,500",
    badge: "Standard",
    features: ["₹5 coin acceptor", "25 napkins capacity", "Anti-jam mechanism"],
    accent: "",
    image: "/images/products/solo-coin.png",
  },
  {
    name: "Solo Multi",
    slug: "solo-multi-coin-vending-machine",
    code: "Lyra/SNVM/SC-M",
    price: "₹14,500",
    badge: "Multi-Coin",
    features: ["₹1 / ₹2 / ₹5 coin acceptor", "Configurable per-pad price", "25 napkins capacity"],
    accent: "",
    image: "/images/products/solo-multi.png",
  },
  {
    name: "Solo RFID",
    slug: "solo-rfid-vending-machine",
    code: "Lyra/SNVM/RFID",
    price: "₹15,000",
    badge: "RFID",
    features: ["RFID card / tag access", "Usage reports", "Contactless dispensing"],
    accent: "",
    image: "/images/products/solo-rfid.png",
  },
  {
    name: "Solo QR",
    slug: "solo-qr-vending-machine",
    code: "Lyra/SNVM/QR",
    price: "₹18,500",
    badge: "UPI / QR",
    features: ["UPI QR payment", "GPay & PhonePe", "SIM-based connectivity"],
    accent: "",
    image: "/images/products/solo-qr.png",
  },
  {
    name: "Solo Wave",
    slug: "solo-wave-vending-machine",
    code: "Lyra/SNVM/Wave",
    price: "₹22,000",
    badge: "Touchless",
    features: ["Touchless wave sensor", "Stainless steel cabinet", "LCD stock display"],
    accent: "",
    image: "/images/products/solo-wave.png",
    imgInset: true,
  },
  {
    name: "Solo WiFi",
    slug: "solo-wifi-vending-machine",
    code: "Lyra/SNVM/W-QR-SC",
    price: "₹24,500",
    badge: "Most Popular",
    popular: true,
    features: ["UPI QR + Coin payment", "WiFi + touch display", "Cloud-based reports"],
    accent: "",
    image: "/images/products/solo-wifi.png",
  },
  {
    name: "Solo Ethernet",
    slug: "solo-ethernet-vending-machine",
    code: "Lyra/SNVM/ET-QR-SC",
    price: "₹26,500",
    badge: "Premium",
    features: ["UPI QR + Coin payment", "Ethernet / LAN", "Touch display + cloud"],
    accent: "",
    image: "/images/products/solo-ethernet.png",
  },
];

const incinerators: Product[] = [
  {
    name: "Lyra Micro",
    slug: "lyra-micro-incinerator",
    code: "Lyra/SND/Micro",
    price: "₹12,500",
    badge: "Compact",
    features: ["1–5 napkins/cycle", "Front loading", "230V, 1.25kW"],
    accent: "",
    image: "/images/products/lyra-micro.png",
  },
  {
    name: "Lyra Mini",
    slug: "lyra-mini-incinerator",
    code: "Lyra/SND/Mini",
    price: "₹15,500",
    badge: "Standard",
    features: ["5–15 napkins/cycle", "IoT WiFi add-on", "Front loading"],
    accent: "",
    image: "/images/products/lyra-mini.png",
  },
  {
    name: "Lyra Maxi",
    slug: "lyra-maxi-incinerator",
    code: "Lyra/SND/Maxi",
    price: "₹39,500",
    badge: "High Capacity",
    features: ["25–50 napkins/cycle", "Top loading", "IoT WiFi add-on"],
    accent: "",
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
    accent: "",
    image: "/images/products/xl-napkin.png",
  },
  {
    name: "XXL Napkin",
    slug: "xxl-sanitary-napkin",
    code: "Lyra/SN/XXL",
    price: "₹10 / napkin",
    badge: "XXL",
    features: ["320 mm length", "Heavy-flow / overnight", "Individually wrapped"],
    accent: "",
    image: "/images/products/xxl-napkin.png",
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const gstNote = product.price.includes("napkin")
    ? "GST extra"
    : "+ 18% GST · freight extra";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className={`lyra-card lyra-card-hover group relative flex flex-col overflow-hidden ${
        product.popular ? "ring-1 ring-primary-500" : ""
      }`}
    >
      {/* hover accent */}
      <span className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-primary-600 transition-transform duration-300 group-hover:scale-x-100" />
      {/* Image panel */}
      <div className="relative aspect-square overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
            product.imgInset ? "p-12 sm:p-14" : "p-7"
          }`}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px"
        />
        <span className="absolute left-3 top-3 rounded-md border border-slate-200 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600 backdrop-blur-sm">
          {product.badge}
        </span>
        {product.popular && (
          <span className="absolute right-3 top-3 rounded-md bg-primary-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Popular
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
          {product.code}
        </p>
        <h3 className="mt-1 text-base font-semibold text-slate-900 transition-colors group-hover:text-primary-700 sm:text-lg">
          {product.name}
        </h3>

        <ul className="mt-4 flex-1 space-y-2.5">
          {product.features.slice(0, 3).map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-[13px] text-slate-600">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.5 8.5l3 3 6-7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="leading-snug">{feat}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">{product.price}</p>
              <p className="text-[11px] text-slate-400">{gstNote}</p>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
            >
              Details
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <Link
            href={`/products/${product.slug}#enquiry`}
            className="btn btn-primary mt-4 w-full"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </motion.article>
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
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
      <div className="flex items-start gap-4">
        <span className="mt-1 h-10 w-1 flex-shrink-0 rounded-full bg-primary-600" />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold text-slate-900 lg:text-2xl">{title}</h3>
            {count && (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                {count} models
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">{sub}</p>
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800 sm:flex"
        >
          View All →
        </Link>
      )}
    </div>
  );
}

export default function Products() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="products" className="section-padding bg-[#f6f8fc]">
      <div className="lyra-container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-20"
        >
          <div className="lyra-eyebrow mb-6">Product Range</div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            From <span className="text-gradient">Basic</span> to{" "}
            <span className="text-gradient">Smart</span> — a Solution for Every Space
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            Every product is precision-engineered in Chennai, shipped across
            India, and backed by our expert support team.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">8 VM&nbsp;Models</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">3 Incinerators</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">2 Napkin Variants</span>
          </div>
        </motion.div>

        {/* Vending Machines */}
        <CategoryHeader
          title="Vending Machines"
          sub="Sanitary napkin dispensers for every environment"
          count={8}
          href="/products/sanitary-napkin-vending-machines"
        />
        <div className="mb-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
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
        <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3">
          {incinerators.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>

        {/* Combo Offer Banner */}
        <Link
          href="/offers/push-button-micro-combo"
          className="my-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 px-6 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:px-8 sm:py-7"
        >
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-primary-300">
              🔥 Combo Offer
            </p>
            <p className="text-lg font-semibold text-white sm:text-xl">
              Push Button Vending Machine + Micro Incinerator — ₹19,999
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Full SWM Rules 2016 compliance in one order
            </p>
          </div>
          <span className="whitespace-nowrap rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900">
            View Offer →
          </span>
        </Link>

        {/* Sanitary Napkins */}
        <CategoryHeader
          title="Sanitary Napkins"
          sub="Compatible with all Lyra vending machines — XL & XXL variants"
          count={2}
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:max-w-xl">
          {napkins.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
