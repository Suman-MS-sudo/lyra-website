"use client";

import { useEffect } from "react";
import { sendEvent } from "@/lib/analytics";

const WHATSAPP_HOST = /^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)(?:[/?#]|$)/i;

/**
 * One site-wide click listener for every phone and WhatsApp link, so no link needs
 * its own handler (and new links are tracked automatically):
 *   tel:  -> click_to_call
 *   wa.me -> whatsapp_click
 */
export default function LeadClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!href) return;

      const params = { page_path: window.location.pathname };
      if (href.startsWith("tel:")) sendEvent("click_to_call", params);
      else if (WHATSAPP_HOST.test(href)) sendEvent("whatsapp_click", params);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
