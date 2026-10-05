# Pinehaven 1.0.1 — bỏ viền phía trước hero

Ngày kiểm tra: 02/10/2026 (Asia/Bangkok). Thay đổi so với 1.0.0: bỏ đường viền sáng 3px và nét sáng inset 1px của `.hero__frame`; loại bỏ khai báo `border-width` tương ứng ở mobile. Ảnh, bo góc, bố cục, nội dung và tương tác giữ nguyên.

## Gói phát hành

- ZIP `pinehaven.zip`: 598.128 byte; SHA-256 `69B1EEEF68CCF10500E4907C62ECE12800EF96E3DCD7AD8677036BE14BBFA077`.
- Bản giải nén có 9 file; hash của cả 9 file khớp chính xác với `source/`. CSS demo công khai tại `web/public/demos/pinehaven/` trùng hash với CSS nguồn. Ảnh preview được tạo lại từ nguồn sau khi bỏ viền.
- Ba ảnh WebP cục bộ vẫn là ngoại lệ đã ghi ở hồ sơ 1.0.0 đối với các mục W01/W03/W06 của WEB-STATIC-1. Không thay đổi phạm vi tính năng hay quyền sử dụng.

## Kiểm tra

- Chạy `qa.mjs` trên **bản giải nén ZIP** bằng Playwright Chromium 153.0.8010.12 và Firefox 155.0 qua `file://` và HTTP cục bộ.
- Ở 1440×900, 820×1180, 375×812, 320×740 và 720×450 trên cả hai trình duyệt: không tràn ngang; ảnh nội dung tải đủ; không có lỗi JavaScript hoặc request thất bại. Chi tiết máy đọc trong `checks.json`, ảnh Chromium trong `screenshots/`.
- Menu mobile mở, đóng bằng Escape và trả focus, đóng sau khi chọn liên kết; không bật JavaScript thì menu và nội dung vẫn hiện. Nền ảnh hero tải qua HTTP.
- Xem trực tiếp ảnh preview desktop và ảnh toàn trang 375px: nét viền trắng lớn không còn, bo góc và nội dung hero không bị cắt/chồng. Viền focus của điều khiển vẫn giữ nguyên.
- Các mục Q01–Q13 và D01–D08 không bị ảnh hưởng về chức năng, nội dung và quyền so với 1.0.0. D02 nay là ảnh cabin/rừng sương với **mép bo không viền sáng**, thẻ kính tối và các section biên tập nền kem.
- `npm run build` ở `web/` hoàn thành. Production deployment `dpl_8XuX7q5k9GUM6DKqmW5qCsSkDL5w` đã alias tới `https://forgezone.store`. `production-check.mjs` xác nhận demo trả 200 tại 1440×900 và 375×812; `borderTopWidth: 0px`, nền ảnh tải, không tràn ngang và không có lỗi trang. Ảnh production lưu trong `screenshots/`.

## Giới hạn

- Chưa thử Safari, Edge và thiết bị vật lý. Chưa thực hiện giao dịch thật hoặc kiểm tra tải ZIP bằng tài khoản đã mua. Đây vẫn là mẫu liên hệ qua email demo, không có hệ thống đặt phòng.
