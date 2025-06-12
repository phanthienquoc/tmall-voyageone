// next.config.ts
import type { NextConfig } from 'next'
import withPlugins from 'next-compose-plugins'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
  },
}

export default withPlugins([], nextConfig)
