@echo off
echo ========================================================
echo Installing ForgeZone MotionSites Daily Agent Schedule Task
echo ========================================================

powershell.exe -ExecutionPolicy Bypass -File "%~dp0install-scheduler.ps1"

pause
