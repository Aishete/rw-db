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
        networkTimeoutSeconds: 10, // Optional: Set a timeout for network requests
        fetchOptions: {
          mode: "no-cors", // Optional: Set the fetch mode to 'no-cors' to handle failed requests
        },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
      },
    },
    {
      urlPattern: /\/dashboard\/admin/,
      handler: "CacheFirst",
      options: {
        cacheName: "dashboardCandidateCache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        },
      },
    },
    {
      urlPattern: /\/dashboard\/candidate/,
      handler: "CacheFirst",
      options: {
        cacheName: "dashboardCandidateCache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        },
      },
    },

    {
      urlPattern: /\/dashboard\/recruiter/,
      handler: "CacheFirst",
      options: {
        cacheName: "dashboardCandidateCache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        },
      },
    },
  ],
});

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
