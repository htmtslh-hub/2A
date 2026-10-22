# BRIEF — Reelmark (`reelmark` / `t89`, v1.0.0)

## Mục tiêu sản phẩm
Xây dựng mẫu giao diện Hero một màn hình tự chứa trong một file HTML duy nhất (`index.html`) cho chợ nhà sáng tạo video ngắn **Reelmark** (*"Captivate Crowds with Snackable Reels"*), theo phong cách **Soft Mint Studio** (`#F5F8EF` nền trắng ngà ấm, `#08482D` xanh rừng đậm, `#DAE7C7` huy hiệu bạc hà, `#101410` tiêu đề đen đậm) với hàng 10 thẻ video cao uốn cong như mặt trong hình trụ, tự động trôi liên tục từ phải sang trái (`50u/s`), hỗ trợ kéo/vẩy quán tính (`95%/s` giảm tốc) và các ghi chú vẽ tay `Caveat 600` tự vẽ nét.

## Lý do sử dụng cờ `--ngoai-le` khi đóng gói
- Đề bài yêu cầu kiến trúc **Single-File HTML** (gồm inline `<style>` và inline `<script>` ngay trong `index.html`, không dùng framework và không có bước build) nên gói `source/` gồm đúng 4 file (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) thuộc danh sách `INLINE_PRODUCTS` trong `dong-goi.mjs`.

## Nguồn tài nguyên bên ngoài theo đặc tả
- **Google Fonts:** `Inter Tight` (`700`), `Inter` (`400;500;600`) & `Caveat` (`600`).
- **5×2 Grid Still Poster (`16:9` WebP):** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b7ebb74a-8c8a-4f7e-8f80-55e2d74ecd05.webp`
- **5×2 Grid Loop Video (`1280×720` MP4, 5s, muted, loops):** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/04fd3d5f-99d7-476e-98a4-46c08518ffb3.mp4`
