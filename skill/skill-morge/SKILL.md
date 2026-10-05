---
name: skill-morge
description: Implement or repair cinematic product carousels, directional slide transitions, pinned scroll scenes, and product storytelling like the Auralis animation. Use for animation chuyển sản phẩm, chuyển cảnh theo scroll, direct last-to-first looping, or motion fixes across Edge, Cốc Cốc, mobile and tablet. Includes a dependency-free JavaScript/CSS starter and an offline demo.
---

# skill-morge

Đóng gói choreography của Auralis thành cách triển khai dùng lại cho nhiều website. Giữ thiết kế, dữ liệu sản phẩm, giỏ hàng và framework hiện có; sửa phần chuyển động được yêu cầu. Không bắt buộc màu sắc, thương hiệu, ảnh hoặc bố cục của bản demo.

## Quy trình

1. Đọc hướng dẫn dự án và tìm nguồn thật của carousel, scene, CSS và build. Xác định thư viện animation đang dùng, vùng sticky, phần tử tương tác và chế độ giảm chuyển động. Sửa nguồn rồi tạo lại bản build nếu dự án có bước sinh mã.
2. Đọc [references/motion.md](references/motion.md) để chọn choreography. Next: hình cũ thoát trái, hình mới vào từ phải; Previous đảo chiều. Lấy hướng từ thao tác **trước** khi modulo chỉ số. Vòng cuối → đầu phải đi thẳng, không đưa sản phẩm trung gian qua giữa.
3. Tham khảo [assets/morge.js](assets/morge.js), [assets/morge.css](assets/morge.css) và [assets/demo.html](assets/demo.html). Mẫu chạy offline, không tải thư viện, không chứa tài nguyên thương mại Auralis. Chuyển logic vào component/lifecycle hiện có; tránh tạo hai hệ thống carousel điều khiển cùng phần tử.
4. Chuyển cảnh dùng progress chuẩn hóa theo chiều cao vùng sticky. Cùng timeline điều khiển hình, chữ, opacity và scale. Intro → chi tiết cùng sản phẩm: giữ một đối tượng hình và biến đổi wrapper; nội dung chi tiết lấy từ model đang chọn. Đọc phần “Liên tục giữa các cảnh” trong reference.
5. Vòng đời animation hữu hạn: hủy RAF/timer cũ khi thao tác mới tới; dừng RAF khi progress hội tụ; thu hồi listener khi unmount. CTA chuyển cảnh dùng tween RAF có thể bị thao tác người dùng ngắt. Không khóa wheel/touch hoặc dựa hoàn toàn vào native smooth scroll.
6. Giao diện tĩnh phải nhìn thấy trước khi JavaScript chạy. Mặc định tôn trọng `prefers-reduced-motion`; cung cấp nút Bật/Tạm dừng animation nếu cần opt-in. Ưu tiên: query `motion=on/off` → lựa chọn đã lưu → hệ điều hành. Storage bị chặn không được làm hỏng trang; Tạm dừng có hiệu lực ngay.
7. Căn giữa **cả cụm** mũi tên + bộ đếm theo container. Dành riêng một hàng ở tablet/phone khi cần; nút chạm ít nhất 44px, focus nhìn thấy, swipe ngang không cản cuộn dọc. Cảnh ẩn dùng `aria-hidden` và `inert`; bộ đếm dùng `aria-live="polite"`.
8. Chạy [references/verification.md](references/verification.md). Quan sát frame trung gian, hai chiều wrap và bấm nhanh; kiểm tra desktop/tablet/phone, giảm chuyển động, không JavaScript và CTA. Phân biệt browser engine, mô phỏng touch và thiết bị thật; chỉ báo môi trường thực sự đã chạy.

## Tích hợp

Copy `morge.js`, `morge.css` vào tài nguyên dự án, chuyển markup demo vào component và gọi `Morge.mount(element, options)` sau khi DOM sẵn sàng. Gọi `controller.destroy()` khi unmount. API/selector ở [references/motion.md](references/motion.md).

Thời lượng, khoảng dịch chuyển, độ mờ và ngưỡng viewport là token có thể chỉnh. Không áp dụng cứng mọi token Auralis cho mọi sản phẩm. Chỉ blur hình khi cần, hạn chế trên điện thoại. Tách transform của carousel con khỏi transform scene wrapper để hai timeline không ghi đè nhau.

## Phạm vi

Skill phục vụ triển khai và kiểm tra animation. Không tự thay đổi giá bán, thanh toán, dữ liệu khách hàng, deploy hoặc gửi thông tin ra ngoài nếu yêu cầu hiện tại chưa bao gồm các việc đó. Demo minh họa chuyển động, không thay thế chức năng cửa hàng.
