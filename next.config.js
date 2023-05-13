/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const spheronConfig = isProd
  ? {
      images: {
        unoptimized: true,
      },
      trailingSlash: true,
    }
  : {};
const nextConfig = {
  reactStrictMode: true,
  ...spheronConfig,
};

module.exports = nextConfig;
