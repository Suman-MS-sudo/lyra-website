"use client";

import { ensureInCart, openCart } from "@/lib/cart";
import { sendEvent } from "@/lib/analytics";
import { IconBag } from "@/components/store/icons";

/** Adds every product of a bundle to the cart (once each) and opens the cart drawer. */
export default function AddBundleButton({ items, label = "Add both to cart" }: { items: { slug: string; name: string; price: number }[]; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        items.forEach((i) => ensureInCart(i.slug, 1));
        sendEvent("add_to_cart", {
          currency: "INR",
          value: items.reduce((s, i) => s + i.price, 0),
          items: items.map((i) => ({ item_id: i.slug, item_name: i.name, price: i.price, quantity: 1 })),
        });
        openCart();
      }}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-semibold text-canvas transition hover:bg-primary-600 hover:text-white active:scale-[0.985]"
    >
      <IconBag className="h-[18px] w-[18px]" />
      {label}
    </button>
  );
}
