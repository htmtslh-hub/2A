# Motion map

Carousel: .hero__cup animation transform/opacity hữu hạn 850ms bằng RAF, slide cũ ra theo hướng, slide mới vào; cancel lượt trước và khôi phục opacity. Thumbnail/arrow/phím/swipe cập nhật name/price/tone/aria-pressed. Wrap cả hai hướng. Không autoplay carousel.
Scroll: .craft__cup transform theo progress section, quay -12 đến 12 độ và nâng 48px, bean parallax. Listener chỉ lịch một RAF mỗi event, không vòng lặp idle; resize cập nhật. .reveal hiện một lần qua IntersectionObserver và unobserve, fallback hiện ngay.
Intro: hero hiển thị trạng thái ổn định, không carousel autoplay. Motion khi thao tác mặc định ON kể cả OS reduce/saved off. Nút Pause motion dừng trong trang; reload mặc định ON. Không-JS giữ ảnh, collection và anchors, ẩn control phụ thuộc JS. Menu Escape/focus, dialog Escape/native focus return.
