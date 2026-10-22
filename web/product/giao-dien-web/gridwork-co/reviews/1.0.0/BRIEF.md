# BRIEF — Gridwork Co (`gridwork-co`, v1.0.0)

## Mục tiêu sản phẩm
Xây dựng mẫu giao diện **create-account onboarding hero** một màn hình, tự chứa trong một file HTML duy nhất (`index.html`) cho sàn việc làm freelance giả định **Gridwork Co** (*"What tools do you use? — We’ll connect you with the best jobs."*), sử dụng HTML, CSS và JavaScript thuần không framework hay bước build:
- **Bố cục & Tỉ lệ (`1447×1087`):** Hệ đơn vị `--u = clamp(0.7px, min(100vw/1447, 100vh/1087), 2.4px)`, chia lưới 2 cột `minmax(0, 1fr)` (thẻ ảnh nhà kính chiếm `55%` bên trái) và `max(508.7u, 45%)` (cột biểu mẫu `432u` căn giữa bên phải).
- **Thẻ ảnh nhà kính & Video chuyển động lặp mượt (bên trái):** Ảnh tĩnh `1356×1528` kết hợp luồng video `1020×1150` lặp 10 giây (chuyển động camera tiến vào và xoay quanh nhân vật rồi đảo chiều không giật) tự động hiện dần (`0.8s`) khi khung hình đầu tiên sẵn sàng; góc trên-trái vuông kèm lưới họa tiết `61u` (`4×4` ô) gồm ô cắt màu nền `#FDFEFD` tại `(0,0)`, các rãnh bo góc cạnh thẻ và 6 ô kính mờ (`rgba(255,255,255,0.5)`, `blur(8u)`) tại `(2,0)`, `(3,1)`, `(0,2)`, `(2,2)`, `(1,3)`, `(3,3)`; dải kính mờ đáy cao `360u` (`blur(22u)`, gradient xanh rừng `0 → .30 → .22`) cùng trích dẫn của **Sofia Hernández** (*"Garden Designer, Portland, OR"*) và 2 nút mũi tên tròn `59u` viền trắng `1.5u`.
- **Biểu mẫu chọn công cụ (bên phải):** Biểu trưng hai chiếc lá xanh rừng kèm chữ `"Gridwork Co"`, tiêu đề `"What tools do you use?"`, lưới `2×3` gồm 6 thẻ công cụ với biểu tượng thật (**Figma**, **Framer**, **Adobe XD**, **Webflow**, **Relume**, **Canva** — mặc định chọn sẵn Figma, Webflow, Relume với nền xanh xô thơm `#ECF2EC` và viền `#1D4A35`), nút viên thuốc `"Create account"` (`#20513A`, hover `#2A6247`), dòng `"Already have an account? Log in"`, hiệu ứng xuất hiện ~2 giây bằng Web Animations API sau `document.fonts.ready` và bố cục một màn hình không cuộn trên Desktop (`1440×960`), Tablet dọc (`820×1180`) và Điện thoại (`375×812`, `320×740`).

## Lý do sử dụng cờ `--ngoai-le` khi đóng gói
- Đề bài yêu cầu kiến trúc **Single-File HTML** (`index.html`, `CUSTOMISE.md`, `README.md`, `LICENCE.txt`) thuộc danh sách `INLINE_PRODUCTS` trong `dong-goi.mjs`. Dung lượng gói `gridwork-co.zip` đạt `17,137` byte (`< 20,480` byte).

## Nguồn tài nguyên bên ngoài theo đặc tả
- **Google Fonts (`Inter` 400 / 500 / 600 / 700):** `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`
- **Greenhouse Photo (`1356×1528`):** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/61db05ee-e08b-47b7-8ab6-541c5c510237.jpg`
- **Greenhouse Motion Loop (`1020×1150`, H.264 `yuv420p`, `10.04s`):** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/221f7a06-5ecc-40b6-9ece-26f1f982db64.mp4`
