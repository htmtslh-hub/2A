# Ember Arcade — ảnh và prompt

Built-in image_gen,09/10/2026; không CLI/API key. Screenshot của chủ sản phẩm là tham chiếu bố cục/màu, không phải ảnh được cắt đưa vào gói. Năm ảnh tạo mới, đều đã xem trực tiếp từ kết quả tool trước khi dựng mã.

| File lưu trong design | Vai trò | File built-in gốc |
|---|---|---|
| hero-concept.png | Header/hero + quick picks concept | exec-e237c10a-fe8f-4e74-8c41-79ee0d688b99.png |
| library-concept.png | Library/stats/activity concept | exec-e43d3ed2-8a16-470b-a26f-3d107c2e2e7e.png |
| rift-original.png | Artwork hero riêng,1536×1024 | exec-b6bbba13-f483-4d34-b9ce-a4b6c7647c5e.png |
| moon-original.png | Artwork Moonbound riêng,1024×1536 | exec-364aec2b-8e13-473a-9cdc-90926f0bc4ff.png |
| ash-original.png | Artwork Ashfall riêng,1024×1536 | exec-84c1fee1-396c-4e85-a231-158890f28e85.png |

Gốc ở C:/Users/Lenovo/.codex/generated_images/01a11e29-b925-73a2-843e-d8b76df039e6/. Đã copy mọi ảnh vào workspace; không phụ thuộc đường dẫn đó để chạy sản phẩm. PNG không nằm trong ZIP. Ba ảnh giao được resize toàn khung, không cắt, chuyển WebP quality83 bằng sharp; rift1440×960, moon/ash800×1200. Crop chỉ qua CSS có kiểm tra screenshot.

## Prompt set cuối

Hero concept: single horizontal1536×1024 gaming dashboard header/hero section, EMBER ARCADE, burgundy#68272f, dark-maroon left/right rails, Good evening Alex, search, large coral hero left two thirds, Rift Runner / Your next adventure starts here / Explore game, original adult female sci-fi courier orange-purple jacket/lime visor with robotic fox, three dark original-game quick rows Moonbound/Neon District/Wild Circuit, cream geometric type,24px round panels, no franchise art. Không tạo longpage/multi-section board.

Library concept: single1536×1024 lower library/stats/activity section, burgundy#68272f, New discoveries, two Moonbound/Ashfall artwork cards, dark-readable copy and cream arrow, right Your playtime with sculptural coral/yellow/lilac rings and32.5h, legend18/9.5/5h, recent activity row. Ghi rõ demo library, không tải game thật, không IP/logo có sẵn.

Rift artwork: original premium stylized3D game art1536×1024, no text/logos/UI. Adult female sci-fi courier, dark hair messy bun/lime goggles, orange-purple armor jacket/backpack, confident pose with floating orange-white robotic fox by shoulder. Character right60%, left40% empty coral atmosphere/distant sci-fi city for HTML copy. Warm dusk/purple rim light, no known franchise character.

Moon artwork: original vertical1024×1536, no text/logos/UI. Lone adult explorer dark teal coat/backpack on ancient bridge, lush alien jungle, enormous turquoise moon, broken ruins/floating islands. Cinematic stylized3D, teal-green/gold, full-body center-right upper two thirds, darker lower third for HTML copy. Original world/costume.

Ash artwork: original vertical1024×1536, no text/logos/UI. Adult desert wanderer, flowing burgundy scarf, bronze-purple armor, three-quarter back view toward orange citadel/amber planet. Cinematic stylized3D, ochre/red-orange light, full body upper two thirds, dark rocky lower foreground for HTML copy. No franchise design.

## Phân tích thiết kế

Concept hero ưu tiên nhân vật và copy lớn; triển khai compact theo screenshot gốc với hero315px, quickrows83px và rail80px. Concept lower dùng hai portrait cards và stats một cột; giữ nhịp grid1.8:1,24px gap, coral/yellow/lilac rings. Website dùng system Trebuchet/Segoe UI thay font trong concept để không có network dependency. Trên phone rail chuyển navigationbar/footer friends, cards xếp cột, statistic giữ chiều rộng đọc được. Tên game trong concept phụ được thống nhất thành ba game original trong sản phẩm, không thêm ảnh giả để đủ hàng.

## Hero revision 1.1.0 — approved reference
Original: rift-hero-v2-original.png. Local artwork rift.webp is 1440×960, 202274 bytes. Generated original courier and robotic fox in orange canyon/citadel scenery, with subject on right and open left space for live HTML title. No baked-in interface, text or franchise artwork. Hero replaced following the owner's selected reference on 2026-10-09.


## 1.2.0 — foreground breaks card edge
Built-in imagegen edits of rift-hero-v2-original.png. Cutout prompt: extract exact courier and fox, preserve face/pose/armour/goggles, remove all scenery, actual alpha on same1536×1024 canvas. Scenery prompt: remove only woman/fox, continue canyon/citadel, preserve left skyline/planet/coral light; no text/UI. Originals: rift-character-original.png and rift-background-original.png. Runtime WebPs1440×960, generated alpha preserved. No CLI/API key workflow.

