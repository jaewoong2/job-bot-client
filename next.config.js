/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:54321/functions/v1/:path*',
      },
    ]
  },
}

module.exports = nextConfig
