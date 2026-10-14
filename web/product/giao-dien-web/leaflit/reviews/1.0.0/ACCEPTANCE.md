# ForgeFrame acceptance · Leaflit candidate

Gate: NOT TESTED / chưa đủ điều kiện phát hành.

Reference là ảnh 822×490 đính kèm; không có video nên video coverage N/A. Không tính overlay xem ảnh góc dưới phải là nội dung web. Các trọng số vùng đã khóa ở REFERENCE-MAP.md.

Candidate đã render từ source; screenshots/ có ảnh Chromium/Firefox bốn viewport và khổ reference. So sánh trực quan: bìa/portrait dùng SVG tự tạo thay ảnh, thương hiệu/copy đã đổi, layout responsive 822px khác reference desktop thu nhỏ. Những khác biệt này chưa được chủ sản phẩm duyệt; không điền điểm rubric giả và không công bố >95%.

Animation/scroll: có frame trung gian mobile ở OS reduce (opacity khoảng .5–.66, transform translateY khoảng 5–8px), sau 450ms trở về 1/none. Bằng chứng candidate-checks.json. Kiểm scroll ngược/cleanup/resize motion đầy đủ NOT TESTED.

Technical: không overflow bốn khổ, không axe violation hoặc pageerror ở hai engine đã thử; no-JS/offline PASS; CSS zoom 200% PASS. Bằng chứng supplemental.json. Chưa test Safari/Edge/Cốc Cốc thật, chưa test ZIP giải nén hay UI browser zoom.

Theo `C:/Users/Lenovo/.codex/skills/forgeframe/references/acceptance.md`: “Không đóng ZIP giao, push, deploy hoặc công bố ‘đã hoàn thành’ khi cửa chưa PASS.” Vì gate chưa PASS, chỉ giao source candidate để xem và tiếp tục chốt phạm vi, chưa xuất bản.

## Ngoại lệ W05 và tương tác cục bộ

Chủ sản phẩm đã duyệt JS cục bộ ngày 14/10/2026. local-checks.json ghi PASS cho search title/author, genre/saved filter, empty, save/remove, storage reload/cross-tab/blocked/corrupt và profile text escaping ở Chromium/Firefox. Ngoại lệ này không thay yêu cầu fidelity >95% và không phải ủy quyền triển khai. Source manifest đã cập nhật theo bản cuối.

## Cập nhật bìa ảnh theo yêu cầu mới

Đã thay đủ tám SVG bìa bằng ảnh realistic do imagegen tạo. Đây là thay đổi chủ sản phẩm yêu cầu, không còn coi việc đổi bìa tự nó là ngoại lệ fidelity chưa duyệt. Tên/brand/portrait/layout còn phải đối chiếu theo scope release. Người dùng chỉ yêu cầu thay bìa ở lượt này; không push/deploy/catalog. Xem local-checks.json, generated-covers.json và design/ASSETS.md.
