# Live Dashboard - Real-Time Misinformation Detection

## 🚀 How It Works

The Live Dashboard uses a multi-stage AI pipeline to detect and alert on misinformation in real-time:

### Architecture Overview

```
Trending Content → Claim Extraction → Alert Conditions → Verification → Alert Creation
     (RSS)            (Gemini)          (Multi-check)      (Tavily)      (Storage)
```

### 1. **Content Fetching** (`/api/fetch-trending`)
- Pulls trending news from Google News RSS feed every 30-60 seconds
- Extracts titles, descriptions, and metadata
- Queues items for processing

### 2. **Claim Extraction** (Gemini Mini)
- Uses Gemini 2.0 Flash to extract core factual claims
- Filters out opinion pieces and non-factual content
- Returns single, clear claim sentence

### 3. **Alert Condition Detection**

#### Condition A: Volume Spike
- Tracks claim frequency in-memory
- **Alert if**: Claim appears 3+ times in 5 minutes
- Detects viral spread patterns

#### Condition B: Contradictory Evidence
- Runs 4 parallel Tavily searches:
  - `claim`
  - `claim fact check`
  - `claim debunk`
  - `claim verified news`
- **Alert if**: 2+ reliable sources contradict the claim

#### Condition C: Emotion Spike
- Uses Gemini sentiment analysis
- Scores: anger, fear, confusion, outrage (0-1)
- **Alert if**: anger + fear > 0.65

#### Condition D: Sensitive Topics
- Keyword matching: `election`, `violence`, `riot`, `scam`, `disease`, `inflation`
- **Alert if**: Matches sensitive keyword + trending

#### Condition E: Rumor Patterns
- Detects phrases like:
  - "forwarded many times"
  - "urgent!!!"
  - "breaking" (without source)
  - "sources say" / "unconfirmed"
- **Alert if**: Pattern detected in viral content

### 4. **Verification** (`/api/process-alerts`)
- Quick Tavily burst search (4 queries in parallel)
- Captures:
  - Source count
  - Reliability scores
  - Contradiction level
  - Recency
- Completes in ~1.2 seconds

### 5. **Alert Creation** (`/api/alerts`)
- Generates structured alert object:
  ```json
  {
    "id": "uuid",
    "claim": "Extracted claim",
    "riskLevel": 91,
    "type": "MISINFO_SPIKE",
    "reason": "Contradictory evidence + volume spike",
    "platforms": ["Twitter", "WhatsApp"],
    "severity": "HIGH",
    "timestamp": 1710000000
  }
  ```
- Stores in JSON file (production: Firebase/Vercel KV)

### 6. **Dashboard Polling**
- Frontend polls `/api/alerts` every 30 seconds
- Displays newest alerts, trending news, topic clusters
- Auto-refreshes with live data

## 🔧 API Endpoints

### `/api/fetch-trending` (GET)
Fetches trending content and applies alert conditions
- Returns: Processed items with alert flags

### `/api/alerts` (GET/POST)
- **GET**: Returns last 20 alerts
- **POST**: Creates new alert

### `/api/process-alerts` (POST)
Orchestrates full alert processing pipeline:
1. Fetch trending
2. Extract claims
3. Check conditions
4. Verify with Tavily
5. Create alerts

### `/api/news-feed` (GET)
Returns real-time credibility scores for trending news

### `/api/news-clusters` (GET)
Returns AI-detected topic clusters with sentiment analysis

### `/api/cron` (GET)
Trigger endpoint for scheduled alert processing
- In production: Called by Vercel Cron every 2 minutes
- For demo: Manual "Generate Alerts" button

## 🎯 Alert Types

| Type | Trigger Condition |
|------|------------------|
| `CRITICAL_MISINFO_SPIKE` | Volume spike + sensitive topic |
| `VOLUME_SPIKE` | 3+ mentions in 5 minutes |
| `SENSITIVE_RUMOR` | Sensitive keyword + rumor pattern |
| `EMOTIONAL_MANIPULATION` | High anger/fear scores |
| `RUMOR_PATTERN` | Unverified forward patterns |

## 🚨 Risk Level Calculation

```
Base: 40
+ Volume spike: +25
+ Sensitive topic: +20
+ Rumor pattern: +10
+ Emotional manipulation: +15
Maximum: 95
```

## 💾 Data Storage

**Development**: JSON file (`data/alerts.json`)
**Production Options**:
- Vercel KV (Redis)
- Firebase Realtime Database
- Supabase

## 🧪 Testing

### Manual Alert Generation
1. Visit `/dashboard`
2. Click "🚀 Generate Alerts" button
3. Watch real-time processing

### API Testing
```bash
# Trigger alert processing
curl http://localhost:9002/api/cron

# Get latest alerts
curl http://localhost:9002/api/alerts

# Get news feed
curl http://localhost:9002/api/news-feed
```

## 📊 Performance

- **Claim Extraction**: ~200ms (Gemini Flash)
- **Tavily Verification**: ~1.2s (4 parallel queries)
- **Total Pipeline**: ~1.5-2s per item
- **Batch Processing**: 10-20 items per cycle

## 🔐 Environment Variables Required

```env
GOOGLE_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

## 🎨 UI Features

- ✅ Live clock (updates every second)
- ✅ Auto-refresh (30s for alerts/news, 60s for clusters)
- ✅ Manual alert generation button
- ✅ Real-time update timestamp
- ✅ Color-coded severity (HIGH/MEDIUM/LOW)
- ✅ Interactive filters
- ✅ Trending news with credibility scores
- ✅ Topic clustering with sentiment analysis

## 🚀 Deployment

### Vercel (Recommended)
1. Deploy to Vercel
2. Set environment variables
3. Enable Vercel Cron (automatic with `vercel-cron.json`)
4. Dashboard updates every 2 minutes automatically

### Local Development
```bash
npm install
npm run dev

# In another terminal (simulate cron):
while true; do curl http://localhost:9002/api/cron; sleep 120; done
```

## 📈 Future Enhancements

- [ ] WebSocket for true real-time updates
- [ ] Historical trend graphs
- [ ] Alert notifications (email/SMS)
- [ ] Multi-platform integration (Twitter API, Reddit)
- [ ] ML-based claim clustering
- [ ] User feedback loop for accuracy
- [ ] Export alerts (CSV/JSON)
- [ ] Advanced filtering (date range, platform, severity)
