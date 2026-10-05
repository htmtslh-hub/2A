# Rules bắt buộc cho trợ lý AI trong dự án

Áp dụng cho toàn bộ workspace. Trước khi tạo, chỉnh sửa, di chuyển hoặc xóa file nguồn, mọi trợ lý AI phải đọc và làm theo file này, các `AGENTS.md` trên đường dẫn tới file định sửa, cùng các tài liệu rules/quy chuẩn được chúng dẫn tới. Chỉ đọc những rules áp dụng cho phạm vi công việc, nhưng phải đọc đầy đủ trước khi thay đổi nguồn. Nếu thiếu tài liệu bắt buộc, báo rõ phần thiếu và không sửa phần phụ thuộc vào nó.

## 1. Xác định rõ phạm vi được phép thao tác

- Đọc yêu cầu mới nhất và kiểm tra nguồn hiện tại để xác định sản phẩm được giao, thư mục/file được phép sửa, mục tiêu thay đổi, các file dùng chung và đầu ra cần đồng bộ.
- Trước khi sửa, nêu ngắn gọn sản phẩm, phạm vi file dự kiến thay đổi và giới hạn chính. Không tự mở rộng sang sản phẩm khác, cấu hình chung, cơ sở dữ liệu hoặc triển khai nếu nhiệm vụ chưa cho phép hoặc chưa thực sự cần để hoàn thành yêu cầu.
- Khi cần thay đổi ngoài phạm vi đã được cho phép, giải thích lý do và tác động; chỉ thực hiện khi đã có ủy quyền trong yêu cầu/lịch sử công việc. Nếu chưa có thì xin phép trước phần mở rộng đó.

## 2. Không làm ảnh hưởng hoạt động của các file khác

- Khi tạo/sửa một sản phẩm, phải bảo toàn hoạt động của các file, tính năng và sản phẩm ngoài phạm vi nhiệm vụ. Không ghi đè, xóa, đổi tên, di chuyển, format hoặc sửa nội dung không liên quan để tiện xử lý công việc đang làm.
- Kiểm tra import, liên kết, đường dẫn tài nguyên, selector CSS/JS, cấu hình và các nơi dùng chung trước khi thay đổi. Ưu tiên giới hạn CSS/JS trong phạm vi sản phẩm; tránh selector, listener hoặc trạng thái toàn cục có thể tác động sang sản phẩm khác.
- Giữ nguyên thay đổi có sẵn của người dùng hoặc trợ lý khác; không rollback, dọn hoặc ghi đè chúng khi chưa được yêu cầu.
- Nếu sửa file dùng chung là cần thiết và đã được phép, giữ hành vi hiện có cho các nơi khác và kiểm tra những nơi sử dụng bị ảnh hưởng. Đồng bộ file sinh ra/demo/preview/ZIP chỉ cho sản phẩm thuộc nhiệm vụ, trừ khi yêu cầu cho phép phạm vi rộng hơn.
- Trước bàn giao, kiểm tra danh sách file đã đổi, loại bỏ thay đổi ngoài phạm vi do chính mình gây ra mà không đụng vào thay đổi có sẵn, và chạy kiểm tra phù hợp cho sản phẩm cùng phần dùng chung bị tác động. Báo đúng phần đã thử và phần chưa thử; không khẳng định không ảnh hưởng chỉ dựa trên việc build thành công.

Các quy tắc trên là yêu cầu của chủ sản phẩm ngày 05/10/2026. Yêu cầu rõ ràng mới nhất của chủ sản phẩm quyết định phạm vi được phép; rules bổ sung ở thư mục con vẫn phải được đọc và áp dụng cho file tương ứng.
