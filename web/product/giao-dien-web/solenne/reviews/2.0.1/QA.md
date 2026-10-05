# Solenne 2.0.1 — Hồ sơ nghiệm thu

- Quy chuẩn: `WEB-STATIC-1`, `docs/product-standards.md` v1.2. **Có ngoại lệ** (ghi "Approved exceptions" trong [`../2.0.0/QA.md`](../2.0.0/QA.md)): 9 file (3 ảnh WebP tạo bằng ImageGen) và ZIP > 20.480 byte.
- Ngày kiểm tra: 03/10/2026. Người kiểm tra: AI agent (Antigravity) theo yêu cầu chủ sản phẩm.
- Môi trường: Windows; Chromium 153.0.8010.12 và Firefox 155.0 (Playwright 1.63, headless). Kiểm tra trên **bản giải nén từ ZIP**, qua HTTP cục bộ và `file://`.
- Công cụ: `node web/product/giao-dien-web/tools/check-template.mjs solenne --version 2.0.1 --ngoai-le` → [`checks.json`](checks.json), [`screenshots/`](screenshots/). Đã xem ảnh 375.
- Lý do có bản 2.0.1: bản 2.0.0 để Q04/Q05 "NOT TESTED". Chạy bộ kiểm tra đầy đủ trên ZIP 2.0.0 ([`../2.0.0/recheck-2026-10-03/checks.json`](../2.0.0/recheck-2026-10-03/checks.json)) → bàn phím PASS nhưng **tương phản FAIL**: chữ nhỏ màu `#a65e49` đạt 3.84:1 ("A conversation, just for you" trên nền `#f1e2d7`), 4.45–4.49:1 (eyebrow hero, "01 / THE FIRST LAYER", hover "Home"); axe báo `color-contrast` 3 nút.

## Gói cuối

| Mục | Giá trị |
|---|---|
| ZIP | `solenne.zip` — **380.264 byte** (bản 2.0.0: 380.576 byte, SHA `169be174…`, đã lưu bản sao ngoài repo) |
| SHA-256 | `fd2d6855277c69d35f2e714962f56743ac2976f99b52f56ac1bc17715ef3e8a1` |
| Nội dung | `solenne/` + 9 file: `index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/img/hero.webp`, `skin.webp`, `gift.webp`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`. Đường dẫn `/`, đọc lại khớp byte với `source/`. |
| Đóng gói | `tools/dong-goi.mjs solenne --ngoai-le`. |

## Thay đổi so với 2.0.0

- `--accent-text` (đã khai báo nhưng chưa dùng) đổi `#a65e49` → `#94503d`, và dùng cho chữ nhỏ: `.eyebrow`, `.product-number`/`.journal article>span`, hover menu/`.text-link`, chữ `.button--outline`. Nền nút, chữ `em` cỡ lớn, logo và viền focus giữ `--accent #a65e49`.
- README: số phiên bản 2.0.1. Không đổi HTML, JS, CUSTOMISE, LICENCE.

## Q01–Q13

| Mã | Trạng thái | Bằng chứng / ghi chú |
|---|---|---|
| Q01 Cấu trúc | PASS theo ngoại lệ | 9 file, không file tạm/ẩn/thư viện. |
| Q02 Responsive | PASS | 1440/820/375/320: `scrollWidth = clientWidth` ở cả hai trình duyệt, cả khi menu mở; 0 vùng chạm < 44px. |
| Q03 Tương tác | PASS | 18 link có tên và đích tồn tại (bảng dưới). Menu (breakpoint 950px): `aria-controls`, mở, Escape đóng và trả focus, chọn link đóng, resize reset. Không `href="#"`, không `<form>`. |
| Q04 Bàn phím | PASS | Skip link hiện khi focus và đưa vào `main`; menu ẩn không nhận Tab; Shift+Tab quay lại đúng. Viền focus 3px `#a65e49`, 4.01:1 (ngưỡng thành phần giao diện 3:1). |
| Q05 Cấu trúc trợ năng | PASS | `lang="en"`, 1 h1, không nhảy cấp heading, đủ header/nav/main/footer, không ID trùng, 0 SVG lỗi. axe (wcag2a/aa, 21aa): 0 vi phạm. |
| Q06 Tương phản | PASS | 20 cặp (6 đo bằng điểm ảnh) ở trạng thái thường + hover, 0 lỗi. Thấp nhất "A conversation, just for you" 4.78:1, nút "Explore skincare"/"Find your ritual" 4.86:1, eyebrow hero 5.53:1. Không có chữ đè ảnh raster. |
| Q07 Dự phòng | PASS | Tắt JS + chặn font ở 320px: đủ nội dung, link menu hiện, không tràn. Reduced motion: mọi phần tử hiện, 0 animation. Không còn chuyển động sau 5s. Zoom 200%: không tràn. `file://` và offline 320: đọc được, có style. |
| Q08 Trình duyệt | PASS (Chromium, Firefox) | **Safari và Edge: NOT TESTED** (README đã ghi đúng; LICENCE không khẳng định đã thử). |
| Q09 Kỹ thuật | PASS theo ngoại lệ / **ghi chú W08** | 0 lỗi console, 0 request hỏng. **`style.css` chỉ 12 dòng (một dòng ~10 KB) và `index.html` 15 dòng — dạng nén, trái W08 "không minify".** Chưa định dạng lại vì sẽ đổi toàn bộ file và edit map; cần chủ sản phẩm quyết. |
| Q10 Tài liệu/quyền | PASS (tự động) | CUSTOMISE: 10 bước, 12 prompt, 0 sai số đếm edit map, 0 marker bắt khách tự điền. Chưa thử prompt với AI thật. Quyền ảnh ImageGen ghi trong README; LICENCE không đổi. |
| Q11 Gói cuối | PASS | Tên, SHA-256, 9 file sau giải nén; mở được qua `file://` và HTTP. |
| Q12 Cửa hàng | NOT TESTED | Chưa đồng bộ demo/preview công khai với 2.0.1, chưa deploy, chưa thử luồng mua → tải ZIP thật. |
| Q13 Thiết kế | PASS | D01–D08 giữ như [`../2.0.0/QA.md`](../2.0.0/QA.md); màu chữ nhỏ đậm hơn một chút, đã xem ảnh 375 — không đổi bố cục. |

## Bảng tương tác

| Nhãn | Vị trí | Loại | Đích | Trạng thái |
|---|---|---|---|---|
| Skip to content, Solenne home | đầu trang | link | `#main` | PASS |
| Home / Collection / Ingredients / Our story / Journal | menu | link | `#main`, `#collection`, `#ingredients`, `#philosophy`, `#journal` | PASS |
| Nút Menu | header ≤950px | button | mở/đóng `#site-nav` | PASS |
| Find your ritual ↗ | header | link | `#contact` | PASS |
| Explore skincare, Our philosophy, Find your ritual → | hero, câu chuyện | link | `#collection`, `#philosophy`, `#contact` | PASS |
| Enquire about skincare ×2, Find your ritual (liên hệ) | sản phẩm, liên hệ | link | `mailto:hello@example.com?subject=…` | PASS (mở ứng dụng email) |
| SOLENNE, Our philosophy, Contact us, Back to top | footer | link | `#main`, `#philosophy`, `mailto:` | PASS |

## Trạng thái cuối

**CHỜ KIỂM TRA / CHƯA ĐẠT ĐỂ PHÁT HÀNH**: còn Q12 (đồng bộ demo/preview, luồng tải sau thanh toán), Safari/Edge chưa thử, và quyết định về W08 (file dạng nén). Mọi kiểm tra tự động PASS.

## Bổ sung 03/10/2026 — Microsoft Edge

Đã chạy trên **Microsoft Edge 154.0.4258.53** (Playwright channel `msedge`, headless), mở bản giải nén từ ZIP qua `file://`. Kết quả ở 1440/820/375/320:
- không tràn ngang, đúng 1 h1;
- 0 lỗi console/request (trừ Google Fonts);
- không còn phần tử opacity 0 sau khi cuộn hết trang;
- menu (≤820px) mở với `aria-expanded=true`, Escape đóng và trả focus về nút.

Kết quả: **PASS** → [`edge-check.json`](edge-check.json), ảnh `screenshots/edge-1440.png`, `edge-375.png`. Q08 nay: Chromium, Firefox, Edge PASS; **Safari NOT TESTED** (không có trên Windows). LICENCE mục 7 vẫn ghi "other browsers have not been separately tested" — thận trọng hơn thực tế; không sửa để khỏi đổi gói thêm lần nữa.

Demo công khai `web/public/demos/solenne/` đã đồng bộ với source 2.0.1, gồm màu `--accent-text` mới (bản cũ sao lưu tại `scratch/demo-backup-20261003/`). Ảnh preview `web/public/previews/solenne.webp` chưa chụp lại.
