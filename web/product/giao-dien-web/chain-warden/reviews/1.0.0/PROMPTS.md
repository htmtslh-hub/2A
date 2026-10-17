# Prompt tạo tài sản hình ảnh (`PROMPTS.md`)

## Subagent `image-generator` (`conversationId: 6ae297f3-6ce2-419d-91d7-2c66dc77123b`)

- **File sinh ra**: `C:\Users\Lenovo\.gemini\antigravity\brain\2f29ff2f-b383-475c-8657-dcea83d91517\warden_generated_1792205323674.jpg` -> sao lưu tại `design/warden-generated.jpg`

```text
Generate a high-resolution (1024x1024) dark-fantasy concept illustration on a deep obsidian-teal background (#071014):
- A spectral chain warden character in dark segmented armor with a horned skull wreathed in glowing emerald-cyan flames (#2ff5c8)
- Holding a curved crescent scythe with a glowing turquoise energy arc in the right hand
- Holding a heavy gothic iron lantern glowing with bright emerald soul-fire suspended from a curved segmented iron chain on the left/right
Save the generated image to `d:\3. Dự án\2A\web\product\giao-dien-web\chain-warden\design\warden-generated.jpg` and reply with the saved file path.
```

## Xử lý hậu kỳ cục bộ (`prepare-warden-images.mjs`)

- Loại bỏ nút phóng to màu xám của trình xem ảnh bên ngoài tại góc dưới bên phải (`x: 775..837, y: 384..457`) để tạo `design/reference-hero-clean.png`.
- Tách nền chữ và tạo 3 biến thể ngoại trang `source/assets/img/warden-classic.webp`, `source/assets/img/warden-darkstar.webp`, `source/assets/img/warden-highnoon.webp` khớp 1:1 kích thước `838 × 458` của khung tham chiếu.
