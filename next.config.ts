import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
/** @type {import('tailwindcss').Config} */
const nextConfig: NextConfig = {
  output: 'standalone',
  // optimizeFonts: false,
  poweredByHeader: false,
  // swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    // mdxRs: true,
    // turbo: {
    //   resolveExtensions: [
    //     ".mdx",
    //     ".tsx",
    //     ".ts",
    //     ".jsx",
    //     ".js",
    //     ".mjs",
    //     ".json",
    //   ],
    // },
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },

  env: {
    // AWS_REGION: process.env.AWS_REGION,
    ADMIN_DB_URL: process.env.ADMIN_DB_URL,
    // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    // AWS_SECRET_KEY_ID: process.env.AWS_SECRET_KEY_ID,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
