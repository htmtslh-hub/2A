# Brief — FitClub Food 1.0.0

```text
Loại sản phẩm: web-template
Hồ sơ: WEB-STATIC-1 (kèm ngoại lệ W01/W03/W05/W06 đã uỷ quyền trong luồng tạo sản phẩm từ ảnh tham chiếu)
Phiên bản sản phẩm: 1.0.0
Tên sản phẩm: FitClub Food
Slug: fitclub-food
Ngành / tình huống sử dụng: Fitness Nutrition & Healthy Bowl Club / Meal Prep & Salad Bar Landing Page
Người mua mẫu: Câu lạc bộ thể hình kết hợp bếp dinh dưỡng (fitness & healthy food club), thương hiệu salad bowl & macro meal-prep, quán ăn eat-clean hoặc huấn luyện viên dinh dưỡng cần trang giới thiệu thực đơn bowl theo mục tiêu tập luyện
Người truy cập trang sau khi khách tuỳ chỉnh: Hội viên phòng tập và khách hàng yêu thích ăn uống lành mạnh muốn khám phá khẩu phần salad/hạt/trái cây tươi, chuyển đổi giữa các khay dinh dưỡng (Club Harvest, Protein Macro, Berry Vitality), xem thành phần calo/macro và gửi yêu cầu đặt khay ăn hoặc đăng ký gói tuần
Mục tiêu chính của trang: Tái hiện chuẩn xác bố cục nền tím mận trầm (#341d3c / #26162c) với ánh sáng tím hồng góc trái trên, cụm tiêu đề "Fitreess & / Healthy Club / Food", nút chuyển màu hồng-tím, dải vòng tròn đồng tâm bên phải ôm trọn bàn tiệc 3 tô thực phẩm tươi (salad rau quả, hạt dinh dưỡng, hạt lựu, dâu tây, bơ sáp) và thanh 4 trụ cột tính năng có vạch chia dọc ở chân hero; đồng thời cung cấp các section chi tiết phía dưới để tra cứu thực đơn, macro và đặt phần ăn qua email thật
CTA chính và đích đến: Nút gradient hồng-tím ở hero ("ORDER BOWL" / dẫn tới #order) và nút viền trắng trên thanh điều hướng ("JOIN" / dẫn tới #plans) cùng liên kết đặt món qua email thật mailto:kitchen@fitclubfood.example
Nội dung / section bắt buộc:
  1. Hero & Feature Bar khớp ảnh tham chiếu 856×740:
     - Thanh accent tím lavender ở sát mép trên cùng (y: 0..6px, x: 0..625px)
     - Header: Thương hiệu bên trái "FFIFEET CTUB" (giữ đúng vị trí/tỷ lệ chữ in hoa không chân của ảnh mẫu, kèm hướng dẫn đổi tên trong CUSTOMISE.md), 4 liên kết điều hướng ("PROGRAMS", "NUTRITION", "BOWLS", "CHEF NOTES") và nút viền trắng bo tròn ("JOIN")
     - Cột trái Hero: Dòng phụ màu hồng phấn (#ea93e4) "Fitreess &", tiêu đề lớn 2 dòng màu trắng "Healthy Club" / "Food", đoạn mô tả 3 dòng bằng tiếng Anh rõ nghĩa thay cho chữ mẫu lấp chỗ (theo quy chuẩn D06), nút pill chuyển sắc hồng-tím (#dc64bb → #9958d0), cụm lưới chấm thoi hồng ở mép dưới trái
     - Cột phải Hero: Hai vòng cung đồng tâm màu tím trầm, đường kẻ đứt nét chéo ở góc phải trên, bàn tiệc 3 tô thực phẩm tách nền trong suốt (tô lớn salad rau xanh - dâu đen - cà chua bi - đậu gà - cam - dưa leo; tô vừa hạt óc chó & granola; chén nhỏ hạt lựu đỏ; kèm 2 quả dâu tây, nửa quả bơ, việt quất, lá húng quế) kèm điều khiển chuyển đổi 3 khay dinh dưỡng (Club Harvest, Protein Macro, Berry Vitality)
     - Thanh 4 tính năng đáy Hero (ngăn cách bởi 3 đường kẻ dọc mảnh): 4 huy hiệu tròn tím (#432c4c) chứa icon nét mảnh trắng (Fresh Kitchen, Macro Certified, Organic Greens, Daily Box) và 2 dòng mô tả dưới mỗi huy hiệu
  2. Section #bowls (Signature Club Platters): Bảng chuyển đổi và so sánh 3 khay thực phẩm với thông số kcal, protein, chất xơ và nút xem trực tiếp trên bàn xoay Hero
  3. Section #nutrition (Macro & Ingredient Architecture): Chi tiết nguồn nguyên liệu tươi theo mùa và bảng thành phần dinh dưỡng mở rộng bằng thẻ <details>
  4. Section #plans (Club Meal Plans & Chef Notes): 3 gói thành viên dinh dưỡng theo tuần (Post-Workout, Lean Cut, Plant Vitality) và ghi chú bảo quản của bếp trưởng
  5. Section #order (Direct Kitchen Order & Contact): Tóm tắt khay đang chọn, tuỳ chọn khẩu phần (Standard 480 kcal / Athlete 640 kcal / Plant Plus 540 kcal) và nút gửi yêu cầu đặt món qua email thật
Hướng thị giác: Nền tím mận sâu (#341d3c → #231429) kết hợp quầng sáng tím magenta (#7a4579) ở góc trái trên; chữ tiêu đề Plus Jakarta Sans đậm nét hiện đại; nút pill chuyển sắc hồng magenta sang tím violet (#dc64bb → #9958d0); vòng tròn đồng tâm геометрический bên phải làm nổi bật màu xanh rau tươi, đỏ dâu tây/cà chua và vàng cam của thực phẩm
Điều cần tránh: Không đưa nút công cụ phóng to 2 chiều của ứng dụng xem ảnh ở góc dưới bên phải (x: 791..855, y: 633..719) vào giao diện web; không giữ chữ vô nghĩa ở đoạn văn mô tả; không giả lập thanh toán trực tuyến hay tài khoản backend; không dùng overflow-x:hidden trên html/body
Tài sản / nội dung được cung cấp và quyền sử dụng: Ảnh tham chiếu media_1792199311495_de83b151.jpg (856×740 px, SHA-256: b98b677cd5d5bf340c54c29876ccbb3ce40fec4764cb866836c3f24ffad643f2) do chủ sản phẩm cung cấp; ảnh studio tự tạo tại design/platter-generated.jpg và 3 ảnh WebP tách nền trong suốt tại source/assets/img/ (platter-club.webp, platter-protein.webp, platter-berry.webp)
Phạm vi giao: Gói sản phẩm hoàn chỉnh (fitclub-food.zip) kèm tích hợp cửa hàng Forge Zone (demo public, preview webp, video preview mp4 15 giây, catalog & guide 3 ngôn ngữ vi/en/zh), push GitHub và deploy Vercel
Yêu cầu bổ sung / ngoại lệ được chủ sản phẩm chấp nhận: Ngoại lệ W01/W03/W05/W06 cho 3 ảnh WebP tách nền trong suốt, dung lượng ZIP > 20.480 byte, tương tác chuyển khay thực phẩm/khẩu phần/dialog hữu hạn; tuân thủ quy tắc animation 05/10/2026 (mặc định bật trên mọi trình duyệt kể cả khi OS bật prefers-reduced-motion, dùng requestAnimationFrame hữu hạn và có nút Pause motion trong phiên)
```

## Trọng số Rubric cố định trước khi dựng (tổng 100%)

- `header-nav` (Dải tím trên cùng, thương hiệu góc trái trên, 4 liên kết menu và nút pill viền trắng góc phải trên): **14%**
- `hero-left-copy` (Quầng sáng tím góc trái, dòng phụ hồng `Fitreess &`, tiêu đề `Healthy Club / Food`, đoạn mô tả 3 dòng, nút pill hồng-tím và lưới chấm thoi hồng góc dưới trái): **26%**
- `hero-food-stage` (Hai vòng cung đồng tâm tím trầm, đường đứt nét góc phải trên và bàn tiệc 3 tô thực phẩm tách nền cùng dâu tây, bơ sáp, việt quất, lá húng): **38%**
- `bottom-feature-bar` (4 huy hiệu tròn tím có icon nét trắng, 2 dòng chú thích mỗi mục và 3 vạch chia dọc mảnh): **22%**

Trọng số 5 trục trong mỗi vùng: Bố cục & hình học 25%, Typography 20%, Màu & bề mặt 15%, Hình ảnh & icon 25%, Khoảng cách & mật độ 15%.
Khung chuẩn hóa đối chiếu: `856×740` CSS px (DPR 1, scroll 0), loại trừ nút phóng to của ứng dụng xem ảnh ngoài ở góc dưới phải (`x: 791..855, y: 633..719`).
