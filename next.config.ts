import type { NextConfig } from 'next';
import withSerwist from '@serwist/next';

const nextConfig: NextConfig = {
  // Turbopack is the default dev server in Next.js 16.
  // @serwist/next uses a webpack plugin which only runs during
  // `next build` (production) — Turbopack is never used there.
  turbopack: {},
};

export default withSerwist({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
