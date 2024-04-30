const createNextIntlPlugin = require('next-intl/plugin')
 
const withNextIntl = createNextIntlPlugin(
  './app/lib/i18n.js'
)

const withBundleAnalyzer = require('@next/bundle-analyzer')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
  webpack: (
    config,
    { dev },
  ) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: 'memory',
      })
      config.cache.maxMemoryGenerations = 0
    }
    // Important: return the modified config
    return config
  },
}
 
module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : withNextIntl(nextConfig)
