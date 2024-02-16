/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  // Fix dynamic fluent icon in graveyard.tsx to disable
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
