# Jack — 3D Creator

React 18, TypeScript, Tailwind CSS, Framer Motion and Lucide React portfolio, built from the supplied brief. Hero portrait follows the pointer; two GIF rows respond to scroll; biography reveals character by character; three project cards scale and stack.

## Run

Install Node.js 20.19+ or 22.12+. In this folder run `npm ci`, then `npm run dev`. Open the printed local URL. Run `npm run build` for production and `npm run preview` to inspect the build. Publish the `dist` folder to a static web host. This React project requires HTTP and JavaScript; opening index.html directly is unsupported.

## Edit map

- `src/main.tsx`: copy, sections, services, contact and project dialogs.
- `src/assets.json`: 1 portrait, 4 decorations, 21 GIF URLs and 9 project images.
- `src/styles.css`: colors, gradients, typography and card styling.
- `index.html`: metadata and Kanit font request.

## Package

Start with CUSTOMISE.md. The ZIP contains editable source, package-lock.json, Vite/TypeScript/Tailwind configuration, LICENCE.txt and dependency notices. It also contains built/, a prebuilt static site that can be served over HTTP or uploaded to a static host. After editing source, rebuild and publish dist/ instead. node_modules is deliberately excluded. Keep an original ZIP and a backup before editing.

The explicit React brief overrides WEB-STATIC-1's buildless six-file profile. Dependencies are pinned in package-lock.json. Media and Google Fonts require internet. Celestia GIF URL from the brief returns HTTP 404; its tile displays Preview unavailable. Contact and Live Project open clearly identified demo dialogs; connect real destinations before launch. No email is sent.

Local QA: TypeScript and Vite build; Edge 155 and Cốc Cốc 152 at 1440×900, 820×1180, 375×812 and 320×740; no horizontal overflow or uncaught JS errors. Magnetic movement, opposite scroll tracks, contact dialog and Escape checked. Safari, payment, store publishing and full accessibility audit not tested. Original media rights are not conveyed by this source package.
