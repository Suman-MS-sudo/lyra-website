"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { trackLead } from "@/lib/analytics";

type FormData = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  product: string;
  message: string;
};

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const WA_TEXT = encodeURIComponent("Hi! I'm interested in Lyra Enterprises' sanitary napkin vending machines / incinerators. Please share more details.");
const EMAIL_TEXT = encodeURIComponent("Hi! I'm interested in Lyra Enterprises' sanitary napkin vending machines and incinerators. Please share more details about your products, pricing, and installation process. Looking forward to hearing from you.");

const contactInfo = [
  {
    label: "Call Us",
    value: "+91-81223 78860",
    href: "tel:+918122378860",
    sub: "Mon–Sat, 9:30 AM – 6:30 PM IST",
    image: "/images/stock/contact-call.jpg",
    leadMethod: "call",
  },
  {
    label: "WhatsApp",
    value: "+91-81223 78860",
    href: `https://wa.me/918122378860?text=${WA_TEXT}`,
    sub: "Message us instantly",
    image: "/images/stock/contact-whatsapp.jpg",
    isExternal: true,
    leadMethod: "whatsapp",
  },
  {
    label: "Email Us",
    value: "Tap to reveal",
    href: "",
    sub: "24/7 Response Guaranteed",
    image: "/images/stock/contact-email.jpg",
    leadMethod: "email",
    isEmail: true,
  },
  {
    label: "Follow Us",
    value: "Social Media",
    href: "https://www.instagram.com/lyraenterprises_/",
    sub: "Instagram • Facebook • LinkedIn",
    image: "/images/stock/contact-social.jpg",
    isExternal: true,
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedEmails, setSubmittedEmails] = useState<Set<string>>(new Set());
  const [submittedPhones, setSubmittedPhones] = useState<Set<string>>(new Set());
  const [salesEmail, setSalesEmail] = useState("");

  useEffect(() => {
    setSalesEmail(["sales", "lyraenterprise.co.in"].join("@"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Check for duplicate submissions
    if (submittedEmails.has(data.email)) {
      setError('email', { message: 'This email has already been used for a submission.' });
      return;
    }
    if (submittedPhones.has(data.phone)) {
      setError('phone', { message: 'This phone number has already been used for a submission.' });
      return;
    }

    setSubmitting(true);
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v));
    form.append("_captcha", "false");
    form.append("_subject", "New Inquiry from Lyra Enterprises Website");
    try {
      await fetch("https://formsubmit.co/sales@lyraenterprise.co.in", {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      setSubmittedEmails(prev => new Set([...prev, data.email]));
      setSubmittedPhones(prev => new Set([...prev, data.phone]));
      setSubmitted(true);
      trackLead("form", data.product);
      reset();
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="contact"
      className="section-padding bg-[#f6f8fc]"
    >
      <div className="lyra-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="lyra-eyebrow mb-6">
            Get in Touch
          </div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-6">
            Let&apos;s Build{" "}
            <span className="text-gradient">Dignified Spaces</span> Together
          </h2>
          <p className="text-lg text-slate-500">
            Reach out for a personalized quote, product demo, or any queries.
            Our team responds within 24 hours.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
          {contactInfo.map((info, i) => {
            const href = info.isEmail
              ? salesEmail
                ? `mailto:${salesEmail}?subject=Product Inquiry - Lyra Enterprises&body=${EMAIL_TEXT}`
                : undefined
              : info.href;
            const value = info.isEmail ? (salesEmail || info.value) : info.value;
            return (
            <FadeUp key={info.label} delay={i * 0.1}>
              <a
                href={href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={() => info.leadMethod && trackLead(info.leadMethod as "call" | "whatsapp" | "email")}
                className="group flex flex-col sm:flex-row gap-3 sm:gap-4 items-start p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#bfd0f0] hover:shadow-[0_12px_28px_rgba(30,58,138,0.10)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-slate-200">
                  <Image
                    src={info.image}
                    alt={info.label}
                    fill
                    sizes="48px"
                    quality={70}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary-900/25" />
                </div>
                <div className="min-w-0 w-full">
                  <p className="text-[11px] text-slate-400 font-semibold mb-0.5 uppercase tracking-wide">
                    {info.label}
                  </p>
                  <p className="font-semibold text-slate-900 text-xs sm:text-sm truncate group-hover:text-primary-700 transition-colors">
                    {value}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">{info.sub}</p>
                </div>
              </a>
            </FadeUp>
            );
          })}
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <FadeUp delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 mb-2">
                Send Us a Message
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                Fill in the form below and we&apos;ll get back to you promptly.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-slate-500">
                    Thank you for reaching out. We&apos;ll respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-primary-600 text-sm font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name
                      </label>
                      <input
                        {...register("name", {
                          required: "Name is required",
                          pattern: {
                            value: /^[A-Za-z\s.'-]+$/,
                            message: "Name should only contain alphabets and spaces"
                          },
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters long"
                          },
                          maxLength: {
                            value: 50,
                            message: "Name must not exceed 50 characters"
                          }
                        })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-transparent transition-all placeholder:text-gray-300"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email address (e.g., user@domain.com)",
                          },
                          validate: (value) => {
                            if (value.includes('..') || value.includes('.@') || value.includes('@.')) {
                              return "Invalid email format - consecutive dots not allowed";
                            }
                            return true;
                          }
                        })}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-transparent transition-all placeholder:text-gray-300"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Please enter exactly 10 digits starting with 6, 7, 8, or 9"
                          },
                          validate: (value) => {
                            if (!/^\d+$/.test(value)) {
                              return "Phone number should contain only digits";
                            }
                            if (value.length !== 10) {
                              return "Phone number must be exactly 10 digits";
                            }
                            if (!/^[6-9]/.test(value)) {
                              return "Phone number must start with 6, 7, 8, or 9";
                            }
                            return true;
                          }
                        })}
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-transparent transition-all placeholder:text-gray-300"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Organization
                      </label>
                      <input
                        {...register("organization")}
                        placeholder="School / Hospital / Office"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-transparent transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Interested In
                    </label>
                    <select
                      id="product"
                      {...register("product", { required: "Please select a product" })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-transparent transition-all text-gray-700 appearance-none bg-white"
                    >
                      <option value="">Select a product</option>
                      <option value="vending-machine">Sanitary Napkin Vending Machine</option>
                      <option value="incinerator">Sanitary Napkin Incinerator</option>
                      <option value="combo">Complete Solution (Vending + Incinerator)</option>
                      <option value="quote">Get a Quote</option>
                      <option value="demo">Schedule Demo</option>
                      <option value="support">Support / Maintenance</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                    {errors.product && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.product.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Please enter your message",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters long"
                        },
                        maxLength: {
                          value: 1000,
                          message: "Message must not exceed 1000 characters"
                        }
                      })}
                      rows={4}
                      placeholder="Tell us about your requirements... (10-1000 characters)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-transparent transition-all resize-none placeholder:text-gray-300"
                      maxLength={1000}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary w-full py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : "Send Message →"}
                  </button>
                  <p className="text-xs text-slate-500 text-center">
                    We respect your privacy. Your details are kept confidential.
                  </p>
                </form>
              )}
            </div>
          </FadeUp>

          {/* Map */}
          <FadeUp delay={0.2} className="lg:col-span-2">
            <div className="flex flex-col gap-6 h-full">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex-1" style={{ minHeight: "420px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0947843847246!2d80.1421896!3d13.1220126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52630d041b194b%3A0x6ad7970c287d2d32!2sLyra%20Enterprises!5e0!3m2!1sen!2sin!4v1708214400000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "420px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lyra Enterprises Location"
                  className="w-full h-full"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/CS3hP8SezcS4EFDQ9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary py-4"
              >
                Get Directions
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
