declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (name: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params ?? {});
  }
};

export const track = {
  formatJson: () => trackEvent('format_json'),
  minifyJson: () => trackEvent('minify_json'),
  validateJson: (isValid: boolean) => trackEvent('validate_json', { is_valid: isValid }),
  copyOutput: () => trackEvent('copy_output'),
  uploadFile: () => trackEvent('upload_file'),
  errorDetected: (msg: string) => trackEvent('error_detected', { error_message: msg }),
  clearEditor: () => trackEvent('clear_editor'),
};
