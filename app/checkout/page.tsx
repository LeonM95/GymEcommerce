"use client";
import { useCartStore } from "@/store/cart-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  // to get total price of items
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div>
        <h1> Your Cart is empty</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item, key) => (
              <li key={key} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium"> {item.name} </span>
                  {/* to get price with two decimals*/}
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                {/* To increase decrease quantity purchase products */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => removeItem(item.id)}>
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button onClick={() => addItem({ ...item, quantity: 1 })}>
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <form className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant={"default"} className="w-full">
          Procced to payment
        </Button>
      </form>
    </div>
  );
}
