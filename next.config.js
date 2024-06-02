const createNextIntlPlugin = require('next-intl/plugin')
 
const withNextIntl = createNextIntlPlugin(
  './app/lib/i18n.js'
)

const withBundleAnalyzer = require('@next/bundle-analyzer')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {}
 
module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : withNextIntl(nextConfig)
