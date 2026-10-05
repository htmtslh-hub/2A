# Solenne 2.0.0 — 2026-10-02

Full redesign requested from supplied skincare reference. Native HTML/CSS/JS retained. Warm ivory, terracotta rose, serif headings, pill CTA and consistent 20px panels. Three ImageGen assets: hero product photograph, natural skin editorial portrait, gift collection; prompts are stored in this chat. Not customer evidence or treatment results. No endorsements, fabricated testimonials, before/after claims, fake cart/login or simulated newsletter.

Approved exceptions: generated local WebP photography, nine files and larger ZIP instead of original six-file SVG-only 20,480-byte profile. LICENCE terms unchanged. Existing original 1.0.0 QA remains historical.

Chromium/Playwright on Windows; file:// tests at 1440x900, 820x1180, 375x812, 320x740: no overflow, all images load, single h1; mobile menu open and Escape close PASS. Reduced-motion screenshots visually reviewed desktop and phone. No-JS at 320px no overflow. See checks.json and screenshots/.

ZIP bytes: 380576; SHA256: 169be174bf1f93dd80c3fe24656e3879b55d3e9c5e54db86ee8c39f1a4e2978d.

Q01 profile exception; Q02 PASS; Q03 menu/Escape PASS; Q04 full keyboard audit NOT TESTED; Q05 single h1/landmarks checked, full audit NOT TESTED; Q06 token contrast checked separately; Q07 no-JS narrow/reduced-motion PASS; Q08–Q13 complete commercial-release audit NOT TESTED. D01–D05 visual review PASS; D06–D08 coherent fictional skincare content PASS. No backend added. Authenticated purchase/download not tested.

Production URL normalization fix: demo HTML declares /demos/solenne/ as base so CSS and images resolve after Vercel removes trailing slash; source remains file:// compatible. Shared demo sync tool now inserts a directory base for future syncs. Contrast tokens: white/CTA 4.86:1; body/ivory 6.54:1; small accent/ivory 4.49:1 (full contrast acceptance not passed).
