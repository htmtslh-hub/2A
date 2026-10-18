# Customise Monoframe®

1. Extract the complete ZIP archive. Keep the original ZIP untouched and create a working copy before making changes. Read `README.md` and `LICENCE.txt`.
2. Install Node.js 20.19+ or 22.12+. Inside the working copy run `npm ci`, then `npm run dev`, and open the printed `http://127.0.0.1:...` URL in your browser. To preview the prebuilt snapshot immediately without building, serve `built/` over a local HTTP server. Direct `file://` opening is unsupported.
3. Gather your real agency/studio name, tagline, navigation links, action pill labels, contact email address, and licensed background video (`MP4` encoded in H.264 `yuv420p` for universal browser scrubbing). Do not invent client names, awards, or unverified claims.
4. When using an AI assistant (ChatGPT, Claude, Gemini), upload your working source files (`index.html`, `package.json`, `src/App.tsx`, `src/index.css`, `CUSTOMISE.md`) and describe your requested edit. Never share passwords, private API keys, or hosting tokens. Ask the AI to read the files first, keep the React + TypeScript + Tailwind stack intact, and return complete updated files at the same paths.
5. Update the page `<title>` and `<meta name="description">` in `index.html`, then update the brand mark (`Monoframe®`), blurred intro lines (`Hey there, meet A.R.I.A,`), and `TYPEWRITER_TEXT` in `src/App.tsx`. Save and verify in the browser.
6. Update `NAV_LINKS` (`Labs`, `Studio`, `Openings`, `Shop`) and `ACTION_PILLS` (`Pitch us an idea`, `Come work here`, `Send a brief hello`, `See how we operate`) in `src/App.tsx`, plus the contact email in `handleCopyEmail` and the outline pill (`hello@monoframe.co`).
7. To replace the mouse-scrubbed background video, place your H.264 MP4 file at `public/assets/hero-h264.mp4` (encode with frequent keyframes, e.g. `-g 6 -pix_fmt yuv420p`, for smooth horizontal scrubbing) and update `VIDEO_SRC` / `FALLBACK_H264_SRC` in `src/App.tsx`. Adjust `SENSITIVITY` (default `0.8`) if your clip is longer or shorter than 4 seconds.
8. Test at `1440×900`, `820×1180`, `768×1024`, `375×812`, and `320×740`. Verify horizontal mouse scrubbing, `400ms` pill entrance, `useTypewriter` typing and cursor disappearance, mobile hamburger menu toggle and `Escape` key closing, clipboard email copy, and zero horizontal overflow.
9. Run `npm run build` (`tsc --noEmit && vite build`), then `npm run preview`. Upload the contents of `dist/` (with `index.html` at the root) to your static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or S3/CloudFront). Note that `built/` in the ZIP is the initial prebuilt snapshot; always publish `dist/` after editing `src/`.
10. Keep a versioned backup of both your edited `src/` and built `dist/` for each release. If an edit introduces a layout or build regression, restore the last known-good file and re-run `npm run build`.

## Editing prompts

Copy one prompt below and attach your current project files (`index.html`, `package.json`, `src/App.tsx`, `src/index.css`, `CUSTOMISE.md`). Every prompt preserves React 18, TypeScript, Vite, Tailwind CSS, the mouse-scrub video mechanic, file paths, and unrelated behavior.

1. **Initial project audit & onboarding interview:** Read the attached Monoframe source files (`index.html`, `package.json`, `src/App.tsx`, `src/index.css`, `README.md`, `CUSTOMISE.md`, `LICENCE.txt`). List the files you inspected, summarize how the mouse-scrub video, `useTypewriter` hook, and action pills work, and then ask me in small groups for my agency name, intro label, typewriter message, navigation links, and contact email. Do not edit any code yet.
2. **Brand identity & copy replacement:** Replace `Monoframe®`, the blurred `A.R.I.A` intro lines, `TYPEWRITER_TEXT`, and `hello@monoframe.co` in `src/App.tsx` and `index.html` with my verified brand details. Ask for any missing details first. Preserve the `useTypewriter(TYPEWRITER_TEXT, 38, 600)` timing, blurred intro styling (`filter: blur(4px)`), and exact Tailwind layout classes. Return complete updated `index.html` and `src/App.tsx`.
3. **Navigation & action pills customization:** Inspect `NAV_LINKS`, `ACTION_PILLS`, the `"Get in touch"` CTA, and the outline email copy pill in `src/App.tsx`. Ask me for the exact labels and real destinations (`href` or click handlers) I want for each item, then update both desktop and mobile navigation and the pill buttons. Keep the `, ` comma separation on desktop nav and the `400ms` pill entrance transition.
4. **Typography & color palette update:** Read `index.html`, `src/index.css`, and `src/App.tsx`. Ask for my preferred heading font, body font, and button/accent colors. Update the `<link>` tags in `index.html`, `--font-heading` and `--font-body` in `src/index.css`, and pill/navbar color classes in `src/App.tsx` while maintaining readable contrast over the background video and keeping fallback font stacks.
5. **Background video & scrub sensitivity tuning:** Inspect the `<video>` element, `VIDEO_SRC`, `FALLBACK_H264_SRC`, `SENSITIVITY`, `handleMouseMove`, and `handleSeeked` in `src/App.tsx`. Ask for my new video file path/URL, duration, and desired focal alignment (`object-position`). Update the video source and tune `SENSITIVITY` while preserving the `onSeeked` queue that prevents seek-flooding. Also give me the exact `ffmpeg` command to encode an H.264 `yuv420p` MP4 optimized for smooth mouse scrubbing.
6. **Multilingual translation:** Ask which target language I want (e.g., Vietnamese, Japanese, French, German). Translate all visible copy in `index.html` and `src/App.tsx` (nav links, CTA, blurred intro lines, `TYPEWRITER_TEXT`, action pills, `aria-label` attributes) while keeping code identifiers, CSS classes, and email addresses intact. Check that the translated pills wrap cleanly at `320px` and `375px` widths.
7. **Adding a modal or secondary section:** Ask what interactive modal (e.g., a pitch brief drawer, studio reel modal, or openings list) or section I want to open when clicking one of the `ACTION_PILLS` or `NAV_LINKS`. Implement it cleanly in `src/App.tsx` using React state and Tailwind CSS without adding external UI libraries, supporting keyboard `Escape` and focus management.
8. **Pre-launch QA & accessibility audit:** Audit my current `index.html`, `src/App.tsx`, and `src/index.css` before launch. Check for leftover demo strings (`Monoframe`, `hello@monoframe.co`), broken links, missing `aria-label` attributes, keyboard focus visibility, `320px` narrow viewport wrapping, TypeScript strictness, and video codec compatibility. Report findings grouped into Blockers, Improvements, and Not Tested items without modifying files silently.
9. **Build & static hosting deployment guide:** Ask which hosting platform I use (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or custom server). Guide me step by step through running `npm ci` and `npm run build`, configuring the output directory (`dist`), and verifying asset paths, HTTPS, and video playback on the live URL. Never ask for secret tokens.
10. **Custom domain & DNS configuration:** Ask for my domain registrar and hosting provider, plus the exact `A` / `CNAME` records shown in my host's dashboard. Explain how to configure root (`@`) and `www` records safely without disrupting existing `MX` or `TXT` email records for my domain, and how to verify SSL/HTTPS propagation.
11. **Targeted surgical tweak:** Read my attached files and ask for the single specific change I want (e.g., adjusting `useTypewriter` speed/delay, changing the mobile overlay backdrop, or tweaking pill spacing). Modify only the minimum lines required, preserve all other styles and logic, and return the complete changed file along with a quick verification step.
12. **Troubleshooting & bug diagnosis:** Ask me what behavior I expected, what actually happened, which browser/device I used, and any console or terminal error output. Inspect `src/App.tsx`, `src/index.css`, and `package.json`, identify the root cause with evidence (distinguishing verified facts from hypotheses), and provide the minimal fix plus a repeatable test.

## Literal edit map

| Find | Count | File / effect |
|---|---:|---|
| `Monoframe®` | 1 | `index.html` browser title (`Monoframe® — Creative Agency`) |
| `Monoframe®` | 1 | `src/App.tsx` navbar logo text (`var(--font-heading)`) |
| `Monoframe&apos;s Adaptive Response Interface Agent` | 1 | `src/App.tsx` blurred intro label line 2 |
| `const TYPEWRITER_TEXT =` | 1 | `src/App.tsx` typewriter paragraph copy |
| `const NAV_LINKS =` | 1 | `src/App.tsx` 4 navigation links (`Labs`, `Studio`, `Openings`, `Shop`) |
| `const ACTION_PILLS =` | 1 | `src/App.tsx` 4 solid white pill buttons |
| `hello@monoframe.co` | 6 | `src/App.tsx` mailto links, clipboard copy handler, and outline pill label |
| `const VIDEO_SRC =` | 1 | `src/App.tsx` primary background video URL |
| `const FALLBACK_H264_SRC =` | 1 | `src/App.tsx` local H.264 scrubbing video path (`./assets/hero-h264.mp4`) |
| `const SENSITIVITY = 0.8;` | 1 | `src/App.tsx` horizontal mouse-scrub multiplier |
| `--font-heading:` | 1 | `src/index.css` heading font stack variable |
| `--font-body:` | 1 | `src/index.css` body font stack variable |
