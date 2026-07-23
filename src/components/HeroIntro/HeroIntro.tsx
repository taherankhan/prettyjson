'use client';

import { useRef, useCallback } from 'react';
import pageStyles from '@/app/page.module.css';
import styles from './HeroIntro.module.css';

export default function HeroIntro() {
  const ref = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--px', '0');
    el.style.setProperty('--py', '0');
    el.style.setProperty('--gx', '50%');
    el.style.setProperty('--gy', '50%');
    el.dataset.active = 'false';
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.setProperty('--px', String(x));
    el.style.setProperty('--py', String(y));
    el.style.setProperty('--gx', `${50 + x * 40}%`);
    el.style.setProperty('--gy', `${50 + y * 40}%`);
    el.dataset.active = 'true';
  }, []);

  return (
    <div
      ref={ref}
      className={styles.intro}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-active="false"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={`${pageStyles.heroEyebrow} ${styles.eyebrow}`}>
        <span className={pageStyles.eyebrowDot} />
        <span>Monaco Editor · Real-time Validation</span>
      </div>

      <h1 id="hero-heading" className={pageStyles.heroHeading}>
        <span className={styles.line1}>JSON Formatter</span>
        <br />
        <span className={styles.line2}>
          <span className={pageStyles.heroWordAnd}>&</span>{' '}
          <span className={`${pageStyles.heroWordAccent} ${styles.accent}`}>Validator</span>
        </span>
      </h1>
    </div>
  );
}
