@echo off
echo ========================================================
echo Running Forge Zone MotionSites Daily Agent (06:00 AM Pipeline)
echo ========================================================
cd /d D:\2A
powershell -NoProfile -ExecutionPolicy Bypass -File "D:\2A\web\tools\agent-motionsites\run-scheduled-agent.ps1"
