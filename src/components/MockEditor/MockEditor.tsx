import React from "react";
import styles from "./MockEditor.module.css";

interface Line {
    indent: number;
    text: string;
    colorVar: string;
    value?: string;
    valueColorVar?: string;
}

const mockLines: Line[] = [
    {indent: 0, text: "{", colorVar: "--brace"},
    {indent: 1, text: '"user":', colorVar: "--key", value: " {", valueColorVar: "--brace"},
    {indent: 2, text: '"id":', colorVar: "--key", value: " 4821,", valueColorVar: "--number"},
    {indent: 2, text: '"name":', colorVar: "--key", value: ' "Taherankhan",', valueColorVar: "--string"},
    {indent: 2, text: '"role":', colorVar: "--key", value: ' "Full-Stack Developer",', valueColorVar: "--string"},
    {indent: 2, text: '"active":', colorVar: "--key", value: " true,", valueColorVar: "--boolean"},
    {indent: 2, text: '"tags":', colorVar: "--key", value: " [", valueColorVar: "--brace"},
    {indent: 3, text: '"typescript",', colorVar: "--string"},
    {indent: 3, text: '"react",', colorVar: "--string"},
    {indent: 3, text: '"next.js",', colorVar: "--string"},
    {indent: 3, text: '"nodejs",', colorVar: "--string"},
    {indent: 3, text: '"supabase"', colorVar: "--string"},
    {indent: 2, text: "]", colorVar: "--brace"},
    {indent: 1, text: "}", colorVar: "--brace"},
    {indent: 0, text: "}", colorVar: "--brace"},
];

export default function MockEditor() {
    return (
        <div className={styles.mockContainer}>
            {/* Title bar */}
            <div className={styles.titleBar}>
                <div className={styles.trafficLights}>
                    <span className={styles.closeBtn} />
                    <span className={styles.minBtn} />
                    <span className={styles.maxBtn} />
                </div>
                <span className={styles.fileName}>output.json</span>
                <div className={styles.statusBadge}>
                    <span className={styles.statusDot} />
                    <span className={styles.statusText}>Valid JSON</span>
                </div>
            </div>

            {/* Editor Content */}
            <div className={styles.editorBody}>
                {/* Line Numbers */}
                <div className={styles.lineNumbers}>
                    {mockLines.map((_, i) => (
                        <span key={i}>{i + 1}</span>
                    ))}
                </div>
                {/* Code Lines */}
                <div className={styles.codeContainer}>
                    {mockLines.map((line, i) => (
                        <div key={i} className={styles.codeLine} style={{paddingLeft: `${line.indent * 20}px`}}>
                            <span style={{color: `var(${line.colorVar})`}}>{line.text}</span>
                            {line.value && <span style={{color: `var(${line.valueColorVar})`}}>{line.value}</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
