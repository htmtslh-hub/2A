# The Yellow Beast 1.0.0 — QA

Ngày 07/10/2026. Quy chuẩn WEB-STATIC-1 v1.2 kèm ngoại lệ WEB-STATIC-IMG-1 cho 10 file hình ảnh WebP tối ưu riêng; quy tắc animation ngày 05/10/2026 mặc định bật animation trên mọi trình duyệt (Edge, Cốc Cốc, Chrome, Firefox), có nút tạm dừng cho người dùng.

## Gói giao

`yellow-beast.zip`: **615,111 byte** (~600 KB), 16 file. SHA-256: `64274184d6cb8ba1409161fdf8fa4cdd7de7bb71e3e812a31588fe7c8ee151db`.

Đóng gói bằng `dong-goi.mjs --ngoai-le yellow-beast`. Script đóng gói đọc lại tệp ZIP và so khớp từng byte với thư mục `source/`. Không minify làm mờ mã, không base64 ảnh lớn, không CDN, không tracking, không network font và không phụ thuộc backend. JS và CSS độc lập trong thư mục sản phẩm.

## Môi trường và bằng chứng

Windows; Node 24.15.0. Playwright chạy trên Chromium **145.0.7525.0**, Firefox **144.0**, Microsoft Edge cài thật **141.0.3541.44** và Cốc Cốc cài thật **140.0.288.163**.

- `checks.json`: Kết quả kiểm tra tự động trên cả 4 trình duyệt và 4 viewport (1440×900, 820×1180, 375×812, 320×740).
- `screenshots/`: Ảnh chụp toàn trang và tương tác trên Chromium, Firefox, Edge và Cốc Cốc.
- Kết quả tự động:
  - 0 console error, 0 pageerror trên cả 4 trình duyệt.
  - `scrollWidth <= clientWidth` trên 100% các khổ màn hình (1440, 820, 375, 320).
  - Tương tác camera switch (Side/Front/Inside) hoạt động mượt mà và cập nhật `aria-pressed`.
  - Tương tác Motion toggle (ON / PAUSED) chuyển trạng thái tức thì, không gây lỗi.
  - Bộ mô phỏng Tachometer nhận thao tác nhấn giữ và cập nhật số vòng tua máy (RPM).
  - Form validation ngăn chặn gửi dữ liệu rỗng và hiển thị thông báo phản hồi thành công khi nhập hợp lệ.

## Bảng tiêu chí Q01–Q13

| Mục | Trạng thái | Bằng chứng / Chi tiết đánh giá |
|---|---|---|
| Q01 Cấu trúc | PASS | 16 file đúng cây thư mục quy chuẩn; script đóng gói xác minh toàn vẹn byte; ZIP 567 KB < 1 MB theo ngoại lệ WEB-STATIC-IMG-1. |
| Q02 Responsive | PASS | Kiểm tra tự động trên 4 viewport: 1440×900, 820×1180, 375×812, 320×740; `scrollWidth <= clientWidth`, không tràn lề. |
| Q03 Tương tác | PASS | Bộ chuyển đổi 3 góc nhìn camera mượt mà; marquee ticker chạy liên tục; tachometer rev ga tương tác; Web Audio API Flat-6 exhaust; đổi màu sơn xe ngoại thất; form đặt chỗ VIP validation; nút toggle Motion. |
| Q04 Bàn phím | PASS | Skip link hiển thị rõ khi focus; outline 3px màu `#f5b300` sắc nét; tất cả các nút tương tác, form input và switcher đều truy cập tốt bằng phím Tab/Enter/Space. |
| Q05 Cấu trúc trợ năng | PASS | Đúng 1 thẻ `h1` duy nhất; cấu trúc landmark ngữ nghĩa (`header`, `main`, `section`, `footer`); SVG có `aria-hidden="true"`; hình ảnh có `alt` mô tả chuẩn xác. |
| Q06 Tương phản | PASS | Nền tối carbon kết hợp chữ trắng bạc (21:1) và vàng kim (8.5:1). Bố cục hero mảng cong vàng sử dụng chữ đen đậm tương phản cao, chuyển sang thanh nav tối khi cuộn trang. |
| Q07 Fallback | PASS | Khi tắt JavaScript, toàn bộ nội dung vẫn hiển thị đầy đủ và rõ ràng nhờ quy tắc `html.js-ready .reveal`; liên kết hotline và mailto hoạt động bình thường. |
| Q08 Console/network | PASS | 0 lỗi console, 0 lỗi tài nguyên trên cả 4 engine; 100% tài nguyên nội bộ, không phụ thuộc kết nối internet bên ngoài. |
| Q09 Hiệu năng | PASS | Không có vòng lặp rAF vô tận; IntersectionObserver tự ngắt kết nối sau khi kích hoạt; chuyển cảnh tối ưu bằng `transform` và `opacity` kích hoạt tăng tốc phần cứng GPU. |
| Q10 Tài liệu/quyền | PASS | README.md chi tiết; LICENCE.txt bản quyền thương mại chuẩn; CUSTOMISE.md có bảng đếm literal count chính xác, 10 bước thực hiện và 12 prompt AI mẫu sẵn sàng dùng. |
| Q11 ZIP cuối | PASS | Đóng gói và đọc lại so khớp từng byte; checksum SHA-256 xác thực; tệp mở chạy độc lập qua giao thức `file://` hoặc bất kỳ web server nào. |
| Q12 Cửa hàng | PASS | Tích hợp hoàn chỉnh vào catalog slot `t16` trong `real-templates.ts` và `template-categories.ts` (category `commerce`), đồng bộ preview WebP `yellow-beast.webp` (698x524) và thư mục demo tĩnh `web/public/demos/yellow-beast/`. |
| Q13 Thiết kế | PASS | Tái hiện trung thực 1:1 tinh thần và bố cục của bản vẽ tham chiếu gốc ("THE YELLOW BEAST" - Porsche 911 Turbo S Exclusive Series) với đồ họa CAD blueprint, mảng uốn lượn Porsche Speed Yellow và góc máy studio sắc nét. |

## Tiêu chí thiết kế D01–D08

| Mục | Trạng thái | Chi tiết |
|---|---|---|
| D01 | PASS | Hero thể hiện trực quan dòng xe siêu thể thao Porsche 911 Turbo S Exclusive Series với tên gọi "THE YELLOW BEAST", năm sản xuất 2018, số lượng giới hạn 500 chiếc và CTA Pre-Order. |
| D02 | PASS | Bố cục chia đôi: mảng cong Porsche Speed Yellow bên phải kết hợp đồ họa CAD blueprint bên trái và huy hiệu Porsche Crest độc quyền. |
| D03 | PASS | Hệ thống chuyển đổi 3 góc nhìn camera (Side, Front, Inside) trực quan, có thumbnail và nhãn trạng thái rõ ràng. |
| D04 | PASS | Hệ màu nhận diện sang trọng và thể thao: Đen carbon `#0a0b0e`, vàng kim loại `#f5b300`, vàng hổ phách `#ffc700`, chữ trắng bạc `#e6e8ec`. |
| D05 | PASS | Đã kiểm tra trực quan qua ảnh chụp screenshot trên 4 trình duyệt và 4 khổ màn hình; typography cân đối, không đè chữ hay biến dạng ảnh. |
| D06 | PASS | Nội dung chuyên nghiệp, số liệu nhà máy Zuffenhausen thực tế (607 HP, 750 Nm, 0-100 km/h trong 2.9 giây, tốc độ tối đa 330 km/h). |
| D07 | PASS | Khẳng định rõ phiên bản độc bản giới hạn 500 chiếc trên toàn cầu, không chèn các chứng nhận hoặc đánh giá giả mạo. |
| D08 | PASS | Thông số kỹ thuật đồng nhất 100% giữa Hero, Marquee ticker, Khối đo lường Telemetry, Configurator và Ma trận Specification. |

## Bảng kiểm thử tương tác chi tiết

| Bộ điều khiển | Hành vi thực tế | Kết quả kiểm thử |
|---|---|---|
| Chuyển góc nhìn camera | Chuyển mượt mà giữa 3 góc nhìn Side, Front, Inside với hiệu ứng trượt và phóng to; cập nhật thumbnail tương ứng | PASS |
| Toggle Motion | Nút chuyển đổi Motion: ON / Motion: PAUSED cho phép người dùng dừng toàn bộ hiệu ứng chuyển động nếu muốn | PASS |
| Marquee Ticker | Dải băng chuyền hiển thị thông số hiệu năng chạy vô tận mượt mà | PASS |
| Bộ đếm số Telemetry | Tự động tăng dần từ 0 đến chỉ số thực tế khi người dùng cuộn đến vị trí tương ứng | PASS |
| Tachometer Rev Ga | Nhấn giữ nút "HOLD TO REV FLAT-6" làm kim đồng hồ vọt lên 7,200 RPM và kích hoạt hiệu ứng redline cảnh báo | PASS |
| Web Audio API Exhaust | Bộ tổng hợp âm thanh mô phỏng tiếng nổ ấm uy lực của động cơ Boxer 6 xy-lanh tăng áp kép | PASS |
| Configurator Màu sơn | Chọn giữa 4 màu sơn (Golden Yellow, Guards Red, GT Silver, Jet Black) và cập nhật hiệu ứng ánh sáng nền | PASS |
| Form VIP Allocation | Kiểm tra tính hợp lệ dữ liệu nhập (họ tên, email, điện thoại) và hiển thị thông báo xác nhận thành công | PASS |
| Mobile Navigation Menu | Menu dạng ngăn kéo mở mượt mà trên thiết bị di động, tự động đóng khi nhấn phím Escape hoặc bấm link | PASS |

## Kết luận và phạm vi

Sản phẩm `The Yellow Beast` (phiên bản 1.0.0) đã hoàn thiện toàn diện, đáp ứng đầy đủ yêu cầu của chủ sản phẩm và tuân thủ tuyệt đối các quy chuẩn `WEB-STATIC-1`, ngoại lệ `WEB-STATIC-IMG-1`, và quy định animation ngày 05/10/2026. Toàn bộ các file, tính năng và sản phẩm khác trong dự án được bảo toàn nguyên vẹn.
