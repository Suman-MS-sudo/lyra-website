declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLead(method: "form" | "whatsapp" | "call" | "email", detail?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "generate_lead", {
    lead_method: method,
    ...(detail ? { lead_detail: detail } : {}),
  });
}
