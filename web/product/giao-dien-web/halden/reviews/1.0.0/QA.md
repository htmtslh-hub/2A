# Halden (`halden`) — Hồ sơ Nghiệm thu & QA (v1.0.0)

- **Ngày kiểm tra:** 2026-10-19
- **Sản phẩm:** Halden (`halden`) — Halden — Expeditions to the edge (`t70`).
- **Trạng thái:** Đã hoàn thiện nguồn `source/index.html` tự chứa (inline CSS + JS, không cần bước biên dịch), đóng gói `halden.zip`, hoàn tất kiểm tra tự động + trực quan trên 4 trình duyệt tại 4 kích thước khung nhìn (`1440×900`, `820×1180`, `375×812`, `320×740`), và tích hợp đầy đủ lên cửa hàng (`t70`) kèm ảnh preview WebP và video preview 15 giây.
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1) và `docs/instruction-product.txt`, áp dụng ngoại lệ theo prompt (tự chứa trong 1 file `index.html`, nạp font `Geist` (`400, 500`) từ Google Fonts và tải 7 ảnh thám hiểm PNG từ CloudFront `d8j0ntlcm91z4.cloudfront.net`) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** `web/product/giao-dien-web/halden/`, `web/public/demos/halden/`, `web/public/previews/halden*`, `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/preview-recordings.json`, `web/product/giao-dien-web/tools/dong-goi.mjs`, `web/product/giao-dien-web/tools/quay-preview.mjs` và `web/product/giao-dien-web/reviews/video-previews/halden.json`.

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
| **Q01** | Cấu trúc gói tự chứa 1 file HTML | **PASS (theo ngoại lệ Brief)** | Gói `halden.zip` gồm 4 file: `index.html`, `README.md`, `CUSTOMISE.md`, `LICENCE.txt`. Toàn bộ CSS và JS được nhúng trực tiếp trong `index.html` theo đúng yêu cầu `"Build a single standalone index.html file... Put the CSS in a <style> tag and the JS in a <script> tag, with no frameworks and no build step"`. |
| **Q02** | Không tràn ngang ở mọi khung nhìn | **PASS** | `horizontalOverflow: false` (`scrollWidth === innerWidth`) tại `1440×900`, `820×1180`, `375×812`, `320×740` trên cả 4 trình duyệt (`checks.json`). |
| **Q03** | Morphing Dropdown (`#dd`) & Mobile Sheet (`<= 860px`) | **PASS** | - **Morphing Dropdown (`1440×900`):** Mở `Discover` (`open: true`, `--w: "664px"`, `--h: "358px"`, `#p-discover[data-state="active"]`), hover hàng `Volcanoes` (`data-img="1"`) chuyển ảnh `activeImgIndex: 1`; chuyển sang `Journeys` (`--w: "446px"`, `--h: "308px"`, `#p-discover[data-state="exit-left"]`, `#p-journeys[data-state="active"]`); chuyển sang `Regions` (`--w: "232px"`, `--h: "218px"`, `#p-regions[data-state="active"]`); nhấn `Escape` đóng dropdown (`open: false`) và trả focus về nút kích hoạt `regions` (`focusedMenu: "regions"`).<br>- **Mobile Sheet (`375×812` & `820×1180`):** Dưới `860px`, `.desktop-nav` ẩn (`desktopNavVisible: false`), `.menu-btn` hiện (`menuBtnVisible: true`); click `.menu-btn` mở `#sheet.open` (`ariaExpanded: "true"`), click liên kết trong `#sheet` tự đóng (`open: false`, `ariaExpanded: "false"`). |
| **Q04** | Điều hướng bàn phím & ngữ nghĩa | **PASS** | Các nút `.trigger` và `.menu-btn` là `<button type="button">` cập nhật `aria-expanded`; hỗ trợ focus bàn phím trên `.d-item` để đổi ảnh preview; nhấn `Escape` đóng `#dd` hoặc `#sheet` và trả focus về nút kích hoạt; `:focus-visible` có viền `2px solid #fff`, `outline-offset: 3px`. |
| **Q05** | Landmark HTML & ARIA | **PASS** | Có `<section class="hero" aria-label="Halden expeditions">`, `<header class="header" id="header">`, `<nav class="desktop-nav" id="nav" aria-label="Main">`, `.scroll-cue` có `aria-hidden="true"`, và 4 ảnh `.d-media img` có `alt=""` bên trong `.d-media[aria-hidden="true"]`. |
| **Q06** | Độ tương phản chữ & kiểu chữ | **PASS** | Phông chữ `Geist` (`400, 500`), màu chữ trắng `--text: #ffffff`, liên kết `--soft: rgba(255,255,255,0.74)`, mô tả `--muted: rgba(255,255,255,0.60)` trên nền kính mờ `--panel: rgba(14,19,23,0.84)` (`backdrop-filter: blur(22px) saturate(140%)`) và lớp phủ gradient kép `.hero::after`. |
| **Q07** | Tải đầy đủ 7 ảnh PNG CloudFront | **PASS** | Cả 7 URL ảnh PNG trên `d8j0ntlcm91z4.cloudfront.net` (1 ảnh nền Hero + 4 ảnh Discover + 2 ảnh Journeys) trả mã `200 image/png` và hiển thị sắc nét trên mọi trình duyệt. |
| **Q08** | Kiểm tra đa trình duyệt thực tế | **PASS** | Đã chạy kiểm tra tự động và chụp ảnh màn hình trên cả 4 trình duyệt: Chromium, Firefox, Edge, Cốc Cốc. |
| **Q09** | Không lỗi PageError / JS Runtime | **PASS** | `pageErrors: []` trên toàn bộ 16 lượt kiểm tra (4 trình duyệt × 4 kích thước khung nhìn) trong `checks.json`. |
| **Q10** | Tài liệu `CUSTOMISE.md`, `README.md`, `LICENCE.txt` | **PASS** | `CUSTOMISE.md` có đủ 10 bước chỉnh sửa/triển khai, 12 prompt AI chuyên biệt và bảng đối chiếu chuỗi literal khớp chính xác số lần xuất hiện thực tế trong `source/index.html`. |
| **Q11** | Đóng gói `halden.zip` chuẩn `/` | **PASS** | `halden.zip` (`13,866` bytes, SHA-256 `eafe9825fff56a380c43fee2719a5d122a08e08c4e2c15c27525bb4cee128eab`), toàn bộ 4 đường dẫn dùng `/`, giải nén và đối chiếu khớp 100% byte qua `dong-goi.mjs halden --ngoai-le`. |
| **Q12** | Đồng bộ cửa hàng (`t70`) & video preview | **PASS** | Đã đăng ký mã `t70` (`halden`) trong `template-categories.ts`, `real-templates.ts`, `template-guides.ts`; xuất ảnh preview `halden.webp` (`698×524`), `halden-tablet.webp` (`698×1004`), `halden-mobile.webp` (`698×1511`); quay video preview 15 giây `halden.mp4` (`329,350` bytes, `14.966667s`, revision `ee7144608125`, `errors=0`, `missing=0`). |
| **Q13** | Kiểm tra trực quan ảnh chụp màn hình | **PASS** | Đã xem trực tiếp các ảnh chụp (`chromium-1440.png`, `chromium-1440-discover.png`, `chromium-1440-journeys.png`, `chromium-375-sheet.png`, `halden.webp`). |

## 3. Đánh giá Thiết kế (`D01–D08`) & Chuyển động (`T01–T04`)

- **D01–D08:** Bố cục sân khấu tối giản của thương hiệu thám hiểm Bắc Âu (`Halden`) đặt trọn điểm nhấn vào bức ảnh dòng sông băng xanh ngọc uốn lượn qua thung lũng núi lửa (`heroIn 2.4s`), chỉ báo `( scroll down )` tại `top: 44%` và thanh điều hướng `.bar` cao `76px` với biểu tượng viên sỏi khắc hình đỉnh núi (`30×26px`).
- **T01–T04:** Hoạt ảnh vào của `.desktop-nav` chỉ dùng `opacity` (`fadeIn`) để giữ nguyên `<header>` làm containing block cho `#dd`; hộp thả xuống `#dd` biến hình kích thước (`664×358` ↔ `446×308` ↔ `232×218`) và vị trí `--x` trong `0.5s cubic-bezier(0.22, 1, 0.36, 1)` kết hợp trượt ngang `±56px` (`exit-left` / `exit-right`) và chuyển ảnh có chiều sâu `scale(1.06) blur(10px) → scale(1) blur(0)`; hỗ trợ đầy đủ `@media (prefers-reduced-motion: reduce)`.

## 4. Phần chưa thử / Giới hạn ghi nhận trung thực

- **Chưa thử:** Safari trên macOS/iOS thực tế và kiểm tra trình đọc màn hình chuyên dụng (NVDA/VoiceOver).
- **Giới hạn theo thiết kế:** Trang là hero section độc lập một màn hình theo đúng đặc tả trong prompt; các liên kết điều hướng và mục chọn trong `#dd` / `#sheet` là điểm neo trình diễn (`#glaciers`, `#volcanoes`, `#small-group-treks`, v.v.) để khách hàng gắn URL thật khi triển khai.
