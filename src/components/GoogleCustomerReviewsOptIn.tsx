"use client";

import { useEffect } from "react";

const MERCHANT_ID = 5842526211;
/** Orders dispatch from Chennai in about 3-7 business days; the survey email goes out after this date. */
const DELIVERY_DAYS = 7;

type Props = {
  orderId: string;
  email: string;
};

declare global {
  interface Window {
    renderOptIn?: () => void;
    gapi?: {
      load: (name: string, cb: () => void) => void;
      surveyoptin: { render: (opts: Record<string, unknown>) => void };
    };
  }
}

function estimatedDeliveryDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + DELIVERY_DAYS);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Google Customer Reviews survey opt-in, shown on the order confirmation screen.
 * Renders Google's own opt-in prompt; it shows nothing until Google verifies the merchant account.
 */
export default function GoogleCustomerReviewsOptIn({ orderId, email }: Props) {
  useEffect(() => {
    if (!orderId || !email) return;

    window.renderOptIn = () => {
      window.gapi?.load("surveyoptin", () => {
        window.gapi?.surveyoptin.render({
          merchant_id: MERCHANT_ID,
          order_id: orderId,
          email,
          delivery_country: "IN",
          estimated_delivery_date: estimatedDeliveryDate(),
        });
      });
    };

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js?onload=renderOptIn";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [orderId, email]);

  return null;
}
