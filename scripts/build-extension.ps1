# PowerShell script to build and package the browser extension

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ExtensionDir = Join-Path $ProjectRoot "extension"
$DownloadsDir = Join-Path $ProjectRoot "public\downloads"
$OutputFile = Join-Path $DownloadsDir "credify-ai-extension.zip"

Write-Host "📦 Building Credify AI Browser Extension..." -ForegroundColor Cyan

# Create downloads directory if it doesn't exist
if (-not (Test-Path $DownloadsDir)) {
    New-Item -ItemType Directory -Path $DownloadsDir | Out-Null
    Write-Host "Created downloads directory" -ForegroundColor Green
}

# Remove old zip if it exists
if (Test-Path $OutputFile) {
    Write-Host "Removing old extension package..." -ForegroundColor Yellow
    Remove-Item $OutputFile -Force
}

# Create the zip file
Write-Host "Creating extension package..." -ForegroundColor Cyan

Add-Type -AssemblyName 'System.IO.Compression.FileSystem'
[System.IO.Compression.ZipFile]::CreateFromDirectory($ExtensionDir, $OutputFile)

Write-Host "`n✅ Extension packaged successfully!" -ForegroundColor Green
Write-Host "📍 Location: $OutputFile" -ForegroundColor Cyan
Write-Host "📥 Download URL: /downloads/credify-ai-extension.zip" -ForegroundColor Cyan
Write-Host "`n📖 Installation Instructions:" -ForegroundColor Yellow
Write-Host "1. Download the extension from your website" -ForegroundColor White
Write-Host "2. Extract the ZIP file to a folder" -ForegroundColor White
Write-Host "3. Go to chrome://extensions/ (or edge://extensions/)" -ForegroundColor White
Write-Host "4. Enable 'Developer mode' (top right)" -ForegroundColor White
Write-Host "5. Click 'Load unpacked'" -ForegroundColor White
Write-Host "6. Select the extracted extension folder" -ForegroundColor White
