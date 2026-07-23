import type {Metadata} from "next";
import {Inter, Space_Grotesk, JetBrains_Mono} from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import DeferredAnalytics from "@/components/DeferredAnalytics";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-headings",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
    weight: ["400", "500"],
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://jsonformatter.app"),
    title: {
        default: "JSON Formatter & Validator — Free Online Tool",
        template: "%s | JSON Formatter",
    },
    description:
        "Free online JSON formatter, validator, and beautifier. Format, minify, and lint JSON instantly. No signup required. Lightning fast.",
    keywords: [
        "json formatter",
        "json validator",
        "json beautifier",
        "json minifier",
        "json lint",
        "json pretty print",
        "format json online",
        "validate json online",
        "json formatter online",
        "json to string",
    ],
    openGraph: {
        title: "JSON Formatter & Validator — Free Online Tool",
        description: "Format, validate, and minify JSON instantly. Fast, free, no signup.",
        url: "https://jsonformatter.app",
        siteName: "JSON Formatter",
        images: [{url: "/og-image.png", width: 1200, height: 630, alt: "JSON Formatter Tool"}],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "JSON Formatter & Validator",
        description: "Format, validate, and minify JSON online. Free tool.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://jsonformatter.app",
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JSON Formatter & Validator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {"@type": "Offer", price: "0", priceCurrency: "USD"},
    featureList: ["JSON Formatter", "JSON Validator", "JSON Minifier"],
    url: "https://jsonformatter.app",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
            </head>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
                <DeferredAnalytics gaId="G-XYBE76CFSZ" />
            </body>
        </html>
    );
}
