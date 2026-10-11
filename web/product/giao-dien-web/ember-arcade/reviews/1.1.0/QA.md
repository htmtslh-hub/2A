# Ember Arcade — QA 1.1.0

2026-10-09. Scope: replace approved hero, three quick-pick image tiles and header wordmark; update product-only assets, customer edit map, local demo, preview and commercial ZIP. Lower dashboard layout and JavaScript unchanged. No shared catalog/backend/config or other products changed. Existing W01/W03/W05/W06 exceptions retained; not a claim of strict six-file/20,480-byte compliance.

ZIP: 587605 bytes, nine files, SHA-256 `01a8f90a64ab52cb1c87d2d38672680ec7c72e0d372e8c12e3fb517e5a251c41`. Three local artworks; Rift replacement 1440×960, 202274 bytes. Original PNG and generation notes are private design artifacts. Commercial licence policy unchanged.

Edge 155.0.4283.45: six widths 1440/1024/820/768/375/320, all images loaded, no overflow or runtime errors. Search and empty state, Escape and slash shortcut, saved favourites and persistence/removal, blocked-storage fallback, hero hash/native notes, image failure and offline file/no-JS notes passed. Evidence: interactions.json and screenshots/. Lazy images are explicitly loaded before checking their decoding, since the taller hero moves discovery below the first fold.

Visual review: desktop preview, 1024 and 320/375 mobile screenshots; live two-line title, courier scene and three quick picks remain readable. At narrow mobile widths the courier crop takes priority over the fox. Title remains native HTML. Hover and reveal motion unchanged.

The first package check (accepted/) detected horizontal overflow at simulated 200% zoom in both engines. Fixed aspect-ratio minimum sizing by setting an explicit responsive height and width/min-width. Only final/ is release evidence; the earlier failed report is retained as history.

Safari and Cốc Cốc not tested. No production deployment, store purchase or backend load test. This update is a local commercial template revision.
Final ZIP checks: PASS, failures:[] on Chromium153.0.8010.12 and Firefox155.0. Responsive four sizes, keyboard/menu, contrast, axe, offline/no-JS and 200% zoom checks passed. Source matches extracted package. Customer documentation: ten steps, twelve prompts, no count errors. Source/demo CSS and Rift image hashes match; local demo responds200. Preview regenerated from final Edge code screenshot at698×524.

