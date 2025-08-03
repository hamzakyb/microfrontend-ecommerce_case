import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.pexels.com'],
  },
  async rewrites() {
    return [
      {
        source: '/home/:path*',
        destination: 'http://home:3000/home/:path*',
      },
    ]
  },
};

export default nextConfig;
