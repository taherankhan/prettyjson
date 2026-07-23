import type {Metadata} from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import styles from "../policy.module.css";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "Terms of Service for JSON Formatter & Validator online utility. Free developer tool for formatting, validating, and minifying JSON.",
    openGraph: {
        title: "Terms of Service | JSON Formatter & Validator",
        description: "Usage terms for our free developer tools and browser utilities.",
        url: "https://jsonformatter.app/terms",
    },
};

export default function TermsPage() {
    return (
        <div className={styles.policyPage}>
            <Navbar />

            <main className={styles.contentWrapper} id="main-content">
                <Link href="/" className={styles.backBtn} aria-label="Go back to JSON Formatter tool">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Tool
                </Link>

                <article>
                    <header>
                        <h1 className={styles.title}>Terms of Service</h1>
                        <p className={styles.subtitle}>Last updated: June 2, 2026</p>
                    </header>

                    <section className={styles.section} aria-labelledby="terms-acceptance">
                        <h2 id="terms-acceptance">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using JSON Formatter &amp; Validator (the "Service"), you agree to be bound
                            by these Terms of Service. If you do not agree to these terms, please do not use the
                            Service.
                        </p>
                    </section>

                    <section className={styles.section} aria-labelledby="terms-license">
                        <h2 id="terms-license">2. Permitted Use</h2>
                        <p>
                            The Service is provided free of charge for personal and commercial development use. You may
                            paste, format, validate, minify, and download JSON code snippets as part of your normal
                            workflow.
                        </p>
                    </section>

                    <section className={styles.section} aria-labelledby="terms-disclaimer">
                        <h2 id="terms-disclaimer">3. Disclaimer of Warranty</h2>
                        <p>
                            The Service is provided "as is" and "as available," without warranty of any kind, express or
                            implied. We do not guarantee that the tool will be uninterrupted, error-free, or completely
                            secure. Use of the Service is at your own risk.
                        </p>
                    </section>

                    <section className={styles.section} aria-labelledby="terms-limitation">
                        <h2 id="terms-limitation">4. Limitation of Liability</h2>
                        <p>
                            In no event shall JSON Formatter &amp; Validator or its authors be liable for any direct,
                            indirect, incidental, special, or consequential damages arising out of the use or inability
                            to use the Service.
                        </p>
                    </section>
                </article>
            </main>

            <footer
                style={{
                    borderTop: "1px solid var(--border)",
                    padding: "24px 0",
                    marginTop: "auto",
                    textAlign: "center",
                }}
            >
                <p style={{fontSize: "13px", color: "var(--text-muted)"}}>
                    © {new Date().getFullYear()} JSON Formatter. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
