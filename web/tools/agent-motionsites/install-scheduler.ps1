# Script tạo Windows Scheduled Task chạy tự động hàng ngày lúc 06:00 AM (Tự đánh thức máy từ chế độ Sleep & chạy xong tự Sleep lại)
$TaskName = "ForgeZone-MotionSites-DailyAgent"
$RunnerScript = "E:\DONG_PHU\2A\web\tools\agent-motionsites\run-scheduled-agent.ps1"
$WorkingDir = "E:\DONG_PHU\2A"

Write-Host "Setting up Scheduled Task: $TaskName (06:00 AM Daily, WakeFromSleep + SleepAfterRun)" -ForegroundColor Cyan

# 1. Bật RTC Wake Timers trong Windows Power Settings (cả cắm sạc AC và pin DC) + tăng Unattended Sleep Timeout lên 30 phút
try {
    powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_SLEEP RTCWAKE 1 | Out-Null
    powercfg /SETDCVALUEINDEX SCHEME_CURRENT SUB_SLEEP RTCWAKE 1 | Out-Null
    # System unattended sleep timeout (7bc4a2f9-d8fc-4469-b07b-33eb785aaca0) = 1800 seconds (30 mins)
    powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_SLEEP 7bc4a2f9-d8fc-4469-b07b-33eb785aaca0 1800 | Out-Null
    powercfg /SETDCVALUEINDEX SCHEME_CURRENT SUB_SLEEP 7bc4a2f9-d8fc-4469-b07b-33eb785aaca0 1800 | Out-Null
    powercfg /SETACTIVE SCHEME_CURRENT | Out-Null
    Write-Host "[+] Enabled Windows Hardware RTC Wake Timers (AC/DC) & set Unattended Sleep Timeout = 30 mins." -ForegroundColor Green
} catch {
    Write-Host "[!] Warning configuring powercfg: $($_.Exception.Message)" -ForegroundColor Yellow
}

# 2. Tạo Action gọi PowerShell chạy run-scheduled-agent.ps1
$Action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$RunnerScript`"" `
    -WorkingDirectory $WorkingDir

# 3. Tạo Trigger: 06:00 AM mỗi ngày
$Trigger = New-ScheduledTaskTrigger -Daily -At "06:00AM"

# 4. Thiết lập Settings: Bật -WakeToRun (Tắt StartWhenAvailable để không tự bật bù khi người dùng khởi động máy)
$Settings = New-ScheduledTaskSettingsSet `
    -WakeToRun `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -ExecutionTimeLimit (New-TimeSpan -Hours 2)

# 5. Đăng ký Task
try {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    Register-ScheduledTask `
        -TaskName $TaskName `
        -Action $Action `
        -Trigger $Trigger `
        -Settings $Settings `
        -Description "Daily 06:00 AM automated agent: wakes PC from sleep, fetches 3 unique free prompts from motionsites.ai (1 Free + 2 Premium), builds & packages templates with +15-20% creative enhancements, pushes to GitHub, deploys to Vercel (forgezone.store), and puts PC back to sleep." | Out-Null
    Write-Host "SUCCESS: Task '$TaskName' registered to run daily at 06:00 AM (WakeToRun=True, SleepAfterRun=True)!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}
