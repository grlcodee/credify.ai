@echo off
REM Windows batch script to build and package the browser extension

setlocal enabledelayedexpansion

set "PROJECT_ROOT=%~dp0.."
set "EXTENSION_DIR=%PROJECT_ROOT%\extension"
set "DOWNLOADS_DIR=%PROJECT_ROOT%\public\downloads"
set "OUTPUT_FILE=%DOWNLOADS_DIR%\credify-ai-extension.zip"

echo 📦 Building Credify AI Browser Extension...

REM Create downloads directory if it doesn't exist
if not exist "%DOWNLOADS_DIR%" (
  mkdir "%DOWNLOADS_DIR%"
  echo Created downloads directory
)

REM Remove old zip if it exists
if exist "%OUTPUT_FILE%" (
  echo Removing old extension package...
  del "%OUTPUT_FILE%"
)

REM Create the zip file using PowerShell
echo Creating extension package...
powershell -NoProfile -Command ^
  "Add-Type -AssemblyName 'System.IO.Compression.FileSystem'; ^
   [System.IO.Compression.ZipFile]::CreateFromDirectory('%EXTENSION_DIR%', '%OUTPUT_FILE%')"

if %errorlevel% equ 0 (
  echo ✅ Extension packaged successfully!
  echo 📍 Location: %OUTPUT_FILE%
  echo 📥 Download URL: /downloads/credify-ai-extension.zip
  echo.
  echo 📖 Installation Instructions:
  echo 1. Download the extension from your website
  echo 2. Go to chrome://extensions/
  echo 3. Enable 'Developer mode' (top right^)
  echo 4. Click 'Load unpacked'
  echo 5. Select the extracted extension folder
) else (
  echo ❌ Failed to create extension package
  pause
  exit /b 1
)

pause
