'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Search, Filter, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

interface Alert {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  category: string;
  timestamp: string;
}

interface NewsItem {
  id: string;
  title: string;
  score: number;
  verdict: 'True' | 'False' | 'Misleading';
  sentiment: 'Emotional' | 'Neutral' | 'Right';
  region: string;
  language: string;
  timestamp: string;
  propagation: number;
  image?: string;
}

interface NewsCluster {
  id: string;
  title: string;
  category: string;
  credibility: 'High Credibility' | 'Low Credibility' | 'Mixed';
  postsScanned: number;
  sentiment: string;
  sentimentPercent: number;
  trend: number;
  trendData: number[];
  icon: string;
}

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [clusters, setClusters] = useState<NewsCluster[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Mock alerts data
    setAlerts([
      {
        id: '1',
        severity: 'HIGH',
        title: 'Potential Misinformation Spike',
        description: 'Rapid spread of unverified claims about electoral procedures in Maharashtra',
        category: 'Election Misinformation',
        timestamp: '2 min ago'
      },
      {
        id: '2',
        severity: 'MEDIUM',
        title: 'Emotional Manipulation Detected',
        description: 'Surge in emotionally charged narratives targeting specific communities',
        category: 'Emotional Outrage',
        timestamp: '15 min ago'
      },
      {
        id: '3',
        severity: 'MEDIUM',
        title: 'Crisis Narrative Trend',
        description: 'Coordinated sharing of crisis-related false information across platforms',
        category: 'Crisis Narratives',
        timestamp: '32 min ago'
      }
    ]);

    // Mock news items
    setNewsItems([
      {
        id: '1',
        title: 'Video claiming to show election fraud goes viral',
        score: 23,
        verdict: 'False',
        sentiment: 'Emotional',
        region: 'Maharashtra - Marathi',
        language: 'Marathi',
        timestamp: '5 min ago',
        propagation: 85,
        image: '📦'
      },
      {
        id: '2',
        title: 'Government announces new digital verification policy',
        score: 92,
        verdict: 'True',
        sentiment: 'Neutral',
        region: 'Delhi - Hindi',
        language: 'Hindi',
        timestamp: '12 min ago',
        propagation: 42,
        image: '🏛️'
      },
      {
        id: '3',
        title: 'Health ministry warning about vaccine side effects',
        score: 48,
        verdict: 'Misleading',
        sentiment: 'Emotional',
        region: 'Karnataka - Kannada',
        language: 'Kannada',
        timestamp: '20 min ago',
        propagation: 67,
        image: '💉'
      },
      {
        id: '4',
        title: 'Celebrity endorsement of controversial product',
        score: 34,
        verdict: 'Misleading',
        sentiment: 'Right',
        region: 'Tamil Nadu - Tamil',
        language: 'Tamil',
        timestamp: '28 min ago',
        propagation: 53,
        image: '🎭'
      }
    ]);

    // Mock clusters
    setClusters([
      {
        id: '1',
        title: 'Election Rumors',
        category: 'Topic Cluster',
        credibility: 'Low Credibility',
        postsScanned: 248,
        sentiment: '89% Negative',
        sentimentPercent: 89,
        trend: -2,
        trendData: [8, 7, 9, 8, 9, 10, 9, 8, 7, 6, 5, 4],
        icon: '🗳️'
      },
      {
        id: '2',
        title: 'Policy Announcements',
        category: 'Topic Cluster',
        credibility: 'High Credibility',
        postsScanned: 156,
        sentiment: '64% Negative',
        sentimentPercent: 64,
        trend: 9,
        trendData: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        icon: '📋'
      },
      {
        id: '3',
        title: 'Celebrity Claims',
        category: 'Topic Cluster',
        credibility: 'Mixed',
        postsScanned: 189,
        sentiment: '60% Negative',
        sentimentPercent: 60,
        trend: 1,
        trendData: [6, 6, 7, 7, 8, 8, 9, 9, 8, 8, 7, 7],
        icon: '⭐'
      },
      {
        id: '4',
        title: 'Health Misinformation',
        category: 'Topic Cluster',
        credibility: 'Low Credibility',
        postsScanned: 312,
        sentiment: '62% Negative',
        sentimentPercent: 62,
        trend: -4,
        trendData: [10, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5],
        icon: '❤️'
      },
      {
        id: '5',
        title: 'Local Community',
        category: 'Topic Cluster',
        credibility: 'Mixed',
        postsScanned: 94,
        sentiment: '85% Negative',
        sentimentPercent: 85,
        trend: 48,
        trendData: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        icon: '👥'
      },
      {
        id: '6',
        title: 'Economic Updates',
        category: 'Topic Cluster',
        credibility: 'High Credibility',
        postsScanned: 127,
        sentiment: '74% Negative',
        sentimentPercent: 74,
        trend: 23,
        trendData: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        icon: '📈'
      }
    ]);

    return () => clearInterval(timer);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'bg-red-100 text-red-700 border-red-300';
      case 'MEDIUM': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'LOW': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'True': return 'bg-green-100 text-green-700';
      case 'False': return 'bg-red-100 text-red-700';
      case 'Misleading': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCredibilityColor = (credibility: string) => {
    if (credibility.includes('High')) return 'bg-green-500 text-white';
    if (credibility.includes('Low')) return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-16"></div>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-sm">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Live Updates Every 30s
            </span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">Live Misinformation Dashboard</h1>
          <p className="text-lg text-gray-600 mb-6">
            Real-time credibility insights on trending news, posts, and online narratives.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Live Updates Every 30s</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <TrendingUp className="h-4 w-4 text-teal-500" />
              <span className="text-sm font-medium">Multilingual Insights</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <AlertTriangle className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Agentic AI Verified</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm font-medium">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news, alerts, or clusters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="px-6"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-teal-600" />
                  <h3 className="text-lg font-semibold">Filters</h3>
                </div>
                <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option>All Languages</option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Regions</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option>All Regions</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Karnataka</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option>All Platforms</option>
                    <option>Twitter</option>
                    <option>Facebook</option>
                    <option>WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option>All Status</option>
                    <option>Verified</option>
                    <option>Unverified</option>
                    <option>Flagged</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real-Time Alerts */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900">Real-Time Alerts</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <div key={alert.id} className={`border-l-4 rounded-lg p-6 bg-white ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white">
                    {alert.severity}
                  </span>
                  <span className="text-sm text-gray-500">{alert.timestamp}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{alert.title}</h3>
                <p className="text-sm text-gray-700 mb-4">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{alert.category}</span>
                  <Activity className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending News Feed */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-teal-600" />
            <h2 className="text-3xl font-bold text-gray-900">Trending News Feed</h2>
            <span className="ml-auto text-sm text-gray-500">Real-time stream • Updated 30s ago</span>
          </div>

          <div className="space-y-4">
            {newsItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">📊</span>
                        <span className="font-bold">{item.score}/100</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getVerdictColor(item.verdict)}`}>
                        {item.verdict}
                      </span>
                      <span className="text-gray-500">⭐ {(item.score / 20).toFixed(1)}/5</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.sentiment === 'Emotional' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.sentiment}
                      </span>
                      <span className="text-gray-600">📍 {item.region}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">🕒 {item.timestamp}</span>
                      <span className="text-sm text-gray-600">📡 Propagation: {item.propagation}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending News Clusters */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">✨</span>
                <h2 className="text-3xl font-bold text-gray-900">Trending News Clusters (Real-Time)</h2>
              </div>
              <p className="text-gray-600">AI-powered topic detection and credibility analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Showing 1-4 of 10 items</span>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-gray-400 border border-gray-200 rounded-lg">Previous</button>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg">{currentPage}</button>
                <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg">2</button>
                <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg">3</button>
                <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg">Next →</button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-600">Legend:</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm">Mostly True</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              <span className="text-sm">Mixed/Misleading</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="text-sm">Mostly False</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {clusters.map((cluster) => (
              <div key={cluster.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {cluster.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{cluster.title}</h3>
                    <p className="text-sm text-gray-500">{cluster.category}</p>
                  </div>
                </div>

                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${getCredibilityColor(cluster.credibility)}`}>
                  {cluster.credibility}
                </span>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Activity Trend (24h)</span>
                    <span className={`text-sm font-semibold ${cluster.trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {cluster.trend > 0 ? '📈' : '📉'} {cluster.trend > 0 ? '+' : ''}{cluster.trend}%
                    </span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {cluster.trendData.map((value, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t ${
                          cluster.credibility.includes('High') ? 'bg-green-500' :
                          cluster.credibility.includes('Low') ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                        style={{ height: `${(value / 15) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">📡 Posts Scanned</span>
                    <span className="font-semibold">{cluster.postsScanned} posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">📊 Sentiment</span>
                    <span className="font-semibold text-red-600">{cluster.sentiment}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View Cluster →
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
