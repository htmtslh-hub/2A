# skill-morge — kiểm tra ngày 2026-10-05

PASS: cấu trúc skill qua quick_validate.py; JavaScript qua node --check; browser verification.json không có failure/pageerror.

Demo chạy bằng file URL và tài nguyên local, không cần mạng/thư viện ngoài. Chạy browser headless trong profile kiểm thử riêng:

- Cốc Cốc 152.0.7977.124, Edge 154.0.4258.53, Firefox 155.0: sáu lượt chuyển hai chiều, gồm last→first và first→last. Lấy khoảng 70 frame mỗi lượt; incoming/outgoing đúng phía và sản phẩm trung gian không thành ảnh chính.
- Cả ba browser: keyboard wrap, bấm nhanh và label đồng bộ; hai CTA chuyển scene có frame trung gian; RAF dừng khi idle; wheel hủy tween; pause khôi phục static scene và lưu qua reload; destroy/remount không nhân đôi listener.
- Cốc Cốc mô phỏng viewport 820×1180, 1180×820, 375×812, 414×582, 667×375: cụm controls lệch tâm 0px, nút ≥48px, không overflow ngang, swipe TouchEvents mô phỏng chuyển đúng sản phẩm.
- Năm viewport trên: không JavaScript vẫn giữ toàn bộ nội dung và không overflow ngang. Reduced-motion không override trở về static.
- Storage bị chặn: motion=off hoạt động, nút opt-in bật lại không có exception.

Giới hạn: chưa kiểm tra thiết bị vật lý/Safari/profile Cốc Cốc hằng ngày; không gọi TouchEvents mô phỏng là test điện thoại thật. Đây là QA cho starter của skill, không phải phát hành hoặc kiểm tra lại website online Auralis.

Gói chỉ gồm SKILL.md, metadata, hai reference và bốn asset demo. Không chứa ảnh, thương hiệu, ZIP sản phẩm thương mại hoặc thông tin thanh toán của Auralis.
