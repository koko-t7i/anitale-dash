import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com'],
  },
  output: "standalone",
};
 
export default nextConfig;
