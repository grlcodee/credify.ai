View Published website: https://credify-ai.vercel.app/

# Credify.AI - Real-Time Misinformation Verification Platform

> AI-Powered fact-checking platform that verifies news, social media content, and online narratives in real-time across multiple languages.

## 🌟 Features

### Core Capabilities
- **🤖 AI-Powered Analysis**: Advanced verification using Google Gemini and Tavily APIs
- **⚡ Real-Time Dashboard**: Monitor trending misinformation and verified news  
- **🌍 Multilingual Support**: 9 Indian languages supported
- **🔍 Multi-Format Verification**: Text, URLs, and images (with OCR)
- **📊 Credibility Scoring**: 0-100 scale with detailed breakdowns
- **🎯 Bias Detection**: Emotional tone and manipulation analysis
- **📱 Browser Extension**: Verify content anywhere on the web
- **📈 Live Trending Clusters**: AI-powered topic detection and grouping

### What Makes It Unique
- **Agentic AI Research**: Autonomous fact-checking agents
- **Source Verification**: Cross-references multiple credible sources
- **Sentiment Analysis**: Detects emotional manipulation
- **Propagation Tracking**: Monitor how misinformation spreads
- **Region-Specific**: Tailored for Indian news ecosystem

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key
- Tavily API key

### Installation

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd credify.ai-main
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Add your API keys to `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   TAVILY_API_KEY=your_tavily_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open: `http://localhost:9002`

---

## 📚 Project Structure

```
credify.ai-main/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Home page (main verification interface)
│   │   ├── dashboard/            # Live misinformation dashboard
│   │   ├── how-it-works/         # Feature explanation page
│   │   ├── for-enterprises/      # Enterprise solutions page
│   │   ├── contact/              # Contact page
│   │   ├── actions.ts            # Server actions
│   │   └── api/                  # API routes
│   │       ├── analyze/          # Main verification endpoint
│   │       └── dashboard/        # Dashboard data endpoint
│   │
│   ├── components/               # React Components
│   │   ├── header.tsx           # Navigation header
│   │   ├── footer.tsx           # Footer
│   │   ├── results-display.tsx  # Analysis results UI
│   │   ├── loading-skeleton.tsx # Loading states
│   │   └── ui/                  # shadcn/ui components
│   │
│   ├── ai/                       # AI/ML Logic
│   │   ├── genkit.ts            # Genkit configuration
│   │   ├── flows/               # AI verification flows
│   │   │   ├── researchAgent.ts # Autonomous research agent
│   │   │   ├── factCheck.ts     # Fact verification
│   │   │   └── biasDetection.ts # Bias analysis
│   │   └── google-auth.ts       # Google API authentication
│   │
│   ├── lib/                      # Utilities
│   │   ├── ocr-service.ts       # Image text extraction
│   │   ├── utils.ts             # Helper functions
│   │   └── placeholder-images.ts # Image handling
│   │
│   ├── contexts/                 # React Contexts
│   └── hooks/                    # Custom React Hooks
│
├── extension/                    # Browser Extension
│   ├── manifest.json            # Extension config (v1.0.3)
│   ├── background.js            # Service worker
│   ├── content.js               # Content script
│   ├── popup.html               # Extension UI
│   ├── popup.js                 # Extension logic
│   ├── popup.css                # Extension styles
│   ├── logo.jpeg                # Extension logo
│   └── icons/                   # Extension icons
│
├── public/                       # Static Assets
│   ├── logo.jpeg                # Main logo
│   ├── favicon.ico              # Site favicon
│   └── downloads/               # Downloadable files
│       └── credify-ai-extension.zip
│
├── scripts/                      # Build Scripts
│   └── build-extension.ps1      # Extension packaging
│
└── docs/                         # Documentation
    └── blueprint.md             # Project blueprint
```

---

## 🎯 Main Pages & Features

### 1. Home Page (`/`)
**File**: `src/app/page.tsx`

Features:
- Text/URL/Image verification input
- Camera integration for live capture
- Gallery upload with OCR
- Real-time credibility analysis
- Verified sources display
- Bias and emotion detection
- Browser extension download

### 2. Live Dashboard (`/dashboard`)
**File**: `src/app/dashboard/page.tsx`

Features:
- Real-time misinformation alerts
- Trending news feed with credibility scores
- News clustering by topic
- Sentiment analysis
- Propagation tracking
- Multi-level filters (language, region, platform)

### 3. Browser Extension
**Files**: `extension/*`

Features:
- Right-click context menu verification
- Instant popup with results
- Score visualization with your logo
- Source links
- Copy/share results

---

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React

### Backend/AI
- **Runtime**: Node.js
- **AI Framework**: Firebase Genkit
- **LLM**: Google Gemini 2.0 Flash
- **Web Search**: Tavily API
- **OCR**: Google Cloud Vision API

### Browser Extension
- **Type**: Chrome Extension (Manifest V3)
- **Architecture**: Service Worker
- **Storage**: Chrome Storage API

---

## 🧪 API Endpoints

### `/api/analyze` (POST)
Main verification endpoint

**Request**:
```json
{
  "content": "Text, URL, or claim to verify",
  "language": "en",
  "imageData": "base64_string (optional)",
  "mimeType": "image/jpeg (optional)"
}
```

**Response**:
```json
{
  "credibilityScore": 85,
  "factCheckVerdict": "True",
  "verifiedSummary": "Analysis summary...",
  "evidenceSources": ["url1", "url2"],
  "biasEmotionAnalysis": "Neutral tone detected...",
  "aiGeneratedLikelihood": "Low",
  "confidence": 0.92
}
```

### `/api/dashboard` (GET)
Dashboard data endpoint (work in progress)

**Query Params**: `?type=alerts|news|clusters`

---

## 🌍 Language Support

Supported languages:
- 🇬🇧 English (en)
- 🇮🇳 हिंदी - Hindi (hi)
- 🇮🇳 தமிழ் - Tamil (ta)
- 🇮🇳 తెలుగు - Telugu (te)
- 🇮🇳 ಕನ್ನಡ - Kannada (kn)
- 🇮🇳 বাংলা - Bengali (bn)
- 🇮🇳 मराठी - Marathi (mr)
- 🇮🇳 ગુજરાતી - Gujarati (gu)
- 🇮🇳 ਪੰਜਾਬੀ - Punjabi (pa)

---

## 📦 Browser Extension Setup

### Installation for Users

1. **Download**: Get `credify-ai-extension.zip` from the website
2. **Extract**: Unzip to a folder
3. **Load in Browser**:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extracted `extension` folder

### Usage
- Select text on any webpage
- Right-click → "Analyze with Credify AI"
- View instant credibility results with score visualization

### Rebuilding Extension (for developers)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-extension.ps1
```

---

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start dev server (port 9002)

# AI/Genkit
npm run genkit:dev       # Start Genkit developer UI
npm run genkit:watch     # Watch mode for AI flows

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # TypeScript checking

# Extension
.\scripts\build-extension.ps1  # Package extension
```

---

## 🤖 AI Research Agent

**File**: `src/ai/flows/researchAgent.ts`

The autonomous fact-checking agent:
1. Analyzes the claim
2. Generates search queries
3. Scrapes multiple sources
4. Extracts relevant information
5. Cross-references facts
6. Generates credibility score

**Search Strategy**:
- Direct claim search
- Fact-check specific queries
- Debunking searches
- Verified news sources

---

## 📊 Dashboard Implementation

### Current Status
✅ UI Complete with mock data
⏳ Real data integration pending

### Roadmap for Real Data
1. Set up database (PostgreSQL/Supabase)
2. Implement RSS feed scraping
3. Create daily cron job
4. Add clustering algorithm
5. Implement real-time updates

**Implementation Options**:
- **Daily Batch**: Simpler, runs once daily (recommended for MVP)
- **Real-Time**: WebSocket-based live updates (advanced)

For detailed implementation guide, the dashboard uses mock data and is ready for real integration.

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

Configuration in `vercel.json`

### Firebase Hosting
```bash
firebase deploy
```

Configuration in `apphosting.yaml`

---

## 🔑 Environment Variables

Required:
```env
GEMINI_API_KEY=          # Google Gemini API
TAVILY_API_KEY=          # Tavily Search API
```

Optional:
```env
GOOGLE_APPLICATION_CREDENTIALS=  # For Cloud Vision OCR
PORT=9002                        # Custom port
```

---

## 🐛 Common Issues & Solutions

### Extension shows old UI
1. Go to `chrome://extensions/`
2. Remove the extension
3. Close ALL browser windows
4. Reload the extension

### API rate limits
- Gemini: 10 requests/minute (free tier)
- Tavily: 1000 requests/month (free tier)
- Solution: Implement caching

### OCR not working
- Ensure Google Cloud Vision API is enabled
- Check service account credentials
- Verify image format (JPEG/PNG)

---

## 📈 Credibility Scoring System

**Score Range**: 0-100

- **90-100**: Highly Credible (Verified True)
- **70-89**: Mostly Credible (True with context)
- **40-69**: Mixed/Uncertain (Requires verification)
- **20-39**: Low Credibility (Likely Misleading)
- **0-19**: Not Credible (False)

**Factors**:
- Source reliability
- Evidence quality
- Cross-reference consistency
- Publication date
- Author credibility
- Bias indicators

---

## 🤝 Contributing

We welcome contributions! Areas needing help:
- Dashboard real-time data integration
- More language support
- Mobile app development
- API rate limit optimization
- Testing and documentation

---

## 📄 License

[Add your license here]

---

## 🆘 Support

- **Issues**: Open a GitHub issue
- **Documentation**: Check `/docs` folder

---

## 🎯 Roadmap

### Short-term
- [ ] Complete dashboard data integration
- [ ] Implement caching layer
- [ ] Add user accounts
- [ ] API rate limiting

### Long-term
- [ ] Social media platform integration
- [ ] Mobile applications (iOS/Android)
- [ ] Public API for developers
- [ ] Advanced ML models
- [ ] Enterprise features (team accounts, analytics)

---

## 🙏 Acknowledgments

- **Google Gemini**: AI and language models
- **Tavily**: Web search and research
- **Next.js**: Framework excellence
- **Vercel**: Deployment platform
- **shadcn/ui**: Beautiful components

---

**Built with ❤️ to combat misinformation and promote truth**

Version: 1.0.3  
Last Updated: November 29, 2025

