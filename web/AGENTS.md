## Bắt buộc đọc rules trước khi sửa nguồn

Đọc và làm theo [rules chung của dự án](../AGENTS.md) trước mọi thay đổi nguồn: xác định rõ phạm vi được phép thao tác và bảo toàn hoạt động của các file/sản phẩm khác. Đồng thời đọc đầy đủ rules ở file này và các tài liệu bắt buộc được dẫn tới.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Quy tắc trình bày sản phẩm trên cửa hàng

- Các thẻ sản phẩm ở trang chủ, thư viện và mục giao diện tương tự phải đặt ảnh hoặc video giao diện web rõ nét trong một khung nổi. Phía sau khung là nền phối màu hoặc hình ảnh cùng tông với chính giao diện đó, theo phong cách ảnh tham chiếu của chủ dự án; tránh để ảnh preview phủ kín toàn bộ vùng trưng bày.
- Không đặt nút “Xem chi tiết” riêng trong thẻ sản phẩm. Toàn bộ thẻ, gồm vùng preview và phần thông tin, là một liên kết mở trang chi tiết tương ứng.
- Liên kết của thẻ phải dùng được bằng chuột, cảm ứng và bàn phím, có trạng thái focus dễ thấy và URL có thể mở ở tab mới.
- Quy tắc này áp dụng cho giao diện cửa hàng Forge Zone, không áp đặt lên mã nguồn của từng template được bán.

## Thanh điều hướng và ngôn ngữ

- Thanh điều hướng chính chỉ có một hàng. Không khôi phục dải phụ chứa khẩu hiệu, email và các nút ngôn ngữ ở phía dưới.
- Khi khách chưa tự chọn ngôn ngữ, cửa hàng hiển thị theo thứ tự ưu tiên ngôn ngữ của trình duyệt (thường kế thừa hệ thống). Hỗ trợ tiếng Việt, tiếng Anh và tiếng Trung giản thể; nếu không khớp thì dùng tiếng Anh.
- Cụm hành động bên phải thanh điều hướng chỉ có một nút: “Đăng nhập” khi chưa đăng nhập; khi đã đăng nhập, vùng bấm hiện ảnh đại diện với tên tài khoản ở dưới và mở trang tài khoản, không có nền, viền hoặc bóng kiểu nút. Ảnh Google là mặc định khi có; ảnh và tên người dùng tự chỉnh trong trang tài khoản được ưu tiên. Không khôi phục nút đổi ngôn ngữ hoặc nút menu tại đây.
- Dynamic island thu gọn khi không tương tác và mở rộng khi rê chuột hoặc nhấn. Giữ nguyên năm mục Trang chủ, Thư viện, Quy trình, Bảng giá và Câu hỏi trong trạng thái mở; trên màn hình hẹp, các mục được cuộn ngang cạnh nút đăng nhập/tài khoản.
- Ngôn ngữ cửa hàng tự theo trình duyệt/hệ thống, kể cả khi người dùng đổi ngôn ngữ sau khi mở trang.

## Tài khoản và sản phẩm đã lưu

- Mỗi thẻ sản phẩm thật ở trang chủ, thư viện và phần giao diện tương tự có một nút lưu riêng, có nhãn cho trình đọc màn hình và trạng thái đã lưu rõ ràng. Nút này không nằm bên trong liên kết của thẻ.
- Sản phẩm đã lưu gắn với tài khoản và xuất hiện ở trang tài khoản cùng với ngày đăng ký, sản phẩm đã mua và hoạt động gần đây.
- Nút thêm giỏ nằm ngoài liên kết thẻ sản phẩm; giỏ cho phép thêm, xem tổng, xóa từng giao diện và thanh toán nhiều giao diện trong một đơn. Cần đăng nhập trước khi thanh toán giỏ. Sau webhook thanh toán thành công, mỗi giao diện trong giỏ phải có quyền tải riêng.
- Bấm biểu tượng giỏ trên thẻ chỉ thêm sản phẩm và cập nhật số ở giỏ hàng nổi; không tự mở ngăn giỏ hoặc phần thanh toán. Chỉ bấm giỏ hàng nổi mới mở ngăn giỏ.
- Trên thẻ sản phẩm, nút giỏ chỉ hiện biểu tượng giỏ hàng và giữ nhãn truy cập cho trạng thái thêm/đã thêm. Nút lưu chỉ hiện trái tim và số lượt lưu thật, không có chữ “Lưu” hoặc “Đã lưu”; khi đã lưu chỉ viền trái tim có neon chuyển động theo phong cách thẻ giá, lòng trái tim trong suốt và nền nút không đổi đỏ. Số lượt lưu cập nhật ngay khi lưu hoặc bỏ lưu và tự đồng bộ khi có thay đổi từ người xem khác.
- Biểu tượng giỏ hàng nổi độc lập; không thêm vào cụm Dynamic Island đã chốt.

## Tổ chức sản phẩm thương mại

- Khi sửa hoặc tạo mẫu trong `product/giao-dien-web/`, đọc thêm `product/giao-dien-web/AGENTS.md` và các tài liệu quy chuẩn được dẫn ở đó trước khi viết mã.
- Đặt sản phẩm trong `product/` theo năm nhóm: `giao-dien-web`, `skill-prompt`, `agent`, `newsproduct 1`, `newsproduct 2`. Hai tên `newsproduct` là tạm thời.
- Mỗi giao diện web có thư mục riêng `product/giao-dien-web/<slug>/`: mã nguồn ở `source/`, ZIP giao khách ở `<slug>.zip`, hồ sơ riêng ở `reviews/` và thiết kế riêng ở `design/` khi có. `/api/download` chỉ đọc ZIP sau khi kiểm tra quyền.
- Quy chuẩn, hướng dẫn và công cụ dùng chung nằm trong `product/giao-dien-web/docs/` và `tools/`; hồ sơ kiểm tra chung và bản thiết kế so sánh nhiều mẫu nằm ở `reviews/` và `design/` cấp danh mục.
- Bản demo và ảnh preview công khai vẫn ở `public/demos/` và `public/previews/` để giữ các URL đang dùng.

## Quy tắc animation — yêu cầu chủ sản phẩm ngày 05/10/2026

- Tất cả animation đã được tạo phải mặc định bật trên mọi trình duyệt, gồm Edge và Cốc Cốc. Không tự tắt theo prefers-reduced-motion, thiết lập hệ điều hành, nhận diện browser, hoặc trạng thái tắt đã lưu từ phiên bản cũ. Yêu cầu này ưu tiên hơn mặc định motion của skill và quy chuẩn cũ trong dự án.
- Vẫn cho phép người dùng chủ động tạm dừng ở trang đang mở; lần mở mới mặc định bật. Không yêu cầu query motion=on để animation thông thường hoạt động.
- Hiệu ứng quan trọng phải có đường chạy dự phòng khi CSS animation/transition hoặc Web Animations không hoạt động; dùng requestAnimationFrame hữu hạn điều khiển transform/opacity khi phù hợp. Dừng và hủy lượt cũ khi thao tác mới đến, không để vòng lặp chạy vô hạn.
- Khi kiểm tra, đo các frame giữa chuyển động, hai chiều wrap và thao tác nhanh trên Edge/Cốc Cốc thực bằng hồ sơ test riêng; kiểm tra cả khi hệ thống yêu cầu giảm chuyển động và khi còn trạng thái off cũ. Không tuyên bố mọi browser đã được thử nếu chỉ chạy một engine.
- Bản online phải được kiểm tra đúng phiên bản tài nguyên sau deploy, tránh cache CSS/JS cũ. Ghi rõ browser, phiên bản và phạm vi thực sự đã thử.
