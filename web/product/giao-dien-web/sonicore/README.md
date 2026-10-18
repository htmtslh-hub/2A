# Sonicore (`sonicore` v1.0.0)

Dark-mode 3D spatial-audio headphone product showcase & hardware launch landing page template (`commerce`, catalog slot `t40`).

## Cấu trúc gói sản phẩm

- `source/` — Mã nguồn giao diện tĩnh hoàn chỉnh delivering 10 files (`index.html`, `assets/css/style.css`, `assets/js/main.js`, 4 ảnh sản phẩm `.webp` trong `assets/img/`, `README.md`, `CUSTOMISE.md`, `LICENCE.txt`).
- `sonicore.zip` — Gói bàn giao khách hàng đóng gói từ `source/` qua `dong-goi.mjs sonicore --ngoai-le`.
- `reviews/1.0.0/` — Hồ sơ nghiệm thu độc lập (`reference.png`, `reference-view.png`, `BRIEF.md`, `REFERENCE-MAP.md`, `MOTION-MAP.md`, `ASSETS.md`, `PROMPTS.md`, `QA.md`, `ACCEPTANCE.md`, `acceptance.json`, `source-checks.json`, `supplement.json`, `source-manifest.json`, `comparison-frozen/`, `screenshots/`).

## Kiểm tra & Đóng gói

```bash
node web/product/giao-dien-web/tools/dong-goi.mjs sonicore --ngoai-le
node web/product/giao-dien-web/tools/check-template.mjs sonicore --version 1.0.0 --ngoai-le
```
