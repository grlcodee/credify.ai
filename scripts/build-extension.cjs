#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const projectRoot = path.join(__dirname, '..');
const extensionDir = path.join(projectRoot, 'extension');
const downloadsDir = path.join(projectRoot, 'public', 'downloads');
const outputFile = path.join(downloadsDir, 'credify-ai-extension.zip');

// Create downloads directory if it doesn't exist
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
  console.log('✅ Created downloads directory');
}

// Remove old zip if it exists
if (fs.existsSync(outputFile)) {
  console.log('🗑️  Removing old extension package...');
  fs.unlinkSync(outputFile);
}

console.log('📦 Building Credify AI Browser Extension...');

// Create output stream
const output = fs.createWriteStream(outputFile);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

// Handle error
output.on('error', (err) => {
  console.error('❌ Error creating zip file:', err);
  process.exit(1);
});

archive.on('error', (err) => {
  console.error('❌ Archive error:', err);
  process.exit(1);
});

// Pipe archive to output
archive.pipe(output);

// Add files to archive
const filesToInclude = [
  'manifest.json',
  'popup.html',
  'popup.css',
  'popup.js',
  'background.js',
  'content.js',
  'README.md',
];

// Add individual files
filesToInclude.forEach((file) => {
  const filePath = path.join(extensionDir, file);
  if (fs.existsSync(filePath)) {
    archive.file(filePath, { name: file });
  }
});

// Add icons directory
const iconsDir = path.join(extensionDir, 'icons');
if (fs.existsSync(iconsDir)) {
  archive.directory(iconsDir, 'icons');
}

// Finalize archive
archive.finalize().then(() => {
  console.log('✅ Extension packaged successfully!');
  console.log(`📍 Location: ${outputFile}`);
  console.log('📥 Download URL: /downloads/credify-ai-extension.zip');
  console.log('');
  console.log('📖 Installation Instructions:');
  console.log('1. Download the extension from your website');
  console.log("2. Go to chrome://extensions/");
  console.log("3. Enable 'Developer mode' (top right)");
  console.log("4. Click 'Load unpacked'");
  console.log('5. Select the extracted extension folder');
}).catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
