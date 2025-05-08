import Image from "next/image";
import styles from "./page.module.css";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  // fetch products from stripe
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <section>
        <div>
          <div>
            <h2>Welcome to my Ecommerce</h2>
            <p>Discover the latest producs at the best prices.</p>
            {/* this button comes from shadcn*/}
            <Button asChild variant="default">
              <Link href="/products">Browse all products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
