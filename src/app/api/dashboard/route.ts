import { NextResponse } from 'next/server';

// Mock news sources - replace with actual RSS feeds or News API
const NEWS_SOURCES = [
  'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
  'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml',
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'news';

  try {
    // For now, return mock data
    // TODO: Implement actual news fetching and analysis
    
    if (type === 'alerts') {
      return NextResponse.json({
        data: [
          {
            id: '1',
            severity: 'HIGH',
            title: 'Potential Misinformation Spike',
            description: 'Rapid spread of unverified claims about electoral procedures',
            category: 'Election Misinformation',
            timestamp: new Date().toISOString()
          }
        ]
      });
    }

    if (type === 'news') {
      return NextResponse.json({
        data: [
          {
            id: '1',
            title: 'Breaking News Item',
            score: 85,
            verdict: 'True',
            sentiment: 'Neutral',
            region: 'National',
            timestamp: new Date().toISOString()
          }
        ]
      });
    }

    if (type === 'clusters') {
      return NextResponse.json({
        data: [
          {
            id: '1',
            title: 'Topic Cluster',
            credibility: 'High Credibility',
            postsScanned: 100,
            sentiment: '70% Positive',
            trend: 5
          }
        ]
      });
    }

    return NextResponse.json({ data: [] });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
