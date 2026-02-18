"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const values = [
  {
    title: "Our Mission",
    description:
      "To become India's largest vending machine manufacturer by making premium sanitary hygiene solutions accessible in every school, office, hospital, and public space across India.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&auto=format&fit=crop&q=80",
    accent: "from-primary-400 to-primary-600",
  },
  {
    title: "Our Vision",
    description:
      "India's most trusted vending machine brand and premier incinerator supplier, championing feminine hygiene infrastructure and empowering every woman with dignity and privacy.",
    image:
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&auto=format&fit=crop&q=80",
    accent: "from-pink-400 to-primary-500",
  },
];

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-blush/40 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeUp>
          <div className="max-w-3xl mb-12 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold tracking-wider uppercase mb-6">
              India&apos;s #1 Vending Machine Manufacturer
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Built for{" "}
              <span className="text-gradient">Women&apos;s Dignity</span>.
              <br />
              Trusted by Institutions.
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              Lyra Enterprise is at the forefront of feminine hygiene
              infrastructure in India — crafting precision-engineered vending
              machines and incinerators that prioritize privacy, reliability,
              and sustainability.
            </p>
          </div>
        </FadeUp>

        {/* Mission / Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {values.map((val, i) => (
            <FadeUp key={val.title} delay={i * 0.15}>
              <div className="group relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-purple-lg transition-all duration-500 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={val.image}
                    alt={val.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${val.accent} opacity-60`}
                  />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {val.title}
                    </h3>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed text-base">
                    {val.description}
                  </p>
                  <div
                    className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r ${val.accent}`}
                  />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
