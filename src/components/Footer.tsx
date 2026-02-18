"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const footerLinks = {
  Company: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Customers", href: "#customers" },
    { label: "Contact", href: "#contact" },
  ],
  Products: [
    { label: "Push-Button Machine", href: "/products/push-button-vending-machine" },
    { label: "Coin-Operated", href: "/products/solo-coin-vending-machine" },
    { label: "WiFi / Smart", href: "/products/solo-wifi-vending-machine" },
    { label: "Ethernet Pro", href: "/products/solo-ethernet-vending-machine" },
    { label: "Incinerators", href: "/products/sanitary-napkin-incinerators" },
  ],
  Contact: [
    { label: "+91-81223 78860", href: "tel:+918122378860" },
    { label: "sales@lyraenterprise.co.in", href: "mailto:sales@lyraenterprise.co.in" },
    { label: "Cholapuram, Ambattur, Chennai 600053", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden pb-20 md:pb-0">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />

      {/* Background orb */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-primary-900/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-16 border-b border-white/5"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Ready to empower your space?
              </h2>
              <p className="text-gray-400 text-base">
                Join 200+ institutions who already trust Lyra Enterprise machines.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 flex-shrink-0">
              <Link
                href="#contact"
                className="px-8 py-4 bg-purple-gradient text-white font-semibold rounded-full shadow-purple hover:shadow-purple-lg hover:-translate-y-1 transition-all duration-300"
              >
                Get a Free Quote
              </Link>
              <Link
                href="tel:+918122378860"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                Call Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Footer Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="#home" className="flex items-center gap-3 mb-5 group">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Lyra Enterprise Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-white text-xl">
                Lyra Enterprise
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India&apos;s leading manufacturer of sanitary napkin vending machines
              and incinerators. Empowering women&apos;s health across India.
            </p>
            <div className="flex gap-4">
              {["facebook", "instagram", "linkedin"].map((social) => (
                <a
                  key={social}
                  href={`https://www.${social}.com/lyraenterprise`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600/50 transition-all duration-200 capitalize text-xs font-bold"
                  aria-label={social}
                >
                  {social[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-primary-300 transition-colors duration-200 leading-relaxed block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© 2026 Lyra Enterprise. All rights reserved.</p>
          <p className="text-xs">
            10/21, Vasuki Street, Cholapuram, Ambattur, Chennai – 600053, India
          </p>
        </div>
      </div>
    </footer>
  );
}
