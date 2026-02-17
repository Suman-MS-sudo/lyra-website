"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "200+", label: "Machines Installed" },
  { value: "4", label: "States Served" },
  { value: "99%", label: "Machine Uptime" },
];

const badges = [
  { text: "Coin Operated", color: "from-purple-400 to-purple-600" },
  { text: "UPI / QR Pay", color: "from-pink-400 to-pink-600" },
  { text: "IoT Enabled", color: "from-fuchsia-400 to-fuchsia-600" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-blush via-white to-pink-light" />

      {/* Animated Orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="orb w-[600px] h-[600px] bg-primary-200/30 top-[-200px] right-[-100px]"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="orb w-[400px] h-[400px] bg-pink-soft/20 bottom-[-100px] left-[-100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="orb w-[300px] h-[300px] bg-primary-300/20 top-[30%] left-[30%]"
      />

      {/* Noise texture */}
      <div className="absolute inset-0 noise opacity-50 pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B565A7' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-primary-200/50 shadow-sm mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-xs font-semibold text-primary-700 tracking-wider uppercase">
                  #1 Vending Machine Manufacturer India
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-gray-900 mb-5 sm:mb-6"
              >
                Empowering{" "}
                <span className="text-gradient">Women&apos;s Health</span>{" "}
                <br className="hidden sm:block" />
                Across India
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-base sm:text-lg text-gray-600 leading-relaxed mb-7 sm:mb-10 max-w-xl"
              >
                Premium{" "}
                <strong className="text-primary-600 font-semibold">
                  sanitary napkin vending machines
                </strong>{" "}
                and{" "}
                <strong className="text-primary-600 font-semibold">
                  incinerators
                </strong>{" "}
                designed for schools, hospitals &amp; offices. Trusted by 200+
                institutions for dignified, hygienic solutions.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="grid grid-cols-3 gap-3 sm:gap-4 mb-7 sm:mb-10"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="text-center px-1"
                  >
                    <p className="font-display text-xl sm:text-2xl font-bold text-gradient">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              >
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-gradient text-white font-semibold rounded-full shadow-purple hover:shadow-purple-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                  View Products
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-full border-2 border-primary-200 hover:border-primary-400 hover:bg-pink-blush hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  Get Best Price
                </Link>
              </motion.div>
            </div>

            {/* Right — Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative flex items-center justify-center"
            >
              {/* Glow ring */}
              <div className="absolute w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-full bg-gradient-radial from-primary-200/50 to-transparent animate-pulse-glow" />

              {/* Product image container */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="relative w-72 h-96 lg:w-[340px] lg:h-[460px]">
                  <Image
                    src="/images/products/lyra-vending-machine.png"
                    alt="Lyra Enterprise Vending Machine"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    onError={() => {}}
                  />
                </div>

                {/* Feature Badges */}
                {badges.map((badge, i) => (
                  <motion.div
                    key={badge.text}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                    style={{
                      position: "absolute",
                      top: i === 0 ? "10%" : i === 1 ? "45%" : "75%",
                      left: i === 1 ? "auto" : "-20%",
                      right: i === 1 ? "-20%" : "auto",
                    }}
                    className={`hidden sm:block px-4 py-2 rounded-2xl text-white text-xs font-bold bg-gradient-to-br ${badge.color} shadow-lg backdrop-blur-sm`}
                  >
                    {badge.text}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-primary-400"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-primary-400 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
