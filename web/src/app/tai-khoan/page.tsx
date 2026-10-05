import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { readLang } from '@/lib/server-lang';
import { REAL_TEMPLATES } from '@/lib/real-templates';
import { templateName, type Lang } from '@/lib/catalog';
import { SignOutButton } from '@/app/don-hang/actions';
import { RemoveSavedButton } from './remove-saved-button';
import ProfileEditor from './profile-editor';
import styles from './account.module.css';

export const dynamic = 'force-dynamic';

const copy = {
  vi: {
    title: 'Tài khoản của tôi', intro: 'Sản phẩm, đơn hàng và những giao diện bạn đã lưu.',
    since: 'Ngày đăng ký', purchased: 'Đã mua', saved: 'Đã lưu', activity: 'Hoạt động gần đây',
    purchasedTitle: 'Sản phẩm đã mua', savedTitle: 'Giao diện đã lưu',
    emptyPurchase: 'Bạn chưa mua giao diện nào.', emptySaved: 'Bạn chưa lưu giao diện nào.',
    emptyActivity: 'Chưa có hoạt động nào.', browse: 'Khám phá giao diện', orders: 'Xem đơn hàng & tải file',
    download: 'Tải file', view: 'Xem giao diện', bundle: 'Trọn bộ thư viện',
    bought: 'Đã mua', savedAction: 'Đã lưu', back: 'Về trang chủ', signOut: 'Đăng xuất',
    loginTitle: 'Đăng nhập để xem tài khoản', loginText: 'Lịch sử mua hàng và các giao diện đã lưu sẽ xuất hiện tại đây.', login: 'Đăng nhập',
  },
  en: {
    title: 'My account', intro: 'Your products, orders and saved templates.',
    since: 'Member since', purchased: 'Purchased', saved: 'Saved', activity: 'Recent activity',
    purchasedTitle: 'Purchased products', savedTitle: 'Saved templates',
    emptyPurchase: 'You have not purchased a template yet.', emptySaved: 'You have not saved a template yet.',
    emptyActivity: 'No activity yet.', browse: 'Explore templates', orders: 'Orders & downloads',
    download: 'Download', view: 'View template', bundle: 'Complete template bundle',
    bought: 'Purchased', savedAction: 'Saved', back: 'Back to home', signOut: 'Sign out',
    loginTitle: 'Sign in to view your account', loginText: 'Your purchases and saved templates will appear here.', login: 'Sign in',
  },
  zh: {
    title: '我的账户', intro: '查看已购产品、订单和收藏的模板。',
    since: '注册日期', purchased: '已购买', saved: '已收藏', activity: '最近活动',
    purchasedTitle: '已购产品', savedTitle: '已收藏模板',
    emptyPurchase: '尚未购买模板。', emptySaved: '尚未收藏模板。',
    emptyActivity: '暂无活动。', browse: '浏览模板', orders: '订单与下载',
    download: '下载文件', view: '查看模板', bundle: '完整模板合集',
    bought: '已购买', savedAction: '已收藏', back: '返回首页', signOut: '退出登录',
    loginTitle: '登录以查看账户', loginText: '购买记录和收藏的模板将在这里显示。', login: '登录',
  },
} as const;

const dateLocale: Record<Lang, string> = { vi: 'vi-VN', en: 'en-US', zh: 'zh-CN' };

export async function generateMetadata(): Promise<Metadata> {
  const t = copy[await readLang()];
  return { title: `${t.title} — Forge Zone`, robots: { index: false, follow: false } };
}

export default async function AccountPage() {
  const lang = await readLang();
  const t = copy[lang];
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return <main className={styles.shell}><div className={styles.loginPrompt}>
      <span className={styles.eyebrow}>FORGE ZONE / ACCOUNT</span>
      <h1>{t.loginTitle}</h1><p>{t.loginText}</p>
      <Link className={styles.primary} href="/?login=1&next=account">{t.login} ↗</Link>
    </div></main>;
  }

  const [user, purchases, savedItems] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { name: true, email: true, image: true, createdAt: true } }),
    prisma.purchase.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, select: { id: true, templateId: true, createdAt: true } }),
    prisma.savedTemplate.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, select: { id: true, templateId: true, createdAt: true } }),
  ]);
  if (!user) return <main className={styles.shell}><div className={styles.loginPrompt}><h1>{t.loginTitle}</h1><Link className={styles.primary} href="/?login=1&next=account">{t.login}</Link></div></main>;

  const formatDate = (date: Date) => new Intl.DateTimeFormat(dateLocale[lang], { dateStyle: 'medium' }).format(date);
  const activity = [
    ...purchases.map((p) => ({ id: `purchase-${p.id}`, type: t.bought, name: p.templateId ? templateName(p.templateId, lang) : t.bundle, date: p.createdAt })),
    ...savedItems.filter((item) => REAL_TEMPLATES[item.templateId]).map((item) => ({ id: `saved-${item.id}`, type: t.savedAction, name: REAL_TEMPLATES[item.templateId].copy[lang].name, date: item.createdAt })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 6);

  return <main className={styles.shell}>
    <div className={styles.container}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}><span className={styles.dot} />FORGE ZONE</Link>
        <div className={styles.topActions}><Link href="/" className={styles.quietLink}>← {t.back}</Link><SignOutButton label={t.signOut} /></div>
      </header>

      <section className={styles.hero}>
        <div><span className={styles.eyebrow}>ACCOUNT / 01</span><h1>{t.title}</h1><p>{t.intro}</p></div>
        <ProfileEditor initialName={user.name || user.email.split('@')[0]} initialImage={user.image} email={user.email} lang={lang} />
      </section>

      <div className={styles.stats}>
        <div className={styles.stat}><span>{t.since}</span><strong>{formatDate(user.createdAt)}</strong></div>
        <div className={styles.stat}><span>{t.purchased}</span><strong>{String(purchases.length).padStart(2, '0')}</strong></div>
        <div className={styles.stat}><span>{t.saved}</span><strong>{String(savedItems.length).padStart(2, '0')}</strong></div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div><span className={styles.eyebrow}>01 / PURCHASES</span><h2>{t.purchasedTitle}</h2></div><Link className={styles.textLink} href="/don-hang">{t.orders} ↗</Link></div>
        {purchases.length ? <div className={styles.purchaseList}>{purchases.map((item) => {
          const template = item.templateId ? REAL_TEMPLATES[item.templateId] : null;
          const name = item.templateId ? templateName(item.templateId, lang) : t.bundle;
          return <article className={styles.purchase} key={item.id}>
            <div className={styles.purchaseInfo}>
              {template ? <Image className={styles.purchaseImage} src={`/previews/${template.slug}.webp`} alt={name} width={108} height={76} /> : <span className={styles.bundleArt}>✦</span>}
              <div><strong>{name}</strong><span>{t.bought} · {formatDate(item.createdAt)}</span></div>
            </div>
            <div className={styles.purchaseActions}>
              {template ? <Link href={`/?mau=${item.templateId}`} className={styles.quietLink}>{t.view}</Link> : null}
              <a className={styles.smallButton} href={template ? `/api/download?id=${item.templateId}` : '/don-hang'}>{template ? t.download : t.orders} ↗</a>
            </div>
          </article>;
        })}</div> : <div className={styles.empty}><p>{t.emptyPurchase}</p><Link href="/?tab=library">{t.browse} ↗</Link></div>}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div><span className={styles.eyebrow}>02 / SAVED</span><h2>{t.savedTitle}</h2></div><Link className={styles.textLink} href="/?tab=library">{t.browse} ↗</Link></div>
        {savedItems.length ? <div className={styles.savedGrid}>{savedItems.filter((item) => REAL_TEMPLATES[item.templateId]).map((item) => {
          const template = REAL_TEMPLATES[item.templateId];
          return <article className={styles.savedCard} key={item.id}>
            <Link href={`/?mau=${item.templateId}`} className={styles.savedLink}>
              <div className={styles.savedVisual}><Image src={`/previews/${template.slug}.webp`} alt={template.copy[lang].name} width={520} height={340} /></div>
              <div className={styles.savedMeta}><strong>{template.copy[lang].name}</strong><span>{formatDate(item.createdAt)}</span></div>
            </Link>
            <RemoveSavedButton templateId={item.templateId} lang={lang} />
          </article>;
        })}</div> : <div className={styles.empty}><p>{t.emptySaved}</p><Link href="/?tab=library">{t.browse} ↗</Link></div>}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div><span className={styles.eyebrow}>03 / HISTORY</span><h2>{t.activity}</h2></div></div>
        {activity.length ? <ol className={styles.timeline}>{activity.map((item) => <li key={item.id}><span className={styles.timelineDot} /><div><strong>{item.type}: {item.name}</strong><time dateTime={item.date.toISOString()}>{formatDate(item.date)}</time></div></li>)}</ol> : <div className={styles.empty}><p>{t.emptyActivity}</p></div>}
      </section>
    </div>
  </main>;
}
