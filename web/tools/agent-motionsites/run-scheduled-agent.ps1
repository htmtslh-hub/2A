# Script thực thi tự động lúc 06:00 sáng hàng ngày khi máy được đánh thức từ chế độ Sleep
param(
    [switch]$NoSleep
)

$ErrorActionPreference = "Continue"
Set-Location "D:\2A"

# 1. Giữ máy thức (Prevent Unattended Sleep Timeout 120s của Windows) trong suốt quá trình build, quay video và deploy
$PowerCode = @"
using System;
using System.Runtime.InteropServices;
public static class PowerKeepAwake {
    [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    public static extern uint SetThreadExecutionState(uint esFlags);
    public const uint ES_CONTINUOUS = 0x80000000;
    public const uint ES_SYSTEM_REQUIRED = 0x00000001;
    public const uint ES_DISPLAY_REQUIRED = 0x00000002;
    public const uint ES_AWAYMODE_REQUIRED = 0x00000040;
}
"@

try {
    Add-Type -TypeDefinition $PowerCode -ErrorAction SilentlyContinue
    [PowerKeepAwake]::SetThreadExecutionState(
        [PowerKeepAwake]::ES_CONTINUOUS -bor
        [PowerKeepAwake]::ES_SYSTEM_REQUIRED -bor
        [PowerKeepAwake]::ES_DISPLAY_REQUIRED -bor
        [PowerKeepAwake]::ES_AWAYMODE_REQUIRED
    ) | Out-Null
    Write-Host "[Power] Keep-Awake lock acquired for daily agent execution." -ForegroundColor Cyan

    # 2. Chạy Daily Orchestrator (Lấy 3 mẫu miễn phí: 1 Free + 2 Premium, sáng tạo thêm 15-20%, đóng gói, quay preview, push GitHub & deploy Vercel)
    $NodePath = (Get-Command node).Source
    & $NodePath "D:\2A\web\tools\agent-motionsites\daily-orchestrator.mjs"
} finally {
    # 3. Giải phóng Keep-Awake lock
    try {
        [PowerKeepAwake]::SetThreadExecutionState([PowerKeepAwake]::ES_CONTINUOUS) | Out-Null
        Write-Host "[Power] Keep-Awake lock released." -ForegroundColor Cyan
    } catch {}

    # 4. Đưa máy về lại chế độ Sleep (Standby S3, bảo toàn RTC Wake Timer cho 06:00 sáng hôm sau)
    if (-not $NoSleep) {
        Write-Host "[Power] Putting PC back to Sleep in 5 seconds (RTC Wake Timer stays active for 06:00 AM tomorrow)..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.Application]::SetSuspendState(
            [System.Windows.Forms.PowerState]::Suspend,
            $false,
            $false
        ) | Out-Null
    }
}
