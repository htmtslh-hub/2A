# Asset Generation Prompts — Sonicore (`sonicore` v1.0.0)

All 4 photorealistic dark-mode product renders were generated via the `image-generator` subagent from the normalized reference image (`reviews/1.0.0/reference.png`) and processed into `source/assets/img/*.webp` using `sharp` (`quality: 86, effort: 6`).

## 1. `source/assets/img/hero-headphone.webp` (`830×700`)

- **Raw file**: `reviews/1.0.0/raw-assets/hero-headphone.jpg` (`1024×1024`)
- **Prompt**:
  > Studio-lit photorealistic 3D product render on a pure pitch-black (`#050508`) background: a sleek matte-black over-ear wireless headphone ("SONICORE" subtle silver/violet wordmark on the outer right earcup cap, bright glowing violet-purple `#8b5cf6` / `#a855f7` LED ring around the oval earcup rim) floating at a three-quarter angle facing left, surrounded by sweeping diagonal stardust/particle orbit rings, hovering above a dark circular tiered futuristic pedestal base at the bottom with subtle purple rim lighting. No website UI text or buttons.
- **Post-processing**: Cropped and resized to `830×700` WebP (`46,946` bytes).

## 2. `source/assets/img/exploded-view.webp` (`1030×400`)

- **Raw file**: `reviews/1.0.0/raw-assets/exploded-view.jpg` (`1376×768`)
- **Prompt**:
  > Studio-lit photorealistic 3D exploded hardware view of the black Sonicore X1 over-ear headphone on a pure pitch-black (`#050508`) background, arranged horizontally from left to right: (1) plush black protein-leather oval ear cushion on the far left, (2) circular black acoustic chamber ring, (3) precision-tuned inner baffle plate, (4) 50mm titanium metallic dynamic driver cone, (5) silver/copper N52 neodymium magnet ring, (6) dark inner frame and square black hi-res audio PCB chip, and (7) on the far right, the outer right earcup shell with headband yoke, glowing purple-violet LED ring, and "SONICORE" wordmark on the earcup. No text labels or leader lines baked into the image.
- **Post-processing**: Center-cropped and resized to `1030×400` WebP (`30,792` bytes).

## 3. `source/assets/img/spatial-bust.webp` (`555×370`)

- **Raw file**: `reviews/1.0.0/raw-assets/spatial-bust.jpg` (`1024×1024`)
- **Prompt**:
  > Studio-lit photorealistic dark-mode 3D render on a pure pitch-black (`#050508`) background: a dark matte-black sculpted human head and upper-shoulders bust in three-quarter profile facing right, wearing the matte-black Sonicore X1 over-ear headphones (with glowing violet-purple LED ring and "SONICORE" on the visible side earcup), surrounded by a subtle 3D spherical constellation/wireframe sound-stage aura of glowing violet-purple dots and thin orbital arcs. No text overlays.
- **Post-processing**: Extracted `904×910` core region and fitted to `555×370` WebP (`13,920` bytes) on `#000000` canvas to preserve the full orbital sphere.

## 4. `source/assets/img/design-closeup.webp` (`895×310`)

- **Raw file**: `reviews/1.0.0/raw-assets/design-closeup.jpg` (`1376×768`)
- **Prompt**:
  > Dramatic low-key studio macro photograph of the matte-black Sonicore X1 headphone arching horizontally from left to right on a pure pitch-black (`#050508`) background, showcasing the smooth matte-black headband arch on the left, metal hinge yoke with subtle dark "SONICORE" engraving, grained black leather earpad cushion in the center-right, and sleek dark metallic earcup housing extending to the right edge. No text labels or widgets overlaid.
- **Post-processing**: Extracted `1376×600` upper-middle band and resized to `895×310` WebP (`17,488` bytes).
