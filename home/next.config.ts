import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.pexels.com'],
  },
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: 'http://cart:3001/cart/:path*',
      },
    ]
  },
}

export default nextConfig
