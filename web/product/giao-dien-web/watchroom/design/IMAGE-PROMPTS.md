# Watchroom 1.1.0 image set

Built-in `image_gen` was used, with `transparent_background: true`. No CLI/API fallback. The first generation was refined once to obtain a full isolated product; the selected refined output was then used as the reference for two colour edits. Original generated PNGs remain untouched in the Codex generated_images directory. Final consumed assets are copied into the project as alpha-preserving WebP via FFmpeg format conversion, quality82, compression_level6, with no geometry or colour edits.

## Initial generation

Use case: product-mockup. Create one photorealistic luxury wristwatch product cutout for a navy watch showroom website. A full-length vertical wristwatch, straight-on front view, perfectly upright and centered, navy blue sculpted silicone strap with rose gold rectangular buckle accents, polished rose gold case and pushers, deep midnight blue detailed analog chronograph dial with three recessed subdials, rose gold applied hour markers, realistic hands at 10:10, subtle red second hand, tiny date window. Luxury studio macro photography with exceptionally realistic polished metal reflections, brushed textures, sapphire glass, detailed dial depth. Entire strap and case visible, no cropping, generous tight uniform transparent margin. Portrait canvas. True transparent alpha background, no floor, no pedestal, no background or cast shadow baked into canvas, no other objects, no brand logo, no readable text except small dial numerals. This is one fictional watch, not a copy of a named brand.

## Selected navy asset, refinement prompt

Edit this watch photograph into a clean isolated product asset. Remove ALL background, including every navy glow, brown glow, black area and external shadow. Make the background completely genuinely transparent (alpha=0), not a black or checkerboard painted background. Preserve this exact navy blue and rose gold watch, its realistic fine details, lighting, straight-on view and full-length strap. Fit the complete watch within the image with at least 7% transparent margin on top and bottom, 15% on sides. Do not crop its buckle or strap tips. Do not add floor or shadow. The only opaque pixels should belong to the physical watch.

Selected source: `exec-f879472f-c7ec-4e07-9c62-e4200e7b5c86.png`.
Final: `source/assets/img/quantum-adg.webp`, 1024×1536, 165038byte.

## Onyx asset, edit prompt

Use case: precise-object-edit. Create a second colourway of this exact photorealistic watch cutout for the same website product carousel. Change ONLY the rose gold metal (case, pushers, crown, hands, applied indices, strap accents) to premium brushed and polished cool silver steel. Change ONLY the navy blue dial and silicone strap to deep onyx black charcoal. Preserve the precise same straight-on camera view, full watch silhouette, complete vertical strap, centered framing, scale, 10:10 hands, subdials, date, detailed sapphire glass, soft studio reflections. Preserve the transparent alpha background; absolutely no opaque background or floor. No brand logo, no new text, no extra objects.

Selected source: `exec-0d8bd36c-6a00-413f-a93a-d6080fe3ad09.png`.
Final: `source/assets/img/onyx-gmt.webp`, 1024×1536, 132748byte.

## Forest asset, edit prompt

Use case: precise-object-edit. Create the third colourway of this exact photorealistic watch cutout for the same website carousel. Change ONLY rose gold metal (case, pushers, crown, hands, applied indices, strap accents) to pale champagne yellow gold, sophisticated subtle not orange. Change ONLY navy blue dial and silicone strap to deep forest green. Preserve exactly the same straight-on front camera view, full silhouette, complete upright vertical strap, centered framing, size, hands at 10:10, three detailed subdials, date window and realistic sapphire glass and texture. Preserve transparent alpha background; no opaque background, cast shadow or floor. Only the physical watch should be opaque. No branding, no extra text, no other objects.

Selected source: `exec-582f09be-b563-40b8-b38a-762d91ec2974.png`.
Final: `source/assets/img/solaris-38.webp`, 1024×1536, 159562byte.

All three WebPs were inspected: RGBA, alpha range0–254, alpha0 at each image corner. The physical product stays nearly opaque; invisible background RGB is not used by compositing. The same files are shared by hero and collection cards. Fictional visual assets, not documentation of real hardware.
