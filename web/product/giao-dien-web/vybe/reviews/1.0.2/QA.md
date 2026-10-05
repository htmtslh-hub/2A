# VYBE 1.0.2 — browser-independent motion
05/10/2026. Yêu cầu chủ sản phẩm: mọi animation mặc định bật trên mọi trình duyệt. Đã ghi quy tắc ở web/AGENTS.md và product/giao-dien-web/AGENTS.md, ưu tiên hơn mặc định reduced motion trong skill.

Animation model chuyển từ Element.animate sang requestAnimationFrame hữu hạn 950ms, điều khiển transform/opacity; capture frame trước thao tác nhanh, cancel lượt cũ, settle một model, dừng RAF khi xong. Không tự tắt theo OS hoặc saved preference cũ. Nút pause vẫn dừng ngay ở trang đang mở; lần mở mới bật. Explicit motion=off vẫn là lựa chọn chủ động cho lần mở đó.

local-browser-checks.json: executable Cốc Cốc 152.0.7977.124 và Edge 154.0.4258.53, headless, profile test riêng. Ca thử đồng thời prefers-reduced-motion reduce, stored off, Element.animate undefined và CSS animation/transition disabled: giữa 160ms và 360ms transform/opacity thay đổi, một model khi settle, rapid click/wrap/pause đúng, reload bật. Desktop/tablet/phone/narrow phone không tràn. Console không lỗi. ESLint file đổi và TypeScript PASS. Không truy cập profile thật người dùng, chưa gọi đây là kiểm tra mọi browser.

ZIP 747757 byte; SHA-256 `35efa874cf10ae140ecc000c8e06b29f9dfcab60a10713030a8cae4c5838ebaa`. Đóng gói đọc lại khớp byte source; giữ exception ảnh/carousel/bag/dung lượng theo brief. Layout/ảnh không đổi từ 1.0.0, kế thừa hồ sơ trước. Không thay chính sách giấy phép ảnh hoặc claim đã thử tải bằng khách đã mua.

Production dpl_3fbqhy7TwvBi9rH6MMD3Tv4rBvoY READY, alias forgezone.store. online-browser-checks.json PASS trên Cốc Cốc 152 và Edge 154 (headless, test profile): không cần motion=on, mặc định enabled; biến đổi transform/opacity ở hai frame giữa; settle/rapid/wrap/pause đúng; 4 viewport không tràn; console 0. Header version 1.0.2, CSS/JS v1.0.2, no-store. Chưa kiểm tra profile Cốc Cốc đang dùng của chủ sản phẩm.

