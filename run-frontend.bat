@echo off
cd /d C:\TurboOps\Code\frontend
echo Limpando cache...
rmdir /s /q .next 2>nul
rmdir /s /q .turbo 2>nul
echo.
echo Iniciando frontend...
echo.
npm run dev
pause
