/**
 * Order maths shared by the browser (cart, checkout) and the server (order + payment APIs),
 * so the total a buyer sees is exactly the total Razorpay is asked to collect.
 *
 * Prices are ex-GST pricelist MRP. Machines and incinerators carry 18% GST;
 * sanitary napkins are GST-exempt in India. Freight is billed separately by pincode.
 */

export const GST_RATE = 0.18;

export type ProductCategory = "vending-machine" | "incinerator" | "napkin";

export type PricedLine = { price: number; category: ProductCategory; qty: number };

export type Totals = { subtotal: number; taxable: number; gst: number; total: number };

export function computeTotals(lines: PricedLine[]): Totals {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const taxable = lines.filter((l) => l.category !== "napkin").reduce((s, l) => s + l.price * l.qty, 0);
  const gst = Math.round(taxable * GST_RATE);
  return { subtotal, taxable, gst, total: subtotal + gst };
}

/** Units added per tap: refill napkins are sold in packs of 100. */
export function stepFor(category: ProductCategory): number {
  return category === "napkin" ? 100 : 1;
}

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
