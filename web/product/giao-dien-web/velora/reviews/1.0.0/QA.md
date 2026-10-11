# QA Velora 1.0.0

Ngày 10/10/2026. Chuẩn 1.2, WEB-STATIC-1.
Windows; nguồn source/, kiểm tra bản ZIP giải nén bằng công cụ dự án.
Trình duyệt đầy đủ: chromium 153.0.8010.12, firefox 155.0. Edge 155.0.4283.45: chỉ entrance motion và fallback.
Không thử Safari, Cốc Cốc, thiết bị thật, luồng mua hàng hoặc triển khai.

## Kết quả

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS | ZIP đúng sáu file, đọc lại khớp source |
| Q02 | PASS | Bốn viewport 1440×900, 820×1180, 375×812, 320×740, gồm menu mở; không overflow |
| Q03 | PASS | Menu click/Escape/link/resize, anchors thật, mailto placeholder công khai |
| Q04 | PASS | Skip link, Tab, Shift+Tab, hidden menu skipped, focus |
| Q05 | PASS | Một h1, landmarks, SVG có tên, ID duy nhất, axe |
| Q06 | PASS | Các cặp màu và trạng thái hover/focus ghi trong final/checks.json; đã nhìn ảnh |
| Q07 | PASS theo rules motion | no-JS, offline file://, font hệ thống, zoom mô phỏng 200%; entrance mặc định bật theo AGENTS ngày 05/10 |
| Q08 | PASS cho bản tĩnh | Chromium và Firefox qua HTTP/file://; Edge chỉ kiểm tra motion |
| Q09 | PASS | Không lỗi console/network trong lượt cuối; motion hữu hạn |
| Q10 | NOT TESTED một phần | 10 bước, 12 prompt, edit map đúng; licence bảy mục, chủ thể copyright cần chủ sản phẩm điền |
| Q11 | PASS | ZIP giải nén đã chạy lại; hash và byte bên dưới |
| Q12 | N/A | Catalog/demo công khai/triển khai ngoài phạm vi |
| Q13 | PASS cho bố cục tĩnh | D01–D08 và ảnh đã nhìn; chưa dựng carousel/cấu hình video |

Số byte ZIP: 16826
SHA-256: `929409f639041be68b298b202959d571e5a06517cb0b2b4039bb3234f335f395`
Lỗi tự động lượt cuối: []

## Thiết kế

D01 PASS: h1 và mô tả chỉ rõ xe đạp gấp, CTA đến contact.
D02 PASS: xe bắc qua ranh giới panel tím và vùng trắng; hình SVG vector có gradient
kim loại, cấu trúc khung/wheel/saddle khác bố cục template thông thường.
D03 PASS: hero giới thiệu Metro; collection ba phối màu; details lý do chọn;
contact hành động tiếp theo, không thêm social proof giả.
D04 PASS: token màu/font; nút coral thống nhất; light theme theo video.
D05 PASS: đã nhìn ảnh 1440, 820, 375 và 320. CTA vẫn đọc được; mobile xếp dọc.
D06 PASS: tiếng Anh cụ thể về showroom xe đạp; không lorem ipsum.
D07 PASS: không testimonial/chứng nhận/logo khách giả. Nội dung demo công khai.
D08 PASS: giá và model nhất quán, mailto placeholder được hướng dẫn thay.

## Bảng tương tác

| Nhãn | Hành vi | Trạng thái |
|---|---|---|
| Bikes / Find your ride | #collection | PASS |
| The details | #details | PASS |
| Contact / Enquire about Metro | #contact | PASS |
| Wheels / Frame / Comfort | Anchors tới nội dung chi tiết, không đổi cấu hình | PASS |
| Explore / Explore all bikes | #configure, trở về trình bày Metro | PASS, ghi rõ trong README |
| Email the showroom | mailto placeholder, mở ứng dụng email | Đích đã kiểm; gửi mail không thử |
| Menu | toggle ARIA, Escape focus return, đóng khi link/resize | PASS |

## Giới hạn và trạng thái cuối

CHỜ CHỐT PHẠM VI, CHƯA PHÁT HÀNH. Bản tĩnh đã dựng và kiểm tra. Chưa có phản hồi
về ngoại lệ W05 nên không dựng carousel/cấu hình/giỏ hàng; không coi việc im lặng
là phê duyệt. Không claim hoàn tất chuyển động như video. Copyright holder trong
LICENCE cần chủ sản phẩm điền trước phát hành. Không tích hợp catalog hoặc deploy.
Chỉ tạo thư mục velora; giữ nguyên các thay đổi có sẵn khác trong workspace.

Ngoại lệ đã ủy quyền: entrance luôn bật, kể cả prefers-reduced-motion và trạng thái
motion=off cũ, theo AGENTS.md 05/10/2026. animation hoàn tất dưới 1 giây; fallback
rAF kết thúc và xoá inline style. motion.json có frame giữa chuyển động trên
Chromium/Edge, cả reduce/no-preference. Không có carousel nên test wrap/rapid
slide N/A. Cốc Cốc/Safari chưa thử. Không dùng ảnh raster do W03. Font hệ thống
không tải mạng, không phân phối font; kiểm tra licence font bên ngoài N/A.

Lệnh: node tools/dong-goi.mjs velora; node tools/check-template.mjs velora
--version 1.0.0 --out final (đường dẫn đầy đủ từ thư mục gốc theo AGENTS).
Kiểm tra motion: node reviews/1.0.0/check-motion.mjs với đường dẫn thư mục sản phẩm.
Ảnh preview.png chụp mã thật, không chỉnh ghép. Hồ sơ final/ chứa bằng chứng gói
cuối; checks.json/screenshots ở thư mục cha lưu lượt đầu có lỗi ID đã được sửa.
