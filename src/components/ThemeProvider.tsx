'use client';
/**
 * ThemeProvider
 * ─────────────
 * Manages two independent theme axes:
 *   1. data-mode="dark"        — toggled by useDarkMode()
 *   2. data-color-theme="X"    — switched by useColorTheme()
 *
 * Both are persisted in localStorage with _gs. prefix and applied
 * to <html> so CSS variables and Tailwind dark: classes both work.
 */
import { createContext, useContext, useEffect, useState } from 'react';

// ── Constants ──────────────────────────────────────────────────────────────
const LS_DARK_KEY         = '_gs.mode';
const LS_COLOR_THEME_KEY  = '_gs.color-theme';

export const COLOR_THEMES = [
  'default', 'emerald', 'rose', 'saffron', 'slate', 'teal', 'violet',
] as const;
export type ColorTheme = (typeof COLOR_THEMES)[number];

// ── Context ───────────────────────────────────────────────────────────────
interface ThemeCtx {
  isDark: boolean;
  toggleDark: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (t: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  isDark: false,
  toggleDark: () => {},
  colorTheme: 'default',
  setColorTheme: () => {},
});

export function useTheme() { return useContext(ThemeContext); }

// ── Provider ──────────────────────────────────────────────────────────────
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark]           = useState(false);
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('default');

  // Sync state from localStorage on mount (the inline <script> in layout already
  // applied the attributes before hydration to prevent FOUC).
  useEffect(() => {
    try {
      const m = localStorage.getItem(LS_DARK_KEY);
      if (m === 'dark') setIsDark(true);

      const t = localStorage.getItem(LS_COLOR_THEME_KEY) as ColorTheme | null;
      if (t && (COLOR_THEMES as readonly string[]).includes(t)) setColorThemeState(t);
    } catch { /* localStorage blocked */ }
  }, []);

  // #region private methods ────────────────────────────────────────────────
  function applyMode(dark: boolean) {
    const html = document.documentElement;
    if (dark) html.setAttribute('data-mode', 'dark');
    else       html.removeAttribute('data-mode');
    try { localStorage.setItem(LS_DARK_KEY, dark ? 'dark' : 'light'); } catch { /* noop */ }
  }

  function applyColorTheme(theme: ColorTheme) {
    const html = document.documentElement;
    if (theme === 'default') html.removeAttribute('data-color-theme');
    else                     html.setAttribute('data-color-theme', theme);
    try { localStorage.setItem(LS_COLOR_THEME_KEY, theme); } catch { /* noop */ }
  }
  // #endregion

  // #region event handlers ─────────────────────────────────────────────────
  function toggleDark() {
    const next = !isDark;
    setIsDark(next);
    applyMode(next);
  }

  function setColorTheme(theme: ColorTheme) {
    setColorThemeState(theme);
    applyColorTheme(theme);
  }
  // #endregion

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
