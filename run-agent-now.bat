@echo off
cd /d "D:\2A"
echo ========================================================
echo Running MotionSites Daily Agent
echo ========================================================

node "D:\2A\web\tools\agent-motionsites\daily-orchestrator.mjs"

echo.
echo Agent finished. Check logs at: D:\2A\web\tools\agent-motionsites\logs\
pause
