@echo off
cd /d "D:\2A"
echo ========================================================
echo Running MotionSites Daily Agent
echo ========================================================

node "%~dp0daily-orchestrator.mjs"

echo.
echo Agent finished. Check logs in logs\ directory.
pause
