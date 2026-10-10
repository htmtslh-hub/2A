# QA Laila 1.0.0

Ngày 10/10/2026, WEB-STATIC-1 quy chuẩn 1.2. Windows, browser headless; không gọi đây là kiểm toán WCAG hoặc kiểm tra điện thoại thật.

## Ngoại lệ và bản giao

Chủ sản phẩm chấp nhận giữ ảnh/ZIP trên 20KB và yêu cầu deploy ở lượt “ok em đóng gói sản phẩm và deploy nhé”. W01/W03/W06: sáu file chuẩn + assets/img/portrait.webp (800×1200, 237380 byte), không hotlink/base64, ZIP 254597 byte, dưới giới hạn tự ràng buộc 1MiB và mỗi ảnh 300KB. Không đổi chuẩn chung. Giấy phép bảy mục, bản quyền Forge Zone theo thông tin chủ sản phẩm đã cung cấp; ảnh original AI được dùng trên website hoàn chỉnh, không bán lại như stock.

SHA-256 laila.zip: `c682165f9a14f6c396b03666ab9f9e938fc45a90a482b8d64cc9fe861414bfe0`.
Source khớp toàn bộ byte với bản giải nén. Bảy file: index.html, assets/css/style.css, assets/js/main.js, assets/img/portrait.webp, CUSTOMISE.md, README.md, LICENCE.txt.

## Kiểm tra

| Mục | Trạng thái | Bằng chứng và giới hạn |
|---|---|---|
| Q01 Cấu trúc | PASS theo ngoại lệ | final/checks.json: bảy file, không file thừa/bí mật/library |
| Q02 Responsive | PASS | Chromium/Firefox bốn khổ 1440×900, 820×1180, 375×812, 320×740; scrollWidth bằng clientWidth; vùng chạm tối thiểu 44px; final/screenshots và additional-browsers.json |
| Q03 Tương tác | PASS | Menu open/Escape/link close/reset desktop/mobile; native project Enter mở/Space đóng, learning click mở; anchor và mailto hợp lệ |
| Q04 Bàn phím | PASS | Skip link, Tab/Shift+Tab, focus, menu ẩn không nhận Tab; details dùng bàn phím. final/checks.json và additional-browsers.json |
| Q05 Cấu trúc trợ năng | PASS | Một h1, heading không nhảy cấp, các mốc HTML, ID duy nhất, SVG viewBox/aria-hidden/focusable; axe không có lỗi ở Chromium/Firefox và Edge/Cốc Cốc |
| Q06 Tương phản | PASS | Đo chữ/nav/CTA/hover/focus, nền gradient bằng pixel. final/checks.json lưu toàn bộ cặp; kiểm tra trực quan chữ hero cạnh ảnh và nav trên ảnh, không có chữ chồng mặt |
| Q07 Dự phòng | PASS | file://, HTTP, no-JS/no-font 320px, offline file, khung CSS tương đương zoom 200% 720×450 ở DPR2; mất portrait vẫn còn heading/contact và không tràn. Reduced motion vẫn bật finite RAF theo AGENTS |
| Q08 Trình duyệt | PASS trong phạm vi | Chromium 153.0.8010.12, Firefox 155.0, Edge 155.0.4283.45, Cốc Cốc 152.0.7977.124. Safari/điện thoại thật NOT TESTED, không quảng cáo đã thử |
| Q09 Kỹ thuật | PASS | Không console/network lỗi ở bản đầy đủ, cuộn và thao tác qua Playwright; finite 620ms reveal, unobserve một lần, không animation còn chạy sau 5s. Không font mạng/API/tracking |
| Q10 Tài liệu/quyền | PASS | final/checks.json: 10 bước, 12 prompt, 0 placeholder trong prompt, 0 countErrors. Đọc các prompt và đối chiếu input/task/output/missing data; thử đúng file/path trên bản giải nén, chưa thử với AI khác. Font hệ thống, không phân phối font |
| Q11 Gói cuối | PASS theo ngoại lệ | dong-goi.mjs --ngoai-le và check-template.mjs --ngoai-le --out final; byte/hash ở trên và final/checks.json |
| Q12 Cửa hàng | CHỜ KIỂM TRA ONLINE | t20 portfolio, catalog/guide vi/en/zh, preview thật 698×524, ZIP private. Kiểm tra online bổ sung sau deploy. Luồng thanh toán thật không nằm trong thao tác thử |
| Q13 Thiết kế | PASS | D01–D08 phía dưới, screenshot đã nhìn và lỗi tablet đã sửa trước bản final |

Đo màu ví dụ: chữ body #fff4f8 trên #10182b 16.46:1; muted #bec2d1 9.96:1; accent #ff91bb 8.44:1; nav #4a1330 trên #ffb6cd 8.99:1; Hire me trắng trên #941347 8.59:1; footer #68253e trên nền hồng 8.01:1. Vùng gradient dưới tech labels được lấy pixel, tỷ lệ 10.43–12.48:1. Chữ nằm cạnh chân dung, mặt/tóc/trang phục không chứa body text; desktop/tablet/mobile đã xem ảnh. Viền focus nav dùng hồng đậm, panel dùng trắng, footer dùng đậm theo nền.

## Motion và bảng tương tác

Edge và Cốc Cốc, reducedMotion=reduce, localStorage motion=off, CSS animation/transition bị vô hiệu hóa, Element.animate không có: đo frame giữa opacity/translate của hero rồi về opacity1/transformnone. additional-browsers.json lưu frame thật. Không carousel nên wrap hai chiều N/A. Đây là reveal one-shot, không có thao tác lặp gây chạy RAF chồng lên một phần tử. Pagehide hủy RAF và reset inline style để bfcache không giữ nội dung mờ.

| Điều khiển | Hành vi thực | Kết quả |
|---|---|---|
| Logo/Home/About/Learning/Skills/Projects/Hire me | Tới section hiện hữu | PASS |
| Explore my work | #projects | PASS |
| View résumé | #education, không PDF | PASS |
| Learning topic summary | Mở/đóng giải thích native details | PASS |
| Ba project summary | Mở/đóng nội dung concept, bàn phím và chuột | PASS |
| Menu | ARIA phản ánh trạng thái; Escape trả focus, resize reset | PASS |
| Write an email | mailto địa chỉ demo, không giả gửi thành công | PASS cấu trúc; gửi thư thật N/A |

## D01–D08

- D01 PASS: hero nói creative developer, tạo website, Explore my work tới dự án.
- D02 PASS: bố cục panel xanh đen trên nền hồng theo reference; portrait original kimono và artwork quạt/hoa/code-native. Đây là hai lựa chọn riêng, không đổi màu mẫu cũ.
- D03 PASS: about trả lời cá tính; learning trả lời thực hành; journey résumé; projects direction; skills toolkit; contact cách liên hệ. Không testimonial giả.
- D04 PASS: token màu/font/radius ở :root, cùng hệ nút và typography xuyên trang.
- D05 PASS: đã xem screenshot desktop/tablet và mobile, sửa cột chữ tablet bó hẹp bằng display:block trước final. Các section không cắt text; trang dài trên mobile là dòng nội dung một cột.
- D06 PASS: copy tiếng Anh riêng cho portfolio, không lorem ipsum.
- D07 PASS: persona, résumé, topic học và concept dự án được công khai minh họa; không giả chứng nhận/khách hàng thật. Portfolio thumbnail là graphic concept, không screenshot sản phẩm đã ship.
- D08 PASS: name/email/project/timeline nhất quán; không giá, địa chỉ hay số thành tích không có bằng chứng.

## Phạm vi triển khai

Chỉ thêm Laila, demo/preview và hai entry catalog/guide. Bản triển khai dùng checkout có baseline production Velora, không mang các chỉnh sửa category/admin/product khác chưa phát hành ở workspace chính. Local production build của cửa hàng đã qua compile/TypeScript. Bằng chứng store-local tách riêng; thiếu biến môi trường database trong server local không được coi là chứng minh hệ thống tài khoản hoạt động.

Trạng thái trước deploy: ĐẠT THEO NGOẠI LỆ W01/W03/W06 cho gói; cửa hàng chờ kiểm tra online. Không thay đổi điều khoản cửa hàng, database, thanh toán hoặc quyền mua.
