# Watchroom 1.1.1: ánh sáng tâm có animation

Ngày 06/10/2026. Yêu cầu: làm sáng phần tâm và thêm animation. Phạm vi: CSS ánh sáng, JS fallback/pause, tài liệu, generator, demo/preview và ZIP Watchroom. Không chỉnh sản phẩm hoặc cấu hình chung; ngoại lệ ảnh/quyền thương mại của 1.1.0 được kế thừa, không tự đổi LICENCE.

Tăng gradient nền ở tâm từ navy mờ sang peach ấm. Hai pseudo-element phía sau ảnh đồng hồ có animation `center-breathe` 7 giây và `center-drift` 12 giây, chạy mặc định cả khi hệ thống yêu cầu giảm chuyển động. Chỉ animate transform/opacity, không blur nền hoặc JS loop vô hạn. Clip cục bộ ánh sáng giữ mobile không tràn.

Pause motion tạm dừng cả ::before và ::after. Khi CSS animation không hoạt động, fallback requestAnimationFrame chạy một nhịp hữu hạn 4.8 giây lúc mở, đổi mẫu hoặc resume; hủy nhịp cũ khi thao tác mới/pause. Không lưu trạng thái off.

## Gói

ZIP: 474750 byte, chín file; SHA-256 `c59eacabb98ea9f85919cd517431532a6970ce2ccc776240a25bd6aff0af91b6`. `dong-goi.mjs watchroom --ngoai-le` đọc lại và so khớp byte với source. Demo CSS/JS và preview được cập nhật cho cùng sản phẩm.

## Kiểm tra thay đổi

`check-light.mjs` ghi `light.json`: Chromium, Firefox, Edge và Cốc Cốc cài trên Windows, chạy headless. Đo opacity/transform của hai lớp giữa các frame, pause/resume, carousel, bốn khổ 1440×900, 820×1180, 375×812, 320×740, và fallback khi ép CSS animation:none. Cấu hình prefers-reduced-motion:reduce. `node --check` main.js không lỗi. Ảnh `screenshots/center-light.png` đã xem trực quan: tâm sáng rõ, không che chữ/đồng hồ.

Đây là kiểm tra phần ánh sáng bị ảnh hưởng, không chạy lại toàn bộ axe, pixel contrast, shortlist, ZIP giải nén hoặc luồng cửa hàng của bản trước. Bằng chứng tổng thể 1.1.0 giữ nguyên trong hồ sơ cũ; không tuyên bố đã nghiệm thu lại các phần chưa thử. Safari và thiết bị cảm ứng vật lý chưa thử. Animation nền liên tục là theo yêu cầu mới, có Pause chủ động; không áp dụng mặc định dừng sau 5 giây của chuẩn cũ cho phần ánh sáng này.

Các mục bị ảnh hưởng: Q02 responsive, Q03 pause/carousel, Q07 mặc định motion/fallback, Q08 console, Q09 frame hữu hạn fallback, Q10 hướng dẫn, Q11 byte/hash, D04 màu và D05 bố cục. Phiên bản là bản dựng review; các giới hạn phát hành ảnh/licence và Q12 cửa hàng của 1.1.0 không thay đổi.
