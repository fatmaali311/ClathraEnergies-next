/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    remotePatterns: [
      // development (allow any port for localhost)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '',
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
