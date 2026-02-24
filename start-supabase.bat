@echo off
setlocal enabledelayedexpansion

REM Colors (using ANSI codes)
set YELLOW=[33m
set GREEN=[32m
set RED=[31m
set NC=[0m

echo %YELLOW%🚀 Starting Supabase Local...%NC%

REM Check if Docker is running
docker info >nul 2>&1
if !errorlevel! neq 0 (
  echo %RED%❌ Docker is not running. Please start Docker first.%NC%
  pause
  exit /b 1
)

echo %YELLOW%📦 Starting Docker containers...%NC%
docker-compose up -d

REM Wait for services
echo %YELLOW%⏳ Waiting for services to start (30 seconds)...%NC%
timeout /t 30 /nobreak

echo %YELLOW%🔍 Checking services...%NC%

docker ps | find "supabase_postgres" >nul
if !errorlevel! equ 0 (
  echo %GREEN%✓ PostgreSQL is running%NC%
) else (
  echo %RED%✗ PostgreSQL failed to start%NC%
  docker-compose logs
  exit /b 1
)

docker ps | find "supabase_studio" >nul
if !errorlevel! equ 0 (
  echo %GREEN%✓ Supabase Studio is running%NC%
) else (
  echo %RED%✗ Supabase Studio failed to start%NC%
  docker-compose logs
  exit /b 1
)

echo.
echo %GREEN%✅ Supabase Local is running!%NC%
echo.
echo %YELLOW%📍 Access URLs:%NC%
echo    Studio (UI):  http://localhost:3001
echo    Database:     postgresql://postgres:postgres@localhost:5432/postgres
echo.
echo %YELLOW%📝 Next steps:%NC%
echo    1. cd backend ^&^& npm install
echo    2. npx prisma migrate deploy
echo    3. npx prisma db seed
echo    4. npm run dev
echo    5. In another terminal: cd frontend ^&^& npm run dev
echo.
pause
