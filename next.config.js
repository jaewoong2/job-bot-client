/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    domains: ['ywnfqdpcmgtllkshgzsl.supabase.co'],
  },
}

const devConfig = {
  images: {
    domains: ['ywnfqdpcmgtllkshgzsl.supabase.co'],
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
