#!/bin/bash

# Cross-platform script to build extension
# Works on macOS, Linux, and Windows (with Git Bash or WSL)

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EXTENSION_DIR="$PROJECT_ROOT/extension"
DOWNLOADS_DIR="$PROJECT_ROOT/public/downloads"
OUTPUT_FILE="$DOWNLOADS_DIR/credify-ai-extension.zip"

echo "📦 Building Credify AI Browser Extension..."

# Create downloads directory if it doesn't exist
mkdir -p "$DOWNLOADS_DIR"

# Remove old zip if it exists
if [ -f "$OUTPUT_FILE" ]; then
  echo "Removing old extension package..."
  rm "$OUTPUT_FILE"
fi

# Create the zip file
echo "Creating extension package..."
cd "$EXTENSION_DIR"

# Use zip command (available on most systems)
if command -v zip &> /dev/null; then
  zip -r "$OUTPUT_FILE" \
    manifest.json \
    popup.html \
    popup.css \
    popup.js \
    background.js \
    content.js \
    icons/ \
    README.md
else
  echo "⚠️  zip command not found. Attempting with alternative method..."
  # Fallback for Windows or systems without zip
  python3 -m zipfile -c "$OUTPUT_FILE" \
    manifest.json \
    popup.html \
    popup.css \
    popup.js \
    background.js \
    content.js \
    icons/ \
    README.md
fi

cd - > /dev/null

echo "✅ Extension packaged successfully!"
echo "📍 Location: $OUTPUT_FILE"
echo "📥 Download URL: /downloads/credify-ai-extension.zip"
echo ""
echo "📖 Installation Instructions:"
echo "1. Download the extension from your website"
echo "2. Go to chrome://extensions/"
echo "3. Enable 'Developer mode' (top right)"
echo "4. Click 'Load unpacked'"
echo "5. Select the extracted extension folder"
