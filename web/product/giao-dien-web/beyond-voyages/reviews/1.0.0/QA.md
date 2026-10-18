# Hồ sơ nghiệm thu QA — Beyond Voyages (`beyond-voyages`)

- **Phiên bản quy chuẩn:** `product-standards.md` v1.2.1 (`WEB-STATIC-1` kèm ngoại lệ ảnh cục bộ `--ngoai-le`)
- **Phiên bản sản phẩm:** `1.0.0`
- **Ngày kiểm tra:** `17/10/2026`
- **Môi trường kiểm tra:** Windows (`win32`), Chromium `153.0.8010.12` và Firefox `155.0` qua Playwright thật (`check-template.mjs`), kiểm tra cả `http://127.0.0.1:4338` và `file:///`.
- **Gói đóng gói:** `web/product/giao-dien-web/beyond-voyages/beyond-voyages.zip`
- **Dung lượng ZIP:** `895.888 byte`
- **SHA-256 ZIP:** `8dea4c913ceff51336363378752e27576d1b9898e3351edb2cf894a7b2434187`
- **Trạng thái cuối:** **Đạt theo ngoại lệ W01/W03/W06 (5 ảnh phong cảnh WebP cục bộ tự tạo)**

## 1. Bảng kết quả Q01–Q13

| Mã | Hạng mục | Trạng thái | Bằng chứng thực tế |
|---|---|---|---|
| Q01 | Cấu trúc gói | **PASS (ngoại lệ W01)** | 11 file khớp byte 100% giữa `source/` và bản giải nén (`index.html`, `assets/css/style.css`, `assets/js/main.js`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt` + 5 file `.webp` trong `assets/img/`). |
| Q02 | Responsive & vùng chạm | **PASS** | `scrollWidth === clientWidth` ở cả 4 khổ `1440×900`, `820×1180`, `375×812`, `320×740` trên Chromium và Firefox (`smallTargets: []`, mọi nút/link độc lập >= 44×44 px). Xem `screenshots/chromium-*.png`, `screenshots/firefox-*.png`. |
| Q03 | Tương tác & menu mobile | **PASS** | Breakpoint menu `920px`; mở/đóng đổi `aria-expanded`, bấm link tự đóng, `Escape` đóng và trả focus, resize qua breakpoint tự reset (`open: true`, `escapeClosesAndFocuses: true`, `linkCloses: true`, `resetOnDesktop: true`, `closedBackOnMobile: true`). 5 nút vòng cung điểm đến, 5 chấm phân trang, bộ lọc vùng và nút `Pause motion` hoạt động đầy đủ. |
| Q04 | Bàn phím | **PASS** | Skip link hiện khi nhấn `Tab` và đưa focus vào `<main id="main">`; menu ẩn không nhận `Tab` (`hiddenMenuSkipped: true`, `shiftTabBack: true`); phím mũi tên chuyển cảnh trong `.hero-arc`. |
| Q05 | Cấu trúc trợ năng | **PASS** | `lang="en"`, đúng 1 thẻ `<h1>`, thứ tự heading `h1 -> h2 -> h3` không nhảy bậc, đủ 4 landmark (`header`, `nav`, `main`, `footer`), `badSvg: 0`, `axe: []` (0 vi phạm WCAG 2A/2AA/21AA trên cả Chromium và Firefox). |
| Q06 | Tương phản màu | **PASS** | Viền focus `#ffffff` 3px đạt `19.44:1` trên nền `#071118`. Toàn bộ cặp chữ/nền ở trạng thái thường, hover và đo điểm ảnh trực tiếp trên ảnh nền (`method: "pixels"`) đều đạt trên ngưỡng (`lowContrast: []`). |
| Q07 | Khả năng dự phòng | **PASS** | Zoom 200% (`720×450` @ 2x) không tràn ngang (`scrollWidth: 720 <= 720`); `reducedMotion` và sau 5 giây không còn animation chạy vô hạn; mở qua `file:///`, tắt JS + chặn font ở `320px` và offline `320px` đều hiển thị đầy đủ nội dung và điều hướng. |
| Q08 | Trình duyệt | **PASS** | Đã kiểm trực tiếp trên Chromium `153.0.8010.12` và Firefox `155.0` (cả HTTP và `file:///`). |
| Q09 | Chất lượng kỹ thuật | **PASS** | `console: []`, `network: []`, không lỗi runtime, không 404 tài nguyên cục bộ. Dung lượng từng ảnh WebP: `boathouse-lake.webp` (132.318 B), `cameo-island.webp` (179.946 B), `koh-phi-phi.webp` (193.324 B), `cinque-terre.webp` (191.686 B), `grand-canal.webp` (172.048 B) — tất cả đều < 300 KB. |
| Q10 | Tài liệu & quyền sử dụng | **PASS** | `CUSTOMISE.md` có đủ 10 bước (`steps: 10`), 12 prompt (`prompts: 12`), 0 placeholder bỏ trống trong khối prompt (`unfilledMarkers: []`), 0 sai lệch số đếm chuỗi (`countErrors: []`). Font `Lobster` và `Plus Jakarta Sans` đã xác minh giấy phép SIL OFL 1.1 trong `LICENCE.txt`. |
| Q11 | Gói cuối | **PASS** | `beyond-voyages.zip` (`895.888 byte`, SHA-256 `8dea4c913ceff51336363378752e27576d1b9898e3351edb2cf894a7b2434187`), giải nén tự động và khớp byte 100% với `source/`. |
| Q12 | Cửa hàng | **PASS** | Đã tích hợp vào ô `t51` (`beyond-voyages`, phân loại `commerce`), đủ mô tả `vi`/`en`/`zh`, ảnh bìa `beyond-voyages.webp` và video quay hoạt động thật `beyond-voyages.mp4`. |
| Q13 | Thiết kế | **PASS** | Đạt đầy đủ D01–D08: tái hiện chính xác bố cục tham chiếu với vòng cung 5 điểm đến bên phải và tiêu đề chữ script bên trái, đồng thời mở rộng 4 section nội dung phía dưới nhất quán. |

## 2. Đánh giá thiết kế D01–D08

- **D01–D04:** Hero nêu rõ giá trị khám phá điểm đến, nút `Explore Destinations` dẫn tới `#destinations`, bảng màu `#071118` / `#10212e` / `#f5b971` và 2 họ font (`Lobster` + `Plus Jakarta Sans`) khai báo tập trung trong `:root`.
- **D05–D08:** Đã kiểm tra trực tiếp các ảnh chụp màn hình `chromium-1440.png`, `chromium-820.png`, `chromium-375.png`, `chromium-320.png`, `chromium-zoom200.png`: chữ trên ảnh hero và trên 4 nhãn vòng cung đọc rõ ở mọi khổ; dữ liệu mẫu nhất quán và có ghi chú `[YOUR PRICE]` kèm hướng dẫn thay thế.
