declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 event. If gtag.js has not loaded yet (it is loaded lazily), the event is
 * queued on dataLayer in the same shape gtag() uses, and GA sends it once it loads.
 */
export function sendEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", name, params);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  (function (..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  })("event", name, params);
}

/**
 * Form submissions fire `generate_lead` (call only after the enquiry was sent successfully).
 * Email clicks fire `email_click`.
 *
 * Phone and WhatsApp clicks are NOT sent from here: LeadClickTracker listens for every
 * tel: / WhatsApp link site-wide and fires `click_to_call` / `whatsapp_click`, so calling
 * this with "call" or "whatsapp" is a deliberate no-op (it avoids double counting).
 */
export function trackLead(
  method: "form" | "whatsapp" | "call" | "email",
  detail?: string,
  formName = "enquiry",
) {
  if (method === "form") {
    sendEvent("generate_lead", {
      form_name: formName,
      product_interest: detail || "not_specified",
    });
  } else if (method === "email") {
    sendEvent("email_click", detail ? { lead_detail: detail } : undefined);
  }
}
