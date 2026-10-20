import { redirect } from "next/navigation";

/** Old cart/order URL: the cart now lives at /cart and payment at /checkout. */
export default function OrderPage({ searchParams }: { searchParams: { add?: string } }) {
  const add = typeof searchParams.add === "string" ? searchParams.add : "";
  redirect(add ? `/checkout?add=${encodeURIComponent(add)}` : "/cart");
}
