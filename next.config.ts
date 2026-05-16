import type { NextConfig } from 'next';
import withPWA from '@ducanh2912/next-pwa';

const nextConfig: NextConfig = {
  // Turbopack is the default dev server in Next.js 16.
  // @ducanh2912/next-pwa uses a webpack plugin which only runs during
  // `next build` (production) — Turbopack is never used there.
  // Empty turbopack config silences the dev-server warning.
  turbopack: {},
};

export default withPWA({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
  },
})(nextConfig);
