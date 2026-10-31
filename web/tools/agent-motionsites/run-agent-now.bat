@echo off
cd /d "E:\DONG_PHU\2A"
echo ========================================================
echo Running MotionSites Daily Agent
echo ========================================================

node "%~dp0daily-orchestrator.mjs"

echo.
echo Agent finished. Check logs in logs\ directory.
pause
