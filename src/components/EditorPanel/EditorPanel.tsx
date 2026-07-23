"use client";

import {useEffect, useState, useRef} from "react";
import dynamic from "next/dynamic";
import {useJsonStore} from "@/lib/store";
import {useThemeStore} from "@/lib/theme";
import styles from "./EditorPanel.module.css";

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((mod) => mod.default), {
    ssr: false,
    loading: () => <div style={{flex: 1, background: "var(--bg-elevated)"}} />,
});

const EDITOR_OPTIONS = {
    minimap: {enabled: false},
    fontSize: 13,
    lineHeight: 22,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontLigatures: true,
    scrollBeyondLastLine: false,
    wordWrap: "on" as const,
    smoothScrolling: false,
    cursorSmoothCaretAnimation: "off" as const,
    padding: {top: 12, bottom: 12},
    renderLineHighlight: "line" as const,
    lineNumbers: "on" as const,
    scrollbar: {
        alwaysConsumeMouseWheel: false,
    },
};

export default function EditorPanel() {
    const {input, setInput, output, isValid, errors} = useJsonStore();
    const {theme} = useThemeStore();
    const editorRef = useRef<any>(null);
    const [monacoTheme, setMonacoTheme] = useState<"vs-dark" | "vs-light">("vs-dark");

    useEffect(() => {
        setMonacoTheme(theme === "light" ? "vs-light" : "vs-dark");
    }, [theme]);

    useEffect(() => {
        if (editorRef.current) {
            const val = editorRef.current.getValue();
            if (val !== input) {
                editorRef.current.setValue(input);
            }
        }
    }, [input]);

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const charCount = input.length;
    const lineCount = input ? input.split("\n").length : 0;

    return (
        <section className={styles.editorSection} aria-label="JSON editor">
            <div className={styles.splitPane}>
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <span className={styles.panelTitle}>Input</span>
                        {isValid === true && <span className={styles.badgeValid}>✓ Valid JSON</span>}
                        {isValid === false && <span className={styles.badgeInvalid}>✕ Invalid</span>}
                    </div>

                    <div className={styles.monacoWrapper}>
                        <MonacoEditor
                            height="100%"
                            defaultLanguage="json"
                            theme={monacoTheme}
                            defaultValue={input}
                            onChange={(v) => setInput(v ?? "")}
                            onMount={handleEditorDidMount}
                            options={EDITOR_OPTIONS}
                        />
                    </div>

                    {errors.length > 0 && (
                        <div className={styles.errorBanner}>
                            <ul className={styles.errorList} role="alert" aria-live="polite">
                                {errors.map((err, i) => (
                                    <li key={i} className={styles.errorItem}>
                                        {err.line ? `Line ${err.line}: ` : ""}
                                        {err.message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <span className={styles.panelTitle}>Output</span>
                        {output && <span className={styles.badgeValid}>{output.length} chars</span>}
                    </div>

                    <div className={styles.monacoWrapper}>
                        {output ? (
                            <MonacoEditor
                                height="100%"
                                defaultLanguage="json"
                                theme={monacoTheme}
                                value={output}
                                options={{...EDITOR_OPTIONS, readOnly: true}}
                            />
                        ) : (
                            <div className={styles.outputPlaceholder} aria-hidden="true">
                                Formatted output will appear here
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.statusBar} role="status" aria-live="polite">
                <span
                    className={`${styles.statusDot} ${
                        isValid === true
                            ? styles.statusDotValid
                            : isValid === false
                            ? styles.statusDotInvalid
                            : styles.statusDotNeutral
                    }`}
                    aria-hidden="true"
                />
                <span>
                    {isValid === true
                        ? "Valid JSON"
                        : isValid === false
                        ? "Invalid JSON"
                        : "Paste or upload JSON to get started"}
                </span>
                {charCount > 0 && (
                    <>
                        <span aria-hidden="true">·</span>
                        <span>{charCount.toLocaleString()} chars</span>
                        <span aria-hidden="true">·</span>
                        <span>{lineCount.toLocaleString()} lines</span>
                    </>
                )}
            </div>
        </section>
    );
}
