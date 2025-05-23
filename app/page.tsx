import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  // fetch products from stripe
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      {/* section for image hero */}
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to my Ecommerce
            </h2>
            <p className="text-neutral-600">
              Discover the latest producs at the best prices.
            </p>
            {/* this button comes from shadcn*/}
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse all products
              </Link>
            </Button>
          </div>

          <Image
            alt="Hero Image"
            src={products.data[1].images[0]}
            className="rounded"
            width={450}
            height={450}
          />
        </div>
      </section>
      {/* section for carrusel */}
      <section className="py-8">
        {/* caroulse component */}
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
