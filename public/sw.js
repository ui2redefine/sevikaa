/**
 * Gruha Saathi — Service Worker
 * Strategy: cache-first for static assets, network-first for pages.
 * Offline fallback served from cache when network unavailable.
 */

const CACHE_NAME = 'gs-v1';

/** Pages to pre-cache on install */
const PRECACHE_URLS = [
  '/',
  '/services',
  '/hire',
  '/join',
  '/about',
  '/contact',
  '/manifest.json',
];

// ── Install: pre-cache key routes ─────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

// ── Activate: purge old caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)),
      ))
      .then(() => self.clients.claim()),
  );
});

// ── Fetch: cache-first for same-origin GET requests ───────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests for same-origin
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;
  // Skip Next.js internal requests
  if (request.url.includes('/_next/webpack-hmr')) return;
  if (request.url.includes('/_next/static/webpack')) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        // Cache successful same-origin responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback: return cached homepage
        return caches.match('/') ?? Response.error();
      });
    }),
  );
});
