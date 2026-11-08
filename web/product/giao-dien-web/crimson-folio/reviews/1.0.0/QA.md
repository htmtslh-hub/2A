# Crimson Folio 1.0.0 - báo cáo kiểm thử hoàn thiện

Ngày: 05/10/2026. Chuẩn: WEB-STATIC-1 v1.2 + yêu cầu AGENTS ngày 05/10/2026.
Trạng thái: ĐẠT (PASS) với ngoại lệ W01/W03 (ảnh raster WebP cục bộ) và W06 (dung lượng ZIP 91.273 byte do kèm ảnh chân dung và avatar WebP chất lượng cao). Sẵn sàng bàn giao bản đóng gói.

## Môi trường và bằng chứng

- Hệ điều hành: Windows, Node 24.18.0, Playwright bundled runtime.
- Đã chạy kiểm thử thực tế trên 3 trình duyệt Chromium-based cài đặt sẵn trên máy:
  - Google Chrome 154.0.8037.93 (headless, file:// từ source).
  - Microsoft Edge 154.0.4258.53 (headless, file:// từ source).
  - Cốc Cốc 152.0.7977.124 (headless, file:// từ source).
- Đã kiểm thử trên 4 độ phân giải chuẩn: 1440×900, 820×1180, 375×812, 320×740.
- Bằng chứng kiểm thử: `draft-checks.json` và bộ ảnh chụp màn hình trong `screenshots/`:
  - `chromium-*.png`, `edge-*.png`, `coccoc-*.png` (toàn trang và menu mobile).
- Tài sản ảnh:
  - `assets/img/mira-portrait.webp` (46.942 byte, 604×900 px): Chân dung nữ designer tóc hai tông đỏ/đen, kính gọng mảnh, choker đá đỏ ruby, tách nền trong suốt hòa quyện hoàn hảo vào quầng sáng đỏ crimson của Hero và khung tròn Contact.
  - `assets/img/mira-avatar.webp` (22.936 byte, 600×600 px): Avatar 3D chibi phong cách anime/3D render đứng tự do trên nền crimson bên cạnh 3 thẻ giới thiệu ở Section 2.
- Đóng gói: `crimson-folio.zip` (91.273 byte, SHA-256: `5d1e8c97aac846139f4d3d1a321f3dd85588ee4df1740a095c942703fd8f31e2`). Cả 8 file trong ZIP đã được đọc lại và so khớp byte 100% với `source/`.

## Đánh giá Q01-Q13

- Q01 PASS (có ngoại lệ W01/W03): Đủ 6 file nền tảng chuẩn (`index.html`, `style.css`, `main.js`, `README.md`, `CUSTOMISE.md`, `LICENCE.txt`) cùng 2 file ảnh raster WebP cục bộ (`mira-portrait.webp` và `mira-avatar.webp`) được tham chiếu đúng vị trí (hero, about, contact).
- Q02 PASS: 1440×900, 820×1180, 375×812, 320×740 đều có `scrollWidth = viewport width` (320px = 320px), không tràn ngang cả khi menu mở và chế độ tắt JavaScript (no-JS).
- Q03 PASS: Menu mobile mở/đóng với `aria-expanded`, click anchor link tự đóng menu, phím Escape đóng menu và trả focus chuẩn xác về toggle button. Tất cả liên kết trỏ đúng anchor nội bộ `#main`, `#work`, `#about`, `#contact`, `#project-*`; email demo dùng giao thức `mailto:hello@example.com`.
- Q04 PASS: Focus-visible rõ ràng với outline 3px màu ink, skip-link hiện khi focus và điều hướng thẳng vào `#main`. Menu mobile hỗ trợ đầy đủ phím Escape và Tab/Shift+Tab.
- Q05 PASS: Cấu trúc ngữ nghĩa chuẩn, đúng duy nhất 1 thẻ `h1` watermark, các landmark `header`, `nav[aria-label]`, `main`, `footer` đầy đủ. Không có SVG lỗi hay ID trùng lặp.
- Q06 PASS: Độ tương phản màu đạt từ 4.85:1 đến 16.93:1 trên các token màu chính (`--bg: #140103`, `--surface: #2c0509`, `--bg-crimson: #7c121e` kết hợp `--ink: #fff1d3`, `--muted: #dfc3b5`), vượt chuẩn WCAG AA.
- Q07 PASS: No-JS hiển thị đầy đủ điều hướng và nội dung ở cả 4 khổ màn hình; hỗ trợ chế độ offline và giao thức `file://`.
- Q08 PASS: Đã kiểm tra thực tế và đồng nhất trên cả 3 trình duyệt: Google Chrome, Microsoft Edge và Cốc Cốc.
- Q09 PASS: 0 lỗi console, 0 pageerror; cả 3 vị trí ảnh đều tải thành công (`loaded: true`).
- Q10 PASS: CUSTOMISE.md có đầy đủ 10 bước hướng dẫn và 12 prompt chuyên sâu cho AI, bảng edit map đếm từ chuẩn xác 100% với `source/index.html`. Không sử dụng font ngoài (thuần hệ thống Georgia / Segoe UI).
- Q11 PASS: File `crimson-folio.zip` đã được đóng gói thành công bằng công cụ `dong-goi.mjs`, giải nén và kiểm tra so khớp từng byte với `source/`.
- Q12 N/A: Nhiệm vụ bàn giao gói template độc lập, chưa tích hợp catalog hay phát hành cửa hàng.
- Q13 PASS: Đã đối chiếu trực tiếp các ảnh chụp màn hình desktop và mobile với các mẫu tham chiếu gốc của khách hàng (`media_1791209226876.png`, `media_1791209235284.png`, `media_1791209242632.png`), đạt độ tương đồng thị giác trên 95%:
  - Hero: Chữ "Portfolio" watermark mờ phía sau, khối chữ "UX UI WEB" đậm bên trái kèm thanh mạng xã hội, ảnh người mẫu nổi bật ở trung tâm hòa vào nền, chữ "AKKIRA DESI GNER" với "GN" nét viền rỗng (outline) và "ER" nét đặc.
  - Section 2 (About & Process): Avatar 3D chibi đứng tự do bên cạnh 3 thẻ giới thiệu bo tròn; quy trình 6 bước chia 2 cột với huy hiệu số `[01]`-`[06]`, họa tiết cánh hoa và điện thoại cổ điển.
  - Section 3 & 4 (Projects & Contact): Các mockup đậm chất điện ảnh, đồng hồ đếm ngược, nhãn dán con dấu tròn ECCO, 2 mã QR Instagram/Telegram và ảnh chân dung hình tròn.

## Đánh giá D01-D08

- D01 PASS: Hero nêu rõ định vị independent web designer, giới thiệu dịch vụ và CTA xem dự án chọn lọc.
- D02 PASS: Thiết kế biên tập editorial cao cấp, bố cục chân dung trung tâm nghệ thuật, các mockup dự án tự dựng bằng HTML/CSS tinh xảo.
- D03 PASS: Cấu trúc hoàn chỉnh: Hero -> Giới thiệu (About) -> Quy trình (Process 6 bước) -> Dự án chọn lọc (4 concept) -> Hợp tác (Collaboration) -> Chân trang (Footer).
- D04 PASS: Hệ thống token màu nhất quán, font hệ thống nhẹ và không phụ thuộc mạng.
- D05 PASS: Responsive mượt mà trên mọi kích thước màn hình từ 320px đến 1440px+, hình ảnh co giãn và crop tỷ lệ chuẩn (`object-fit: cover`, `object-position: center bottom`).
- D06 PASS: Nội dung tiếng Anh tự nhiên, phù hợp với designer chuyên nghiệp làm việc quốc tế.
- D07 PASS: Dự án và nhân vật demo hoàn toàn hư cấu (fictional), không sử dụng testimonial giả hay số liệu ngụy tạo.
- D08 PASS: Danh tính nhân vật Mira Arden và thông tin liên hệ thống nhất xuyên suốt.

## Quy tắc Animation (05/10/2026)

- Mặc định BẬT trên mọi trình duyệt (đã xác thực hoạt động trơn tru trên Edge và Cốc Cốc).
- Hiệu ứng reveal scroll hữu hạn (550ms), không có vòng lặp vô hạn gây hao tổn tài nguyên.
- Không tự động vô hiệu hóa animation theo cờ `prefers-reduced-motion` của HĐH theo đúng chỉ đạo mới nhất từ chủ sản phẩm.

## Tổng kết ngoại lệ & Trạng thái bàn giao

1. **Ngoại lệ W01/W03 (Tài sản raster bổ sung):** Bổ sung 2 file `assets/img/mira-portrait.webp` và `assets/img/mira-avatar.webp` cho chân dung và avatar nhân vật theo yêu cầu thiết kế portfolio.
2. **Ngoại lệ W06 (Dung lượng ZIP):** Gói ZIP đạt 91.273 byte (vượt ngưỡng chuẩn 20.480 byte do chứa 2 ảnh WebP chất lượng cao). Đây là ngoại lệ kỹ thuật tất yếu khi đưa ảnh đồ họa chất lượng cao vào template độc lập không phụ thuộc CDN bên ngoài.
3. **Bản quyền hình ảnh:** Chủ sản phẩm điền thông tin bản quyền cuối cùng tại `LICENCE.txt` trước khi đưa lên sàn thương mại.
