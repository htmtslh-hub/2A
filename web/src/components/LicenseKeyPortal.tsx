'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Lang } from '@/lib/catalog';
import type { ActivatedMachineRecord, LicensePlanCode } from '@/lib/license-key';

interface EntitlementInfo {
  eligible: boolean;
  plan: LicensePlanCode | null;
  expiresAtTs: number;
  maxMachines: number;
  email: string;
  reason?: string;
}

interface LicenseKeyPortalProps {
  lang: Lang;
  initialEntitlement: EntitlementInfo;
  initialMachines: ActivatedMachineRecord[];
  initialHwid?: string;
}

const COPY = {
  vi: {
    eyebrow: 'HARDWARE LICENSE / FILM STUDIO & DESKTOP TOOLS',
    title: 'Kích hoạt phần mềm theo Mã Máy (License Key)',
    intro:
      'Nhập Mã Máy (Hardware ID: FS-XXXX-XXXX-XXXX-XXXX) hiển thị trên ứng dụng Film Studio để nhận Mã Kích Hoạt có thời hạn khớp chính xác với gói bạn đã mua trên Web.',
    planLabel: 'Gói bản quyền áp dụng',
    expiryLabel: 'Thời hạn kích hoạt đến',
    slotsLabel: 'Số máy đã kích hoạt',
    lifetime: 'Vĩnh viễn (Trọn đời)',
    noPlan: 'Chưa có gói hoạt động',
    upgradeCta: 'Nâng cấp gói ngay ↗',
    inputLabel: 'Nhập Mã Máy của bạn (Ví dụ: FS-D0AD-F72A-B2B5-EAF7)',
    inputPlaceholder: 'FS-XXXX-XXXX-XXXX-XXXX',
    generateBtn: '🔑 Lấy Mã Kích Hoạt Ngay',
    generating: 'Đang cấp mã...',
    generatedTitle: 'Mã Kích Hoạt của bạn đã sẵn sàng!',
    generatedHint:
      'Sao chép mã bên dưới dán vào ứng dụng Film Studio, hoặc bấm nút "🔄 Tự Động Lấy Key Từ Web" ngay trên ứng dụng.',
    copyKey: '📋 Sao chép Mã Kích Hoạt',
    copied: '✓ Đã sao chép!',
    devicesTitle: 'Danh sách máy tính đã kích hoạt',
    emptyDevices: 'Bạn chưa kích hoạt thiết bị nào.',
    unbindBtn: 'Gỡ máy',
    unbinding: 'Đang gỡ...',
    machineCol: 'Mã Máy (HWID)',
    expiresCol: 'Hạn dùng',
    planNames: {
      PRO: 'Premium (1 Tháng)',
      ULTRA: 'Ultra (1 Năm)',
      LIFETIME: 'Ultra Lifetime (Vĩnh Viễn)',
      TRIAL: 'Dùng thử',
      CUSTOM: 'Theo thời hạn gói',
    } as Record<string, string>,
  },
  en: {
    eyebrow: 'HARDWARE LICENSE / FILM STUDIO & DESKTOP TOOLS',
    title: 'Hardware Machine License Activation',
    intro:
      'Enter the Machine ID (FS-XXXX-XXXX-XXXX-XXXX) displayed in your Film Studio app to generate a License Key bound to your device and matching your active Web subscription term.',
    planLabel: 'Active license plan',
    expiryLabel: 'License valid until',
    slotsLabel: 'Activated devices',
    lifetime: 'Lifetime (Permanent)',
    noPlan: 'No active plan',
    upgradeCta: 'Upgrade plan ↗',
    inputLabel: 'Enter your Machine ID (e.g. FS-D0AD-F72A-B2B5-EAF7)',
    inputPlaceholder: 'FS-XXXX-XXXX-XXXX-XXXX',
    generateBtn: '🔑 Generate License Key',
    generating: 'Generating...',
    generatedTitle: 'Your License Key is ready!',
    generatedHint:
      'Copy the key below and paste it into Film Studio, or click "🔄 Auto Sync Key from Web" directly inside the app.',
    copyKey: '📋 Copy License Key',
    copied: '✓ Copied!',
    devicesTitle: 'Activated machines',
    emptyDevices: 'No machines activated yet.',
    unbindBtn: 'Unbind',
    unbinding: 'Removing...',
    machineCol: 'Machine ID (HWID)',
    expiresCol: 'Expires',
    planNames: {
      PRO: 'Premium (1 Month)',
      ULTRA: 'Ultra (1 Year)',
      LIFETIME: 'Ultra Lifetime',
      TRIAL: 'Trial',
      CUSTOM: 'Custom Term',
    } as Record<string, string>,
  },
  zh: {
    eyebrow: 'HARDWARE LICENSE / FILM STUDIO & DESKTOP TOOLS',
    title: '按机器码激活软件许可证 (License Key)',
    intro:
      '输入 Film Studio 软件中显示的机器码 (FS-XXXX-XXXX-XXXX-XXXX)，系统将根据您当前购买的套餐有效期生成专属激活码。',
    planLabel: '当前适用套餐',
    expiryLabel: '激活有效期至',
    slotsLabel: '已激活设备数',
    lifetime: '终身有效',
    noPlan: '暂无有效套餐',
    upgradeCta: '立即升级套餐 ↗',
    inputLabel: '输入您的机器码 (例如: FS-D0AD-F72A-B2B5-EAF7)',
    inputPlaceholder: 'FS-XXXX-XXXX-XXXX-XXXX',
    generateBtn: '🔑 立即获取激活码',
    generating: '正在生成...',
    generatedTitle: '您的专属激活码已生成！',
    generatedHint:
      '复制下方激活码粘贴至 Film Studio 软件中，或在软件内直接点击“🔄 从网页自动同步激活码”。',
    copyKey: '📋 复制激活码',
    copied: '✓ 已复制！',
    devicesTitle: '已激活设备列表',
    emptyDevices: '尚未激活任何设备。',
    unbindBtn: '解绑设备',
    unbinding: '解绑中...',
    machineCol: '机器码 (HWID)',
    expiresCol: '有效期至',
    planNames: {
      PRO: 'Premium (1个月)',
      ULTRA: 'Ultra (1年)',
      LIFETIME: 'Ultra Lifetime (终身)',
      TRIAL: '试用版',
      CUSTOM: '套餐期限',
    } as Record<string, string>,
  },
} as const;

const LOCALE_MAP: Record<Lang, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  zh: 'zh-CN',
};

export default function LicenseKeyPortal({
  lang,
  initialEntitlement,
  initialMachines,
  initialHwid = '',
}: LicenseKeyPortalProps) {
  const t = COPY[lang] ?? COPY.vi;
  const [entitlement] = useState<EntitlementInfo>(initialEntitlement);
  const [machines, setMachines] = useState<ActivatedMachineRecord[]>(initialMachines);
  const [machineIdInput, setMachineIdInput] = useState(initialHwid);
  const [busy, setBusy] = useState(false);
  const [unbindingId, setUnbindingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [activeKey, setActiveKey] = useState<{
    machineId: string;
    licenseKey: string;
    plan: string;
    expiresAt: number;
  } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!initialHwid && typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const qHwid = sp.get('hwid') || sp.get('machineId') || '';
      if (qHwid) setMachineIdInput(qHwid.trim().toUpperCase());
    }
  }, [initialHwid]);

  const formatExpiry = (expTs: number, planCode?: string | null) => {
    if (!expTs) return '—';
    if (planCode === 'LIFETIME' || expTs >= 4000000000) return t.lifetime;
    return new Intl.DateTimeFormat(LOCALE_MAP[lang], {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(expTs * 1000));
  };

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!machineIdInput.trim()) return;
    setBusy(true);
    try {
      const res = await fetch('/api/license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ machineId: machineIdInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Không thể cấp Mã Kích Hoạt.');
        return;
      }
      setActiveKey({
        machineId: data.machineId,
        licenseKey: data.licenseKey,
        plan: data.plan,
        expiresAt: data.expiresAt,
      });
      if (Array.isArray(data.machines)) {
        setMachines(data.machines);
      }
      setMachineIdInput(data.machineId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi kết nối máy chủ.');
    } finally {
      setBusy(false);
    }
  }

  async function handleUnbind(hwid: string) {
    setUnbindingId(hwid);
    setError('');
    try {
      const res = await fetch(`/api/license?machineId=${encodeURIComponent(hwid)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Không thể gỡ thiết bị.');
        return;
      }
      if (Array.isArray(data.machines)) {
        setMachines(data.machines);
      }
      if (activeKey?.machineId === hwid) {
        setActiveKey(null);
      }
    } catch {
      setError('Không thể gỡ thiết bị.');
    } finally {
      setUnbindingId(null);
    }
  }

  function copyToClipboard(text: string, tag: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
      setCopiedId(tag);
      setTimeout(() => setCopiedId((prev) => (prev === tag ? null : prev)), 2200);
    }
  }

  return (
    <div
      style={{
        padding: '24px 24px 26px',
        borderRadius: 20,
        background:
          'linear-gradient(152deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,.04) 52%, rgba(255,255,255,.02) 100%)',
        border: '1px solid rgba(255,255,255,.15)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <span
            style={{
              display: 'block',
              color: '#f16d67',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            {t.eyebrow}
          </span>
          <h2
            style={{
              margin: '0 0 8px',
              fontFamily: 'var(--display), Arial, sans-serif',
              fontSize: 'clamp(22px, 2.6vw, 30px)',
              lineHeight: 1.15,
              letterSpacing: '-.02em',
            }}
          >
            {t.title}
          </h2>
          <p style={{ margin: 0, color: '#aab1bc', fontSize: 14, lineHeight: 1.6 }}>{t.intro}</p>
        </div>

        {!entitlement.eligible && (
          <Link
            href="/?tab=pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '11px 18px',
              borderRadius: 100,
              fontWeight: 700,
              fontSize: 13,
              color: '#fff',
              textDecoration: 'none',
              border: '1px solid rgba(241,109,103,.55)',
              background: 'linear-gradient(180deg, rgba(232,58,52,.42), rgba(232,58,52,.22))',
            }}
          >
            {t.upgradeCta}
          </Link>
        )}
      </div>

      {/* Thẻ thông tin gói & thời hạn */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            padding: '14px 16px',
            borderRadius: 14,
            background: 'rgba(0,0,0,.26)',
            border: '1px solid rgba(255,255,255,.1)',
          }}
        >
          <span style={{ display: 'block', fontSize: 11, color: '#949ba4', marginBottom: 4 }}>
            {t.planLabel}
          </span>
          <strong style={{ fontSize: 15, color: entitlement.eligible ? '#6ee7b7' : '#fda4af' }}>
            {entitlement.eligible && entitlement.plan
              ? t.planNames[entitlement.plan] || entitlement.plan
              : t.noPlan}
          </strong>
        </div>

        <div
          style={{
            padding: '14px 16px',
            borderRadius: 14,
            background: 'rgba(0,0,0,.26)',
            border: '1px solid rgba(255,255,255,.1)',
          }}
        >
          <span style={{ display: 'block', fontSize: 11, color: '#949ba4', marginBottom: 4 }}>
            {t.expiryLabel}
          </span>
          <strong style={{ fontSize: 15, color: '#f5f5f4' }}>
            {entitlement.eligible ? formatExpiry(entitlement.expiresAtTs, entitlement.plan) : '—'}
          </strong>
        </div>

        <div
          style={{
            padding: '14px 16px',
            borderRadius: 14,
            background: 'rgba(0,0,0,.26)',
            border: '1px solid rgba(255,255,255,.1)',
          }}
        >
          <span style={{ display: 'block', fontSize: 11, color: '#949ba4', marginBottom: 4 }}>
            {t.slotsLabel}
          </span>
          <strong style={{ fontSize: 15, color: '#f5f5f4' }}>
            {machines.length} / {entitlement.maxMachines || 0}
          </strong>
        </div>
      </div>

      {/* Form nhập Mã Máy để lấy Mã Kích Hoạt */}
      <form onSubmit={handleGenerate} style={{ marginBottom: 18 }}>
        <label
          htmlFor="hwid-input"
          style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#c7cdd5', marginBottom: 8 }}
        >
          {t.inputLabel}
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <input
            id="hwid-input"
            type="text"
            value={machineIdInput}
            onChange={(e) => setMachineIdInput(e.target.value.toUpperCase())}
            placeholder={t.inputPlaceholder}
            disabled={busy}
            style={{
              flex: '1 1 260px',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,.24)',
              background: 'rgba(0,0,0,.35)',
              color: '#fde047',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '.06em',
            }}
          />
          <button
            type="submit"
            disabled={busy || !machineIdInput.trim()}
            style={{
              padding: '12px 22px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,.35)',
              background: 'linear-gradient(180deg, rgba(255,255,255,.28) 0%, rgba(255,255,255,.14) 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              cursor: busy ? 'wait' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {busy ? t.generating : t.generateBtn}
          </button>
        </div>
      </form>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 12,
            background: 'rgba(244,63,94,.14)',
            border: '1px solid rgba(244,63,94,.38)',
            color: '#fda4af',
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {/* Kết quả Mã Kích Hoạt vừa sinh */}
      {activeKey && (
        <div
          style={{
            padding: '16px 18px',
            borderRadius: 14,
            background: 'rgba(16,185,129,.12)',
            border: '1px solid rgba(16,185,129,.42)',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              marginBottom: 8,
            }}
          >
            <strong style={{ color: '#6ee7b7', fontSize: 14 }}>
              ✓ {t.generatedTitle} ({activeKey.machineId})
            </strong>
            <button
              type="button"
              onClick={() => copyToClipboard(activeKey.licenseKey, 'active')}
              style={{
                padding: '7px 14px',
                borderRadius: 99,
                border: '1px solid rgba(110,231,183,.5)',
                background: 'rgba(16,185,129,.25)',
                color: '#ecfdf5',
                fontWeight: 700,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {copiedId === 'active' ? t.copied : t.copyKey}
            </button>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: '#a7f3d0' }}>{t.generatedHint}</p>
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              background: 'rgba(0,0,0,.45)',
              border: '1px solid rgba(255,255,255,.12)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              fontSize: 12,
              color: '#f8fafc',
              wordBreak: 'break-all',
              userSelect: 'all',
            }}
          >
            {activeKey.licenseKey}
          </div>
        </div>
      )}

      {/* Danh sách máy tính đã kích hoạt */}
      <div>
        <h3 style={{ margin: '0 0 10px', fontSize: 14, color: '#c7cdd5', fontWeight: 700 }}>
          {t.devicesTitle}
        </h3>
        {machines.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13, color: '#8e96a0' }}>{t.emptyDevices}</p>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {machines.map((m) => (
              <div
                key={m.machineId}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'rgba(0,0,0,.22)',
                  border: '1px solid rgba(255,255,255,.1)',
                }}
              >
                <div>
                  <strong
                    style={{
                      display: 'inline-block',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                      fontSize: 14,
                      color: '#fde047',
                      marginRight: 10,
                    }}
                  >
                    {m.machineId}
                  </strong>
                  <span style={{ fontSize: 12, color: '#aab1bc' }}>
                    {t.planNames[m.plan] || m.plan} · {t.expiresCol}: {formatExpiry(m.expiresAt, m.plan)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {m.licenseKey && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(m.licenseKey, m.machineId)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 99,
                        border: '1px solid rgba(255,255,255,.24)',
                        background: 'rgba(255,255,255,.1)',
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {copiedId === m.machineId ? t.copied : t.copyKey}
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={unbindingId === m.machineId}
                    onClick={() => handleUnbind(m.machineId)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 99,
                      border: '1px solid rgba(244,63,94,.35)',
                      background: 'rgba(244,63,94,.12)',
                      color: '#fda4af',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {unbindingId === m.machineId ? t.unbinding : t.unbindBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
