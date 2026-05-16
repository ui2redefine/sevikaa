'use client';
import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Analytics — renders:
 *  1. Vercel Analytics (free, auto-enabled on Vercel deploys — tracks pageviews,
 *     Web Vitals, unique visitors, referrers, countries, devices)
 *  2. Google Analytics 4 (optional — only loads if NEXT_PUBLIC_GA_ID is set)
 *     Tracks: pageviews, events, sessions, user properties, funnels, conversions
 */
export default function Analytics() {
  return (
    <>
      {/* Vercel Analytics — zero config, GDPR-friendly, no cookies */}
      <VercelAnalytics />

      {/* Google Analytics 4 — add NEXT_PUBLIC_GA_ID to .env.local to enable */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure',
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}
