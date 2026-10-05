# Hướng dẫn sử dụng giao diện web Forge Zone

Phiên bản 1.0 · 21/09/2026 · Dành cho khách hàng sử dụng mẫu HTML/CSS/JavaScript tĩnh.

Bạn sẽ đi qua 10 bước: mở mẫu → sao lưu → chuẩn bị thông tin → làm việc với AI → sửa nội dung → đổi hình thức → kiểm tra → xuất bản → gắn tên miền → cập nhật. Không cần cài môi trường lập trình để mở mẫu. Nếu chưa quen sửa mã, dùng các prompt trong tài liệu để AI hỗ trợ.

## Trước khi bắt đầu

Bạn cần máy tính, trình duyệt, file ZIP sản phẩm và một trình sửa văn bản thuần. Không dùng Word hoặc ứng dụng soạn thảo văn bản có định dạng để sửa HTML/CSS/JS. AI là lựa chọn hỗ trợ, không bắt buộc.

Mẫu cung cấp phần giao diện. Nút liên hệ có thể mở email hoặc dẫn đến một dịch vụ bạn đã có. Mẫu không tự xử lý thanh toán, gửi email, đặt lịch, tài khoản hay đơn hàng. Hãy đọc phần chức năng thực tế trong `README.md` của mẫu bạn mua.

Trong tài liệu:

- **File** là tệp trên máy. **Thư mục gốc** là thư mục chứa trực tiếp `index.html`.
- **CTA** là nút kêu gọi hành động, ví dụ “Liên hệ tư vấn”.
- **Hosting** là nơi lưu website để người khác truy cập qua Internet.
- **Tên miền** là địa chỉ riêng của website. Bạn có thể dùng địa chỉ hosting cung cấp trước.
- **Prompt** là nội dung gửi cho AI. Chép cả khối trong ô, không cần chép dấu ```.

Các prompt không yêu cầu bạn biết tên class hoặc dòng mã. AI phải đọc file để tìm đúng vị trí và hỏi thông tin còn thiếu bằng ngôn ngữ thông thường. Không cần gửi tài liệu quy chuẩn nội bộ của Forge Zone cho AI hỗ trợ khách hàng.

## Bước 1 — Giải nén và mở mẫu

1. Tải file ZIP từ đơn hàng của bạn và lưu ở nơi dễ tìm.
2. Trên Windows: nhấp phải file ZIP, chọn chức năng giải nén, thường là **Extract All / Giải nén tất cả**. Trên macOS: nhấp đúp file ZIP.
3. Mở thư mục vừa giải nén. Nếu bên trong còn một thư mục tên mẫu, mở tiếp đến khi thấy `index.html` cùng thư mục `assets`.
4. Nhấp đúp `index.html`; nếu máy mở bằng trình sửa văn bản, chọn **Open with / Mở bằng** rồi chọn trình duyệt.
5. Cuộn từ đầu đến cuối, thử các liên kết và menu. Đây là bản demo trước khi thay thông tin.
6. Mở `README.md` và `CUSTOMISE.md` bằng trình sửa văn bản để đọc. Đuôi `.md` là tài liệu chữ, không cần phần mềm đặc biệt.

Cấu trúc ban đầu:

```text
thu-muc-mau/
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── CUSTOMISE.md
├── README.md
└── LICENCE.txt
```

**Kết quả đúng:** trang có bố cục, màu sắc và nội dung demo. Thanh địa chỉ có thể bắt đầu bằng `file:///`; điều này bình thường và chỉ mở trên máy bạn. Khi không có mạng, font có thể khác vì dùng font dự phòng.

**Nếu chỉ thấy chữ, không có giao diện:** kiểm tra đã giải nén toàn bộ ZIP, không mở riêng HTML ngay bên trong ZIP, và `assets` vẫn nằm cạnh `index.html`. Xem thêm bảng lỗi ở cuối tài liệu.

## Bước 2 — Giữ bản gốc và tạo bản làm việc

1. Giữ nguyên ZIP đã tải; đây là bản gốc để khôi phục.
2. Sao chép thư mục mẫu, đặt tên bản sao là `website-dang-sua`.
3. Chỉ sửa trong `website-dang-sua`. Không đổi tên `index.html`, `assets/css/style.css` hoặc `assets/js/main.js`.
4. Trước mỗi thay đổi lớn, sao chép bản đang dùng sang thư mục bên cạnh, ví dụ `website-backup-01`. Không đặt bản sao lưu bên trong thư mục website.
5. Khi cần sửa file, dùng **Open with / Mở bằng** → trình sửa văn bản. Lưu với đúng đuôi file và mã hoá UTF-8; tránh lưu nhầm thành `index.html.txt`.

**Kết quả đúng:** có bản gốc không thay đổi và một bản làm việc. Sau mỗi lần sửa, lưu file rồi tải lại trang trong trình duyệt.

## Bước 3 — Chuẩn bị thông tin doanh nghiệp

Bạn có thể trả lời trực tiếp cho AI thay vì điền biểu mẫu kỹ thuật. Chuẩn bị:

| Thông tin | Ví dụ về loại thông tin cần có |
|---|---|
| Tên thương hiệu | Tên bạn muốn hiển thị trên đầu trang và tab trình duyệt |
| Hoạt động chính | Bạn bán gì hoặc cung cấp dịch vụ gì |
| Khách hàng | Ai là người bạn muốn tiếp cận |
| Lợi ích chính | Lý do thực tế để khách chọn bạn |
| Sản phẩm/dịch vụ | Tên, mô tả, giá nếu muốn công khai |
| Liên hệ | Email, điện thoại, địa chỉ được phép công khai |
| Nút chính | Muốn khách gửi email, gọi điện hay mở một URL cụ thể |
| Ngôn ngữ | Tiếng Việt, tiếng Anh hoặc ngôn ngữ khác |
| Nhận diện | Logo, màu thương hiệu và ảnh thuộc quyền sử dụng của bạn |
| Bằng chứng | Số liệu, nhận xét, chứng nhận có thật; chưa có thì bỏ |

Không cần biết hết ngay. Thông tin chưa có có thể bổ sung sau, nhưng phải xử lý hết trước khi xuất bản. Không dùng số liệu và lời chứng thực demo như thông tin thật của mình.

## Bước 4 — Bắt đầu làm việc với AI

### 4.1 Gửi file cho AI

Chọn một trong hai cách tuỳ công cụ bạn đang dùng:

**AI trong cửa sổ chat:** đính kèm ZIP của bản đang sửa nếu công cụ đọc được ZIP. Nếu không, gửi riêng `index.html`, `style.css`, `main.js`, `CUSTOMISE.md`, `README.md` và `LICENCE.txt`; ghi rõ `style.css` nằm trong `assets/css/`, `main.js` nằm trong `assets/js/`.

Nếu công cụ không nhận loại file này, mở từng file bằng trình sửa văn bản và dán nội dung, kèm đường dẫn ở đầu mỗi phần. Gửi đủ file liên quan; ảnh chụp màn hình không thay thế được mã nguồn.

**AI làm việc trực tiếp với thư mục:** mở hoặc cấp quyền cho đúng `website-dang-sua` trong công cụ. Yêu cầu AI đọc file trước khi sửa. Bạn vẫn nên giữ bản sao lưu ở ngoài thư mục đó.

Chỉ gửi mã nguồn website và nội dung được phép công khai; không gửi mật khẩu hosting, khoá API hay dữ liệu riêng của khách hàng.

### 4.2 Sao chép prompt khởi đầu

**Prompt 01 — Thiết lập trợ lý chỉnh sửa website**

```text
Tôi mua một mẫu website tĩnh của Forge Zone và muốn biến nó thành website
của mình. Tôi không rành lập trình. Hãy hỗ trợ bằng tiếng Việt, từng bước rõ ràng.

Trước tiên, hãy đọc các file tôi cung cấp: index.html, assets/css/style.css,
assets/js/main.js, CUSTOMISE.md, README.md và LICENCE.txt. Nếu nhận file rời
style.css/main.js, hiểu đúng các đường dẫn nói trên. Báo file nào đã đọc và
file nào còn thiếu; không đoán nội dung file chưa có. Chưa sửa ngay.

Hãy tóm tắt mẫu đang có những phần nào, nút nào hoạt động, phần nào chỉ là
demo và thông tin nào tôi cần thay. Sau đó hỏi tôi theo từng nhóm nhỏ về
thương hiệu, dịch vụ, liên hệ, ngôn ngữ và mục tiêu của website. Chỉ hỏi điều
còn thiếu; cho phép tôi trả lời “chưa có” nếu chưa biết.

Trong suốt công việc:
- Giữ HTML/CSS/JavaScript thuần, đường dẫn tương đối, khả năng mở index.html
  trực tiếp. Không chuyển sang framework hay thêm bước cài đặt/build.
- Giữ phong cách mẫu trừ khi tôi yêu cầu đổi. Giữ responsive, menu bàn phím,
  viền focus, chữ dễ đọc và chế độ giảm chuyển động.
- Không bịa số liệu, đánh giá, chứng nhận, giá, địa chỉ hoặc URL doanh nghiệp.
- Không thêm tracking, backend, thanh toán hay chức năng gửi form ngầm.
- Nếu sửa trực tiếp được, sửa trong bản làm việc. Nếu không, trả file hoàn
  chỉnh để tôi tải và nói rõ file nào thay vào đường dẫn nào. Nếu không tạo
  được file tải về, trả toàn bộ nội dung từng file đã thay đổi, không dấu ba
  chấm hoặc “giữ nguyên phần còn lại”. Nếu dài, gửi từng file trọn vẹn qua
  các lượt; không cắt giữa file và không nói đã sửa file trên máy của tôi.
- Sau mỗi lần sửa, liệt kê thay đổi, cách xem kết quả và điều đã/chưa thử.
- Không tự xuất bản, ghi đè website đang chạy hoặc thay thiết lập tên miền.

Hãy bắt đầu bằng việc đọc file và hỏi nhóm thông tin đầu tiên.
```

**Kết quả đúng:** AI biết mẫu bạn đang dùng, nêu đúng các file đã nhận và hỏi thông tin doanh nghiệp. Nếu AI đề nghị xây lại từ đầu bằng framework, nhắc giữ cấu trúc hiện tại.

### 4.3 Cách nhận và áp dụng file AI trả về

1. Đọc danh sách file đã thay đổi của AI.
2. Sao lưu bản đang sửa trước khi thay file.
3. Nếu nhận ZIP mới, giải nén vào thư mục mới và mở thử; chưa ghi đè bản tốt ngay.
4. Nếu nhận file rời, đặt đúng chỗ: HTML ở gốc, CSS trong `assets/css`, JS trong `assets/js`. Đổi tên tải về như `style (1).css` thành đúng `style.css` khi thay bản cũ.
5. Nếu nhận mã trong chat, mở đúng file bằng trình sửa văn bản, thay toàn bộ nội dung bằng mã hoàn chỉnh tương ứng. Không chép dấu ``` bao quanh khối mã. Lưu UTF-8, đúng đuôi file.
6. Tải lại trang. Nếu lỗi, quay về bản sao lưu và gửi Prompt 12 ở cuối tài liệu.

Nếu chat mới hoặc AI không còn nhớ nội dung trước, gửi lại bản file mới nhất cùng Prompt 01. Không gửi lại bản gốc cũ khi muốn sửa tiếp bản đã tuỳ chỉnh.

## Bước 5 — Thay thương hiệu, nội dung và nút liên hệ

### 5.1 Thay nội dung bằng AI

Tiếp tục cùng cuộc trò chuyện sau khi đã trả lời thông tin ở bước 3–4. Chép prompt sau, không cần sửa các tên kỹ thuật.

**Prompt 02 — Cá nhân hoá toàn bộ nội dung**

```text
Hãy dùng thông tin doanh nghiệp tôi đã cung cấp và các file mới nhất để cá
nhân hoá website. Nếu thiếu dữ liệu cần thiết, hỏi một nhóm câu ngắn trước
khi sửa phần đó; không tự bịa và không bắt tôi tìm tên class hoặc dòng mã.

Thay tên thương hiệu, nội dung đầu trang, sản phẩm/dịch vụ, giá đã xác nhận,
thông tin liên hệ, footer và nút hành động. Cập nhật cả title, description,
Open Graph, tên truy cập cho nút/hình và các bản nội dung lặp. Kiểm tra tên
doanh nghiệp dài trước khi thay tên ngắn để không sót phần đuôi demo.

Giữ cấu trúc và phong cách mẫu. Viết nội dung cụ thể, dễ hiểu, độ dài vừa
bố cục. Với số liệu, logo khách hàng, lời chứng thực hoặc chứng nhận demo:
hỏi tôi có dữ liệu thật không; nếu không thì bỏ hoặc thay bằng mô tả trung
tính, không để lại như bằng chứng thật. Không để placeholder chưa xử lý.

Cập nhật CUSTOMISE.md theo bản mới, đếm lại chuỗi được hướng dẫn thay.
Trả file hoàn chỉnh hoặc sửa trực tiếp nếu có quyền, kèm danh sách nội dung
đã thay và nội dung còn cần tôi xác nhận. Báo rõ kiểm tra nào chưa thực hiện.
```

**Kết quả đúng:** đầu trang, chân trang, tên trên tab và nội dung dịch vụ đều là của bạn. Không còn tên mẫu, email mẫu hoặc dữ liệu demo ở vị trí công khai.

### 5.2 Kiểm tra nút và liên kết

1. Chọn mục đích cho nút chính: liên hệ bằng email, gọi điện hoặc mở trang đặt lịch/biểu mẫu bạn đã có.
2. Cung cấp địa chỉ hoặc URL thật cho AI. Không tự đặt URL chỉ vì trông có vẻ đúng.
3. Thử từng nút sau khi nhận file.

**Prompt 03 — Nối nút vào đúng nơi**

```text
Hãy đọc các file website mới nhất và kiểm tra toàn bộ menu, nút, liên kết
liên hệ và mạng xã hội. Dùng các đích đến tôi đã cung cấp; phần nào chưa có
thì hỏi tôi muốn bỏ hay cung cấp đích thật. Không dùng href="#" hoặc URL bịa.

Nếu là email, dùng mailto; nếu là số điện thoại, dùng tel phù hợp; nếu là
biểu mẫu/đặt lịch bên ngoài, dùng URL thật tôi cung cấp. Không tự xây backend
hoặc báo gửi thành công khi chưa có hệ thống nhận dữ liệu.

Với tìm kiếm, giỏ hàng hoặc form chỉ để demo, nêu rõ giới hạn và đề xuất
thay bằng liên kết thật hoặc bỏ. Sau khi sửa, trả bảng gồm: chữ trên nút,
vị trí, đích đến, hành vi mong đợi và cách tôi thử. Trả file hoàn chỉnh hoặc
sửa trực tiếp nếu có quyền; nêu kiểm tra đã thực hiện và phần chưa thử.
```

**Lưu ý thực tế:** `mailto:` mở ứng dụng email được cấu hình trên thiết bị; không tự gửi thư. `tel:` phụ thuộc thiết bị có chức năng gọi. Nếu khách của bạn ít dùng ứng dụng email, cân nhắc liên kết đến biểu mẫu liên hệ đang hoạt động.

### 5.3 Nếu muốn tự sửa chữ

1. Đọc bảng “tìm chữ / bao nhiêu chỗ / nằm ở đâu” trong `CUSTOMISE.md` của mẫu.
2. Mở `index.html`, dùng chức năng tìm kiếm để tìm đúng cụm chữ.
3. Sửa phần văn bản, giữ nguyên dấu `<`, `>`, dấu nháy và tên thuộc tính HTML.
4. Với tên thương hiệu, kiểm tra cả metadata và footer; thay cụm dài trước cụm ngắn. Với dải chữ lặp, thay tất cả bản lặp được tài liệu chỉ ra.
5. Lưu và xem lại. Nếu cần ký tự `&` hoặc `<` trong nội dung HTML, dùng `&amp;` hoặc `&lt;`, hoặc nhờ AI xử lý để không làm hỏng mã.

## Bước 6 — Đổi màu, font, ảnh và bố cục khi cần

Các phần dưới đây là tuỳ chọn. Nếu đã thích hình thức hiện tại, chuyển đến bước 7.

### 6.1 Màu thương hiệu

Cung cấp mã màu nếu biết, hoặc mô tả như “xanh rêu, nền sáng”. Màu chữ trên nút và màu nhấn dùng làm chữ có thể cần hai sắc độ khác nhau để dễ đọc.

**Prompt 04 — Đổi màu và font an toàn cho bố cục**

```text
Tôi muốn điều chỉnh màu sắc hoặc font của website hiện tại. Hãy hỏi màu
thương hiệu, cảm giác mong muốn, ngôn ngữ hiển thị và tôi có muốn giữ font
hiện tại không nếu các thông tin này chưa có. Đọc CSS thực tế, không giả
định mẫu nào cũng có cùng tên biến màu.

Chỉnh qua token ở :root khi phù hợp; giữ bố cục và nội dung. Nếu màu thương
hiệu làm chữ khó đọc, dùng sắc độ phù hợp cho nút/chữ và giải thích. Giữ
tương phản chữ thường ít nhất 4.5:1, chữ lớn ít nhất 3:1, focus rõ ràng.
Nếu đổi font, kiểm tra ký tự của ngôn ngữ tôi dùng, nguồn và giấy phép,
font dự phòng, đường tải font và các weight thực sự cần. Cập nhật tài liệu
về font nếu thay. Không tải thư viện JavaScript.

Kiểm tra chữ không tràn ở 1440, 820, 375 và 320px, cả khi font mạng không
tải được. Nếu không có công cụ đo hoặc trình duyệt, ghi chưa kiểm tra thay
vì khẳng định đạt. Trả file hoàn chỉnh và cách tôi đối chiếu trước/sau.
```

Nếu tự sửa, mở `assets/css/style.css`, tìm `:root` ở đầu file và làm theo đúng tên biến trong `CUSTOMISE.md`. Không thay mọi mã màu giống nhau trên toàn bộ file nếu chưa hiểu chúng được dùng ở đâu.

### 6.2 Logo và ảnh thật

1. Chuẩn bị logo/ảnh bạn có quyền sử dụng.
2. Đặt tên đơn giản, ví dụ `logo.svg`, `hero.webp`, `san-pham-01.jpg`; tránh khoảng trắng và khác biệt chữ hoa/chữ thường.
3. Tạo `assets/img` trong bản đang sửa và chép ảnh vào. Việc thêm ảnh là tuỳ chỉnh của khách nên bản của bạn có thể có nhiều file và nặng hơn ZIP gốc.
4. Gửi cả ảnh và mã nguồn hiện tại cho AI. Nói rõ ảnh dùng ở đầu trang, logo hay thẻ sản phẩm.

**Prompt 05 — Thay logo hoặc minh hoạ bằng ảnh của tôi**

```text
Hãy dùng ảnh/logo tôi đính kèm để thay đúng vị trí trên website hiện tại.
Nếu chưa rõ ảnh nào dùng ở đâu hoặc thiếu file ảnh, hỏi tôi trước; không tự
tải ảnh khác. Tôi sẽ đặt tài sản trong assets/img. Hãy xác nhận tên file.

Đọc HTML/CSS để tìm đúng SVG hoặc hình cần thay. Giữ wrapper cần cho bố cục,
chỉ thay phần minh hoạ liên quan, không xoá nhầm icon và hình trang trí khác.
Dùng đường dẫn tương đối, giữ tỷ lệ, không kéo méo logo. Chọn contain/cover
phù hợp; nếu cover cắt chủ thể thì điều chỉnh vị trí hoặc đề xuất khung khác.
Kiểm tra ở desktop/mobile, không để thẻ nổi che ảnh hoặc nội dung.

Ảnh mang thông tin có alt phù hợp, ảnh trang trí dùng alt rỗng. Đặt kích
thước hoặc tỷ lệ để hạn chế xô lệch khi tải. Không trì hoãn tải ảnh hero;
ảnh dưới màn hình đầu có thể lazy-load. Đề xuất tối ưu dung lượng nếu cần,
không phóng to ảnh nhỏ rồi tuyên bố ảnh nét hơn.

Trả các file đã sửa và danh sách tài sản cần chép, kèm đường dẫn đích chính
xác. Cập nhật CUSTOMISE.md. Không nói đã nhìn hoặc kiểm tra ảnh nếu chưa làm.
```

### 6.3 Chuyển sang tiếng Việt hoặc ngôn ngữ khác

**Prompt 06 — Đổi ngôn ngữ toàn trang**

```text
Hãy chuyển website hiện tại sang ngôn ngữ tôi muốn dùng. Nếu tôi chưa nói
ngôn ngữ nào, hãy hỏi trước. Dùng thuật ngữ phù hợp ngành và thông tin doanh
nghiệp đã xác nhận; không dịch máy từng chữ và không tự đổi thương hiệu,
email, URL hoặc số liệu. Không tự quy đổi giá hay đơn vị tiền tệ.

Cập nhật cả nội dung nhìn thấy, menu, nút, footer, title, description,
Open Graph, lang của HTML, alt và aria-label liên quan. Kiểm tra font hỗ trợ
đủ ký tự, độ dài tiêu đề, xuống dòng và nút trên điện thoại. Giữ liên kết
neo hoạt động nếu có thay ID. Không tạo bộ chuyển ngôn ngữ hoặc trang đa
ngôn ngữ trừ khi tôi yêu cầu riêng.

Trả file hoàn chỉnh hoặc sửa trực tiếp nếu có quyền, nêu phần đã dịch và
kết quả kiểm tra thực tế. Cập nhật hướng dẫn tuỳ chỉnh cho bản mới.
```

### 6.4 Thêm hoặc bỏ một mục

**Prompt 07 — Thêm/bớt dịch vụ hoặc section**

```text
Tôi muốn thêm hoặc bỏ một phần trên website hiện tại. Hãy hỏi tôi muốn sửa
phần nào bằng mô tả dễ hiểu, muốn có nội dung gì và giữ thứ tự nào nếu chưa
có thông tin. Không yêu cầu tôi tìm class hoặc số dòng.

Đọc file mới nhất, tái sử dụng thành phần và phong cách sẵn có. Khi thêm,
dùng ID duy nhất, heading đúng cấp và nội dung tôi xác nhận. Khi xoá, xử lý
cả menu/liên kết trỏ tới phần đó. Kiểm tra grid, khoảng trống và mobile sau
khi số thẻ thay đổi. Không thêm thư viện hoặc chức năng backend.

Trả file hoàn chỉnh và chỉ rõ phần thay đổi. Cập nhật CUSTOMISE.md và các
số đếm liên quan. Liệt kê kiểm tra đã làm và phần còn cần tôi thử.
```

## Bước 7 — Kiểm tra trước khi đưa lên mạng

### 7.1 Tự kiểm tra

1. Mở bản mới nhất, đọc toàn trang. Kiểm tra tên, email, điện thoại, giá, địa chỉ, ngày tháng và thông tin cuối trang.
2. Tìm `example.com`, tên thương hiệu demo, `[YOUR` trong mã; mỗi kết quả còn lại phải được thay hoặc có lý do rõ ràng. Việc không tìm thấy các chuỗi này chưa chứng minh đã hết mọi nội dung demo.
3. Bấm từng menu/nút. Đảm bảo dẫn đến đúng nơi và không tạo thông báo thành công giả.
4. Thu hẹp cửa sổ để xem bố cục mobile. Thử menu mở/đóng và bấm một liên kết trong menu.
5. Dùng Tab và Shift+Tab để di chuyển, Enter để mở liên kết, Enter/Space để thao tác nút. Viền focus phải nhìn thấy; Escape phải đóng menu đang mở.
6. Phóng to trình duyệt 200%, đọc và thao tác lại; đưa về 100% sau khi thử.
7. Tắt mạng rồi tải lại bản mở trên máy: nội dung vẫn phải đọc được; liên kết ngoài sẽ cần mạng. Sau đó bật mạng lại.
8. Sau khi có URL hosting, mở trên điện thoại thật và lặp lại các thao tác. Không gửi đường dẫn `file:///` cho người khác để xem.

**Prompt 08 — Kiểm tra bản cuối bằng AI**

```text
Hãy kiểm tra bản website mới nhất tôi cung cấp trước khi xuất bản. Đọc mã
và chạy trong trình duyệt nếu công cụ của bạn có thể; không coi đọc mã là
đã thử trực tiếp. Nếu cần sửa lỗi nhỏ để đúng yêu cầu đã chốt, hãy sửa rồi
kiểm tra lại phần bị ảnh hưởng; không tự đổi thiết kế hoặc nội dung thật.

Kiểm tra: thông tin demo/placeholder, nút và đích đến, ảnh/đường dẫn, một h1,
lang, title/description, menu bàn phím, focus, tương phản, reduced motion,
tắt JavaScript, font dự phòng, zoom 200%, console và tài nguyên bị lỗi.
Kiểm tra bố cục ở 1440x900, 820x1180, 375x812 và 320x740, cả menu mở.
Ghi scrollWidth/clientWidth nếu có thể đo. Thử trên Chromium và Firefox
nếu có; chỉ ghi trình duyệt và thiết bị thực sự đã thử.

Trả bảng: mục kiểm tra, đạt/không đạt/chưa kiểm tra/không áp dụng, bằng chứng
và cách tôi tự thử. Nêu rõ lỗi còn chặn xuất bản; không dùng câu “mọi thứ
hoàn hảo” khi còn phần chưa kiểm tra. Trả file hoàn chỉnh nếu đã sửa.
```

### 7.2 Tạo thư mục để xuất bản

1. Tạo thư mục mới tên `website-publish` ở ngoài bản làm việc.
2. Chép `index.html` và toàn bộ `assets` đã dùng vào đó.
3. Chép thêm file công khai mà bạn chủ động tạo và trang thực sự tham chiếu, nếu có.
4. Không chép bản sao lưu, ZIP mua hàng, hội thoại AI, ghi chú kinh doanh hoặc thông tin tài khoản. Giữ tài liệu và giấy phép trong bản lưu của bạn; nếu giấy phép tài sản bên thứ ba yêu cầu kèm thông báo khi phân phối, giữ thông báo theo đúng yêu cầu đó.
5. Mở `website-publish/index.html` để kiểm tra lần nữa.

**Kết quả đúng:** mở `website-publish` là thấy ngay `index.html` và `assets`, không phải một lớp thư mục trung gian. Đây là thư mục bạn sẽ tải lên hosting.

## Bước 8 — Xuất bản bằng cách tải thư mục lên hosting

Ví dụ dưới đây dùng chức năng tải thủ công của Netlify; không cần chạy lệnh build. Dịch vụ có thể đổi giao diện, hạn mức và chi phí; kiểm tra điều kiện hiện tại trước khi dùng. Hướng dẫn được đối chiếu tài liệu chính thức ngày 21/09/2026.

1. Đăng nhập tài khoản của bạn tại [Netlify](https://app.netlify.com/).
2. Mở [Netlify Drop](https://app.netlify.com/drop).
3. Kéo thả thư mục `website-publish` chứa trực tiếp `index.html` và `assets`.
4. Chờ xử lý, rồi mở URL được cấp. Đây là xuất bản công khai; dùng bản đã kiểm tra.
5. Kiểm tra trang và nút trên máy tính lẫn điện thoại. Lưu URL và nhận diện dự án.

Nguồn: [Netlify — tạo bản triển khai thủ công](https://docs.netlify.com/deploy/create-deploys/).

Nếu giao diện tài khoản khác hướng dẫn, dùng prompt sau với ảnh màn hình đã che thông tin riêng.

**Prompt 09 — Hỗ trợ xuất bản từng bước**

```text
Tôi muốn đưa website HTML/CSS/JavaScript tĩnh lên hosting. Tôi đã có thư mục
website-publish chứa trực tiếp index.html và assets. Hãy hỏi tôi đang dùng
nhà cung cấp nào, đã có tài khoản chưa và đang ở màn hình nào nếu chưa biết.

Hướng dẫn từng bước theo tài liệu chính thức hiện tại của nhà cung cấp,
dẫn liên kết nguồn; không đoán vị trí nút nếu không thấy. Nếu không truy
cập được tài liệu, nói rõ giới hạn và đề nghị tôi cung cấp nội dung màn hình.
Ưu tiên cách tải thư mục có sẵn, không thêm build hay chuyển framework.

Trước bước đưa trang lên công khai, nhắc tôi xác nhận đúng thư mục và không
có ghi chú riêng/bản sao lưu. Tôi tự đăng nhập, xác thực và chọn gói dịch vụ;
không yêu cầu tôi gửi mật khẩu, mã OTP hoặc khoá tài khoản trong chat.
Nếu có thể thao tác thay tôi, chỉ xuất bản khi tôi đã yêu cầu rõ việc đó.
Sau khi có URL, hướng dẫn kiểm tra ảnh, CSS, menu, CTA và bản mobile.
```

**Kết quả đúng:** URL mở được từ thiết bị khác và hiển thị bản đã tuỳ chỉnh. Xuất bản giao diện không tự làm form, thanh toán hoặc đặt lịch hoạt động.

## Bước 9 — Gắn tên miền riêng nếu cần

Có thể bỏ qua bước này và dùng URL hosting. Chỉ thực hiện khi bạn sở hữu hoặc được quyền quản lý tên miền.

1. Mở dự án Netlify, chọn **Domain management** → **Add a domain** → thêm tên miền bạn đã có.
2. Nhập tên miền, đọc hướng dẫn DNS ứng với dự án đó.
3. Mở nơi đang quản lý DNS của tên miền. Sao lưu thông tin bản ghi hiện có.
4. Làm theo đúng giá trị Netlify cung cấp. Không tự đoán IP hoặc sao chép IP của dự án khác. Nếu tên miền đang dùng email, giữ các bản ghi email như MX/TXT; không xoá hoặc đổi nameserver khi chưa hiểu ảnh hưởng.
5. Trở lại Netlify kiểm tra trạng thái xác minh và HTTPS. Việc cập nhật DNS có thể mất thời gian.
6. Mở địa chỉ HTTPS, thử các nút và thử email doanh nghiệp nếu có.

Nguồn: [Netlify — gắn tên miền vào website](https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/).

**Prompt 10 — Hướng dẫn gắn tên miền theo cấu hình thật**

```text
Tôi muốn gắn tên miền riêng vào website đã xuất bản. Hãy hỏi tên nhà cung
cấp hosting, nơi quản lý DNS, tên miền, URL website hiện tại và tên miền có
đang dùng email hoặc website khác không. Không yêu cầu mật khẩu hoặc OTP.

Đọc tài liệu chính thức hiện tại và các hướng dẫn/bản ghi tôi cung cấp.
Giải thích chính xác bản ghi nào cần thêm hoặc sửa, mục đích và cách kiểm
tra. Không bịa địa chỉ IP, không đổi nameserver mặc định, không xoá bản ghi
email hoặc bản ghi khác không liên quan. Nếu thiếu dữ liệu, hỏi thêm trước
khi hướng dẫn thay đổi. Tôi sẽ tự thực hiện thay đổi trong tài khoản.

Hướng dẫn kiểm tra DNS, HTTPS, cả tên miền chính/www nếu cấu hình dùng cả
hai, và email hiện có. Nếu website chưa mở, phân biệt chờ DNS, sai bản ghi
và chứng chỉ chưa sẵn sàng thay vì bảo tôi sửa ngẫu nhiên.
```

## Bước 10 — Cập nhật và khôi phục

### Khi muốn đổi nội dung sau này

1. Sao lưu bản đang chạy vào thư mục bên ngoài bản làm việc, ghi ngày.
2. Sửa trên bản làm việc bằng đúng quy trình ở trên; gửi bản mới nhất cho AI.
3. Kiểm tra lại, rồi tạo lại `website-publish` bằng bản mới, tránh giữ tài sản cũ không còn dùng.
4. Trên Netlify, mở **đúng dự án hiện có** → trang **Deploys**, tải thư mục mới vào khu vực triển khai thủ công. Không tạo dự án mới mỗi lần cập nhật.
5. Mở lại URL cũ, tải lại và kiểm tra trên điện thoại.

Nguồn cho thao tác cập nhật: [Netlify — triển khai thủ công và cập nhật](https://docs.netlify.com/deploy/create-deploys/).

**Prompt 11 — Cập nhật một phần, giữ phần còn lại**

```text
Tôi muốn cập nhật website hiện tại. Hãy đọc các file mới nhất tôi gửi và
hỏi phần tôi muốn thay nếu chưa rõ. Chỉ sửa phạm vi đó và các liên kết/tài
liệu liên quan; giữ nội dung và bố cục khác. Không lấy bản demo gốc để ghi
đè thông tin tôi đã tuỳ chỉnh.

Trả file hoàn chỉnh hoặc sửa bản làm việc nếu có quyền. Nêu chính xác các
file thay đổi, cách kiểm tra và cách tạo lại thư mục website-publish. Nếu
tôi đang dùng hosting, hướng dẫn cập nhật đúng dự án hiện có, không tạo
website mới. Không tự xuất bản khi tôi mới yêu cầu sửa file.
```

### Nếu bản mới bị lỗi

1. Tạm dừng sửa tiếp. Ghi việc vừa thay và chụp lỗi nếu cần.
2. Mở bản sao lưu để xác nhận bản đó vẫn tốt.
3. Khôi phục cả nhóm file đã thay cùng nhau; tránh ghép HTML mới với CSS/JS cũ không tương thích.
4. Nếu đã xuất bản bản lỗi, tạo lại thư mục publish từ bản sao lưu tốt rồi tải lên **cùng dự án** để thay bản lỗi.
5. Gửi AI bản lỗi cùng bản tốt nếu có và prompt sau.

**Prompt 12 — Tìm và sửa lỗi**

```text
Website của tôi đang có lỗi. Hãy hỏi tôi: lỗi nhìn thấy là gì, thao tác
nào gây lỗi, điều tôi vừa thay, mở trên máy hay URL online, trình duyệt và
thiết bị nào. Tôi sẽ gửi file hiện tại, ảnh lỗi hoặc thông báo nếu có.

Đọc file thực tế trước khi kết luận. Kiểm tra đường dẫn và chữ hoa/thường,
tên file có bị thêm .txt hay (1), CSS/JS có đúng phiên bản, HTML có thiếu
dấu/thẻ, ID và liên kết có khớp, tài nguyên có tải được không. Nếu online
bị lỗi mà local bình thường, kiểm tra thư mục gốc và tài sản đã tải lên.

Sửa nguyên nhân với thay đổi nhỏ nhất, giữ nội dung và thiết kế. Không
dựng lại website, không thêm framework, không xoá section để che lỗi.
Trả file hoàn chỉnh, nói rõ nguyên nhân đã xác minh hoặc còn là giả thuyết,
cách tôi kiểm tra và cách quay về bản tốt. Chỉ báo đã hết lỗi nếu đã thử;
nếu chưa chạy được, ghi rõ tôi cần thử gì.
```

## Bảng xử lý nhanh

| Hiện tượng | Kiểm tra trước |
|---|---|
| Trang chỉ có chữ | Giải nén đủ; `assets` cạnh HTML; CSS đặt đúng `assets/css/style.css`. |
| Mở file ra thấy mã | Chọn mở HTML bằng trình duyệt; kiểm tra không phải `.html.txt`. |
| Đổi chữ nhưng chưa thấy | Đã lưu chưa; có đang mở đúng thư mục không; tải lại trang. |
| Ảnh không hiện online | Tên file/đuôi/chữ hoa đúng; ảnh đã nằm trong thư mục được tải lên. |
| Font khác lúc mất mạng | Đó có thể là font dự phòng; kiểm tra khả năng đọc và bố cục. |
| Menu mobile không mở | JS có trong `assets/js/main.js`; HTML có gọi đúng file; gửi Prompt 12. |
| Nút email không phản hồi | Thiết bị đã cấu hình ứng dụng email chưa; kiểm tra địa chỉ `mailto:`. |
| Form không gửi | Đọc README: form có thể chỉ là demo; cần dịch vụ thật hoặc đổi sang liên kết. |
| Link online báo không tìm thấy | Thư mục tải lên phải chứa trực tiếp `index.html`; kiểm tra đúng URL dự án. |
| Chữ Việt lỗi hoặc mất dấu | Lưu UTF-8, HTML có khai báo charset; font phải có ký tự tiếng Việt. |
| AI nói đã sửa nhưng máy chưa đổi | Có thể AI chỉ trả mã/file; áp dụng theo bước 4.3. |
| Điện thoại không mở file máy tính | `file:///` chỉ là đường dẫn cục bộ; dùng URL hosting sau xuất bản. |

## Checklist cuối cùng của bạn

- [ ] Có ZIP gốc và bản sao lưu mới nhất ngoài thư mục xuất bản.
- [ ] Tên, liên hệ, giá, số liệu và hình ảnh là của mình và được phép sử dụng.
- [ ] Không còn nội dung demo hoặc placeholder ngoài ý muốn.
- [ ] Mọi menu/nút đi đến đúng nơi; chức năng demo được xử lý rõ ràng.
- [ ] Xem ổn trên máy tính và điện thoại, không bị che/cắt chữ.
- [ ] URL online mở được, ảnh và font tải đúng hoặc có dự phòng.
- [ ] Tên miền và HTTPS hoạt động nếu đã gắn tên miền.
- [ ] Biết đang cập nhật dự án nào và có bản tốt để khôi phục.

Khi cần hỗ trợ thêm, gửi: tên mẫu, phiên bản nếu có, mô tả lỗi, bước tái hiện,
trình duyệt/thiết bị, ảnh lỗi và file liên quan. Liên hệ qua kênh hỗ trợ được
ghi trên đơn hàng hoặc cửa hàng nơi bạn mua; không cần gửi thông tin đăng nhập.
