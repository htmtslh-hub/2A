# Brief — Volt Hoodie 1.0.0

```text
Loại sản phẩm: web-template
Hồ sơ: WEB-STATIC-1 (kèm ngoại lệ W01/W03/W05/W06 đã uỷ quyền trong luồng tạo sản phẩm từ ảnh tham chiếu)
Phiên bản sản phẩm: 1.0.0
Tên sản phẩm: Volt Hoodie
Slug: volt-hoodie
Ngành / tình huống sử dụng: Streetwear & Athletic Apparel Showroom / Hoodie Product Landing Page
Người mua mẫu: Thương hiệu thời trang đường phố (streetwear), studio thiết kế trang phục thể thao, cửa hàng capsule drop hoặc nhà thiết kế cần trang giới thiệu sản phẩm thời trang có tương tác chọn màu và kích cỡ
Người truy cập trang sau khi khách tuỳ chỉnh: Người mua sắm thời trang muốn xem thiết kế áo hoodie từ nhiều phối màu, kiểm tra bảng size (S/M/L), chất liệu, cấu trúc kỹ thuật và gửi yêu cầu đặt mua
Mục tiêu chính của trang: Trình bày nổi bật mẫu áo Hoodie 2024 trên bố cục chia chéo đen than (#272727) và vàng volt (#FFD507), cho phép chọn 3 phối màu (Volt Yellow, Cyber Mint, Pure White), chọn size (S, M, L), xem chi tiết kỹ thuật và thực hiện hành động "Buy Now" dẫn tới khu vực đặt mua / liên hệ thực tế
CTA chính và đích đến: "Buy Now" dẫn tới #order (khối thông tin đặt hàng và liên hệ email thực tế mailto:orders@volthoodie.example)
Nội dung / section bắt buộc:
  1. Hero chia chéo (#272727 / #FFD507) đúng bố cục ảnh tham chiếu 930×602:
     - Góc trái trên: biểu tượng áo hoodie nét trắng trong suốt
     - Thanh điều hướng: Shop, Kid's, Sport's, Support, nút tìm kiếm mở hộp thoại tra cứu nhanh, nút Log In & Sing Up (giữ đúng chữ tham chiếu, mở hộp thoại thông báo demo minh bạch), nút menu 3 gạch
     - Cột trái trên nền đen: chữ dọc "2 0 2 4", cụm "Color" với 3 chấm màu (Vàng #FAD81D, Xanh ngọc #5CEBC0, Trắng #F8F9FB), 2 biểu tượng mạng xã hội tròn trắng (Facebook, Instagram) ở góc dưới trái
     - Trung tâm lệch trái: hình ảnh áo hoodie 3D phối vàng – đen họa tiết đa giác (cùng 2 biến thể màu khi chuyển), bên phải áo là cột "Size" (S, M, L)
     - Khối nội dung phải: tiêu đề lớn "Hoodie", đoạn mô tả ngắn, giá "Rs. 1559/-", nút viền đen "Buy Now", thanh chỉ báo trượt dọc bên phải, chữ chìm "HOODIE" khổ lớn phía sau và 3 chấm phân trang ở đáy hero
  2. Section #shop (Craft & Architecture): Chi tiết cấu trúc vải nỉ 420 GSM, đường cắt chữ V phản quang, họa tiết low-poly tay áo và khóa chọn phối màu trực tiếp
  3. Section #kids (Kid's & Youth Capsule): Bộ sưu tập cỡ trẻ em & thiếu niên đồng bộ họa tiết Volt Geometric
  4. Section #sports (Sport's Performance Lab): Thông số giữ nhiệt, độ thoáng khí, bảng quy đổi kích cỡ S / M / L chi tiết
  5. Section #support & #order (Order Enquiry & Support): Tóm tắt cấu hình đang chọn (phối màu, size, giá Rs. 1559/-), liên kết đặt hàng qua email thật và câu hỏi thường gặp
Hướng thị giác: Bố cục chia chéo táo bạo giữa nền đen than (#272727) bên trái (16.88% ở đỉnh xuống 38.28% ở đáy) và nền vàng rực (#FFD507) bên phải; typography Poppins đậm chắc hiện đại; chữ watermark "HOODIE" khổ lớn sắc độ vàng trầm (#F1CC17) phía sau
Điều cần tránh: Không nhúng cụm 2 nút công cụ xem ảnh ở góc dưới bên phải của ảnh gốc (nút phóng to hai chiều và nút tìm kiếm kính lúp có sao của ứng dụng ngoài); không giả lập thanh toán hay đăng nhập backend; không dùng overflow-x:hidden trên html/body
Tài sản / nội dung được cung cấp và quyền sử dụng: Ảnh tham chiếu media_1792157371150_e4ac8e45.jpg (930×602 px, SHA-256: 2686fcb29be1012ad6b1b8cfcb7ebb6061c1cd9e52b898a5b76836b5a3066338) do chủ sản phẩm cung cấp; 3 ảnh sản phẩm WebP tách nền trong suốt tự tạo tại source/assets/img/
Phạm vi giao: Gói sản phẩm hoàn chỉnh (volt-hoodie.zip) kèm tích hợp cửa hàng Forge Zone (ô catalog t46, phân loại commerce, demo public, preview webp và video preview mp4), push GitHub và deploy Vercel
Yêu cầu bổ sung / ngoại lệ được chủ sản phẩm chấp nhận: Ngoại lệ W01/W03/W05/W06 cho 3 ảnh WebP tách nền trong suốt, dung lượng ZIP > 20.480 byte, tương tác đổi màu/size/carousel/dialog hữu hạn; tuân thủ quy tắc animation 05/10/2026 (mặc định bật trên mọi trình duyệt kể cả khi OS bật prefers-reduced-motion, dùng requestAnimationFrame hữu hạn và có nút Pause motion trong phiên)
```

## Trọng số Rubric cố định trước khi dựng (tổng 100%)

- `navigation` (Thanh điều hướng, logo hoodie góc trái trên, liên kết, nút Log In / Sing Up / menu): **15%**
- `hero-left-controls` (Mảng chéo đen #272727, chữ dọc 2024, cụm Color 3 chấm, cụm Size S/M/L, 2 icon mạng xã hội): **20%**
- `product-hoodie` (Áo hoodie trung tâm: mũ vàng lòng đen, dây rút, mảng V vàng trước ngực, tay áo đen họa tiết đa giác, viền túi vàng, bo gấu vàng): **35%**
- `hero-copy-cta` (Tiêu đề Hoodie, đoạn mô tả, giá Rs. 1559/-, nút Buy Now, thanh trượt dọc phải): **20%**
- `backdrop-pagination` (Chữ chìm HOODIE khổ lớn và 3 chấm phân trang đáy): **10%**

Trọng số 5 trục trong mỗi vùng: Bố cục & hình học 25%, Typography 20%, Màu & bề mặt 15%, Hình ảnh & icon 25%, Khoảng cách & mật độ 15%.
Khung chuẩn hóa đối chiếu: `930×602` CSS px (DPR 1, scroll 0), loại trừ vùng overlay trình xem ảnh ngoài ở góc dưới phải (`x: 825..922, y: 390..590`).
