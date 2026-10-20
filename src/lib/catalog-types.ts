import type { ProductCategory } from "@/lib/pricing";

/** Client-safe product summary (no long descriptions). Built on the server by lib/catalog.ts. */
export type CatalogItem = {
  slug: string;
  name: string;
  fullName: string;
  code: string;
  category: ProductCategory;
  price: number;
  badge: string;
  popular: boolean;
  tagline: string;
  image: string;
  highlights: string[];
  payment?: string;
  connectivity?: string;
  iot: boolean;
};

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  "vending-machine": "Vending machines",
  incinerator: "Incinerators",
  napkin: "Refill napkins",
};
