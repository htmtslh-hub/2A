# QA — Galaxy Edge 1.0.0

Ngày 12/10/2026; Windows; WEB-STATIC-1 v1.2. Chủ sản phẩm duyệt giữ SVG/sáu file/dưới 20 KB; không có ngoại lệ raster/carousel.

## Kết quả

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS | Sáu file; final/checks.json |
| Q02 | PASS | 1440×900, 820×1180, 375×812, 320×740: scrollWidth=clientWidth, không vùng chạm nhỏ; đã xem screenshot |
| Q03 | PASS | Menu mở/đóng, Escape, chọn link, resize; các CTA là anchor tới section thật |
| Q04 | PASS | Skip link, Tab/Shift+Tab, focus, menu ẩn bỏ khỏi Tab |
| Q05 | PASS | Một h1, landmark, heading, SVG trang trí, không ID trùng; axe không lỗi |
| Q06 | PASS | Đo pixel/tương phản tự động bản cuối; nhìn chữ trên nền hero và kiểm ảnh mobile. Lỗi chữ dưới logo lượt đầu đã sửa |
| Q07 | PASS | file://, offline, no-JS/no-font ở 320px, zoom200; nội dung vẫn hiện |
| Q08 | NOT TESTED | Chromium 153.0.8010.12 và Firefox 155.0 PASS; Edge/Cốc Cốc thực theo rules motion chưa thử; Safari chưa thử |
| Q09 | PASS | JS syntax, console/network sạch, không external dependency, ZIP 17880 byte |
| Q10 | NOT TESTED | 10 bước/12 prompt/số đếm PASS; font hệ thống không phân phối; còn chủ thể bản quyền cần chủ sản phẩm điền. Không thử prompt với AI khác |
| Q11 | PASS | ZIP đã giải nén khớp nguồn; kiểm file:// và HTTP trên bản giải nén |
| Q12 | N/A | Không thuộc scope cửa hàng, thanh toán hoặc deploy |
| Q13 | PASS | D01–D08: nội dung du lịch rõ, SVG thành phố riêng và bố cục điện ảnh; màu/chữ nhất quán, không bịa testimonial/số liệu; mọi package nêu rõ minh hoạ |

## Tương tác

Navigation/CTA Find a package → #plan; preview → #adventures; nút tròn → #worlds/#adventures; packages → section mô tả tương ứng; menu → mở/đóng và Escape trả focus. Không giả tìm kiếm, đặt vé, video hoặc giao dịch.

## Byte/hash và trạng thái

Candidate ZIP: 17880 byte, SHA-256 ad11a1761a3cea0b8eafe3cbb8a87c128b934eba29a82c15f68e3c93329dbbd6. File candidate.zip trong hồ sơ này.

Lệnh: node --check source/assets/js/main.js; dong-goi.mjs galaxy-edge; check-template.mjs galaxy-edge --version 1.0.0 --out final. Bộ test tự động PASS; nguồn sau test không đổi. Gói là candidate, **CHỜ KIỂM TRA** trước phát hành; fidelity >95 chưa được chứng minh. Không sửa sản phẩm khác, không publish.
