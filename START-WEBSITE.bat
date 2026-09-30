@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22 or newer, then run this file again.
  echo https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing the website dependencies...
  call npm ci
  if errorlevel 1 (
    echo Installation could not finish. Check the message above and your internet connection.
    pause
    exit /b 1
  )
)
echo Opening the Realm of Isaiah preview...
echo Keep this window open while previewing. Press Ctrl+C to stop.
call npm run dev -- --open
if errorlevel 1 pause
