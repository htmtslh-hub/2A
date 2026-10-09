import React, { useState, useEffect } from 'react';
import { fetchLicenseStatus, submitLicenseActivation, submitLicenseDeactivation, LicenseStatus } from '../security/licenseClient';
import { ShieldCheck, KeyRound, Sparkles, X, CheckCircle2, AlertCircle, Laptop, Clock, Mail } from 'lucide-react';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLicenseChanged?: () => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({ isOpen, onClose, onLicenseChanged }) => {
  const [status, setStatus] = useState<LicenseStatus | null>(null);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadStatus();
      setMessage(null);
    }
  }, [isOpen]);

  const loadStatus = async () => {
    const res = await fetchLicenseStatus();
    setStatus(res);
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKeyInput.trim()) return;

    setLoading(true);
    setMessage(null);

    const res = await submitLicenseActivation(licenseKeyInput.trim());
    setLoading(false);

    if (res.success && res.license) {
      setStatus(res.license);
      setMessage({ type: 'success', text: 'Kích hoạt bản quyền thành công! Chào mừng bạn đến với LingoGlass Pro.' });
      setLicenseKeyInput('');
      if (onLicenseChanged) onLicenseChanged();
    } else {
      setMessage({ type: 'error', text: res.error || 'Mã giấy phép không hợp lệ hoặc đã bị thay đổi.' });
    }
  };

  const handleDeactivate = async () => {
    if (!confirm('Bạn có chắc muốn hủy kích hoạt bản quyền trên thiết bị này để chuyển sang máy khác?')) return;
    setLoading(true);
    await submitLicenseDeactivation();
    await loadStatus();
    setLoading(false);
    setMessage({ type: 'success', text: 'Đã hủy kích hoạt thành công.' });
    if (onLicenseChanged) onLicenseChanged();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1E24]/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] border-2 border-[#1E1E24] rounded-2xl p-6 shadow-[6px_6px_0px_#1E1E24] relative animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Retro Header Bar with Window Dots */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#1E1E24]/10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F472B6] border border-[#1E1E24]/50"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FCD34D] border border-[#1E1E24]/50"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#86EFAC] border border-[#1E1E24]/50"></span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#FCE7F3] border-1.5 border-[#1E1E24] flex items-center justify-center shadow-[1px_1px_0px_#1E1E24]">
              <KeyRound className="w-4 h-4 text-[#BE185D]" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#1E1E24]">
              Bản Quyền LingoGlass
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#FAF7F2] border-1.5 border-[#1E1E24] hover:bg-[#FCE7F3] text-[#1E1E24] flex items-center justify-center shadow-[2px_2px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs font-bold flex items-start gap-2 border-1.5 ${
              message.type === 'success'
                ? 'bg-emerald-50 border-[#1E1E24] text-emerald-800 shadow-[2px_2px_0px_#1E1E24]'
                : 'bg-rose-50 border-[#1E1E24] text-rose-800 shadow-[2px_2px_0px_#1E1E24]'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Status Card */}
        {status?.isPro ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FFFDF9] border-1.5 border-[#1E1E24] shadow-[3px_3px_0px_#1E1E24]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1E1E24]/10">
                <span className="text-[11px] text-[#1E1E24]/70 font-black uppercase tracking-wider">
                  Trạng Thái
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black border border-emerald-400 flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  ĐÃ KÍCH HOẠT (PRO)
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#1E1E24]/90 font-medium">
                {status.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#BE185D]" />
                    <span>Email: <b className="text-[#1E1E24]">{status.email}</b></span>
                  </div>
                )}
                {status.licenseId && (
                  <div className="flex items-center gap-2 font-mono">
                    <KeyRound className="w-3.5 h-3.5 text-[#BE185D]" />
                    <span>Mã: <b className="text-[#1E1E24]">{status.licenseId}</b></span>
                  </div>
                )}
                {status.deviceId && (
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#1E1E24]/60">
                    <Laptop className="w-3.5 h-3.5 text-[#1E1E24]/50" />
                    <span>Thiết bị: {status.deviceId}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#BE185D]" />
                  <span>
                    Thời hạn: <b className="text-[#1E1E24]">{status.expiresAt === 0 ? 'Vĩnh viễn (Lifetime)' : 'Theo thời hạn'}</b>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleDeactivate}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#FFFDF9] hover:bg-rose-50 border-1.5 border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] text-xs font-bold text-rose-700 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              Hủy kích hoạt trên máy này (Đổi máy)
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#FCE7F3] border-1.5 border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] text-xs text-[#1E1E24] font-medium leading-relaxed">
              💡 Bạn đang dùng bản <b>Dùng thử (Trial)</b>. Nhập mã bản quyền để mở khóa trọn đời các tính năng.
            </div>

            <form onSubmit={handleActivate} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#1E1E24] block mb-1">
                  Mã bản quyền:
                </label>
                <textarea
                  rows={3}
                  value={licenseKeyInput}
                  onChange={e => setLicenseKeyInput(e.target.value)}
                  placeholder="Dán mã kích hoạt LGLIC-... vào đây"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FFFDF9] border-1.5 border-[#1E1E24] shadow-[2px_2px_0px_#1E1E24] text-[#1E1E24] font-mono placeholder-[#1E1E24]/40 resize-none focus:outline-none focus:border-[#BE185D]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="retro-btn-pink w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                {loading ? (
                  <span>Đang xác thực...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Kích Hoạt Bản Quyền</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Footer Security Note */}
        <div className="mt-5 pt-3 border-t border-[#1E1E24]/10 text-[11px] font-medium text-[#1E1E24]/60 text-center">
          Xác thực chữ ký số Ed25519 cục bộ (Offline Safe).
        </div>
      </div>
    </div>
  );
};
