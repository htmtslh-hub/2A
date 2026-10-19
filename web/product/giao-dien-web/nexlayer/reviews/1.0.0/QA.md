# NexLayer (`nexlayer`) — Hồ sơ Nghiệm thu & QA (v1.0.0)

- **Ngày kiểm tra:** 2026-10-19
- **Sản phẩm:** NexLayer (`nexlayer`) — The Next Layer of Intelligence (`t67`).
- **Trạng thái:** Đã hoàn thiện nguồn `source/index.html` tự chứa (inline CSS + JS, không cần bước biên dịch), đóng gói `nexlayer.zip`, hoàn tất kiểm tra tự động + trực quan trên 4 trình duyệt tại 5 kích thước khung nhìn (`1487×1058`, `1440×900`, `820×1180`, `375×812`, `320×740`), và tích hợp đầy đủ lên cửa hàng (`t67`) kèm ảnh preview WebP và video preview 15 giây.
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1) và `docs/instruction-product.txt`, áp dụng ngoại lệ theo prompt (tải font `Manrope` từ Google Fonts, khai báo `@font-face` cho `IpsumMark` trên dải logo đối tác, và phát video nền toàn màn hình từ CloudFront `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4`) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** `web/product/giao-dien-web/nexlayer/`, `web/public/demos/nexlayer/`, `web/public/previews/nexlayer*`, `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/preview-recordings.json`, `web/product/giao-dien-web/tools/quay-preview.mjs` và `web/product/giao-dien-web/reviews/video-previews/nexlayer.json`.

## 1. Môi trường & Trình duyệt đã chạy thật

Chạy tự động qua HTTP cục bộ bằng `reviews/1.0.0/check.cjs` (kết quả lưu tại `reviews/1.0.0/checks.json`):
- **Playwright Chromium:** `153.0.8010.12`
- **Playwright Firefox:** `155.0`
- **Microsoft Edge:** `155.0.4283.62`
- **Cốc Cốc Browser:** `152.0.7977.124`
- **Kích thước viewport đã kiểm tra trên cả 4 trình duyệt:** `1487×1058` (khung chuẩn thiết kế), `1440×900`, `820×1180`, `375×812`, `320×740`.

## 2. Kết quả Checklist Chất lượng (`Q01–Q13`)

| Mã | Hạng mục | Kết quả | Bằng chứng xác minh |
|---|---|---|---|
| **Q01** | Cấu trúc gói tự chứa 1 file HTML | **PASS (theo ngoại lệ Brief)** | Gói `nexlayer.zip` gồm 4 file: `index.html`, `README.md`, `CUSTOMISE.md`, `LICENCE.txt`. Toàn bộ CSS và JS được nhúng trực tiếp trong `index.html` theo đúng yêu cầu `"Deliver one self-contained index.html (inline CSS + JS, no build step)"`. |
| **Q02** | Không tràn ngang & khóa khung nhìn (`overflow: hidden`) | **PASS** | `horizontalOverflow: false` và `verticalOverflow: false` (`scrollWidth === innerWidth`, `scrollHeight === innerHeight`) tại `1487×1058`, `1440×900`, `820×1180`, `375×812`, `320×740` trên cả 4 trình duyệt (`checks.json`). |
| **Q03** | Hệ đơn vị `--u`/`--h` tại `1487×1058` & Menu di động (`max-aspect-ratio: 11/10`) | **PASS** | - **Đo đạc tọa độ tại `1487×1058`:** `brandRect` (`left: 74.5px`, `top: 27px`, `width: 31.5px`, `height: 48.5px`), `linksRect` (`left: 601.5px`, `top: 41px`), `pillNavRect` (`right: 1411.6px` → cách mép phải `75.4px`, `top: 27px`, `width: 175px`, `height: 49px`), `headlineRect` (`left: 75.5px`, `top: 230.5px`), `subRect` (`left: 75.5px`, `top: 419.5px`), `pillCtaRect` (`left: 74.9px`, `top: 495px`, `width: 175.6px`, `height: 50px`), `logosRect` (`top: 995px`, `width: 727px`, `height: 31px`).<br>- **Menu di động (`#burger` / `#menu`):** Tại `375×812`, nút `#burger` kính mờ hiển thị (`burgerVisible: true`), click mở lớp phủ `.stage.is-open #menu` (`menuOpenedAfterClick: true`, `aria-expanded="true"`), nhấn phím `Escape` đóng lại (`menuClosedAfterEscape: true`, `aria-expanded="false"`), click lại mở và click liên kết trong menu tự đóng (`menuClosedAfterLinkClick: true`). |
| **Q04** | Điều hướng bàn phím & ngữ nghĩa | **PASS** | Nút `#burger` là `<button type="button">` cập nhật `aria-expanded`, `aria-label` (`Open menu` / `Close menu`), `aria-controls="menu"`; khi đóng menu, các liên kết bên trong `#menu` được đặt `tabIndex = -1` để không lọt focus ẩn, và khi nhấn `Escape` trả focus về `#burger`. |
| **Q05** | Landmark HTML & Heading | **PASS** | Có `<header class="topbar">`, `<nav class="links" aria-label="Primary">`, `<nav class="menu" id="menu" aria-label="Mobile menu">`, `<main class="hero" id="home">`, và 1 `<h1>` duy nhất (`The Next Layer of Intelligence`). |
| **Q06** | Độ tương phản chữ & kiểu chữ | **PASS** | Tiêu đề `Manrope` (`--ink: #fafafa`), đoạn mô tả `--muted: #a7a6a6`, điều hướng `--nav: #b6b5b5`, nút pill trắng `#ffffff` chữ `#050505` đặt trên lớp phủ gradient kép `.plate::after` bảo đảm độ tương phản rõ nét trên nền `#050505`. Dải 4 logo dưới cùng dùng font `IpsumMark` (`#8b8a8a`) kèm dấu chấm tròn `.dot` (`4.2u × 4.2u`) trên `lg2`. |
| **Q07** | Tương thích codec video | **PASS** | Video nền CloudFront (`hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4`) mã hóa chuẩn `H.264` phát tự động (`autoplay muted loop playsinline`) với `readyState >= 2` và `videoWidth > 0` trên cả Chromium, Firefox, Edge và Cốc Cốc. |
| **Q08** | Kiểm tra đa trình duyệt thực tế | **PASS** | Đã chạy kiểm tra tự động và chụp ảnh màn hình trên cả 4 trình duyệt: Chromium, Firefox, Edge, Cốc Cốc. |
| **Q09** | Không lỗi Console / PageError | **PASS** | `consoleErrors: []` và `pageErrors: []` trên toàn bộ 20 lượt kiểm tra (4 trình duyệt × 5 kích thước khung nhìn) trong `checks.json`. |
| **Q10** | Tài liệu `CUSTOMISE.md`, `README.md`, `LICENCE.txt` | **PASS** | `CUSTOMISE.md` có đủ 10 bước chỉnh sửa/triển khai, 12 prompt AI chuyên biệt và bảng đối chiếu chuỗi literal khớp chính xác số lần xuất hiện thực tế trong `source/index.html`. |
| **Q11** | Đóng gói `nexlayer.zip` chuẩn `/` | **PASS** | `nexlayer.zip` (`12,204` bytes, SHA-256 `0f205ec827f2eb807d3b05c481e6739c3b22de3636b3d6456c0116c7864184ef`), toàn bộ 4 đường dẫn dùng `/`, giải nén và đối chiếu khớp 100% byte qua `dong-goi.mjs nexlayer --ngoai-le`. |
| **Q12** | Đồng bộ cửa hàng (`t67`) & video preview | **PASS** | Đã đăng ký mã `t67` (`nexlayer`) trong `template-categories.ts`, `real-templates.ts`, `template-guides.ts`; xuất ảnh preview `nexlayer.webp` (`698×524`), `nexlayer-tablet.webp` (`698×1004`), `nexlayer-mobile.webp` (`698×1511`); quay video preview 15 giây `nexlayer.mp4` (`405,925` bytes, `14.966667s`, revision `13f9f32d8b70`, `errors=0`, `missing=0`). |
| **Q13** | Kiểm tra trực quan ảnh chụp màn hình | **PASS** | Đã xem trực tiếp các ảnh chụp (`chromium-1487.png`, `chromium-375.png`, `chromium-375-menu.png`). |

## 3. Đánh giá Thiết kế (`D01–D08`) & Chuyển động (`T01–T04`)

- **D01–D08:** Sân khấu tối điện ảnh (`#050505`) khóa tỷ lệ theo chiều cao (`--u: calc(100dvh / 1058)`), biểu tượng tia sét chữ S sắc cạnh (`31.5×48.5`) với dải chuyển sắc kim loại 10 điểm dừng và 2 ô vuông sáng `#fdfdfd`, hệ thống chữ `Manrope` cân đối ở góc phần tư trên bên trái, và dải 4 biểu trưng `logoipsum` (`lg1`–`lg4`) neo tại `995u` tạo nhịp điệu thị giác chuẩn xác.
- **T01–T04:** Chuyển động của luồng ánh sáng trong video nền hòa quyện với lớp phủ `.plate::after`; trên khung nhìn dọc (`max-aspect-ratio: 11/10`), menu kính mờ `#menu` trượt hiện theo chuỗi độ trễ bậc thang (`0.06s` → `0.10s` → `0.16s` → `0.22s` → `0.28s` → `0.34s`) và tôn trọng `prefers-reduced-motion: reduce`.

## 4. Phần chưa thử / Giới hạn ghi nhận trung thực

- **Chưa thử:** Safari trên macOS/iOS thực tế và kiểm tra trình đọc màn hình chuyên dụng (NVDA/VoiceOver).
- **Giới hạn theo thiết kế:** Trang là hero một màn hình cố định (`overflow: hidden`) theo đúng đặc tả Figma `1487 × 1058`, các liên kết neo (`#about`, `#features`, `#faq`, `#contact`, `#get-started`, `#architecture`) là điểm neo mẫu để khách hàng nối tới trang hoặc hộp thoại thực tế khi triển khai.
