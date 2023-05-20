/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ywnfqdpcmgtllkshgzsl.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/image/**',
      },
    ],
  },
}

const devConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ywnfqdpcmgtllkshgzsl.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/image/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:54321/functions/v1/:path*',
      },
    ]
  },
}

module.exports = process.env.NODE_ENV === 'development' ? devConfig : nextConfig
