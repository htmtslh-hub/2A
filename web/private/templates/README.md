# File giao diện để giao cho khách

Đặt các file `.zip` vào đúng thư mục này. API `/api/download` đọc từ đây và
**không** phục vụ file tĩnh trực tiếp, nên khách chưa mua không tải được.

Quy ước tên file:

| File | Dùng cho |
|---|---|
| `t1.zip` … `t18.zip` | từng giao diện, khớp `id` trong `TPL_META` |
| `bundle.zip` | gói trọn bộ thư viện |
| `free-sample.zip` | mẫu miễn phí gửi qua form thu email |

Thiếu file nào thì API trả 404 kèm tên file cần đặt.
