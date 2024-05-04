/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{remotePatterns:[{hostname:"files.edgestore.dev"},{hostname:"denonymous.xyz"}]}
}

module.exports = nextConfig
