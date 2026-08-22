"use client";

import { trackLead } from "@/lib/analytics";

export function WhatsAppCTA({ text, className }: { text: string; className: string }) {
  return (
    <a
      href={`https://wa.me/918122378860?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLead("whatsapp", "combo-offer")}
      className={className}
    >
      Order on WhatsApp →
    </a>
  );
}

export function CallCTA({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <a href="tel:+918122378860" onClick={() => trackLead("call", "combo-offer")} className={className}>
      {children}
    </a>
  );
}
