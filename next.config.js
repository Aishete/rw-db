/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true,
  cacheStartUrl: true,
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  extendDefaultRuntimeCaching: true,
  dynamicStartUrl: true,
  dynamicStartUrlRedirect: true,
  // Skip waiting for service worker activation
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /\/dashboard\/admin/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "dashboardAdminCache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        },
        networkTimeoutSeconds: 10, // Set network timeout
      },
    },
    {
      urlPattern: /\/dashboard\/candidate/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "dashboardCandidateCache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        },
        networkTimeoutSeconds: 10, // Set network timeout
      },
    },
    {
      urlPattern: /\/dashboard\/recruiter/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "dashboardRecruiterCache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        },
        networkTimeoutSeconds: 10, // Set network timeout
      },
    },
  ],
});

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
