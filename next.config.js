/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { hostname: "files.edgestore.dev" },
        { hostname: "denonymous.xyz" }
      ]
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Forwarded-For',
              value: '$remote_addr', // Ensure the real client IP is forwarded
            },
          ],
        },
      ];
    },
  }
  
  module.exports = nextConfig
  