"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

type Customer = { name: string; short: string; logo: string };

const sectors: { label: string; items: Customer[] }[] = [
  {
    label: "Industrial & Manufacturing",
    items: [
      { name: "Larsen & Toubro", short: "L&T", logo: "/images/customers/lnt.png" },
      { name: "TVS Motor", short: "TVS", logo: "/images/customers/tvs-motors-logo-png-0.png" },
      { name: "Saint-Gobain", short: "SG", logo: "/images/customers/saint-gobain.png" },
      { name: "Parker Hannifin", short: "PH", logo: "/images/customers/parker-hannifin-logo-png-transparent.png" },
    ],
  },
  {
    label: "Government, Research & Corporate",
    items: [
      { name: "ISRO", short: "ISRO", logo: "/images/customers/isro-logo.png" },
      { name: "Integra", short: "INT", logo: "/images/customers/integra.png" },
      { name: "Maxenra", short: "MX", logo: "/images/customers/maxenra.png" },
    ],
  },
  {
    label: "Colleges & Schools",
    items: [
      { name: "Vels University", short: "VU", logo: "/images/customers/vels-university.png" },
      { name: "Stella Maris College", short: "SM", logo: "/images/customers/stella-maris.png" },
      { name: "DG Vaishnav College", short: "DGV", logo: "/images/customers/dg-vaishnav.png" },
      { name: "Mar Baselios College", short: "MB", logo: "/images/customers/mar-baselios.png" },
      { name: "Vivekanandha Institutions", short: "VI", logo: "/images/customers/Vivekanandha Educational Institutions.png" },
      { name: "Srikrish School", short: "SKS", logo: "/images/customers/Srikrish school.png" },
    ],
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
      className="section-padding bg-white"
    >
      <div className="lyra-container">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="lyra-eyebrow mb-6">
            Our Customers
          </div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-6">
            Trusted by{" "}
            <span className="text-gradient">India&apos;s Leading</span> Organizations
          </h2>
          <p className="text-lg text-slate-500">
            From Fortune 500 companies to premier educational institutions — Lyra
            machines are installed where quality truly matters.
          </p>
        </motion.div>

        {/* Customers grouped by sector */}
        <div className="mb-16 space-y-12">
          {sectors.map((sector) => (
            <FadeUp key={sector.label}>
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {sector.label}
                  </h3>
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-400">
                    {sector.items.length}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                  {sector.items.map((customer) => (
                    <div
                      key={customer.name}
                      className="group flex w-[calc(50%-0.5rem)] flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#bfd0f0] hover:shadow-[0_12px_28px_rgba(30,58,138,0.10)] sm:w-44"
                    >
                      <div className="relative mb-3 h-14 w-24">
                        <Image
                          src={customer.logo}
                          alt={`${customer.name} logo`}
                          fill
                          sizes="96px"
                          className="object-contain opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                          onError={() => {}}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gradient opacity-0 group-[.img-error]:opacity-100">
                          {customer.short}
                        </div>
                      </div>
                      <p className="text-sm font-semibold leading-tight text-slate-800">
                        {customer.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}

          <p className="max-w-3xl text-xs leading-relaxed text-slate-400">
            Company names and logos are trademarks of their respective owners and are shown
            only to identify organisations where Lyra Enterprises products have been supplied
            or installed. Their use does not imply any partnership, sponsorship or endorsement.
          </p>
        </div>

        {/* Testimonials */}
        <FadeUp>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What Our Customers Say
            </h3>
          </div>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(30,58,138,0.10)]">
                <svg className="mb-4 h-7 w-7 text-primary-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M9.5 6C6.5 7.5 5 10 5 13.5V18h5v-5H7.8c0-2.2 1-3.7 2.9-4.6L9.5 6zm9 0c-3 1.5-4.5 4-4.5 7.5V18h5v-5h-2.2c0-2.2 1-3.7 2.9-4.6L18.5 6z" />
                </svg>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-slate-600">
                  {t.content}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.company}</p>
                  </div>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
