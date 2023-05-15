/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'
const spheronConfig = isProd
  ? {
      images: {
        unoptimized: true,
      },
      trailingSlash: true,
    }
  : {}
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/token',
        destination: 'https://dataverse-be.vercel.app/api/token',
      },
    ]
  },
  ...spheronConfig,
}

module.exports = nextConfig
