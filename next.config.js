const createNextIntlPlugin = require('next-intl/plugin')
 
const withNextIntl = createNextIntlPlugin(
  './app/lib/i18n.js'
)
 
/** @type {import('next').NextConfig} */
const nextConfig = {}
 
module.exports = withNextIntl(nextConfig)
// module.exports = nextConfig