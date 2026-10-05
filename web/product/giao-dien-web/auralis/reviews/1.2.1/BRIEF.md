# Auralis 1.2.1 — Edge / Cốc Cốc follow-up

Người dùng thấy animation trong bản quay của assistant nhưng không thấy khi dùng Edge hoặc Cốc Cốc. Chạy baseline URL online bằng executable Edge 154.0.4258.53 và Cốc Cốc 152.0.7977.124 trong profile tạm, headless: cả hai bật motion và chuyển intro→detail được, không pageerror. Vì vậy chưa xác nhận nguyên nhân trong profile thật của người dùng, không khẳng định engine không tương thích.

Mã có các điểm gây khó hiểu đã xác nhận: control chỉ hiện khi reduced motion; lựa chọn không được nhớ khi refresh; HTML/CSS/JS/preview URL chưa có revision thống nhất; preview lớn trong trang chi tiết render controls=false nên reduced motion khiến video tĩnh và không có cách phát. Video opt-in cũng bị synchronise bỏ qua khi media query reduce.

Sửa: luôn hiện control motion với lý do tĩnh; lưu lựa chọn có guard storage; explicit ?motion=on/off, Pause bỏ query cũ; revision CSS/JS/demo/preview 1.2.1. Thêm play/pause ở preview lớn của trang detail, không thêm nút bên trong card link. Giữ manual opt-in của video khi cuộn ra/vào. Converter cũng giữ prop này khi sinh lại markup. Reduced motion mặc định vẫn tĩnh đến khi người xem chọn.

Kiểm tra bằng engine cài thật với profile tạm, normal/reduced, desktop/mobile, scene giữa chuyển, reload opt-in/pause, URL override và storage bị chặn. Video test đọc currentTime, paused và khả năng resume sau scroll. Đồng bộ ZIP/demo/preview/catalog/docs và production. Giữ ngoại lệ W01/W03/W05/W06 từ yêu cầu ban đầu; không đổi quyền LICENCE hoặc thêm checkout tai nghe.
