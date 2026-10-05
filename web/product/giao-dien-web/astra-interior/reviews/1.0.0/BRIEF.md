# Astra Interior — brief 1.0.0

- Loại sản phẩm: web-template
- Hồ sơ: WEB-MOTION-24, dẫn xuất có khai báo từ WEB-STATIC-1
- Tên / slug: Astra Interior / astra-interior
- Ngành: interior architecture, residential design, boutique hospitality
- Người mua: studio nội thất nhỏ, kiến trúc sư độc lập, creative developer làm site cho khách hàng
- Người truy cập: chủ nhà, chủ dự án hospitality và đối tác thiết kế đang đánh giá studio
- Mục tiêu: tạo ấn tượng thị giác cao cấp, trình bày hướng tiếp cận và dẫn tới email brief
- CTA: Explore selected spaces (#work), Begin a project (mailto)
- Section: sequence hero, studio, selected spaces, approach, scope, contact
- Hướng thị giác: cinematic dark, warm stone and oak imagery, editorial serif, one clay accent
- Tránh: homepage cửa hàng, dashboard, fake form, fake testimonial, fake metric, card grid kiểu SaaS
- Tài sản: chuỗi render 3D được tạo cho dự án này, 24 frame WebP; quyền thương mại thuộc chủ sản phẩm
- Phạm vi: gói sản phẩm, preview, catalog Forge Zone và production deployment theo yêu cầu tiếp theo của chủ sản phẩm
- Catalog: t7, motion
- Design dials: variance 8, motion 9, density 3

## Ngoại lệ do chủ sản phẩm yêu cầu

Yêu cầu mới nhất là video phải được tách thành 24 frame và phối hợp với thành phần HTML, không dùng video làm nền hero. Vì vậy hồ sơ chuyển từ WEB-STATIC-1 sang WEB-MOTION-24:

- W03: cho phép một sprite WebP 24 frame nhúng vào index.html.
- W05: cho phép canvas, IntersectionObserver và requestAnimationFrame cho sequence.
- W06: không áp trần ZIP 20.480 byte; vẫn đo và công bố dung lượng thật.

W01 vẫn giữ: đúng sáu file giao khách. Không framework, build, CDN script, API hoặc tracking.

## Lựa chọn thiết kế riêng

1. Hero dài 420vh dùng sticky canvas và bốn chương copy HTML theo tiến trình 24 frame.
2. Ba project still được vẽ từ cùng sprite lên canvas, tránh file ảnh rời nhưng vẫn cho trang portfolio có chiều sâu.
3. Các section sau hero chuyển qua paper, sage, ink và clay theo nhịp editorial để sequence không nuốt mất nội dung bán hàng.
