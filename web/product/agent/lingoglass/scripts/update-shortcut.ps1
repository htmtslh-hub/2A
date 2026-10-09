$wsh = New-Object -ComObject WScript.Shell
$desktop = [Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktop "LingoGlass.lnk"
$appDir = "D:\3. Agent\3-app\1-mkv"
$targetExe = Join-Path $appDir "node_modules\electron\dist\electron.exe"

# 1. Desktop shortcut
$shortcut = $wsh.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $targetExe
$shortcut.Arguments = "`"$appDir`""
$shortcut.WorkingDirectory = $appDir
$shortcut.IconLocation = "$targetExe,0"
$shortcut.Description = "LingoGlass Player 1.0 - Trình phát học ngoại ngữ thông minh (GPU AI)"
$shortcut.Save()

# 2. Start menu shortcut
$startMenu = [Environment]::GetFolderPath('Programs')
$startLnk = Join-Path $startMenu "LingoGlass.lnk"
$shortcutStart = $wsh.CreateShortcut($startLnk)
$shortcutStart.TargetPath = $targetExe
$shortcutStart.Arguments = "`"$appDir`""
$shortcutStart.WorkingDirectory = $appDir
$shortcutStart.IconLocation = "$targetExe,0"
$shortcutStart.Description = "LingoGlass Player 1.0"
$shortcutStart.Save()

Write-Host "Updated desktop shortcut successfully: $shortcutPath -> $targetExe $appDir"
