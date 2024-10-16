/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add custom headers including CORS headers
  async headers() {
    return [
      {
        // Apply these headers to all API routes under /api/*
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true", // Allows credentials like cookies to be sent with requests
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow requests from any origin. Replace '*' with your domain for more security.
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS", // Allow these HTTP methods
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Authorization, Content-Type, Origin",
          },
        ],
      },
    ];
  },

  // Environment variables, exposed to the server and client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Accessible on the client-side (browser)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, // Accessible in browser
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY, // Accessible only on the server
  },
};

module.exports = nextConfig;
