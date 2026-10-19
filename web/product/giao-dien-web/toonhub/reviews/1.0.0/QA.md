# TOONHUB (`toonhub`) — Hồ sơ Nghiệm thu & QA (v1.0.0)

- **Ngày kiểm tra:** 2026-10-19
- **Sản phẩm:** TOONHUB (`toonhub`) — 3D Character Figurine Carousel Hero (`t68`).
- **Trạng thái:** Đã hoàn thiện nguồn `source/` (`React 18 + TypeScript + Vite + Tailwind CSS + lucide-react`), biên dịch bản dựng `source/built/` (`tsc --noEmit && vite build`), đóng gói `toonhub.zip`, hoàn tất kiểm tra tự động + trực quan trên 4 trình duyệt tại 4 kích thước khung nhìn (`1440×900`, `820×1180`, `375×812`, `320×740`), và tích hợp đầy đủ lên cửa hàng (`t68`) kèm ảnh preview WebP và video preview 15 giây.
- **Quy chuẩn tham chiếu:** `docs/product-standards.md` (1.2.1) và `docs/instruction-product.txt`, áp dụng ngoại lệ theo prompt (React 18 + TypeScript + Vite + Tailwind CSS + `lucide-react`, tải font `Anton` + `Inter` từ Google Fonts trong `index.html`, và tải 4 ảnh PNG mô hình nhân vật 3D từ `https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/...`) được ghi nhận tại `reviews/1.0.0/BRIEF.md`.
- **Phạm vi thao tác:** `web/product/giao-dien-web/toonhub/`, `web/public/demos/toonhub/`, `web/public/previews/toonhub*`, `web/src/lib/template-categories.ts`, `web/src/lib/real-templates.ts`, `web/src/lib/template-guides.ts`, `web/src/lib/preview-recordings.json`, `web/product/giao-dien-web/tools/dong-goi.mjs`, `web/product/giao-dien-web/tools/quay-preview.mjs` và `web/product/giao-dien-web/reviews/video-previews/toonhub.json`.

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
| **Q01** | Cấu trúc gói & ngoại lệ React/Vite | **PASS (theo ngoại lệ Brief)** | Gói `toonhub.zip` gồm 17 file: mã nguồn React 18 + TypeScript + Vite + Tailwind CSS + `lucide-react` (`index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`, `THIRD-PARTY-LICENSES.txt`) và bản dựng tĩnh `built/` (từ `dist/`). Loại trừ `node_modules` và `dist`. |
| **Q02** | Không tràn ngang & khóa khung nhìn (`320–1440px`) | **PASS** | `horizontalOverflow: false` và `verticalOverflow: false` (`scrollWidth === innerWidth`, `scrollHeight === innerHeight`) tại `320×740`, `375×812`, `820×1180`, `1440×900` trên cả 4 trình duyệt (`checks.json`). |
| **Q03** | Băng chuyền 4 vị trí (`center`, `left`, `right`, `back`), khóa `650ms` & đáp ứng `isMobile` | **PASS** | - **4 vị trí theo `activeIndex`:** Tại `activeIndex === 0`, nhân vật `0` là `center` (`left: 50%`, `blur(0px)`), nhân vật `1` là `right` (`left: 70%` desktop / `80%` mobile, `blur(2px)`), nhân vật `2` là `back` (`left: 50%`, `blur(4px)`), nhân vật `3` là `left` (`left: 30%` desktop / `20%` mobile, `blur(2px)`).<br>- **Khóa chuyển cảnh `650ms` (`isAnimating`):** Click liên tiếp `#next` 2 lần ngay lập tức giữ nguyên `lockedIndexDuringAnimation === "1"` (chặn bấm chồng trong `650ms`), đổi nền sang `rgb(107, 191, 122)` (`#6BBF7A`) và xoay vai trò thành `["left", "center", "right", "back"]`; click `#prev` đưa `activeIndex` về `"0"` (`rgb(244, 132, 95)` / `#F4845F`).<br>- **Đáp ứng mobile (`window.innerWidth < 640`):** Tại `320px` và `375px`, `descriptionVisible: false` (`hidden sm:block`), `center` có `height: "60%"`, `bottom: "22%"`; tại `820px` và `1440px`, `descriptionVisible: true`, `center` có `height: "92%"`, `bottom: "0px"`. |
| **Q04** | Điều hướng bàn phím & ngữ nghĩa | **PASS** | Hỗ trợ phím `ArrowLeft` / `ArrowRight` trên bàn phím; 2 nút điều hướng là `<button type="button">` có `aria-label="Previous figurine"` / `aria-label="Next figurine"` và viền `:focus-visible`. |
| **Q05** | Landmark HTML & Heading | **PASS** | Có `<header>`, `<main>`, `<nav aria-label="Carousel navigation">` và 1 `<h1>` duy nhất (`3D SHAPE`). |
| **Q06** | Độ tương phản chữ & kiểu chữ | **PASS** | Chữ nền khổng lồ `3D SHAPE` (`Anton`, `clamp(90px, 28vw, 380px)`) và liên kết `DISCOVER IT` (`Anton`, `clamp(20px, 4vw, 56px)`) màu trắng `#FFFFFF` kết hợp phông thân trang `Inter` (`TOONHUB`, `TOONHUB FIGURINES`, đoạn mô tả) nổi bật trên cả 4 màu nền (`#F4845F`, `#6BBF7A`, `#E882B4`, `#6EB5FF`). |
| **Q07** | Tải trước (`new Image()`) & hiển thị 4 ảnh nhân vật 3D | **PASS** | Cả 4 ảnh PNG (`2160px` chiều rộng gốc) tải đầy đủ (`naturalWidth: 2160`) trên cả Chromium, Firefox, Edge và Cốc Cốc. |
| **Q08** | Kiểm tra đa trình duyệt thực tế | **PASS** | Đã chạy kiểm tra tự động và chụp ảnh màn hình trên cả 4 trình duyệt: Chromium, Firefox, Edge, Cốc Cốc. |
| **Q09** | Không lỗi Console / PageError / TypeScript | **PASS** | `tsc --noEmit && vite build` đạt `0` lỗi; `consoleErrors: []` và `pageErrors: []` trên cả 4 trình duyệt (`checks.json`). |
| **Q10** | Tài liệu `CUSTOMISE.md`, `README.md`, `LICENCE.txt` | **PASS** | `CUSTOMISE.md` có đủ 10 bước cài đặt/chỉnh sửa/triển khai, 12 prompt AI chuyên biệt và bảng đối chiếu chuỗi literal khớp chính xác số lần xuất hiện thực tế. |
| **Q11** | Đóng gói `toonhub.zip` chuẩn `/` | **PASS** | `toonhub.zip` (`87,843` bytes, SHA-256 `a8042688b9f5dfd6695a9ca15c71465574ffe610eedd66e2d97460f2bda39580`), toàn bộ 17 đường dẫn dùng `/`, giải nén và đối chiếu khớp 100% byte. |
| **Q12** | Đồng bộ cửa hàng (`t68`) & video preview | **PASS** | Đã đăng ký mã `t68` (`toonhub`) trong `template-categories.ts`, `real-templates.ts`, `template-guides.ts`; xuất ảnh preview `toonhub.webp` (`698×524`), `toonhub-tablet.webp` (`698×1004`), `toonhub-mobile.webp` (`698×1511`); quay video preview 15 giây `toonhub.mp4` (`356,760` bytes, `14.966667s`, revision `1117f83ab7ec`, `2` lượt click thật, `errors=0`, `missing=0`). |
| **Q13** | Kiểm tra trực quan ảnh chụp màn hình | **PASS** | Đã xem trực tiếp các ảnh chụp (`chromium-1440.png`, `chromium-1440-slide2.png`, `chromium-375.png`). |

## 3. Đánh giá Thiết kế (`D01–D08`) & Chuyển động (`T01–T04`)

- **D01–D08:** Sân khấu trưng bày mô hình nhân vật 3D có chiều sâu thị giác rõ rệt: nhân vật trung tâm sắc nét (`scale(1.68)` trên desktop, `blur(0px)`) nổi bật phía trước dòng chữ `3D SHAPE` khổng lồ, hai nhân vật bên cạnh (`blur(2px)`) và nhân vật phía sau (`blur(4px)`) tạo trường ảnh tự nhiên trên nền hạt phim SVG (`fractalNoise`).
- **T01–T04:** Chuyển cảnh đồng thời màu nền (`background-color`), vị trí (`left`, `height`, `bottom`), tỷ lệ (`transform`), độ mờ (`filter`) và độ trong suốt (`opacity`) theo đường cong `650ms cubic-bezier(0.4, 0, 0.2, 1)`, có khóa chống bấm chồng mượt mà.

## 4. Phần chưa thử / Giới hạn ghi nhận trung thực

- **Chưa thử:** Safari trên macOS/iOS thực tế và kiểm tra trình đọc màn hình chuyên dụng (NVDA/VoiceOver).
- **Giới hạn theo thiết kế:** Trang là hero băng chuyền một màn hình theo đúng đặc tả; 4 hình ảnh nhân vật và liên kết `#discover` là nội dung mẫu để khách hàng thay thế bằng sản phẩm thực tế khi triển khai.
