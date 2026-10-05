/* Các chuỗi bổ sung ngoài bản thiết kế gốc: chế độ đăng ký trong modal và
   trang "đơn hàng của tôi". Để riêng file này vì src/generated/data.ts bị
   `npm run convert` ghi đè. */
import type { LangCode } from '@/generated/data';

export interface AuthStrings {
  title: string;
  sub: string;
  submit: string;
  noAcc: string;
  signup: string;
}

/** Chữ hiển thị khi modal ở chế độ tạo tài khoản. */
export const REGISTER_STRINGS: Record<LangCode, AuthStrings> = {
  vi: {
    title: 'Tạo tài khoản',
    sub: 'Đăng ký để mua giao diện và tải lại bất cứ lúc nào.',
    submit: 'Tạo tài khoản',
    noAcc: 'Đã có tài khoản?',
    signup: 'Đăng nhập',
  },
  en: {
    title: 'Create account',
    sub: 'Sign up to buy templates and re-download them any time.',
    submit: 'Create account',
    noAcc: 'Already have an account?',
    signup: 'Sign in',
  },
  zh: {
    title: '创建账号',
    sub: '注册后即可购买模板，并随时重新下载。',
    submit: '创建账号',
    noAcc: '已有账号？',
    signup: '登录',
  },
};

/** Chữ hiển thị khi modal ở chế độ quên mật khẩu. */
export const FORGOT_STRINGS: Record<LangCode, AuthStrings & { sent: string }> = {
  vi: {
    title: 'Quên mật khẩu',
    sub: 'Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu.',
    submit: 'Gửi link đặt lại',
    noAcc: 'Nhớ ra rồi?',
    signup: 'Quay lại đăng nhập',
    sent: 'Nếu email này có tài khoản, link đặt lại đã được gửi. Kiểm tra hộp thư nhé.',
  },
  en: {
    title: 'Forgot password',
    sub: 'Enter your email and we will send you a reset link.',
    submit: 'Send reset link',
    noAcc: 'Remembered it?',
    signup: 'Back to sign in',
    sent: 'If that email has an account, a reset link is on its way. Check your inbox.',
  },
  zh: {
    title: '忘记密码',
    sub: '输入你的邮箱，我们会发送重置密码的链接。',
    submit: '发送重置链接',
    noAcc: '想起来了？',
    signup: '返回登录',
    sent: '如果该邮箱已注册，重置链接已发送，请查收邮件。',
  },
};

/** Trang đặt lại mật khẩu. */
export const RESET_STRINGS: Record<LangCode, Record<string, string>> = {
  vi: {
    title: 'Đặt lại mật khẩu',
    sub: 'Nhập mật khẩu mới cho tài khoản của bạn.',
    password: 'Mật khẩu mới',
    submit: 'Đổi mật khẩu',
    done: 'Đã đổi mật khẩu. Bạn có thể đăng nhập ngay.',
    goHome: 'Về trang chủ',
    invalid: 'Link không hợp lệ hoặc đã hết hạn. Hãy yêu cầu link mới.',
    tooShort: 'Mật khẩu cần tối thiểu 8 ký tự.',
  },
  en: {
    title: 'Reset password',
    sub: 'Choose a new password for your account.',
    password: 'New password',
    submit: 'Change password',
    done: 'Password changed. You can sign in now.',
    goHome: 'Back to home',
    invalid: 'This link is invalid or has expired. Please request a new one.',
    tooShort: 'Password must be at least 8 characters.',
  },
  zh: {
    title: '重置密码',
    sub: '为你的账号设置新密码。',
    password: '新密码',
    submit: '修改密码',
    done: '密码已修改，现在可以登录了。',
    goHome: '返回首页',
    invalid: '链接无效或已过期，请重新申请。',
    tooShort: '密码至少需要 8 个字符。',
  },
};

/** Thông báo lỗi ở modal đăng nhập / đăng ký. */
export const AUTH_ERRORS: Record<LangCode, Record<string, string>> = {
  vi: {
    badCredentials: 'Email hoặc mật khẩu không đúng.',
    shortPassword: 'Mật khẩu cần tối thiểu 8 ký tự.',
    emailTaken: 'Email này đã có tài khoản. Hãy đăng nhập.',
    network: 'Không kết nối được máy chủ. Thử lại giúp mình.',
    generic: 'Có lỗi xảy ra. Thử lại giúp mình.',
  },
  en: {
    badCredentials: 'Wrong email or password.',
    shortPassword: 'Password must be at least 8 characters.',
    emailTaken: 'That email already has an account. Please sign in.',
    network: 'Could not reach the server. Please try again.',
    generic: 'Something went wrong. Please try again.',
  },
  zh: {
    badCredentials: '邮箱或密码不正确。',
    shortPassword: '密码至少需要 8 个字符。',
    emailTaken: '该邮箱已注册，请直接登录。',
    network: '无法连接服务器，请重试。',
    generic: '出错了，请重试。',
  },
};

/** Dòng sản phẩm sắp ra mắt mà khách để lại email chờ (thẻ 2 và 3 ở hero). */
export type NotifyProduct = 'agent' | 'masterprompt';

/** Nút ở hero và hộp để lại email cho sản phẩm sắp ra mắt. */
export const NOTIFY: Record<
  LangCode,
  {
    cta: string;
    title: Record<NotifyProduct, string>;
    sub: string;
    placeholder: string;
    submit: string;
    sending: string;
    done: string;
    invalid: string;
    network: string;
    close: string;
  }
> = {
  vi: {
    cta: 'Nhận thông báo khi ra mắt →',
    title: { agent: 'Agent sắp ra mắt', masterprompt: 'Masterprompt sắp ra mắt' },
    sub: 'Để lại email, chúng tôi báo bạn ngay khi mở bán. Không gửi gì khác.',
    placeholder: 'ban@email.com',
    submit: 'Báo tôi khi ra mắt',
    sending: 'Đang gửi…',
    done: 'Đã ghi nhận. Chúng tôi sẽ báo bạn khi mở bán.',
    invalid: 'Email chưa đúng định dạng.',
    network: 'Không gửi được, vui lòng thử lại.',
    close: 'Đóng',
  },
  en: {
    cta: 'Notify me at launch →',
    title: { agent: 'Agents are coming soon', masterprompt: 'Master Prompts are coming soon' },
    sub: 'Leave your email and we will let you know as soon as they go on sale. Nothing else.',
    placeholder: 'you@email.com',
    submit: 'Notify me',
    sending: 'Sending…',
    done: 'Thanks — we will let you know when it launches.',
    invalid: 'Please enter a valid email.',
    network: 'Could not send. Please try again.',
    close: 'Close',
  },
  zh: {
    cta: '上线时通知我 →',
    title: { agent: '智能体即将上线', masterprompt: '大师提示词即将上线' },
    sub: '留下邮箱，开售时我们第一时间通知你，不发送其他内容。',
    placeholder: 'you@email.com',
    submit: '上线时通知我',
    sending: '提交中…',
    done: '已记录，开售时会通知你。',
    invalid: '邮箱格式不正确。',
    network: '提交失败，请重试。',
    close: '关闭',
  },
};

/** Ô mẫu chưa có sản phẩm thật: thay giá và nút mua, báo khi khách bấm mua. */
export const COMING_SOON: Record<LangCode, { label: string; toast: string }> = {
  vi: { label: 'Sắp ra mắt', toast: 'Mẫu này sắp ra mắt, hiện chưa mở bán.' },
  en: { label: 'Coming soon', toast: 'This template is coming soon and is not on sale yet.' },
  zh: { label: '即将上线', toast: '该模板即将上线，暂未开售。' },
};

/** Tiêu đề dải trưng bày mẫu ở trang chủ, ngay dưới hero. */
export const HOME_SHOWCASE: Record<LangCode, { kicker: string; title: string }> = {
  vi: { kicker: 'Giao diện đang bán', title: 'Xem demo thật, mua là dùng được ngay' },
  en: { kicker: 'Available now', title: 'Real templates with live demos, ready to use' },
  zh: { kicker: '现已上架', title: '真实模板，在线演示，买了就能用' },
};

/** Nhãn nút ở thanh điều hướng khi đã đăng nhập. */
export const NAV_ACCOUNT: Record<LangCode, string> = {
  vi: 'Tài khoản',
  en: 'Account',
  zh: '账户',
};

export interface InstallGuideStrings {
  title: string;
  intro: string;
  includedTitle: string;
  included: string[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  help: string;
}

export interface OrdersStrings {
  title: string;
  intro: string;
  empty: string;
  emptyCta: string;
  download: string;
  bundle: string;
  bundleNote: string;
  boughtOn: string;
  back: string;
  signOut: string;
  needLogin: string;
  goHome: string;
  install: InstallGuideStrings;
}

/** Trang đơn hàng. */
export const ORDERS_STRINGS = {
  vi: {
    title: 'Đơn hàng của tôi',
    intro: 'Toàn bộ giao diện bạn đã mua. Tải lại bất cứ lúc nào, không giới hạn số lần.',
    empty: 'Bạn chưa mua giao diện nào.',
    emptyCta: 'Xem thư viện',
    download: 'Tải về',
    bundle: 'Trọn bộ thư viện',
    bundleNote: 'Mở khoá toàn bộ giao diện trong thư viện.',
    boughtOn: 'Mua ngày',
    back: 'Về trang chủ',
    signOut: 'Đăng xuất',
    needLogin: 'Bạn cần đăng nhập để xem đơn hàng.',
    goHome: 'Về trang chủ để đăng nhập',
    install: {
      title: 'Hướng dẫn cài đặt giao diện',
      intro:
        'Mỗi giao diện là một website tĩnh hoàn chỉnh. Sau khi tải về, bạn chỉ cần giải nén, mở thử, thay nội dung và đưa thư mục đã chỉnh lên hosting.',
      includedTitle: 'Trong file tải về có',
      included: [
        'index.html — trang web chính',
        'assets/css/style.css — màu sắc, font chữ, bố cục',
        'assets/js/main.js — menu mobile và hiệu ứng cuộn',
        'CUSTOMISE.md — danh sách vị trí cần sửa chữ, ảnh và màu',
        'LICENCE.txt — giấy phép sử dụng thương mại',
      ],
      stepsTitle: 'Các bước thực hiện',
      steps: [
        {
          title: 'Tải file .zip',
          body:
            'Bấm nút tải bên trên. Nếu bạn mua trọn bộ, tải từng mẫu bạn muốn dùng rồi chọn một mẫu để chỉnh trước.',
        },
        {
          title: 'Giải nén file',
          body:
            'Chuột phải vào file .zip và chọn giải nén. Giữ nguyên cấu trúc thư mục, đặc biệt là thư mục assets.',
        },
        {
          title: 'Mở thử giao diện',
          body:
            'Mở file index.html bằng trình duyệt. Nếu muốn có địa chỉ xem thử nội bộ, mở terminal trong thư mục mẫu và chạy npx serve .',
        },
        {
          title: 'Thay nội dung thương hiệu',
          body:
            'Mở CUSTOMISE.md trước. File này chỉ rõ cần tìm chữ nào, đổi ảnh ở đâu, và màu thương hiệu nằm trong biến CSS nào.',
        },
        {
          title: 'Đưa website lên mạng',
          body:
            'Upload toàn bộ thư mục đã giải nén lên hosting tĩnh như Vercel, Netlify, Cloudflare Pages hoặc hosting cPanel. File index.html phải nằm ở thư mục gốc được public.',
        },
      ],
      help:
        'Nếu mở trang bị thiếu ảnh hoặc mất style, thường là do upload thiếu thư mục assets hoặc đổi sai đường dẫn file.',
    },
  },
  en: {
    title: 'My orders',
    intro: 'Every template you have bought. Re-download any time, as often as you like.',
    empty: 'You have not bought any templates yet.',
    emptyCta: 'Browse the library',
    download: 'Download',
    bundle: 'Full library',
    bundleNote: 'Unlocks every template in the library.',
    boughtOn: 'Purchased',
    back: 'Back to home',
    signOut: 'Sign out',
    needLogin: 'Please sign in to see your orders.',
    goHome: 'Go home to sign in',
    install: {
      title: 'Template setup guide',
      intro:
        'Each template is a complete static website. After downloading it, unzip the package, open it locally, customise the content, then upload the edited folder to your hosting.',
      includedTitle: 'What is included',
      included: [
        'index.html — the main page',
        'assets/css/style.css — colours, fonts and layout',
        'assets/js/main.js — mobile menu and scroll effects',
        'CUSTOMISE.md — the checklist for text, images and colours',
        'LICENCE.txt — the commercial licence',
      ],
      stepsTitle: 'Setup steps',
      steps: [
        {
          title: 'Download the .zip file',
          body:
            'Use the download button above. If you bought the full library, download the templates you want and start customising one at a time.',
        },
        {
          title: 'Unzip the package',
          body:
            'Extract the .zip file and keep the folder structure intact, especially the assets folder.',
        },
        {
          title: 'Preview the template',
          body:
            'Open index.html in your browser. For a local preview URL, open a terminal in the template folder and run npx serve .',
        },
        {
          title: 'Customise your brand content',
          body:
            'Read CUSTOMISE.md first. It shows what to search for, where to replace images, and which CSS variables control the brand colours.',
        },
        {
          title: 'Publish the website',
          body:
            'Upload the extracted folder to static hosting such as Vercel, Netlify, Cloudflare Pages or cPanel hosting. index.html must be in the public root folder.',
        },
      ],
      help:
        'If the page opens without images or styling, the assets folder was usually not uploaded or a file path was changed incorrectly.',
    },
  },
  zh: {
    title: '我的订单',
    intro: '你购买的全部模板，可随时重新下载，次数不限。',
    empty: '你还没有购买任何模板。',
    emptyCta: '浏览模板库',
    download: '下载',
    bundle: '全部模板库',
    bundleNote: '解锁模板库中的所有模板。',
    boughtOn: '购买于',
    back: '返回首页',
    signOut: '退出登录',
    needLogin: '请先登录后查看订单。',
    goHome: '返回首页登录',
    install: {
      title: '模板安装指南',
      intro:
        '每套模板都是完整的静态网站。下载后解压、在本地打开预览、替换品牌内容，再把修改后的文件夹上传到主机即可。',
      includedTitle: '下载文件包含',
      included: [
        'index.html — 主页面',
        'assets/css/style.css — 颜色、字体与布局',
        'assets/js/main.js — 移动菜单与滚动效果',
        'CUSTOMISE.md — 文案、图片与颜色修改清单',
        'LICENCE.txt — 商用授权',
      ],
      stepsTitle: '安装步骤',
      steps: [
        {
          title: '下载 .zip 文件',
          body:
            '点击上方下载按钮。如果购买的是整套模板库，可先下载需要使用的模板，逐个修改。',
        },
        {
          title: '解压文件',
          body:
            '解压 .zip 文件，并保持原有目录结构，尤其不要移动 assets 文件夹。',
        },
        {
          title: '本地预览模板',
          body:
            '用浏览器打开 index.html。若需要本地预览地址，可在模板文件夹中打开终端并运行 npx serve .',
        },
        {
          title: '替换品牌内容',
          body:
            '先阅读 CUSTOMISE.md。它会说明搜索哪些文字、在哪里替换图片，以及哪些 CSS 变量控制品牌颜色。',
        },
        {
          title: '发布网站',
          body:
            '将解压后的整个文件夹上传到 Vercel、Netlify、Cloudflare Pages 或 cPanel 等静态主机。index.html 需要位于公开根目录。',
        },
      ],
      help:
        '如果页面打开后缺少图片或样式，通常是 assets 文件夹没有上传完整，或文件路径被改错。',
    },
  },
} satisfies Record<LangCode, OrdersStrings>;

/** Câu trả lời cho FAQ "có cần biết code không".
 *
 *  Bản thiết kế viết "thay chữ và ảnh trực tiếp trong file mà không cần biết
 *  lập trình". Đúng về kỹ thuật nhưng hứa hơi quá: một trang mẫu có khoảng
 *  335 dòng, chữ cần sửa nằm rải ở hơn 20 chỗ, xen giữa gần 60 dòng SVG mà
 *  khách không nên đụng. Người làm thiết kế thì bình thường, người không
 *  rành kỹ thuật thì mở ra là nản.
 *
 *  Câu dưới đây nói đúng thứ mình thật sự giao: nội dung là văn bản thường,
 *  và có sẵn danh sách chỉ rõ sửa chỗ nào. */
export const FAQ_NO_CODE: Record<LangCode, { q: string; a: string }> = {
  vi: {
    q: 'Tôi có cần biết code để dùng không?',
    a: 'Không cần, nếu chỉ đổi chữ, ảnh và màu. Mọi nội dung đều là văn bản thường trong file, và mỗi mẫu kèm một danh sách chỉ rõ chỗ nào sửa gì — tìm chữ nào, nằm ở đâu, có bao nhiêu chỗ. Muốn đổi bố cục hoặc thêm bớt phần thì cần biết HTML và CSS cơ bản.',
  },
  en: {
    q: 'Do I need to know how to code?',
    a: 'Not to change text, images and colours. Everything is plain text in the file, and every template ships with a checklist naming each thing you might want to change, what to search for and how many places it appears. Changing the layout, or adding and removing sections, does need basic HTML and CSS.',
  },
  zh: {
    q: '需要会写代码吗？',
    a: '若只是替换文案、图片和配色，则不需要。所有内容都是文件中的纯文本，每套模板都附一份清单，逐项说明改什么、搜索哪个词、共出现几处。若要调整版式或增删板块，则需要基础的 HTML 与 CSS。',
  },
};
