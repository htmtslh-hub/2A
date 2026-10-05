# Keystead 1.0.0 — Hồ sơ nghiệm thu

- Quy chuẩn: `WEB-STATIC-1`, `docs/product-standards.md` v1.2. **Ngoại lệ được chủ sản phẩm chấp nhận** trong yêu cầu ngày 03/10/2026 ("nếu cần ảnh em tự tạo nhé"): 7 ảnh WebP cục bộ → 13 file và ZIP > 20.480 byte (thay W01/W03/W06). Áp dụng tự nguyện các ngưỡng đề xuất `WEB-STATIC-IMG-1` (§12.1, chưa duyệt chính thức).
- Brief đã chốt: [`BRIEF.md`](BRIEF.md). Ngày kiểm tra: 03/10/2026. Người kiểm tra: AI agent (Antigravity).
- Môi trường: Windows; Chromium 153.0.8010.12 và Firefox 155.0 (Playwright 1.63, headless). Kiểm tra trên **bản giải nén từ ZIP**, qua HTTP cục bộ và `file://`.
- Công cụ: `node web/product/giao-dien-web/tools/check-template.mjs keystead --version 1.0.0 --ngoai-le` → [`checks.json`](checks.json), [`screenshots/`](screenshots/). Đã xem ảnh 1440, 375, menu mở, không JS + không font 320.

## Gói cuối

| Mục | Giá trị |
|---|---|
| ZIP | `keystead.zip` — **416.065 byte** (< 1 MiB) |
| SHA-256 | `c65f53fe807e575bca75bb34811341c8d19c744f982fff41faf7a47d37ec8724` |
| Nội dung | `keystead/` + 6 file chuẩn (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) + 7 ảnh `assets/img/`. Đường dẫn `/`, đọc lại khớp byte với `source/`. |
| Đóng gói | `tools/dong-goi.mjs keystead --ngoai-le` |

### Ảnh (nguồn: tạo bằng AI — công cụ generate_image — trong phiên làm việc ngày 03/10/2026, chuyển WebP bằng sharp)

| File | Kích thước | Byte | Dùng |
|---|---|---:|---|
| `hero-street.webp` | 1376×768 | 120.854 | Nền hero, `alt=""`, có màu nền dự phòng `--hero-fallback` |
| `apt-skyline.webp` | 800×600 | 36.620 | Skyline Two-Bed |
| `apt-sash.webp` | 800×600 | 35.844 | Garden Square Flat |
| `apt-studio.webp` | 800×600 | 39.804 | Quay Street Studio |
| `house-garden.webp` | 800×600 | 52.086 | Linden Row Townhouse |
| `house-living.webp` | 800×600 | 44.716 | Hearth Lane House |
| `house-loft.webp` | 800×600 | 66.134 | Mill Loft House |

Tổng 395.058 byte; mọi ảnh ≤ 300 KB, có `width`/`height`, 6 ảnh tin dùng `loading="lazy"` và `alt` mô tả. Ảnh minh hoạ nơi tưởng tượng; LICENCE mục 4 và README nói rõ.

## Q01–Q13

| Mã | Trạng thái | Bằng chứng / ghi chú |
|---|---|---|
| Q01 Cấu trúc | PASS theo ngoại lệ | 6 file chuẩn + 7 ảnh; không file tạm/ẩn/thư viện. |
| Q02 Responsive | PASS | 1440/820/375/320: `scrollWidth = clientWidth` ở cả hai trình duyệt, cả khi menu mở; 0 vùng chạm < 44px. |
| Q03 Tương tác | PASS | 30 link có tên và đích tồn tại (bảng dưới). Menu (960px): `aria-controls`, mở, Escape đóng và trả focus, chọn link đóng, resize reset. Không `href="#"`, không `<form>`, không ô tìm kiếm. |
| Q04 Bàn phím | PASS | Skip link hiện khi focus và đưa vào `main`; menu ẩn không nhận Tab; Shift+Tab đúng. Viền focus 3px: xanh `#2563eb` trên nền sáng, `#93c5fd` trên hero/band/footer tối (đo trên hero 7.4:1). |
| Q05 Cấu trúc trợ năng | PASS | `lang="en"`, 1 h1, heading không nhảy cấp, header/nav/main/footer, không ID trùng, 0 SVG lỗi. Link mỗi tin có `aria-label` chứa chữ hiển thị + tên căn. axe (wcag2a/aa, 21aa): 0 vi phạm. |
| Q06 Tương phản | PASS | Chromium 19 cặp + hover, 0 lỗi. Chữ trên ảnh hero đo bằng điểm ảnh (I05): pill 14.9:1, h1 7.6:1 (ngưỡng 3), mô tả 9.3:1, nút "Start browsing" 17.7:1; đã xem ảnh 1440/375/320 — đọc rõ. Thấp nhất ngoài hero: nhãn "Available …" 5.48:1, giá 6.1:1. Lưu ý: checker không gắn cờ `overImage` cho `<img>` (chỉ cho background-image) nên phần hero được kiểm qua số đo điểm ảnh + nhìn ảnh. |
| Q07 Dự phòng | PASS | Không JS + chặn font 320px: đủ nội dung, menu hiện, không tràn. Reduced motion: mọi phần tử hiện, 0 animation. Không còn chuyển động sau 5s. Zoom 200%: không tràn. `file://` và offline 320: đọc được. Mất ảnh (I06, chặn mọi `.webp`, Chromium 1440 và 320): không tràn, đủ 30 link và 6 thẻ tin, hero hiện nền `#243041` và chữ trắng đọc rõ (`screenshots/chromium-noimg-1440.png`, `-320.png`); Chromium hiện biểu tượng ảnh hỏng nhỏ ở góc hero — chấp nhận được. |
| Q08 Trình duyệt | PASS (Chromium, Firefox) | **Safari và Edge: NOT TESTED** (README/LICENCE ghi đúng). |
| Q09 Kỹ thuật | PASS theo ngoại lệ | 0 lỗi console, 0 request hỏng; tài nguyên ngoài duy nhất là Google Fonts. Mã không nén (W08), comment tiếng Anh. |
| Q10 Tài liệu/quyền | PASS — **chủ sản phẩm đã xác nhận LICENCE ngày 03/10/2026** | CUSTOMISE: 10 bước, 12 prompt, 0 sai số đếm edit map (33 dòng), 0 marker bắt khách tự điền. README nêu phần hoạt động / mẫu / thanh duyệt không phải tìm kiếm. Font Plus Jakarta Sans: OFL (`github.com/google/fonts/ofl/plusjakartasans/METADATA.pb`, `license: "OFL"`). LICENCE mới theo khung 7 mục + chủ thể bản quyền của Pinehaven; mục 4 cấp quyền dùng ảnh AI trong site hoàn chỉnh — điều khoản này đã được chủ sản phẩm đồng ý; LICENCE giữ nguyên nên ZIP/SHA không đổi. Chưa thử prompt với AI thật. |
| Q11 Gói cuối | PASS | Tên, SHA-256, 13 file sau giải nén; mở được qua `file://` và HTTP. |
| Q12 Cửa hàng | NOT TESTED (một phần đã làm) | Ô `t3`, slug `keystead`, cat `shop`, vi/en/zh trong `web/src/lib/real-templates.ts` (thay Dune Pass). Preview `web/public/previews/keystead.webp` chụp từ mã giao; demo `web/public/demos/keystead/`. Hướng dẫn riêng trong `template-guides.ts`, `customer-guide.json` đã đồng bộ. **Chưa build/chạy cửa hàng, chưa deploy, chưa thử luồng mua → tải ZIP.** |
| Q13 Thiết kế | PASS | Xem D01–D08. |

## D01–D08

| Mã | Trạng thái | Ghi chú |
|---|---|---|
| D01 | PASS | "Browse homes, apartments & rentals with ease", mô tả 4 khu Northbank, CTA "Start browsing" + "Book a viewing". |
| D02 | PASS | (1) Hero ảnh full-bleed + thanh duyệt dạng viên thuốc nổi đè mép hero; (2) thẻ tin có giá hổ phách cùng hàng tiêu đề, thông số, nhãn ngày trống, link email riêng. |
| D03 | PASS | Mục đích từng section trong BRIEF.md. |
| D04 | PASS | Token trong `:root`, 1 họ font, `.btn--dark`/`.btn--light` dùng chung. |
| D05 | PASS | Không cắt chữ/chồng nội dung ở 4 khổ (đã xem ảnh). Ảnh xám trong một bản chụp nhanh 375 trước đó là do lazy-load lúc chụp, không phải lỗi bố cục. |
| D06 | PASS | Nội dung tiếng Anh cụ thể về cho thuê nhà, không lorem ipsum. |
| D07 | PASS | Bỏ sao đánh giá của ảnh mẫu; không có khách hàng/logo thật; demo công khai ở README, LICENCE, CUSTOMISE và footer. |
| D08 | PASS | 6 căn = pill hero; thanh duyệt 3+3; khu vực 1+2+1+2 khớp các thẻ tin. |

## Bảng tương tác

| Nhãn | Vị trí | Loại | Đích | Trạng thái |
|---|---|---|---|---|
| Skip to content | đầu trang | link | `#main` | PASS |
| Keystead — home | header | link | `index.html` | PASS |
| Apartments / Houses / Neighbourhoods / How renting works / Landlords | menu | link | `#apartments`, `#houses`, `#areas`, `#how`, `#landlords` | PASS |
| Book a viewing | menu | link | `#contact` | PASS |
| Nút Menu | header ≤960px | button | mở/đóng `#site-nav` | PASS |
| Start browsing | hero | link | `#apartments` | PASS |
| Apartments / Houses / Neighbourhoods / Lease terms / Book a viewing | thanh duyệt | link | `#apartments`, `#houses`, `#areas`, `#how`, `#contact` | PASS (liên kết, không phải tìm kiếm) |
| Ask about this home ×6 | thẻ tin | link | `mailto:…?subject=Viewing: <tên căn>` | PASS (mở ứng dụng email) |
| Talk to our lettings team | chủ nhà | link | `mailto:…?subject=Letting my property` | PASS |
| Email to book a viewing, hello@example.com | liên hệ | link | `mailto:` | PASS |
| Keystead — back to top + 6 link footer | footer | link | `#main`, các section | PASS |

## Việc liên quan: xoá Dune Pass

Theo yêu cầu, Dune Pass bị gỡ khỏi dự án: thư mục sản phẩm, demo `web/public/demos/dune-pass/` và preview `dune-pass.webp` được **chuyển** (không xoá cứng) sang `C:\Users\Lenovo\.gemini\antigravity\brain\57d748ba-c361-49db-8ef7-dbe0a1192382\scratch\dune-pass-removed\`. Tham chiếu đã đổi sang keystead: `real-templates.ts` (t3), `template-guides.ts`, `pages-content.ts`, `sync-demos.mjs`, `sync-customer-guide.mjs` → `customer-guide.json`, `check-live-demos.mjs`, `.claude/launch.json`, `customer-guide-implementation.md`.

## Trạng thái cuối

**CHỜ KIỂM TRA**: còn Q12 (build/chạy cửa hàng, deploy, luồng tải sau thanh toán) và Safari/Edge chưa thử. LICENCE mục 4 (quyền ảnh AI) và ngoại lệ ảnh: chủ sản phẩm đã xác nhận ngày 03/10/2026. Mọi kiểm tra tự động PASS; `npx tsc --noEmit` trong `web/` PASS sau khi đổi catalog.

## Bổ sung 03/10/2026 — Microsoft Edge

Đã chạy trên **Microsoft Edge 154.0.4258.53** (Playwright channel `msedge`, headless), mở bản giải nén từ ZIP qua `file://`. Kết quả ở 1440/820/375/320:
- không tràn ngang, đúng 1 h1;
- 0 lỗi console/request (trừ Google Fonts);
- không còn phần tử opacity 0 sau khi cuộn hết trang;
- menu (≤820px) mở với `aria-expanded=true`, Escape đóng và trả focus về nút.

Kết quả: **PASS** → [`edge-check.json`](edge-check.json), ảnh `screenshots/edge-1440.png`, `edge-375.png`. Q08 nay: Chromium, Firefox, Edge PASS; **Safari NOT TESTED** (không có trên Windows). LICENCE mục 7 vẫn ghi "other browsers have not been separately tested" — thận trọng hơn thực tế; không sửa để khỏi đổi gói thêm lần nữa.
