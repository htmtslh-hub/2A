# Aerox Studio 1.1.0 — carousel thủ công

Chủ sản phẩm chọn carousel chỉ chạy khi bấm, không tự chạy. Phạm vi: hai finish có sẵn trong hero, HTML controls data-step, JS chuyển hai pha 1100 ms và CSS cắt vùng xe riêng. Không thêm ảnh hoặc mẫu xe mới, không thay gallery/scroll/cửa hàng.

Chromium 153 và Firefox 155 PASS: next chuyển xe cũ ra trái và xe mới từ phải; cuối→đầu và đầu→cuối đúng; thao tác nhanh hủy lượt cũ; cuối opacity 1 / transform none; idle không đổi trạng thái; mobile 320 px không tràn, không pageerror. Số đo trong carousel-checks.json. CSS animation không cần cho motion chính: RAF hữu hạn.

JS syntax PASS. ZIP candidate 551423 byte, SHA-256 a034246aea42f8bc1d1a7721f0a9b417f3926253a4887ef161dec638f171546b; đọc lại mười file khớp nguồn. Không chạy lại toàn bộ suite cũ; các giới hạn trước phát hành thương mại và browser chưa thử vẫn như bản 1.0.0.
