import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nativeflow.app',
      },
      {
        protocol: 'https',
        hostname: 'learnsql.dev',
      },
    ],
  },
};

export default nextConfig;
