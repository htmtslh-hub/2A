# Quy chuẩn sản phẩm Forge Zone

Phiên bản: 1.2 — Ngày: 21/09/2026 — Hồ sơ đang áp dụng: `WEB-STATIC-1`.

## 1. Cách dùng bộ tài liệu

Đưa cho AI `instruction-product.txt`, file này và bản hướng dẫn khách hàng đúng ngôn ngữ (`customer-guide.md`, `customer-guide.en.md` hoặc `customer-guide.zh.md`), kèm brief theo mục 4. Bộ tài liệu đủ để giao việc mà không cần lịch sử hội thoại. Mẫu trong `web/product/giao-dien-web/<slug>/source/` chỉ là tham khảo nếu có sẵn; không bắt buộc cung cấp, không được sao chép lỗi của mẫu tham khảo.

- `instruction-product.txt`: cách tổ chức mã nguồn, dựng, kiểm tra và tích hợp vào cửa hàng.
- `product-standards.md`: sản phẩm phải đạt gì, bằng chứng nghiệm thu và cách bàn giao.
- `customer-guide.md`, `customer-guide.en.md`, `customer-guide.zh.md`: cùng một hướng dẫn khách hàng 10 bước và 12 prompt bằng Việt, Anh và Trung giản thể; dùng bản khớp ngôn ngữ tài liệu để biên soạn CUSTOMISE riêng cho từng sản phẩm.
- Brief: xác định sản phẩm cụ thể, khách hàng và hướng thiết kế.

**BẮT BUỘC** là điều kiện nghiệm thu. **NÊN** là mặc định có thể điều chỉnh với lý do ghi trong bàn giao. **TUỲ CHỌN** chỉ làm khi có lợi cho brief.

Khi mâu thuẫn: yêu cầu rõ ràng mới nhất của chủ sản phẩm > file quy chuẩn này > hướng dẫn kỹ thuật > mẫu tham khảo. Phải ghi thay đổi so với chuẩn trong báo cáo; không được âm thầm nới chuẩn. Quyền truy cập và giới hạn của môi trường AI vẫn phải được tuân thủ.

Quy chuẩn này không phải chứng nhận pháp lý hay chứng nhận trợ năng. Không quảng cáo sản phẩm đã đạt một tiêu chuẩn bên ngoài chỉ từ checklist nội bộ.

## 2. Định nghĩa sản phẩm và phạm vi

Sản phẩm hiện tại là **một mẫu giao diện web tĩnh có thể bán và chỉnh sửa**, gồm một trang HTML, CSS, JavaScript thuần, minh hoạ SVG nội tuyến và tài liệu tiếng Anh cho khách hàng. Giải nén rồi mở `index.html` là xem được; không cần build, tài khoản hay cài thư viện.

Phải đạt đồng thời bốn kết quả:

1. Người xem hiểu trang dành cho ai, cung cấp gì và hành động tiếp theo là gì.
2. Người mua sửa được nội dung, màu sắc và liên kết qua hướng dẫn cụ thể.
3. Giao diện dùng được bằng chuột, cảm ứng và bàn phím ở các khổ kiểm tra.
4. File giao, ảnh preview và mô tả bán hàng phản ánh cùng một sản phẩm.

Không mặc định bao gồm backend, đăng nhập, thanh toán, gửi form, đặt lịch, tìm kiếm hay giỏ hàng hoạt động. Phân loại `shop` hoặc `saas` mô tả loại giao diện, không đồng nghĩa có các hệ thống này.

Agent và prompt **chưa có hồ sơ nghiệm thu**. Mục 12 chỉ quy định cách bổ sung sau này; không được dùng `WEB-STATIC-1` để tuyên bố chúng đạt chuẩn.

## 3. Những giới hạn cố định của WEB-STATIC-1

| Mã | Điều kiện bắt buộc |
|---|---|
| W01 | Gói khách nhận đúng sáu file theo hướng dẫn; không framework, thư viện JS, bước build hay CDN script. |
| W02 | Đường dẫn CSS/JS tương đối, mở được qua `file://` và máy chủ tĩnh. Không phụ thuộc API để hiển thị nội dung chính. |
| W03 | Minh hoạ là SVG nội tuyến tự tạo; không ảnh/video nhúng base64, hotlink ảnh, icon emoji hay tài sản không rõ nguồn. |
| W04 | Google Fonts là phụ thuộc mạng tuỳ chọn duy nhất theo hồ sơ này. Có font dự phòng, `display=swap`; mất mạng vẫn đọc và thao tác được. Không hứa font giống hoàn toàn khi offline. |
| W05 | JS chỉ phục vụ menu mobile và reveal. Tương tác ngoài phạm vi phải bỏ, thay bằng liên kết phù hợp hoặc đổi hồ sơ sản phẩm với chủ sản phẩm. |
| W06 | ZIP cuối cùng nhỏ hơn 20.480 byte, đo trên file thực tế. 14–18 KiB là mục tiêu tham khảo, không phải dung lượng phải cố đạt. |
| W07 | Không tracking, cookie banner giả, thu thập dữ liệu, khoá API, mã theo dõi hay request nền không được khai báo. |
| W08 | Không minify hoặc làm rối mã để giảm ZIP. Tên lớp, cấu trúc và chú thích phải phục vụ người mua sửa trực tiếp. |

Các giới hạn trên áp dụng cho bản giao gốc. Khách có thể thêm ảnh, backend hoặc thư viện vào bản của họ; tài liệu phải phân biệt rõ phần có sẵn và phần khách cần tự tích hợp.

## 4. Brief đầu vào cho mọi AI

Điền mẫu sau và gửi cùng ba file tài liệu. AI phải ghi lại brief đã chốt trong báo cáo nội bộ trước khi triển khai.

```text
Loại sản phẩm: web-template
Hồ sơ: WEB-STATIC-1
Phiên bản sản phẩm: 1.0.0
Tên sản phẩm:
Slug: [chỉ a-z, 0-9 và dấu -, bắt đầu/kết thúc bằng chữ hoặc số]
Ngành / tình huống sử dụng:
Người mua mẫu:
Người truy cập trang sau khi khách tuỳ chỉnh:
Mục tiêu chính của trang:
CTA chính và đích đến:
Nội dung / section bắt buộc:
Hướng thị giác: [cảm giác, bảng màu, typography, kiểu minh hoạ]
Điều cần tránh:
Tài sản / nội dung được cung cấp và quyền sử dụng:
Phạm vi giao: chỉ gói sản phẩm / kèm tích hợp cửa hàng
Nếu tích hợp: ô catalog còn trống và phân loại mong muốn:
Yêu cầu bổ sung / ngoại lệ được chủ sản phẩm chấp nhận:
```

Nếu thiếu ngành, mục tiêu chính hoặc có yêu cầu trái hồ sơ thì hỏi làm rõ trước phần phụ thuộc. Những lựa chọn có thể đảo ngược như tên doanh nghiệp demo, màu cụ thể, section phụ: AI tự chọn hợp lý và ghi giả định. Không hỏi lại thông tin đã được cung cấp. Nếu không có repository cửa hàng, giao gói và dữ liệu catalog đề xuất; không tuyên bố đã tích hợp.

## 5. Chất lượng thiết kế và nội dung

| Mã | Yêu cầu | Cách kiểm tra |
|---|---|---|
| D01 | Hero nêu rõ loại dịch vụ/sản phẩm, giá trị cụ thể và CTA chính. | Đọc headline, mô tả và CTA mà không dựa vào các section phía dưới vẫn hiểu trang. |
| D02 | Có một hướng thị giác rõ, phù hợp ngành; tối thiểu hai lựa chọn riêng về bố cục, typography, minh hoạ hoặc cách trình bày nội dung. | Ghi hai lựa chọn và vị trí thể hiện; không coi đổi tên và màu mẫu cũ là thiết kế mới. |
| D03 | Mỗi section phục vụ một câu hỏi của người truy cập. Không quy định máy móc số section. | Liệt kê mục đích của từng section; bỏ phần lặp lại không thêm thông tin. |
| D04 | Hệ thống màu, chữ, khoảng cách và nút nhất quán. | Khai token trong `:root`; thành phần cùng vai trò dùng chung style. Tối đa hai họ font trừ brief có lý do khác. |
| D05 | Bố cục không cắt chữ, chồng nội dung hoặc tạo khoảng trắng bất thường. | Xem ảnh toàn trang và trực tiếp cuộn từng khổ; tránh ngắt dòng cứng chỉ đẹp ở desktop. |
| D06 | Nội dung demo tiếng Anh cụ thể, nhất quán với ngành và doanh nghiệp giả định. | Không lorem ipsum, lời hứa vô nghĩa, đoạn lặp để lấp chỗ hoặc placeholder chưa giải thích. |
| D07 | Không dùng logo khách hàng thật, lời chứng thực gán cho người thật, chứng nhận hay số liệu như bằng chứng đã xác minh khi chưa có nguồn được phép. | Demo giả định phải được công khai trong README và LICENCE; đánh dấu các mục khách phải thay trong CUSTOMISE. |
| D08 | Giá, số liệu, địa chỉ và tên demo không mâu thuẫn giữa các section. | Đối chiếu toàn trang và tài liệu. Mọi `[YOUR ...]` đều có hướng dẫn thay. |

Không ép tất cả sản phẩm dùng một bố cục, palette hay hiệu ứng giống nhau. Chuẩn cố định là mức chất lượng và khả năng sử dụng; hướng nghệ thuật đi theo brief.

## 6. Tương tác và khả năng sử dụng

**Mọi phần tử trông như thao tác phải có hành vi rõ ràng.** Lập bảng nội bộ gồm nhãn, vị trí, loại phần tử, đích/hành vi, trạng thái demo và kết quả kiểm tra.

- CTA chính phải dẫn đến section có thật, `mailto:` được ghi rõ, hoặc URL được cung cấp. Không dùng `href="#"`, `javascript:void(0)` hay nút bấm không phản hồi.
- Không dựng form/ô tìm kiếm/giỏ hàng giả như thể đã hoạt động. Nếu cần minh hoạ giao diện này, ghi rõ “Demo only”, vô hiệu hoá thao tác gửi và cung cấp CTA thật phù hợp. Nếu đây là chức năng chính mà brief đòi hoạt động, phải giải quyết mâu thuẫn hồ sơ trước khi làm.
- Liên kết điều hướng dùng `<a>`; hành động dùng `<button type="button">`. Không biến `div` thành nút khi HTML đã có phần tử phù hợp.
- Menu mobile có tên đọc được, `aria-controls` trỏ đúng vùng menu, `aria-expanded` phản ánh trạng thái. Menu ẩn không còn nhận Tab; đóng bằng Escape trả focus về nút mở.
- Khi chuyển qua lại khổ desktop/mobile, menu và trạng thái ARIA không bị lệch. Dùng menu điều hướng dạng mở rộng thông thường; không tự thêm vai trò modal nếu không triển khai đầy đủ hành vi modal.
- Tắt JavaScript: nội dung chính, CTA và đường điều hướng vẫn sử dụng được. Chỉ ẩn menu/nội dung sau khi xác nhận JS đã khởi tạo; lỗi reveal không được để trang trắng.
- Tắt chuyển động: bỏ reveal, marquee và chuyển động không thiết yếu. Chuyển động tự chạy không thiết yếu phải dừng trong 5 giây; tránh tạo thêm điều khiển JS ngoài hồ sơ.

## 7. Responsive và trợ năng nội bộ

Các ngưỡng sau là tiêu chí sản phẩm bắt buộc, không thay thế kiểm toán trợ năng đầy đủ.

- Kiểm tra viewport CSS: **1440×900, 820×1180, 375×812, 320×740**. Ba mức đầu giữ theo hướng dẫn cũ; 320px bổ sung kiểm tra màn hình hẹp. Thử thêm quanh breakpoint menu.
- `document.documentElement.scrollWidth <= document.documentElement.clientWidth` ở mỗi khổ, cả khi menu mở. Không che lỗi bố cục bằng `overflow-x:hidden` trên toàn trang; phần trang trí được cắt cục bộ nếu không mất thông tin.
- Zoom 200% trên desktop vẫn đọc và thao tác được; không mất nội dung. Kiểm tra tiêu đề dài và font dự phòng để tránh tràn.
- Thân bài mặc định ít nhất 16px, chú thích ít nhất 14px. Vùng chạm của nút/link thao tác độc lập ít nhất 44×44 CSS px; link trong câu văn không phải phóng lớn nhưng phải dễ nhận biết.
- Đủ landmark, một `h1`, các heading thể hiện đúng phân cấp. `lang` đúng nội dung trang. Skip link xuất hiện khi focus và đưa đến nội dung chính.
- Tab/Shift+Tab theo thứ tự hợp lý, focus luôn nhìn được và không bị sticky header che. Không dùng `tabindex` dương.
- Tương phản chữ thường ít nhất 4.5:1; chữ lớn (từ 24px, hoặc 18.66px và đậm) ít nhất 3:1. Viền focus và dấu hiệu cần để nhận biết điều khiển phải đạt 3:1 so với nền sát cạnh. Không chỉ dùng màu để truyền đạt thông tin.
- Đo cặp màu thực tế ở trạng thái thường, hover, focus và trên nền tối/sáng. Script trong hướng dẫn chỉ để sàng lọc; bảng rỗng chưa đủ kết luận. Với gradient, opacity hoặc nền phức tạp phải kiểm tra vùng có tương phản thấp nhất dưới chữ, không chỉ hai đầu gradient.
- SVG trang trí dùng `aria-hidden="true" focusable="false"`; SVG truyền tải thông tin có tên truy cập bằng `role="img"` và `aria-labelledby`/`aria-label`. Bản sao của nội dung chạy lặp phải ẩn khỏi cây trợ năng.
- Nếu khách thay SVG bằng ảnh: ảnh mang thông tin có alt mô tả; ảnh thuần trang trí dùng `alt=""`. Không bắt tất cả ảnh có alt khác rỗng.

## 8. Mã nguồn, hiệu năng và giấy tờ

### Mã nguồn

Giữ đúng sáu file, BEM đơn giản, CSS tập trung, token đầu file và JS nhỏ như hướng dẫn. Số dòng JS 60–70 chỉ là tham khảo; không nén nhiều câu trên một dòng để đạt số dòng. Không ID trùng, selector chết do đổi markup, lỗi console, tài nguyên cục bộ 404 hay đường dẫn tuyệt đối theo máy người tạo.

Không dùng chiều cao cố định cho khối chứa văn bản nếu có thể cắt nội dung khi đổi font hoặc zoom. SVG phải có `viewBox` và co giãn đúng tỷ lệ. Mặc định dùng `preserveAspectRatio="xMidYMid meet"` khi cần giữ đầy đủ hình; `none` chỉ dành cho nền trừu tượng chấp nhận biến dạng, `slice` chỉ khi đã kiểm tra vùng bị cắt.

### Hiệu năng

ZIP dưới ngưỡng không tự chứng minh trang chạy nhanh. Ngoài đo byte, phải trực tiếp cuộn và thao tác, kiểm tra reveal không gây dịch chuyển bố cục, không đăng ký vòng lặp JS vô hạn hoặc listener cuộn không cần thiết. Không `background-attachment: fixed`; hạn chế blur và hiệu ứng vẽ lại nặng. Chỉ tải font/weight thật sự dùng.

Ghi môi trường kiểm tra, lỗi console/network và quan sát thực tế. Chụp được screenshot chỉ chứng minh đã render, không đủ kết luận hiệu năng. Nếu chạy Lighthouse hoặc công cụ tương tự, ghi phiên bản, cấu hình và số đo thật; không bịa điểm hoặc dùng một điểm số thay cho kiểm tra thủ công.

### Tài liệu giao khách

`README.md`, `CUSTOMISE.md`, `LICENCE.txt` mặc định bằng tiếng Anh, khớp sản phẩm thực tế. Nếu brief yêu cầu ngôn ngữ tài liệu khác, dùng ngôn ngữ đó. Ba file `customer-guide*.md` là cùng một hướng dẫn chung bằng Việt, Anh và Trung giản thể; khi sửa nội dung cốt lõi phải cập nhật đủ ba bản và giữ nguyên 10 bước, 12 prompt.

- README nói rõ là static template, phần hoạt động, phần demo, phụ thuộc font mạng, cách mở và phạm vi trình duyệt thực sự đã thử. Không hứa “no-code” khi khách phải sửa mã.
- CUSTOMISE chỉ chính xác file, chuỗi/selector cần tìm, số lần xuất hiện đã đếm, thao tác thay và cách tự kiểm tra. Bao gồm thương hiệu, metadata, CTA, nội dung, màu, font, SVG, phần lặp và dữ liệu demo.
- CUSTOMISE phải có lộ trình từng bước: giải nén/mở mẫu, sao lưu, chuẩn bị thông tin, gửi file cho AI, nhận và áp dụng file, tuỳ chỉnh, kiểm tra, xuất bản, tên miền tuỳ chọn, cập nhật/khôi phục. Mỗi bước nêu thao tác và kết quả mong đợi. Giữ bảng sửa ở đâu của chính mẫu, không thay bằng hướng dẫn chung.
- Kèm đủ 12 prompt theo bản `customer-guide*.md` cùng ngôn ngữ tài liệu khách hàng và điều chỉnh theo mẫu. Khách chép nguyên prompt, AI hỏi dữ liệu còn thiếu; không bắt khách tự điền selector, dòng mã hay cấu hình kỹ thuật. Nêu file cần gửi, việc cần làm và đầu ra đầy đủ để khách thay vào đúng đường dẫn.
- Prompt không được phụ thuộc bộ quy chuẩn nội bộ hoặc lịch sử hội thoại của người tạo sản phẩm. Hướng dẫn rõ khi đổi sang cuộc chat mới phải gửi lại file hiện tại và prompt khởi đầu. Không hứa AI sẽ sửa trực tiếp máy khách nếu công cụ chỉ trả văn bản.
- Tích hợp hướng dẫn vào CUSTOMISE, README trỏ tới đó; vẫn giữ sáu file trong ZIP. Không đưa customer-guide.md thành file thứ bảy. Có thể biên tập gọn câu chữ nhưng không cắt bước hoặc prompt thiết yếu để đạt dung lượng; đo lại ZIP sau khi bổ sung. Không tự nâng ngưỡng dung lượng nếu chưa có ngoại lệ.
- Đếm chuỗi theo nghĩa literal trên đúng file được nêu; nếu dùng regex phải escape. Đếm lại sau lần sửa mã cuối cùng. Không sao chép số đếm từ sản phẩm tham khảo.
- LICENCE giữ chính sách thương mại bảy mục trong hướng dẫn; không tự thay đổi quyền bán lại hoặc bảo hành. Nêu đúng chủ thể bản quyền được cung cấp; thiếu thì đánh dấu cần chủ sản phẩm điền, không tự bịa chủ sở hữu.
- Kiểm tra giấy phép riêng của từng font qua nguồn chính thức của font; không mặc định mọi font trên Google Fonts đều có cùng giấy phép. Ghi tên và liên kết nguồn. Nếu chưa kiểm tra, ghi chưa xác minh và chưa đạt điều kiện phát hành.

## 9. Quy trình và điều kiện nghiệm thu

1. Đọc ba file hướng dẫn, quy chuẩn và hướng dẫn khách hàng, chốt brief, giả định và phạm vi. Lập bố cục, hướng thiết kế, bảng tương tác trước khi dựng.
2. Dựng đủ sáu file. Tự kiểm tra mã và nội dung; sửa lỗi trước khi chụp ảnh.
3. Mở trình duyệt kiểm tra theo bảng bên dưới. Công cụ tự động hỗ trợ nhưng không thay cho việc nhìn giao diện và thao tác.
4. Cập nhật tài liệu từ mã cuối cùng, đóng ZIP, giải nén vào thư mục kiểm tra riêng và kiểm tra chính bản giải nén.
5. Tạo preview từ bản đã nghiệm thu. Nếu sửa mã sau đó, chạy lại các kiểm tra bị ảnh hưởng, đóng lại ZIP và tạo lại preview.
6. Chỉ tích hợp cửa hàng nếu thuộc phạm vi brief; chưa publish/deploy nếu yêu cầu chỉ là tạo gói.

| Mã kiểm tra | Bằng chứng phải ghi |
|---|---|
| Q01 Cấu trúc | Danh sách sáu file; không file tạm, bí mật, thư viện hay tài sản dư. |
| Q02 Responsive | Kích thước viewport, scrollWidth/clientWidth, ảnh toàn trang từng khổ và ảnh trạng thái menu mobile mở. |
| Q03 Tương tác | Kết quả từng dòng bảng tương tác; Escape, đóng khi chọn link, resize qua breakpoint. |
| Q04 Bàn phím | Skip link, Tab/Shift+Tab, focus, menu ẩn không nhận Tab; ghi nơi đã thao tác. |
| Q05 Cấu trúc trợ năng | Landmark, h1, heading, tên điều khiển, SVG và ID đã kiểm tra. |
| Q06 Tương phản | Cặp màu/vùng nền, tỷ lệ đo, ngưỡng và trạng thái đã kiểm tra; ghi kiểm tra thủ công với nền phức tạp. |
| Q07 Khả năng dự phòng | Tắt JS, reduced motion, offline/font lỗi, zoom 200%; kết quả và ảnh nếu có lỗi. |
| Q08 Trình duyệt | Tên, phiên bản, hệ điều hành, phương thức file:// hoặc HTTP; kết quả thực tế. |
| Q09 Chất lượng kỹ thuật | Console/network, thao tác cuộn, tài nguyên ngoài và số byte ZIP thực tế. |
| Q10 Tài liệu/quyền sử dụng | Số đếm cuối cùng, placeholder, nguồn/giấy phép font, chính sách licence, mô tả đúng chức năng; đủ lộ trình khách hàng và 12 prompt copy được. Thử làm theo đường dẫn/file trong hướng dẫn; đọc từng prompt để xác nhận có đầu vào, nhiệm vụ, đầu ra và xử lý dữ liệu thiếu. Không tuyên bố đã thử với AI khác nếu chưa thử. |
| Q11 Gói cuối | Tên ZIP, SHA-256, sáu file sau giải nén; mở file:// và HTTP từ bản giải nén. |
| Q12 Cửa hàng | Nếu thuộc phạm vi: slug, category, nội dung vi/en/zh, preview, file tải đúng sản phẩm. Nếu không: N/A và lý do. |
| Q13 Thiết kế | Kết quả D01–D08, hai lựa chọn thiết kế riêng và các điểm còn yếu. |

Mức trình duyệt tối thiểu để phát hành: kiểm tra trực tiếp trên Chromium và Firefox, ghi phiên bản. Safari chỉ được ghi hỗ trợ đã kiểm tra khi thực sự chạy trên Safari; WebKit giả lập phải ghi là WebKit, không gọi là Safari/iPhone thật. Muốn quảng cáo hỗ trợ thêm trình duyệt/thiết bị thì phải có bằng chứng tương ứng.

Mỗi mục dùng một trạng thái: **PASS**, **FAIL**, **NOT TESTED**, **N/A** (kèm lý do áp dụng). Không có công cụ thì ghi NOT TESTED và cách kiểm tra còn thiếu; không tự suy ra PASS từ việc đọc mã.

- **ĐẠT ĐỂ PHÁT HÀNH:** mọi yêu cầu bắt buộc trong phạm vi PASS, không còn FAIL/NOT TESTED; N/A chỉ dùng cho yêu cầu thực sự không áp dụng.
- **CHỜ KIỂM TRA:** mã đã có nhưng còn kiểm tra bắt buộc chưa chạy.
- **CHƯA ĐẠT:** còn lỗi bắt buộc hoặc ngoại lệ chưa được chấp nhận.

Không lấy điểm trung bình để bù một lỗi bắt buộc. Ngoại lệ được chủ sản phẩm chấp nhận phải ghi phạm vi, lý do và ảnh hưởng; trạng thái khi đó là “Đạt theo ngoại lệ …”, không phải đạt nguyên chuẩn.

## 10. Bàn giao và tích hợp cửa hàng

### Gói khách hàng

```text
<slug>.zip
└── <slug>/
    ├── index.html
    ├── assets/css/style.css
    ├── assets/js/main.js
    ├── CUSTOMISE.md
    ├── README.md
    └── LICENCE.txt
```

### Hồ sơ nội bộ, không đóng vào ZIP

Lưu tại `web/product/giao-dien-web/<slug>/reviews/<version>/`: `BRIEF.md`, `QA.md`, thư mục `screenshots/` và `catalog-copy.md` nếu có tích hợp. Ngoài repository, dùng cùng cấu trúc dưới thư mục bàn giao. Hồ sơ nội bộ tiếng Việt; nội dung catalog đủ vi/en/zh khi đưa vào cửa hàng.

`QA.md` phải có phiên bản chuẩn và sản phẩm, ngày kiểm tra, môi trường, bảng Q01–Q13, đường dẫn bằng chứng, kết quả D01–D08, bảng tương tác, byte/hash ZIP, giả định, ngoại lệ, lỗi còn lại và trạng thái cuối. Không yêu cầu người nhận truy lại hội thoại để biết đã kiểm tra gì.

Trong repository hiện tại:

- Mã: `web/product/giao-dien-web/<slug>/source/`.
- Đóng gói: `node web/product/giao-dien-web/tools/dong-goi.mjs <slug>` → `web/product/giao-dien-web/<slug>/<slug>.zip`.
- Preview: `node web/product/giao-dien-web/tools/anh-preview.mjs <slug>` → `web/public/previews/<slug>.webp`, 698×524. Ảnh phải chụp từ mã giao, không dùng concept/mockup khác sản phẩm.
- Dữ liệu: `web/src/lib/real-templates.ts`. Phân loại hiện có: `portfolio | saas | business | shop | motion`; không dùng `agency` khi code chưa hỗ trợ.
- Không ghi đè ô catalog hoặc slug đã tồn tại để thêm mẫu mới. Kiểm tra tên trên trang chủ, thư viện và chi tiết đều khớp preview/file tải.
- ZIP có trên máy chưa chứng minh khách tải được trên môi trường triển khai. Khi phạm vi gồm phát hành, xác minh cơ chế lưu file và luồng tải được cấp quyền thực tế; thiếu quyền/môi trường thì báo phần này chưa kiểm tra.

AI không ở trong repository phải tạo ZIP theo đúng cây trên bằng công cụ có sẵn, kiểm tra bản giải nén và cung cấp đề xuất catalog riêng. Không cần script riêng của Forge Zone để tạo một sản phẩm hợp chuẩn.

## 11. Lệnh giao việc có thể sao chép

```text
Bạn đang tạo sản phẩm cho Forge Zone. Đọc toàn bộ instruction-product.txt,
product-standards.md và bản customer-guide đúng ngôn ngữ đính kèm. Áp dụng
hồ sơ WEB-STATIC-1 theo quy chuẩn phiên bản 1.2.

BRIEF:
[Dán brief đã điền theo mục 4 của product-standards.md]

Tích hợp hướng dẫn từng bước và đủ 12 prompt cho khách vào CUSTOMISE.md,
điều chỉnh theo sản phẩm, mặc định tiếng Anh; README chỉ đường đọc rõ ràng.
Thực hiện đến khi có sản phẩm, tài liệu khách hàng, ZIP đã kiểm tra sau giải
nén và hồ sơ nghiệm thu. Nếu brief thiếu thông tin ảnh hưởng phạm vi, hỏi
làm rõ; các quyết định thiết kế có thể đảo ngược thì tự chọn và ghi giả định.
Nếu không có mẫu tham khảo hoặc repository cửa hàng, vẫn dựng sản phẩm
từ ba tài liệu này; chỉ ghi rõ phần tích hợp chưa thực hiện.

Không tuyên bố đã thử điều chưa thử. Báo PASS/FAIL/NOT TESTED/N/A theo
Q01–Q13 và đánh giá D01–D08. Không bỏ qua lỗi để tuyên bố hoàn thành.

Bàn giao: đường dẫn gói, mã nguồn, preview nếu thuộc phạm vi, hồ sơ QA,
byte/hash ZIP, trạng thái nghiệm thu, ngoại lệ và việc còn thiếu.
Không tự triển khai hệ thống thanh toán/backend hoặc xuất bản cửa hàng
khi brief không yêu cầu.
```

## 12. Mở rộng sang agent và prompt

Giữ chung cơ chế: brief → hồ sơ theo loại → sản phẩm → bằng chứng → nghiệm thu → bàn giao; mỗi loại có định nghĩa đầu vào/đầu ra và giới hạn riêng. Không ép agent/prompt dùng sáu file, giới hạn ZIP hoặc tiêu chí thị giác của web.

Khi triển khai loại mới, bổ sung tài liệu riêng rồi cập nhật danh sách hồ sơ:

| Hồ sơ | Trạng thái | Nội dung cần xác định trước khi áp dụng |
|---|---|---|
| WEB-STATIC-1 | Đang áp dụng | Toàn bộ quy chuẩn web trong file này. |
| WEB-STATIC-IMG-1 | **Đề xuất, chờ chủ sản phẩm duyệt — chưa áp dụng** | Xem mục 12.1. Cho mẫu có ảnh raster thay cho ngoại lệ từng mẫu. |
| AGENT-1 | Dự kiến, chưa nghiệm thu được | Nhiệm vụ, quyền/công cụ, dữ liệu, điều kiện dừng, can thiệp người dùng, chi phí, log, bảo mật, ca kiểm thử thành công/thất bại và cách cài đặt. |
| PROMPT-1 | Dự kiến, chưa nghiệm thu được | Mục tiêu, biến đầu vào, hợp đồng đầu ra, môi trường/model đã thử, ví dụ, ca kiểm thử, tiêu chí chấm, giới hạn và cách dùng lại. |

### 12.1 Đề xuất hồ sơ WEB-STATIC-IMG-1 (chưa áp dụng)

Lý do: tại thời điểm 03/10/2026, 5/8 mẫu đang bán (tidal, solenne, pinehaven, japan-trails, astra-interior) vượt `WEB-STATIC-1` bằng ngoại lệ riêng về ảnh/dung lượng. Đề xuất gom thành một hồ sơ chính thức. Khi chưa được duyệt, các mẫu này vẫn là `WEB-STATIC-1` + ngoại lệ ghi trong QA.md.

Kế thừa toàn bộ `WEB-STATIC-1` (D01–D08, Q01–Q13, W02, W04, W05, W07, W08), chỉ thay:

| Mã | Thay cho | Điều kiện đề xuất |
|---|---|---|
| I01 | W01 | Sáu file bắt buộc + thư mục `assets/img/` chứa tối đa 8 ảnh raster (WebP/AVIF, JPEG chỉ khi có lý do). Không file nào khác. |
| I02 | W03 | Mỗi ảnh có nguồn ghi trong QA.md (tự chụp, tự vẽ hoặc tạo bằng AI bởi chủ sản phẩm) và quyền giao cho khách. `LICENCE.txt` phải nói rõ ảnh có được dùng trên site của khách hay không — **chủ sản phẩm tự sửa điều khoản**, agent không được sửa. Không hotlink, không base64. |
| I03 | W06 | ZIP < 1.048.576 byte; mỗi ảnh ≤ 300 KB; `dong-goi.mjs` chạy với `--ngoai-le` và QA.md ghi byte từng ảnh. |
| I04 | mới | Ảnh có kích thước/`aspect-ratio` khai báo (không nhảy bố cục); ảnh dưới màn hình đầu dùng `loading="lazy"`; ảnh trang trí đặt bằng CSS hoặc `alt=""`. |
| I05 | mới | Chữ đè lên ảnh phải có lớp phủ/nền và được kiểm **thủ công** trên ảnh chụp ở 320, 768, 1024, 1440 px (công cụ chỉ đánh dấu "overImage"). Ghi kết quả vào QA.md. |
| I06 | mới | Mất ảnh (xoá thư mục `img`) vẫn đọc và thao tác được: nội dung, điều hướng, nút còn đủ. |

Cần chủ sản phẩm quyết: ngưỡng 1 MiB / 300 KB / 8 ảnh; có cho phép JS ngoài menu + reveal không (hiện vẫn theo W05); và nội dung điều khoản ảnh trong `LICENCE.txt`. Sau khi duyệt: tăng chuẩn lên 1.3, ghi lịch sử và nghiệm thu lại từng mẫu theo hồ sơ mới.

Mỗi lần thay đổi chuẩn: tăng phiên bản, ghi thay đổi và phạm vi áp dụng. Sản phẩm cũ giữ phiên bản chuẩn đã nghiệm thu; không tự gắn nhãn đạt bản mới khi chưa kiểm tra lại. Phiên bản sản phẩm dùng `major.minor.patch`: major khi phá vỡ cấu trúc/cách tuỳ chỉnh, minor khi thêm nội dung hoặc khả năng tương thích ngược, patch khi sửa lỗi. Tăng phiên bản và thay hash mỗi khi thay gói đã bàn giao.

### Lịch sử

- 1.2 — 21/09/2026: bổ sung bản hướng dẫn khách hàng tiếng Anh và Trung giản thể; yêu cầu ba bản giữ cùng cấu trúc 10 bước, 12 prompt.
- 1.1 — 21/09/2026: thêm hướng dẫn khách hàng 10 bước và 12 prompt; yêu cầu tích hợp trong CUSTOMISE, mở rộng Q10. Chưa tự cập nhật hoặc nghiệm thu lại các ZIP đã có.
- 1.0 — 21/09/2026: thêm chuẩn sản phẩm web, brief độc lập, tiêu chí nghiệm thu có bằng chứng, bộ bàn giao và cấu trúc mở rộng agent/prompt.
