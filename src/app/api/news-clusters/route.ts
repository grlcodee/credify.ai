import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In production, this would cluster actual news items
    // For now, return generated clusters based on trending topics
    
    const clusters = [
      {
        id: '1',
        title: 'Election Updates',
        category: 'Topic Cluster',
        credibility: 'Mixed',
        postsScanned: Math.floor(Math.random() * 200) + 100,
        sentiment: `${Math.floor(Math.random() * 30) + 60}% Negative`,
        sentimentPercent: Math.floor(Math.random() * 30) + 60,
        trend: Math.floor(Math.random() * 40) - 10,
        trendData: Array.from({ length: 12 }, () => Math.floor(Math.random() * 10) + 3),
        icon: '🗳️',
        iconBg: 'bg-purple-50'
      },
      {
        id: '2',
        title: 'Policy Announcements',
        category: 'Topic Cluster',
        credibility: 'High Credibility',
        postsScanned: Math.floor(Math.random() * 150) + 80,
        sentiment: `${Math.floor(Math.random() * 20) + 50}% Negative`,
        sentimentPercent: Math.floor(Math.random() * 20) + 50,
        trend: Math.floor(Math.random() * 20) + 5,
        trendData: Array.from({ length: 12 }, (_, i) => i + 3),
        icon: '📋',
        iconBg: 'bg-green-50'
      },
      {
        id: '3',
        title: 'Health Misinformation',
        category: 'Topic Cluster',
        credibility: 'Low Credibility',
        postsScanned: Math.floor(Math.random() * 250) + 150,
        sentiment: `${Math.floor(Math.random() * 25) + 65}% Negative`,
        sentimentPercent: Math.floor(Math.random() * 25) + 65,
        trend: Math.floor(Math.random() * 15) - 8,
        trendData: Array.from({ length: 12 }, (_, i) => 12 - i),
        icon: '❤️',
        iconBg: 'bg-red-50'
      },
      {
        id: '4',
        title: 'Economic Updates',
        category: 'Topic Cluster',
        credibility: 'High Credibility',
        postsScanned: Math.floor(Math.random() * 120) + 90,
        sentiment: `${Math.floor(Math.random() * 30) + 55}% Negative`,
        sentimentPercent: Math.floor(Math.random() * 30) + 55,
        trend: Math.floor(Math.random() * 25) + 10,
        trendData: Array.from({ length: 12 }, () => Math.floor(Math.random() * 8) + 5),
        icon: '📈',
        iconBg: 'bg-green-50'
      },
      {
        id: '5',
        title: 'Celebrity Claims',
        category: 'Topic Cluster',
        credibility: 'Mixed',
        postsScanned: Math.floor(Math.random() * 180) + 100,
        sentiment: `${Math.floor(Math.random() * 25) + 60}% Negative`,
        sentimentPercent: Math.floor(Math.random() * 25) + 60,
        trend: Math.floor(Math.random() * 30),
        trendData: Array.from({ length: 12 }, () => Math.floor(Math.random() * 6) + 5),
        icon: '⭐',
        iconBg: 'bg-orange-50'
      },
      {
        id: '6',
        title: 'Local Community',
        category: 'Topic Cluster',
        credibility: 'Mixed',
        postsScanned: Math.floor(Math.random() * 100) + 60,
        sentiment: `${Math.floor(Math.random() * 35) + 65}% Negative`,
        sentimentPercent: Math.floor(Math.random() * 35) + 65,
        trend: Math.floor(Math.random() * 50) + 20,
        trendData: Array.from({ length: 12 }, (_, i) => Math.floor(i * 1.5) + 2),
        icon: '👥',
        iconBg: 'bg-gray-50'
      }
    ];

    return NextResponse.json({
      success: true,
      clusters,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error fetching clusters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clusters' },
      { status: 500 }
    );
  }
}
