'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function DeferredAnalytics({ gaId }: { gaId: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const schedule =
      window.requestIdleCallback ??
      ((cb: IdleRequestCallback) =>
        window.setTimeout(
          () => cb({ didTimeout: false, timeRemaining: () => 50 } as IdleDeadline),
          3000,
        ));

    const id = schedule(() => setEnabled(true));

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(id as number);
      } else {
        clearTimeout(id as number);
      }
    };
  }, []);

  if (!enabled) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
