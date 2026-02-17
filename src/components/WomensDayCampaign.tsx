"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const CAMPAIGN_END = new Date("2026-03-08T23:59:59+05:30");

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 18, hours: 0, minutes: 0, seconds: 0 });
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

function CountUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  const prev = useRef(display);
  const changed = prev.current !== display;
  if (changed) prev.current = display;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-sm overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="font-display font-black text-white text-2xl sm:text-3xl absolute"
          >
            {display}
          </motion.span>
        </AnimatePresence>
        {/* Flip line */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/20 pointer-events-none" />
      </div>
      <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-2">{label}</span>
    </div>
  );
}

export default function WomensDayCampaign() {
  const countdown = useCountdown(CAMPAIGN_END);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B1FA8] via-[#A0268A] to-[#E8477A]" />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

      {/* Large female symbol */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
        <svg width="320" height="380" viewBox="0 0 260 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="130" cy="110" r="100" stroke="white" strokeWidth="24" fill="none" />
          <line x1="130" y1="210" x2="130" y2="310" stroke="white" strokeWidth="24" strokeLinecap="round" />
          <line x1="80" y1="265" x2="180" y2="265" stroke="white" strokeWidth="24" strokeLinecap="round" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm mb-6">
              <span className="text-sm">♀</span>
              <span className="text-xs font-bold text-white tracking-widest uppercase">
                March 8, 2026 · International Women&apos;s Day
              </span>
            </div>

            <h2 className="font-display leading-tight mb-4">
              <span className="block text-pink-200 text-lg font-semibold mb-1">Celebrating Every Woman</span>
              <span className="block text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black">Women&apos;s Day</span>
              <span className="block text-pink-200 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mt-1">Special Campaign 🌷</span>
            </h2>

            <p className="text-pink-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8">
              This March, we&apos;re giving back. Get{" "}
              <strong className="text-white underline decoration-pink-300 decoration-2 underline-offset-2">
                ₹1,000 off
              </strong>{" "}
              on every Vending Machine and Incinerator — because every woman deserves dignity.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="#contact"
                className="px-8 py-4 rounded-full bg-white text-[#A0268A] font-bold text-sm hover:bg-pink-50 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-black/20 text-center"
              >
                Claim Offer Now →
              </Link>
              <Link
                href="#products"
                className="px-8 py-4 rounded-full bg-white/15 border border-white/30 text-white font-semibold text-sm hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm text-center"
              >
                View Products
              </Link>
            </div>

            <p className="text-white/40 text-xs mt-5">* Valid till March 8, 2026 · T&amp;C apply</p>
          </div>

          {/* Right — Animated Woman Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex-shrink-0 w-full lg:w-auto flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[260px] sm:w-[320px]"
            >
              <Image
                src="https://cdni.iconscout.com/illustration/premium/thumb/woman-wearing-a-superhero-costume-illustration-svg-download-png-6294811.png"
                alt="Empowered woman — Women's Day campaign"
                width={320}
                height={400}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />

              {/* Floating sparkles around the illustration */}
              <motion.div
                animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-4 text-yellow-200 text-xl pointer-events-none select-none"
              >✦</motion.div>
              <motion.div
                animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-20 left-2 text-pink-200 text-sm pointer-events-none select-none"
              >✦</motion.div>
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-24 right-2 text-white text-xs pointer-events-none select-none"
              >✦</motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-center text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            🌸 Offer Ends In
          </p>
          <div className="flex items-start justify-center gap-3 sm:gap-5">
            <CountUnit value={countdown.days} label="Days" />
            <span className="text-white/40 font-black text-3xl mt-2.5">:</span>
            <CountUnit value={countdown.hours} label="Hours" />
            <span className="text-white/40 font-black text-3xl mt-2.5">:</span>
            <CountUnit value={countdown.minutes} label="Minutes" />
            <span className="text-white/40 font-black text-3xl mt-2.5">:</span>
            <CountUnit value={countdown.seconds} label="Seconds" />
          </div>
          <p className="text-center text-pink-200/60 text-xs mt-5 font-semibold">
            International Women&apos;s Day — March 8, 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
