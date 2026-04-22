/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d29c1z66frfv6c.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dynamic.zacdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static-id.zacdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m231.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
}

module.exports = nextConfig
