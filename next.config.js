require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost"],
  },
  env: {
    API_ENDPOINT: process.env.NEXT_PUBLIC_STRAPI_API_URL
  }
}

module.exports = nextConfig
