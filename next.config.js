/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  // Allow cross-origin requests from local network IP
  allowedDevOrigins: ['10.233.1.59'],
}

module.exports = nextConfig
