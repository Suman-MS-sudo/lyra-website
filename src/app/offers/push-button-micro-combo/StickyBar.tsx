"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppCTA } from "./ComboCTA";

export default function StickyBar({ price }: { price: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide">Combo Offer</p>
              <p className="text-xl font-bold text-gray-900">
                ₹{price.toLocaleString("en-IN")} <span className="text-xs font-medium text-gray-400">+ GST + Freight</span>
              </p>
            </div>
            <p className="sm:hidden text-lg font-bold text-gray-900">
              ₹{price.toLocaleString("en-IN")}
            </p>
            <WhatsAppCTA
              text="Hi! I'm interested in the Push Button Vending Machine + Lyra Micro Incinerator combo offer at ₹19,999 + GST + Freight. Please share more details."
              className="flex-1 sm:flex-none text-center px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
