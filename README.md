# Google Play Order Receipt Generator

A pixel-perfect Google Play Store email receipt generator and visual builder adhering strictly to Google's official 590px HTML email layout specifications.

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://google-play-order-receipt-generator.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌐 Live Demo

Visit the web app directly: **[google-play-order-receipt-generator.vercel.app](https://google-play-order-receipt-generator.vercel.app/)**

---

---

## Overview

**Google Play Order Receipt Generator** is a fast, 100% client-side web application designed to create, preview, customize, and export authentic Google Play Store transaction receipts. Every table structure, color code, typographic detail, and tax breakdown aligns with Google's official 590px email template.

---

## Key Features

- **Official 590px Email Standards:** Pixel-perfect table markup mirroring Google Play's production email format (590px width, `#00818f` buttons, Roboto typography).
- **Bilingual Symmetry (ID & EN):** Symmetrically formatted for both Indonesian (WIB timezone, Rupiah currency, official Indonesian legal copy) and English (GMT timezone, standard international phrasing).
- **Preset Library (6 Synchronized Templates):**
  1. **Google One 100 GB** — Monthly subscription with auto-renewal and backup payment method notice.
  2. **Google One 200 GB** — Annual recurring subscription with detailed tax breakdown.
  3. **Google AI Pro (2 TB)** — Free trial subscription ending notice with post-trial cost terms.
  4. **YouTube Premium** — Individual monthly subscription.
  5. **Canva Pro** — Third-party merchant annual subscription with credit card payment formatting.
  6. **Flight Tracker Live Radar** — In-app utility subscription with Google Play Points.
- **Dynamic Form Accordion:** Form sections are organized into clean collapsible `<details>` cards with live summary badges (collapsed by default for a clutter-free experience).
- **Multi-Format Exporting:**
  - **Unduh PNG (HD):** 2.5x high-resolution raster image, strictly unclipped.
  - **Unduh JPG:** Standard compressed image for fast attachments.
  - **Salin Gambar:** Direct clipboard copy ready to paste into chat or documents.
  - **Salin Kode HTML:** Raw standalone 590px HTML email markup ready for email clients.
  - **Unduh .HTML:** Self-contained HTML file viewable in any web browser.
  - **Cetak / PDF:** Browser print dialog integration formatted for document archival.
- **Privacy First:** 100% client-side. No tracking, no analytics, and no remote server data transmission.

---

## Project Structure

```text
Order_Receipt_Google_Play/
├── src/
│   ├── components/
│   │   ├── GooglePlayLogo.tsx           # Official 4-color Google Play SVG logo
│   │   ├── PlayPointsDiamond.tsx        # Official Play Points badge SVG
│   │   ├── ReceiptForm.tsx              # Interactive editor with native accordion cards
│   │   ├── ReceiptPreview.tsx           # Live 590px/640px email receipt canvas
│   │   └── ReferenceComparisonModal.tsx # Application information & guidelines modal
│   ├── types/
│   │   └── receipt.ts                   # Strongly-typed receipt state models & presets
│   ├── utils/
│   │   ├── formatters.ts                # Currency, order ID, and date formatting utilities
│   │   ├── htmlGenerator.ts             # Raw 590px production HTML email code generator
│   │   └── presets.ts                   # 6 synchronized bilingual receipt preset fixtures
│   ├── App.tsx                          # App shell, toolbar actions, and responsive layout
│   └── main.tsx                         # React 19 root bootstrap
├── index.html                           # Entry HTML template with Google Roboto web fonts
├── package.json                         # Lean dependency manifest (React 19, Tailwind v4, Vite)
├── tsconfig.json                        # Strict TypeScript configuration
└── vite.config.ts                       # Vite 8 configuration with Tailwind CSS v4 plugin
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Component-driven UI and state management |
| **TypeScript** | Type safety across receipt models and presets |
| **Vite 8** | Next-generation frontend build tooling and HMR |
| **Tailwind CSS v4** | Modern utility-first styling with native CSS variables |
| **Lucide React** | Clean, accessible iconography |
| **html-to-image** | High-DPI DOM-to-canvas rendering for PNG/JPG/Clipboard exports |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18.0.0 or later)
- `npm` (bundled with Node.js) or `pnpm` / `bun`

### Installation & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/google-play-order-receipt.git
   cd google-play-order-receipt
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Type-check and build for production:**
   ```bash
   npm run lint
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## Keyboard Shortcuts & Accessibility

- **`Escape`**: Closes the application information modal.
- **Tab Navigation**: Full keyboard focus visibility (`focus-visible:ring-2`) across all form inputs, radio selectors, and export buttons.
- **Screen Reader Support**: Complete ARIA landmarks, `role="radiogroup"`, `aria-pressed`, and unclipped touch targets adhering to Web Interface Guidelines.

---

## License

This project is licensed under the [MIT License](LICENSE).
