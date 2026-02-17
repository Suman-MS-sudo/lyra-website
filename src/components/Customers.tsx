"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const customers = [
  {
    name: "Larsen & Toubro",
    short: "L&T",
    logo: "/images/customers/lnt.png",
    category: "Infrastructure",
  },
  {
    name: "Saint-Gobain",
    short: "SG",
    logo: "/images/customers/saint-gobain.png",
    category: "Manufacturing",
  },
  {
    name: "DG Vaishnav College",
    short: "DGV",
    logo: "/images/customers/dg-vaishnav.png",
    category: "Education",
  },
  {
    name: "Stella Maris College",
    short: "SM",
    logo: "/images/customers/stella-maris.png",
    category: "Education",
  },
  {
    name: "Mar Baselios College",
    short: "MB",
    logo: "/images/customers/mar-baselios.png",
    category: "Education",
  },
];

const testimonials = [
  {
    content:
      "Lyra's vending machine has been a game-changer for our female employees. Reliable, discreet, and zero maintenance issues in 2 years.",
    author: "Facilities Manager",
    company: "Leading IT Corporation, Chennai",
    initials: "FM",
  },
  {
    content:
      "We installed Lyra machines in all 12 women's restrooms across campus. The students love it, and the college administration is extremely satisfied.",
    author: "Principal",
    company: "Women's College, Tamil Nadu",
    initials: "P",
  },
  {
    content:
      "Exceptional product quality and after-sales support. The IoT dashboard helps us monitor all machines remotely. Highly recommended.",
    author: "Hospital Administrator",
    company: "Multi-specialty Hospital, Bangalore",
    initials: "HA",
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

export default function Customers() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="customers"
      className="section-padding relative overflow-hidden bg-white"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-blush/10 to-primary-50/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-100/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold tracking-wider uppercase mb-6">
            Trusted Partners
          </div>
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Trusted by{" "}
            <span className="text-gradient">India&apos;s Leading</span> Organizations
          </h2>
          <p className="text-lg text-gray-500">
            From Fortune 500 companies to premier educational institutions — Lyra
            machines are installed where quality truly matters.
          </p>
        </motion.div>

        {/* Customer Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
          {customers.map((customer, i) => (
            <FadeUp key={customer.name} delay={i * 0.08}>
              <div
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-purple hover:border-primary-100 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-20 h-16 mb-3">
                  <Image
                    src={customer.logo}
                    alt={customer.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                    onError={() => {}}
                  />
                  {/* Fallback */}
                  <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-gradient opacity-0 group-[.img-error]:opacity-100">
                    {customer.short}
                  </div>
                </div>
                <p className="font-semibold text-gray-800 text-sm leading-tight">
                  {customer.name}
                </p>
                <span className="mt-2 text-xs text-gray-400 bg-white/60 px-2 py-0.5 rounded-full">
                  {customer.category}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Testimonials */}
        <FadeUp>
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl font-bold text-gray-900">
              What Our Customers Say
            </h3>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="relative rounded-3xl bg-white border border-gray-100 p-8 hover:shadow-purple hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Quote mark */}
                <div className="font-display text-6xl text-primary-200 leading-none mb-4 select-none">
                  &ldquo;
                </div>
                <p className="text-gray-600 leading-relaxed flex-1 mb-6">
                  {t.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.author}
                    </p>
                    <p className="text-xs text-gray-400">{t.company}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-primary-300 to-pink-soft opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
