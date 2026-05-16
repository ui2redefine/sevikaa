'use client';
import { Palette } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme, COLOR_THEMES, type ColorTheme } from './ThemeProvider';
import { SITE_CONFIG } from '@/config/site.config';

// ── Constants ──────────────────────────────────────────────────────────────
const THEME_LABELS: Record<ColorTheme, string> = {
  default: 'Blue', emerald: 'Emerald', rose: 'Rose',
  saffron: 'Saffron', slate: 'Slate', teal: 'Teal', violet: 'Violet',
};

export default function ColorThemePicker() {
  const { colorTheme, setColorTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function onOutside({ target }: MouseEvent) {
      if (ref.current && !ref.current.contains(target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  function onSelect(theme: ColorTheme) {
    setColorTheme(theme);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="p-2 rounded-lg hover:bg-surface-subtle text-muted transition-colors"
        aria-label="Change colour theme"
        aria-expanded={open}
        title="Colour theme"
      >
        <Palette size={18} aria-hidden="true" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-40 bg-surface border border-subtle rounded-xl shadow-lg py-1.5 z-50 animate-slide-down"
          role="menu"
          aria-label="Colour theme options"
        >
          {COLOR_THEMES.map(theme => (
            <button
              key={theme}
              onClick={() => onSelect(theme)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-surface-subtle transition-colors ${colorTheme === theme ? 'font-semibold text-strong' : 'text-muted'}`}
              role="menuitemradio"
              aria-checked={colorTheme === theme}
            >
              <span
                className="w-4 h-4 rounded-full shrink-0 border-2"
                style={{
                  backgroundColor: SITE_CONFIG.themePrimaries[theme],
                  borderColor: colorTheme === theme ? SITE_CONFIG.themePrimaries[theme] : 'transparent',
                  outline: colorTheme === theme ? `2px solid ${SITE_CONFIG.themePrimaries[theme]}` : 'none',
                  outlineOffset: '2px',
                }}
                aria-hidden="true"
              />
              {THEME_LABELS[theme]}
              {colorTheme === theme && <span className="ml-auto text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
