/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = withPWA({
  // other congigs
  reactStrictMode: false,
});
