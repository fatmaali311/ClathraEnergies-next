/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      // development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      //  production backend serves images, e.g.:
      {
        protocol: 'https',
        hostname: 'api.clathraenergies.fr',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
