@echo off
cd /d "E:\DONG_PHU\2A"
echo ========================================================
echo Running ForgeZone Pinterest Web Design 2A Daily Agent...
echo ========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "E:\DONG_PHU\2A\web\tools\agent-pinterest\run-scheduled-pinterest.ps1"
