# QA — Aerox Studio 1.0.0

Ngày 12/10/2026. Windows. WEB-STATIC-1 v1.2 với ngoại lệ riêng theo yêu cầu tạo ảnh: W01/W03/W06 (bốn WebP cục bộ, mười file, ZIP vượt 20 KB); W05 cho các tương tác trình bày suy ra từ tham chiếu. Không sửa chuẩn chung hoặc sản phẩm khác.

## Kết quả

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| Q01 | PASS theo ngoại lệ ảnh | Sáu file chuẩn và bốn WebP, không dependency mới |
| Q02 | PASS | Chromium và Firefox: 1440×900, 820×1180, 375×812, 320×740 không overflow, vùng chạm đủ; đã xem screenshots |
| Q03 | PASS kiểm tra bổ sung | Menu và anchor PASS. Hai external links bị công cụ đánh dấu vì không cùng origin, không phải lỗi HTTP; HEAD https://www.yamaha-motor.com/ trả 200, redirect https://yamaha-motor.com/ |
| Q04 | PASS | Skip link, Tab/Shift+Tab, menu ẩn, Escape, dialog focus restore |
| Q05 | PASS | Landmark, một h1, heading/ID/SVG/names, axe không lỗi |
| Q06 | PASS | Đo pixel/tương phản bản cuối; lỗi chữ banner lượt đầu đã tăng overlay và kiểm lại; xem hero/about/gallery thật |
| Q07 | PASS | No-JS navigation trong flow, controls disabled, file://, offline, zoom 200%, OS reduce vẫn chạy hữu hạn |
| Q08 | NOT TESTED một phần | Chromium 153.0.8010.12 và Firefox 155.0 PASS; Edge/Cốc Cốc thực và Safari chưa thử |
| Q09 | PASS | Console/network sạch, không API/tracking, ảnh cục bộ, JS syntax PASS |
| Q10 | NOT TESTED một phần | 10 bước, 12 prompt, edit-map counts PASS; chủ thể bản quyền và quyền cấp lại ảnh/brand cần chủ sản phẩm xác nhận trước bán. Không thử prompts với AI khác |
| Q11 | PASS | ZIP đã đọc lại/giải nén khớp nguồn; checks đúng hash; HTTP và file:// |
| Q12 | N/A | Không tích hợp, deploy hoặc thay database/cửa hàng |
| Q13 | PASS cho bản concept | D01–D08: mục tiêu showcase rõ; bố cục rail/số năm lớn, gallery nhiều lớp và ảnh riêng; nội dung có disclosure, không testimonials/chứng nhận giả |

## Tương tác và chuyển động

interaction-checks.json: đổi finish rồi đổi lại nhanh, opacity cuối 1; gallery previous từ 01 về 03, next về 01; phím mũi tên, thao tác nhanh, dialog mở/đóng bằng Escape và focus trả lại đều PASS trên hai browser. Scroll frame giữa Chromium opacity 0.618981 / translateY 15.8758 px; Firefox 0.725982 / 11.4174 px; cuối 1 / none, cuộn ngược vẫn hiển thị. Không RAF vô hạn. No-JS không chặn điều hướng/nội dung.

## Gói kiểm tra

candidate.zip: 550613 byte. SHA-256 ff6bbe3970f6dd7e3c7d044d277c1c6e25d49ad52b9cc5b3f7a78ebfb1fec3d1. Đã đọc lại mười file khớp source. Script check-template trả mã 1 vì hai external-link flags nêu trên; giữ nguyên raw report, không đổi thành raw PASS. Đã xác minh external URL riêng bằng HTTP 200.

Lệnh: node --check assets/js/main.js; dong-goi.mjs aerox-studio --ngoai-le; check-template.mjs aerox-studio --version 1.0.0 --out release-candidate --ngoai-le. Browser tests dùng bản ZIP giải nén; custom interaction và scroll tests dùng nguồn cùng phiên bản.

Trạng thái: bản mẫu local để xem xét, chưa phát hành thương mại, chưa chứng minh fidelity >95%. Mọi ảnh tạo bằng image_gen; ảnh/sản phẩm/giá/finish là minh hoạ, không phải site hãng chính thức.
