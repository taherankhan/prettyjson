'use client';

import { useJsonStore } from '@/lib/store';
import Toolbar from '@/components/Toolbar/Toolbar';
import LazyEditorPanel from '@/components/EditorPanel/LazyEditorPanel';
import styles from '@/app/page.module.css';

/** Wraps the tool section so only this part needs client JS for fullscreen state */
export default function ToolSection() {
  const { isFullScreen } = useJsonStore();

  return (
    <section
      id="workspace-tool"
      className={`${styles.toolSection} ${isFullScreen ? styles.fullScreen : ''}`}
      aria-label="JSON formatting tool"
    >
      <Toolbar />
      <LazyEditorPanel />
    </section>
  );
}
