# Apartment Flow

Bản giới thiệu căn hộ phong cách glass, tên demo Lumière Residence, phiên bản
đang phát triển 0.1.0. Mã ở `source/`; bốn chặng nội dung, nav và dialog tư vấn
đã có. Tích hợp danh mục 2A tại ô t18 dưới dạng bản xem trước, chưa mở bán.
Demo: https://forgezone.store/demos/apartment-flow/index.html
Chi tiết: https://forgezone.store/?mau=t18
Nền gồm 240 frame WebP 1920×1080 từ video Google Flow do người dùng yêu cầu tạo.
Xem `source/README.md`, `source/CUSTOMISE.md` và `reviews/0.1.0/QA.md`.

Tái xuất frame: `python tools/extract-frames.py <video.mp4>` từ thư mục sản phẩm.
Yêu cầu Python, OpenCV và Pillow chỉ cho công cụ xuất ảnh; website không có thư viện.

Deploy dùng dự án Vercel `web` của Forge Zone từ thư mục `web/` trong checkout
đã đồng bộ origin/master. Không dùng dự án apartment-flow độc lập để phát hành 2A.
Giấy phép thương mại, gói ZIP và nghiệm thu thương mại đầy đủ còn chờ.
