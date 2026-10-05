# Kiểm tra motion

Kiểm tra frame trung gian. Screenshot sau animation không phát hiện hình cũ quay ngược qua tâm.

## Carousel

1. Next: 1 → 2 → 3 → 1. Old x giảm; new x từ phải về giữa.
2. Previous: 1 → 3 → 2 → 1. Old x tăng; new x từ trái về giữa.
3. Hai lượt wrap: sản phẩm trung gian không chiếm tâm/opacity=1; outgoing recycle không lướt ngược qua giữa.
4. Bấm nhanh Next/Next/Previous/Next: cuối cùng image/label/counter/aria cùng index. Pause giữa lượt settle ngay, timer cũ không bật motion trở lại.
5. Left/Right khi focus controls; swipe ngang chuyển, swipe dọc vẫn cuộn. Inactive links/buttons không nhận Tab.

## Scene

1. Cuộn chậm, wheel lớn, PageDown, kéo scrollbar; có frame trung gian. Reverse scroll phục hồi các cảnh.
2. CTA tween hoàn tất và RAF dừng; wheel/touch/keys hủy tween. Resize không để đích scroll cũ tiếp tục chạy.
3. Intro → detail vẫn cùng model; nếu yêu cầu giữ hình liên tục, kiểm tra không đổi identity/nháy trắng.
4. Idle không có RAF chạy mãi; focus không ở panel inert. Static mode mọi scene/link đọc và dùng được.

## Môi trường

| Trường hợp | Quan sát |
| --- | --- |
| Desktop khoảng 1440×900 | Directions, wrap, focus, scene |
| Tablet khoảng 820×1180 + ngang | Controls giữa, không clipping/overflow |
| Phone khoảng 375×812 | Nút ≥44px, không overflow ngang |
| Phone ngắn khoảng 414×582 | Controls/content vừa hoặc static fallback |
| OS reduced-motion, không override | Tĩnh, readable, không RAF animation |
| Reduced-motion + motion=on | Opt-in hoạt động; pause ngay, reload giữ pause |
| motion=off, storage blocked | Tĩnh, không JS exception |
| Không JavaScript, offline/file URL | Thông tin đọc được, không màn hình trống |
| Resize/rotation/zoom/chữ lớn | Content/controls vừa hoặc fallback tĩnh |

Khi user nhắc Edge/Cốc Cốc, chạy browser đó nếu có môi trường test. Dùng profile test riêng; không truy cập dữ liệu browser cá nhân bằng workaround. Nếu chỉ chạy Chromium/Firefox, báo đúng. TouchEvents/viewport mô phỏng không được gọi là test điện thoại thật.

Nếu user đã yêu cầu phát hành website, cập nhật asset version/cache theo workflow repo và xác nhận online tải bản mới. Skill invocation tự nó không yêu cầu deploy.
