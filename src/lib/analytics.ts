/**
 * analytics.ts — thin wrapper around window.gtag for GA4 custom events.
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics';
 *   trackEvent('form_submit', { form_name: 'hire_helper', city: 'Bangalore' });
 *
 * Only fires when NEXT_PUBLIC_GA_ID is set and gtag is loaded.
 * Safe to call on every env — no-ops silently when GA4 is absent.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GaParams = Record<string, string | number | boolean | undefined>;

/**
 * Track a GA4 custom event.
 * @param eventName - snake_case GA4 event name (e.g. 'form_submit', 'whatsapp_click')
 * @param params    - optional key/value parameters visible in GA4 reports
 */
export function trackEvent(eventName: string, params?: GaParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

// ── Typed helpers for the events we care about ────────────────────────────────

/** Call after a Web3Forms submission succeeds */
export function trackFormSubmit(formName: 'hire_helper' | 'join_helper' | 'contact', city?: string): void {
  trackEvent('form_submit', { form_name: formName, city });
}

/** Call when any WhatsApp link is tapped */
export function trackWhatsappClick(source: string): void {
  trackEvent('whatsapp_click', { source });
}

/** Call when any phone/call link is tapped */
export function trackCallClick(source: string): void {
  trackEvent('call_click', { source });
}

/** Call after PWA install prompt is accepted */
export function trackPwaInstall(): void {
  trackEvent('pwa_install');
}
