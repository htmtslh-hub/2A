import type { Metadata } from 'next';
import { auth } from '@/auth';
import { adminIdentity } from '@/lib/admin-access';
import Dashboard from './dashboard';
import AdminLogin from './login';
import styles from './admin.module.css';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Quản trị — Forge Zone', robots: { index: false, follow: false } };

export default async function AdminPage() {
  let admin;
  let loggedIn = false;
  let unavailable = false;
  try {
    const session = await auth();
    loggedIn = Boolean((session?.user as { id?: string } | undefined)?.id);
    admin = await adminIdentity();
  } catch { unavailable = true; }
  if (admin) return <Dashboard name={admin.name || admin.email} />;
  return <main className={styles.gate} lang="vi"><Link className={styles.brand} href="/">FORGE<span>ZONE</span></Link>
    <section><p className={styles.eyebrow}>TRUNG TÂM QUẢN TRỊ</p><h1>{unavailable ? 'Chưa kết nối được dữ liệu' : loggedIn ? 'Tài khoản chưa có quyền admin' : 'Đăng nhập quản trị'}</h1>
      <p>{unavailable ? 'Kiểm tra DATABASE_URL và áp dụng migration trước khi mở trang quản trị.' : loggedIn ? 'Chỉ tài khoản được chủ cửa hàng cấp quyền trên máy chủ mới truy cập được khu vực này.' : 'Dùng tài khoản Forge Zone đã được cấp quyền quản trị.'}</p>
      {!unavailable && !loggedIn && <AdminLogin google={Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET)} />}
      <noscript><p className={styles.notice}>Trang quản trị cần JavaScript để đăng nhập và quản lý dữ liệu.</p></noscript>
      <Link href="/">← Về cửa hàng</Link>
    </section></main>;
}
