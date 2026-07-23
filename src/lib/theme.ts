// src/lib/theme.ts
import { create } from 'zustand';

export type Theme = 'dark' | 'light';

interface ThemeStore {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const STORAGE_KEY = 'jf-theme';

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* noop */ }
}

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
  } catch { /* noop */ }
  return 'dark';
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',
  setTheme: (theme) => {
    set({ theme });
    applyTheme(theme);
  },
}));

/** Call once on mount to hydrate from localStorage */
export function initTheme() {
  const theme = getInitialTheme();
  useThemeStore.setState({ theme });
  applyTheme(theme);
}
