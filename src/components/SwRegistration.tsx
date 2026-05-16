'use client';
import { useEffect } from 'react';

/** Registers the service worker and handles background updates.
 *  When a new SW installs while users are on the page, it sends
 *  SKIP_WAITING to the waiting worker so it activates immediately.
 *  The `controllerchange` event then reloads the page seamlessly.
 */
export default function SwRegistration() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let refreshing = false;

    // Reload once when a new SW takes control
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    // Listen for SW_UPDATED broadcast from the activated worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'SW_UPDATED') {
        console.log('[SW] New version active — reloading');
      }
    });

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(reg => {
          console.log('[SW] Registered', reg.scope);

          // New SW waiting → send SKIP_WAITING immediately
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }

          // SW found during update check
          reg.addEventListener('updatefound', () => {
            const installing = reg.installing;
            if (!installing) return;
            installing.addEventListener('statechange', () => {
              if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                // A new version is ready — tell it to skip waiting
                installing.postMessage({ type: 'SKIP_WAITING' });
              }
            });
          });
        })
        .catch(err => {
          console.warn('[SW] Registration failed', err);
        });
    });
  }, []);

  return null;
}

