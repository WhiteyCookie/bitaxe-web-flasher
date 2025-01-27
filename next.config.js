/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.NODE_ENV === 'production'
    ? { basePath: '/bitaxe-web-flasher', assetPrefix: '/bitaxe-web-flasher' }
    : {}),
  images: {
    unoptimized: true, // Optional: If you don't need image optimization
  },
};

module.exports = nextConfig;
