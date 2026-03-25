import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['jsdom', 'isomorphic-dompurify'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'uomvaouwntiiyysoomhf.supabase.co',
      },
    ],
  },
};

export default nextConfig;
