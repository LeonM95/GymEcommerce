import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="sticky bot-0 z-50 bg-neutral-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left: Logo or Name */}
        <Link href="/">
          <Image
            src="/logo_white.png" // Make sure your logo.png is in the public folder
            alt="My Ecommerce Logo"
            width={100} // Adjust size as needed
            height={38}
            priority // Optional: loads image faster for important assets
          />
        </Link>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Gym Core. All rights reserved.
        </div>

        {/* Right: Simple Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <Link href="/" className="hover:text-red-400">
            Home
          </Link>
          <Link href="/locations" className="hover:text-red-400">
            Locations
          </Link>
          <Link href="/products" className="hover:text-red-400">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-red-400">
            Checkout
          </Link>
        </div>
      </div>
    </footer>
  );
};
