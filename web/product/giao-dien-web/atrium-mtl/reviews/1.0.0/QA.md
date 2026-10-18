# QA Report — ATRIUM MTL (`atrium-mtl`, v1.0.0)

## 1. Specification & Packaging Verification

- **Single-File Architecture:** `index.html` contains inline `<style>`, inline SVG icons, and vanilla JavaScript with zero external CSS/JS libraries.
- **Fonts:** Self-hosted `assets/fonts/archivo.woff2` (`weight 100–900`, `font-stretch 62%–125%`) and `assets/fonts/inter.woff2` (`weight 100–900`).
- **Mosaic Assets:** Exact CloudFront WEBP + SVG grain URLs in `:root` paired with byte-identical local copies in `assets/img/` for offline and preview-recorder reliability.
- **Responsive Modes:** Verified across `desk` (`1280×800` reference canvas with proportional `--s` cover scaling and `ex1`..`ex3` wide-screen columns), `tab-l`, `tab-p`, `mob-l`, and `mob`.
- **Accessibility & Motion:** `prefers-reduced-motion: reduce` disables the infinite column marquee and skips the WAAPI entrance immediately; keyboard `Escape` and outside click close the expandable menu drawer.
