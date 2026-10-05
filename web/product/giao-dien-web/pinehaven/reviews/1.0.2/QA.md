# Pinehaven 1.0.2 — ảnh phủ toàn bộ hero

Ngày kiểm tra: 02/10/2026 (Asia/Bangkok). Yêu cầu: bỏ nền phía sau và chỉ dùng ảnh làm section hero. Đã chuyển `forest-cabin.webp` thành nền trực tiếp của `.hero`; bỏ lớp ảnh mờ `.hero::before`, padding ngoài, bo góc, bóng và nền ảnh riêng của `.hero__frame`. Gradient phủ trên cùng ảnh vẫn giúp chữ đọc được. Nội dung và các nút không đổi.

## Gói phát hành

- ZIP `pinehaven.zip`: 597.971 byte; SHA-256 `564230A7D97BFE170457C11261F2186B1CA3924E18C61474B1A9955C4B744489`.
- Bản giải nén có 9 file, hash khớp từng file với `source/`. CSS demo công khai trùng hash với CSS nguồn. Trong CSS chỉ còn **một** tham chiếu `forest-cabin.webp`; `CUSTOMISE.md` đã sửa số đếm và vị trí thay ảnh. Ảnh preview được tạo lại từ nguồn.
- Ba ảnh WebP cục bộ vẫn là ngoại lệ W01/W03/W06 đối với WEB-STATIC-1 như hồ sơ 1.0.0; không thay đổi tính năng hay quyền sử dụng.

## Kiểm tra

- Chạy `qa.mjs` trên **bản giải nén ZIP** qua `file://` và HTTP cục bộ bằng Playwright Chromium 153.0.8010.12 và Firefox 155.0.
- 1440×900, 820×1180, 375×812, 320×740 và 720×450 trên cả hai trình duyệt: không tràn ngang, ảnh nội dung tải đủ, không lỗi JavaScript hoặc request thất bại. Menu mobile mở, Escape đóng/trả focus, chọn liên kết đóng; tắt JavaScript thì menu và nội dung vẫn dùng được. Chi tiết ở `checks.json`, ảnh trong `screenshots/`.
- Xem trực tiếp preview desktop và ảnh toàn trang mobile: hero chạm mép màn hình, không còn nền mờ hay khung bo ngoài; thẻ lưu trú và chữ vẫn đọc được. Viền focus điều khiển không đổi.
- Q01–Q13 và D01–D08 giữ trạng thái như hồ sơ 1.0.0 trong phần không bị ảnh hưởng; D02 cập nhật thành ảnh cabin phủ trọn hero, thẻ kính tối và các section nền kem phía dưới. Các mục kiểm tra bị ảnh hưởng về bố cục, tương tác, responsive và gói cuối đã chạy lại như trên.
- `npm run build` hoàn thành. Production deployment `dpl_HFY3zGaMYqn4hqjDjqew7b5mM3XD` đã alias tới `https://forgezone.store`. `production-check.mjs` xác nhận demo trả 200 ở 1440×900 và 375×812: hero bắt đầu tại x=0, rộng bằng viewport, nền ảnh có mặt; khung trong không có nền, bo góc hoặc bóng; không tràn ngang hay lỗi trang. Ảnh production lưu trong `screenshots/`.

## Giới hạn

- Chưa thử Safari, Edge và thiết bị vật lý. Chưa thực hiện giao dịch thật hoặc kiểm tra tải ZIP bằng tài khoản đã mua. Mẫu vẫn dùng địa chỉ email demo và không có hệ thống đặt phòng.
