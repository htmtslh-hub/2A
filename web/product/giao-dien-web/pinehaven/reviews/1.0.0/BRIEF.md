# Brief chốt — Pinehaven 1.0.0

- Loại sản phẩm: giao diện web tĩnh cho một nơi nghỉ cabin giữa rừng.
- Hồ sơ áp dụng: WEB-STATIC-1 v1.2, có ngoại lệ ảnh bitmap theo yêu cầu trực tiếp của chủ sản phẩm.
- Người mua giả định: chủ cabin, khu nghỉ nhỏ hoặc studio thiết kế website du lịch.
- Người truy cập: khách muốn xem nơi ở và gửi yêu cầu tìm hiểu về kỳ nghỉ.
- Mục tiêu: giới thiệu không khí, cabin, khung cảnh và dẫn khách đến thông tin liên hệ.
- CTA chính: “Enquire about a stay” dẫn đến `#contact`; email trong đó là địa chỉ demo cần thay, không phải chức năng đặt phòng.
- Section: hero có bảng thông tin lưu trú; cabin; khung cảnh; trải nghiệm; liên hệ; footer.
- Hướng thị giác: ảnh cabin rừng sương xanh lam ở giờ chạng vạng, ánh đèn vàng ấm, viền khung lớn, headline sans cực rộng, bảng lưu trú kính tối; các phần dưới chuyển sang nền kem và bố cục tạp chí.
- Tài sản: ba ảnh gốc tự tạo bằng công cụ imagegen cho đúng sản phẩm. Ảnh người dùng cung cấp chỉ dùng tham khảo bố cục và cảm giác; không sao chép tài sản trong ảnh.
- Tên demo tự chọn: Pinehaven / Evergreen Pine Lodge. Sức chứa và `$295 / night` là ví dụ minh họa, không đại diện bất kỳ chỗ ở thật nào.
- Phạm vi thực hiện: gói ZIP có mã và hướng dẫn; demo, preview và mục catalog đã triển khai lên `forgezone.store` theo ủy quyền triển khai cửa hàng trước đó của chủ sản phẩm.
- Giá catalog kế thừa mức mặc định của cửa hàng: 1.900.000₫ hoặc $79. Chưa có giá riêng cho Pinehaven.

## Ngoại lệ đã áp dụng

Yêu cầu “hình ảnh em tự tạo” cần ảnh chụp phong cách rừng/cabin thực sự. Vì vậy gói có ba WebP cục bộ, tổng cộng chín file và khoảng 598 KB. Điều này vượt W01 (sáu file), W03 (chỉ SVG nội tuyến) và W06 (dưới 20.480 byte). Không có ảnh hotlink, base64 hay phụ thuộc mạng; `file://` vẫn chạy. Ngoại lệ phát sinh trực tiếp từ yêu cầu mới nhất, không áp dụng chung cho các mẫu khác.
