"use client";

import {useRef, useCallback} from "react";
import MockEditor from "@/components/MockEditor/MockEditor";
import pageStyles from "@/app/page.module.css";
import styles from "./HeroShowcase.module.css";

const STATS = [
    {value: "< 1ms", label: "Parse time", accent: "teal" as const},
    {value: "100%", label: "Client-side", accent: "purple" as const},
    {value: "0", label: "Servers used", accent: "teal" as const},
];

export default function HeroShowcase() {
    const ref = useRef<HTMLDivElement>(null);

    const resetTilt = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "50%");
        el.dataset.active = "false";
    }, []);

    const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = x / rect.width - 0.5;
        const py = y / rect.height - 0.5;

        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        el.style.setProperty("--rx", `${py * -14}deg`);
        el.style.setProperty("--ry", `${px * 14}deg`);
        el.dataset.active = "true";
    }, []);

    return (
        <div className={styles.showcase}>
            <div
                ref={ref}
                className={styles.editorStage}
                onMouseMove={handleMove}
                onMouseLeave={resetTilt}
                data-active="false"
            >
                <div className={styles.spotlight} aria-hidden="true" />
                <div className={styles.borderGlow} aria-hidden="true" />
                <div className={styles.editorInner}>
                    <div className={styles.shine} aria-hidden="true" />
                    <MockEditor />
                </div>
            </div>

            <div className={pageStyles.heroStats}>
                {STATS.map((stat) => (
                    <div key={stat.label} className={pageStyles.statCard}>
                        <div
                            className={pageStyles.statVal}
                            style={stat.accent === "purple" ? {color: "var(--purple)"} : undefined}
                        >
                            {stat.value}
                        </div>
                        <div className={pageStyles.statLabel}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
