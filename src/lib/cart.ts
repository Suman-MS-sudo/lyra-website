"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Browser-side cart: { [productSlug]: quantity } kept in localStorage so it survives
 * page loads, and shared live between every component (header badge, buttons, order page).
 * No account or server state: the order is only sent when the visitor submits /order.
 */

const KEY = "lyra_cart_v1";
export type CartItems = Record<string, number>;

const listeners = new Set<() => void>();
let memoryFallback = "{}"; // used if localStorage is blocked (private mode, etc.)

function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "{}";
  } catch {
    return memoryFallback;
  }
}

function write(items: CartItems) {
  const raw = JSON.stringify(items);
  memoryFallback = raw;
  try {
    window.localStorage.setItem(KEY, raw);
  } catch {
    /* storage blocked: the in-memory copy still works for this visit */
  }
  listeners.forEach((l) => l());
}

function parse(raw: string): CartItems {
  try {
    const v = JSON.parse(raw) as unknown;
    if (!v || typeof v !== "object") return {};
    const out: CartItems = {};
    for (const [k, q] of Object.entries(v as Record<string, unknown>)) {
      const n = Math.floor(Number(q));
      if (Number.isFinite(n) && n > 0) out[k] = Math.min(n, 100000);
    }
    return out;
  } catch {
    return {};
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb(); // other tabs
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function addToCart(slug: string, qty = 1) {
  const items = parse(readRaw());
  items[slug] = Math.min((items[slug] ?? 0) + qty, 100000);
  write(items);
}

export function setCartQty(slug: string, qty: number) {
  const items = parse(readRaw());
  if (qty <= 0) delete items[slug];
  else items[slug] = Math.min(Math.floor(qty), 100000);
  write(items);
}

export function clearCart() {
  write({});
}

/** Live cart contents. Renders an empty cart on the server and first paint (no hydration mismatch). */
export function useCart(): { items: CartItems; count: number } {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "{}");
  return useMemo(() => {
    const items = parse(raw);
    return { items, count: Object.values(items).reduce((a, b) => a + b, 0) };
  }, [raw]);
}
