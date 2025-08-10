"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export const Navbar = () => {
  const { items } = useCartStore();
  // total items that has been added to cart
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  //to handle mobilenavbar
  useEffect(() => {
    const handleRezise = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleRezise);
    // to avoid memory leaks
    return () => window.removeEventListener("resize", handleRezise);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      {/* div for all navbar */}
      <div className="container mx-auto flex items-center justify-between px-4 py-0">
        {/* logo */}
        <Link href="/" className="py-0">
          <Image
            src="/logo_black.png" // Make sure your logo.png is in the public folder
            alt="My Ecommerce Logo"
            width={120} // Adjust size as needed
            height={40}
            priority // Optional: loads image faster for important assets
          />
        </Link>
        {/* hide navbar mobile devices - elemets navbar */}
        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/locations" className="hover:text-red-600">
            Locations
          </Link>
          <Link href="/products" className="hover:text-red-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-red-600">
            Checkout
          </Link>
        </div>
        {/* cart  */}
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
          {/* //onmclick set open to opposite it is */}
          <Button
            variant="ghost"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden"
          >
            {mobileOpen ? <XMarkIcon /> : <Bars3Icon />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/" className="block hover:text-red-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/locations" className="block hover:text-red-600">
                Locations
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-red-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-red-600">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
