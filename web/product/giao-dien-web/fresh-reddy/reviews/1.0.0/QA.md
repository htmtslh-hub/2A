# Fresh & Reddy — QA 1.0.0
Ngày 16/10/2026. WEB-STATIC-1 / standards 1.2.1. Trạng thái CHƯA ĐẠT PHÁT HÀNH. Chỉ candidate local; không sửa sản phẩm khác.

| Mục | Trạng thái | Bằng chứng/giới hạn |
|---|---|---|
| Q01 | PASS | Sáu file source, source-manifest.json |
| Q02 | PASS | candidate-checks.json, ảnh Chromium/Firefox: 1440, 820, 375, 320, không overflow |
| Q03 | PASS | Anchor tồn tại; mobile open/close/Escape; supplemental menu link và resize reset |
| Q04 | NOT TESTED | Skip focus và main target PASS; Escape trả focus PASS; chưa chạy toàn chuỗi Tab/Shift+Tab |
| Q05 | PASS | Một h1, landmarks; axe 0 violations Chromium |
| Q06 | NOT TESTED | axe không báo contrast; chưa đo thủ công mọi vùng/hover |
| Q07 | NOT TESTED | file offline, no-JS 320 PASS; OS reduce vẫn có motion; 720×450 zoom-equivalent không tràn nhưng chưa zoom browser 200% thực |
| Q08 | PASS | Chromium 153.0.8010.12, Firefox 155.0, Windows, file URL; bổ sung Chromium HTTP. Không Safari/thiết bị thật/Edge/Cốc Cốc |
| Q09 | NOT TESTED | Không pageerror trong browser tests; chưa ghi đầy đủ network/performance; không ZIP |
| Q10 | FAIL | 10 bước/12 prompt/edit-map có; quyền thương hiệu và copyright owner chưa xác nhận |
| Q11 | N/A | Chưa đóng ZIP vì gate FAIL; chưa thử gói |
| Q12 | N/A | Không thuộc phạm vi catalog/store/deploy |
| Q13 | FAIL | Xem ACCEPTANCE.md; hình SVG chưa đạt giống >95 |

D01 PASS: coffee service và CTA rõ. D02 PASS: ba cốc nổi, chữ lớn và palette charcoal/red. D03 PASS: từng section có mục đích. D04 PASS: token hệ thống nhất quán. D05 PASS ở khổ ảnh đã xem; D06 PASS demo tiếng Anh không số liệu giả. D07 FAIL: reference identity chưa được phép thương mại. D08 PASS: trial ghi rõ enquiry, email demo nhất quán.

Tương tác: nav/dots/arrows là section anchor; CTA service/tasting tới nội dung thật. Trial không gửi booking. Mailto mở email client và dùng example.com. Community icons tới culture, cần URL thật khi tuỳ chỉnh. Không giả success/backend.

Giới hạn: chữ/header/targets desktop nhỏ theo reference chưa đạt đầy đủ tiêu chí 14/16px và 44px. Không xin hoặc tự áp ngoại lệ. Không package/push/deploy khi gate chưa PASS. Original cup artwork không có; cần asset gốc được phép dùng và ngoại lệ ảnh nếu muốn khớp render 3D.

Mã/báo cáo mới chỉ trong fresh-reddy/. Các thay đổi sẵn có ngoài đó được giữ nguyên. Hash source: source-manifest.json; ZIP byte/hash N/A. Preview cửa hàng/video N/A vì chưa tích hợp.


## Cập nhật ảnh — 16/10/2026
Người dùng yêu cầu tạo ảnh cốc và xóa nền: đã thay SVG bằng PNG RGBA 1312×1199, alpha 0–255, bốn góc alpha=0. Ảnh lưu local assets/img/coffee-cups-transparent.png, 1,449,843 byte. Ngoại lệ ảnh/phần source tăng lên 7 file theo yêu cầu mới; không đóng ZIP hoặc đổi chuẩn chung. Candidate-checks.json/screenshots được chạy lại với ảnh mới. source-manifest-image-update.json là manifest hiện tại; kết luận fidelity cũ không còn áp dụng cho ảnh mới. Chưa chấm lại fidelity, chưa phát hành. LICENCE giữ nguyên.
