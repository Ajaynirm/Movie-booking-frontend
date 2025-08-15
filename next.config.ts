import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.scdn.co","m.media-amazon.com"],

  },
  allowedDevOrigins: [
    'http://172.20.10.13:3000',
    'http://localhost:3000',
  ],
};

export default nextConfig;
