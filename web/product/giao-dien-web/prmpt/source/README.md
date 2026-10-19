# prmpt — Archive Collection "PROMPT" (`v1.0.0`)

**prmpt** là mẫu giao diện landing page thời trang và kho lưu trữ (fashion/archive) toàn màn hình điều khiển theo cuộn trang, được xây dựng bằng **React 19 + TypeScript + Vite 6 + Tailwind CSS v4 (`@tailwindcss/vite`) + GSAP 3.15 (`ScrollTrigger`) + Motion 12 (`motion/react`)**, kèm sẵn bản dựng tĩnh tại `built/` để chạy ngay không cần biên dịch.

## Điểm nổi bật

- **Giai đoạn 1 — Hero Video hai luồng tương tác (`#main-canvas`):**
  - Trên **Desktop (`>= 1024px`, không cảm ứng):** Hai video (`#left-video` và `#right-video`) được tua mượt theo tọa độ ngang của con trỏ chuột trong vòng lặp `requestAnimationFrame` (chỉ cập nhật `currentTime` khi `!video.seeking` để tránh giật hình), kèm vùng đệm trung tâm (`deadZone = Math.max(30, width * 0.05)`).
  - Trên **Mobile / Tablet (`< 1024px` hoặc thiết bị cảm ứng):** Hai video tự động phát luân phiên (`left` kết thúc chuyển sang `right`, `right` kết thúc chuyển lại `left`), tôn trọng `prefers-reduced-motion`.
  - Toàn bộ lớp chữ và biểu tượng nổi (`#hero-logo`, `#hero-caption`, `#hero-nav`, `#outro-info`, `#outro-buy`, `#outro-footer`, `#custom-cursor`) dùng `mix-blend-mode: exclusion` và `pointer-events: none` để luôn nổi bật trên cả nền sáng và tối.
- **Giai đoạn 2 — Bảng Đen & Lưới Ảnh Thời trang Rải rác (`#black-panel`):**
  - Bảng đen trượt từ `translateY(100vh)` lên `translateY(0)` trong `100vh` cuộn đầu tiên qua **GSAP ScrollTrigger** (`scrub: true, ease: 'none'`).
  - Thuật toán `buildLayout(count, cols)` tự động chia 10 ảnh bộ sưu tập thành lưới `2` cột (`< 640px`), `3` cột (`640–1024px`) hoặc `4` cột (`>= 1024px`) với tỷ lệ khung `2/3`.
  - Mỗi thẻ `.bp-card` phóng to từ `scale(0)` lên `scale(1)` khi đi vào khung nhìn (`enter`) và thu nhỏ về `scale(0)` khi rời đỉnh khung nhìn (`exit`) với `transform-origin` đối xứng (`right bottom` cho nửa trái, `left bottom` cho nửa phải).
- **Giai đoạn Kết (Outro — `scrollY > vh + maxScroll`):**
  - Lớp phủ trắng `#outro-overlay` hiện dần, cụm thông tin sản phẩm `#outro-info` trượt lên theo `data-outro-offset` (`166px` desktop / `132px` mobile), nút viên thuốc `#outro-buy` (`"view"`) phóng từ `scale(0)` lên `scale(1)` và chân trang `#outro-footer` hiện rõ.
  - Biểu tượng `#circle-symbol` trong vòng tròn tự động nhảy ngẫu nhiên qua bộ ký tự `['8', '$', '^^', '%', '/']` khi cuộn (throttle `80ms`).

## Cấu trúc thư mục

```text
source/
├── built/                      # Bản dựng tĩnh đã biên dịch sẵn (chạy trực tiếp qua HTTP server)
├── src/
│   ├── App.tsx                 # Giao diện chính: Hero video scrub, GSAP black panel, buildLayout & RAF loop
│   ├── main.tsx                # Điểm khởi chạy React 19
│   └── index.css               # Tailwind CSS v4 (@import "tailwindcss") + quy tắc .bp-card
├── index.html                  # Khai báo Google Fonts Inter Tight 500 & #root
├── package.json                # Cấu hình dependencies (react 19, gsap 3.15, motion 12, tailwindcss 4, vite 6)
├── tsconfig.json               # Cấu hình TypeScript
├── vite.config.ts              # Cấu hình Vite 6 (@vitejs/plugin-react, @tailwindcss/vite, base: './')
├── CUSTOMISE.md                # Hướng dẫn tùy biến 10 bước + 12 prompt AI + bảng chuỗi literal
├── LICENCE.txt                 # Giấy phép sử dụng thương mại
└── THIRD-PARTY-LICENSES.txt    # Giấy phép phần mềm bên thứ ba
```

## Cách chạy nhanh

### 1. Xem ngay bản dựng sẵn (`built/`)
```bash
npx serve built
```

### 2. Chạy môi trường phát triển & biên dịch lại
```bash
npm install
npm run dev      # Chạy máy chủ phát triển Vite
npm run build    # Kiểm tra TypeScript (tsc --noEmit) và xuất bản dựng vào dist/
```
