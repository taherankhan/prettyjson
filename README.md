# JSONMint — Free Online JSON Formatter & Validator

**Free online JSON formatter, beautifier, validator, and minifier — fast, private, and built for developers.**

[![Live Demo](https://img.shields.io/badge/demo-jsonmint.onrender.com-00d4aa?style=for-the-badge)](https://jsonmint.onrender.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)

> Paste JSON → beautify, validate, or minify instantly. No signup. No server uploads. Everything runs in your browser.

**[Try it live → jsonmint.onrender.com](https://jsonmint.onrender.com/)** | **[GitHub Repository](https://github.com/taherankhan/prettyjson)**

---

## Table of Contents

- [Why this tool?](#why-this-tool)
- [Features](#features)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deploy](#deploy)
- [FAQ](#faq)

---

## Why this tool?

Developers search for **JSON formatter**, **JSON validator**, **JSON beautifier**, and **JSON minifier** tools every day — often juggling slow sites, account walls, or privacy concerns.

This project is a **production-ready, client-side JSON tool** that solves that:

| Need | What you get |
|------|----------------|
| **Format JSON online** | Pretty-print with 2-space, 4-space, or tab indentation |
| **Validate JSON** | Real-time syntax errors with line & column numbers |
| **Minify JSON** | Strip whitespace for smaller API payloads |
| **Privacy** | 100% browser-side — your JSON never leaves your device |
| **Speed** | Monaco Editor (VS Code engine) + optimized Next.js 16 App Router |

---

## Features

- **Instant Beautify** — Turn messy JSON into clean, indented output
- **JSON Minifier** — Compress JSON for production APIs (up to ~30% smaller)
- **Real-time Validation** — Catch invalid syntax before you ship
- **File Upload** — Drag & drop `.json` files directly into the editor
- **Download Output** — Save formatted or minified JSON in one click
- **100% Client-Side** — No account, no uploads, no data sent to servers
- **Dark / Light Theme** — Easy on the eyes during long debugging sessions
- **Accessible UI** — Semantic landmarks, contrast fixes, keyboard-friendly layout
- **SEO Optimized** — Sitemap, robots.txt, Open Graph, and structured data built in

---

## Quick Start

### Prerequisites

- **Node.js** 20+
- **npm** (or pnpm / yarn / bun)

### Install & run locally

```bash
git clone https://github.com/taherankhan/jsonformatter.git
cd jsonformatter
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — the JSON formatter loads instantly.

### Production build

```bash
npm run build
npm start
```

---

## Usage

1. **Paste** your JSON into the input panel (or drag a `.json` file).
2. Click **Beautify** to pretty-print, **Minify** to compress, or **Validate** to lint.
3. **Copy** or **Download** the result from the output panel.

```json
// Before (minified)
{"name":"Taherankhan","role":"Full-Stack Developer","tags":["typescript","react","next.js"]}

// After beautify
{
  "name": "Taherankhan",
  "role": "Full-Stack Developer",
  "tags": ["typescript", "react", "next.js"]
}
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | [React 19](https://react.dev) + CSS Modules |
| Editor | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| State | [Zustand](https://zustand.docs.pmnd.rs) |
| Feedback | [MongoDB Atlas](https://www.mongodb.com/atlas) + Next.js API Route |
| Analytics | Google Analytics (deferred, idle-loaded) |
| Language | TypeScript |

---

## Environment Variables

Create a `.env.local` in the project root:

```env
# Site URL (used for sitemap, canonical URLs, OG tags)
NEXT_PUBLIC_SITE_URL=https://jsonmint.onrender.com

# Optional — Google Search Console verification
NEXT_PUBLIC_GOOGLE_VERIFICATION=

# MongoDB Atlas Connection URI (for contact/feedback form)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/jsonformatter?retryWrites=true&w=majority
```

The **JSON formatter, validator, and minifier work fully without MongoDB**. MongoDB is only used for the optional feedback submission API.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Deploy

Deployed on **[Render](https://render.com)** as a Node Web Service:

- **Live URL:** [https://jsonmint.onrender.com/](https://jsonmint.onrender.com/)
- **Build Command:** `npm run build`
- **Start Command:** `npm run start`

Set `NEXT_PUBLIC_SITE_URL` to `https://jsonmint.onrender.com` in environment variables so sitemap and metadata stay correct.

---

## FAQ

<details>
<summary><strong>How do I format JSON online?</strong></summary>

Paste JSON into the left editor and click **Beautify**. Formatted output appears on the right instantly — no page reload, no signup.

</details>

<details>
<summary><strong>Is this a free JSON validator?</strong></summary>

Yes. Validation runs in real time in your browser. Errors show exact line and column numbers, similar to a JSON linter.

</details>

<details>
<summary><strong>How do I minify JSON for production?</strong></summary>

Click **Minify** to remove all whitespace. Ideal for API responses, config files, and reducing payload size.

</details>

<details>
<summary><strong>Is my JSON data safe?</strong></summary>

Yes. All formatting, validation, and minification happen **entirely client-side**. Nothing you paste or upload is sent to a backend for processing.

</details>

<details>
<summary><strong>Do I need an account?</strong></summary>

No. Open the site and start formatting — completely free, no login required.

</details>

---

## Author

Built by **[Taherankhan](https://github.com/taherankhan)** — Full-Stack Developer.

- **Live app:** [https://jsonmint.onrender.com/](https://jsonmint.onrender.com/)
- **GitHub:** [@taherankhan](https://github.com/taherankhan)
- **Repository:** [https://github.com/taherankhan/prettyjson](https://github.com/taherankhan/prettyjson)

---

<p align="center">
  <sub>JSON Formatter · JSON Validator · JSON Beautifier · JSON Minifier · Format JSON Online</sub>
</p>
