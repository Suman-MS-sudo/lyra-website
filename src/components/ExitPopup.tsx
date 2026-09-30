"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { trackLead } from "@/lib/analytics";

type FormData = {
  name: string;
  phone: string;
};

type Props = {
  storageKey: string;
  source: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  cta?: string;
  /** Show one-tap WhatsApp and Call buttons under the form. */
  quickContact?: boolean;
  trigger?: "exit-intent" | "immediate";
  delayMs?: number;
};

export default function ExitPopup({
  storageKey,
  source,
  eyebrow = "Wait — before you go",
  title = "Get a free callback",
  body = "Leave your number and our team will call you back with product details and pricing.",
  cta = "Request Callback",
  quickContact = false,
  trigger = "exit-intent",
  delayMs = 1500,
}: Props) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const shownRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (sessionStorage.getItem(storageKey)) return;

    const show = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      setOpen(true);
    };

    if (trigger === "immediate") {
      const timer = setTimeout(show, delayMs);
      return () => clearTimeout(timer);
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    document.addEventListener("mouseleave", onMouseLeave);

    // Mobile fallback — exit intent doesn't exist on touch devices
    const isTouch = window.matchMedia("(hover: none)").matches;
    const timer = isTouch ? setTimeout(show, 20000) : undefined;

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timer) clearTimeout(timer);
    };
  }, [storageKey, trigger, delayMs]);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(storageKey, "1");
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    const form = new FormData();
    form.append("name", data.name);
    form.append("phone", data.phone);
    form.append("source", source);
    form.append("_captcha", "false");
    form.append("_subject", `Callback Request - ${source} - Lyra Enterprises`);
    try {
      const res = await fetch("https://formsubmit.co/sales@lyraenterprise.co.in", {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      if (res.ok) trackLead("form", source, "callback");
      setSubmitted(true);
      sessionStorage.setItem(storageKey, "1");
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 sm:items-center sm:px-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Get a callback"
    >
      {/* Bottom sheet on phones, centred card from sm up */}
      <div
        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Got it!</h3>
            <p className="text-gray-500 text-sm">We&apos;ll call you back shortly.</p>
          </div>
        ) : (
          <>
            <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest mb-3">
              {eyebrow}
            </span>
            <h3 className="font-bold text-xl sm:text-2xl text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-6">{body}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-transparent transition-all placeholder:text-gray-300"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
                  })}
                  type="tel"
                  placeholder="Your phone number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-transparent transition-all placeholder:text-gray-300"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary w-full py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : cta}
              </button>
            </form>

            {quickContact && (
              <>
                <div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-gray-400">
                  <span className="h-px flex-1 bg-gray-200" />
                  or reach us instantly
                  <span className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/918122378860?text=Hi%21%20Please%20share%20the%20price%20list%20for%20your%20sanitary%20napkin%20vending%20machines."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white transition hover:brightness-95"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.75.98 1-3.65-.24-.37A9.86 9.86 0 0 1 2.15 12C2.15 6.58 6.6 2.15 12.05 2.15c2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.44 9.77-9.88 9.77zM12.05.1C5.46.1.1 5.46.1 12.05c0 2.1.55 4.16 1.6 5.97L0 24l6.15-1.6a11.93 11.93 0 0 0 5.9 1.5c6.59 0 11.95-5.36 11.95-11.95 0-3.2-1.25-6.2-3.5-8.46A11.87 11.87 0 0 0 12.05.1z" />
                    </svg>
                    WhatsApp
                  </a>
                  <a
                    href="tel:+918122378860"
                    className="flex items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3.5 text-sm font-bold text-primary-700 transition hover:bg-primary-100"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.3a1 1 0 01.97.76l1 4a1 1 0 01-.3.97L7.7 10.3a11 11 0 006 6l1.6-1.27a1 1 0 01.97-.3l4 1a1 1 0 01.76.97V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
