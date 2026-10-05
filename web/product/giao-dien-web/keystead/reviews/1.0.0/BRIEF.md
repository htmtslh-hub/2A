# Keystead 1.0.0 — Brief đã chốt

Yêu cầu của chủ sản phẩm (03/10/2026): "dựa vào quy chuẩn em làm tạo cho anh web tương tự này, nếu cần ảnh em tự tạo nhé" kèm ảnh mẫu trang cho thuê nhà ("Reome"), và "thay vào thẻ số 3 (dune pass), xoá giao diện dune pass đi".

```text
Loại sản phẩm: web-template
Hồ sơ: WEB-STATIC-1 + ngoại lệ ảnh (xem dưới)
Phiên bản sản phẩm: 1.0.0
Tên sản phẩm: Keystead
Slug: keystead
Ngành / tình huống sử dụng: công ty môi giới / cho thuê nhà, căn hộ
Người mua mẫu: agency cho thuê nhà, chủ nhà có nhiều căn, freelancer làm web BĐS
Người truy cập trang: người tìm thuê căn hộ / nhà; chủ nhà muốn gửi nhà cho thuê
Mục tiêu chính: xem các căn đang trống và đặt lịch xem nhà
CTA chính và đích đến: "Book a viewing" → #contact → mailto (có subject); mỗi tin "Ask about this home" → mailto kèm tên căn
Nội dung bắt buộc: header + menu, hero ảnh phố có tiêu đề lớn căn giữa, thanh duyệt nổi dưới hero, dải 4 lợi ích có icon, 2 lưới tin nhà (3 căn hộ, 3 nhà), khu vực, quy trình thuê, mục chủ nhà, liên hệ, footer
Hướng thị giác: theo ảnh mẫu — nền trắng/xám ấm, nút đen bo tròn, ảnh chụp kiến trúc lúc hoàng hôn, thẻ tin có ảnh; Plus Jakarta Sans; nhấn màu nâu hổ phách cho giá
Điều cần tránh: form tìm kiếm giả, sao đánh giá bịa, logo/khách hàng thật, ảnh không rõ nguồn
Tài sản: 7 ảnh tạo bằng AI (generate_image) trong phiên này
Phạm vi giao: gói sản phẩm + tích hợp cửa hàng (ô t3 thay Dune Pass), chưa deploy
Ngoại lệ được chủ sản phẩm chấp nhận: ảnh raster cục bộ ("nếu cần ảnh em tự tạo") → hơn 6 file và ZIP > 20.480 byte
```

## Giả định và quyết định

- Tên, thành phố "Northbank", 4 khu vực, 6 căn, giá ($), ngày trống, địa chỉ "14 Quay Street", giờ mở cửa: hư cấu, công khai trong README/LICENCE/CUSTOMISE và dòng footer "sample content".
- **Thanh tìm kiếm trong ảnh mẫu → thanh duyệt bằng liên kết** (Apartments / Houses / Neighbourhoods / Lease terms + "Book a viewing"). Lý do: W05 chỉ cho JS menu + reveal và §6 cấm form tìm kiếm giả. README/CUSTOMISE ghi rõ không phải tìm kiếm.
- **Bỏ sao đánh giá** của ảnh mẫu (D07: không bịa đánh giá); thay bằng thông số thật của căn (phòng ngủ, phòng tắm, m²) và nhãn ngày trống.
- Số đếm thống nhất (D08): 6 căn = pill hero "6 homes", thanh duyệt 3 + 3, khu vực 1 + 2 + 1 + 2.
- Ngoại lệ ảnh áp theo đề xuất `WEB-STATIC-IMG-1` (chưa duyệt chính thức): 7 ảnh WebP ≤ 300 KB/ảnh, ZIP < 1 MiB, có width/height, ảnh tin dùng `loading="lazy"`, hero `alt=""` có màu nền dự phòng tối.
- LICENCE: dùng khung 7 mục và chủ thể bản quyền của Pinehaven (mẫu ảnh AI đã được chủ sản phẩm phát hành), mục 4 nói rõ quyền dùng ảnh AI, mục 7 chỉ ghi Chromium + Firefox. **Chủ sản phẩm cần đọc lại LICENCE trước khi bán.**

## Hai lựa chọn thiết kế riêng (D02)

1. Hero ảnh full-bleed với tiêu đề căn giữa và **thanh duyệt dạng viên thuốc nổi đè mép dưới hero** (desktop 1 hàng, tablet 2 cột, mobile 1 cột).
2. **Thẻ tin nhà** có giá màu hổ phách nằm cùng hàng tiêu đề, dòng thông số, nhãn "Available …" nền kem và link email riêng từng căn.

## Mục đích từng section (D03)

| Section | Câu hỏi của người xem |
|---|---|
| Hero | Đây là ai, cho thuê gì, bắt đầu từ đâu? |
| Thanh duyệt | Tôi muốn xem loại nhà nào? |
| Lợi ích | Thuê qua đây có gì khác? |
| Apartments / Houses | Có căn nào, giá bao nhiêu, khi nào vào ở? |
| Neighbourhoods | Khu nào hợp với tôi? |
| How renting works | Thủ tục thế nào, hợp đồng bao lâu? |
| Landlords | Tôi là chủ nhà thì gửi nhà ở đâu? |
| Contact | Đặt lịch xem như thế nào? |
