# Watchroom 1.0.0 — QA

Ngày 06/10/2026. WEB-STATIC-1 v1.2 + mở rộng tương tác W05 theo ảnh/yêu cầu animation; animation mặc định bật theo AGENTS.md ngày 05/10/2026, kể cả prefers-reduced-motion. Không sửa quy chuẩn chung.

## Gói giao

`watchroom.zip`: **20173 byte**, sáu file. SHA-256: `a0c50b437b9a40757046de61731ca1d0bc7eb0a9721d6717ab1eb93fe99560bc`.

Script đóng gói đọc lại ZIP và so khớp từng byte với source. Không minify, base64, raster, CDN, tracking, network font hoặc backend. JS và CSS được đặt trong sản phẩm độc lập.

## Môi trường và bằng chứng

Windows; Node 24.15.0. Playwright chạy headless trên Chromium **153.0.8010.12**, Firefox **155.0**, Microsoft Edge cài thật **154.0.4258.62** và Cốc Cốc cài thật **152.0.7977.124**. Đây là browser thực chạy bằng automation, không phải thử tay trên thiết bị di động vật lý. Safari/WebKit và thiết bị iPhone/Android thật: NOT TESTED.

- `checks.json`: bộ kiểm tra gói trước điều chỉnh tỷ lệ minh họa card cuối cùng.
- `final/checks.json`: bộ kiểm tra trên ZIP cuối; ưu tiên kết quả này.
- `motion.json`: Edge/Cốc Cốc/Chromium, frame giữa chuyển động, wrap hai chiều, bấm nhanh, giảm motion hệ thống và cờ off cũ.
- `screenshots/final-desktop.png`: đã xem trực quan toàn trang sau sửa tỷ lệ SVG; card 280px và SVG 280px, không chồng chữ.
- `screenshots/*-320.png`, `*-375.png`, `*-820.png`, `*-1440.png`: bốn khổ kiểm tra. Đã xem desktop và mobile; ghi chính xác phạm vi, không suy ra Safari từ Chromium.

Lệnh: `dong-goi.mjs watchroom`; `check-template.mjs watchroom --version 1.0.0 --out final`; `node --check .../assets/js/main.js`; `check-motion.mjs`; `anh-preview.mjs watchroom`.

## Q01–Q13

| Mục | Trạng thái | Bằng chứng/phạm vi |
|---|---|---|
| Q01 Cấu trúc | PASS | Sáu file đúng cây; packaging xác minh byte; ZIP dưới 20480. |
| Q02 Responsive | PASS | Bốn viewport 1440×900, 820×1180, 375×812, 320×740; scrollWidth = clientWidth. Card đã sửa tỷ lệ, không đè chữ. |
| Q03 Tương tác | PASS | Carousel, lọc, search và empty state, Desired, dialog/Escape, pause. Không có menu thu gọn: đủ ba link luôn hiện ở 320px. Script chung báo thiếu `.nav-toggle` là giả định không áp dụng cho bố cục này, không phải nút bị hỏng. |
| Q04 Bàn phím | PASS | Skip link visible và vào main, outline 3px; nút carousel dùng Tab/Enter, trái/phải khi focus trong hero; dialog native Escape trả focus. |
| Q05 Cấu trúc trợ năng | PASS | Một h1, landmark, không ID trùng/heading jump; SVG có viewBox, focusable=false và nhãn/aria-hidden; axe không có violation. |
| Q06 Tương phản | PASS | Kiểm tra CSS và pixel trên gradient bằng công cụ chung; focus Explore 11.26:1. Chữ nằm ngoài mặt đồng hồ, đã xem screenshot. |
| Q07 Fallback | PASS | file://, không JS/không font, offline 320px, zoom200 ở 720px không tràn. Không JS giữ nội dung và mailto, ẩn điều khiển JS. Motion có ngoại lệ mặc định bật; intro kết thúc 4.8s. |
| Q08 Console/network | PASS | Không pageerror hoặc lỗi tài nguyên trong các engine đã ghi; không request mạng cần thiết. |
| Q09 Hiệu năng | PASS | Không vòng rAF vô hạn; carousel 850ms, pointer 220ms, intro4800ms; hủy frame cũ khi thao tác mới. Đã đo transform/opacity giữa frame. Không chạy Lighthouse, không tuyên bố điểm/CWV. |
| Q10 Tài liệu/quyền | PASS | CUSTOMISE có edit map literal counts, 10 bước và 12 prompt; hệ thống font, không bundle/relicense font; licence giữ bảy điều khoản thương mại từ mẫu hiện hữu. Prompt được đọc, chưa thử với một AI khác. |
| Q11 ZIP cuối | PASS | Đọc lại/so byte; giải nén và kiểm tra HTTP/file bằng công cụ chung; hash/byte phía trên. |
| Q12 Cửa hàng | N/A | Chỉ demo/preview được đồng bộ; không catalog, deploy hoặc mua/tải sau thanh toán. |
| Q13 Thiết kế | PASS | D01–D08 phía dưới; dùng SVG theo chuẩn repository, mức photorealism thấp hơn ảnh chụp tham chiếu. |

## Thiết kế D01–D08

| Mục | Trạng thái | Chi tiết |
|---|---|---|
| D01 | PASS | Hero nêu đồng hồ chronograph, mẫu, giá và Explore; Enquire mở email. |
| D02 | PASS | Vòng quỹ đạo và hotspot quanh đồng hồ; thanh peach dọc bên phải, chuyển thành hàng trên mobile. |
| D03 | PASS | Hero khám phá mẫu; details vật liệu/thiết kế; collection chọn mẫu; contact hỏi trước mua. |
| D04 | PASS | Token navy/peach, hai font hệ thống; shape và control nhất quán. |
| D05 | PASS | Xem ảnh desktop/mobile, card không chồng chữ; bốn khổ và zoom không tràn. |
| D06 | PASS | Nội dung tiếng Anh cụ thể, không lorem ipsum hoặc filler. |
| D07 | PASS | Không chứng nhận, testimonial hoặc logo thật; giá/brand demo được ghi rõ. |
| D08 | PASS | Ba tên/giá khớp hero, card, dữ liệu JS và link enquiry. |

## Bảng tương tác

| Điều khiển | Hành vi thật | Kết quả |
|---|---|---|
| All/Women/Men | Lọc card; fallback anchor khi không JS | PASS |
| Search | Tìm chuỗi cục bộ, có kết quả rỗng | PASS |
| Explore | Đến collection | PASS |
| Hai mũi tên/swipe | Chọn ba mẫu, đổi copy/palette/mailto | PASS cho nút và wrap; touch listener đọc mã, chưa thử cảm ứng vật lý |
| Hotspot | Mở callout mobile và trạng thái aria-expanded | Đọc mã + render; chưa thử thiết bị cảm ứng vật lý |
| Desired | Thêm/bỏ shortlist local với fallback bộ nhớ | PASS |
| Bag | Dialog danh sách đã lưu | PASS; Escape đóng |
| Enquire/liên hệ | Mở mailto, không gửi đơn/thu tiền | URL PASS; chưa gửi email thật |
| Pause | Tạm dừng phiên; reload mặc định bật | PASS kể cả cờ off cũ và prefers-reduced-motion |
| FAQ | Native details/summary | Render PASS |

## Giới hạn và trạng thái

Bản dựng và gói review hoàn thành; chưa công bố là bản phát hành đã kiểm thử trên mọi browser. SVG là minh họa gốc, không tái sử dụng ảnh đồng hồ thương hiệu trong ảnh tham chiếu. Một số vùng trên dial giữ màu kim loại đầu tiên khi đổi palette, là chủ đích minh họa, không dữ liệu phần cứng thực.

Không có thanh toán, tồn kho, tài khoản, gửi form, đồng bộ shortlist đa thiết bị hoặc backend. Safari, thiết bị di động thật, benchmark hiệu năng và luồng cửa hàng sau deploy: NOT TESTED/N/A theo phạm vi. Ngoại lệ W05 gồm carousel, parallax, hotspot, lọc/tìm và shortlist để tái hiện ảnh và chiều sâu tương tác. Không mở rộng dung lượng hay thêm file vào ZIP.

Chỉ thêm Watchroom, demo và preview của Watchroom. Các thay đổi admin/auth/schema có sẵn không được chỉnh hoặc rollback.
