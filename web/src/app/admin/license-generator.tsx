'use client';

import React, { useState } from 'react';
import styles from './admin.module.css';

export default function AdminLicenseGenerator() {
  const [machineId, setMachineId] = useState('');
  const [plan, setPlan] = useState<'PRO' | 'ULTRA' | 'LIFETIME' | 'TRIAL'>('ULTRA');
  const [days, setDays] = useState(365);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    machineId: string;
    licenseKey: string;
    plan: string;
    expiresAt: number;
  } | null>(null);

  function handlePlanChange(newPlan: 'PRO' | 'ULTRA' | 'LIFETIME' | 'TRIAL') {
    setPlan(newPlan);
    if (newPlan === 'TRIAL') setDays(7);
    else if (newPlan === 'PRO') setDays(30);
    else if (newPlan === 'ULTRA') setDays(365);
    else setDays(36500);
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!machineId.trim()) return;
    setBusy(true);
    try {
      const res = await fetch('/api/license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'admin-generate',
          machineId: machineId.trim(),
          plan,
          days,
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Không thể tạo Mã Kích Hoạt.');
        return;
      }
      setResult({
        machineId: data.machineId,
        licenseKey: data.licenseKey,
        plan: data.plan,
        expiresAt: data.expiresAt,
      });
      setMachineId(data.machineId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi kết nối.');
    } finally {
      setBusy(false);
    }
  }

  function copyKey() {
    if (result?.licenseKey && navigator.clipboard) {
      void navigator.clipboard.writeText(result.licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <section data-reveal className={styles.panel} style={{ marginBottom: 18 }}>
      <div className={styles.panelHeading}>
        <div>
          <h2>🔑 Cấp Mã Kích Hoạt Phần Mềm Theo Mã Máy (Film Studio License)</h2>
          <p>
            Nhập Mã Máy (FS-XXXX-XXXX-XXXX-XXXX) để cấp Mã Kích Hoạt nhanh hoặc để khách tự lấy tại{' '}
            <code>/kich-hoat</code> & <code>/tai-khoan</code>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleGenerate}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          alignItems: 'end',
          marginTop: 14,
        }}
      >
        <label style={{ display: 'grid', gap: 6, fontSize: 12 }}>
          Mã Máy khách hàng (HWID)
          <input
            type="text"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value.toUpperCase())}
            placeholder="FS-XXXX-XXXX-XXXX-XXXX"
            required
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,.2)',
              background: 'rgba(0,0,0,.3)',
              color: '#fde047',
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6, fontSize: 12 }}>
          Gói bản quyền
          <select
            value={plan}
            onChange={(e) => handlePlanChange(e.target.value as 'PRO' | 'ULTRA' | 'LIFETIME' | 'TRIAL')}
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,.2)',
              background: '#1c181d',
              color: '#fff',
            }}
          >
            <option value="PRO">Premium (Gói 1 Tháng - 30 ngày)</option>
            <option value="ULTRA">Ultra (Gói 1 Năm - 365 ngày)</option>
            <option value="LIFETIME">Ultra Lifetime (Vĩnh viễn)</option>
            <option value="TRIAL">Dùng thử (7 ngày)</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6, fontSize: 12 }}>
          Số ngày hiệu lực
          <input
            type="number"
            min={1}
            max={36500}
            value={days}
            disabled={plan === 'LIFETIME'}
            onChange={(e) => setDays(Number(e.target.value) || 30)}
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,.2)',
              background: 'rgba(0,0,0,.3)',
              color: '#fff',
            }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6, fontSize: 12 }}>
          Email khách (tùy chọn)
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="khachhang@gmail.com"
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,.2)',
              background: 'rgba(0,0,0,.3)',
              color: '#fff',
            }}
          />
        </label>

        <button
          type="submit"
          className={styles.primary}
          disabled={busy || !machineId.trim()}
          style={{ height: 40 }}
        >
          {busy ? 'Đang tạo...' : '🔑 Tạo Mã Kích Hoạt'}
        </button>
      </form>

      {error && (
        <p style={{ color: '#fda4af', fontSize: 13, marginTop: 10, marginBottom: 0 }}>{error}</p>
      )}

      {result && (
        <div
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 12,
            background: 'rgba(16,185,129,.12)',
            border: '1px solid rgba(16,185,129,.4)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <strong style={{ color: '#6ee7b7', fontSize: 13 }}>
              ✓ Đã cấp Mã Kích Hoạt cho máy {result.machineId} ({result.plan})
            </strong>
            <button type="button" onClick={copyKey} className={styles.primary} style={{ padding: '6px 14px' }}>
              {copied ? '✓ Đã sao chép!' : '📋 Sao chép Key'}
            </button>
          </div>
          <code
            style={{
              display: 'block',
              padding: 10,
              borderRadius: 8,
              background: 'rgba(0,0,0,.45)',
              color: '#f8fafc',
              fontSize: 12,
              wordBreak: 'break-all',
              userSelect: 'all',
            }}
          >
            {result.licenseKey}
          </code>
        </div>
      )}
    </section>
  );
}
