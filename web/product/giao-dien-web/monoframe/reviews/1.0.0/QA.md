# Monoframe (`monoframe`) — Hồ sơ Nghiệm thu & QA (v1.0.0)

- **Ngày kiểm tra:** 2026-10-18
- **Sản phẩm:** Monoframe (`monoframe`) — đổi tên từ đặc tả gốc `"Mainframe"` / `"Mainframe®"` / `"hello@mainframe.co"` theo yêu cầu của chủ sản phẩm.
- **Trạng thái:** Đã hoàn thiện nguồn `source/`, biên dịch bản dựng `source/dist/` (`tsc --noEmit && vite build`), đóng gói `monoframe.zip`, hoàn tất kiểm tra tự động + trực quan trên 4 trình duyệt, và tích hợp đầy đủ lên cửa hàng (`t62`) kèm ảnh preview WebP và video preview 15 giây.
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1) và `docs/instruction-product.txt`, áp dụng ngoại lệ theo prompt (React 18 + TypeScript + Vite + Tailwind CSS, tải 2 stylesheet font từ `db.onlinewebfonts.com` và video nền từ CloudFront kèm bản H.264 `public/assets/hero-h264.mp4`) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** `web/product/giao-dien-web/monoframe/`, `web/public/demos/monoframe/`, `web/public/previews/monoframe*`, `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/view.ts`, `web/src/lib/preview-recordings.json`, `web/product/giao-dien-web/tools/quay-preview.mjs` và `web/product/giao-dien-web/reviews/video-previews/monoframe.json`.

## 1. Môi trường & Trình duyệt đã chạy thật

Chạy tự động qua HTTP cục bộ có hỗ trợ `206 Partial Content` (`Byte-Range`) bằng `reviews/1.0.0/check.cjs` (kết quả lưu tại `reviews/1.0.0/checks.json`):
- **Playwright Chromium:** `153.0.8010.12`
- **Playwright Firefox:** `155.0`
- **Microsoft Edge:** `155.0.4283.62`
- **Cốc Cốc Browser:** `152.0.7977.124`
- **Kích thước viewport đã kiểm tra trên cả 4 trình duyệt:** `1440×900`, `820×1180`, `768×1024`, `375×812`, `320×740`.

## 2. Kết quả Checklist Chất lượng (`Q01–Q13`)

| Mã | Hạng mục | Kết quả | Bằng chứng xác minh |
|---|---|---|---|
| **Q01** | Cấu trúc gói & ngoại lệ React/Vite | **PASS (theo ngoại lệ Brief)** | Gói `monoframe.zip` gồm đầy đủ mã nguồn React 18 + TypeScript + Vite + Tailwind CSS (`index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `public/assets/hero-h264.mp4`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`) và bản dựng tĩnh `built/` (từ `dist/`). Loại trừ `node_modules`, `dist` và `.gitignore`. |
| **Q02** | Không tràn ngang ở mọi viewport (`320–1440px`) | **PASS** | `horizontalOverflow: false` (`scrollWidth === innerWidth`) tại `320×740`, `375×812`, `768×1024`, `820×1180`, `1440×900` trên cả 4 trình duyệt (`checks.json`). Toàn bộ 5 pill buttons nằm gọn trong viewport (`pillsWithinViewport: true`). |
| **Q03** | Tương tác: Mouse-scrub video, Typewriter, Pills, Mobile menu, Clipboard copy | **PASS** | - **Action pills (`400ms`):** Xuất hiện độc lập với hiệu ứng gõ chữ (`midTyping.pillsOpacity === "1"` khi `textLength` mới đạt `17–25` ký tự và `cursorPresent === true`).<br>- **Typewriter (`useTypewriter`):** Sau `600ms` delay, gõ từng ký tự (`38ms/char`) tới đủ chuỗi `"Glad you stopped in. Good taste tends to find us. Now, what are we building?"`, sau đó ẩn con trỏ nhấp nháy (`cursorAfterDone === false`).<br>- **Horizontal mouse-scrub (`SENSITIVITY = 0.8`):** Di chuột ngang từ `120px` sang `1320px` tại `1440×900` đưa `video.currentTime` từ `0.001s` lên `2.694s` với hàng đợi `onSeeked` chống ngập seek.<br>- **Copy email:** Click nút viền `"Reach us: hello@monoframe.co"` gọi `navigator.clipboard.writeText("hello@monoframe.co")` (`copiedText === "hello@monoframe.co"`).<br>- **Mobile menu (`375×812`):** Click nút hamburger 3 thanh chuyển `aria-expanded="true"`, mở lớp phủ `bg-black/90 backdrop-blur-md` (`overlayOpacity: "1"`, `overlayPointerEvents: "auto"`), nhấn `Escape` đóng lại (`overlayOpacity: "0"`). |
| **Q04** | Điều hướng bàn phím & ngữ nghĩa | **PASS** | Nút hamburger có `aria-label` và `aria-expanded`; các liên kết trong mobile overlay chuyển `tabIndex` theo trạng thái đóng/mở và hỗ trợ phím `Escape`; toàn bộ pill là `<button type="button">` có thể focus bằng `Tab`. |
| **Q05** | Landmark HTML & Heading | **PASS** | Có `<header>`, `<nav aria-label="Primary navigation">`, `<main>`, và 1 `<h1>` duy nhất (`Hey there, meet A.R.I.A, / Monoframe's Adaptive Response Interface Agent`). |
| **Q06** | Độ tương phản chữ & chồng chữ | **PASS** | Chữ trắng (`#fff`) và nút pill trắng chữ đen (`bg-white text-black`) nổi rõ trên nền video đỏ thẫm, không chồng lấp ở mọi kích thước `320px–1440px`. |
| **Q07** | Tương thích codec video & fallback | **PASS** | Giữ nguyên URL CloudFront gốc (`hevc` 10-bit) trên `<video src>` trong JSX và tự động chuyển sang bản H.264 8-bit (`./assets/hero-h264.mp4`, `1920×1080`, `4.042s`) trên các trình duyệt không giải mã được HEVC 10-bit. |
| **Q08** | Kiểm tra đa trình duyệt thực tế | **PASS** | Đã chạy kiểm tra tự động và chụp ảnh màn hình trên cả 4 trình duyệt: Chromium, Firefox, Edge, Cốc Cốc. |
| **Q09** | Không lỗi Console / PageError / TypeScript | **PASS** | `tsc --noEmit && vite build` đạt `0` lỗi; `consoleErrors: []` và `pageErrors: []` trên cả 4 trình duyệt (`checks.json`). |
| **Q10** | Tài liệu `CUSTOMISE.md`, `README.md`, `LICENCE.txt` | **PASS** | `CUSTOMISE.md` có đủ 10 bước cài đặt/chỉnh sửa/triển khai, 12 prompt AI chuyên biệt và bảng đối chiếu chuỗi literal khớp số lần xuất hiện thực tế. |
| **Q11** | Đóng gói `monoframe.zip` chuẩn `/` | **PASS** | `monoframe.zip` (`2,180,694` bytes, SHA-256 `9ff504e64a58b23688a22e2f876a38bed2bfacdf8e5827c3a67bd181f7e23c1b`), toàn bộ 19 đường dẫn dùng `/`, giải nén và đối chiếu khớp 100% byte. |
| **Q12** | Đồng bộ cửa hàng (`t62`) & video preview | **PASS** | Đã đăng ký mã `t62` (`monoframe`) trong `template-categories.ts`, `real-templates.ts`, `template-guides.ts`, `view.ts`; xuất ảnh preview `monoframe.webp` (`698×524`), `monoframe-tablet.webp` (`698×1004`), `monoframe-mobile.webp` (`698×1511`); quay video preview 15 giây `monoframe.mp4` (`321,853` bytes, `14.966667s`, revision `8a20ec978658`, `errors=0`, `missing=0`); chạy `npm --prefix web run previews:check` và `npm --prefix web run typecheck` đạt `PASS`. |
| **Q13** | Kiểm tra trực quan ảnh chụp màn hình | **PASS** | Đã xem trực tiếp các ảnh chụp (`chromium-typing.png`, `chromium-1440.png`, `chromium-scrubbed.png`, `firefox-scrubbed.png`, `edge-1440.png`, `coccoc-1440.png`, `chromium-375-menu.png`, `chromium-320.png`). |

## 3. Đánh giá Thiết kế (`D01–D08`) & Chuyển động (`T01–T04`)

- **D01–D08:** Bố cục bất đối xứng rõ điểm tựa: nhân vật 3D đặt ở `object-position: 70% center` bên phải, khối nội dung `max-w-xl` bên trái gồm dòng giới thiệu làm mờ chủ đích (`filter: blur(4px)`), thông điệp gõ chữ sắc nét (`clamp(18px, 4vw, 26px)`) và cụm 5 nút pill gọn gàng.
- **T01–T04:** Điều khiển tua video theo chuyển động chuột ngang (`SENSITIVITY = 0.8`) dùng khóa `isSeekingRef` kết hợp sự kiện `onSeeked` để tránh nghẽn giải mã khung hình; hiệu ứng gõ chữ và hiệu ứng trượt nhẹ của nhóm nút pill (`0.4s ease`) độc lập, mượt mà.

## 4. Phần chưa thử / Giới hạn ghi nhận trung thực

- **Chưa thử:** Safari trên macOS/iOS thực tế và kiểm tra trình đọc màn hình chuyên dụng (NVDA/VoiceOver).
- **Giới hạn theo thiết kế:** Trang là hero một màn hình (`h-screen overflow-hidden`), các liên kết điều hướng (`#labs`, `#studio`, `#openings`, `#shop`) và nút liên hệ là điểm neo/mailto mẫu để khách hàng gắn trang đích thực tế khi triển khai.
