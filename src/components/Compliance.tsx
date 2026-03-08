"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const badges = [
  {
    icon: "🏭",
    label: "ISO 9001:2015",
    sublabel: "Quality Management",
    color: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  {
    icon: "🌿",
    label: "ISO 14001:2015",
    sublabel: "Environmental Management",
    color: "from-green-50 to-green-100",
    border: "border-green-200",
    text: "text-green-700",
  },
  {
    icon: "✅",
    label: "CE Certified",
    sublabel: "European Safety Standard",
    color: "from-indigo-50 to-indigo-100",
    border: "border-indigo-200",
    text: "text-indigo-700",
  },
  {
    icon: "♻️",
    label: "CPCB Compliant",
    sublabel: "Central Pollution Control Board",
    color: "from-teal-50 to-teal-100",
    border: "border-teal-200",
    text: "text-teal-700",
  },
  {
    icon: "🇮🇳",
    label: "GeM Registered",
    sublabel: "Govt e-Marketplace Vendor",
    color: "from-orange-50 to-orange-100",
    border: "border-orange-200",
    text: "text-orange-700",
  },
  {
    icon: "🧹",
    label: "SWM Rules 2016",
    sublabel: "Swachh Bharat Compliant",
    color: "from-primary-50 to-pink-50",
    border: "border-primary-200",
    text: "text-primary-700",
  },
];

export default function Compliance() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="compliance"
      className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold tracking-wider uppercase mb-5">
            Certifications &amp; Compliance
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted, Certified &amp;{" "}
            <span className="text-gradient">Government Approved</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Every Lyra product meets India&apos;s highest hygiene and safety
            standards — CPCB, SWM Rules 2016, and Swachh Bharat Mission
            guidelines. We are also a registered GeM (Government e-Marketplace)
            vendor, making procurement easy for government schools, hospitals
            and institutions.
          </p>
        </motion.div>

        {/* Badges grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-br ${badge.color} border ${badge.border} hover:shadow-md transition-shadow duration-300`}
            >
              <span className="text-3xl mb-3" role="img" aria-label={badge.label}>
                {badge.icon}
              </span>
              <p className={`font-bold text-sm leading-tight ${badge.text}`}>
                {badge.label}
              </p>
              <p className="text-gray-500 text-xs mt-1 leading-snug">
                {badge.sublabel}
              </p>
            </motion.div>
          ))}
        </div>

        {/* GeM callout strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl" role="img" aria-label="GeM Portal">🇮🇳</span>
            <div>
              <p className="font-bold text-gray-900 text-base">
                GeM Registered Vendor
              </p>
              <p className="text-gray-600 text-sm">
                Government schools, hospitals and Swachh Bharat institutions can procure Lyra products directly through the{" "}
                <strong>Government e-Marketplace (GeM) portal</strong> — no separate tender process needed.
              </p>
            </div>
          </div>
          <a
            href="tel:+918122378860"
            className="flex-shrink-0 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full text-sm transition-colors duration-200 whitespace-nowrap"
          >
            Ask for GeM Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
