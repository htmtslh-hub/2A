@echo off
chcp 65001 >nul
title Cap Phep & Khoi Dong Cai Dat LingoGlass Player
echo ========================================================
echo   DANG THIET LAP CHUNG CHI & GO CHAN WINDOWS DEFENDER
echo ========================================================
echo.

echo [1/3] Dang nap chung chi so LingoGlass Team vao he thong...
powershell -NoProfile -Command "Import-Certificate -FilePath '%~dp0build\cert.crt' -CertStoreLocation Cert:\CurrentUser\TrustedPublisher" >nul 2>&1

echo [2/3] Dang go co chan Mark-of-the-Web (Unblock-File)...
powershell -NoProfile -Command "Get-ChildItem -Path '%~dp0release' -Recurse | Unblock-File" >nul 2>&1

echo [3/3] Dang khoi dong bo cai dat chuan Windows...
start "" "%~dp0release\LingoGlass Setup 1.0.0.exe"

echo.
echo HOAN TAT! Trinh cai dat LingoGlass Setup dang khoi dong tren man hinh cua ban.
echo Ban co the dong cua so nay.
timeout /t 3 >nul
exit
