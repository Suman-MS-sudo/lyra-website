"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { trackLead } from "@/lib/analytics";

type FormData = {
  name: string;
  phone: string;
};

const STORAGE_KEY = "lyra_combo_popup_dismissed";

export default function ExitPopup() {
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
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const show = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      setOpen(true);
    };

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
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    const form = new FormData();
    form.append("name", data.name);
    form.append("phone", data.phone);
    form.append("source", "Combo Offer Exit Popup");
    form.append("_captcha", "false");
    form.append("_subject", "Combo Offer Callback Request - Lyra Enterprises");
    try {
      await fetch("https://formsubmit.co/sales@lyraenterprise.co.in", {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      trackLead("form", "combo-offer-popup");
      setSubmitted(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Get a callback about the combo offer"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-pink-soft flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Got it!</h3>
            <p className="text-gray-500 text-sm">We&apos;ll call you back shortly about the combo offer.</p>
          </div>
        ) : (
          <>
            <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest mb-3">
              Wait — before you go
            </span>
            <h3 className="font-bold text-xl sm:text-2xl text-gray-900 mb-2">
              Get a callback about the ₹19,999 combo
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Leave your number and we&apos;ll call you back with full details on the Push Button + Micro Incinerator offer.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all placeholder:text-gray-300"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all placeholder:text-gray-300"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-pink-500 shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Request Callback"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
