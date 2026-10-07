'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styles from './admin.module.css';
import { useRouter } from 'next/navigation';

export default function AdminLogin({ google }: { google: boolean }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return <form method="post" className={styles.login} onSubmit={async e => {
    e.preventDefault(); setBusy(true); setError('');
    const data = new FormData(e.currentTarget);
    try {
      const result = await signIn('credentials', { email: data.get('email'), password: data.get('password'), redirect: false });
      if (result?.error) setError('Email hoặc mật khẩu không đúng, hoặc tài khoản đã bị khóa.');
      else { router.push('/admin'); router.refresh(); }
    } catch { setError('Không thể đăng nhập. Vui lòng thử lại.'); }
    finally { setBusy(false); }
  }}>
    <label>Email<input type="email" name="email" autoComplete="username" required maxLength={254} /></label>
    <label>Mật khẩu<input type="password" name="password" autoComplete="current-password" required minLength={8} /></label>
    {error && <p role="alert" className={styles.error}>{error}</p>}
    <button type="submit" className={styles.primary} disabled={busy}>{busy ? 'Đang đăng nhập…' : 'Đăng nhập'}</button>
    {google && <button type="button" onClick={() => void signIn('google', { redirectTo: '/admin' })}>Tiếp tục với Google</button>}
  </form>;
}
