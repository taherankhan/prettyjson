// src/lib/json.worker.ts

interface ValidationError {
  message: string;
  line: number | null;
}

interface WorkerInput {
  action: 'beautify' | 'minify' | 'validate';
  json: string;
  indent?: number | 'tab';
}

self.addEventListener('message', (e: MessageEvent<WorkerInput>) => {
  const { action, json, indent } = e.data;

  if (!json || !json.trim()) {
    self.postMessage({ success: true, result: '', isValid: null, errors: [] });
    return;
  }

  try {
    const parsed = JSON.parse(json);

    if (action === 'beautify') {
      const space = indent === 'tab' ? '\t' : (indent || 2);
      const formatted = JSON.stringify(parsed, null, space);
      self.postMessage({ success: true, result: formatted, isValid: true, errors: [] });
    } else if (action === 'minify') {
      const minified = JSON.stringify(parsed);
      self.postMessage({ success: true, result: minified, isValid: true, errors: [] });
    } else if (action === 'validate') {
      self.postMessage({ success: true, isValid: true, errors: [] });
    }
  } catch (err: any) {
    const errors: ValidationError[] = [];
    let line: number | null = null;

    // Try to extract line number from JSON parse error message
    // e.g. "Unexpected token } in JSON at position 42" or "at line 2 column 5"
    const lineMatch = err.message.match(/line\s+(\d+)/i);
    if (lineMatch) {
      line = parseInt(lineMatch[1], 10);
    }

    errors.push({
      message: err.message,
      line,
    });

    self.postMessage({
      success: false,
      isValid: false,
      errors,
      result: '',
    });
  }
});
