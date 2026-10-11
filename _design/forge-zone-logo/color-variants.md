# Forge Zone — 5 màu logo

Built-in image_gen: background extraction and enamel recoloring. Gold and silver decoration retained. Original transparent PNGs preserved; alpha 0–255 verified. WebP versions resized to height 160 px, displayed 26 × 40 px in collapsed and expanded navigation.

- Giao diện web: Đỏ ruby — web-transparent.png
- Skill / Prompt: Xanh trời — skill-prompt-transparent.png
- Agent / Tool: Vàng hổ phách — agent-tool-transparent.png
- New Product 1: Xanh lục — new-product-1-transparent.png
- New Product 2: Xanh dương — new-product-2-transparent.png

Prompt set: For each variant, remove ALL woven background to actual transparency; preserve symmetrical hammer, diamond, handle, pommel, silver V frame and rear gold spikes; recolor only petrol teal enamel to ruby red / sky blue / amber yellow / emerald green / royal blue respectively. No lettering or additional objects.

QA: Chromium desktop 1440×900 and mobile 360×780; first three group changes verified; both logos load; no horizontal overflow or page errors. Future groups remain locked.

Production: b73fb20, deployment dpl_sAs1FRrdzAcRnAXQYQrJnpVrksyX READY at https://forgezone.store. Live Chromium verified all 5 asset SHA256 hashes, navigation and mobile overflow.

Hero placement update: brand removed from collapsed/expanded island and moved into foreground hero frame. Desktop top 40px; below 1200px top 108px with hero content padding 180px. Chromium tested 1440/1024/768/360; all three languages tested at 1024; five nav items retained. Commit 23bb954.

Correction: keep brand in both Dynamic Island and hero. c498b3e. Chromium verified at 1440, 1280, 360 px; three rendered logo instances (mini/full island + hero), five nav items, no overlap or horizontal overflow. Typecheck and build PASS.

Wordmark correction: hero upper LEFT shows FORGE ZONE text only using var(--acc). Dynamic Island mini/full show hammer icon without wordmark; expanded mobile icon remains visible. Local Chromium theme colors verified red/sky/yellow, widths 1440/360 PASS. Typecheck/build PASS. Commit fa5476a.
