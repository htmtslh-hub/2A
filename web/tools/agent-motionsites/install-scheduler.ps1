# Script tạo Windows Scheduled Task chạy tự động hàng ngày lúc 07:05 AM
$TaskName = "ForgeZone-MotionSites-DailyAgent"
$NodePath = (Get-Command node).Source
$ScriptPath = "D:\2A\web\tools\agent-motionsites\daily-orchestrator.mjs"
$WorkingDir = "D:\2A"

Write-Host "Setting up Scheduled Task: $TaskName"
Write-Host "Node: $NodePath"
Write-Host "Script: $ScriptPath"

# Tạo Action
$Action = New-ScheduledTaskAction -Execute $NodePath -Argument "`"$ScriptPath`"" -WorkingDirectory $WorkingDir

# Tạo Trigger: 07:05 AM mỗi ngày
$Trigger = New-ScheduledTaskTrigger -Daily -At "07:05AM"

# Thiết lập settings: chạy lại nếu lỡ, không tắt khi đang chạy
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Hours 2)

# Đăng ký Task
try {
    # Xoá task cũ nếu có
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Daily automated agent fetching free prompts from motionsites.ai and generating Forge Zone templates."
    Write-Host "SUCCESS: Task '$TaskName' has been registered to run daily at 07:05 AM!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}
