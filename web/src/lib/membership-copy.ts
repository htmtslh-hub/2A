import type { Lang } from './catalog';

export const MEMBERSHIP_COPY = {
  vi: {
    lead: 'Để lại email để nhận link tải mẫu miễn phí. Nâng cấp Premium $20/tháng hoặc Ultra $200/năm.',
    pricingTitle: 'Nâng cấp tài khoản Premium hoặc Ultra',
    pricingIntro: 'Mở toàn bộ thư viện trong thời hạn gói. Thanh toán một lần, không tự gia hạn.',
    pricingNote: 'Hết hạn sẽ dừng tải mới; file đã tải vẫn dùng theo giấy phép. Giao diện web, Skill và Prompt thuộc Premium; cần gói Premium hoặc Ultra còn hiệu lực để tải. Không gồm dịch vụ thiết kế hoặc cài đặt.',
    plans: [
      { name: 'Premium', note: 'Tải thoải mái trong 1 tháng.', unit: '/ 1 tháng', cta: 'Nâng cấp Premium', features: ['Toàn bộ sản phẩm có sẵn', 'Tải không giới hạn trong 1 tháng', 'Sản phẩm mới trong thời hạn gói', 'File nguồn và hướng dẫn đầy đủ', 'Không tự động gia hạn'] },
      { name: 'Ultra', note: 'Toàn bộ sản phẩm trong 1 năm.', unit: '/ 1 năm', cta: 'Nâng cấp Ultra', features: ['Toàn bộ sản phẩm có sẵn', 'Tải không giới hạn trong 1 năm', 'Sản phẩm mới trong thời hạn gói', 'File nguồn và hướng dẫn đầy đủ', 'Không tự động gia hạn'] },
    ],
    title: 'Gói tài khoản', free: 'Tài khoản thường', active: 'Đang hoạt động', expired: 'Đã hết hạn', scheduled: 'Đã gia hạn',
    until: 'Quyền tải đến', starts: 'Bắt đầu', upgrade: 'Nâng cấp / gia hạn', download: 'Tải sản phẩm',
    policy: 'Thanh toán một lần; không tự gia hạn. File đã tải vẫn dùng theo giấy phép sau khi gói hết hạn.',
    empty: 'Nâng cấp Premium hoặc Ultra để tải toàn bộ thư viện trong thời hạn gói.',
    renewal: 'Gia hạn cùng gói cộng tiếp sau thời hạn đã mua. Chuyển sang gói khác bắt đầu khi thanh toán, không khấu trừ hay chuyển thời gian còn lại.',
  },
  en: {
    lead: 'Get a free template by email. Upgrade to Premium for $20/month or Ultra for $200/year.',
    pricingTitle: 'Upgrade your account to Premium or Ultra',
    pricingIntro: 'Access the full library for your plan’s term. One payment, no automatic renewal.',
    pricingNote: 'Downloads stop at expiry; downloaded files remain usable under their licence. Web interfaces, Skills and Prompts are Premium products; an active Premium or Ultra plan is required to download. Custom design and setup are not included.',
    plans: [
      { name: 'Premium', note: 'Unlimited downloads for one month.', unit: '/ 1 month', cta: 'Upgrade to Premium', features: ['Every available product', 'Unlimited downloads for 1 month', 'New products during your term', 'Full source and documentation', 'No automatic renewal'] },
      { name: 'Ultra', note: 'Every product for one year.', unit: '/ 1 year', cta: 'Upgrade to Ultra', features: ['Every available product', 'Unlimited downloads for 1 year', 'New products during your term', 'Full source and documentation', 'No automatic renewal'] },
    ],
    title: 'Account plan', free: 'Standard account', active: 'Active', expired: 'Expired', scheduled: 'Renewed',
    until: 'Download access until', starts: 'Starts', upgrade: 'Upgrade / renew', download: 'Download products',
    policy: 'One payment, no automatic renewal. Downloaded files remain usable under their licence after expiry.',
    empty: 'Upgrade to Premium or Ultra to access the full library during your plan’s term.',
    renewal: 'Renewing the same plan extends your purchased term. A different plan starts on payment, with no credit or transfer of remaining time.',
  },
  zh: {
    lead: '留下邮箱获取免费模板。Premium 一个月 $20，Ultra 一年 $200。',
    pricingTitle: '将账号升级为 Premium 或 Ultra',
    pricingIntro: '有效期内访问整个产品库。一次付款，不自动续费。',
    pricingNote: '到期后停止下载；已下载文件仍可按许可使用。网页界面、技能和提示词属于 Premium 产品，下载需要有效的 Premium 或 Ultra 套餐。不含定制设计或安装服务。',
    plans: [
      { name: 'Premium', note: '一个月内不限次数下载。', unit: '/ 1个月', cta: '升级 Premium', features: ['所有已上线产品', '一个月内不限次数下载', '有效期内的新产品', '完整源码与使用指南', '不自动续费'] },
      { name: 'Ultra', note: '一年内访问所有产品。', unit: '/ 1年', cta: '升级 Ultra', features: ['所有已上线产品', '一年内不限次数下载', '有效期内的新产品', '完整源码与使用指南', '不自动续费'] },
    ],
    title: '账号套餐', free: '普通账号', active: '有效', expired: '已到期', scheduled: '已续费',
    until: '下载权限截止', starts: '开始', upgrade: '升级 / 续费', download: '下载产品',
    policy: '一次付款，不自动续费。到期后已下载文件仍可按许可使用。',
    empty: '升级 Premium 或 Ultra，即可在有效期内访问整个产品库。',
    renewal: '同套餐续费从已购买的期限之后继续。更换套餐从付款时开始，不抵扣或转移剩余时间。',
  },
} satisfies Record<Lang, unknown>;
