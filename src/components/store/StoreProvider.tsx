"use client";

import { createContext, useContext, useMemo } from "react";
import type { CatalogItem } from "@/lib/catalog-types";

type Store = { catalog: CatalogItem[]; bySlug: Map<string, CatalogItem> };

const StoreContext = createContext<Store>({ catalog: [], bySlug: new Map() });

/** Makes the slim product catalogue available to every client component (cart, search, drawer). */
export default function StoreProvider({ catalog, children }: { catalog: CatalogItem[]; children: React.ReactNode }) {
  const value = useMemo(() => ({ catalog, bySlug: new Map(catalog.map((p) => [p.slug, p])) }), [catalog]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useCatalog() {
  return useContext(StoreContext);
}
