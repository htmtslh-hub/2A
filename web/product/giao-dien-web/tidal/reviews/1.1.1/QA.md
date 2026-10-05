# Tidal 1.1.1 — Hồ sơ nghiệm thu (bản vá LICENCE)

- Bản trước: [`../1.1.0/QA.md`](../1.1.0/QA.md). Bản này chỉ sửa tài liệu, không đổi HTML/CSS/JS/ảnh, nên mọi mục Q01–Q09, Q11, Q13, D01–D08 giữ kết quả của 1.1.0 và đã chạy lại tự động.
- Ngày: 03/10/2026. Người kiểm tra: AI agent (Antigravity). Chủ sản phẩm cho phép sửa LICENCE: "sửa LICENCE như em đề xuất".
- Công cụ: `node web/product/giao-dien-web/tools/check-template.mjs tidal --version 1.1.1 --ngoai-le` (Chromium 153.0.8010.12, Firefox 155.0) → [`checks.json`](checks.json), [`screenshots/`](screenshots/). Kết quả: **tất cả kiểm tra tự động PASS**.

## Thay đổi

| File | Thay đổi |
|---|---|
| `LICENCE.txt` mục 4 | Đổi tên thành "DEMO CONTENT AND IMAGES". Thêm điều khoản cho ảnh đi kèm `assets/img/hero-ocean.webp`: ảnh tạo bằng AI, cảnh tưởng tượng; được dùng trong website hoàn chỉnh theo licence này; không được phân phối lại thành ảnh stock hoặc gói ảnh riêng. Nguồn ảnh theo [`../2026-10-02-hero/QA.md`](../2026-10-02-hero/QA.md): "built-in ImageGen output selected by owner". |
| `LICENCE.txt` mục 7 | Bỏ câu "tested in current Chrome, Firefox, Safari and Edge" (sai: Safari/Edge chưa thử). Nay ghi: đã thử Chromium và Firefox; trình duyệt khác chưa thử riêng. |
| `CUSTOMISE.md` | Dòng phiên bản của edit map: 1.1.0 → 1.1.1 (số đếm không đổi, checker xác nhận 0 sai số). |

Điều khoản bán lại/bảo hành khác không đổi.

## Gói cuối

| Mục | Giá trị |
|---|---|
| ZIP | `tidal.zip` — **258.257 byte** |
| SHA-256 | `832d26167a182040ab79bca489d504f23d2144659675fd0b7d4e73c39ff76da8` |
| Nội dung | 7 file, đọc lại khớp byte với `source/`. Ngoại lệ ảnh `hero-ocean.webp` + W06 (đã duyệt từ 1.1.0). |
| Bản cũ 1.1.0 | Sao lưu tại `scratch/zip-backup/tidal-1.1.0.zip` (thư mục brain của phiên). |

## Thay đổi trạng thái

| Mã | 1.1.0 | 1.1.1 |
|---|---|---|
| Q10 Tài liệu/quyền | FAIL (LICENCE thiếu ảnh, ghi sai trình duyệt) | **PASS** — đã đọc lại LICENCE sau khi sửa; README/CUSTOMISE không mâu thuẫn. |
| Q08 Trình duyệt | PASS Chromium/Firefox; Safari, Edge NOT TESTED | Không đổi. |
| Q12 Cửa hàng | NOT TESTED | Không đổi. Demo `web/public/demos/tidal/` đã đồng bộ (xem mục bổ sung cuối file). |

## Trạng thái cuối

**CHỜ KIỂM TRA**: còn Q12 (luồng mua → tải ZIP trên cửa hàng, chưa deploy) và Safari chưa thử. Edge đã PASS (mục bổ sung).

## Bổ sung 03/10/2026 — Microsoft Edge

Đã chạy trên **Microsoft Edge 154.0.4258.53** (Playwright channel `msedge`, headless), mở bản giải nén từ ZIP qua `file://`. Kết quả ở 1440/820/375/320:
- không tràn ngang, đúng 1 h1;
- 0 lỗi console/request (trừ Google Fonts);
- không còn phần tử opacity 0 sau khi cuộn hết trang;
- menu (≤820px) mở với `aria-expanded=true`, Escape đóng và trả focus về nút.

Kết quả: **PASS** → [`edge-check.json`](edge-check.json), ảnh `screenshots/edge-1440.png`, `edge-375.png`. Q08 nay: Chromium, Firefox, Edge PASS; **Safari NOT TESTED** (không có trên Windows). LICENCE mục 7 vẫn ghi "other browsers have not been separately tested" — thận trọng hơn thực tế; không sửa để khỏi đổi gói thêm lần nữa.

Demo công khai `web/public/demos/tidal/` đã đồng bộ với source 1.1.1 (bản cũ sao lưu tại `scratch/demo-backup-20261003/`).
