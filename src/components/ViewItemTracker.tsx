"use client";

import { useEffect } from "react";
import { sendEvent } from "@/lib/analytics";

/** Fires GA4's standard ecommerce `view_item` once per product page view. Renders nothing. */
export default function ViewItemTracker({
  slug,
  name,
  price,
  category,
}: {
  slug: string;
  name: string;
  price: number;
  category: string;
}) {
  useEffect(() => {
    sendEvent("view_item", {
      currency: "INR",
      value: price,
      items: [{ item_id: slug, item_name: name, item_brand: "Lyra Enterprises", item_category: category, price, quantity: 1 }],
    });
  }, [slug, name, price, category]);
  return null;
}
