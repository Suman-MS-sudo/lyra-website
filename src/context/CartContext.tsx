"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/data";

/* ─── Types ─────────────────────────────────────────────────── */
export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

/* ─── Context ───────────────────────────────────────────────── */
const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "lyra_cart";
const MAX_QUANTITY_DEFAULT = 10;
const MAX_QUANTITY_NAPKIN = 10000;

function getMaxQty(product: Product) {
  return product.category === "napkin" ? MAX_QUANTITY_NAPKIN : MAX_QUANTITY_DEFAULT;
}

/* ─── Provider ──────────────────────────────────────────────── */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /* Hydrate from localStorage once on client */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  /* Persist to localStorage on every change */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items, hydrated]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    const max = getMaxQty(product);
    setItems((current) => {
      const existing = current.find((i) => i.product.slug === product.slug);
      if (existing) {
        return current.map((i) =>
          i.product.slug === product.slug
            ? { ...i, quantity: Math.min(max, i.quantity + quantity) }
            : i
        );
      }
      return [...current, { product, quantity: Math.min(max, quantity) }];
    });
    setIsDrawerOpen(true);
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setItems((current) => current.filter((i) => i.product.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((i) => i.product.slug !== slug));
      return;
    }
    setItems((current) =>
      current.map((i) => {
        if (i.product.slug !== slug) return i;
        return { ...i, quantity: Math.min(getMaxQty(i.product), quantity) };
      })
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ─── Hook ──────────────────────────────────────────────────── */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
