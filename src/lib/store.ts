// src/lib/store.ts
import {create} from "zustand";

export type PanelMode = "split" | "input" | "output";
export type IndentSize = 2 | 4 | "tab";

interface ValidationError {
    message: string;
    line?: number;
    column?: number;
}

interface JsonStore {
    input: string;
    output: string;
    isValid: boolean | null; // null = not yet validated
    errors: ValidationError[];
    indentSize: IndentSize;
    panelMode: PanelMode;
    isCopied: boolean;
    isFullScreen: boolean;

    setInput: (v: string) => void;
    setOutput: (v: string) => void;
    setIndentSize: (s: IndentSize) => void;
    setPanelMode: (m: PanelMode) => void;
    setIsCopied: (v: boolean) => void;
    toggleFullScreen: () => void;

    beautify: () => void;
    minify: () => void;
    validate: () => void;
    clear: () => void;
}

function parseAndValidate(raw: string): {parsed: unknown; errors: ValidationError[]} {
    try {
        const parsed = JSON.parse(raw);
        return {parsed, errors: []};
    } catch (e) {
        const err = e as SyntaxError;
        // Extract line/column from error message when possible
        const match = err.message.match(/at position (\d+)/);
        let line: number | undefined;
        let column: number | undefined;
        if (match) {
            const pos = parseInt(match[1], 10);
            const before = raw.substring(0, pos);
            line = before.split("\n").length;
            column = pos - before.lastIndexOf("\n");
        }
        return {parsed: null, errors: [{message: err.message, line, column}]};
    }
}

function indentValue(size: IndentSize): string | number {
    if (size === "tab") return "\t";
    return size;
}

const INITIAL_INPUT = `{"name":"prettyjson","version":"1.0.0","description":"Premium online JSON Formatter & Validator","features":["Instant beautification","Real-time syntax validation","One-click minification","100% Client-side privacy"],"author":{"name":"Taherankhan","github":"https://github.com/taherankhan"},"active":true}`;

const INITIAL_OUTPUT = `{
  "name": "prettyjson",
  "version": "1.0.0",
  "description": "Premium online JSON Formatter & Validator",
  "features": [
    "Instant beautification",
    "Real-time syntax validation",
    "One-click minification",
    "100% Client-side privacy"
  ],
  "author": {
    "name": "Taherankhan",
    "github": "https://github.com/taherankhan"
  },
  "active": true
}`;

let jsonWorker: Worker | null = null;
let currentTransactionId = 0;

function getWorker(): Worker | null {
    if (typeof window === "undefined") return null;
    if (!jsonWorker) {
        jsonWorker = new Worker(new URL("./json.worker.ts", import.meta.url));
    }
    return jsonWorker;
}

export const useJsonStore = create<JsonStore>((set, get) => ({
    input: INITIAL_INPUT,
    output: INITIAL_OUTPUT,
    isValid: true,
    errors: [],
    indentSize: 2,
    panelMode: "split",
    isCopied: false,
    isFullScreen: false,

    setInput: (v) => set({input: v}),
    setOutput: (v) => set({output: v}),
    setIndentSize: (s) => {
        set({indentSize: s});
        if (get().input.trim()) {
            get().beautify();
        }
    },
    setPanelMode: (m) => set({panelMode: m}),
    setIsCopied: (v) => set({isCopied: v}),
    toggleFullScreen: () => set((state) => ({isFullScreen: !state.isFullScreen})),

    beautify: () => {
        const {input, indentSize} = get();
        if (!input.trim()) {
            set({output: "", isValid: null, errors: []});
            return;
        }

        const worker = getWorker();
        if (!worker) {
            const {parsed, errors} = parseAndValidate(input);
            if (errors.length > 0) {
                set({isValid: false, errors, output: ""});
                return;
            }
            const formatted = JSON.stringify(parsed, null, indentValue(indentSize));
            set({output: formatted, isValid: true, errors: []});
            return;
        }

        const txId = ++currentTransactionId;
        worker.postMessage({
            action: "beautify",
            json: input,
            indent: indentValue(indentSize),
        });

        worker.onmessage = (e) => {
            if (txId !== currentTransactionId) return;
            const {result, isValid, errors} = e.data;
            set({output: result, isValid, errors});
        };
    },

    minify: () => {
        const {input} = get();
        if (!input.trim()) {
            set({output: "", isValid: null, errors: []});
            return;
        }

        const worker = getWorker();
        if (!worker) {
            const {parsed, errors} = parseAndValidate(input);
            if (errors.length > 0) {
                set({isValid: false, errors, output: ""});
                return;
            }
            const minified = JSON.stringify(parsed);
            set({output: minified, isValid: true, errors: []});
            return;
        }

        const txId = ++currentTransactionId;
        worker.postMessage({
            action: "minify",
            json: input,
        });

        worker.onmessage = (e) => {
            if (txId !== currentTransactionId) return;
            const {result, isValid, errors} = e.data;
            set({output: result, isValid, errors});
        };
    },

    validate: () => {
        const {input} = get();
        if (!input.trim()) {
            set({isValid: null, errors: []});
            return;
        }

        const worker = getWorker();
        if (!worker) {
            const {errors} = parseAndValidate(input);
            set({isValid: errors.length === 0, errors});
            return;
        }

        const txId = ++currentTransactionId;
        worker.postMessage({
            action: "validate",
            json: input,
        });

        worker.onmessage = (e) => {
            if (txId !== currentTransactionId) return;
            const {isValid, errors} = e.data;
            set({isValid, errors});
        };
    },

    clear: () => set({input: "", output: "", isValid: null, errors: []}),
}));
