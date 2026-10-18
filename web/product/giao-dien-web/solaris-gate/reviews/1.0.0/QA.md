# Solaris Gate 1.0.0 — Báo cáo QA (18/10/2026)

- **Sản phẩm:** Solaris Gate (`solaris-gate`) — đổi tên từ đặc tả gốc `"Planet Jumping"` / `"Ubernatural"` theo yêu cầu của chủ sản phẩm.
- **Trạng thái:** Đã hoàn thiện nguồn `source/`, đóng gói `solaris-gate.zip` qua `dong-goi.mjs --ngoai-le`, đồng bộ demo công khai, tạo poster WebP + video preview 15 giây và đăng ký lên cửa hàng (`t61`).
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1), `docs/instruction-product.txt` và `docs/video-preview-workflow.md`, áp dụng ngoại lệ theo prompt (file đơn `index.html` inline `<style>` và `<script>`, tải 6 URL media từ CloudFront) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** Thư mục sản phẩm `web/product/giao-dien-web/solaris-gate/`, đóng gói/quay preview (`dong-goi.mjs`, `quay-preview.mjs`), tài nguyên cửa hàng (`web/public/demos/solaris-gate/`, `web/public/previews/solaris-gate*`, `preview-recordings.json`) và đăng ký danh mục (`template-categories.ts`, `real-templates.ts`, `template-guides.ts`). Không chạm vào sản phẩm khác hay cơ sở dữ liệu.

---

## 1. Môi trường & bằng chứng kiểm thử

- **Hệ điều hành:** Windows (Playwright tự động qua HTTP cục bộ `http://127.0.0.1:<port>/index.html`).
- **Trình duyệt đã chạy thực tế (`checks.json`):**
  1. **Playwright Chromium** `153.0.8010.12` — 0 console/page error.
  2. **Playwright Mozilla Firefox** `155.0` — 0 console/page error.
  3. **Microsoft Edge** `155.0.4283.62` — 0 console/page error.
  4. **Cốc Cốc** `152.0.7977.124` — 0 console/page error.
- **Viewport đã đo và chụp ảnh trên cả 4 trình duyệt:** `1440×900`, `820×1180`, `768×1024`, `375×812`, `320×740`.
- **Ảnh chụp đã kiểm tra trực quan:** `chromium-1440.png`, `chromium-820.png`, `chromium-375.png`, `chromium-earth-1440.png`, `chromium-venus-1440.png` (cùng bộ ảnh tương ứng của `firefox-*`, `edge-*`, `coccoc-*`).
- **Giới hạn trung thực:** Đây là kiểm thử trình duyệt desktop/emulation qua Playwright trên Windows; **CHƯA THỬ** trên Safari macOS/iOS thật hoặc thiết bị di động vật lý.

---

## 2. Bảng đánh giá Q01–Q13

| Mã | Trạng thái | Bằng chứng & giới hạn thực tế |
|---|---|---|
| **Q01** | **PASS (theo ngoại lệ brief)** | `source/index.html` tự chứa toàn bộ HTML + `<style>` + `<script>`, không dùng thư viện JS/CSS ngoài, không qua bước build. Kèm đủ `README.md`, `CUSTOMISE.md`, `LICENCE.txt`. |
| **Q02** | **PASS** | Đo thực tế trên 4 trình duyệt × 5 viewport (`1440×900`, `820×1180`, `768×1024`, `375×812`, `320×740`): `scrollWidth === clientWidth`, `scrollHeight === clientHeight`, `overflowX: false`, `overflowY: false`. Đã tinh chỉnh `--tx` (`-32px` desktop, `-12px` `<=900px`, `-4px` `<=640px`) để chữ `MARS` không bị cắt mép trái trên mobile (`titleLeft = 14px` ở `375px` và `320px`). |
| **Q03** | **PASS phần chức năng / Demo rõ ràng** | Nút `#portal` hoạt động đầy đủ qua chuỗi `Mars -> Earth -> Venus` và khóa an toàn tại trạng thái cuối `Venus` (`afterTerminalClick.planet === "venus"`, `isTransitioning === false`). Các liên kết `.nav a` (`#about`, `#explore`, `#planets`) và nút `button.menu` là điều khiển demo theo đúng cấu trúc prompt, đã ghi rõ trong `README.md` và `CUSTOMISE.md`. |
| **Q04** | **PASS một phần / NOT TESTED đầy đủ** | `#portal`, `.nav a`, `.menu` là thẻ ngữ nghĩa `<button>` / `<a>` có thể nhận focus bàn phím; con trỏ tùy chỉnh `.custom-cursor` chỉ kích hoạt với `pointerType === 'mouse'` và hiển thị nhãn `Enter` khi hover `#portal`. Chưa rà soát toàn bộ chu trình `Tab`/`Shift+Tab` và tỷ lệ tương phản viền focus trên mọi nền video. |
| **Q05** | **PASS** | Có `<html lang="en">`, `<meta charset="utf-8">`, `<meta name="viewport">`, `<title>`, `<meta name="description">`, OpenGraph tags, đúng 1 thẻ `<h1>` (`#planet-title`), danh sách `<dl id="facts">` (`<dt>`/`<dd>`), `aria-live="polite"` cho bộ đếm và thông tin hành tinh, `aria-label` động `Travel to ${state.next}` trên `#portal`, và `alt="Solaris Gate"` trên `#floating-logo`. |
| **Q06** | **PASS một phần** | Chữ `#fff` đặt trên nền tối `#090807`/`#0a0908` và lớp phủ `.shade` (`linear-gradient(to bottom, transparent 52%, rgba(0,0,0,.88) 100%)`). Chưa đo tự động tỷ lệ tương phản trên từng frame video động. |
| **Q07** | **PASS một phần** | Có `@media (prefers-reduced-motion: reduce)` rút ngắn `transition-duration: .01ms !important` và giữ `.portal { transform: none !important }`. Có timeout bảo vệ trong `runPreloader()`, `waitForPortalMediaLoadable()` và `travel()` khi video HEVC không giải mã được hoặc mạng chậm. **NOT TESTED:** chế độ offline hoàn toàn (do media nạp từ CloudFront) và zoom 200%. |
| **Q08** | **PASS phạm vi đã thử** | Đã chạy thực tế trên Chromium `153.0.8010.12`, Firefox `155.0`, Microsoft Edge `155.0.4283.62`, và Cốc Cốc `152.0.7977.124`. **NOT TESTED:** Safari (macOS/iOS) và điện thoại/tablet vật lý. |
| **Q09** | **PASS** | `0` lỗi `console.error` và `0` lỗi `pageerror` trên toàn bộ 20 lượt kiểm viewport và 4 lượt kiểm luồng tương tác (`Mars -> Earth -> Venus`). Ghi chú kỹ thuật: 3/4 video từ CloudFront (`MARS_BG`, `TO_VENUS`, `TO_MARS`) dùng codec `hevc` (`hvc1` 10-bit) và `TO_EARTH` dùng `h264` (`avc1`); trên engine không có HEVC decoder, canvas tự động vẽ nền dự phòng `#030303` và giải phóng khóa chuyển cảnh đúng hạn mà không văng lỗi. |
| **Q10** | **PASS tài liệu / CHỜ KIỂM TRA bản quyền media** | Đã cung cấp đầy đủ `source/README.md`, `source/CUSTOMISE.md` (bảng Editing Map đếm chính xác literal trong `index.html`, 10 bước, 12 AI prompt), và `source/LICENCE.txt`. Các URL CloudFront được giữ nguyên theo prompt người dùng; bản quyền phân phối thương mại của media/font mẫu cần chủ sản phẩm xác nhận trước khi bán. |
| **Q11** | **PASS** | `solaris-gate.zip` đóng gói bằng `dong-goi.mjs solaris-gate --ngoai-le` (`19,608` bytes < ngưỡng W06 `20,480` bytes, SHA-256 `ad4ccd7afb02b059a76c29df937599d0ad791d23a73026dbf473f7286a74ebdf`) gồm đúng 4 entry dùng dấu `/`: `solaris-gate/CUSTOMISE.md`, `solaris-gate/index.html`, `solaris-gate/LICENCE.txt`, `solaris-gate/README.md`. Đã đọc lại và đối chiếu khớp 100% từng byte với `source/`. |
| **Q12** | **PASS** | Đã đồng bộ `web/public/demos/solaris-gate/index.html`, tạo 3 poster WebP (`solaris-gate.webp` `698×524`, `solaris-gate-tablet.webp` `698×1004`, `solaris-gate-mobile.webp` `698×1511`), quay video hoạt động 15 giây (`web/public/previews/solaris-gate.mp4`) bằng `quay-preview.mjs`, đăng ký `t61` trong `real-templates.ts` và vượt qua `npm --prefix web run previews:check` + `npm --prefix web run typecheck`. |
| **Q13** | **PASS** | Trải nghiệm không gian điện ảnh nhất quán: preloader đếm `0% -> 100%`, logo thu về góc trái trên, cổng vòm 3D nghiêng theo chuột với phép chiếu phối cảnh `850 / (850 + z)`, tiêu đề hành tinh khổ lớn và bảng thông số 4 hàng xuất hiện theo nhịp staggered. |

---

## 3. Đánh giá thiết kế D01–D08

- **D01 (Thông điệp & cấu trúc thông tin): PASS** — Hiển thị rõ hành tinh hiện tại (`MARS` / `EARTH` / `VENUS`), điểm đến tiếp theo (`Next: [03] Earth`, `[02] Venus`, `[06] Mercury`), danh sách 8 hành tinh bên trái và 4 thông số khoa học (`Distance`, `Year`, `Temperature`, `Atmosphere`).
- **D02 (Điểm nhấn thị giác): PASS** — Cổng không gian 3D (`#portal-canvas`) đặt tại tâm màn hình kết hợp chữ hiển thị cỡ lớn (`clamp(128px, 21.8vw, 314px)`) tạo chiều sâu rõ rệt.
- **D03 (Bố cục full-viewport): PASS** — Thiết kế đơn trang 100% khung nhìn (`overflow: hidden`), phân bổ cân đối 4 góc và tâm màn hình.
- **D04 (Hệ thống chữ & màu sắc): PASS** — Khai báo đúng 4 `@font-face` (`SF Pro` 400/700, `SF Pro Thin` 100, `Aalto` 400) kèm fallback chuẩn xác; tông màu `#090807` / `#0a0908` và `#fff`.
- **D05 (Đáp ứng đa màn hình): PASS** — 2 mốc `@media (max-width: 900px)` và `@media (max-width: 640px)` hoạt động mượt trên cả 5 độ phân giải kiểm thử, không tràn ngang/dọc, không cắt chữ tiêu đề.
- **D06 (Ngôn ngữ & nội dung): PASS** — Tiếng Anh tự nhiên, nhất quán, đã đổi tên thương hiệu thành **Solaris Gate** theo yêu cầu.
- **D07 (Tính xác thực): PASS** — Không bịa đặt đánh giá, giải thưởng, số liệu thương mại hay form giả.
- **D08 (Đồng bộ trạng thái): PASS** — Khi chuyển qua `Mars -> Earth -> Venus`, toàn bộ `data-planet`, `#planet-title`, `#next-number`, `#next-name`, `aria-label` của `#portal`, `.planet-item.active` (kèm hiệu ứng `.is-switching`) và nguồn media của cổng đều cập nhật đồng bộ.

---

## 4. Thông tin gói bàn giao (`solaris-gate.zip`)

- **Đường dẫn gói:** `web/product/giao-dien-web/solaris-gate/solaris-gate.zip`
- **Kích thước:** `19,608` bytes
- **SHA-256:** `ad4ccd7afb02b059a76c29df937599d0ad791d23a73026dbf473f7286a74ebdf`
- **Danh sách file bên trong ZIP (khớp 100% byte với `source/`):**
  - `solaris-gate/index.html` — `38,272` bytes (`SHA-256: 13979b554d95a6338f50544fb9c6d4d7ab79b7c9b13e40a484169843783d4b85`)
  - `solaris-gate/CUSTOMISE.md` — `18,060` bytes (`SHA-256: 33b8b3c3075b422e48a691c688094e39408b5cf31c5a38c2c70606d8aed58fa3`)
  - `solaris-gate/README.md` — `3,222` bytes (`SHA-256: eb2e2f66d530f782f3e0bed61f605daa169775e12d65ef2f9c69c606e6f54a69`)
  - `solaris-gate/LICENCE.txt` — `2,190` bytes (`SHA-256: 5d7834a2e71767536f42b99b225fc9f2c55545dcde4a21c78365349e7152f744`)
