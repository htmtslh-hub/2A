# Mint Atlas — image provenance and design analysis

Built-in imagegen, no CLI/API keys. Reference: owner's attached character dossier screenshot, used for layout/palette. All output references and originals copied into design/ before completion. UI typography and chart are native code, not raster screenshot slices.

## Separate UI concepts

hero-reference.png: requested standalone1536×1024 header/hero: MINT ATLAS, Mira Vale, left adult explorer breaking top edge, mint/slate, short right title/copy, S/Scout/Echo strip, Read story, decorative stars/semicircles. Analysis: large layered figure left approximately40%, copy60%; title roughly3x body scale; 30px round hero; wide header actions with filled slate icon frames. Improve dark text contrast rather than copying light-on-mint low contrast.

dossier-reference.png: separate1536×1024 three-column Abilities/Overview/Artwork comp in same palette. Analysis: ratio approximately.85/.95/1.65; dark bars44px, pale rounded native ability entries, serif book title, score graphic and two portrait media. Avoid redundant outer card framing; stable portrait aspect; visible values and accessible score description.

## Standalone assets

mira-original.png -> assets/img/mira.webp800×1200,172562 bytes. Prompt: same original adult teal-jacket burgundy-scarf dark-bob explorer, standalone head-to-mid-thigh relaxed standing portrait, preserve face and clothing, actual alpha transparency, no background/text/UI. Alpha confirmed by sharp metadata and decode; runtime uses transparent background.

glasshouse-original.png -> glasshouse.webp800×1200,163364 bytes. Prompt: same Mira identity, three-quarter waist-up in pale botanical glasshouse with white flowers and filtered daylight, detailed anime cel shading, centered face, no UI/text.

starlight-original.png -> starlight.webp800×1200,166250 bytes. Prompt: same Mira identity, new side-profile pose toward starry teal midnight sky and ruined observatory, silver moonlight/meteor, ample top space, no UI/text/franchise logos.

WebP preparation: sharp resize800×1200 quality80, alpha preserved; no image editing via Python. Originals excluded from customer ZIP. Images available under product licence for finished websites, not separate stock resale. Gallery intentionally uses different poses/scenes; native artwork links open full local files.