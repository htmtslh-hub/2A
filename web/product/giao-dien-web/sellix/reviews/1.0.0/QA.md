# Sellix (`sellix`) — Hồ sơ Nghiệm thu & QA (v1.0.0)

- **Ngày kiểm tra:** 2026-10-19
- **Sản phẩm:** Sellix (`sellix`) — Cross-border finance (`t76`).
- **Trạng thái:** Đã hoàn thiện nguồn `source/` (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`), đóng gói `sellix.zip`, hoàn tất kiểm tra tự động + trực quan trên 4 trình duyệt tại 5 kích thước khung nhìn (`1440×900`, `1280×800`, `820×1180`, `375×812`, `320×740`) cùng chế độ `prefers-reduced-motion: reduce`, và tích hợp đầy đủ lên cửa hàng (`t76`) kèm ảnh preview WebP và video preview 15 giây.
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1) và `docs/instruction-product.txt`, áp dụng ngoại lệ theo prompt (một file `index.html` tự chứa với 1 khối `<style>` trong `<head>` và 3 khối `<script>` inline theo đúng thứ tự, nạp font `Plus Jakarta Sans` bí danh `'PJS'` `font-display: block` từ Google Fonts và video/poster địa cầu ma trận điểm tím từ CloudFront) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** `web/product/giao-dien-web/sellix/`, `web/public/demos/sellix/`, `web/public/previews/sellix*`, `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/preview-recordings.json`, `web/product/giao-dien-web/tools/dong-goi.mjs`, `web/product/giao-dien-web/tools/quay-preview.mjs` và `web/product/giao-dien-web/reviews/video-previews/sellix.json`.

## 1. Môi trường & Trình duyệt đã chạy thật

Chạy tự động qua HTTP cục bộ bằng `reviews/1.0.0/check.cjs` (kết quả lưu tại `reviews/1.0.0/checks.json`):
- **Playwright Chromium:** `153.0.8010.12`
- **Playwright Firefox:** `155.0`
- **Microsoft Edge:** `155.0.4283.62`
- **Cốc Cốc Browser:** `152.0.7977.124`
- **Kích thước viewport đã kiểm tra trên cả 4 trình duyệt:** `1440×900`, `1280×800` (reference render), `820×1180`, `375×812`, `320×740`.

## 2. Kết quả Checklist Chất lượng (`Q01–Q13`)

| Mã | Hạng mục | Kết quả | Bằng chứng xác minh |
|---|---|---|---|
| **Q01** | Cấu trúc gói & ngoại lệ 1 file `index.html` tự chứa | **PASS (theo ngoại lệ Brief)** | Gói `sellix.zip` gồm 4 file: `index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`. Toàn bộ CSS đặt trong 1 thẻ `<style>` ở `<head>` và toàn bộ JS đặt trong 3 thẻ `<script>` inline theo đúng thứ tự yêu cầu. |
| **Q02** | Không tràn ngang & khóa cuộn toàn khung nhìn (`320–1440px`) | **PASS** | `horizontalOverflow: false` (`scrollWidth === clientWidth`), `htmlOverflow: "hidden"`, `bodyOverflow: "hidden"`, và từ `"Cross-border"` luôn nằm trọn trên 1 dòng không bị ngắt ở dấu gạch nối tại mọi kích thước xuống tới `320×740` trên cả 4 trình duyệt (`checks.json`). |
| **Q03** | Cross-fade video kép (`#bgVideoA` / `#bgVideoB`), chuỗi hoạt ảnh vào trang tự tháo gỡ & menu di động | **PASS** | - **Cross-fade video kép (`FADE = 0.9`):** Khi video đang phát tiến vào `duration - 0.9s`, luồng thứ hai đặt `currentTime = 0`, gọi `play()` và hoán đổi `.is-active` (`dualVideoCrossfadeSwapped: true` trên cả 4 trình duyệt).<br>- **Chuỗi hoạt ảnh vào trang (`html.anim` -> `html.anim.go`):** Chờ `document.fonts.ready` (trần `900ms`), chạy 4 nhóm chuyển động (`lineRise`, `logoIn`/`liftIn`, `subIn`/`subInFlat`, `pillIn`) và tự tháo gỡ cả `anim` lẫn `go` khi `.btn-ghost` kết thúc (`animDetached: true`).<br>- **Menu di động (`<= 1160px`):** Tại `820×1180`, click `#burger` mở `#menu.open` (`aria-expanded="true"`, `aria-label="Close menu"`); nhấn `Escape` đóng `#menu` (`aria-expanded="false"`, `aria-label="Open menu"`) và trả tiêu điểm (`focus`) về `#burger`. |
| **Q04** | Điều hướng bàn phím & `prefers-reduced-motion: reduce` | **PASS** | Vòng focus `:focus-visible` (`outline: 2px solid #a78bfa; outline-offset: 3px; border-radius: 99px`); khi bật `prefers-reduced-motion: reduce`, trang không gắn `html.anim`/`html.go`, dừng cả 2 video và giữ `#bgVideoA.currentTime = 0` (`checks.json`). |
| **Q05** | Landmark HTML & Heading | **PASS** | Có `<main class="hero">`, `<div class="bg" role="img" aria-label="...">`, `<header class="nav">`, `<nav class="nav-links" aria-label="Primary">`, `<nav class="menu" id="menu" aria-label="Mobile">` và 1 `<h1>` duy nhất (`Cross-border` / `finance`). |
| **Q06** | Độ tương phản chữ & kiểu chữ | **PASS** | Font `Plus Jakarta Sans` (`'PJS'`, `font-display: block`) sắc nét trên nền đen `#000` và vầng sáng tím của địa cầu ma trận điểm; nút chính `#fdfdfd` chữ `#050505` và nút phụ kính mờ `rgba(0,0,0,.78)` chữ `#d9d9d9`. |
| **Q07** | Tương thích codec video & ảnh poster | **PASS** | Hai thẻ `<video>` (`#bgVideoA`, `#bgVideoB`) đều khai báo `poster` WebP và `<source type="video/mp4">` từ CloudFront (`readyState >= 2` trên cả 4 trình duyệt). |
| **Q08** | Kiểm tra đa trình duyệt thực tế | **PASS** | Đã chạy kiểm tra tự động và chụp ảnh màn hình trên cả 4 trình duyệt: Chromium, Firefox, Edge, Cốc Cốc. |
| **Q09** | Không lỗi Console / PageError / TypeScript | **PASS** | `consoleErrors: 0` và `pageErrors: 0` trên cả 4 trình duyệt (`checks.json`); `npx tsc --noEmit` tại `web/` đạt `0` lỗi. |
| **Q10** | Tài liệu `CUSTOMISE.md`, `README.md`, `LICENCE.txt` | **PASS** | `CUSTOMISE.md` có đủ 10 bước tùy biến, 12 prompt AI sao chép dùng ngay và bảng đối chiếu chuỗi literal đã đếm chính xác trong `index.html`. |
| **Q11** | Đóng gói `sellix.zip` chuẩn `/` (< 20 KB) | **PASS** | `sellix.zip` (`11,787` bytes < `20,480` bytes W06, SHA-256 `7c08cf0ab335838bdbb51fed80f65ef49d4cbc061df4f9af1d6395367760308b`), toàn bộ 4 đường dẫn dùng `/`, giải nén và đối chiếu khớp 100% byte. |
| **Q12** | Đồng bộ cửa hàng (`t76`) & video preview | **PASS** | Đã đăng ký mã `t76` (`sellix`) trong `template-categories.ts`, `real-templates.ts`, `template-guides.ts`; xuất ảnh preview `sellix.webp` (`698×524`), `sellix-tablet.webp` (`698×1004`), `sellix-mobile.webp` (`698×1511`); quay video preview 15 giây `sellix.mp4` (`1,573,910` bytes, `14.966667s`, revision `734f374f8745`, `errors=0`, `missing=0`). |
| **Q13** | Kiểm tra trực quan ảnh chụp màn hình | **PASS** | Đã xem trực tiếp các ảnh chụp (`sellix.webp`, `chromium-1280.png`, `chromium-820-menu.png`, `chromium-320.png`). |

## 3. Đánh giá Thiết kế (`D01–D08`) & Chuyển động (`T01–T04`)

- **D01–D08:** Bố cục tái tạo chính xác bản dựng tham chiếu `1280×800` bằng đơn vị tỷ lệ `--u` và độ lệch quang học `--dx: 8.5`, `--dy: 13.1`; khung nền `.bg` (`1280:800` bleed box) với `object-position: 51% 8%` đặt vòm sáng địa cầu tím ôm trọn khối tiêu đề `Cross-border / finance`.
- **T01–T04:** Chuỗi hoạt ảnh vào trang `1.67s` (`--e-reveal: cubic-bezier(.16, 1, .3, 1)`, `--e-soft: cubic-bezier(.25, .8, .3, 1)`) tự tháo gỡ hoàn toàn sau khi kết thúc; hai luồng `<video>` cross-fade `0.9s` tuyến tính giúp vòng lặp 10 giây liền mạch không giật hình.

## 4. Phần chưa thử / Giới hạn ghi nhận trung thực

- **Chưa thử:** Safari trên macOS/iOS thực tế và kiểm tra trình đọc màn hình chuyên dụng (NVDA/VoiceOver).
- **Giới hạn theo thiết kế:** Trang là hero một khung nhìn độc lập theo đúng đặc tả, các liên kết điều hướng và CTA là neo tĩnh (`#products`, `#pricing`, `#get-started`, `#contact-sales`, `#login`) sẵn sàng để khách hàng gắn đường dẫn thực tế khi triển khai.
