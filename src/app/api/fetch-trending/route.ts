import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

// In-memory storage for claims tracking (in production, use Redis/KV)
const claimsSeen = new Map<string, { count: number, timestamps: number[] }>();
const sensitiveKeywords = [
  'election', 'violence', 'riot', 'scam', 'disease', 'inflation',
  'pandemic', 'vaccine', 'fraud', 'attack', 'murder', 'rape'
];

export async function GET() {
  try {
    const feedItems = await fetchTrendingContent();
    const processedItems = await Promise.all(
      feedItems.map(item => processItem(item))
    );

    return NextResponse.json({
      success: true,
      items: processedItems.filter(Boolean),
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error fetching trending:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending content' },
      { status: 500 }
    );
  }
}

async function fetchTrendingContent() {
  const items = [];

  try {
    // Google News RSS Feed
    const feed = await parser.parseURL('https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en');
    
    items.push(...feed.items.slice(0, 10).map(item => ({
      id: `gn-${item.guid}`,
      title: item.title || '',
      content: item.contentSnippet || item.content || '',
      link: item.link || '',
      platform: 'Google News',
      timestamp: new Date(item.pubDate || Date.now()).getTime()
    })));
  } catch (error) {
    console.error('Error fetching Google News:', error);
  }

  return items;
}

async function processItem(item: any) {
  try {
    // Use title as the claim directly (skip Gemini to avoid timeouts)
    const claim = item.title;

    // Step 2: Check sensitive topics
    const sensitiveAlert = checkSensitiveTopic(claim);

    // Step 3: Check rumor patterns
    const rumorAlert = checkRumorPattern(item.content);

    // Step 4: Track volume spike
    const volumeAlert = checkVolumeSpikeCondition(claim);

    // Simplified risk calculation
    let riskLevel = 50;
    if (sensitiveAlert) riskLevel += 20;
    if (rumorAlert) riskLevel += 15;
    if (volumeAlert) riskLevel += 15;

    return {
      ...item,
      claim,
      alertTriggered: sensitiveAlert || rumorAlert || volumeAlert,
      alertType: determineAlertType(volumeAlert, sensitiveAlert, rumorAlert, false),
      riskLevel: Math.min(riskLevel, 95)
    };
  } catch (error) {
    console.error('Error processing item:', error);
    return null;
  }
}

async function extractClaim(title: string, content: string): Promise<string> {
  try {
    const text = `${title}\n${content}`.slice(0, 500);
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + process.env.GOOGLE_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Extract the MAIN factual claim in this text. Return only one clear sentence. If no claim exists, return "No claim".\n\nText: ${text}`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 100
        }
      })
    });

    const data = await response.json();
    const claim = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'No claim';
    
    return claim;
  } catch (error) {
    console.error('Error extracting claim:', error);
    return 'No claim';
  }
}

function checkVolumeSpikeCondition(claim: string): boolean {
  const now = Date.now();
  const fiveMinutesAgo = now - (5 * 60 * 1000);

  // Normalize claim for comparison
  const normalizedClaim = claim.toLowerCase().trim();

  if (!claimsSeen.has(normalizedClaim)) {
    claimsSeen.set(normalizedClaim, { count: 1, timestamps: [now] });
    return false;
  }

  const entry = claimsSeen.get(normalizedClaim)!;
  
  // Filter timestamps within last 5 minutes
  entry.timestamps = entry.timestamps.filter(ts => ts > fiveMinutesAgo);
  entry.timestamps.push(now);
  entry.count = entry.timestamps.length;

  // Alert if claim appears more than 3 times in 5 minutes
  return entry.count > 3;
}

function checkSensitiveTopic(claim: string): boolean {
  const lowerClaim = claim.toLowerCase();
  return sensitiveKeywords.some(keyword => lowerClaim.includes(keyword));
}

function checkRumorPattern(content: string): boolean {
  const rumorPatterns = [
    /forwarded many times/i,
    /urgent!!!/i,
    /breaking[:\s]/i,
    /sources say/i,
    /unconfirmed/i,
    /🚨/,
    /⚠️/,
    /allegedly/i,
    /reportedly/i
  ];

  return rumorPatterns.some(pattern => pattern.test(content));
}

async function checkEmotionSpike(claim: string): Promise<boolean> {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + process.env.GOOGLE_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze sentiment. Return ONLY a JSON object with scores (0-1) for: anger, fear, confusion, outrage.\n\nText: ${claim}`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 100
        }
      })
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '{}';
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[^}]+\}/);
    if (!jsonMatch) return false;

    const emotions = JSON.parse(jsonMatch[0]);
    const emotionScore = (emotions.anger || 0) + (emotions.fear || 0);

    return emotionScore > 0.65;
  } catch (error) {
    console.error('Error checking emotion:', error);
    return false;
  }
}

function determineAlertType(volume: boolean, sensitive: boolean, rumor: boolean, emotion: boolean): string {
  if (volume && sensitive) return 'CRITICAL_MISINFO_SPIKE';
  if (volume) return 'VOLUME_SPIKE';
  if (sensitive && rumor) return 'SENSITIVE_RUMOR';
  if (emotion) return 'EMOTIONAL_MANIPULATION';
  if (rumor) return 'RUMOR_PATTERN';
  return 'GENERAL_ALERT';
}

function calculateRiskLevel(volume: boolean, sensitive: boolean, rumor: boolean, emotion: boolean): number {
  let risk = 40;
  
  if (volume) risk += 25;
  if (sensitive) risk += 20;
  if (rumor) risk += 10;
  if (emotion) risk += 15;

  return Math.min(risk, 95);
}
