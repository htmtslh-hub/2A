# Melt Muse — brief 1.0.0

Ngày: 09/10/2026. Sản phẩm mới, không sửa mẫu đang có.

- Loại: web-template, portfolio thời trang / nhiếp ảnh / nhật ký cá nhân.
- Người mua: studio sáng tạo, nhiếp ảnh gia, người làm nội dung thời trang.
- Mục tiêu: giới thiệu hình ảnh và câu chuyện, dẫn đến liên hệ email.
- CTA: Explore the edit → #edit; View story → #story; liên hệ → #contact; Email the studio → mailto:hello@example.com (demo phải thay).
- Hướng: nền giấy trắng, panel xám, chữ đen đậm, tim đỏ, hoa và spiral vẽ tay, thẻ ảnh viền xám và collage ảnh nghiêng.
- Section: hero typographic; portrait + studio note; personal story + hai ảnh; ba dịch vụ; liên hệ/footer.
- Tài sản tham chiếu: ảnh clipboard do chủ sản phẩm gửi, chỉ làm tham chiếu thị giác. Không lấy trực tiếp ảnh chân dung trong screenshot để giao khách.
- Tài sản mới: ba concept section và ba ảnh AI tạo bằng image_gen tích hợp. Concept lưu design/, chỉ ảnh WebP nằm trong source/assets/img/.
- Hồ sơ: WEB-STATIC-1 v1.2 + ngoại lệ W01/W03/W06 cho ảnh raster cục bộ theo yêu cầu mới nhất “tạo ảnh cho giống”. Không tự áp dụng hồ sơ IMG đang chờ duyệt, không sửa quy chuẩn chung.
- Mục tiêu đóng gói riêng của mẫu: sáu file bắt buộc + ba ảnh ≤300 KB/ảnh, ZIP <1 MiB. Quyền dùng/phân phối ảnh thương mại và chủ thể bản quyền cần chủ sản phẩm chốt; licence là bản nháp, không tự cấp quyền ảnh.
- Motion: mặc định bật theo rules ngày 05/10, entrance hữu hạn 280ms, không loop hay ẩn nội dung. JS chỉ menu/reveal. Không fake player/cart/search.
- Phạm vi: tạo source, tài liệu, ZIP, design và QA của melt-muse; public demo/preview chỉ riêng mẫu. Chưa đăng catalog bán hàng, chưa deploy.
- Giả định: chọn tên Melt Muse, nội dung Anh; portfolio studio giả định thay vì suy đoán loại dịch vụ từ chữ không đọc được trong screenshot. Tên email example.com dành cho demo.

## Phân tích hình trước khi viết mã

1. Hero concept: headline MELT/MUSE 2 dòng cực đậm, trung tâm; note rộng khoảng 45% khổ ảnh, viền 2px bo35px; tim nằm ngay mép trên note, CTA đỏ duy nhất. Khoảng trống quanh hero lớn. Hai doodle trái phải không cạnh tranh chữ. Nội dung cần giữ: A little soft. A little bold.; Fashion, portraits & things that feel like you.; Explore the edit.
2. Portrait concept: split khoảng 50/50, ảnh trái trong khung bo24px với caption trắng; phải headline và paragraph mở, note xám phẳng. Ảnh side-profile hướng mắt vào copy. Giữ heading THE SOFT SIDE, Soft focus, View story, Say hello. Không dựng panel bọc cả section.
3. Story concept: nền xám, đường chia ngang; hai ảnh cùng tỷ lệ dọc chồng lệch, plus/chat là trang trí; copy phải “Damn right.” và “Your kind of beautiful.”. Ba service blocks phẳng, footer mỏng. Section cao hơn screenshot để copy đạt 16px; mobile xếp dọc, không ép bản desktop vào màn hẹp.
4. Photo 1: profile phải, vai áo bèo trắng rõ, tóc đen/nền xám; object-position cần kiểm mắt/mặt khi crop ngang.
5. Photo 2: vest đen cổ trắng, tay gần má, studio mirror; không chữ và không overlay, ảnh giữ tỷ lệ dọc.
6. Photo 3: ảnh original người trưởng thành với outfit trắng đen, tay hình tim; cần nhìn đầu/ngón tay và crop thực sau khi có ảnh. Không tuyên bố các ảnh là cùng một người thật.

Màu dự kiến: #fcfcfa / #eeeeeb / #171716 / #51514e / #b5242c. Font Archivo Black + Archivo, tối đa 2 họ; font fallback Impact/Trebuchet MS. Nhịp section thay đổi từ hero centered sang split rồi collage. Mã thật dựng nội dung/UI, không dùng ảnh chụp website làm nền toàn trang.
