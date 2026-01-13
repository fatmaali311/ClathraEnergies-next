/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    domains: ['localhost', '127.0.0.1', 'api.clathraenergies.fr'],
    remotePatterns: [
      // development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/**',
      },
      //  production backend serves images, e.g.:
      {
        protocol: 'https',
        hostname: 'api.clathraenergies.fr',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
