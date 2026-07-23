'use client';

import { useRef, useCallback } from 'react';
import pageStyles from '@/app/page.module.css';
import styles from './DeveloperProfile.module.css';

const MANIFEST = [
  { key: 'framework', value: 'Next.js 16 (App Router)' },
  { key: 'editor_core', value: 'Monaco Editor (VS Code)' },
  { key: 'state_store', value: 'Zustand (Client State)' },
  { key: 'validation', value: 'real-time (line-by-line)' },
  { key: 'security', value: '100% client-side (no uploads)' },
  { key: 'database', value: 'MongoDB Atlas' },
];

const TECH = ['React', 'TypeScript', 'Next.js', 'Zustand', 'MongoDB'];

export default function DeveloperProfile() {
  const ref = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
    el.dataset.active = 'false';
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    el.style.setProperty('--rx', `${py * -10}deg`);
    el.style.setProperty('--ry', `${px * 10}deg`);
    el.dataset.active = 'true';
  }, []);

  return (
    <div
      ref={ref}
      className={styles.stage}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-active="false"
    >
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.borderGlow} aria-hidden="true" />

      <div className={`${pageStyles.footerProfile} ${styles.card}`}>
        <div className={styles.tiltZone}>
          <div className={pageStyles.profileHeader}>
            <div className={`${pageStyles.profileAvatarWrap} ${styles.avatarWrap}`}>
              <div className={styles.avatarRing} aria-hidden="true" />
              <img
                src="https://github.com/taherankhan.png"
                alt="Taherankhan"
                className={pageStyles.profileAvatar}
                loading="lazy"
                width={48}
                height={48}
              />
            </div>
            <div className={pageStyles.profileInfo}>
              <h4 className={styles.profileName}>Taherankhan</h4>
              <p>Full-Stack Developer</p>
            </div>
          </div>

          <div className={pageStyles.projectManifest}>
            <div className={pageStyles.manifestHeader}>
              <span className={pageStyles.dotRed} />
              <span className={pageStyles.dotYellow} />
              <span className={pageStyles.dotGreen} />
              <span className={pageStyles.manifestTitle}>project.manifest</span>
            </div>
            <div className={pageStyles.manifestBody}>
              {MANIFEST.map(({ key, value }) => (
                <div key={key}>
                  <span className={pageStyles.manifestKey}>{key}</span> ={' '}
                  <span className={pageStyles.manifestVal}>&quot;{value}&quot;</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.techRow}>
          {TECH.map((t) => (
            <span key={t} className={`${pageStyles.techBadge} ${styles.techBadge}`}>
              {t}
            </span>
          ))}
        </div>

        <div className={pageStyles.profileLinks}>
          <a
            href="https://github.com/taherankhan"
            target="_blank"
            rel="noopener noreferrer"
            className={`${pageStyles.profileLinkBtn} ${styles.githubBtn}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}
