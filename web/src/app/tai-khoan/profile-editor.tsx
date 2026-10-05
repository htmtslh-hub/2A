'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import AccountAvatar from '@/components/AccountAvatar';
import type { Lang } from '@/lib/catalog';
import styles from './account.module.css';

const copy = {
  vi: { photo: 'Đổi ảnh đại diện', name: 'Tên hiển thị', save: 'Lưu thay đổi', saving: 'Đang lưu…', saved: 'Đã lưu hồ sơ', invalid: 'Chọn ảnh JPG, PNG hoặc WebP dưới 10 MB.', failed: 'Không lưu được hồ sơ. Vui lòng thử lại.' },
  en: { photo: 'Change profile photo', name: 'Display name', save: 'Save changes', saving: 'Saving…', saved: 'Profile saved', invalid: 'Choose a JPG, PNG or WebP image under 10 MB.', failed: 'Could not save your profile. Please try again.' },
  zh: { photo: '更换头像', name: '显示名称', save: '保存更改', saving: '保存中…', saved: '资料已保存', invalid: '请选择小于 10 MB 的 JPG、PNG 或 WebP 图片。', failed: '无法保存资料，请重试。' },
} as const;

async function resizePhoto(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const photo = new Image();
    photo.src = url;
    await photo.decode();
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas unavailable');
    const side = Math.min(photo.naturalWidth, photo.naturalHeight);
    context.drawImage(photo, (photo.naturalWidth - side) / 2, (photo.naturalHeight - side) / 2, side, side, 0, 0, 256, 256);
    return canvas.toDataURL('image/jpeg', 0.78);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function ProfileEditor({ initialName, initialImage, email, lang }: { initialName: string; initialImage: string | null; email: string; lang: Lang }) {
  const t = copy[lang];
  const router = useRouter();
  const picker = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [imageChanged, setImageChanged] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function pickPhoto(file?: File) {
    if (!file) return;
    setMessage('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10_000_000) {
      setMessage(t.invalid);
      return;
    }
    try {
      const resized = await resizePhoto(file);
      if (resized.length > 220_000) throw new Error('Image too large');
      setImage(resized);
      setImageChanged(true);
    } catch {
      setMessage(t.invalid);
    }
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, ...(imageChanged ? { image } : {}) }),
      });
      if (!response.ok) throw new Error('Save failed');
      setImageChanged(false);
      setMessage(t.saved);
      router.refresh();
    } catch {
      setMessage(t.failed);
    } finally {
      setBusy(false);
    }
  }

  return <form className={styles.profileEditor} onSubmit={save}>
    <div className={styles.profileTop}>
      <button type="button" className={styles.photoButton} onClick={() => picker.current?.click()} aria-label={t.photo}>
        <AccountAvatar name={name || email} image={image} className={styles.profileAvatar} />
        <span className={styles.photoBadge} aria-hidden="true">✎</span>
      </button>
      <div className={styles.profileSummary}><strong>{name || email.split('@')[0]}</strong><span>{email}</span><button type="button" onClick={() => picker.current?.click()}>{t.photo}</button></div>
    </div>
    <input ref={picker} className={styles.visuallyHidden} type="file" accept="image/jpeg,image/png,image/webp" tabIndex={-1} aria-hidden="true" onChange={(event) => { void pickPhoto(event.target.files?.[0]); event.target.value = ''; }} />
    <label className={styles.profileLabel} htmlFor="profile-name">{t.name}</label>
    <div className={styles.profileFormRow}><input id="profile-name" type="text" value={name} onChange={(event) => setName(event.target.value)} maxLength={60} required /><button type="submit" disabled={busy}>{busy ? t.saving : t.save}</button></div>
    <span className={styles.profileMessage} role="status">{message}</span>
  </form>;
}
