# Shirtline 1.1.3 — bóng sàn và palette sáng

07/10/2026. Đối chiếu frame 3 giây của video áo khoác: bóng oval mềm tách khỏi gấu áo trên nền sáng. Frame lưu design/reference-shadow.png.

Phạm vi: main.js thêm năm bóng trang trí cùng vị trí/scale với năm áo; motion.css style bóng sàn và giảm contour shadow; theme.css đổi năm palette sang sáng, chữ tối; CUSTOMISE và demo/preview/ZIP. Không sửa NovaTrend hoặc cấu hình chung. Ngoại lệ/hạn chế nghiệm thu 1.1.0 vẫn áp dụng.

PASS phần sửa: Edge headless HTTP localhost:4372, nhìn design/preview-shadow.png; năm bóng xuất hiện, transform giữa lượt thay đổi, chuyển áo 02 hoàn tất, viewport 320 không tràn ngang; node --check. Bóng sàn có opacity/size theo chiều sâu, ảnh phụ giữ kích thước nhỏ. Không chạy lại toàn bộ Q01–Q13, Cốc Cốc, hoặc đo tương phản toàn trang ở lần sửa này.

Demo đồng bộ bốn file, preview sinh từ bản mới. Gói ZIP đóng bằng dong-goi.mjs --ngoai-le, đọc lại 15 file khớp byte source; số byte/hash lấy từ output đóng gói của phiên bản này. Chưa triển khai online.

## Production — 07/10/2026

Theo yêu cầu push/deploy của chủ sản phẩm, release bắt đầu từ origin/master `419be6b` (đúng bản production trước đó), bảo toàn admin và sản phẩm đã triển khai. Chỉ thêm Shirtline source/demo/preview/ZIP, hồ sơ riêng và catalog t15. Không đưa thay đổi đang dở khác trong workspace vào release. Catalog mô tả năm áo bằng vi/en/zh, category shop theo hệ thống đang chạy; asset revision 1.1.3.

Commit mã nguồn `39ccb77774c7e44f0db4616fe7dd73917515cc9a` đã push master. Deployment `dpl_EwfunbLpTbWs5UZiK3K1ZrmzSCnh` READY, build Next.js và TypeScript PASS, alias https://forgezone.store. CSS/JS HTML có query phiên bản 1.1.3 để tránh cache cũ.

ZIP cuối sau bổ sung query: 511070 byte, SHA-256 `a231e7a38135f52a02d1c0cc6a6ae75e0fdf602c66b32345714eaef1bc6cb1eb`.

`check-production.cjs` và `production-checks.json`: Edge 154.0.4258.62, Cốc Cốc 152.0.7977.124 chạy headless với profile test riêng. PASS năm áo/năm bóng, frame giữa cả hai chiều wrap, bóng di chuyển, rapid next/next/prev/next, bốn viewport không overflow, reduced-motion + off cũ, fallback khi CSS animations/transitions bị tắt và không pageerror. Online HTML/JS/motion.css/theme.css khớp release source sau chuẩn hóa newline; hash online lưu trong JSON. Homepage có Shirtline; homepage và demo NovaTrend/Watchroom/Japan Trails HTTP 200.

Không thay đổi dữ liệu production hoặc thực hiện thanh toán; tải ZIP bằng quyền khách thật NOT TESTED. Các hạn chế tài liệu/trợ năng trong QA 1.1.0 vẫn còn, không quảng cáo đạt toàn bộ WEB-STATIC-1.
