import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [],
    unoptimized: true, // Allows serving from /public without an external loader
  },
};

export default nextConfig;
