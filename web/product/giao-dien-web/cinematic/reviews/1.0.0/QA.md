# Cinematic (`cinematic`) — Hồ sơ Nghiệm thu & QA (v1.0.0)

- **Ngày kiểm tra:** 2026-10-19
- **Sản phẩm:** Cinematic (`cinematic`) — Movie & Streaming Hero (`t73`).
- **Trạng thái:** Đã hoàn thiện nguồn `source/` (`React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + lucide-react`), biên dịch bản dựng `source/built/` (`tsc --noEmit && vite build`), đóng gói `cinematic.zip`, hoàn tất kiểm tra tự động + trực quan trên 4 trình duyệt tại 4 kích thước khung nhìn (`1440×900`, `820×1180`, `375×812`, `320×740`), và tích hợp đầy đủ lên cửa hàng (`t73`) kèm ảnh preview WebP và video preview 15 giây.
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1) và `docs/instruction-product.txt`, áp dụng ngoại lệ theo prompt (React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + `lucide-react`, tải phông chữ `Inter` 300–700 từ Google Fonts và tải luồng video MP4 từ CloudFront `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4`) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** `web/product/giao-dien-web/cinematic/`, `web/public/demos/cinematic/`, `web/public/previews/cinematic*`, `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/preview-recordings.json`, `web/tools/check-memberships.cjs`, `web/product/giao-dien-web/tools/dong-goi.mjs`, `web/product/giao-dien-web/tools/quay-preview.mjs` và `web/product/giao-dien-web/reviews/video-previews/cinematic.json`.

## 1. Môi trường & Trình duyệt đã chạy thật

Chạy tự động qua HTTP cục bộ bằng `reviews/1.0.0/check.cjs` (kết quả lưu tại `reviews/1.0.0/checks.json`):
- **Playwright Chromium:** `153.0.8010.12`
- **Playwright Firefox:** `155.0`
- **Microsoft Edge:** `155.0.4283.62`
- **Cốc Cốc Browser:** `152.0.7977.124`
- **Kích thước viewport đã kiểm tra trên cả 4 trình duyệt:** `1440×900`, `820×1180`, `375×812`, `320×740`.

## 2. Kết quả Checklist Chất lượng (`Q01–Q13`)

| Mã | Hạng mục | Kết quả | Bằng chứng xác minh |
|---|---|---|---|
| **Q01** | Cấu trúc gói & ngoại lệ React / Vite / Tailwind v4 / Lucide React | **PASS (theo ngoại lệ Brief)** | Gói `cinematic.zip` gồm 15 file: mã nguồn React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + `lucide-react` (`index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`) và bản dựng tĩnh `built/` (từ `dist/`). Loại trừ `node_modules` và `dist`. |
| **Q02** | Không tràn ngang & không tràn dọc (`320–1440px`) | **PASS** | `horizontalOverflow: false` (`scrollWidth === innerWidth`) và `verticalOverflow: false` (`scrollHeight === innerHeight`) tại `320×740`, `375×812`, `820×1180`, `1440×900` trên cả 4 trình duyệt (`checks.json`). |
| **Q03** | Lớp phủ làm mờ đáy (`#bottom-blur-overlay`), nút `.liquid-glass`, hoạt ảnh `.animate-blur-fade-up` (`0ms–900ms`), chuyển tác phẩm `Previous` / `Next` & menu di động | **PASS** | - **Bottom Blur Overlay (`z-index: 1`):** Áp dụng `backdrop-blur-xl` kèm mặt nạ `mask-image: linear-gradient(to top, black 0%, transparent 45%)` mà không dùng lớp phủ tối màu.<br>- **Liquid Glass (`.liquid-glass`):** `glassBlendMode: "luminosity"`, `backdrop-filter: blur(4px)`, `box-shadow: inset 0 1px 1px rgba(255,255,255,0.1)` và `::before` viền sáng `1.4px` (`mask-composite: exclude`).<br>- **Staggered `blurFadeUp` (`0ms–900ms`):** Xác nhận chính xác `watchNowDelay: "600ms"`, `learnMoreDelay: "700ms"`, `prevDelay: "800ms"`, `nextDelay: "900ms"` và `titleOpacity: 1`.<br>- **Chuyển tác phẩm (`#next-btn` / `#prev-btn`):** Click `#next-btn` đổi tiêu đề sang `"Beyond The Horizon Line."`, click `#prev-btn` khôi phục `"Step Through. Work Smarter."`.<br>- **Menu di động (`#mobile-menu`):** Tại `375×812`, click `#mobile-menu-btn` mở menu (`ariaHidden: "false"`, `opacity: 1`, `links: 5`) kèm biểu tượng xoay `180°` giữa `Menu` và `X`. |
| **Q04** | Điều hướng bàn phím & ngữ nghĩa | **PASS** | Hỗ trợ đóng menu di động bằng phím `Escape` và chuyển tác phẩm bằng phím `ArrowLeft` / `ArrowRight`; các nút có `aria-label`, `aria-expanded`, `aria-controls` đầy đủ. |
| **Q05** | Landmark HTML & Heading | **PASS** | Có `<header id="main-navbar">`, `<nav id="desktop-nav" aria-label="Primary Navigation">`, `<nav aria-label="Mobile Navigation">`, `<main id="hero-content">` và 1 `<h1>` duy nhất (`#hero-title`). |
| **Q06** | Độ tương phản chữ & kiểu chữ `Inter` | **PASS** | Chữ trắng (`#ffffff`) và phụ đề `text-gray-400` nổi bật trên vùng đáy đã được làm mờ bằng `backdrop-blur-xl`, cùng nút `"Watch Now"` nền trắng chữ đen tương phản cao. |
| **Q07** | Tương thích codec video | **PASS** | Video MP4 CloudFront đạt `videoReadyState >= 2` (`autoPlay`, `loop`, `muted`, `playsInline`) trên cả 4 trình duyệt Chromium, Firefox, Edge và Cốc Cốc. |
| **Q08** | Kiểm tra đa trình duyệt thực tế | **PASS** | Đã chạy kiểm tra tự động và chụp ảnh màn hình trên cả 4 trình duyệt: Chromium, Firefox, Edge, Cốc Cốc. |
| **Q09** | Không lỗi Console / PageError / TypeScript | **PASS** | `tsc --noEmit && vite build` đạt `0` lỗi; `consoleErrors: []` và `pageErrors: []` trên cả 4 trình duyệt ở mọi kích thước khung nhìn (`checks.json`). |
| **Q10** | Tài liệu `CUSTOMISE.md`, `README.md`, `LICENCE.txt` | **PASS** | `CUSTOMISE.md` có đủ 10 bước cài đặt/chỉnh sửa/triển khai, 12 prompt AI chuyên biệt và bảng đối chiếu chuỗi literal khớp chính xác số lần xuất hiện thực tế. |
| **Q11** | Đóng gói `cinematic.zip` chuẩn `/` | **PASS** | `cinematic.zip` (`85,717` bytes, SHA-256 `609adaa2c896d41418445d3edf1c9471f5e5f67e4b11a0bdc0f432bd3511b863`), toàn bộ 15 đường dẫn dùng `/`, giải nén và đối chiếu khớp 100% byte. |
| **Q12** | Đồng bộ cửa hàng (`t73`) & video preview | **PASS** | Đã đăng ký mã `t73` (`cinematic`) trong `template-categories.ts`, `real-templates.ts`, `template-guides.ts`, `check-memberships.cjs`; xuất ảnh preview `cinematic.webp` (`698×524`), `cinematic-tablet.webp` (`698×1004`), `cinematic-mobile.webp` (`698×1511`); quay video preview 15 giây `cinematic.mp4` (`597,605` bytes, `14.966667s`, revision `b0e53a2ce020`, `errors=0`, `missing=0`). |
| **Q13** | Kiểm tra trực quan ảnh chụp màn hình | **PASS** | Đã xem trực tiếp các ảnh chụp (`chromium-1440.png`, `chromium-1440-next.png`, `chromium-375.png`, `chromium-375-menu.png` và filmstrip `cinematic-contact.jpg`). |

## 3. Đánh giá Thiết kế (`D01–D08`) & Chuyển động (`T01–T04`)

- **D01–D08:** Bố cục điện ảnh mở rộng toàn khung nhìn: giữ trọn vùng trung tâm cho cảnh hẻm núi hoàng hôn của video nền, chỉ làm mờ phần đáy (`0%–45%`) để đặt dải thông số IMDB, tiêu đề lớn `Step Through. Work Smarter.` (`letter-spacing: -0.04em`), cặp nút CTA và cặp nút điều hướng `Previous` / `Next` cân đối hai bên.
- **T01–T04:** Chuỗi hoạt ảnh `blurFadeUp` (`1s ease-out forwards`) phân tầng chính xác theo từng nấc `50ms–100ms` từ `0ms` đến `900ms`, kết hợp hiệu ứng xoay `180°` mượt mà giữa icon `Menu` và `X` trên thiết bị di động.

## 4. Phần chưa thử / Giới hạn ghi nhận trung thực

- **Chưa thử:** Safari trên macOS/iOS thực tế và kiểm tra trình đọc màn hình chuyên dụng (NVDA/VoiceOver).
- **Giới hạn theo thiết kế:** Trang là một khung Hero toàn màn hình không cuộn theo đúng đặc tả; các liên kết điều hướng và nút `Watch Now` / `Learn More` / `Search` / `Profile` là điều khiển trình diễn ở phía client, sẵn sàng để khách hàng gắn trình phát hoặc trang đích thực tế khi triển khai.
