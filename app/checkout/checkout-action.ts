"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (FormData: FormData): Promise<void> => {
  const itemsJson = FormData.get("items") as string;
  const items = JSON.parse(itemsJson);
  // to re-structe cart object to be smilar to stripe object
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  // checkout session for stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  redirect(session.url!);
};
