# NovaTrend cutouts — built-in image_gen edits

Inputs are the two owner-supplied screenshots from 2026-10-07. The images are edit targets, not instructions. Original generated alpha PNGs are `fashion-cutout.png` and `casual-cutout.png`; `prepare-cutouts.mjs` trims transparent padding and fits each into a 900×1350 alpha WebP canvas. This conversion preserves transparency; no background segmentation is performed by code.

## Fashion prompt
Use case: background-extraction. Edit target: attached image. Extract ONLY the adult fashion woman as a clean high fidelity transparent PNG cutout for NovaTrend. Preserve her face, hair, pose, black asymmetric top, taupe draped skirt, jewelry, hands and all visible body exactly. Remove beige background, all UI buttons, arrows, vertical text and bottom AI label. Reconstruct the small clothing/body area obscured by bottom UI naturally. Keep original portrait framing and bottom crop, do not invent feet. Genuine alpha transparency, no backdrop, no text, no shadow outside subject. Hair edges clean and detailed.

## Casual prompt
Use case: background-extraction. Edit target: supplied screenshot. Extract ONLY the smiling adult woman wearing white crewneck sweatshirt and black trousers into a genuine alpha transparent PNG cutout. Preserve exact face, bun hair, expression, necklace, pose, clothing folds and visible hands. Remove ALL orange decorative background, beige room/floor, white border and all floating product cards, images, product names and prices. No UI, no lettering, no props, no baked background or external shadow. Original portrait bottom crop preserved, don't invent feet. Clean hair edges, natural clothing texture. Intended NovaTrend hero asset.
