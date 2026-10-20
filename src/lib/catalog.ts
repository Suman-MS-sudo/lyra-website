import { products, type Product } from "@/lib/data";
import type { CatalogItem } from "@/lib/catalog-types";

export type { CatalogItem } from "@/lib/catalog-types";

/**
 * Server-side: builds the slim, client-safe view of each product. The full catalogue in
 * data.ts carries long SEO descriptions; only this subset is sent to the browser for the
 * cart, header search and shop grid.
 */
export function toCatalogItem(p: Product): CatalogItem {
  return {
    slug: p.slug,
    name: p.name,
    fullName: p.fullName,
    code: p.code,
    category: p.category,
    price: p.price,
    badge: p.badge,
    popular: Boolean(p.popular),
    tagline: p.tagline,
    image: p.image,
    highlights: p.features.slice(0, 3),
    payment: p.compare?.payment,
    connectivity: p.compare?.connectivity,
    iot: p.compare?.iotMonitoring === "Yes",
  };
}

export function getCatalog(): CatalogItem[] {
  return products.map(toCatalogItem);
}
