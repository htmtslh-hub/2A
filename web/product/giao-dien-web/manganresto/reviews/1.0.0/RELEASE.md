# Manganresto 1.0.0 Release Record

16 October 2026, Windows. Commercial template release for Forge Zone marketplace.

## Product Identifiers
- Name: Manganresto
- Slug: `manganresto`
- Store Slot: `t42`
- Category: `commerce`
- Version: `1.0.0`
- Public Demo URL: `https://forgezone.store/demos/manganresto/index.html?v=1.0.0`
- Store Product URL: `https://forgezone.store/?mau=t42`
- Video Preview: `/previews/manganresto.mp4`
- Poster Preview: `/previews/manganresto.webp`

## Package Verification
- Commercial ZIP: `manganresto.zip` (431,481 bytes)
- SHA-256 Digest: `acbcbd2b16994c3d1a88fd5fe791ecd8dfa04a354375375a8992cae3215ca8c4`
- File Count: 9 files (pure HTML, CSS, vanilla JS, 3 custom transparent WebP dish cutouts, CUSTOMISE.md, README.md, LICENCE.txt).
- Extracted integrity: Byte-for-byte identical match with `source/`.
- No third-party runtime libraries, frameworks, analytics scripts, trackers, or build requirements.

## Recording Verification
- Script: `web/product/giao-dien-web/tools/quay-preview.mjs`
- Duration: 14.97 seconds (within 12-18s standard window).
- Frame size: 1440×900 viewport.
- Manifest check: Passed via `quay-preview.mjs manganresto --check`.

## Compliance
- WEB-STATIC-1 v1.2.1 with session-authorized W01/W03/W05/W06 exceptions for local high-fidelity WebP food assets and interactive menu dialogs.
- Conforms to product policy 05/10/2026: animations enabled by default across all engines (Edge, Cốc Cốc, Chrome, Firefox).

## Production Deployment
- Platform: Vercel Production
- Deployment ID: `dpl_H3dpTdSjC4PPgnP1vYr34LSNqMjq`
- Production URL: `https://web-mvmyj1x3x-htmtslh-hubs-projects.vercel.app`
- Live Aliases: `https://forgezone.store`, `https://www.forgezone.store`
- Git Commit: `61447e8` on branch `codex/manganresto-release`
- Status: READY (HTTP 200 verified on both live store `/?mau=t42` and demo `/demos/manganresto/index.html?v=1.0.0`)

