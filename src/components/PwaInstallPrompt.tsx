'use client';
import { useEffect, useState } from 'react';
import { X, Download, Share } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import { trackPwaInstall } from '@/lib/analytics';

type Platform = 'android' | 'ios' | null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const LS_KEY = '_gs.pwa_dismissed';

export default function PwaInstallPrompt() {
  const { t } = useLang();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [platform, setPlatform] = useState<Platform>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(LS_KEY)) return;

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator as unknown as { standalone: boolean }).standalone);
    if (isStandalone) return;

    const ua = navigator.userAgent;
    const isIos = /iphone|ipad|ipod/i.test(ua) && !/crios/i.test(ua);
    const isAndroid = /android/i.test(ua);

    if (isIos) {
      const timer = setTimeout(() => { setPlatform('ios'); setVisible(true); }, 8_000);
      return () => clearTimeout(timer);
    }

    if (isAndroid) {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setPlatform('android');
        setVisible(true);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem(LS_KEY, '1');
    setVisible(false);
  }

  async function install() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') { trackPwaInstall(); setVisible(false); }
    setDeferredPrompt(null);
  }

  if (!visible) return null;

  return (
    <>
      {/* pwaBackdrop: full-screen overlay */}
      <div
        className="pwaBackdrop fixed inset-0 z-40 bg-black/30 animate-fade-in"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* pwaSheet: slides up from bottom */}
      <div
        className="pwaSheet fixed bottom-0 inset-x-0 z-50 animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-label={t('pwa_aria_label')}
      >
        <div className="pwaSheetInner bg-surface rounded-t-2xl shadow-2xl px-5 pt-5 mx-0 max-w-lg sm:mx-auto sm:mb-4 sm:rounded-2xl"
          style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}
        >
          {/* pwaHandle: drag indicator */}
          <div className="pwaHandle w-10 h-1 rounded-full bg-surface-subtle mx-auto mb-4" aria-hidden="true" />

          <button
            onClick={dismiss}
            className="pwaDismissBtn absolute top-4 right-4 p-1.5 rounded-full hover:bg-surface-subtle text-muted"
            aria-label={t('pwa_dismiss')}
          >
            <X size={18} aria-hidden="true" />
          </button>

          {/* pwaAppInfo: logo + app name */}
          <div className="pwaAppInfo flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-192.png" alt="" className="w-14 h-14 rounded-2xl shadow-sm" aria-hidden="true" />
            <div>
              <div className="font-bold text-strong">{SITE_CONFIG.name}</div>
              <div className="text-xs text-muted">{t('pwa_tagline')}</div>
            </div>
          </div>

          {/* pwaAndroidSection: install button for Android */}
          {platform === 'android' && (
            <div className="pwaAndroidSection">
              <p className="text-sm text-default mb-4">{t('pwa_android_body')}</p>
              <button onClick={install} className="btn btn-primary w-full btn-lg">
                <Download size={18} aria-hidden="true" /> {t('pwa_android_btn')}
              </button>
            </div>
          )}

          {/* pwaIosSection: step-by-step instructions for iOS */}
          {platform === 'ios' && (
            <div className="pwaIosSection">
              <p className="text-sm text-default mb-4">{t('pwa_ios_body')}</p>
              <ol className="pwaIosSteps text-sm text-default space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0">1</span>
                  {t('pwa_ios_step1')} <Share size={14} className="inline text-brand mx-1" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0">2</span>
                  {t('pwa_ios_step2')} <strong>&ldquo;{t('pwa_ios_step2_label')}&rdquo;</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0">3</span>
                  {t('pwa_ios_step3')} <strong>&ldquo;{t('pwa_ios_step3_label')}&rdquo;</strong>
                </li>
              </ol>
              <button onClick={dismiss} className="btn btn-ghost w-full">{t('pwa_ios_got_it')}</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
