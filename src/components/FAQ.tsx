"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { homeFaqs } from "@/lib/home-faqs";

const faqs = homeFaqs;

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
