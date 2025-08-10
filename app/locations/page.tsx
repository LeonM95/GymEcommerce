// app/locations/page.tsx

"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function LocationsPage() {
  // logic to load map
  const Map = useMemo(
    () =>
      dynamic(
        () => import("@/components/MaptilerComponent"), // path of map component
        {
          ssr: false, //  to do not load element on server only on client side
          loading: () => (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <p className="text-gray-500">Loading map...</p>
            </div>
          ),
        }
      ),
    []
  );

  const storeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 10:00 PM" },
    { day: "Saturday", hours: "11:00 AM - 8:00 PM" },
    { day: "Sunday", hours: "12:00 AM - 8:00 PM" },
  ];

  // Using the San Jose coordinates you requested
  const contactInfo = {
    address: "10 E Jacksoon St, San Jose, CA 95113",
    phone: "(408) 555-0123",
    email: "info@gymcore.com",
    lat: 37.3512,
    lng: -121.8905,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Our Store Location
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Visit our San Jose store for hands-on experience with premium gym
          equipment, expert advice, and personalized gear recommendations.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left Column: Store Information Cards */}
        <div className="space-y-6">
          {/* Contact Information Card */}
          <Card className="border-gray-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MapPinIcon className="h-6 w-6" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-gray-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-600 hover:text-red-600"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-600 hover:text-red-600"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Hours Card */}
          <Card className="border-gray-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ClockIcon className="h-6 w-6" />
                Store Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {storeHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-900">
                      {schedule.day}
                    </span>
                    <span className="text-gray-600">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: The map container */}
        <div className="w-full h-[400px] lg:h-full rounded-2xl overflow-hidden border-2 border-gray-300">
          <Map lat={contactInfo.lat} lng={contactInfo.lng} />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="default"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
          >
            <a
              href={`https://www.openstreetmap.org/directions?from=&to=${contactInfo.lat},${contactInfo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 border-black text-black hover:bg-black hover:text-white"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
