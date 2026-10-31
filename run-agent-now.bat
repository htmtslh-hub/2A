@echo off
echo ========================================================
echo Running Forge Zone MotionSites Daily Agent (06:00 AM Pipeline)
echo ========================================================
cd /d E:\DONG_PHU\2A
powershell -NoProfile -ExecutionPolicy Bypass -File "E:\DONG_PHU\2A\web\tools\agent-motionsites\run-scheduled-agent.ps1"
