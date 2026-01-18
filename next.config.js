/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA configuration will be added later
  reactStrictMode: true,

  // Image optimization
  images: {
    domains: ['api.mapbox.com'],
  },

  // German (CH) as default locale
  i18n: {
    locales: ['de-CH'],
    defaultLocale: 'de-CH',
  },
}

module.exports = nextConfig
