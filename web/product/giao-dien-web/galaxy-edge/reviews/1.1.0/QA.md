# QA — Galaxy Edge 1.1.0

12/10/2026. Phạm vi: chỉ hero từ SVG sang ảnh tự tạo theo yêu cầu mới nhất, cùng tài liệu và gói kiểm tra. Ngoại lệ W01/W03/W06 riêng mẫu này: bảy file, một WebP cục bộ và gói vượt 20 KB; không đổi chuẩn chung.

Ảnh tạo bằng image_gen built-in, prompt trong IMAGE-PROMPT.md. Gốc 1672×941; WebP quality84 không crop, 179212 byte. Đã xem hero-desktop.png, hero-phone.png và screenshots/chromium-320.png; chữ đọc được, không đè/cắt nội dung. Desktop crop giữa, mobile 62% center. Ảnh missing: ở 375px scrollWidth=375, nội dung/CTA vẫn còn. HTTP ảnh trả 200 với image/webp.

| Mục | Kết quả |
|---|---|
| Q01 | PASS theo ngoại lệ raster đã yêu cầu: sáu file chuẩn và một ảnh |
| Q02–Q07 | PASS: bốn viewport, menu, keyboard, axe, contrast pixel, zoom200, offline, noJS, file:// |
| Q08 | Chromium 153.0.8010.12 / Firefox 155.0 PASS; Edge/Cốc Cốc/Safari NOT TESTED |
| Q09 | PASS: không console/network lỗi, ảnh cục bộ, không dependency mới |
| Q10 | Số đếm/10 bước/12 prompt PASS; điều khoản cấp quyền ảnh thương mại và chủ thể bản quyền chờ chủ sản phẩm, không tự sửa LICENCE.txt |
| Q11 | PASS: ZIP đã đọc lại và giải nén khớp nguồn |
| Q12 | N/A: không tích hợp hoặc deploy cửa hàng |
| Q13 | PASS cho thay đổi hero; cảnh điện ảnh rõ, giữ copy/layout và hành vi |

Candidate ZIP 195721 byte. SHA-256 375645fe337568354d40fda16f34b89d3a623ce85648cd3b237d3798b2f1d06c. Không công bố >95 fidelity hoặc gói thương mại đã nghiệm thu; candidate nằm trong hồ sơ. Bản cũ giữ trong reviews/1.0.0.

Lệnh kiểm tra: dong-goi.mjs galaxy-edge --ngoai-le; check-template.mjs galaxy-edge --version 1.1.0 --ngoai-le. Tất cả kiểm tra tự động PASS.
