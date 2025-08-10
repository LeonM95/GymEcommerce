"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 max-w-6xl mx-auto py-8">
      {/* about text */}
      <div className="flex-1 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Gym Core
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          At Gym Core Supply, we’re more than just a store—we’re a trusted
          partner in your training journey. Whether you're lifting in the gym,
          grinding on the mat, or pushing limits on the field, we provide the
          gear that keeps you moving forward.
        </p>

        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-300 leading-relaxed mb-6">
          Our mission is simple: equip athletes, trainers, and sports
          enthusiasts with premium-quality equipment built for real performance.
          From strength training to combat sports, functional fitness to
          recovery tools, we carefully select products that support every type
          of sport and every level of athlete.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mb-8">
          {["Top-Tier Gear", "Multi-Sport Ready", "Athlete-Focused"].map(
            (feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            )
          )}
        </div>

        {/* CTA Button */}
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

      {/* about image */}
      <div className="flex-shrink-0 max-w-lg lg:max-w-md w-full">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
          <Image
            src="/about2.png"
            alt="High-performance gym equipment and training gear"
            width={400}
            height={300}
            className="object-cover w-full h-100 lg:h-100 transition-transform duration-300 group-hover:scale-105"
          />

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
