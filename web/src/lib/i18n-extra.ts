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

/** Nhãn nút ở thanh điều hướng khi đã đăng nhập. */
export const NAV_ACCOUNT: Record<LangCode, string> = {
  vi: 'Đơn hàng',
  en: 'My orders',
  zh: '我的订单',
};

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
  },
} satisfies Record<LangCode, Record<string, string>>;
