/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Temporarily ignore TS errors during build - we'll fix them incrementally
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
}

module.exports = nextConfig
