'use client';

import { useEffect, useState } from 'react';
import { useThemeStore, type Theme } from '@/lib/theme';
import styles from './ThemeToggle.module.css';

const OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: 'light',
    label: 'Light',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={styles.toggle} role="group" aria-label="Select color theme" aria-busy="true">
        {OPTIONS.map((opt) => (
          <button key={opt.value} className={styles.option} disabled title={`${opt.label} theme`}>
            <span className={styles.optionInner}>
              {opt.icon}
              <span className={styles.label}>{opt.label}</span>
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.toggle} role="group" aria-label="Select color theme">
      {OPTIONS.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            className={styles.option}
            onClick={() => setTheme(opt.value)}
            aria-pressed={isActive}
            title={`${opt.label} theme`}
          >
            {isActive && <span className={styles.activePill} aria-hidden="true" />}
            <span className={`${styles.optionInner} ${isActive ? styles.optionActive : ''}`}>
              {opt.icon}
              <span className={styles.label}>{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
