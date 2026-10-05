import { redirect } from "next/navigation";

/** /cart is an alias: the cart and the order request form live on /order. */
export default function CartPage() {
  redirect("/order");
}
