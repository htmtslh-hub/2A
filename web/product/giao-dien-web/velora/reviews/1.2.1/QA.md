# QA Velora 1.2.1

Ngày 10/10/2026. WEB-STATIC-1 v1.2 + ngoại lệ W05 kế thừa yêu cầu tương tác
đã được chủ sản phẩm chấp thuận. ĐẠT theo ngoại lệ W05 cho gói cục bộ.

Chỉ thêm Coral #e46d65, Ocean #5e9fbd và Sage #95ad8d vào ba màu Frame có sẵn.
Sửa source/index.html, assets/css/style.css, assets/js/main.js, README/CUSTOMISE,
README sản phẩm, ZIP và hồ sơ 1.2.1. Giữ licence, motion controller và defaults.
Rút gọn phần giải thích trùng trong tài liệu, vẫn đủ 10 bước/12 prompt/edit map.
Không sửa sản phẩm khác, cửa hàng, database hoặc triển khai.

Bằng chứng: checks.json, screenshots/ và colours/checks.json, colours/*.png.
Kiểm từ ZIP giải nén khớp byte nguồn, file:// và HTTP qua công cụ base QA.
Windows headless: Chromium 153.0.8010.12, Firefox 155.0,
Edge 155.0.4283.45 và Cốc Cốc 152.0.7977.124.

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS | Sáu file, ZIP đọc lại so khớp nguồn |
| Q02 | PASS | Bốn khổ 1440x900, 820x1180, 375x812, 320x740; base và bảng sáu màu không tràn/chồng enquiry |
| Q03 | PASS | Sáu màu x ba model x bốn browser, SVG hai paint stops/summary/email/ARIA đồng bộ; quay lại Metro giữ Sage |
| Q04 | PASS | Base focus/menu/skip; phím ArrowRight trên radio Ocean chọn Sage |
| Q05 | PASS | Base landmarks/headings/IDs/names/axe |
| Q06 | PASS | Base contrast/hover/focus; nhãn màu dùng màu chữ hiện có, đã nhìn desktop/mobile |
| Q07 | PASS | Base no-JS, offline, file, zoom, OS reduce; controller motion giữ byte/hành vi 1.1.0 |
| Q08 | PASS phạm vi | Base Chromium/Firefox; luồng màu cả bốn browser thật với viewport mô phỏng |
| Q09 | PASS | Không pageerror, base network/console đạt |
| Q10 | PASS | Edit counts, 10 bước/12 prompt đạt; licence không đổi, copyright holder Forge Zone đã được chủ sản phẩm xác nhận |
| Q11 | PASS | ZIP 20438 byte, nhỏ hơn 20480; sáu file khớp byte |
| Q12 | N/A | Không có tích hợp/deploy trong yêu cầu |
| Q13 | PASS | Đã nhìn ảnh coral desktop và bảng sáu màu mobile 320; D01-D08 kế thừa hướng thiết kế, dữ liệu không đổi |

D01-D03: showroom/chọn xe/detail giữ cấu trúc và mục đích đã nghiệm thu 1.1.0.
D04: swatch khớp màu SVG, token/nút/chữ giữ hệ thống. D05: bảng 3 cột x 2 hàng
fit stage tự động, không overlap/tràn, vùng chạm >=44px. D06-D08: màu mới có
nhãn thật trong demo, setup/email đồng bộ; không thêm tuyên bố kinh doanh.

SHA-256: f90b6f5ff520867d570f3b793067b1f86634f08ed72d0394df4eb4f33d17ba61.
Base và colours failures đều []. Không thử Safari, thiết bị vật lý, gửi email
thực tế hoặc online. Không chạy lại toàn bộ frame QA 1.1.0 vì không sửa motion;
bằng chứng chuyển động cũ nằm ở ../1.1.0/products/checks.json.

Lệnh: node web/product/giao-dien-web/tools/dong-goi.mjs velora;
node web/product/giao-dien-web/tools/check-template.mjs velora --version 1.2.1;
node web/product/giao-dien-web/velora/reviews/1.2.1/check-colours.mjs.


## Phát hành 1.2.1

Yêu cầu mới cho phép tích hợp và triển khai. Copyright Forge Zone đã điền theo
xác nhận. Kiểm final ZIP: base failures []; products/checks.json cả bốn browser
failures []; asset tracing route download có velora.zip. Production baseline
fa5476a, thêm t19 mới; không ghi đè t1-t18. Shared view nối ID mới sau các ô gốc,
giữ hành vi ô cũ; guide thêm mục Velora ba ngôn ngữ. Build/TypeScript/scoped ESLint
đạt. Store-local/checks.json ba ngôn ngữ desktop/mobile và preview đạt.
Q12 online: CHỜ KIỂM TRA trước triển khai. Không tạo đơn thanh toán hoặc quyền mua.

Dọn một khoảng trắng cuối dòng trong README sau base QA; mã HTML/CSS/JS không
đổi byte. Đóng lại ZIP so khớp sáu file; Q11 cuối 20438 byte/hash ở trên.
