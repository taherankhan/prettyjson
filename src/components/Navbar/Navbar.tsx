'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80 && y > lastY) {
        setHidden(true);
      } else if (y <= 10 || y < lastY) {
        setHidden(false);
      }
      lastY = y;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`${styles.navbar} ${hidden ? styles.navbarHidden : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="JSON Formatter Home">
          <div className={styles.logoIcon} aria-hidden="true">{'{ }'}</div>
          <span className={styles.logoText}>
            JSON<span>Formatter</span>
          </span>
        </Link>

        <div className={styles.links}>
          <button
            onClick={() => scrollToSection('#faq')}
            className={styles.navLink}
            aria-label="Scroll to Frequently Asked Questions"
          >
            FAQ
          </button>
          <button
            onClick={() => scrollToSection('#footer')}
            className={styles.navLink}
            aria-label="Scroll to Contact and Feedback"
          >
            Feedback
          </button>

          <span className={styles.divider} />

          <ThemeToggle />

          <a
            href="https://github.com/taherankhan/prettyjson"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="View source on GitHub"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
      <div
        className={styles.progressBar}
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </nav>
  );
}
