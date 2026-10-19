# prmpt (`prmpt`) — Hồ sơ Thiết kế & Ngoại lệ theo Yêu cầu Chủ Sản phẩm (v1.0.0)

- **Ngày lập:** 2026-10-19
- **Mã sản phẩm:** `t71` (`prmpt`)
- **Phân loại cửa hàng:** `commerce` (Fashion / Archive Collection Showcase)
- **Chế độ truy cập:** `free` (tải miễn phí theo chính sách các mẫu tạo từ prompt)
- **Phạm vi thực hiện:**
  - Thư mục sản phẩm: `web/product/giao-dien-web/prmpt/` (`README.md`, `prmpt.zip`, `source/`, `reviews/1.0.0/`)
  - Bản dựng demo tĩnh: `web/public/demos/prmpt/`
  - Ảnh & video preview cửa hàng: `web/public/previews/prmpt.webp`, `prmpt-tablet.webp`, `prmpt-mobile.webp`, `prmpt.mp4`
  - Đăng ký catalog & kiểm tra: `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/preview-recordings.json`, `web/tools/check-memberships.cjs`, `web/product/giao-dien-web/tools/dong-goi.mjs`, `web/product/giao-dien-web/tools/quay-preview.mjs`

## Ngoại lệ được ủy quyền từ Chủ Sản phẩm so với `WEB-STATIC-1`

Theo đúng prompt chi tiết của chủ sản phẩm cho **prmpt**:
1. **Tech Stack:** React 19 + TypeScript + Vite 6 (`@vitejs/plugin-react`) + Tailwind CSS v4 (`@tailwindcss/vite`) + GSAP 3.15 (`@gsap/react`, `ScrollTrigger`) + Motion 12 (`motion/react`). Gói ZIP bàn giao gồm đầy đủ mã nguồn chỉnh sửa được, `README.md`, `CUSTOMISE.md`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt` và thư mục `built/` biên dịch sẵn với đường dẫn tương đối (`base: './'`).
2. **Tài nguyên mạng theo chỉ định:**
   - Phông chữ `Inter Tight` (weight 500) từ Google Fonts.
   - 2 video MP4 trên CloudFront (Left video & Right video) tương tác theo vị trí con trỏ chuột (có vùng dead zone ở giữa, chỉ tua khi `!video.seeking`) trên desktop và tự phát luân phiên trên thiết bị cảm ứng.
   - 10 ảnh sản phẩm thời trang WebP qua `images.higgs.ai` / CloudFront sắp xếp theo thuật toán lưới `buildLayout(count, cols)` (`2` cột mobile, `3` cột tablet, `4` cột desktop) phóng to/thu nhỏ theo vị trí khung nhìn trong vòng lặp `requestAnimationFrame`.
3. **Bố cục & Hiệu ứng đặc thù:**
   - Tất cả lớp chữ/biểu tượng nổi (`logo`, `caption`, `header nav`, `#outro-info`, `#outro-buy`, `#outro-footer`, con trỏ tùy chỉnh) dùng `mix-blend-mode: exclusion` và `pointer-events: none` để tự động đảo màu giữa nền video, bảng đen (`#black-panel`) và lớp phủ trắng cuối trang (`#outro-overlay`).
   - Biểu tượng `#circle-symbol` đổi ngẫu nhiên trong `['8', '$', '^^', '%', '/']` khi cuộn (throttle 80ms).
