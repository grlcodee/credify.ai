# Credify AI Browser Extension

Check the credibility of news articles, links, and text with a single right-click!

## Features

- ✅ Right-click context menu on selected text, links, and pages
- ✅ Real-time credibility analysis
- ✅ Credibility score (0-100)
- ✅ Fact-check verdict (True/Misleading/False/etc.)
- ✅ Evidence sources and summaries
- ✅ Bias & emotion analysis
- ✅ Copy and share results

## Installation (Manual)

### For Chrome / Edge / Brave

1. Go to `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `extension` folder from this repository
5. The extension is now installed!

### Usage

1. Select any text, link, or right-click a page
2. Select **"Analyze with Credify AI"**
3. Wait for analysis results
4. View credibility score, verdict, and sources

## Configuration

### Backend URL

By default, the extension connects to `http://localhost:9002`.

To change this:
1. Open the popup while the extension is active
2. (Future: Add settings page)

Or manually in `popup.js`, change:
```javascript
const url = 'http://your-backend-url.com';
```

## Building & Packaging

### For Chrome Web Store

1. Create a `.zip` file:
```bash
# From project root
zip -r credify-ai-extension.zip extension/
```

2. Upload to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

### For Distribution (Manual .zip)

Users can:
1. Download `credify-ai-extension.zip`
2. Extract it
3. Go to `chrome://extensions/`
4. Load unpacked from extracted folder

## API Endpoint

The extension calls:
```
POST /api/analyze
Content-Type: application/json

{
  "content": "text, URL, or claim to analyze"
}
```

Response:
```json
{
  "credibilityScore": 75,
  "factCheckVerdict": "True",
  "verifiedSummary": "...",
  "evidenceSources": ["https://...", "https://..."],
  "biasEmotionAnalysis": "..."
}
```

## Development

### File Structure

- `manifest.json` - Extension configuration
- `popup.html/css/js` - Popup UI and logic
- `background.js` - Service worker handling context menu
- `content.js` - Content script for page interaction
- `icons/` - Extension icons

### Future Enhancements

- [ ] Settings page for backend URL configuration
- [ ] Keyboard shortcut (Ctrl+Shift+A)
- [ ] Highlight suspicious content on page
- [ ] Result history/caching
- [ ] Dark/light theme toggle
- [ ] Multiple language support
- [ ] Firefox & Safari support

## Support

For issues or feature requests, visit our website or contact support.

---

**Made with ❤️ by Credify AI**
