# Script tạo Windows Scheduled Task chạy tự động hàng ngày lúc 09:00 AM (Tự đánh thức máy từ chế độ Sleep & Tắt máy hoàn toàn khi xong việc)
$TaskName = "ForgeZone-Pinterest-DailyAgent"
$RunnerScript = "E:\DONG_PHU\2A\web\tools\agent-pinterest\run-scheduled-pinterest.ps1"
$WorkingDir = "E:\DONG_PHU\2A"

Write-Host "Setting up Scheduled Task: $TaskName (09:00 AM Daily, WakeFromSleep + ShutdownAfterRun)" -ForegroundColor Cyan

# 1. Đảm bảo RTC Wake Timers luôn bật trong Windows Power Settings
try {
    powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_SLEEP RTCWAKE 1 | Out-Null
    powercfg /SETDCVALUEINDEX SCHEME_CURRENT SUB_SLEEP RTCWAKE 1 | Out-Null
    powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_SLEEP 7bc4a2f9-d8fc-4469-b07b-33eb785aaca0 1800 | Out-Null
    powercfg /SETDCVALUEINDEX SCHEME_CURRENT SUB_SLEEP 7bc4a2f9-d8fc-4469-b07b-33eb785aaca0 1800 | Out-Null
    powercfg /SETACTIVE SCHEME_CURRENT | Out-Null
    Write-Host "[+] Verified Windows Hardware RTC Wake Timers (AC/DC) & Unattended Sleep Timeout = 30 mins." -ForegroundColor Green
} catch {
    Write-Host "[!] Warning configuring powercfg: $($_.Exception.Message)" -ForegroundColor Yellow
}

# 2. Tạo Action gọi PowerShell chạy run-scheduled-pinterest.ps1
$Action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$RunnerScript`"" `
    -WorkingDirectory $WorkingDir

# 3. Tạo Trigger: 09:00 AM mỗi ngày
$Trigger = New-ScheduledTaskTrigger -Daily -At "09:00AM"

# 4. Thiết lập Settings: Bật -WakeToRun (Tắt StartWhenAvailable để không tự bật bù khi người dùng khởi động máy)
$Settings = New-ScheduledTaskSettingsSet `
    -WakeToRun `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -ExecutionTimeLimit (New-TimeSpan -Hours 3)

# 5. Đăng ký Task
try {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    Register-ScheduledTask `
        -TaskName $TaskName `
        -Action $Action `
        -Trigger $Trigger `
        -Settings $Settings `
        -Description "Daily 09:00 AM Pinterest Web Design Agent: wakes PC from sleep, accesses pinterest.com/homefeed/, searches web design keywords, downloads 5 high-res pins (2 Free + 3 Premium), builds interactive web templates with scroll/hover/3D animations, runs 4-viewport QA, packages ZIP & previews, pushes to GitHub, deploys to Vercel (forgezone.store), and shuts down PC completely." | Out-Null
    Write-Host "SUCCESS: Task '$TaskName' registered to run daily at 09:00 AM (WakeToRun=True, ShutdownAfterRun=True)!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}
