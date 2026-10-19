# DesignPro — Product Design Education Hero (`v1.0.0`)

**DesignPro** is a full-screen (`h-screen`) hero section template built for product design academies, cohort-based courses, and leadership bootcamps. It pairs a looping full-bleed CloudFront video background on a pure black (`#000000`) canvas with a pill-shaped glassmorphic navigation bar, a two-column value & social-proof sub-header, an oversized `Inter` headline featuring a continuous Framer Motion `ShinyText` gradient sweep (`#64CEFB` → `#ffffff` at `100deg` every `3s`), and an interactive enrollment application modal.

---

## Quick Start

1. **Extract the entire archive** (`designpro.zip`) into a project folder. Keep all files and subfolders intact.
2. **Option A — Run the prebuilt static bundle immediately (no Node build required):**
   Serve the `built/` folder with any static HTTP server (for example VS Code Live Server, `npx serve built`, or `python -m http.server 8080 --directory built`).
   > **Note:** Do not open `built/index.html` directly via `file://` because ES module scripts (`<script type="module">`) require HTTP/HTTPS.
3. **Option B — Full React + TypeScript + Vite development workflow:**
   ```bash
   npm install
   npm run dev
   ```
   To create a production build in `dist/`:
   ```bash
   npm run build
   ```

---

## Included Files

| File / Path | Purpose |
|---|---|
| `index.html` | Root HTML entry loading Google Fonts `Inter` (`400;500;600;700`) and mounting `/src/main.tsx` |
| `package.json` / `package-lock.json` | React 18, TypeScript, Vite 6, Tailwind CSS v4, `framer-motion`, and `lucide-react` dependencies |
| `vite.config.ts` / `tsconfig.json` | Vite bundler (`base: './'`) and strict TypeScript configuration |
| `src/main.tsx` | React DOM root entry |
| `src/index.css` | Tailwind CSS v4 entry and base `#000000` / `Inter` rules |
| `src/components/ShinyText.tsx` | Reusable `ShinyText` component using `framer-motion` (`useMotionValue`, `useAnimationFrame`, `useTransform`) |
| `src/App.tsx` | Full-screen video hero, circular logo + pill navbar, mobile drawer, 2-column sub-header, center headline + CTA, and enrollment modal |
| `built/` | Pre-compiled static production bundle (`built/index.html` + `built/assets/*`) ready for immediate static hosting |
| `CUSTOMISE.md` | 10 step-by-step customisation guides, 12 ready-to-copy AI prompts, and a verified literal edit map |
| `LICENCE.txt` | Commercial template licence terms |
| `THIRD-PARTY-LICENSES.txt` | Open-source package and remote asset attributions |

---

## Key Features

- **Full-Screen Looping Video Background (`#hero-video`):** Plays automatically, muted, inline, and looped (`object-cover`) over a `#000000` fallback canvas.
- **Circular Brand Logo & Pill Navigation (`#desktop-nav`):** `2px` white circular border with an inner filled white dot + `"DesignPro"` wordmark, paired with a `rounded-full border-gray-700` pill container housing 7 links (`Home`, `About Us`, `Courses`, `Instructors`, `Testimonials`, `Blog`, `Contact us` with `ArrowUpRight` icon) and a responsive mobile navigation drawer (`< lg`).
- **Two-Column Sub-Header (`#top-info-section`):** Left mission statement and right-aligned `"8000+ Talented Designers Launched !"` social proof (`text-white/80`, `text-sm lg:text-base`).
- **Continuous `ShinyText` Framer Motion Headline (`#shiny-heading-text`):** Sweeps a `100deg` linear gradient from `#64CEFB` through `#ffffff` across `"Product Leader."` every `3` seconds from left to right using `backgroundClip: 'text'` and transparent text fill.
- **Interactive Enrollment Modal (`#enrollment-modal`):** Clicking `"Apply for Next Enrollment"` or `"Contact us"` opens an accessible enrollment modal with cohort track selection and `Escape` key support.
