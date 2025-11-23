/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: ['@react-pdf/renderer'],
}

module.exports = nextConfig
