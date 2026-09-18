"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const faqs = [
  {
    q: "What is the price of a sanitary napkin vending machine in India?",
    a: "Lyra Enterprises machines start at ₹12,000 for the Push Button model and go up to ₹26,500 for the WiFi-enabled Solo Ethernet. Prices are ex-works Chennai, plus 18% GST and freight.",
  },
  {
    q: "Do Lyra vending machines support UPI and QR code payments?",
    a: "Yes. The Solo QR, Solo WiFi and Solo Ethernet models accept UPI QR payments through GPay, PhonePe or any UPI app.",
  },
  {
    q: "Are Lyra vending machines suitable for schools and colleges?",
    a: "Yes. Lyra machines run in schools, colleges, hostels, hospitals and offices pan-India, supported by our South India office in Chennai and North India office in West Bengal. The compact 700×160×160 mm body fits standard toilet cubicles.",
  },
  {
    q: "What is the capacity of a Lyra sanitary napkin vending machine?",
    a: "Most Lyra models hold 25 napkins per load. The stainless-steel Solo Wave holds up to 35.",
  },
  {
    q: "Does Lyra Enterprises provide installation and after-sales service?",
    a: "Yes. Lyra Enterprises installs, trains staff and services machines across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana, Maharashtra and Delhi NCR.",
  },
  {
    q: "What does a sanitary napkin incinerator cost?",
    a: "Lyra incinerators run ₹13,000 for the Micro (1–5 napkins/cycle) up to ₹40,000 for the Maxi (25–50 napkins/cycle), ex-works Chennai plus GST.",
  },
];

export default function FAQ() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="lyra-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
        >
          <div className="lyra-eyebrow mb-6">Common Questions</div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Lyra Enterprises Answers Your Buying Questions Directly
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Real prices, real capacities, no guesswork — not vague marketing copy.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl divide-y divide-slate-200 border-t border-b border-slate-200">
          {faqs.map((item) => (
            <div key={item.q} className="py-6">
              <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                {item.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
