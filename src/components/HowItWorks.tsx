"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

const steps = [
  {
    n: "01",
    title: "You Call or WhatsApp Us",
    body: "Tell us your site — school, hospital or office — and how many restrooms need a machine. We recommend a model in one call.",
  },
  {
    n: "02",
    title: "We Send a Firm Quote",
    body: "A written quote with the exact model, price and GST reaches you the same day, ready to attach to a purchase order or CSR proposal.",
  },
  {
    n: "03",
    title: "We Install Within a Week",
    body: "Our team ships from Chennai and installs on-site. Most locations across India have a working machine within 7 days of order.",
  },
  {
    n: "04",
    title: "We Keep Visiting After",
    body: "Every machine ships with a 1-year warranty. For campus deployments like L&T Manapakkam, we run regular on-site visits for restocking and service.",
  },
];

const components = [
  { part: "Dispensing mechanism", detail: "Tamper-proof coil or push-slot release, 25–35 napkin capacity" },
  { part: "Payment module", detail: "Coin acceptor, UPI QR reader or RFID reader, depending on model" },
  { part: "Body & lock", detail: "Powder-coated steel or stainless steel cabinet with a keyed lock" },
  { part: "IoT board", detail: "WiFi or Ethernet connectivity for stock-level and usage reports (WiFi/Ethernet models)" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="how-it-works" className="bg-subtle py-20 sm:py-24 lg:py-32">
      <div className="lyra-container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end"
        >
          <div>
            <p className="kicker">How It Works</p>
            <h2 className="mt-4 text-display-lg font-semibold text-ink">
              Most Institutions Have No Dignified Way to Dispose of Napkins On-Site
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-body lg:justify-self-end">
            Staff resort to municipal bins or manual handling. Lyra Enterprises fixes that in 4 steps, from your first call
            to an installed, supported machine.
          </p>
        </motion.div>

        <ol ref={railRef} className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {/* progress rail (desktop) */}
          <span aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-line lg:block" />
          <motion.span
            aria-hidden
            style={{ scaleX: reduce ? 1 : progress }}
            className="absolute left-0 right-0 top-[27px] hidden h-px origin-left bg-primary-600 lg:block"
          />
          {steps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="relative"
            >
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-canvas font-display text-base font-semibold text-brand shadow-sm">
                {step.n}
              </span>
              <div className="mt-6 rounded-[20px] border border-line bg-surface p-6 transition-shadow duration-300 hover:shadow-lift">
                <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="mt-16 grid gap-8 rounded-[24px] border border-line bg-surface p-7 sm:p-9 lg:grid-cols-[0.8fr_2fr]"
        >
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">What Every Lyra Vending Machine Includes</h3>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {components.map((c) => (
              <div key={c.part} className="border-l-2 border-primary-600 pl-4">
                <dt className="text-sm font-semibold text-ink">{c.part}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-body">{c.detail}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
