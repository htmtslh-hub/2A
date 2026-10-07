# Watchroom 1.2.0

Mẫu showroom đồng hồ theo video tham chiếu: nền tối, ánh sáng đổi theo model, sân khấu rộng và carousel trượt/tilt/crossfade. Giữ ba ảnh WebP nền trong suốt tạo bằng image_gen.

- Mã giao: `source/`; mở `source/index.html` trực tiếp.
- Gói: `watchroom.zip`, sáu file lõi + ba ảnh cục bộ, không framework hoặc font mạng. Ngoại lệ ảnh/dung lượng theo yêu cầu mới; không tự thay hồ sơ chuẩn chung.
- Preview local: `http://127.0.0.1:4318` khi chạy `node web/product/giao-dien-web/watchroom/reviews/1.0.0/preview-server.mjs` từ gốc repository.
- Demo công khai: https://forgezone.store/demos/watchroom/ ; nguồn demo trong `web/public/demos/watchroom/`. `design/sync-demo.mjs` giữ đường dẫn tuyệt đối cho bản hosted khi Vercel bỏ dấu slash cuối; ZIP khách vẫn có đường dẫn tương đối.
- Hồ sơ hiện tại: `reviews/1.2.0/QA.md`, `cinematic.json`, `checks.json` và screenshots. Bộ prompt ảnh: `design/IMAGE-PROMPTS.md`. Các hồ sơ trước được giữ nguyên để đối chiếu.

Chưa thêm vào catalog cửa hàng, chưa thử Safari hoặc luồng mua/tải sau thanh toán. Xem QA để biết phạm vi kiểm tra thực tế và ngoại lệ motion.
