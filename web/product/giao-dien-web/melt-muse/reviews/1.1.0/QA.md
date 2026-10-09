# Melt Muse — QA thương mại 1.1.0

Ngày 09/10/2026. Chuẩn product-standards 1.2 / WEB-STATIC-1 với ngoại lệ W01/W03/W06 theo yêu cầu tạo ảnh. ZIP thương mại và tích hợp catalog đã hoàn tất; không tuyên bố đã kiểm tra thanh toán tiền thật hoặc phiên tải đã mua trên production.

Phạm vi: riêng Melt Muse, giấy phép/tài liệu/ZIP, catalog t17 và hướng dẫn vi/en/zh. Không thay HTML/CSS/JS hoặc ảnh của sản phẩm; không thay backend, schema, giá hoặc sản phẩm khác. Chủ thể Văn Triển lấy từ licence thương mại Apartment Flow, chính sách bảy mục giữ nguyên. Yêu cầu thương mại mới nhất cho phép hoàn tất gói với ba ảnh đã tạo riêng, dùng trên website cá nhân, thương mại và khách hàng; không bán lại ảnh stock hoặc template cạnh tranh.

## Gói và ngoại lệ

- Chín file: sáu file chính và ba WebP 900×1200 (soft-focus 71.304 byte, damn-right 38.072 byte, heart-pose 35.210 byte).
- ZIP **161597 byte**, SHA-256 `5f5877e6fce4db7a055b542625ccb6b719804b8e9ef75aaaca704ba135fade8a`.
- Ngoại lệ riêng dưới 1 MiB/mỗi ảnh dưới 300 KB; không tuyên bố đạt nguyên chuẩn sáu file/20.480 byte hoặc hồ sơ IMG chưa được duyệt.
- Reveal 280ms mặc định bật kể cả OS giảm chuyển động theo rules 05/10; không vòng lặp vô hạn, nội dung luôn hiển thị.
- Lượt đầu Q11 báo lệch newline giữa workspace cũ LF và checkout CRLF. Đồng bộ đúng source với ZIP rồi chạy lại `final/checks.json`: tất cả PASS, sourceMatchesExtracted=true. Không sửa mã giao diện để né lỗi.

## Q01–Q13

| Mục | Kết quả | Bằng chứng |
|---|---|---|
| Q01 Cấu trúc | PASS theo ngoại lệ | Chín file, ZIP đọc lại khớp source, không thư viện hoặc backend. |
| Q02 Responsive | PASS | Chromium/Firefox/Edge ở 1440×900, 820×1180, 375×812, 320×740; không tràn, vùng chạm đạt kiểm tra. Xem screenshots final và Edge. |
| Q03 Tương tác | PASS | Menu, Escape, link đóng menu, resize reset, anchors và mailto. Email không tự gửi. |
| Q04 Bàn phím | PASS | Skip, Tab/Shift+Tab, menu ẩn không nhận Tab, focus 3px; Escape trả focus. |
| Q05 Trợ năng nội bộ | PASS | Một h1, landmarks, alt, SVG ẩn; axe 0 violations trên hai engine. Không chứng nhận bên ngoài. |
| Q06 Tương phản | PASS | Trắng/đỏ 6,45:1; mềm/xám 6,85:1; đỏ chữ/xám 7,31:1; focus 17,46:1; hover không lỗi, chữ không đặt trực tiếp lên ảnh. |
| Q07 Dự phòng | PASS | file://, offline, không JS/font, zoom mô phỏng 200%, thiếu ảnh. Edge reduced preference true: y12→y2,04→y0, 0 animation còn chạy. |
| Q08 Trình duyệt | PASS phạm vi tối thiểu | Windows headless Playwright: Chromium153.0.8010.12, Firefox155.0, Edge155.0.4283.45. Safari/Cốc Cốc NOT TESTED, không quảng cáo đã thử. |
| Q09 Kỹ thuật | PASS | Bản giải nén console/network lỗi cục bộ 0; ảnh tải, menu/cuộn được thử. Không công bố benchmark hoặc khả năng chịu tải. |
| Q10 Tài liệu/quyền | PASS | 10 bước,12 prompt,0 count errors/markers; licence bảy mục hoàn chỉnh, copyright Văn Triển. Archivo/Archivo Black OFL1.1 đã đối chiếu nguồn chính thức trong licence. Prompt trên AI khác NOT TESTED. |
| Q11 ZIP | PASS | final/checks.json giải nén khớp source; handler tải đúng byte/hash ZIP. |
| Q12 Cửa hàng | PASS local; production có giới hạn | Catalog t17/portfolio đủ ba ngôn ngữ, giá chung 1.900.000 VND /79 USD, preview/demos tự suy từ slug/version. Handler thực fixture cô lập:401/403/200, mua riêng và bundle, response private/no-store. ZIP được bao gồm bởi outputFileTracingIncludes hiện có và không bị .vercelignore loại. Production kiểm riêng ở production-checks.json. Thanh toán tiền thật và tải từ phiên đã mua trên production NOT TESTED. |
| Q13 Thiết kế | PASS nội bộ | D01–D08 và bảng tương tác từ QA1.0.0 vẫn áp dụng: giao diện/ảnh không đổi, đã nhìn lại ảnh320px. |

## D01–D08 và tương tác

D01: hero nêu fashion/portraits và CTA. D02: type sau thẻ tim, collage nghiêng có nét vẽ tay. D03: hero/portrait/story/services/contact có mục đích riêng. D04: root token/hai font nhất quán. D05: ảnh320px đã nhìn lại, MUSE hiện rõ, không chồng nội dung. D06: copy Anh nhất quán. D07: studio/nhân vật AI giả định được công khai, không testimonial thật. D08: email demo được hướng dẫn thay, không giá hoặc địa chỉ mâu thuẫn. Tất cả PASS nội bộ.

Anchor #top/#edit/#story/#contact PASS; mailto:hello@example.com PASS href và không gửi thư thử; menu toggle/Escape/link/resize PASS; doodles là trang trí, không control giả. Không có thay đổi hành vi so với1.0.0.

## Lệnh và giới hạn cuối

`dong-goi.mjs melt-muse --ngoai-le`; `check-template.mjs melt-muse --version 1.1.0 --ngoai-le --out final`; `verify-extra.mjs`; `verify-commerce.cjs <isolated-root>`; `verify-store.mjs`.

Build production Next16.3.3 và TypeScript PASS,27 pages. Không đọc/ghi database để giả quyền mua, không tạo đơn hoặc giao dịch. Gói thương mại/catalog được phát hành theo yêu cầu; phần nghiệm thu Q12 production có entitlement vẫn cần một phiên khách đã mua hợp lệ. Không gọi toàn bộ Q01–Q13 là PASS đầy đủ khi còn giới hạn này.
