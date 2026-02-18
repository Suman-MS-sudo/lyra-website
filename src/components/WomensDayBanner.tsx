"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CAMPAIGN_END = new Date("2026-03-08T23:59:59+05:30");

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setT({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function Tick({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  const prev = useRef(display);
  const changed = prev.current !== display;
  if (changed) prev.current = display;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-9 h-9 rounded-lg bg-white/20 border border-white/30 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute font-black text-white text-sm"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-white/60 text-[8px] font-bold uppercase tracking-wider mt-0.5">{label}</span>
    </div>
  );
}

/** Compact announcement bar — placed below the navbar on inner pages */
export default function WomensDayBanner() {
  const t = useCountdown(CAMPAIGN_END);
  const expired = t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0;
  const [dismissed, setDismissed] = useState(false);

  // Keep dismissed state across renders only (not persisted — reappears on page reload)
  if (dismissed || expired) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-[#6B1FA8] via-[#A0268A] to-[#E8477A] overflow-hidden">
      {/* Animated shimmer */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s infinite linear",
        }}
      />
      <style>{`@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }`}</style>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2">
        {/* Left — Offer text */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="text-xs sm:text-sm select-none flex-shrink-0">🌸</span>
          <span className="text-white font-bold text-[11px] sm:text-sm truncate">
            <span className="sm:hidden">₹1,000 OFF — Women&apos;s Day</span>
            <span className="hidden sm:inline">Women&apos;s Day Offer — <span className="underline decoration-pink-300 decoration-2 underline-offset-2">₹1,000 OFF</span> on all machines</span>
          </span>
          <span className="hidden sm:inline text-white/60 text-xs flex-shrink-0">· March 8, 2026</span>
        </div>

        {/* Center — Countdown (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Ends in</span>
          <div className="flex items-end gap-1.5">
            <Tick value={t.days} label="d" />
            <span className="text-white/60 font-bold text-sm mb-3">:</span>
            <Tick value={t.hours} label="h" />
            <span className="text-white/60 font-bold text-sm mb-3">:</span>
            <Tick value={t.minutes} label="m" />
            <span className="text-white/60 font-bold text-sm mb-3">:</span>
            <Tick value={t.seconds} label="s" />
          </div>
        </div>

        {/* Right — CTA + Dismiss */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <Link
            href={`https://wa.me/918122378860?text=${encodeURIComponent("Hi! I want to claim the Women's Day ₹1,000 offer on a Lyra vending machine / incinerator.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white text-[#A0268A] font-bold text-[10px] sm:text-xs rounded-full shadow hover:shadow-md hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            Claim →
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors flex-shrink-0"
          >
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
