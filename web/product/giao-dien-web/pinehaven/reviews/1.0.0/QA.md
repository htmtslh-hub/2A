# Pinehaven 1.0.0 — hồ sơ QA

Ngày kiểm tra: 02/10/2026 (Asia/Bangkok). Quy chuẩn tham chiếu: WEB-STATIC-1 v1.2. Phần giao diện và gói tĩnh **đạt theo ngoại lệ ảnh tự tạo W01/W03/W06**; luồng mua và tải có quyền chưa nghiệm thu. Không được mô tả mẫu là bản sáu file dưới 20 KiB.

## Môi trường và gói cuối

- Windows; Playwright Chromium 153.0.8010.12 và Firefox 155.0, headless; kiểm tra trực tiếp bản giải nén qua `file://` và HTTP cục bộ.
- ZIP: `web/product/giao-dien-web/pinehaven/pinehaven.zip` — **598.159 byte**, SHA-256 `873207522791180cc9cb66373384362b7d3a53b80ea0035e3dcdc401836b1614`.
- Sau giải nén có đúng **9 file** trong `pinehaven/`: `index.html`, `assets/css/style.css`, `assets/js/main.js`, ba ảnh WebP ở `assets/images/`, `README.md`, `CUSTOMISE.md`, `LICENCE.txt`. Hash từng file trùng bản `source/` cuối cùng.
- Ngoại lệ: ảnh WebP cục bộ 180.338 + 146.692 + 251.958 byte. Người dùng đã yêu cầu tự tạo hình ảnh giống hướng tham khảo; loại ảnh này không thể giữ giới hạn SVG nội tuyến/sáu file/20.480 byte. Không có ảnh tải từ ngoài hoặc base64.
- Bằng chứng máy đọc: `checks.json`; ảnh ở `screenshots/` (bốn khổ Chromium, menu mở, thẻ catalog local). Script kiểm tra: `qa.mjs`.

## Q01–Q13

| Mã | Trạng thái | Bằng chứng và giới hạn |
|---|---|---|
| Q01 Cấu trúc | PASS theo ngoại lệ | 9 file, không framework/CDN script/backend; ba ảnh cục bộ được cho phép theo brief. |
| Q02 Responsive | PASS | Chromium và Firefox ở 1440×900, 820×1180, 375×812, 320×740; thêm 720×450 để kiểm tra reflow; `scrollWidth <= clientWidth` ở cả 10 lượt. Ảnh toàn trang trong `screenshots/`. |
| Q03 Tương tác | PASS | 13 link; toàn bộ fragment có ID đích, không có `href="#"`. Menu mở, Escape đóng/trả focus, chọn link đóng và tới `#setting`, resize qua breakpoint reset đúng. Nút ở hero/card dẫn tới phần liên hệ; email demo được ghi rõ là placeholder. |
| Q04 Bàn phím | PASS | Tab đầu tiên tới skip link, kế đến brand và nút menu ở mobile; focus hiển thị. Menu ẩn không nằm trong thứ tự Tab; Escape trả focus về nút. |
| Q05 Cấu trúc trợ năng | PASS | Một `h1`, ID không trùng; main/nav/header/footer, section có heading; hai ảnh mang thông tin có alt; SVG trang trí ẩn khỏi trình đọc màn hình. |
| Q06 Tương phản | PASS nội bộ | Cặp đã tính: `#102b35`/`#f3f0e8` = 13.0:1; `#53676b`/`#ebe8df` = 4.87:1; `#536a6e`/`#ebe8df` = 4.69:1; chữ sáng/#102b35 = 14.8:1; viền focus sáng/#102b35 = 9.32:1. Vùng chữ trên ảnh và gradient được xem trực tiếp trong ảnh desktop/mobile, không coi đây là chứng nhận tương phản độc lập. |
| Q07 Dự phòng | PASS trong phạm vi đã thử | Bản giải nén chạy `file://` không cần mạng; không dùng web font. Tắt JS: nội dung/menu link vẫn hiện, nút menu bất hoạt được ẩn. Reduced motion: cuộn mượt tắt. Khổ 720×450 dùng như phép thử reflow tương đương 200% của 1440×900; thao tác zoom trong giao diện trình duyệt thật chưa thử riêng. |
| Q08 Trình duyệt | PASS | Chromium 153 và Firefox 155 trên Windows qua file và HTTP; Safari, Edge và thiết bị vật lý NOT TESTED, không tuyên bố hỗ trợ đã xác minh cho chúng. |
| Q09 Kỹ thuật | PASS | `checks.json`: không lỗi JavaScript hoặc request thất bại; ảnh tải đủ sau cuộn ở hai trình duyệt; không tài nguyên ngoài. Quan sát cuộn không thấy dịch chuyển bất thường. ZIP 598.159 byte theo ngoại lệ. |
| Q10 Tài liệu/quyền | PASS | `CUSTOMISE.md` có 10 bước/12 prompt; bảng đếm cuối: `Pinehaven` 7 lần trong HTML, `Evergreen Pine Lodge` 1, email mẫu 1, `$295` 1, `Nature's` 1, `forest-cabin.webp` 2 trong CSS. README/LICENCE nêu rõ dữ liệu giả, ảnh sinh cho mẫu và chức năng không có. Không tải font mạng nên mục giấy phép font ngoài N/A. |
| Q11 Gói cuối | PASS | ZIP đã giải nén, đúng 9 file cùng hash với source; file:// và HTTP trả/hiển thị đúng nội dung và ảnh. SHA-256 ghi phía trên. |
| Q12 Cửa hàng | PASS hiển thị; NOT TESTED tải có quyền | Mã `t8`, slug, mô tả vi/en/zh, preview, demo và ZIP cùng tên; build Next thành công. Production: thẻ, chi tiết, demo, CSS và ảnh trả 200. Chưa thực hiện giao dịch thật hoặc tải ZIP bằng tài khoản đã mua. |
| Q13 Thiết kế | PASS | Ảnh hero khung bo và bảng lưu trú, layout các section trong `screenshots/`; đánh giá D01–D08 bên dưới. |

## D01–D08

- **D01 PASS:** hero nói rõ cabin retreat và CTA dẫn đến liên hệ.
- **D02 PASS:** (1) ảnh rừng sương/cabin ấm với khung viền lớn và bảng kính tối ở hero; (2) các section nền kem với ảnh vòm, ảnh vuông và lưới biên tập lệch cột.
- **D03 PASS:** cabin giới thiệu nơi ở; setting cho biết khung cảnh; experiences diễn tả cách ở; contact nói rõ bước tiếp theo.
- **D04 PASS:** token màu/chữ ở đầu CSS, nút/link dùng quy tắc nhất quán; chỉ font hệ thống.
- **D05 PASS:** xem toàn trang ở bốn khổ; không tràn ngang hoặc chồng nội dung trong bản cuối. Ở 320px, CTA hero nằm sát cuối vùng nhìn đầu tiên nhưng vẫn cuộn tới được.
- **D06 PASS:** nội dung tiếng Anh cụ thể cho một doanh nghiệp hư cấu, không lorem ipsum.
- **D07 PASS:** không có lời chứng thực, logo khách hàng hoặc chứng nhận giả. Giá và sức chứa được ghi rõ là demo/illustrative trong README và giao diện.
- **D08 PASS:** một cabin, một mức giá demo, các dữ liệu lặp được đối chiếu. Địa chỉ `.example` được nêu rõ cần thay trước khi xuất bản.

## Tương tác cần giữ khi chỉnh sửa

| Vị trí | Nhãn | Hành vi thật | Trạng thái demo |
|---|---|---|---|
| Header | The cabin / The setting / Experiences / Contact | Tới section tương ứng | Nội dung minh họa |
| Header | Plan your stay | Tới `#contact` | Không kiểm tra ngày hay giữ chỗ |
| Hero | Discover the cabin | Tới `#cabin` | Hoạt động |
| Stay card | Enquire about a stay | Tới `#contact` | Giá minh họa; không đặt phòng |
| Cabin section | Ask about the lodge | Tới `#contact` | Hoạt động |
| Contact | Email about a stay | Mở trình email | Địa chỉ `.example` phải thay trước khi dùng thật |
| Mobile | Nút mở/đóng menu | Mở/đóng, Escape, trả focus | Hoạt động khi JS bật; khi tắt JS menu link hiện sẵn |
| Footer | Back to top | Tới `#top` | Hoạt động |

## Trạng thái bàn giao

**Mẫu đang hiển thị công khai tại `https://forgezone.store/?mau=t8`**, deployment `dpl_D36J1ue3wi4Ez9hQmS98PgQf1uv2`. Giá bán lấy mặc định 1.900.000₫/$79. Kiểm tra production cho giao diện và tài sản tĩnh đã PASS; giao dịch và quyền tải sau mua vẫn NOT TESTED, nên chưa tuyên bố nghiệm thu trọn luồng thương mại. Ảnh cabin là cảnh hư cấu; khách mua phải thay bằng ảnh cơ sở thật trước khi dùng để quảng cáo một nơi lưu trú có thật.
