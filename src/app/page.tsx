// Server Component — no 'use client' — renders instantly as static HTML
import Navbar from "@/components/Navbar/Navbar";
import HeroBackground from "@/components/HeroBackground";
import ToolSection from "@/components/ToolSection";
import dynamic from "next/dynamic";
import DeveloperProfile from "@/components/DeveloperProfile/DeveloperProfile";
import HeroIntro from "@/components/HeroIntro/HeroIntro";
import HeroShowcase from "@/components/HeroShowcase/HeroShowcase";
import styles from "./page.module.css";

const ContactForm = dynamic(() => import("@/components/ContactForm"));

const FEATURES = [
    {
        icon: "⚡",
        accent: "#00d4aa",
        title: "Instant Beautify",
        desc: "Format ugly JSON into clean, indented output. Choose 2, 4 spaces or tabs.",
    },
    {
        icon: "◎",
        accent: "#7c6fff",
        title: "Minify & Compress",
        desc: "Strip all whitespace for production APIs. Reduce payload sizes by 30%.",
    },
    {
        icon: "✓",
        accent: "#00d4aa",
        title: "Real-time Validation",
        desc: "Catch syntax errors with exact line and column numbers instantly.",
    },
    {
        icon: "⊕",
        accent: "#7c6fff",
        title: "File Upload",
        desc: "Drag and drop any .json file directly into the editor. Any size.",
    },
    {
        icon: "↓",
        accent: "#00d4aa",
        title: "Download Output",
        desc: "Save formatted or minified JSON instantly. No account needed.",
    },
    {
        icon: "◈",
        accent: "#ffb347",
        title: "100% Client-Side",
        desc: "All processing runs in your browser. Your JSON never leaves your device.",
    },
];

const FAQ_ITEMS = [
    {
        q: "How do I format JSON online?",
        a: 'Paste your JSON into the input panel on the left, then click "Beautify". Your formatted JSON appears instantly in the output panel on the right.',
    },
    {
        q: "What is JSON validation?",
        a: "JSON validation checks whether your text follows correct JSON syntax — proper brackets, commas, and quoting. Our validator shows exact line and column numbers for every error.",
    },
    {
        q: "How do I minify JSON for production?",
        a: 'Paste your JSON and click "Minify". This removes all whitespace, reducing file size by up to 30% — ideal for APIs and config files.',
    },
    {
        q: "Is there a file size limit?",
        a: "The editor handles JSON files up to several MB with no issue. For very large files (100MB+), we recommend a local tool for best performance.",
    },
    {
        q: "Is my JSON data safe and private?",
        a: "Yes. All formatting, validation, and minification happen entirely in your browser. Nothing you paste or upload is sent to our servers — your data stays on your device.",
    },
    {
        q: "Do I need to create an account?",
        a: "No. JSON Formatter is completely free with no signup, no login, and no account required. Just open the page and start formatting.",
    },
];

function FAQItem({q, a}: {q: string; a: string}) {
    return (
        <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>{q}</summary>
            <p className={styles.faqAnswer}>{a}</p>
        </details>
    );
}

export default function HomePage() {
    return (
        <div className={styles.pageWrapper}>
            <Navbar />

            <main id="main-content">
                {/* ---- Hero ---- */}
                <section className={styles.hero} aria-labelledby="hero-heading">
                    {/* Parallax orbs are client-only, don't block LCP */}
                    <HeroBackground />

                    <div className={styles.heroContent}>
                        <div className={styles.heroLeft}>
                            <HeroIntro />

                            <p className={styles.heroSub}>
                                Paste, format, and validate JSON in seconds.
                                <br />
                                Powered by Monaco Editor — the same engine behind VS Code.
                            </p>

                            <ul className={styles.heroChecklist}>
                                {[
                                    "No signup or account required",
                                    "Zero ads, completely free",
                                    "All processing in your browser",
                                ].map((item) => (
                                    <li key={item}>
                                        <span className={styles.checkIconWrapper}>
                                            <svg
                                                className={styles.checkIcon}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3.5"
                                                aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.heroBadges}>
                                {[
                                    {text: "Monaco Editor", active: true},
                                    {text: "Real-time Errors", active: true},
                                    {text: "100% Free", active: false},
                                    {text: "No Account Required", active: false},
                                ].map((b) => (
                                    <span key={b.text} className={styles.heroBadge}>
                                        <span
                                            className={`${styles.badgeDot} ${b.active ? styles.badgeDotActive : ""}`}
                                        />
                                        {b.text}
                                    </span>
                                ))}
                            </div>

                            <div className={styles.heroActions}>
                                <a href="#workspace-tool" className={styles.btnPrimary}>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        style={{marginRight: "4px"}}
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Try it free
                                </a>
                                <a
                                    href="https://github.com/taherankhan/prettyjson"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.btnSecondary}
                                >
                                    View on GitHub
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        aria-hidden="true"
                                        style={{marginLeft: "4px"}}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <HeroShowcase />
                    </div>
                </section>

                {/* ---- Main Tool ---- */}
                <ToolSection />

                {/* ---- Features ---- */}
                <section
                    className={styles.features}
                    aria-labelledby="features-heading"
                    style={{contentVisibility: "auto", containIntrinsicSize: "0 800px"}}
                >
                    <div className={styles.sectionInner}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionEyebrow}>Capabilities</span>
                            <h2 id="features-heading" className={styles.sectionTitle}>
                                Everything you need for JSON
                            </h2>
                        </div>
                        <div className={styles.featuresGrid}>
                            {FEATURES.map((f) => (
                                <div
                                    key={f.title}
                                    className={styles.featureCard}
                                    style={{"--card-accent": f.accent} as React.CSSProperties}
                                >
                                    <div className={styles.featureIconWrap}>
                                        <span className={styles.featureIcon}>{f.icon}</span>
                                    </div>
                                    <h3 className={styles.featureTitle}>{f.title}</h3>
                                    <p className={styles.featureDesc}>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---- SEO Copy ---- */}
                <section
                    className={styles.seoCopy}
                    aria-label="About JSON Formatter"
                    style={{contentVisibility: "auto", containIntrinsicSize: "0 600px"}}
                >
                    <div className={styles.seoCopyInner}>
                        <div className={styles.seoLeft}>
                            <span className={styles.seoEyebrow}>Features</span>
                            <h2 className={styles.seoHeading}>
                                The ultimate utility for <span className="gradient-text">structured data</span>
                            </h2>
                            <p className={styles.seoSub}>
                                JSON is the universal format for modern APIs. Our editor provides a gorgeous,
                                local-first environment to format, validate, and inspect your payloads in real-time.
                            </p>
                        </div>
                        <div className={styles.seoRight}>
                            <div className={styles.seoCard}>
                                <div className={styles.seoCardBadge}>Format</div>
                                <h3>Format JSON Online in One Click</h3>
                                <p>
                                    Our JSON beautifier supports 2-space, 4-space, and tab indentation. Powered by the
                                    Monaco editor — the same engine that powers VS Code — with syntax highlighting and
                                    bracket matching.
                                </p>
                            </div>
                            <div className={styles.seoCard}>
                                <div className={styles.seoCardBadge}>Validate</div>
                                <h3>JSON Validator with Line-Level Error Reporting</h3>
                                <p>
                                    Our validator pinpoints syntax errors with exact line and column numbers so you can
                                    fix issues in seconds. Valid JSON is confirmed with a clear green indicator.
                                </p>
                            </div>
                            <div className={styles.seoCard}>
                                <div className={styles.seoCardBadge}>Minify</div>
                                <h3>Minify JSON for Production</h3>
                                <p>
                                    JSON minification removes all unnecessary whitespace, reducing payload sizes by up
                                    to 30%. Better API response times, lower bandwidth costs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- FAQ ---- */}
                <section
                    id="faq"
                    className={styles.faq}
                    aria-labelledby="faq-heading"
                    style={{contentVisibility: "auto", containIntrinsicSize: "0 600px"}}
                >
                    <div className={styles.faqInner}>
                        <div className={styles.faqLeft}>
                            <span className={styles.sectionEyebrow}>FAQ</span>
                            <h2 id="faq-heading" className={styles.faqTitle}>
                                Frequently asked questions
                            </h2>
                            <p className={styles.faqSub}>
                                Can&apos;t find what you&apos;re looking for? Feel free to check our project on{" "}
                                <a
                                    href="https://github.com/taherankhan/prettyjson"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>{" "}
                                or review our policy details.
                            </p>
                            <div className={styles.faqSupportCard}>
                                <h3>100% Client-Side</h3>
                                <p>
                                    All formatting, minification, and validation are executed inside your browser. No
                                    JSON text is ever transmitted to a server.
                                </p>
                            </div>
                        </div>
                        <div className={styles.faqList}>
                            {FAQ_ITEMS.map((item) => (
                                <FAQItem key={item.q} q={item.q} a={item.a} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* ---- Footer ---- */}
            <footer id="footer" className={styles.footer} role="contentinfo">
                <div className={styles.footerInner}>
                    <div className={styles.footerGrid}>
                        {/* Left Column: Contact Form */}
                        <div className={styles.footerContact}>
                            <div className={styles.footerTitleBlock}>
                                <h3>Send Feedback</h3>
                                <p>Have feature suggestions or found a bug? Let us know.</p>
                            </div>
                            <ContactForm />
                        </div>

                        <DeveloperProfile />
                    </div>

                    <div className={styles.footerBottom}>
                        <span className={styles.copyright}>
                            © {new Date().getFullYear()} JSON Formatter. Free forever.
                        </span>
                        <div className={styles.footerLegal}>
                            <a href="/privacy" className={styles.footerLink}>
                                Privacy
                            </a>
                            <a href="/terms" className={styles.footerLink}>
                                Terms
                            </a>
                            <a
                                href="https://github.com/taherankhan/prettyjson"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.footerLink}
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
