// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // ignoreBuildErrors: true, // Disable TypeScript build errors
  },
  eslint: {
    // ignoreDuringBuilds: true, // Disable linting during build
  },
  images: {
    domains: ['img.alicdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.alicdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
