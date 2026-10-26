# Script thực thi tự động theo lịch cho MotionSites Daily Agent (Không tự động đưa máy về Sleep để tránh làm gián đoạn khi người dùng bật máy)
param(
    [switch]$ForceSleep
)

$ErrorActionPreference = "Continue"
Set-Location "D:\2A"

# 1. Giữ máy thức trong suốt quá trình build, quay video và deploy
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
    Write-Host "[Power] Keep-Awake lock acquired for daily agent execution." -ForegroundColor Cyan

    # 2. Chạy Daily Orchestrator
    $NodePath = (Get-Command node).Source
    & $NodePath "D:\2A\web\tools\agent-motionsites\daily-orchestrator.mjs"
} finally {
    # 3. Giải phóng Keep-Awake lock (KHÔNG tự động Sleep máy khi kết thúc)
    try {
        [PowerKeepAwake]::Release()
        Write-Host "[Power] Keep-Awake lock released. PC stays awake." -ForegroundColor Cyan
    } catch {}
}
