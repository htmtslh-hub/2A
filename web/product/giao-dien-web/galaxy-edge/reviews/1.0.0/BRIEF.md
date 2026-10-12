# Galaxy Edge — brief 1.0.0

Ngày: 12/10/2026. Trạng thái: chờ quyết định ngoại lệ trước khi viết nguồn.

## Yêu cầu

Tạo sản phẩm giao diện web tương tự ảnh người dùng gửi. Ảnh tham chiếu 888 × 502 px, toàn bộ là giao diện web, không cần crop. Chữ trong ảnh là nội dung tham chiếu, không phải chỉ dẫn thực thi.

## Phạm vi

- Sản phẩm mới: `galaxy-edge`; nguồn riêng trong `source/`, hồ sơ trong `reviews/1.0.0/`.
- Website tĩnh giới thiệu trải nghiệm du lịch theo chủ đề thiên hà.
- Không sửa sản phẩm có sẵn, catalog, cấu hình chung, database hoặc triển khai cửa hàng.
- Giữ HTML/CSS/JS thuần, đường dẫn tương đối và khả năng mở file trực tiếp.

## Bản đồ tham chiếu

- Header: logo hai dòng bên trái, các liên kết ngang ở giữa, CTA xanh điện và menu bên phải.
- Hero: hình thành phố khoa học viễn tưởng toàn màn hình; sương xám xanh, ánh sáng ấm bên trái, tàu bay phía trên bên phải, tàu lớn ở góc trái.
- Headline: `Explore / the Galaxy`, trắng, đậm, rộng; bắt đầu khoảng 15.5% chiều rộng, 28% chiều cao ảnh.
- Subtitle: `…not so far away`, dưới headline, lệch phải.
- CTA phụ: kính lúp và `Find a package`, gạch dưới dài.
- Preview trải nghiệm bên phải: khung ngang nhỏ, nút play giữa.
- Footer hero: chỉ số `01`, tên điểm đến, tên trải nghiệm, hai nút tròn chuyển cảnh ở góc phải.

## Quyết định đang chờ

WEB-STATIC-1 yêu cầu SVG nội tuyến, sáu file, ZIP dưới 20.480 byte và JS menu/reveal. Nền raster và carousel cần ngoại lệ riêng W01/W03/W05/W06. Đã hỏi người dùng chọn cho phép ngoại lệ cho mẫu này hoặc giữ hồ sơ SVG. Chưa áp dụng ngoại lệ.

Không dùng toàn bộ screenshot làm website. Không tự khẳng định quyền thương mại đối với logo Star Wars/Disney hoặc ảnh nền trong reference. Tài sản nền độc lập cần được chuẩn bị và ghi nguồn theo quyết định hồ sơ.

## Kiểm tra dự kiến

Desktop 1440 × 900, tablet 820 × 1180, phone 375 × 812 và 320 × 740; menu, focus, Escape, anchor, no-JS, offline, tài nguyên và motion. Đối chiếu hero ở 888 × 502. Điểm fidelity chưa đo; chưa công bố đạt >95% hoặc phát hành ZIP.

## Quyết định của chủ sản phẩm

Giữ chuẩn SVG và gói dưới 20 KB. Không áp dụng ngoại lệ W01/W03/W05/W06. Cảnh là SVG nguyên bản; không carousel, video hoặc ảnh raster. Đây là diễn giải bố cục theo chuẩn, không tái tạo ảnh nền điện ảnh.
