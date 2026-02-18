"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function WomensDayModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("womensDayModal2026");
    if (!lastShown) {
      const t = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(t);
    }
    const hoursSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60);
    if (hoursSince > 24) {
      const t = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    localStorage.setItem("womensDayModal2026", Date.now().toString());
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6B1FA8] via-[#A0268A] to-[#E8477A]" />

            {/* Subtle noise overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
              }}
            />

            {/* Large decorative female symbol */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-15 select-none pointer-events-none">
              <svg width="260" height="320" viewBox="0 0 260 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Circle part of ♀ */}
                <circle cx="130" cy="110" r="100" stroke="white" strokeWidth="28" fill="none" />
                {/* Stem */}
                <line x1="130" y1="210" x2="130" y2="310" stroke="white" strokeWidth="28" strokeLinecap="round" />
                {/* Crossbar */}
                <line x1="80" y1="265" x2="180" y2="265" stroke="white" strokeWidth="28" strokeLinecap="round" />
              </svg>
            </div>

            {/* Decorative circles */}
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5" />

            {/* Flower decorations */}
            <div className="absolute top-4 right-14 opacity-30 select-none pointer-events-none text-4xl">🌸</div>
            <div className="absolute bottom-16 right-40 opacity-25 select-none pointer-events-none text-3xl">🌺</div>
            <div className="absolute bottom-8 right-24 opacity-20 select-none pointer-events-none text-2xl">🌸</div>

            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10 p-8 sm:p-12">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm mb-6">
                <span className="text-sm">♀</span>
                <span className="text-xs font-bold text-white tracking-widest uppercase">International Women&apos;s Day 2026</span>
              </div>

              {/* Headline */}
              <h2 className="font-display leading-tight mb-2">
                <span className="block text-pink-200 text-xl sm:text-2xl font-semibold mb-1">
                  Exclusive
                </span>
                <span className="block text-white text-4xl sm:text-5xl font-black">
                  Women&apos;s Day
                </span>
                <span className="block text-pink-200 text-3xl sm:text-4xl font-bold">
                  Special Offer 🌷
                </span>
              </h2>

              {/* Divider */}
              <div className="w-16 h-1 rounded-full bg-pink-300/60 my-6" />

              {/* Offer */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 px-5 py-4 rounded-2xl bg-white text-center shadow-lg">
                  <p className="text-[#A0268A] text-xs font-bold uppercase tracking-wider mb-1">Save</p>
                  <p className="font-sans text-4xl font-black text-[#6B1FA8] leading-none">₹1,000</p>
                  <p className="text-[#A0268A]/70 text-xs font-semibold mt-1">per machine</p>
                </div>
                <p className="text-pink-100 text-sm sm:text-base leading-relaxed">
                  Celebrate Women&apos;s Day with dignity. Get{" "}
                  <strong className="text-white">₹1,000 off</strong> on all
                  Vending Machines &amp; Incinerators. Valid till{" "}
                  <strong className="text-white">March 8, 2026</strong>.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#contact"
                  onClick={close}
                  className="px-7 py-3.5 rounded-full bg-white text-[#A0268A] font-bold text-sm hover:bg-pink-50 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-black/20"
                >
                  Claim Offer Now →
                </Link>
                <Link
                  href="#products"
                  onClick={close}
                  className="px-7 py-3.5 rounded-full bg-white/15 border border-white/30 text-white font-semibold text-sm hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm"
                >
                  View Products
                </Link>
              </div>

              {/* Fine print */}
              <p className="text-white/50 text-xs mt-5">
                * Offer valid on all products till March 8, 2026 · T&amp;C apply
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
