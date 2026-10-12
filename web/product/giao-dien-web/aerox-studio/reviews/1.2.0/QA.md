# Aerox Studio 1.2.0 — thêm sản phẩm và màu

Phạm vi theo yêu cầu: giữ hai lựa chọn cũ; thêm Aerox Racing Blue, Urban Touring Burgundy và Classic City Mint. Ba ảnh mới tạo bằng image_gen, cùng góc chụp và nền trong suốt; WebP 1280 px quality 80. Bốn ảnh dùng trước đó giữ nguyên. Có 5 lựa chọn với 3 kiểu xe; Graphite vẫn là mô phỏng grayscale. Urban/Classic là concept độc lập, không dùng giá hoặc thông số bịa. Thông số và gallery phanh giữ phạm vi Aerox gốc.

Carousel vẫn thủ công, 1100 ms, không autoplay. Thay đổi ảnh, alt, tên, màu, tiêu đề, nhãn trước/sau và dấu chọn đồng bộ. Danh sách lấy từ products trong main.js, modulo theo số lượng thật.

Chromium 153 / Firefox 155 PASS: tất cả 5 mục ảnh tải đủ và tiêu đề đổi đúng, wrap cuối→đầu/đầu→cuối, bấm nhanh, không pageerror; 1440×900, 820×1180, 375×812, 320×740 không overflow. Số đo ở product-checks.json. Đã xem product-3.png và product-4.png trực tiếp. Không chạy lại toàn bộ menu/axe/contrast suite cũ, không tuyên bố mọi browser đã thử.

JS syntax PASS. ZIP candidate 951372 byte, SHA-256 07e526df1a9be51ff3dde8cb77d66386a3e8a1199a31189805e829a40e634540. 13 file đọc lại khớp nguồn, 7 WebP cục bộ. Giữ ngoại lệ raster và interaction riêng mẫu đã được yêu cầu; không đổi chuẩn chung. Chưa phát hành thương mại; các giới hạn về chủ thể bản quyền/ảnh/brand và Edge/Cốc Cốc/Safari như hồ sơ 1.0.0.
