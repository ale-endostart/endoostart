@echo off
cd /d C:\TurboOps\Code\backend
echo.
echo Iniciando backend na porta 3001...
echo.
set DATABASE_URL=file:./dev.db
npm run dev
pause
