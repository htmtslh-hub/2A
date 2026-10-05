# Tidal 1.1.0 — Hồ sơ nghiệm thu

- Quy chuẩn: `WEB-STATIC-1`, `docs/product-standards.md` v1.2. **Có ngoại lệ**: 7 file (thêm `assets/img/hero-ocean.webp`) và ZIP > 20.480 byte. Hồ sơ `WEB-STATIC-IMG-1` (§12) mới là đề xuất, **chưa được chủ sản phẩm duyệt**.
- Ngày kiểm tra: 03/10/2026. Người kiểm tra: AI agent (Antigravity) theo yêu cầu chủ sản phẩm.
- Môi trường: Windows; Chromium 153.0.8010.12 và Firefox 155.0 (Playwright 1.63, headless). Kiểm tra trên **bản giải nén từ ZIP** (`_design/.qa-extracted/tidal`), qua HTTP cục bộ và `file://`.
- Công cụ: `node web/product/giao-dien-web/tools/check-template.mjs tidal --version 1.1.0 --ngoai-le` → [`checks.json`](checks.json), [`screenshots/`](screenshots/). Ảnh chụp đã được xem trực tiếp (1440, 375, 320, menu mở, không JS).
- Hồ sơ cũ [`../2026-10-02-hero/QA.md`](../2026-10-02-hero/QA.md) chỉ kiểm phần hero; hồ sơ này thay thế cho toàn trang.

## Gói cuối

| Mục | Giá trị |
|---|---|
| ZIP | `tidal.zip` — **258.089 byte** (vượt 20.480 do ảnh WebP ~232 KB) |
| SHA-256 | `989fe1f6c42af418826633bad1a1fd438c068cd69bf91efa904fad8f03babe58` |
| Nội dung | `tidal/` + 7 file: `index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/img/hero-ocean.webp`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`. Đường dẫn dùng `/`, đọc lại khớp byte với `source/`. |
| Đóng gói | `tools/dong-goi.mjs tidal --ngoai-le`. |

## Thay đổi trong đợt sửa 03/10/2026 (giữ số phiên bản 1.1.0)

- CUSTOMISE viết lại: đủ 10 bước, 12 prompt, edit map đếm lại theo source hiện tại; bỏ câu khẳng định quyền ảnh.
- README viết lại: token màu đúng (`--cyan #35e0f0`, `--violet #8a72ff`, `--deep #050a1e`), phân biệt phần hoạt động và nội dung mẫu, ghi ngoại lệ ảnh, chỉ ghi trình duyệt đã thử thật.
- CSS: dịch comment tiếng Việt sang tiếng Anh; `.link-quiet` dùng `var(--sea-100)`; `.hero::before` thêm dải tối phía trên và tăng lớp phủ bên trái để chữ/nút trên ảnh đọc rõ; `.hero .glass` nền `rgba(5,18,44,.86)`.
- HTML: SVG icon trang trí còn thiếu được thêm `aria-hidden`.

## Q01–Q13

| Mã | Trạng thái | Bằng chứng / ghi chú |
|---|---|---|
| Q01 Cấu trúc | PASS theo ngoại lệ | 7 file (6 file chuẩn + 1 ảnh WebP), không file tạm/ẩn/thư viện. Ngoại lệ ảnh cần chủ sản phẩm xác nhận (xem Trạng thái cuối). |
| Q02 Responsive | PASS | 1440/820/375/320: `scrollWidth = clientWidth` ở cả hai trình duyệt, cả khi menu mở; 0 vùng chạm < 44px. |
| Q03 Tương tác | PASS | 22 link đều có tên và đích tồn tại (bảng dưới). Menu (breakpoint 960px): `aria-controls`, mở, Escape đóng và trả focus, chọn link đóng, resize reset. Không `href="#"`, không `<form>`. |
| Q04 Bàn phím | PASS | Skip link hiện khi focus và đưa vào `main`; menu ẩn không nhận Tab; Shift+Tab quay lại đúng. Viền focus 3px `#35e0f0`, 10.61:1. |
| Q05 Cấu trúc trợ năng | PASS | `lang="en"`, 1 h1, không nhảy cấp heading, đủ header/nav/main/footer, không ID trùng, 0 SVG thiếu `aria-hidden`. axe (wcag2a/aa, 21aa): 0 vi phạm. |
| Q06 Tương phản | PASS (có mục cần xem bằng mắt) | Chromium 63 cặp (62 đo bằng điểm ảnh), Firefox 66 cặp; 0 lỗi ở trạng thái thường và hover. Thấp nhất: "Raw data, no summaries" 4.87–4.93:1 (ngưỡng 4.5), "Leave it better." (chữ lớn) 3.3–3.34:1 (ngưỡng 3). 11 phần tử đè ảnh raster (pill, h1, lede, 2 nút hero, thẻ "Reef 14 · today", 2 thẻ số liệu) đã đo điểm ảnh và đạt; đã xem ảnh 1440 sau khi tăng lớp phủ — đọc rõ. Kết quả trên ảnh phụ thuộc ảnh nền: nếu khách thay ảnh phải kiểm lại (đã ghi trong CUSTOMISE). |
| Q07 Dự phòng | PASS | Tắt JS + chặn Google Fonts ở 320px: đủ nội dung, link menu hiện, không tràn. Reduced motion: mọi phần tử hiện, 0 animation chạy. Không còn chuyển động sau 5s. Zoom 200% (720 CSS px): không tràn. `file://` 1440 và offline 320: đủ nội dung, có style. |
| Q08 Trình duyệt | PASS (Chromium, Firefox) | Chromium 153.0.8010.12, Firefox 155.0 trên Windows. **Safari và Edge: NOT TESTED.** |
| Q09 Kỹ thuật | PASS theo ngoại lệ | 0 lỗi console, 0 request hỏng; tài nguyên ngoài duy nhất là Google Fonts. ZIP 258.089 byte do ảnh. |
| Q10 Tài liệu/quyền | **FAIL — chờ chủ sản phẩm** | CUSTOMISE: 10 bước, 12 prompt, 0 sai số đếm edit map, 0 marker bắt khách tự điền trong prompt. README đúng thực tế. **Nhưng `LICENCE.txt`:** (1) mục 7 ghi "tested in current Chrome, Firefox, Safari and Edge" — Safari/Edge chưa thử; (2) mục 4 chỉ nói "The illustrations are inline SVG" — **không nói gì về `hero-ocean.webp`** (nguồn và quyền dùng/bán lại của ảnh chưa có hồ sơ). Agent không được tự sửa LICENCE. Font Space Grotesk và Manrope: đã xác minh SIL OFL 1.1 tại `github.com/google/fonts`, khớp LICENCE mục 5. Chưa thử prompt với AI thật. |
| Q11 Gói cuối | PASS | Tên, SHA-256, 7 file sau giải nén; mở được qua `file://` và HTTP từ bản giải nén. |
| Q12 Cửa hàng | NOT TESTED | Chưa tạo lại preview/demo công khai, chưa deploy, **chưa thử luồng mua → tải ZIP thật**. |
| Q13 Thiết kế | PASS | Xem D01–D08. |

## D01–D08

| Mã | Trạng thái | Ghi chú |
|---|---|---|
| D01 | PASS | Headline "Dive in. Look closer. Leave it better.", mô tả công việc bảo tồn san hô, CTA "Sponsor a plot" và "See the programmes". |
| D02 | PASS | (1) Ảnh đại dương làm nền hero với thẻ số liệu dạng kính; (2) bảng màu cyan/tím trên nền biển sâu, chữ Space Grotesk. |
| D03 | PASS | Hero → chương trình → số liệu/nghiên cứu → tài trợ → footer. |
| D04 | PASS | Token trong `:root`, 2 họ font, nút cùng vai trò dùng chung style. |
| D05 | PASS (ghi chú) | Không cắt chữ/chồng nội dung ở 4 khổ. Ở 375/320 các thẻ số liệu nằm đè lên phần lớn hình rùa trong ảnh — chủ ý bố cục, không che chữ. |
| D06 | PASS | Nội dung tiếng Anh cụ thể về giám sát và trồng lại san hô, không lorem ipsum. |
| D07 | PASS | Số liệu (1,204 rạn, 3,908 san hô, 26.4°C…) là nội dung mẫu; `[YOUR PRICE]` và `[YOUR NUMBER]` cố ý để khách thay, CUSTOMISE hướng dẫn thay/xoá. |
| D08 | PASS | Số rạn/đảo và tên chương trình thống nhất giữa các section. |

## Bảng tương tác

| Nhãn | Vị trí | Loại | Đích | Trạng thái |
|---|---|---|---|---|
| Skip to content | đầu trang | link | `#main` | PASS |
| Tidal — home | header | link | `index.html` | PASS |
| Programmes / Reefs / Research / Stories / Contact | menu | link | `#programmes`, `#impact`, `#sponsor` | PASS |
| Nút menu | header ≤960px | button | mở/đóng menu | PASS |
| Adopt a reef | header | link | `#sponsor` | PASS |
| Sponsor a plot, See the programmes | hero | link | `#sponsor`, `#programmes` | PASS |
| Adopt a reef, Ask for our annual report | tài trợ | link | `mailto:hello@example.com` | PASS (mở ứng dụng email) |
| 9 link footer (Mapping … Contact) | footer | link | `#programmes` / `#impact` / `#sponsor` | PASS |
| hello@example.com | footer | link | `mailto:` | PASS |

## Trạng thái cuối

**CHỜ KIỂM TRA / CHƯA ĐẠT ĐỂ PHÁT HÀNH**: còn (1) ngoại lệ ảnh/dung lượng cần chủ sản phẩm duyệt (hoặc duyệt hồ sơ `WEB-STATIC-IMG-1`); (2) Q10 — LICENCE mục 7 (trình duyệt) và mục 4 (quyền ảnh `hero-ocean.webp`) do chủ sản phẩm sửa, kèm bằng chứng nguồn ảnh; (3) Q12 luồng tải sau thanh toán, preview/demo công khai; (4) Safari/Edge chưa thử. Mọi kiểm tra tự động khác PASS.
