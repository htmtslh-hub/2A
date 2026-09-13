import { COMPANY } from '@/lib/company';
import { LEGAL_PATHS, type LegalPack } from './types';

const C = COMPANY;
const link = (href: string, text: string) => `<a href="${href}">${text}</a>`;

export const LEGAL_VI: LegalPack = {
  /* ─────────────────────────── ĐIỀU KHOẢN ─────────────────────────── */
  terms: {
    title: 'Điều khoản sử dụng',
    intro: `Điều khoản này áp dụng cho mọi giao dịch và việc sử dụng website ${C.siteUrl}. Khi đặt mua hoặc tạo tài khoản, bạn đồng ý với các nội dung dưới đây.`,
    sections: [
      {
        h: '1. Chúng tôi là ai',
        p: [
          `Website ${C.brand} do <b>${C.legalName}</b> vận hành${C.taxId ? `, mã số thuế ${C.taxId}` : ''}.`,
          `Địa chỉ: ${C.address}, ${C.country}. Liên hệ: ${link(`mailto:${C.email}`, C.email)}${C.phone ? ` — ${C.phone}` : ''}.`,
        ],
      },
      {
        h: '2. Sản phẩm',
        p: [
          'Chúng tôi bán giao diện web dựng sẵn dưới dạng sản phẩm số: mã nguồn HTML, CSS, JavaScript kèm nội dung mẫu và tài liệu hướng dẫn tuỳ biến.',
          'Sản phẩm được giao bằng đường tải về, không có hàng vật lý và không phát sinh phí vận chuyển.',
          'Ảnh và nội dung minh hoạ trong bản demo chỉ nhằm trình bày bố cục, có thể không đi kèm trong file bàn giao nếu bị ràng buộc bản quyền của bên thứ ba.',
        ],
      },
      {
        h: '3. Tài khoản',
        p: [
          'Bạn cần tạo tài khoản để mua hàng và tải lại sản phẩm đã mua. Bạn chịu trách nhiệm giữ bí mật mật khẩu và mọi hoạt động phát sinh dưới tài khoản của mình.',
          'Vui lòng cung cấp email chính xác — đây là nơi chúng tôi gửi link tải và thông tin đơn hàng.',
        ],
      },
      {
        h: '4. Đặt hàng và thanh toán',
        p: [
          'Giá hiển thị trên trang bảng giá tại thời điểm đặt hàng là giá áp dụng. Khách trong nước thanh toán bằng VNĐ, khách quốc tế thanh toán bằng USD.',
          'Với đơn hàng quốc tế, <b>Paddle.com Market Ltd</b> là đơn vị bán hàng chính thức (merchant of record) và chịu trách nhiệm thu, kê khai thuế GTGT/GST tại nước của người mua. Hoá đơn của bạn sẽ mang tên Paddle.',
          'Với đơn hàng trong nước, thanh toán được xử lý qua cổng PayOS bằng hình thức chuyển khoản ngân hàng.',
          'Đơn hàng chỉ được coi là hoàn tất khi chúng tôi nhận được xác nhận thanh toán thành công từ cổng thanh toán.',
        ],
      },
      {
        h: '5. Giao hàng',
        p: [
          'Ngay sau khi thanh toán thành công, quyền tải sản phẩm được mở trong tài khoản của bạn và một link tải được gửi tới email đã đăng ký.',
          'Link trong email có hạn 7 ngày. Sau đó bạn vẫn tải lại được bất cứ lúc nào trong mục đơn hàng của tài khoản, không giới hạn số lần.',
          'Nếu sau 30 phút chưa nhận được email, hãy kiểm tra hộp thư rác rồi liên hệ chúng tôi.',
        ],
      },
      {
        h: '6. Quyền sử dụng',
        p: [
          `Việc mua hàng cấp cho bạn giấy phép sử dụng, không phải chuyển nhượng quyền sở hữu. Chi tiết xem ${link(LEGAL_PATHS.license, 'Giấy phép sử dụng')}.`,
          'Chúng tôi giữ toàn bộ quyền sở hữu trí tuệ đối với thiết kế và mã nguồn.',
        ],
      },
      {
        h: '7. Hoàn tiền',
        p: [
          `Chúng tôi hoàn tiền trong ${C.refundDays} ngày theo điều kiện nêu tại ${link(LEGAL_PATHS.refund, 'Chính sách hoàn tiền')}.`,
        ],
      },
      {
        h: '8. Những việc không được làm',
        p: [
          'Bán lại, cho thuê, phân phối lại hoặc chia sẻ công khai file sản phẩm, kể cả khi đã chỉnh sửa.',
          'Đăng sản phẩm lên các chợ template, kho chia sẻ hoặc mạng chia sẻ ngang hàng.',
          'Chia sẻ tài khoản hoặc link tải cho người chưa mua.',
          'Dùng sản phẩm cho nội dung vi phạm pháp luật Việt Nam hoặc pháp luật nơi bạn cư trú.',
          'Vi phạm những điều trên có thể dẫn tới việc chấm dứt tài khoản và thu hồi giấy phép mà không hoàn tiền.',
        ],
      },
      {
        h: '9. Giới hạn trách nhiệm',
        p: [
          'Sản phẩm được cung cấp "nguyên trạng". Chúng tôi đã kiểm thử trên các trình duyệt hiện hành nhưng không cam kết sản phẩm chạy đúng trên mọi môi trường, mọi hệ thống hoặc mọi bản chỉnh sửa của bạn.',
          'Trong phạm vi pháp luật cho phép, trách nhiệm của chúng tôi trong mọi trường hợp không vượt quá số tiền bạn đã trả cho đơn hàng liên quan.',
          'Chúng tôi không chịu trách nhiệm với thiệt hại gián tiếp như mất doanh thu, mất dữ liệu hoặc gián đoạn kinh doanh.',
        ],
      },
      {
        h: '10. Thay đổi điều khoản',
        p: [
          'Chúng tôi có thể cập nhật điều khoản này. Bản mới có hiệu lực kể từ khi đăng lên website. Đơn hàng đã hoàn tất áp dụng theo điều khoản tại thời điểm mua.',
        ],
      },
      {
        h: '11. Luật áp dụng',
        p: [
          `Điều khoản này chịu sự điều chỉnh của pháp luật ${C.country}. Tranh chấp trước hết được giải quyết bằng thương lượng; nếu không đạt kết quả sẽ đưa ra toà án có thẩm quyền tại ${C.country}.`,
        ],
      },
      {
        h: '12. Liên hệ',
        p: [`Mọi thắc mắc về điều khoản, gửi về ${link(`mailto:${C.email}`, C.email)}.`],
      },
    ],
  },

  /* ─────────────────────────── BẢO MẬT ─────────────────────────── */
  privacy: {
    title: 'Chính sách bảo mật',
    intro:
      'Chính sách này giải thích chúng tôi thu thập dữ liệu gì của bạn, dùng vào việc gì, chia sẻ với ai và bạn có những quyền nào.',
    sections: [
      {
        h: '1. Đơn vị xử lý dữ liệu',
        p: [
          `<b>${C.legalName}</b>, địa chỉ ${C.address}, ${C.country}, là bên chịu trách nhiệm với dữ liệu cá nhân nêu trong chính sách này. Liên hệ: ${link(`mailto:${C.email}`, C.email)}.`,
        ],
      },
      {
        h: '2. Dữ liệu chúng tôi thu thập',
        p: [
          '<b>Khi bạn tạo tài khoản:</b> email, tên (nếu bạn nhập) và mật khẩu. Mật khẩu được lưu dưới dạng băm bcrypt — chúng tôi không lưu và không đọc được mật khẩu gốc của bạn.',
          '<b>Khi bạn mua hàng:</b> email, tên, thông tin đơn hàng và trạng thái thanh toán. <b>Chúng tôi không nhận và không lưu số thẻ của bạn</b> — toàn bộ thông tin thanh toán do cổng thanh toán xử lý trực tiếp.',
          '<b>Khi bạn để lại email nhận mẫu miễn phí:</b> địa chỉ email và ngôn ngữ bạn đang xem.',
          '<b>Khi bạn truy cập website:</b> nhật ký kỹ thuật thông thường của máy chủ như địa chỉ IP, loại trình duyệt và thời điểm truy cập.',
        ],
      },
      {
        h: '3. Mục đích sử dụng',
        p: [
          'Xử lý đơn hàng, giao sản phẩm và mở quyền tải lại.',
          'Xác thực đăng nhập và giữ phiên làm việc.',
          'Gửi email giao dịch: xác nhận đơn, link tải, đặt lại mật khẩu.',
          'Gửi thông tin về mẫu mới và khuyến mãi, chỉ khi bạn chủ động để lại email. Mỗi thư đều có đường dẫn huỷ nhận.',
          'Hỗ trợ khách hàng và xử lý khiếu nại.',
        ],
      },
      {
        h: '4. Bên thứ ba chúng tôi sử dụng',
        p: [
          'Để vận hành dịch vụ, dữ liệu của bạn được xử lý bởi các nhà cung cấp sau, mỗi bên chỉ nhận phần dữ liệu cần thiết:',
          '<b>Paddle.com Market Ltd</b> (Anh) — xử lý thanh toán quốc tế với vai trò đơn vị bán hàng chính thức, nhận email và thông tin thanh toán của bạn.',
          '<b>PayOS</b> (Việt Nam) — xử lý thanh toán trong nước qua chuyển khoản ngân hàng.',
          '<b>Resend</b> (Hoa Kỳ) — gửi email giao dịch, nhận địa chỉ email và nội dung thư.',
          '<b>Vercel</b> (Hoa Kỳ) — máy chủ chạy website.',
          '<b>Neon</b> (Hoa Kỳ) — cơ sở dữ liệu lưu tài khoản và đơn hàng.',
          'Chúng tôi không bán dữ liệu cá nhân của bạn cho bất kỳ ai.',
        ],
      },
      {
        h: '5. Chuyển dữ liệu ra nước ngoài',
        p: [
          'Một số nhà cung cấp nêu trên đặt máy chủ ngoài Việt Nam. Khi bạn sử dụng dịch vụ, dữ liệu cần thiết cho việc xử lý đơn hàng sẽ được chuyển tới các hệ thống đó.',
        ],
      },
      {
        h: '6. Cookie và lưu trữ trên trình duyệt',
        p: [
          'Chúng tôi chỉ dùng những cookie cần thiết cho hoạt động của website, không dùng cookie quảng cáo và không theo dõi bạn trên các website khác.',
          '<b>Cookie phiên đăng nhập</b> — giữ cho bạn ở trạng thái đã đăng nhập.',
          '<b>Cookie ngôn ngữ</b> (<code>agentic-lang</code>) — nhớ thứ tiếng bạn đang xem.',
          'Ngoài ra trình duyệt của bạn lưu lựa chọn ngôn ngữ trong localStorage. Dữ liệu này nằm trên máy bạn, không gửi về chúng tôi.',
        ],
      },
      {
        h: '7. Thời gian lưu trữ',
        p: [
          'Dữ liệu tài khoản và đơn hàng được lưu trong thời gian tài khoản còn hoạt động, và sau đó theo thời hạn lưu trữ chứng từ mà pháp luật yêu cầu.',
          'Email đăng ký nhận tin được lưu cho tới khi bạn huỷ nhận.',
          'Link tải một lần và token đặt lại mật khẩu tự hết hạn, lần lượt sau 7 ngày và 1 giờ.',
        ],
      },
      {
        h: '8. Quyền của bạn',
        p: [
          'Bạn có quyền yêu cầu xem, sửa hoặc xoá dữ liệu cá nhân của mình, và quyền rút lại sự đồng ý nhận email tiếp thị bất cứ lúc nào.',
          `Gửi yêu cầu về ${link(`mailto:${C.email}`, C.email)}, chúng tôi phản hồi trong vòng 30 ngày.`,
          'Lưu ý: xoá tài khoản đồng nghĩa mất quyền tải lại các sản phẩm đã mua. Chúng tôi vẫn phải giữ chứng từ giao dịch theo quy định kế toán.',
        ],
      },
      {
        h: '9. Bảo mật',
        p: [
          'Website chạy hoàn toàn trên HTTPS. Mật khẩu được băm bằng bcrypt. Token đặt lại mật khẩu chỉ lưu bản băm, không lưu bản gốc. Webhook thanh toán được xác thực bằng chữ ký số trước khi xử lý.',
          'Dù vậy, không hệ thống nào an toàn tuyệt đối. Nếu xảy ra sự cố ảnh hưởng tới dữ liệu của bạn, chúng tôi sẽ thông báo qua email.',
        ],
      },
      {
        h: '10. Trẻ em',
        p: ['Dịch vụ không dành cho người dưới 16 tuổi. Chúng tôi không chủ ý thu thập dữ liệu của trẻ em.'],
      },
      {
        h: '11. Thay đổi chính sách',
        p: [
          'Khi có thay đổi đáng kể, chúng tôi sẽ cập nhật ngày ở đầu trang và thông báo qua email nếu thay đổi ảnh hưởng trực tiếp tới bạn.',
        ],
      },
    ],
  },

  /* ─────────────────────────── HOÀN TIỀN ─────────────────────────── */
  refund: {
    title: 'Chính sách hoàn tiền',
    intro: `Sản phẩm số không thể "trả lại" như hàng vật lý, nên chúng tôi giải quyết bằng chính sách hoàn tiền ${C.refundDays} ngày rõ ràng dưới đây.`,
    sections: [
      {
        h: `1. Hoàn tiền trong ${C.refundDays} ngày`,
        p: [
          `Nếu sản phẩm không dùng được cho dự án của bạn, hãy báo trong vòng <b>${C.refundDays} ngày</b> kể từ ngày thanh toán. Chúng tôi hoàn lại toàn bộ số tiền.`,
          'Bạn không cần giải thích dài dòng, nhưng nếu cho biết lý do thì rất hữu ích để chúng tôi cải thiện sản phẩm.',
        ],
      },
      {
        h: '2. Trường hợp được hoàn tiền',
        p: [
          'Sản phẩm khác đáng kể so với mô tả hoặc bản demo.',
          'File bị lỗi kỹ thuật mà chúng tôi không khắc phục được trong thời gian hợp lý.',
          'Bạn mua nhầm sản phẩm hoặc mua trùng.',
          'Sản phẩm không phù hợp với nhu cầu của bạn.',
        ],
      },
      {
        h: '3. Trường hợp không hoàn tiền',
        p: [
          `Yêu cầu gửi sau ${C.refundDays} ngày kể từ ngày thanh toán.`,
          'Sản phẩm đã được dùng cho một dự án đã lên sóng công khai.',
          'Có dấu hiệu vi phạm giấy phép, ví dụ phân phối lại file.',
        ],
      },
      {
        h: '4. Cách yêu cầu hoàn tiền',
        p: [
          `Gửi email tới ${link(`mailto:${C.email}`, C.email)} với tiêu đề "Yêu cầu hoàn tiền", kèm địa chỉ email đã dùng khi mua và mã đơn hàng.`,
          'Chúng tôi phản hồi trong vòng 2 ngày làm việc.',
        ],
      },
      {
        h: '5. Thời gian nhận lại tiền',
        p: [
          '<b>Khách quốc tế</b> — Paddle xử lý hoàn tiền về đúng phương thức bạn đã thanh toán, thường mất 5–10 ngày làm việc tuỳ ngân hàng phát hành thẻ.',
          '<b>Khách trong nước</b> — chúng tôi chuyển khoản lại tài khoản bạn đã dùng để thanh toán, thường trong 3–5 ngày làm việc.',
          'Sau khi hoàn tiền, quyền tải sản phẩm sẽ bị thu hồi và bạn cần xoá các bản sao đang giữ.',
        ],
      },
    ],
  },

  /* ─────────────────────────── GIẤY PHÉP ─────────────────────────── */
  license: {
    title: 'Giấy phép sử dụng',
    intro:
      'Tóm gọn: bạn được dùng giao diện cho dự án của mình và của khách hàng, không giới hạn số lần. Điều duy nhất không được làm là bán lại chính file đó.',
    sections: [
      {
        h: '1. Bạn nhận được gì',
        p: [
          'Khi mua, bạn nhận một giấy phép <b>vĩnh viễn, không độc quyền, có thể dùng cho mục đích thương mại</b>, trên phạm vi toàn cầu.',
          'Vĩnh viễn nghĩa là không phải gia hạn, không hết hạn. Không độc quyền nghĩa là chúng tôi vẫn bán sản phẩm đó cho người khác.',
        ],
      },
      {
        h: '2. Bạn được làm',
        p: [
          'Dùng cho website của chính bạn hoặc của doanh nghiệp bạn.',
          'Dùng cho dự án của khách hàng, và tính phí dịch vụ với khách hàng đó.',
          'Chỉnh sửa tuỳ ý: đổi bố cục, màu sắc, font, nội dung, viết thêm mã.',
          'Dùng lại cho nhiều dự án khác nhau, không giới hạn số lần.',
          'Dùng cho website có thu tiền: bán hàng, thu phí thành viên, quảng cáo.',
        ],
      },
      {
        h: '3. Bạn không được làm',
        p: [
          '<b>Bán lại, cho tặng hoặc phân phối lại chính file sản phẩm</b>, kể cả khi đã chỉnh sửa nhiều.',
          'Đăng lên chợ template, kho chia sẻ, hoặc bất kỳ nơi nào người khác tải được file gốc.',
          'Đưa sản phẩm vào một bộ template khác rồi bán bộ đó.',
          'Chia sẻ tài khoản hoặc link tải cho người chưa mua.',
          'Nói rằng bạn là tác giả gốc của thiết kế.',
          'Ranh giới đơn giản: bạn được bán <i>kết quả</i> làm ra từ sản phẩm, không được bán <i>chính sản phẩm</i>.',
        ],
      },
      {
        h: '4. Gói một giao diện và gói trọn bộ',
        p: [
          '<b>Một giao diện</b> — giấy phép áp dụng cho đúng mẫu bạn đã mua, dùng cho bao nhiêu dự án cũng được.',
          '<b>Trọn bộ</b> — giấy phép áp dụng cho tất cả các mẫu trong thư viện, kể cả các mẫu ra mắt về sau, với cùng điều kiện.',
        ],
      },
      {
        h: '5. Ảnh, font và thư viện của bên thứ ba',
        p: [
          'Ảnh minh hoạ trong bản demo dùng để trình bày bố cục và <b>có thể không kèm giấy phép cho bạn sử dụng</b>. Hãy thay bằng ảnh của bạn hoặc ảnh bạn có quyền dùng trước khi đưa trang lên.',
          'Font và các thư viện mã nguồn mở đi kèm chịu sự điều chỉnh của giấy phép riêng của chúng, được nêu trong tài liệu kèm theo.',
        ],
      },
      {
        h: '6. Quyền sở hữu',
        p: [
          `Bản quyền thiết kế và mã nguồn thuộc về <b>${C.legalName}</b>. Giấy phép này cho bạn quyền sử dụng, không chuyển giao quyền sở hữu.`,
          'Nếu vi phạm những điều ở mục 3, giấy phép chấm dứt hiệu lực và bạn phải ngừng sử dụng cũng như xoá các bản sao.',
        ],
      },
      {
        h: '7. Không chắc?',
        p: [
          `Nếu trường hợp của bạn không nằm rõ trong các mục trên, cứ hỏi ${link(`mailto:${C.email}`, C.email)}. Chúng tôi trả lời thẳng, và thường là được.`,
        ],
      },
    ],
  },
};
