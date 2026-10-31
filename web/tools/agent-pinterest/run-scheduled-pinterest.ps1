# Script thực thi tự động lúc 09:00 sáng hàng ngày cho Pinterest Daily Agent (Không tự động Sleep/Shutdown khi người dùng bật máy)
param(
    [switch]$ForceShutdown
)

$ErrorActionPreference = "Continue"
Set-Location "E:\DONG_PHU\2A"

# 1. Giữ máy thức trong suốt quá trình tải ảnh, tạo web, kiểm thử, đóng gói, quay video và deploy
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

    # 2. Chạy Daily Pinterest Orchestrator
    $NodePath = (Get-Command node).Source
    & $NodePath "E:\DONG_PHU\2A\web\tools\agent-pinterest\daily-pinterest-orchestrator.mjs"
} finally {
    # 3. Giải phóng Keep-Awake lock (KHÔNG tự động tắt/sleep máy để tránh làm gián đoạn khi bật máy)
    try {
        [PowerKeepAwake]::Release()
        Write-Host "[Power] Keep-Awake lock released. PC stays awake." -ForegroundColor Cyan
    } catch {}
}
