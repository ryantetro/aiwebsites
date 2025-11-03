import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "image.thum.io",
      },
      {
        protocol: "https",
        hostname: "screenshot.rocks",
      },
      {
        protocol: "https",
        hostname: "mini.s-shot.ru",
      },
    ],
  },
};

export default nextConfig;
