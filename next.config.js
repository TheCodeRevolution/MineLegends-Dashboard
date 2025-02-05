/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cravatar.eu',
        pathname: '/avatar/**',
      },
    ],
  },
}

module.exports = nextConfig 