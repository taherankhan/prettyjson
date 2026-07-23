'use client';

import { useJsonStore, type IndentSize } from '@/lib/store';
import { track } from '@/lib/analytics';
import styles from './Toolbar.module.css';

const Icon = ({ d, size = 15 }: { d: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  beautify: 'M4 6h16M4 12h16M4 18h7',
  minify: 'M8 6l4-2 4 2M4 10l8 4 8-4M4 18h16',
  validate: 'M20 6L9 17l-5-5',
  copy: 'M8 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2M8 4a2 2 0 012-2h4a2 2 0 012 2M8 4h8',
  check: 'M20 6L9 17l-5-5',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  clear: 'M18 6L6 18M6 6l12 12',
  upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  maximize: 'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3',
  minimize: 'M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4',
};

const INDENTS: { label: string; value: IndentSize }[] = [
  { label: '2', value: 2 },
  { label: '4', value: 4 },
  { label: 'Tab', value: 'tab' },
];

export default function Toolbar() {
  const {
    beautify, minify, validate, clear,
    indentSize, setIndentSize,
    output,
    isCopied, setIsCopied,
    isFullScreen, toggleFullScreen,
  } = useJsonStore();

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setIsCopied(true);
    track.copyOutput();
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json,text/plain';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        useJsonStore.getState().setInput((ev.target?.result as string) ?? '');
        track.uploadFile();
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleBeautify = () => { beautify(); track.formatJson(); };
  const handleMinify = () => { minify(); track.minifyJson(); };
  const handleValidate = () => { validate(); track.validateJson(useJsonStore.getState().isValid ?? false); };

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="JSON editor actions">
      <button id="btn-beautify" className={styles.btnPrimary} onClick={handleBeautify} title="Beautify / Format JSON">
        <Icon d={ICONS.beautify} />
        <span className={styles.btnLabel}>Beautify</span>
      </button>

      <button id="btn-minify" className={styles.btnSecondary} onClick={handleMinify} title="Minify JSON">
        <Icon d={ICONS.minify} />
        <span className={styles.btnLabel}>Minify</span>
      </button>

      <button id="btn-validate" className={styles.btnSecondary} onClick={handleValidate} title="Validate JSON">
        <Icon d={ICONS.validate} />
        <span className={styles.btnLabel}>Validate</span>
      </button>

      <div className={styles.divider} aria-hidden="true" />

      <button
        id="btn-copy"
        className={isCopied ? styles.btnCopied : styles.btnSecondary}
        onClick={handleCopy}
        title="Copy output"
        disabled={!output}
      >
        <Icon d={isCopied ? ICONS.check : ICONS.copy} />
        <span className={styles.btnLabel}>{isCopied ? 'Copied!' : 'Copy'}</span>
      </button>

      <button id="btn-download" className={styles.btnSecondary} onClick={handleDownload} title="Download as .json" disabled={!output}>
        <Icon d={ICONS.download} />
        <span className={styles.btnLabel}>Download</span>
      </button>

      <button id="btn-upload" className={styles.btnSecondary} onClick={handleUpload} title="Upload JSON file">
        <Icon d={ICONS.upload} />
        <span className={styles.btnLabel}>Upload</span>
      </button>

      <div className={styles.divider} aria-hidden="true" />

      <button id="btn-clear" className={styles.btnDanger} onClick={clear} title="Clear editor">
        <Icon d={ICONS.clear} />
        <span className={styles.btnLabel}>Clear</span>
      </button>

      <button
        id="btn-fullscreen"
        className={styles.btnSecondary}
        onClick={toggleFullScreen}
        title={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
      >
        <Icon d={isFullScreen ? ICONS.minimize : ICONS.maximize} />
        <span className={styles.btnLabel}>{isFullScreen ? 'Minimize' : 'Fullscreen'}</span>
      </button>

      <div className={styles.indentGroup} role="group" aria-label="Indent size">
        <span className={styles.indentLabel}>Indent:</span>
        {INDENTS.map(({ label, value }) => (
          <button
            key={label}
            className={indentSize === value ? styles.indentBtnActive : styles.indentBtn}
            onClick={() => setIndentSize(value)}
            aria-pressed={indentSize === value}
            title={`Indent with ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
