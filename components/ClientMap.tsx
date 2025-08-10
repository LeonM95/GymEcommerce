// to render map only in client side not server
"use client";

import dynamic from "next/dynamic";

const ClientMap = dynamic(
  () => import("./MaptilerComponent"), // The path to your map component
  {
    ssr: false, // This tells Next.js not to include this component during the server-side rendering step
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-200">
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
  }
);

export default ClientMap;
