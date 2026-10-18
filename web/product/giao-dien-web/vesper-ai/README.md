# Vesper.ai (`vesper-ai` v1.0.0)

Single-viewport operational AI infrastructure landing page (`commerce`, catalog slot `t48`) with pure black `#000000` canvas, local WOFF2 variable typography (`Inter` + `Instrument Serif` italic), full-bleed H.264 hero video loop, liquid-metal navigation pills, liquid-glass action buttons, and 9-keyframe spring-settle entrance choreography.

## Cấu trúc gói sản phẩm

- `source/` — Mã nguồn giao diện hoàn chỉnh (`index.html`, `inter.woff2`, `instrument-serif-italic.woff2`, `hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4`, `assets/css/style.css`, `assets/js/main.js`, `README.md`, `CUSTOMISE.md`, `LICENCE.txt`).
- `vesper-ai.zip` — Gói bàn giao khách hàng đóng gói từ `source/` qua `dong-goi.mjs vesper-ai --ngoai-le`.
- `reviews/1.0.0/` — Hồ sơ kiểm tra đa trình duyệt (Chromium, Edge, Firefox ở 4 ngưỡng viewport `320×740`, `375×812`, `820×1180`, `1440×900` và `1920×1080`).

## Kiểm tra & Đóng gói

```bash
node web/product/giao-dien-web/tools/dong-goi.mjs vesper-ai --ngoai-le
```
