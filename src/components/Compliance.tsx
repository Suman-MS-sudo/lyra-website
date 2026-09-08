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
    color: "from-sky-50 to-sky-100",
    border: "border-sky-200",
    text: "text-sky-700",
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
    color: "from-primary-50 to-blue-50",
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
      className="section-padding bg-[#f6f8fc]"
    >
      <div className="lyra-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="lyra-eyebrow mb-5">
            Certifications &amp; Compliance
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Trusted, Certified &amp;{" "}
            <span className="text-gradient">Government Approved</span>
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
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
              className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(30,58,138,0.08)]"
            >
              <span className="mb-3 text-3xl" role="img" aria-label={badge.label}>
                {badge.icon}
              </span>
              <p className="text-sm font-semibold leading-tight text-slate-900">
                {badge.label}
              </p>
              <p className="mt-1 text-xs leading-snug text-slate-500">
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
          className="mt-10 rounded-2xl bg-amber-50 border border-amber-200 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl" role="img" aria-label="GeM Portal">🇮🇳</span>
            <div>
              <p className="font-semibold text-slate-900 text-base">
                GeM Registered Vendor
              </p>
              <p className="text-slate-600 text-sm">
                Government schools, hospitals and Swachh Bharat institutions can procure Lyra products directly through the{" "}
                <strong>Government e-Marketplace (GeM) portal</strong> — no separate tender process needed.
              </p>
            </div>
          </div>
          <a
            href="tel:+918122378860"
            className="flex-shrink-0 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm transition-colors duration-200 whitespace-nowrap"
          >
            Ask for GeM Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
