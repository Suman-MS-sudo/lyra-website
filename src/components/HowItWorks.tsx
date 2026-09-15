"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function HowItWorks() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="lyra-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <div className="lyra-eyebrow mb-6">How It Works</div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Most Institutions Have No Dignified Way to Dispose of Napkins On-Site
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            Staff resort to municipal bins or manual handling. Lyra Enterprises
            fixes that in 4 steps, from your first call to an installed,
            supported machine.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeUp key={step.n} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                <span className="text-sm font-bold text-primary-600">{step.n}</span>
                <h3 className="mt-2 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Components */}
        <FadeUp delay={0.2}>
          <div className="mt-14 rounded-2xl border border-slate-200 bg-[#f6f8fc] p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
              What Every Lyra Vending Machine Includes
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {components.map((c) => (
                <div key={c.part} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{c.part}</p>
                    <p className="text-sm text-slate-600">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
