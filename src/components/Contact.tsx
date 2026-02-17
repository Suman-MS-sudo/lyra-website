"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

const WA_TEXT = encodeURIComponent("Hi! I'm interested in Lyra Enterprise's sanitary napkin vending machines / incinerators. Please share more details.");

const contactInfo = [
  {
    label: "Call Us",
    value: "+91-81223 78860",
    href: "tel:+918122378860",
    sub: "Mon–Sat, 9 AM – 6 PM IST",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&auto=format&fit=crop&q=80",
  },
  {
    label: "WhatsApp",
    value: "+91-81223 78860",
    href: `https://wa.me/918122378860?text=${WA_TEXT}`,
    sub: "Message us instantly",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=80&auto=format&fit=crop&q=80",
    isExternal: true,
  },
  {
    label: "Email Us",
    value: "sales@lyraenterprise.co.in",
    href: "mailto:sales@lyraenterprise.co.in",
    sub: "24/7 Response Guaranteed",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=80&auto=format&fit=crop&q=80",
  },
  {
    label: "Headquarters",
    value: "Cholapuram, Ambattur",
    href: "https://maps.app.goo.gl/CS3hP8SezcS4EFDQ9",
    sub: "Chennai – 600053, India",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80&auto=format&fit=crop&q=80",
    isExternal: true,
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v));
    form.append("_captcha", "false");
    form.append("_subject", "New Inquiry from Lyra Enterprise Website");
    try {
      await fetch("https://formsubmit.co/sales@lyraenterprise.co.in", {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
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
      className="section-padding relative overflow-hidden bg-gradient-to-b from-pink-blush/20 to-white"
    >
      {/* Decorative */}
      <div className="absolute -left-40 bottom-0 w-[600px] h-[600px] rounded-full bg-primary-100/20 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold tracking-wider uppercase mb-6">
            Get in Touch
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Let&apos;s Build{" "}
            <span className="text-gradient">Dignified Spaces</span> Together
          </h2>
          <p className="text-lg text-gray-500">
            Reach out for a personalized quote, product demo, or any queries.
            Our team responds within 24 hours.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, i) => (
            <FadeUp key={info.label} delay={i * 0.1}>
              <a
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row gap-3 sm:gap-4 items-start p-4 sm:p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-purple transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={info.image}
                    alt={info.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-purple-gradient opacity-60" />
                </div>
                <div className="min-w-0 w-full">
                  <p className="text-xs text-gray-400 font-medium mb-0.5 uppercase tracking-wide">
                    {info.label}
                  </p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate group-hover:text-primary-700 transition-colors">
                    {info.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{info.sub}</p>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <FadeUp delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 lg:p-10">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                Fill in the form below and we&apos;ll get back to you promptly.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-pink-soft flex items-center justify-center mx-auto mb-6 shadow-purple">
                    <svg
                      className="w-10 h-10 text-white"
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
                  <h4 className="font-display text-2xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-500">
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
                        {...register("name", { required: "Name is required" })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all placeholder:text-gray-300"
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
                            value: /\S+@\S+\.\S+/,
                            message: "Please enter a valid email",
                          },
                        })}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all placeholder:text-gray-300"
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
                          required: "Phone is required",
                        })}
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all placeholder:text-gray-300"
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Interested In
                    </label>
                    <select
                      {...register("product", { required: "Please select a product" })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all text-gray-700 appearance-none bg-white"
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
                      })}
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all resize-none placeholder:text-gray-300"
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
                    className="w-full py-4 rounded-2xl font-semibold text-white bg-purple-gradient shadow-purple hover:shadow-purple-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : "Send Message →"}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    We respect your privacy. Your details are kept confidential.
                  </p>
                </form>
              )}
            </div>
          </FadeUp>

          {/* Map */}
          <FadeUp delay={0.2} className="lg:col-span-2">
            <div className="flex flex-col gap-6 h-full">
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex-1" style={{ minHeight: "420px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0947843847246!2d80.1421896!3d13.1220126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52630d041b194b%3A0x6ad7970c287d2d32!2sLyra%20Enterprises!5e0!3m2!1sen!2sin!4v1708214400000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "420px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lyra Enterprise Location"
                  className="w-full h-full"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/CS3hP8SezcS4EFDQ9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-primary-200 text-primary-600 font-semibold text-sm hover:bg-primary-50 hover:border-primary-400 transition-all duration-300 hover:-translate-y-0.5"
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
