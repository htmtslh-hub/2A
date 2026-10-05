# Choreography và tích hợp

## Carousel

- Tách `selected`, `direction`, `visual state`. Next ở index cuối vẫn `direction=+1` dù normalized index thành 0. Chuẩn hóa bằng `((index % count) + count) % count`.
- Resting slots của mẫu: x=0/65/110%, scale=1/.46/.32, opacity=1/.46/.25. Preview xa không phải sản phẩm đang chọn.
- Đọc computed transform/opacity hình đang thoát để bấm nhanh không giật về đầu. Hủy timer/RAF cũ trước khi tạo lượt mới.
- Tạm tắt transition để đặt incoming ở `direction * 65%`, đặt preview thứ ba ở xa. Flush layout **một lần**, RAF bật transition: incoming về 0, outgoing tới `-direction * 65%`, fade out.
- Kết thúc: recycle outgoing về preview xa **không transition**, không cho nó quay ngược qua tâm. Timeout mẫu dư 60ms so với duration; production có thể dùng transitionend kèm timeout dự phòng.
- Label/spec/counter/accessibility cùng index. Nếu fade chữ có timer, hủy timer cũ khi bấm nhanh. Chỉ blur ảnh, tránh blur chữ/nút; ưu tiên transform/opacity thay vì tween left/top/width.

## Liên tục giữa các cảnh

Giữ hình được chọn trong wrapper chung khi intro → detail. Carousel ghi transform hình con; scroll timeline ghi transform wrapper. Detail lấy dữ liệu cùng model. Recipe Auralis có thể chỉnh:

| Progress | Choreography |
| --- | --- |
| 0–.25 | Hình chọn dịch về vùng chi tiết; intro fade out, detail fade in |
| .37–.55 | Hình/detail rời trái, phụ kiện vào từ phải |
| .72–.90 | Phụ kiện rời lên, sản phẩm kế tiếp vào từ dưới |

Starter demo dùng ba panel tổng quát để dễ chạy độc lập. Nếu cần cùng một hình xuyên hai cảnh, dùng wrapper chung trên thay vì nhân bản ảnh rồi crossfade.

Progress = `clamp(-sectionRect.top / max(1, sectionRect.height - viewportHeight), 0, 1)`. Sticky stage khác với chiều cao vùng scroll. Fallback tĩnh phải có chiều cao tự nhiên.

Với wheel/key input thô, làm mượt **render progress**: `blend = 1 - exp(-dt / 70)`. Giới hạn `dt` tối đa 32ms sau idle để cuộn đầu không nhảy qua cảnh; dừng RAF khi sai số < .0002. Đồng bộ trực tiếp khi ngoài viewport hoặc vừa resize.

CTA dùng tween hữu hạn scrollTo từng RAF. Demo đặt CSS `scroll-behavior: auto` tránh native smooth lồng vào tween. Wheel/touchstart/keys điều hướng hủy tween; chỉ preventDefault phím carousel khi focus controls. Không khóa cuộn trang. Hủy hoặc recompute tween khi resize.

## API starter

```js
const controller = Morge.mount(document.querySelector('[data-morge]'), {
  duration: 1050,          // milliseconds
  travel: 65,             // % chiều rộng slide
  minHeight: 420,          // thấp hơn: scene tĩnh
  storageKey: 'my-project-motion',
  onSelect(index) { /* cập nhật nội dung từ dữ liệu sản phẩm thật */ }
});
controller.next();
controller.previous();
controller.select(2, 1);   // index đích + hướng, trực tiếp tới index 2
controller.setMotion(false);
controller.destroy();     // khi component unmount
```

Index là số nguyên, đầu vào không hợp lệ được bỏ qua. `select` mặc định suy hướng từ index yêu cầu; thumbnails nên truyền hướng rõ ràng. Mẫu hỗ trợ một/nhiều slide; preview ngoài hai slot gần cùng đặt xa/mờ. Story mẫu có tối đa ba cảnh; muốn nhiều hơn cần mở rộng timeline hoặc dùng thư viện hiện có.

Selectors trong một `[data-morge]` root:

- `[data-morge-visual]` chứa `[data-morge-slide]` cùng kích thước.
- `[data-morge-controls]` chứa `[data-morge-prev]`, `[data-morge-count]`, `[data-morge-next]`.
- `[data-morge-motion]`: button Bật/Tạm dừng với aria-pressed.
- `[data-morge-story]` chứa `.morge-stage` và `[data-morge-scene]`.
- `[data-morge-scene-to="0|1|2"]`: CTA tới đầu/giữa/cuối story.

URL → storage → OS. Nút motion xóa query `motion` bằng replaceState, tránh reload ép ngược lựa chọn vừa chọn. `morge-ready` chỉ thêm sau mount; `morge-motion` bật sticky khi được phép và viewport đủ cao. Panel ẩn dùng aria-hidden/inert; nếu nó đang chứa focus, chuyển focus về nút motion trước.

## Responsive và framework

- Controls nằm ngoài wrapper hình bị transform, có hàng riêng căn giữa; kích thước nút mẫu ít nhất 48px.
- Viewport ngắn/chữ lớn cần static fallback khi nội dung không vừa. `minHeight` chỉ là điểm bắt đầu; đo nội dung thật hoặc dùng ResizeObserver nếu cần.
- Khi thêm ảnh thật: khai báo kích thước, predecode hình sắp tới, tránh nháy trắng trên mạng chậm, hạn chế blur và will-change thường trực.
- Không mount lúc SSR. React effect trả cleanup destroy; hỗ trợ mount → destroy → mount của StrictMode. Có thể chuyển logic sang ref/state của component.
- GSAP/Framer hiện có: giữ choreography/state/cancel, dùng lifecycle/context của thư viện. Không tải thêm CDN thứ hai.
- Khi browser thiếu motion: kiểm tra JS exception, reduce-motion, overflow ancestor làm sticky hỏng và cache asset. Không kết luận browser hỏng chỉ từ cài đặt hệ điều hành.
