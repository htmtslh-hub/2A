# ZIP giao cho khách

Mỗi sản phẩm giữ ZIP cùng tên trong thư mục riêng, ví dụ `../kinetiq/kinetiq.zip`.
Chạy `node web/product/giao-dien-web/tools/dong-goi.mjs <slug>` từ gốc dự án để tạo lại ZIP.
`free-sample/free-sample.zip` là mẫu miễn phí. Đơn trọn bộ cấp quyền tải từng mẫu riêng.

API `/api/download` đọc ZIP sau khi kiểm tra quyền. ZIP nằm ngoài `public/` nên không được phục vụ như file tĩnh.
