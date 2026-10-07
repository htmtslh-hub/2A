# Shirtline 1.1.3 — bóng sàn và palette sáng

07/10/2026. Đối chiếu frame 3 giây của video áo khoác: bóng oval mềm tách khỏi gấu áo trên nền sáng. Frame lưu design/reference-shadow.png.

Phạm vi: main.js thêm năm bóng trang trí cùng vị trí/scale với năm áo; motion.css style bóng sàn và giảm contour shadow; theme.css đổi năm palette sang sáng, chữ tối; CUSTOMISE và demo/preview/ZIP. Không sửa NovaTrend hoặc cấu hình chung. Ngoại lệ/hạn chế nghiệm thu 1.1.0 vẫn áp dụng.

PASS phần sửa: Edge headless HTTP localhost:4372, nhìn design/preview-shadow.png; năm bóng xuất hiện, transform giữa lượt thay đổi, chuyển áo 02 hoàn tất, viewport 320 không tràn ngang; node --check. Bóng sàn có opacity/size theo chiều sâu, ảnh phụ giữ kích thước nhỏ. Không chạy lại toàn bộ Q01–Q13, Cốc Cốc, hoặc đo tương phản toàn trang ở lần sửa này.

Demo đồng bộ bốn file, preview sinh từ bản mới. Gói ZIP đóng bằng dong-goi.mjs --ngoai-le, đọc lại 15 file khớp byte source; số byte/hash lấy từ output đóng gói của phiên bản này. Chưa triển khai online.
