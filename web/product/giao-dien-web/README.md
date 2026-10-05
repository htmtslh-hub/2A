# Giao diện web

- AI sửa hoặc tạo sản phẩm: bắt đầu bằng [`AGENTS.md`](AGENTS.md). Dùng [`AI-START.md`](AI-START.md) để giao việc cho AI không tự đọc quy tắc trong repository.
- `<slug>/`: thư mục riêng của từng sản phẩm; bên trong có `source/`, `<slug>.zip` và `reviews/` hoặc `design/` khi có.
- `docs/`: quy chuẩn sản phẩm, hướng dẫn sản xuất và hướng dẫn khách hàng ba ngôn ngữ.
- `tools/`: công cụ đóng gói, chụp preview và kiểm tra sản phẩm.
- `reviews/`: hồ sơ kiểm tra chung của cả cửa hàng.
- `design/`: tài sản thiết kế dùng chung hoặc bản so sánh nhiều mẫu.

Chạy `node web/product/giao-dien-web/tools/dong-goi.mjs <slug>` từ gốc dự án để tạo ZIP trong thư mục của mẫu.
Ảnh preview và bản demo công khai nằm trong `web/public/` để giữ URL trên cửa hàng.
