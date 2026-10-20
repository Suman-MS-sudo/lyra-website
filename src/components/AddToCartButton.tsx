"use client";

import { addToCart, openCart, setCartQty, useCart } from "@/lib/cart";
import { sendEvent } from "@/lib/analytics";
import { IconBag, IconMinus, IconPlus } from "@/components/store/icons";

type Props = {
  slug: string;
  name: string;
  /** Unit price (ex-GST), sent to GA4 with the cart events. */
  price?: number;
  /**
   * primary: large button for the product page buy box
   * block:   full-width button for product cards
   * compact: small inline control for table rows and the sticky mobile bar
   */
  variant?: "primary" | "block" | "compact";
  /** Units added or removed per tap (100 for refill napkins). */
  qty?: number;
  className?: string;
};

const addBtn = {
  primary:
    "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition hover:bg-primary-700 active:scale-[0.985]",
  block:
    "flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-semibold text-canvas transition hover:bg-primary-600 hover:text-white active:scale-[0.985]",
  compact:
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-3 text-xs font-semibold text-white transition hover:bg-primary-700",
} as const;

const shell = {
  primary: "h-12 rounded-xl",
  block: "h-11 rounded-xl",
  compact: "h-9 rounded-lg",
} as const;

/**
 * Add to Cart that turns into a  −  count  +  stepper once the product is in the cart.
 * The first add opens the cart drawer so the buyer sees what happened.
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

  const inc = (first = false) => {
    addToCart(slug, qty);
    event("add_to_cart", qty);
    if (first) openCart();
  };
  const dec = () => {
    const removed = Math.min(qty, count);
    setCartQty(slug, count - qty);
    event("remove_from_cart", removed);
  };

  const wrap = variant === "compact" ? `inline-flex ${className}` : `w-full ${className}`;

  if (count === 0) {
    return (
      <div className={wrap}>
        <button type="button" onClick={() => inc(true)} className={addBtn[variant]} aria-label={`Add ${name} to cart`}>
          <IconBag className={variant === "compact" ? "h-3.5 w-3.5" : "h-[18px] w-[18px]"} />
          {qty > 1 ? (variant === "compact" ? `Add ${fmt(qty)}` : `Add ${fmt(qty)} to cart`) : "Add to cart"}
        </button>
      </div>
    );
  }

  return (
    <div className={wrap}>
      <div
        role="group"
        aria-label={`${name} quantity in cart`}
        className={`flex items-center justify-between border border-primary-600 bg-primary-50 font-semibold text-primary-700 ${shell[variant]} ${variant === "compact" ? "gap-1 px-0.5" : "w-full px-1"}`}
      >
        <button
          type="button"
          onClick={dec}
          aria-label={`Remove ${fmt(qty)} ${name} from cart`}
          className={`flex flex-none items-center justify-center rounded-lg transition hover:bg-primary-100 ${variant === "compact" ? "h-7 w-7" : "h-9 w-9"}`}
        >
          <IconMinus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={openCart}
          className={`tabular ${variant === "compact" ? "px-1 text-xs" : "text-sm"}`}
          aria-live="polite"
        >
          {fmt(count)}
          {variant !== "compact" && <span className="font-normal text-primary-700/80"> in cart · view</span>}
        </button>
        <button
          type="button"
          onClick={() => inc()}
          aria-label={`Add ${fmt(qty)} more ${name} to cart`}
          className={`flex flex-none items-center justify-center rounded-lg transition hover:bg-primary-100 ${variant === "compact" ? "h-7 w-7" : "h-9 w-9"}`}
        >
          <IconPlus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
