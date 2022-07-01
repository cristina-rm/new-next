require('dotenv').config()

/** @type {import('next').NextConfig} */
/*const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost"],
  },
  env: {
    API_ENDPOINT: process.env.NEXT_PUBLIC_STRAPI_API_URL
  }
}

module.exports = nextConfig*/

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/timegrid",
  "react-clock",
  "react-time-picker",
  // "@babel/preset-react",
]);

module.exports = withTM({
  // your custom config goes here
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost"],
  },
  env: {
    API_ENDPOINT: process.env.NEXT_PUBLIC_STRAPI_API_URL
  },
});
