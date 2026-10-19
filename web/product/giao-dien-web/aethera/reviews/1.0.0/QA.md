# Aethera (`aethera`) — Hồ sơ Nghiệm thu & QA (v1.0.0)

- **Ngày kiểm tra:** 2026-10-19
- **Sản phẩm:** Aethera (`aethera`) — Cinematic Hero Section with Looping Video Background (`t66`).
- **Trạng thái:** Đã hoàn thiện nguồn `source/`, biên dịch bản dựng `source/built/` (`tsc --noEmit && vite build`), đóng gói `aethera.zip`, hoàn tất kiểm tra tự động + trực quan trên 4 trình duyệt, và tích hợp đầy đủ lên cửa hàng (`t66`) kèm ảnh preview WebP và video preview 15 giây.
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1) và `docs/instruction-product.txt`, áp dụng ngoại lệ theo prompt (React 18 + TypeScript + Vite + Tailwind CSS, tải font `Instrument Serif` + `Inter` từ Google Fonts trong `src/styles/fonts.css`, hoạt ảnh `fade-rise` trong `src/styles/theme.css`, và video nền lặp mượt từ CloudFront) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** `web/product/giao-dien-web/aethera/`, `web/public/demos/aethera/`, `web/public/previews/aethera*`, `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/preview-recordings.json`, `web/product/giao-dien-web/tools/dong-goi.mjs`, `web/product/giao-dien-web/tools/quay-preview.mjs` và `web/product/giao-dien-web/reviews/video-previews/aethera.json`.

## 1. Môi trường & Trình duyệt đã chạy thật

Chạy tự động qua HTTP cục bộ bằng `reviews/1.0.0/check.cjs` (kết quả lưu tại `reviews/1.0.0/checks.json`, bật cả cấu hình `reducedMotion: 'reduce'` để kiểm chứng hiệu ứng vẫn hoạt động mặc định):
- **Playwright Chromium:** `153.0.8010.12`
- **Playwright Firefox:** `155.0`
- **Microsoft Edge:** `155.0.4283.62`
- **Cốc Cốc Browser:** `152.0.7977.124`
- **Kích thước viewport đã kiểm tra trên cả 4 trình duyệt:** `1440×900`, `820×1180`, `375×812`, `320×740`.

## 2. Kết quả Checklist Chất lượng (`Q01–Q13`)

| Mã | Hạng mục | Kết quả | Bằng chứng xác minh |
|---|---|---|---|
| **Q01** | Cấu trúc gói & ngoại lệ React/Vite | **PASS (theo ngoại lệ Brief)** | Gói `aethera.zip` gồm 19 file: mã nguồn React 18 + TypeScript + Vite + Tailwind CSS (`index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/styles/fonts.css`, `src/styles/theme.css`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`) và bản dựng tĩnh `built/` (từ `dist/`). Loại trừ `node_modules` và `dist`. |
| **Q02** | Không tràn ngang ở mọi viewport (`320–1440px`) | **PASS** | `horizontalOverflow: false` (`scrollWidth === innerWidth`) tại `320×740`, `375×812`, `820×1180`, `1440×900` trên cả 4 trình duyệt (`checks.json`). |
| **Q03** | Tương tác: Video fade-loop (`requestAnimationFrame`), `fade-rise` animations, Inquiry Modal | **PASS** | - **Video fade-in / fade-out (`requestAnimationFrame`):** Tại `currentTime = 0.25s`, `startMidFadeOpacity === 0.5`; tại `duration - 0.25s`, `endMidFadeOpacity === 0.5`; khi sự kiện `ended` phát sinh, `endedImmediateOpacity === 0` và sau `100ms` tự động đưa `currentTime = 0` và `play()` lại.<br>- **Entrance animations (`fade-rise`, `0.2s`, `0.4s`):** Cả 3 phần tử (`h1`, `p`, `button`) đạt `opacity: "1"` trên mọi trình duyệt kể cả khi bật `prefers-reduced-motion: reduce`.<br>- **Inquiry Modal (`Begin Journey` / `Reach Us`):** Click nút `"Begin Journey"` mở hộp thoại kính mờ `[role="dialog"]`, điền form nhận thông báo `"Your note has been received."`, nhấn `Escape` đóng hộp thoại (`modalClosedOnEscape: true`). |
| **Q04** | Điều hướng bàn phím & ngữ nghĩa | **PASS** | Hộp thoại hỗ trợ `role="dialog"`, `aria-modal="true"`, `aria-labelledby="journey-dialog-title"`, đóng bằng phím `Escape` hoặc click nền mờ; các nút CTA là `<button type="button">` có thể focus bằng `Tab`. |
| **Q05** | Landmark HTML & Heading | **PASS** | Có `<header>`, `<nav aria-label="Primary Navigation">`, `<main id="home">`, và 1 `<h1>` duy nhất (`Beyond silence, we build the eternal.`). |
| **Q06** | Độ tương phản chữ & kiểu chữ | **PASS** | Tiêu đề `Instrument Serif` (`lineHeight: 0.95`, `letterSpacing: "-2.46px"`) màu `#000000` kết hợp hai cụm chữ in nghiêng `<em class="italic text-[#6F6F6F]">` (`"silence,"` và `"the eternal."`); đoạn mô tả và menu phụ màu `#6F6F6F`; nút `"Begin Journey"` nền `#000000` chữ `#FFFFFF` nổi bật trên nền trắng và lớp phủ gradient của video. |
| **Q07** | Tương thích codec video | **PASS** | Video nền CloudFront (`1928×1072`, `14.042s`) mã hóa chuẩn `H.264` (`yuv420p`) giải mã trực tiếp trên cả Chromium, Firefox, Edge và Cốc Cốc. |
| **Q08** | Kiểm tra đa trình duyệt thực tế | **PASS** | Đã chạy kiểm tra tự động và chụp ảnh màn hình trên cả 4 trình duyệt: Chromium, Firefox, Edge, Cốc Cốc. |
| **Q09** | Không lỗi Console / PageError / TypeScript | **PASS** | `tsc --noEmit && vite build` đạt `0` lỗi; `consoleErrors: []` và `pageErrors: []` trên cả 4 trình duyệt (`checks.json`). |
| **Q10** | Tài liệu `CUSTOMISE.md`, `README.md`, `LICENCE.txt` | **PASS** | `CUSTOMISE.md` có đủ 10 bước cài đặt/chỉnh sửa/triển khai, 12 prompt AI chuyên biệt và bảng đối chiếu chuỗi literal khớp số lần xuất hiện thực tế. |
| **Q11** | Đóng gói `aethera.zip` chuẩn `/` | **PASS** | `aethera.zip` (`89,056` bytes, SHA-256 `0da3d4a2ba06a67a8f21221756fd22aa728f4704e7c95ba7decb93195cae6b93`), toàn bộ 19 đường dẫn dùng `/`, giải nén và đối chiếu khớp 100% byte. |
| **Q12** | Đồng bộ cửa hàng (`t66`) & video preview | **PASS** | Đã đăng ký mã `t66` (`aethera`) trong `template-categories.ts`, `real-templates.ts`, `template-guides.ts`; xuất ảnh preview `aethera.webp` (`698×524`), `aethera-tablet.webp` (`698×1004`), `aethera-mobile.webp` (`698×1511`); quay video preview 15 giây `aethera.mp4` (`628,197` bytes, `14.966667s`, revision `863047d06055`, `errors=0`, `missing=0`). |
| **Q13** | Kiểm tra trực quan ảnh chụp màn hình | **PASS** | Đã xem trực tiếp các ảnh chụp (`chromium-1440.png`, `chromium-820.png`, `chromium-375.png`, `chromium-320.png`, `chromium-modal.png`, `firefox-1440.png`, `edge-1440.png`, `coccoc-1440.png`). |

## 3. Đánh giá Thiết kế (`D01–D08`) & Chuyển động (`T01–T04`)

- **D01–D08:** Bố cục đối xứng biên tập thanh thoát: thanh điều hướng rộng `max-w-7xl` với logo `"Aethera®"` (`®` superscript), khối tiêu đề `Instrument Serif` cỡ lớn (`text-5xl sm:text-7xl md:text-8xl`) đặt phía trên khung cảnh thung lũng video (`top: 300px`) hòa vào nền trắng nhờ lớp `bg-gradient-to-b from-background via-transparent to-background`.
- **T01–T04:** Ba nhịp `fade-rise` (`0s`, `0.2s`, `0.4s`, `0.8s ease-out`) dẫn mắt từ tiêu đề xuống đoạn mô tả rồi tới nút `"Begin Journey"`, kết hợp vòng lặp `requestAnimationFrame` làm mờ mượt `0.5s` đầu/cuối video và nghỉ `100ms` khi kết thúc vòng phát.

## 4. Phần chưa thử / Giới hạn ghi nhận trung thực

- **Chưa thử:** Safari trên macOS/iOS thực tế và kiểm tra trình đọc màn hình chuyên dụng (NVDA/VoiceOver).
- **Giới hạn theo thiết kế:** Trang là hero một màn hình theo đúng đặc tả, các mục menu và hộp thoại đăng ký là giao diện mẫu ở phía client để khách hàng nối vào điểm cuối thực tế khi triển khai.
