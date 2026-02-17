"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

type Product = {
  name: string;
  code: string;
  price: string;
  discountedPrice: string;
  badge: string;
  popular?: boolean;
  features: string[];
  accent: string;
};

const vendingMachines: Product[] = [
  {
    name: "Push Button",
    code: "Lyra/SNVM/PB",
    price: "₹11,000",
    discountedPrice: "₹10,000",
    badge: "Essential",
    features: [
      "Manual dispensing",
      "30 napkins capacity",
      "Electronic operation",
      "700×160×160 mm",
      "View panel provided",
    ],
    accent: "from-gray-400 to-gray-600",
  },
  {
    name: "Solo Coin",
    code: "Lyra/SNVM/SC",
    price: "₹12,500",
    discountedPrice: "₹11,500",
    badge: "Standard",
    features: [
      "₹5 coin acceptor",
      "30 napkins capacity",
      "Electronic operation",
      "700×160×160 mm",
      "View panel provided",
    ],
    accent: "from-primary-400 to-primary-600",
  },
  {
    name: "Solo WiFi",
    code: "Lyra/SNVM/W-QR-SC",
    price: "₹24,500",
    discountedPrice: "₹23,500",
    badge: "Most Popular",
    popular: true,
    features: [
      "UPI QR + Coin payment",
      "WiFi connectivity",
      "Touch display panel",
      "Cloud-based reports",
      "700×160×160 mm",
    ],
    accent: "from-pink-400 to-primary-500",
  },
  {
    name: "Solo Ethernet",
    code: "Lyra/SNVM/ET-QR-SC",
    price: "₹24,500",
    discountedPrice: "₹23,500",
    badge: "Premium",
    features: [
      "UPI QR + Coin payment",
      "Ethernet connectivity",
      "Touch display panel",
      "Cloud-based reports",
      "700×160×160 mm",
    ],
    accent: "from-fuchsia-400 to-primary-600",
  },
];

const incinerators: Product[] = [
  {
    name: "Lyra Micro",
    code: "Lyra/SND",
    price: "₹13,500",
    discountedPrice: "₹12,500",
    badge: "Compact",
    features: [
      "1–5 napkin capacity",
      "100 napkins/day",
      "Digital temperature",
      "520×230×230 mm",
      "Wall mounting",
    ],
    accent: "from-primary-300 to-primary-500",
  },
  {
    name: "Lyra Mini",
    code: "Lyra/SND",
    price: "₹18,500",
    discountedPrice: "₹17,500",
    badge: "Standard",
    features: [
      "5–15 napkins capacity",
      "100 napkins/day",
      "Digital temperature",
      "650×330×330 mm",
      "Wall mounting",
    ],
    accent: "from-primary-400 to-primary-600",
  },
  {
    name: "Lyra Maxi",
    code: "Lyra/SND",
    price: "₹39,500",
    discountedPrice: "₹38,500",
    badge: "High Capacity",
    features: [
      "25–50 napkins capacity",
      "100 napkins/day",
      "Digital temperature",
      "900×500×500 mm",
      "Top loading",
    ],
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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group rounded-3xl overflow-hidden bg-white border transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-lg ${
        product.popular
          ? "border-primary-300 shadow-purple"
          : "border-gray-100 shadow-sm"
      }`}
    >
      {product.popular && (
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.accent}`}
        />
      )}

      <div className="p-7">
        {/* Badge */}
        <div className="flex items-center justify-between mb-5">
          <span
            className={`px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${product.accent}`}
          >
            {product.badge}
          </span>
          {product.popular && (
            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
              ★ Popular
            </span>
          )}
        </div>

        {/* Name & Code */}
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 font-mono mb-5">{product.code}</p>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display text-4xl font-bold text-gradient">
              {product.discountedPrice}
            </span>
            <span className="text-base text-gray-400 line-through font-medium">
              {product.price}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm text-gray-400 font-medium">+ 18% GST</span>
          </div>
        </div>

        {/* Women's Day tag */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#6B1FA8]/10 to-[#E8477A]/10 border border-[#A0268A]/20 mb-5 w-fit">
          <span className="text-xs">🌸</span>
          <span className="text-xs font-bold text-[#A0268A]">Women&apos;s Day — ₹1,000 OFF</span>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-8">
          {product.features.map((feat) => (
            <li key={feat} className="flex items-center gap-3 text-sm text-gray-600">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${product.accent} flex-shrink-0 flex items-center justify-center`}>
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="#contact"
          className={`w-full py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 block text-center ${
            product.popular
              ? `text-white bg-gradient-to-r ${product.accent} shadow-purple hover:shadow-purple-lg hover:-translate-y-0.5`
              : "text-primary-600 bg-primary-50 border border-primary-200 hover:bg-primary-100"
          }`}
        >
          Request Quote
        </Link>
      </div>
    </motion.div>
  );
}

function CategoryHeader({ title, sub }: { title: string; sub: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-6 mb-10"
    >
      <div>
        <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{sub}</p>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-primary-200 to-transparent" />
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
        />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {vendingMachines.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>

        {/* Incinerators */}
        <CategoryHeader
          title="Sanitary Napkin Incinerators"
          sub="Eco-friendly, safe disposal systems"
        />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {incinerators.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
