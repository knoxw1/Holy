/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [
    'sqlite3',
    'better-sqlite3',
    'puppeteer',
    'puppeteer-core',
    '@sparticuz/chromium',
    'canvas',
    'sharp'
  ],
  experimental: {
    serverComponentsExternalPackages: [
      'sqlite3',
      'better-sqlite3',
      'puppeteer',
      'puppeteer-core'
    ]
  }
}

export default nextConfig
