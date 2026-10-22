@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  ========================================
echo    暑假复习 · 一键自动打包 APK
echo  ========================================
echo    自动完成：图标 + 拼音音频 + 识字音频 + APK
echo    首次运行需联网下载，约 5～15 分钟
echo    之后再次打包约 1～3 分钟
echo  ========================================
echo.
python _build_apk.py %*
if errorlevel 1 (
  echo.
  echo  打包失败，请查看上方错误信息。
  pause
  exit /b 1
)
echo.
pause
