import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //add stripe domain to allow to serve images
  images: {
    domains: ["files.stripe.com"],
  },
};

export default nextConfig;
