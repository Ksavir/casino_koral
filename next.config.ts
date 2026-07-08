import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd()
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.freetogame.com",
        pathname: "/g/**"
      }
    ]
  }
};

export default nextConfig;
