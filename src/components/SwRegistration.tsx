'use client';
import { useEffect } from 'react';

/** Registers the service worker from /sw.js for offline PWA support. */
export default function SwRegistration() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(reg => {
          console.log('[SW] Registered', reg.scope);
        })
        .catch(err => {
          console.warn('[SW] Registration failed', err);
        });
    });
  }, []);

  return null;
}
