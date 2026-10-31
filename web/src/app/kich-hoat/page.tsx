import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import { readLang } from '@/lib/server-lang';
import { getUserLicenseEntitlement, listUserActivatedMachines } from '@/lib/license-key';
import LicenseKeyPortal from '@/components/LicenseKeyPortal';
import { SignOutButton } from '@/app/don-hang/actions';
import styles from '@/app/tai-khoan/account.module.css';

export const dynamic = 'force-dynamic';

const COPY = {
  vi: {
    title: 'Kích hoạt phần mềm theo Mã Máy',
    intro: 'Cấp Mã Kích Hoạt (License Key) theo đúng thời hạn gói mua trên Web cho ứng dụng Film Studio.',
    accountLink: 'Tài khoản của tôi',
    ordersLink: 'Đơn hàng',
    backHome: 'Về trang chủ',
    signOut: 'Đăng xuất',
    loginTitle: 'Đăng nhập để lấy Mã Kích Hoạt',
    loginText: 'Vui lòng đăng nhập tài khoản đã mua gói Premium, Ultra hoặc Ultra Lifetime để nhận Mã Kích Hoạt theo Mã Máy.',
    loginBtn: 'Đăng nhập ngay ↗',
  },
  en: {
    title: 'Hardware Machine License Activation',
    intro: 'Generate a License Key bound to your Machine ID and matching your active Web subscription plan.',
    accountLink: 'My Account',
    ordersLink: 'Orders',
    backHome: 'Back to Home',
    signOut: 'Sign out',
    loginTitle: 'Sign in to get your License Key',
    loginText: 'Sign in with the account that holds your active Premium, Ultra, or Ultra Lifetime plan to activate your Machine ID.',
    loginBtn: 'Sign in ↗',
  },
  zh: {
    title: '按机器码激活软件许可证',
    intro: '根据您购买的网页套餐有效期，为您的机器码 (Machine ID) 生成专属激活码。',
    accountLink: '我的账户',
    ordersLink: '订单',
    backHome: '返回首页',
    signOut: '退出登录',
    loginTitle: '登录以获取激活码',
    loginText: '请使用已购买 Premium、Ultra 或 Ultra Lifetime 套餐的账号登录，并输入机器码获取激活码。',
    loginBtn: '立即登录 ↗',
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await readLang();
  const t = COPY[lang];
  return {
    title: `${t.title} — Forge Zone`,
    robots: { index: false, follow: false },
  };
}

export default async function ActivationPage({
  searchParams,
}: {
  searchParams?: Promise<{ hwid?: string; machineId?: string }>;
}) {
  const lang = await readLang();
  const t = COPY[lang];
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const resolvedParams = searchParams ? await searchParams : {};
  const initialHwid = (resolvedParams.hwid || resolvedParams.machineId || '').trim().toUpperCase();

  if (!userId) {
    return (
      <main className={styles.shell}>
        <div className={styles.loginPrompt}>
          <span className={styles.eyebrow}>FORGE ZONE / HARDWARE LICENSE</span>
          <h1>{t.loginTitle}</h1>
          <p>{t.loginText}</p>
          {initialHwid && (
            <p style={{ color: '#fde047', fontFamily: 'monospace', fontSize: 15, fontWeight: 700 }}>
              HWID: {initialHwid}
            </p>
          )}
          <Link className={styles.primary} href="/?login=1&next=account">
            {t.loginBtn}
          </Link>
        </div>
      </main>
    );
  }

  const [entitlement, machines] = await Promise.all([
    getUserLicenseEntitlement(userId),
    listUserActivatedMachines(userId),
  ]);

  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <header className={styles.topbar}>
          <Link href="/" className={styles.brand}>
            <span className={styles.dot} />
            FORGE ZONE
          </Link>
          <div className={styles.topActions}>
            <Link href="/tai-khoan" className={styles.quietLink}>
              {t.accountLink}
            </Link>
            <Link href="/don-hang" className={styles.quietLink}>
              {t.ordersLink}
            </Link>
            <Link href="/" className={styles.quietLink}>
              ← {t.backHome}
            </Link>
            <SignOutButton label={t.signOut} />
          </div>
        </header>

        <section style={{ padding: '48px 0 24px' }}>
          <LicenseKeyPortal
            lang={lang}
            initialEntitlement={{
              eligible: entitlement.eligible,
              plan: entitlement.plan,
              expiresAtTs: entitlement.expiresAtTs,
              maxMachines: entitlement.maxMachines,
              email: entitlement.email,
              reason: entitlement.reason,
            }}
            initialMachines={machines}
            initialHwid={initialHwid}
          />
        </section>
      </div>
    </main>
  );
}
