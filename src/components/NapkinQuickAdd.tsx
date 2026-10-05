"use client";

import { addToCart } from "@/lib/cart";
import { sendEvent } from "@/lib/analytics";

/** Bulk quick-add buttons for refill napkins, which are bought in hundreds and thousands. */
export default function NapkinQuickAdd({ slug, name, price }: { slug: string; name: string; price: number }) {
  const add = (n: number) => {
    addToCart(slug, n);
    sendEvent("add_to_cart", {
      currency: "INR",
      value: price * n,
      items: [{ item_id: slug, item_name: name, price, quantity: n }],
    });
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-500">Add more to cart:</span>
      {[500, 1000, 5000].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => add(n)}
          className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-gray-800 transition hover:bg-amber-100"
        >
          +{n.toLocaleString("en-IN")}
        </button>
      ))}
    </div>
  );
}
