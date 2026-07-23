'use client';

import { useEffect } from 'react';
import { initTheme } from '@/lib/theme';

/** Mounts once and hydrates the theme from localStorage into <html data-theme> */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initTheme();
  }, []);

  return <>{children}</>;
}
