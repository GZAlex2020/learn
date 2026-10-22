@echo off
chcp 65001 >nul
title 暑假复习 - 本地服务器
cd /d "%~dp0"
echo.
echo  正在启动服务器，供安卓 / iPad 安装应用...
echo.
python _serve_app.py
if errorlevel 1 (
  echo.
  echo  未找到 Python，请先安装 Python 3
  pause
)
