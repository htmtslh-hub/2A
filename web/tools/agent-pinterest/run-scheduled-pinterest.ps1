# Script thực thi tự động lúc 09:00 sáng hàng ngày (Tự đánh thức máy từ chế độ Sleep & Tắt máy hoàn toàn sau khi xong việc)
param(
    [switch]$NoShutdown
)

$ErrorActionPreference = "Continue"
Set-Location "D:\2A"

# 1. Giữ máy thức (Prevent Unattended Sleep Timeout 120s của Windows) trong suốt quá trình tải ảnh, tạo web, kiểm thử, đóng gói, quay video và deploy
$PowerCode = @"
using System;
using System.Runtime.InteropServices;
public static class PowerKeepAwake {
    [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    public static extern uint SetThreadExecutionState(uint esFlags);
    public static void Hold() {
        SetThreadExecutionState(0x80000043u);
    }
    public static void Release() {
        SetThreadExecutionState(0x80000000u);
    }
}
"@

try {
    Add-Type -TypeDefinition $PowerCode -ErrorAction SilentlyContinue
    [PowerKeepAwake]::Hold()
    Write-Host "[Power] Keep-Awake lock acquired for 09:00 AM Pinterest daily agent execution." -ForegroundColor Cyan

    # 2. Chạy Daily Pinterest Orchestrator (Tìm 5 mẫu từ Pinterest: 2 Free + 3 Premium, tải ảnh, tạo web + animation/scroll/hover, kiểm thử, đóng gói, quay preview, push GitHub & deploy Vercel)
    $NodePath = (Get-Command node).Source
    & $NodePath "D:\2A\web\tools\agent-pinterest\daily-pinterest-orchestrator.mjs"
} finally {
    # 3. Giải phóng Keep-Awake lock
    try {
        [PowerKeepAwake]::Release()
        Write-Host "[Power] Keep-Awake lock released." -ForegroundColor Cyan
    } catch {}

    # 4. Tắt máy hoàn toàn (Shut down) sau khi hoàn tất toàn bộ công việc (Bước 6)
    if (-not $NoShutdown) {
        Write-Host "[Power] Step 6: Shutting down PC completely in 15 seconds..." -ForegroundColor Yellow
        & shutdown.exe /s /f /t 15 /c "ForgeZone 09:00 AM Pinterest Daily Agent completed all 5 templates, pushed to GitHub & deployed to Vercel. Shutting down PC."
    }
}
