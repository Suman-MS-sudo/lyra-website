"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const GST_RATE = 0.18;

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function CartDrawer() {
  const { items, totalItems, removeFromCart, updateQuantity, clearCart, isDrawerOpen, closeDrawer } =
    useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  /* Close on Escape key */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    if (isDrawerOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  /* Prevent body scroll when open */
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );
  const taxableSubtotal = items.reduce(
    (sum, item) => item.product.category !== "napkin" ? sum + item.product.discountedPrice * item.quantity : sum,
    0
  );
  const gst = Math.round(taxableSubtotal * GST_RATE);
  const total = subtotal + gst;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="text-base font-bold text-gray-900">
                  Cart {totalItems > 0 && <span className="ml-1 text-sm text-primary-600">({totalItems} item{totalItems !== 1 ? "s" : ""})</span>}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-500 font-medium hover:text-red-700 transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={closeDrawer}
                  aria-label="Close cart"
                  className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                  <div className="rounded-full bg-gray-100 p-5">
                    <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-900">Your cart is empty</p>
                  <p className="text-sm text-gray-500 max-w-xs">Browse our vending machines and incinerators and add items to your cart.</p>
                  <Link
                    href="/products"
                    onClick={closeDrawer}
                    className="mt-2 rounded-2xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.slug} className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      {/* Product thumbnail */}
                      <div className={`relative h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br ${item.product.accent} overflow-hidden`}>
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 truncate">{item.product.code}</p>
                        <p className="text-sm font-bold text-gray-900 leading-tight mt-0.5 truncate">{item.product.fullName}</p>
                        <p className="mt-1 text-sm font-semibold text-primary-600">
                          {formatCurrency(item.product.discountedPrice)} <span className="text-xs font-normal text-gray-400">/ unit</span>
                        </p>

                        {/* Qty controls */}
                        <div className="mt-2.5 flex items-center gap-2">
                          {item.product.category === "napkin" ? (
                            <div className="flex items-center gap-1.5 rounded-xl border border-primary-300 bg-primary-50 px-3 py-1.5">
                              <span className="text-xs font-semibold text-primary-700">Qty</span>
                              <input
                                type="number"
                                min={100}
                                step={100}
                                value={item.quantity}
                                onChange={(e) => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 1) updateQuantity(item.product.slug, v); }}
                                onBlur={(e) => { const v = parseInt(e.target.value) || 100; updateQuantity(item.product.slug, Math.max(100, Math.round(v / 100) * 100)); }}
                                className="w-16 text-center text-sm font-bold text-primary-800 bg-transparent border-none outline-none"
                              />
                              <span className="text-xs text-primary-600">pcs</span>
                            </div>
                          ) : (
                            <div className="flex items-center rounded-xl border border-gray-200 bg-white overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                                className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                                className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          )}
                          <span className="ml-auto text-sm font-bold text-gray-900">
                            {formatCurrency(item.product.discountedPrice * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.slug)}
                        aria-label="Remove item"
                        className="self-start p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with totals + checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-4 bg-white">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <dt>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</dt>
                    <dd className="font-semibold text-gray-900">{formatCurrency(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <dt>{gst > 0 ? "GST (18%)" : "GST"}</dt>
                    <dd className="font-semibold text-gray-900">{gst > 0 ? formatCurrency(gst) : "Exempt"}</dd>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-2 text-base">
                    <dt className="font-bold text-gray-900">Total Payable</dt>
                    <dd className="font-extrabold text-gray-900 text-lg">{formatCurrency(total)}</dd>
                  </div>
                </dl>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="block w-full rounded-2xl bg-gradient-to-r from-primary-600 to-pink-500 hover:from-primary-700 hover:to-pink-600 py-4 text-center text-sm font-bold text-white transition-all duration-200 shadow-lg hover:shadow-primary-200/50 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Proceed to Checkout →
                </Link>
                <button
                  onClick={closeDrawer}
                  className="block w-full rounded-2xl border border-gray-200 py-3 text-center text-sm font-semibold text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors"
                >
                  Continue Shopping
                </button>
                {/* Trust signals */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 leading-tight">100% Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 leading-tight">Pan-India</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 leading-tight">GST Invoice</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
