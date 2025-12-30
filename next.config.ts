import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'jtjzaensengmvkodvmka.supabase.co',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
