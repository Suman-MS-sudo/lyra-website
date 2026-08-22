"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { SITE } from "@/lib/data";

const footerLinks = {
  Company: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Customers", href: "#customers" },
    { label: "Contact", href: "/contact" },
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
    { label: "sales@lyraenterprise.co.in", href: "mailto:sales@lyraenterprise.co.in?subject=Product Inquiry - Lyra Enterprises&body=" + encodeURIComponent("Hi! I'm interested in Lyra Enterprises' sanitary napkin vending machines and incinerators. Please share more details about your products, pricing, and installation process. Looking forward to hearing from you.") },
    { label: "Cholapuram, Ambattur, Chennai 600053", href: "https://maps.google.com/maps?q=10/21,+Vasuki+Street,+Cholapuram,+Ambattur,+Chennai+600053,+India" },
  ],
  Policies: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cancellation & Refund", href: "/cancellation-refund-policy" },
    { label: "Shipping & Delivery", href: "/shipping-delivery-policy" },
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
              <p className="text-gray-300 text-base">
                Join 200+ institutions who already trust Lyra Enterprises machines.
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
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-white/5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="#home" className="flex items-center gap-3 mb-5 group">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Lyra Enterprises Logo"
                  fill
                  sizes="40px"
                  quality={70}
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-white text-xl">
                Lyra Enterprises
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India&apos;s leading manufacturer of sanitary napkin vending machines
              and incinerators. Empowering women&apos;s health across India.
            </p>
            <div className="flex gap-4">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600/70 transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.64 13.559 3.64 12.017s.558-2.877 1.486-3.694C5.951 7.516 7.152 7.026 8.449 7.026c1.297 0 2.448.49 3.323 1.297.928.817 1.486 2.153 1.486 3.694s-.558 2.877-1.486 3.694c-.875.807-2.026 1.297-3.323 1.297zm7.138 0c-1.297 0-2.448-.49-3.323-1.297-.928-.817-1.486-2.153-1.486-3.694s.558-2.877 1.486-3.694c.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.928.817 1.486 2.153 1.486 3.694s-.558 2.877-1.486 3.694c-.875.807-2.026 1.297-3.323 1.297z"/>
                  <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 15.162a3.162 3.162 0 1 1 0-6.324 3.162 3.162 0 0 1 0 6.324z"/>
                  <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-700/70 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={SITE.social.indiamart}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-600/80 transition-all duration-200 text-[10px] font-bold"
                aria-label="IndiaMART"
              >
                IM
              </a>
              <a
                href={SITE.social.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/80 transition-all duration-200 text-[10px] font-bold"
                aria-label="Justdial"
              >
                JD
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-white text-sm mb-5 tracking-wide">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') || link.href.startsWith('tel:') || link.href.startsWith('mailto:') ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? "_blank" : undefined}
                        rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="text-gray-400 text-sm hover:text-primary-300 transition-colors duration-200 leading-relaxed block"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 text-sm hover:text-primary-300 transition-colors duration-200 leading-relaxed block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <p>© 2026 Lyra Enterprises. All rights reserved.</p>
          <a
            href="https://maps.google.com/maps?q=10/21,+Vasuki+Street,+Cholapuram,+Ambattur,+Chennai+600053,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-primary-300 transition-colors hover:underline"
          >
            📍 10/21, Vasuki Street, Cholapuram, Ambattur, Chennai – 600053, India
          </a>
        </div>
      </div>
    </footer>
  );
}
