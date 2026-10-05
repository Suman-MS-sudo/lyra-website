"use client";

import Link from "next/link";
import { addToCart, setCartQty, useCart } from "@/lib/cart";
import { sendEvent } from "@/lib/analytics";

type Props = {
  slug: string;
  name: string;
  /** Unit price (ex-GST), sent to GA4 with the cart events. */
  price?: number;
  /**
   * primary: big pill for the product page buy box
   * block:   full-width button for product cards
   * compact: small inline control for table rows and the sticky mobile bar
   */
  variant?: "primary" | "block" | "compact";
  /** Units added or removed per tap (100 for refill napkins). */
  qty?: number;
  className?: string;
};

const shell = {
  primary: "rounded-full px-2 py-1.5 text-sm",
  block: "rounded-xl px-2 py-1.5 text-sm",
  compact: "rounded-lg px-1 py-0.5 text-xs",
} as const;

const addBtn = {
  primary:
    "flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 text-sm font-bold text-gray-900 shadow transition hover:bg-amber-500",
  block:
    "flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-amber-500",
  compact:
    "inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-gray-900 transition hover:bg-amber-500",
} as const;

const stepBtn = {
  primary: "h-9 w-9 text-xl",
  block: "h-8 w-8 text-lg",
  compact: "h-6 w-6 text-base",
} as const;

const CartIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.3 2.6A1 1 0 006.6 17H19M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
  </svg>
);

/**
 * Add to Cart that turns into a  −  count  +  stepper once the product is in the cart,
 * like a typical e-commerce site. Stepping down to 0 removes it and the button comes back.
 */
export default function AddToCartButton({ slug, name, price, variant = "block", qty = 1, className = "" }: Props) {
  const { items } = useCart();
  const count = items[slug] ?? 0;
  const fmt = (n: number) => n.toLocaleString("en-IN");

  const event = (kind: "add_to_cart" | "remove_from_cart", n: number) =>
    sendEvent(kind, {
      currency: "INR",
      value: price === undefined ? undefined : price * n,
      items: [{ item_id: slug, item_name: name, price, quantity: n }],
    });

  const inc = () => {
    addToCart(slug, qty);
    event("add_to_cart", qty);
  };
  const dec = () => {
    const removed = Math.min(qty, count);
    setCartQty(slug, count - qty);
    event("remove_from_cart", removed);
  };

  const wrap = variant === "compact" ? `inline-flex flex-col items-start ${className}` : `w-full ${className}`;

  if (count === 0) {
    return (
      <div className={wrap}>
        <button type="button" onClick={inc} className={addBtn[variant]} aria-label={`Add ${name} to cart`}>
          <CartIcon className={variant === "compact" ? "h-3.5 w-3.5" : "h-4 w-4"} />
          {qty > 1 ? (variant === "compact" ? `Add ${fmt(qty)}` : `Add ${fmt(qty)} to Cart`) : "Add to Cart"}
        </button>
      </div>
    );
  }

  return (
    <div className={wrap}>
      <div
        role="group"
        aria-label={`${name} quantity in cart`}
        className={`flex items-center justify-between bg-amber-400 font-bold text-gray-900 ${shell[variant]} ${variant === "compact" ? "gap-1" : "w-full shadow"}`}
      >
        <button
          type="button"
          onClick={dec}
          aria-label={`Remove ${fmt(qty)} ${name} from cart`}
          className={`flex flex-none items-center justify-center rounded-full leading-none hover:bg-amber-500 ${stepBtn[variant]}`}
        >
          −
        </button>
        <span className="min-w-[2ch] px-2 text-center tabular-nums" aria-live="polite">
          {fmt(count)}
        </span>
        <button
          type="button"
          onClick={inc}
          aria-label={`Add ${fmt(qty)} more ${name} to cart`}
          className={`flex flex-none items-center justify-center rounded-full leading-none hover:bg-amber-500 ${stepBtn[variant]}`}
        >
          +
        </button>
      </div>
      {variant !== "compact" && (
        <p className="mt-1.5 text-center text-xs text-gray-600">
          <Link href="/order" className="font-semibold text-primary-700 hover:underline">
            View cart →
          </Link>
        </p>
      )}
    </div>
  );
}
