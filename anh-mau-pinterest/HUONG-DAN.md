# Thư mục nhận ảnh mẫu giao diện Web hàng ngày (`D:\2A\anh-mau-pinterest`)

Hàng ngày, anh chỉ cần bỏ các file ảnh mẫu giao diện web (`.png`, `.jpg`, `.jpeg`, `.webp`) vào trực tiếp thư mục này:
`D:\2A\anh-mau-pinterest\`

## Quy trình hoạt động tự động (09:00 AM hàng ngày hoặc khi gọi chạy ngay)
1. **Không tự tìm trên Pinterest nữa:** Agent chỉ đọc các ảnh anh bỏ sẵn trong `D:\2A\anh-mau-pinterest\`. Nếu thư mục trống, Agent sẽ tự động nghỉ ca đó mà không lấy ảnh linh tinh trên mạng.
2. **Phân tích thị giác & Sáng tạo bố cục riêng (`hallmark`):**
   - Đọc trực tiếp từng bức ảnh để phân tích bố cục, bảng màu, font chữ, thẻ kính mờ (Glassmorphism / Cutout tabs) và chủ thể chính.
   - Nếu mẫu web có chủ thể sản phẩm / vật thể 3D, Agent tự động tạo ảnh 3D độ phân giải cao và xóa nền trong suốt (`cutout.webp`) để làm hiệu ứng lấn khung (Out-of-bounds Pop-out).
3. **Tổ hợp hiệu ứng sáng tạo & đa dạng (Curated Motion Recipes):**
   - Không rập khuôn bắt mọi web phải có đủ tất cả hiệu ứng giống nhau.
   - Mỗi mẫu sẽ được phối một **tổ hợp hiệu ứng riêng biệt** (Scroll / Hover / Cursor / Text / Ambient) phù hợp nhất với phong cách của bức ảnh mẫu đó (ví dụ: mẫu thiên về Parallax đa lớp + Nút từ tính; mẫu thiên về Cuộn ngang + Gợn sóng chất lỏng WebGL/SVG; mẫu thiên về Ghim sản phẩm xoay theo cuộn + Thẻ nghiêng 3D...).
4. **Tự động lưu trữ ảnh đã làm:**
   - Sau khi tạo web, đóng gói `.zip`, quay preview 15s MP4 và đẩy lên GitHub/Vercel xong, ảnh gốc sẽ được tự động chuyển vào `D:\2A\anh-mau-pinterest\da-lam\<YYYY-MM-DD>\` để anh dễ theo dõi và không bao giờ bị làm trùng.

## Mẹo đặt tên file ảnh (Tùy chọn)
- Anh có thể giữ nguyên tên file gốc bất kỳ (ví dụ `dc3123.jpg`, `shot-1.png`), Agent sẽ tự đặt tên thương hiệu và chia tỷ lệ **2 Free + 3 Premium** (tối đa 5 mẫu/lần chạy).
- Nếu anh muốn chỉ định tên hoặc hạng Free/Premium ngay từ tên file, có thể đặt:
  - `free-ten-web.png` -> Tạo mẫu **Free** với tên `Ten Web`
  - `premium-ten-web.png` -> Tạo mẫu **Premium** với tên `Ten Web`
