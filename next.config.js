/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', '@radix-ui/react-primitive'],
  },
  webpack: (config) => {
    // react-pdf / pdfjs-dist needs canvas polyfill suppressed in browser builds
    config.resolve.alias.canvas = false
    return config
  },
};

module.exports = nextConfig;
