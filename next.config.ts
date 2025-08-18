import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.ytimg.com",
      "static.toiimg.com",
      "www.ntvenglish.com",
      "etvbharatimages.akamaized.net",
      "img.studioflicks.com",
    ],
  },
  //  This must be here—not under `experimental`
  allowedDevOrigins: [
    "http://172.20.10.13:3000",
    "http://localhost:3000",
    "172.20.10.13:3000"
  ],
};

export default nextConfig;





