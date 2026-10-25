@echo off
cd /d "D:\2A"
echo ========================================================
echo Running ForgeZone Pinterest Web Design 2A Daily Agent...
echo ========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "D:\2A\web\tools\agent-pinterest\run-scheduled-pinterest.ps1"
