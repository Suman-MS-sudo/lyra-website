"use client";

import dynamic from "next/dynamic";

// Below-the-fold / delayed widgets: split into their own chunks so they
// don't add to the JS the browser must parse before the page is interactive.
const ExitPopup = dynamic(() => import("./ExitPopup"), { ssr: false });
const FloatingContact = dynamic(() => import("./FloatingContact"), { ssr: false });

export function HomePopup() {
  return (
    <ExitPopup
      storageKey="lyra_home_popup_dismissed"
      source="homepage-popup"
      trigger="immediate"
      delayMs={10000}
      eyebrow="Price list + free callback"
      title="Vending machines from ₹12,000 + GST"
      body="Leave your number and we'll call back with prices for UPI, coin, RFID and push-button models. GeM registered, GST invoice on every order, 1-year warranty."
      cta="Get the Price List"
      quickContact
    />
  );
}

export { FloatingContact as DeferredFloatingContact };
