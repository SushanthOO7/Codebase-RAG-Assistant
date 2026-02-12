import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://api:8000/:path*" }
    ];
  }
};

export default nextConfig;
