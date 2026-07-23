import type {Metadata} from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import styles from "../policy.module.css";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Privacy Policy for JSON Formatter & Validator. We do not collect, store, or transmit your JSON data. Everything runs 100% locally in your browser.",
    openGraph: {
        title: "Privacy Policy | JSON Formatter & Validator",
        description: "100% client-side privacy. Your data never leaves your computer.",
        url: "https://jsonformatter.app/privacy",
    },
};

export default function PrivacyPage() {
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
                        <h1 className={styles.title}>Privacy Policy</h1>
                        <p className={styles.subtitle}>Last updated: June 2, 2026</p>
                    </header>

                    <section className={styles.section} aria-labelledby="data-privacy">
                        <h2 id="data-privacy">1. Zero Server-Side Data Collection</h2>
                        <p>
                            Your privacy is our highest priority. Unlike other online tools, JSON Formatter &amp;
                            Validator processes all JSON formatting, validation, beautification, and minification
                            operations <strong>entirely in your local web browser</strong>.
                        </p>
                        <p>
                            We do not transmit your JSON input or formatted output to our servers. No database or
                            server-side logs store the contents of what you paste into the editor.
                        </p>
                    </section>

                    <section className={styles.section} aria-labelledby="analytics">
                        <h2 id="analytics">2. Google Analytics</h2>
                        <p>
                            We use Google Analytics to collect anonymous traffic statistics (such as page views, browser
                            type, and country of origin) to help us understand how users interact with our site and
                            improve the user experience.
                        </p>
                        <p>
                            Google Analytics uses cookies to track interactions. No personally identifiable information
                            or editor contents are ever sent to Google Analytics.
                        </p>
                    </section>

                    <section className={styles.section} aria-labelledby="cookies">
                        <h2 id="cookies">3. Cookies</h2>
                        <p>
                            We use cookies and browser local storage to preserve your settings (such as editor theme
                            preferences, tab sizes, and layout options) across visits so you do not have to reconfigure
                            them each time.
                        </p>
                    </section>

                    <section className={styles.section} aria-labelledby="contact">
                        <h2 id="contact">4. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please feel free to reach out to us on
                            GitHub or via our project support channels.
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
