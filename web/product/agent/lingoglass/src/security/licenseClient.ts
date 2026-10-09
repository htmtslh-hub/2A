export interface LicenseStatus {
  isPro: boolean;
  edition: 'TRIAL' | 'PRO' | 'LIFETIME' | 'EXPIRED';
  email: string | null;
  licenseId: string | null;
  expiresAt: number | null;
  deviceId?: string;
}

export async function fetchLicenseStatus(): Promise<LicenseStatus> {
  if (typeof window !== 'undefined' && window.electronAPI?.license) {
    return await window.electronAPI.license.getStatus();
  }

  // Fallback for Web preview mode (localStorage)
  try {
    const cached = localStorage.getItem('lingoglass_mock_license');
    if (cached) return JSON.parse(cached);
  } catch (e) {}

  return {
    isPro: false,
    edition: 'TRIAL',
    email: null,
    licenseId: null,
    expiresAt: null
  };
}

export async function submitLicenseActivation(keyString: string): Promise<{ success: boolean; license?: LicenseStatus; error?: string }> {
  if (typeof window !== 'undefined' && window.electronAPI?.license) {
    return await window.electronAPI.license.activate(keyString);
  }

  // Fallback for Web preview
  if (keyString.startsWith('LGLIC-')) {
    const mockStatus: LicenseStatus = {
      isPro: true,
      edition: 'PRO',
      email: 'web-user@example.com',
      licenseId: 'LG-WEB-DEMO',
      expiresAt: 0
    };
    localStorage.setItem('lingoglass_mock_license', JSON.stringify(mockStatus));
    return { success: true, license: mockStatus };
  }

  return { success: false, error: 'Mã giấy phép không hợp lệ (Phải bắt đầu bằng LGLIC-...)' };
}

export async function submitLicenseDeactivation(): Promise<{ success: boolean }> {
  if (typeof window !== 'undefined' && window.electronAPI?.license) {
    return await window.electronAPI.license.deactivate();
  }
  localStorage.removeItem('lingoglass_mock_license');
  return { success: true };
}
