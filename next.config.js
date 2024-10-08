/** @type {import('next').NextConfig} */
const nextConfig = {
  logging:{
    fetches:{
      fullUrl:true
    }
  },
    images: {
      remotePatterns: [
        { hostname: "files.edgestore.dev" },
        { hostname: "denonymous.xyz" }
      ]
    },
   
  }
  
  module.exports = nextConfig
  