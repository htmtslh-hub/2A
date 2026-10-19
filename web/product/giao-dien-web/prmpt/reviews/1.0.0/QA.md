# prmpt (`prmpt`) — Hồ sơ Nghiệm thu & QA (v1.0.0)

- **Ngày kiểm tra:** 2026-10-19
- **Sản phẩm:** prmpt (`prmpt`) — Archive Collection "PROMPT" (`t71`).
- **Trạng thái:** Đã hoàn thiện nguồn `source/` (`React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + GSAP 3.15 + @gsap/react + Motion 12`), biên dịch bản dựng `source/built/` (`tsc --noEmit && vite build`), đóng gói `prmpt.zip`, hoàn tất kiểm tra tự động + trực quan trên 4 trình duyệt tại 4 kích thước khung nhìn (`1440×900`, `820×1180`, `375×812`, `320×740`), và tích hợp đầy đủ lên cửa hàng (`t71`) kèm ảnh preview WebP và video preview 15 giây.
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1) và `docs/instruction-product.txt`, áp dụng ngoại lệ theo prompt (React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + GSAP 3.15 + `@gsap/react` + Motion 12 `motion/react`, tải phông chữ `Inter Tight` 500 từ Google Fonts, hai luồng video MP4 từ CloudFront và 10 ảnh sản phẩm từ `images.higgs.ai` / CloudFront) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** `web/product/giao-dien-web/prmpt/`, `web/public/demos/prmpt/`, `web/public/previews/prmpt*`, `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/preview-recordings.json`, `web/tools/check-memberships.cjs`, `web/product/giao-dien-web/tools/dong-goi.mjs`, `web/product/giao-dien-web/tools/quay-preview.mjs` và `web/product/giao-dien-web/reviews/video-previews/prmpt.json`.

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
| **Q01** | Cấu trúc gói & ngoại lệ React 19 / Vite 6 / Tailwind v4 / GSAP / Motion | **PASS (theo ngoại lệ Brief)** | Gói `prmpt.zip` gồm 15 file: mã nguồn React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + GSAP 3.15 + Motion 12 (`index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`) và bản dựng tĩnh `built/` (từ `dist/`). Loại trừ `node_modules` và `dist`. |
| **Q02** | Không tràn ngang & chiều cao cuộn động (`320–1440px`) | **PASS** | `horizontalOverflow: false` (`scrollWidth === innerWidth`) tại `320×740` (`scrollHeight: 3456`), `375×812` (`scrollHeight: 3918`), `820×1180` (`scrollHeight: 5630`), `1440×900` (`scrollHeight: 5940`) trên cả 4 trình duyệt (`checks.json`). |
| **Q03** | Tua 2 video theo chuột X (kèm vùng đệm `±50px`), lưới 10 thẻ ảnh GSAP ScrollTrigger & màn kết Outro | **PASS** | - **Hero Dual-Video Scrubbing:** Trên desktop (`1440×900`), di chuột sang trái tâm (`x = 220`) kích hoạt `#right-video` (`leftDisplay: "none"`, `rightDisplay: "block"`, `rightTime: 3.33`); di chuột vào vùng đệm `±50px` ở tâm (`x = 720`) giữ nguyên `#right-video` và đưa `currentTime = 0`; di chuột sang phải tâm (`x = 1220`) kích hoạt `#left-video` (`leftDisplay: "block"`, `rightDisplay: "none"`, `leftTime: 3.33`).<br>- **Gallery Phase (`#black-panel` + 10 `.bp-card`):** Khi cuộn qua `100vh`, `#black-panel` trượt lên (`panelTransform: "translateY(0px)"`), `#main-canvas` ẩn (`canvasVisibility: "hidden"`), `#circle-symbol` đổi ký hiệu ngẫu nhiên trong `['8', '$', '^^', '%', '/']` (`80ms` throttle), và 10 thẻ `.bp-card` phóng to lên `maxCardScale: 1` khi vào khung nhìn và thu về `0.5` khi thoát đỉnh.<br>- **Outro Reveal:** Ở cuối đường cuộn, `#outro-overlay` hiện rõ (`overlayOpacity: 1`), `#outro-info` dịch chuyển lên (`infoTransform: "translateY(-166px)"`), nút `#outro-buy` (`"view"`) phóng lên (`buyTransform: "scale(1)"`), và `#outro-footer` hiện rõ (`footerOpacity: 1`). |
| **Q04** | Điều hướng bàn phím & ngữ nghĩa | **PASS** | Các thành phần tương tác (`ABOUT`, hamburger menu, `[ CART ]`, `#outro-buy`, `PRIVACY POLICY`) là các phần tử `<button type="button">` hoặc `<a>` có `aria-label` rõ ràng. |
| **Q05** | Landmark HTML & cấu trúc vùng | **PASS** | Có `<nav id="hero-nav">`, `<main id="main-canvas">`, `<section id="black-panel">`, `<footer id="outro-footer">` và phân cấp thông tin sản phẩm rõ ràng trong `#outro-info`. |
| **Q06** | Độ tương phản chữ & `mix-blend-mode: exclusion` | **PASS** | Toàn bộ lớp phủ cố định (`#custom-cursor`, `#hero-logo`, `#hero-caption`, `#hero-nav`, `#outro-info`) sử dụng chữ trắng kết hợp `mix-blend-mode: exclusion`, tự động đảo sang màu đen sắc nét trên nền trắng (Hero & Outro) và đảo sang màu trắng nổi bật trên nền đen (`#black-panel`). |
| **Q07** | Tương thích codec video & tải trước 10 ảnh sản phẩm | **PASS** | Cả hai video MP4 CloudFront đều đạt `readyState >= 2` và cả 10 ảnh `.bp-card img` đều tải hoàn tất (`complete && naturalWidth > 0`) trên cả 4 trình duyệt Chromium, Firefox, Edge và Cốc Cốc. |
| **Q08** | Kiểm tra đa trình duyệt thực tế | **PASS** | Đã chạy kiểm tra tự động và chụp ảnh màn hình trên cả 4 trình duyệt: Chromium, Firefox, Edge, Cốc Cốc. |
| **Q09** | Không lỗi Console / PageError / TypeScript | **PASS** | `tsc --noEmit && vite build` đạt `0` lỗi; `consoleErrors: []` và `pageErrors: []` trên cả 4 trình duyệt ở mọi kích thước khung nhìn (`checks.json`). |
| **Q10** | Tài liệu `CUSTOMISE.md`, `README.md`, `LICENCE.txt` | **PASS** | `CUSTOMISE.md` có đủ 10 bước cài đặt/chỉnh sửa/triển khai, 12 prompt AI chuyên biệt và bảng đối chiếu chuỗi literal khớp chính xác số lần xuất hiện thực tế. |
| **Q11** | Đóng gói `prmpt.zip` chuẩn `/` | **PASS** | `prmpt.zip` (`202,786` bytes, SHA-256 `1113f80676e8a15acb34e087c5c8ca13a7931eb6e0ed8d5a812e8ff984d19612`), toàn bộ 15 đường dẫn dùng `/`, giải nén và đối chiếu khớp 100% byte. |
| **Q12** | Đồng bộ cửa hàng (`t71`) & video preview | **PASS** | Đã đăng ký mã `t71` (`prmpt`) trong `template-categories.ts`, `real-templates.ts`, `template-guides.ts`, `check-memberships.cjs`; xuất ảnh preview `prmpt.webp` (`698×524`), `prmpt-tablet.webp` (`698×1004`), `prmpt-mobile.webp` (`698×1511`); quay video preview 15 giây `prmpt.mp4` (`284,187` bytes, `14.966667s`, revision `6a6b8a479000`, `errors=0`, `missing=0`). |
| **Q13** | Kiểm tra trực quan ảnh chụp màn hình | **PASS** | Đã xem trực tiếp các ảnh chụp (`chromium-1440.png`, `chromium-1440-gallery.png`, `chromium-1440-outro.png`, `chromium-375.png` và filmstrip `prmpt-contact.jpg`). |

## 3. Đánh giá Thiết kế (`D01–D08`) & Chuyển động (`T01–T04`)

- **D01–D08:** Bố cục brutalist-editorial tối giản: wordmark SVG `prmpt®` lớn ở góc trái trên (`355px` desktop / `266px` tablet / `124px` mobile), đoạn mô tả kỹ thuật bên dưới, cụm thông tin bộ sưu tập `ARCHIVE COLLECTION "PROMPT"` + `$97,33` kèm ký hiệu tròn ngẫu nhiên ở góc phải dưới, và hệ lớp phủ `mix-blend-mode: exclusion` tự đảo màu mượt qua ba pha trắng → đen → trắng.
- **T01–T04:** Hoạt ảnh mở màn bằng Motion (`[0.25, 0.1, 0.25, 1]`, delay `0s` / `0.1s` / `0.15s` / `0.2s` / `0.3s`), tua video mượt có kiểm tra `!video.seeking` và vùng đệm `±50px` ở giữa, cùng vòng lặp `rAF` + GSAP ScrollTrigger đồng bộ 10 thẻ ảnh `.bp-card` và màn kết Outro.

## 4. Phần chưa thử / Giới hạn ghi nhận trung thực

- **Chưa thử:** Safari trên macOS/iOS thực tế và kiểm tra trình đọc màn hình chuyên dụng (NVDA/VoiceOver).
- **Giới hạn theo thiết kế:** Các nút điều hướng (`ABOUT`, menu hamburger, `[ CART ]`), nút CTA `view` và liên kết `PRIVACY POLICY` là các điểm neo trình diễn ở phía client theo đúng đặc tả, sẵn sàng để khách hàng gắn đường dẫn hoặc giỏ hàng thực tế khi triển khai.
