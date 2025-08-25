import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/guarantee", destination: "/blog", permanent: true },
      { source: "/guarantees", destination: "/blog", permanent: true },
      { source: "/faq", destination: "/docs", permanent: true },
    ];
  },
};

export default nextConfig;