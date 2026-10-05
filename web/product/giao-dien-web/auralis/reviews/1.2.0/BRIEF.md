# Auralis 1.2.0 — chuyển cảnh

Người dùng phản hồi vẫn chưa có animation chuyển cảnh. Kiểm tra trực tiếp Codex IAB cho thấy viewport 414×582 và prefers-reduced-motion: reduce. Bản 1.1 tắt pinning khi reduced motion hoặc chiều cao <650 px, nên người dùng không thấy hiệu ứng dù các kiểm tra normal-motion trước đó qua.

Giải quyết: intro → detail → charging kit → AirBuds cùng một hero stage giữ khung. Ảnh, chữ, scale, blur và background wash chuyển liên tục theo scroll; đọc được nội dung ở các khoảng dừng. Hạ ngưỡng chiều cao xuống 420 px và thêm compact composition. Reduced motion mặc định vẫn tĩnh, có nút Enable transitions để chủ động bật và Pause transitions để tắt. Không ép animation nếu không có lựa chọn của người xem. No-JS/enlarged text/viewport cực thấp vẫn có static fallback.

Kiểm tra trong IAB thật với nút và CTA, bổ sung sáu viewport gồm đúng cấu hình đã gây lỗi; đo cả mốc đang chuyển cảnh chứ không chỉ trạng thái cuối. Đồng bộ docs, ZIP, demo, catalog và video preview. Giữ phạm vi template bán trên Forge Zone, không thêm checkout tai nghe. Ngoại lệ W01/W03/W05/W06 từ yêu cầu ảnh/animation ban đầu tiếp tục áp dụng.
