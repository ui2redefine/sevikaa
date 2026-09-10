'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

/** Icon button that toggles between light and dark mode. */
export default function ThemeToggle() {
  const { isDark, toggleDark } = useTheme();

  return (
    <button
      onClick={toggleDark}
      className="themeToggleBtn min-w-10 min-h-10 flex items-center justify-center rounded-lg hover:bg-surface-subtle text-muted transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark
        ? <Sun  size={18} aria-hidden="true" />
        : <Moon size={18} aria-hidden="true" />
      }
    </button>
  );
}
