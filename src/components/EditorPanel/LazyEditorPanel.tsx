'use client';

import { useEffect, useRef, useState, lazy, Suspense } from 'react';

// Monaco is ~3MB — only load it when the editor scrolls into view
const EditorPanel = lazy(() => import('./EditorPanel'));

function EditorSkeleton() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        background: 'var(--bg-elevated)',
        minHeight: '480px',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        fontSize: '13px',
        fontFamily: 'var(--font-mono)',
        gap: '8px',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      Loading editor…
    </div>
  );
}

export default function LazyEditorPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Start loading Monaco when editor is 200px away from viewport
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '480px' }}>
      {visible ? (
        <Suspense fallback={<EditorSkeleton />}>
          <EditorPanel />
        </Suspense>
      ) : (
        <EditorSkeleton />
      )}
    </div>
  );
}
