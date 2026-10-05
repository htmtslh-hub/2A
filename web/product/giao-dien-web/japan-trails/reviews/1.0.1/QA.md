# Japan Trails 1.0.1 — Hồ sơ bản vá (LICENCE + vùng chạm)

- Bản trước: [`../1.0.0/QA.md`](../1.0.0/QA.md), [`../1.0.0/font-audit.md`](../1.0.0/font-audit.md). Ngày: 03/10/2026. Người kiểm tra: AI agent (Antigravity).
- Chủ sản phẩm cho phép: "sửa LICENCE như em đề xuất", sau đó "em làm nốt đi" (đồng ý sửa LICENCE mục 4 và lỗi vùng chạm).
- 1.0.1 chưa từng giao cho khách trước khi có các thay đổi dưới đây, nên giữ số phiên bản 1.0.1.

## Thay đổi

| File | Thay đổi |
|---|---|
| `LICENCE.txt` mục 4 | Đổi tên thành "DEMO CONTENT AND IMAGES". Bỏ câu sai "The illustrations are inline SVG". Thêm điều khoản cho 2 ảnh AI `fuji.webp`, `kyoto.webp` (nguồn: built-in ImageGen, theo QA 1.0.0): cảnh tưởng tượng, không được giới thiệu như ảnh tư liệu; được dùng trong website hoàn chỉnh; không phân phối lại thành ảnh stock hoặc gói ảnh riêng. |
| `LICENCE.txt` mục 5 | Thêm Barlow Condensed — SIL OFL 1.1, nguồn `https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/OFL.txt` (đã xác minh trong font-audit.md). |
| `assets/css/style.css` | `.site-nav a`: thêm `min-width:44px; justify-content:center` → link "Home" từ 36×44 lên 44×44 px. Chỉ sửa đúng quy tắc này, giữ nguyên dạng nén sẵn có của file. |
| `README.md` | Version 1.0.0 → 1.0.1; bỏ "font-license verification is pending". |

Điều khoản bán lại/bảo hành khác không đổi.

## Gói cuối

| Mục | Giá trị |
|---|---|
| ZIP | `japan-trails.zip` — **879.268 byte** (ngoại lệ ảnh + W06 đã duyệt từ 1.0.0) |
| SHA-256 | `caf65c9af7b53fbda28fd461cb7a14e3e6744934fd20eaf4d9efd3340606b93f` |
| Nội dung | 8 file, đọc lại khớp byte với `source/`. |
| Bản cũ 1.0.0 | Sao lưu tại `scratch/zip-backup/japan-trails-1.0.0.zip` (thư mục brain của phiên). |

## Kiểm tra

- `node web/product/giao-dien-web/tools/check-template.mjs japan-trails --version 1.0.1 --ngoai-le` (Chromium 153.0.8010.12, Firefox 155.0) → [`checks.json`](checks.json): **tất cả kiểm tra tự động PASS**. Lần chạy trước khi sửa CSS có 2 mục FAIL Q02 (link "Home" rộng 36px ở 1440, cả hai trình duyệt); nay hết lỗi.
- Đã xem `screenshots/chromium-1440.png` và `chromium-menu-open.png`: header và menu không vỡ, khoảng cách các link không đổi rõ rệt.
- Microsoft Edge: xem [`edge-check.json`](edge-check.json) (nếu có) và mục Edge bên dưới.
- Demo công khai `web/public/demos/japan-trails/` đã đồng bộ với source 1.0.1 (bản demo cũ sao lưu tại `scratch/demo-backup-20261003/`).

## Còn mở

- Safari: NOT TESTED (không có trên Windows).
- Q12 luồng mua → tải ZIP trên cửa hàng: NOT TESTED; chưa deploy.
- Thử prompt CUSTOMISE với AI thật: NOT TESTED.

## Trạng thái cuối

**CHỜ KIỂM TRA** (còn Q12 và Safari). LICENCE mục 4, 5 và Q02 đã khắc phục.

## Bổ sung 03/10/2026 — Microsoft Edge

Đã chạy trên **Microsoft Edge 154.0.4258.53** (Playwright channel `msedge`, headless), mở bản giải nén từ ZIP qua `file://`. Kết quả ở 1440/820/375/320:
- không tràn ngang, đúng 1 h1;
- 0 lỗi console/request (trừ Google Fonts);
- không còn phần tử opacity 0 sau khi cuộn hết trang;
- menu (≤820px) mở với `aria-expanded=true`, Escape đóng và trả focus về nút.

Kết quả: **PASS** → [`edge-check.json`](edge-check.json), ảnh `screenshots/edge-1440.png`, `edge-375.png`. Q08 nay: Chromium, Firefox, Edge PASS; **Safari NOT TESTED** (không có trên Windows). LICENCE mục 7 vẫn ghi "other browsers have not been separately tested" — thận trọng hơn thực tế; không sửa để khỏi đổi gói thêm lần nữa.
