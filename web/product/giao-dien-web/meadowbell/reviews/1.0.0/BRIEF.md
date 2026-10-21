# BRIEF — Meadowbell (`meadowbell` / `t83`, v1.0.0)

## Mục tiêu sản phẩm
Xây dựng mẫu giao diện Hero trang đích tự chứa trong một file HTML duy nhất (`index.html`) cho loạt phim hoạt hình thiếu nhi chủ đề nông trại **"Hollyoak's Plucky Sprout Squad"** của xưởng phim giả tưởng **Meadowbell**, theo phong cách anime vẽ tay nắng chiều (cậu bé và chú chó beagle nằm trên đồi cỏ hoa dại ngắm mây tích trên bầu trời xanh).

## Lý do sử dụng cờ `--ngoai-le` khi đóng gói
- Đề bài yêu cầu kiến trúc **Single-File HTML** (gồm inline `<style>` và inline `<script>` ngay trong `index.html`, không dùng framework và không có bước build) nên gói `source/` gồm đúng 4 file (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) thuộc danh sách `INLINE_PRODUCTS` trong `dong-goi.mjs`.

## Nguồn tài nguyên bên ngoài theo đặc tả
- **Google Fonts:** `Grandstander` (`900`) & `Inter` (`400;500`).
- **9:8 Background Plate (`2160×1920` JPG):** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/3ca5d10d-ea2f-4907-876f-33bde169469e.jpg`
- **Square Mirror-Padded Loop Video (`960×960` MP4, `width: 100%; height: 112.5%; top: -6.25%`):** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d2cb5bef-f92b-4e91-ae93-8dc6555e56ac.mp4`
- **Three Chapter Card Stills (`378×273` WebP):**
  1. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cd2d844f-ae3f-4fa9-8067-b077530b6e71.webp`
  2. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/48f5b97e-c27c-4afd-9427-eb35aebd1751.webp`
  3. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cde5384e-ce4d-423f-925a-451b779066e0.webp`
