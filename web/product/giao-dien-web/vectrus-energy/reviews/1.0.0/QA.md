# Vectrus Energy (`vectrus-energy`) — Hồ sơ Nghiệm thu & QA (v1.0.0)

- **Ngày kiểm tra:** 2026-10-19
- **Sản phẩm:** Vectrus Energy (`vectrus-energy`) — Scroll Tied Video Section (`t69`).
- **Trạng thái:** Đã hoàn thiện nguồn `source/` (`Vite + React 18 + TypeScript + Tailwind CSS 3 + mp4box ^0.5.2 + lucide-react`), biên dịch bản dựng `source/built/` (`tsc --noEmit && vite build`), đóng gói `vectrus-energy.zip`, hoàn tất kiểm tra tự động + trực quan trên 4 trình duyệt tại 4 kích thước khung nhìn (`1440×900`, `820×1180`, `375×812`, `320×740`), và tích hợp đầy đủ lên cửa hàng (`t69`) kèm ảnh preview WebP và video preview 15 giây.
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1) và `docs/instruction-product.txt`, áp dụng ngoại lệ theo prompt (Vite + React 18 + TypeScript + Tailwind CSS 3 + `mp4box` + `lucide-react`, tải phông chữ `Helvetica Neue ME` từ `db.onlinewebfonts.com`, và tải luồng video MP4 điều khiển theo cuộn từ CloudFront `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4`) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** `web/product/giao-dien-web/vectrus-energy/`, `web/public/demos/vectrus-energy/`, `web/public/previews/vectrus-energy*`, `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/preview-recordings.json`, `web/product/giao-dien-web/tools/dong-goi.mjs`, `web/product/giao-dien-web/tools/quay-preview.mjs` và `web/product/giao-dien-web/reviews/video-previews/vectrus-energy.json`.

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
| **Q01** | Cấu trúc gói & ngoại lệ React/Vite/MP4Box | **PASS (theo ngoại lệ Brief)** | Gói `vectrus-energy.zip` gồm 19 file: mã nguồn Vite + React 18 + TypeScript + Tailwind CSS + `mp4box` + `lucide-react` (`index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `src/App.tsx`, `src/useVideoScrub.ts`, `src/mp4box.d.ts`, `src/main.tsx`, `src/index.css`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`) và bản dựng tĩnh `built/` (từ `dist/`). Loại trừ `node_modules` và `dist`. |
| **Q02** | Không tràn ngang & đường cuộn `500vh` (`320–1440px`) | **PASS** | `horizontalOverflow: false` (`scrollWidth === innerWidth`) và `trackRatio: 5` (`scrollHeight === innerHeight * 5`) tại `320×740`, `375×812`, `820×1180`, `1440×900` trên cả 4 trình duyệt (`checks.json`). |
| **Q03** | Giải mã WebCodecs + `MP4Box` (`useVideoScrub`), 3 phân cảnh tuần tự, đảo màu Navbar & Menu di động | **PASS** | - **WebCodecs + `MP4Box` Frame Bank:** Tải MP4 qua `fetch`, tách mẫu bằng `MP4Box.createFile()`, giải mã qua `VideoDecoder` vào mảng `bank` WebP (`0.82`) kèm bộ đệm `LRU` (`24` `ImageBitmap`) và vẽ lên `<canvas width="1920" height="1080">` (`canvasLive: true` trên Chromium, Edge, Cốc Cốc, Firefox), đồng thời `videoPaused: true` (không bao giờ gọi `play()`).<br>- **3 phân cảnh chữ tuần tự & đảo màu Navbar (`p > 0.55`):** Tại `p = 0`, `sections = [1, 0, 0]`, `navColor = "rgb(29, 48, 69)"` (`#1D3045`); tại `p = 0.45`, `sections = [0, 1, 0]`, `navColor = "rgb(29, 48, 69)"`; tại `p = 0.85`, `sections = [0, 0, 1]`, `navColor = "rgb(255, 255, 255)"` (`#FFFFFF`).<br>- **Menu di động (`#mobile-menu-overlay`):** Tại `375×812`, click `#mobile-menu-trigger` mở menu (`aria-hidden: "false"`, `bodyOverflow: "hidden"`), click `#mobile-menu-close` đóng lại (`aria-hidden: "true"`, `bodyOverflow: ""`). |
| **Q04** | Điều hướng bàn phím & ngữ nghĩa | **PASS** | Hỗ trợ đóng menu di động bằng phím `Escape`; các nút điều khiển là `<button type="button">` có `aria-label` rõ ràng. |
| **Q05** | Landmark HTML & Heading | **PASS** | Có `<header>`, `<nav aria-label="Primary Navigation">`, `<nav aria-label="Mobile Navigation">`, 3 `<section>` có `aria-label` và 1 `<h1>` duy nhất (`Advancing resources for a cleaner future`). |
| **Q06** | Độ tương phản chữ & kiểu chữ | **PASS** | Kiểu chữ `Helvetica Neue ME` màu xanh navy `#1D3045` nổi bật trên các khung hình mây sáng ở Phân cảnh 1–2, và chuyển sang chữ trắng `#FFFFFF` rõ nét trên khung cảnh biển tối ở Phân cảnh 3 mà không dùng lớp phủ màu giả. |
| **Q07** | Tương thích codec video & dự phòng `<video>` | **PASS** | Video MP4 CloudFront (`1920×1080`) vừa hỗ trợ CORS (`Access-Control-Allow-Origin: *`) cho `MP4Box + VideoDecoder`, vừa giữ `<video>` (`readyState: 4`) bên dưới làm lớp dự phòng tức thời. |
| **Q08** | Kiểm tra đa trình duyệt thực tế | **PASS** | Đã chạy kiểm tra tự động và chụp ảnh màn hình trên cả 4 trình duyệt: Chromium, Firefox, Edge, Cốc Cốc. |
| **Q09** | Không lỗi Console / PageError / TypeScript | **PASS** | `tsc --noEmit && vite build` đạt `0` lỗi; `consoleErrors: []` và `pageErrors: []` trên cả 4 trình duyệt (`checks.json`). |
| **Q10** | Tài liệu `CUSTOMISE.md`, `README.md`, `LICENCE.txt` | **PASS** | `CUSTOMISE.md` có đủ 10 bước cài đặt/chỉnh sửa/triển khai, 12 prompt AI chuyên biệt và bảng đối chiếu chuỗi literal khớp chính xác số lần xuất hiện thực tế. |
| **Q11** | Đóng gói `vectrus-energy.zip` chuẩn `/` | **PASS** | `vectrus-energy.zip` (`132,495` bytes, SHA-256 `01b27c86261772888866acf13836233b2da191704a9ffe0cb9d70707943d3e6a`), toàn bộ 19 đường dẫn dùng `/`, giải nén và đối chiếu khớp 100% byte. |
| **Q12** | Đồng bộ cửa hàng (`t69`) & video preview | **PASS** | Đã đăng ký mã `t69` (`vectrus-energy`) trong `template-categories.ts`, `real-templates.ts`, `template-guides.ts`; xuất ảnh preview `vectrus-energy.webp` (`698×524`), `vectrus-energy-tablet.webp` (`698×1004`), `vectrus-energy-mobile.webp` (`698×1511`); quay video preview 15 giây `vectrus-energy.mp4` (`552,317` bytes, `14.966667s`, revision `c70717ae6934`, `errors=0`, `missing=0`). |
| **Q13** | Kiểm tra trực quan ảnh chụp màn hình | **PASS** | Đã xem trực tiếp các ảnh chụp (`chromium-1440.png`, `chromium-1440-s2.png`, `chromium-1440-s3.png`, `chromium-375-menu.png`). |

## 3. Đánh giá Thiết kế (`D01–D08`) & Chuyển động (`T01–T04`)

- **D01–D08:** Bố cục điện ảnh tối giản đặt trực tiếp trên khung cảnh bay xuyên mây và đại dương: Phân cảnh 1 căn trái cân đối, Phân cảnh 2 căn giữa với 3 cấp độ màu `#1D3045` (`100%`, `80%`, `50%`), Phân cảnh 3 căn phải chữ trắng trên vùng biển tối, thanh điều hướng tự đảo màu tại `p > 0.55`.
- **T01–T04:** Vòng lặp `rAF` nội suy mũ (`LERP_TAU = 8`, `SNAP = 0.002`) kết hợp bộ đệm khung hình WebCodecs (`LRU_MAX = 24`) giúp chuyển động tua video theo cuộn mượt không giật cục; các thành phần văn bản trượt hiện theo `Stagger` (`0.8s cubic-bezier(0.16, 1, 0.3, 1)`).

## 4. Phần chưa thử / Giới hạn ghi nhận trung thực

- **Chưa thử:** Safari trên macOS/iOS thực tế và kiểm tra trình đọc màn hình chuyên dụng (NVDA/VoiceOver).
- **Giới hạn theo thiết kế:** Trang là trải nghiệm một trang `500vh` theo đúng đặc tả, các liên kết điều hướng và nút `Contact Nordvik` cuộn mượt giữa các phân cảnh và sẵn sàng để khách hàng gắn đường dẫn thực tế khi triển khai.
