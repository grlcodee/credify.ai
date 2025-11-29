'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Search, Filter, TrendingUp, AlertTriangle, Activity, Twitter, Linkedin, Github, Mail, X } from 'lucide-react';

interface Alert {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  category: string;
  timestamp: string;
  link?: string;
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
  link?: string;
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
  iconBg: string;
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

  // Fetch real data from APIs
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Initial data fetch
    fetchAlerts();
    fetchNewsFeed();
    fetchClusters();

    // Poll for updates every 30 seconds
    const alertsInterval = setInterval(fetchAlerts, 30000);
    const newsInterval = setInterval(fetchNewsFeed, 30000);
    const clustersInterval = setInterval(fetchClusters, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(alertsInterval);
      clearInterval(newsInterval);
      clearInterval(clustersInterval);
    };
  }, []);

  const fetchAlerts = async () => {
    try {
      // Fetch real trending news from Google News RSS
      const response = await fetch('/api/fetch-trending');
      const data = await response.json();
      
      if (data.success && data.items && data.items.length > 0) {
        // Transform news items to alert format - show top 3 trending news
        const transformedAlerts = data.items.slice(0, 3).map((item: any) => {
          // Determine severity based on alert triggers
          let severity: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
          if (item.riskLevel > 80) severity = 'HIGH';
          else if (item.riskLevel > 60) severity = 'MEDIUM';
          
          return {
            id: item.id,
            severity: severity,
            title: item.title,
            description: item.claim || item.content?.slice(0, 150) || 'Breaking news alert',
            category: item.platform || 'Google News',
            timestamp: getRelativeTime(item.timestamp),
            link: item.link
          };
        });
        
        setAlerts(transformedAlerts);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const fetchNewsFeed = async () => {
    try {
      const response = await fetch('/api/news-feed');
      const data = await response.json();
      
      if (data.success && data.items) {
        setNewsItems(data.items.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching news feed:', error);
    }
  };

  const fetchClusters = async () => {
    try {
      const response = await fetch('/api/news-clusters');
      const data = await response.json();
      
      if (data.success && data.clusters) {
        setClusters(data.clusters);
      }
    } catch (error) {
      console.error('Error fetching clusters:', error);
    }
  };

  const getRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

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
            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-900">
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
              <span className="text-sm font-medium text-gray-900">Live Updates Every 30s</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <TrendingUp className="h-4 w-4 text-teal-500" />
              <span className="text-sm font-medium text-gray-900">Multilingual Insights</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <AlertTriangle className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-900">Agentic AI Verified</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm font-medium text-gray-900" suppressHydrationWarning>{currentTime.toLocaleTimeString()}</span>
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
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
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
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-teal-600" />
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                </div>
                <button 
                  onClick={() => setShowFilters(false)} 
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Languages</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>All Languages</option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                    <option>Kannada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Regions</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>All Regions</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Karnataka</option>
                    <option>Tamil Nadu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>All Platforms</option>
                    <option>Twitter</option>
                    <option>Facebook</option>
                    <option>WhatsApp</option>
                    <option>Instagram</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>All Status</option>
                    <option>Verified</option>
                    <option>Unverified</option>
                    <option>Flagged</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowFilters(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
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
            {alerts.map((alert) => {
              const borderColor = alert.severity === 'HIGH' ? 'border-l-red-500' : 
                                 alert.severity === 'MEDIUM' ? 'border-l-orange-500' : 
                                 'border-l-yellow-500';
              const bgColor = alert.severity === 'HIGH' ? 'bg-red-50' : 
                             alert.severity === 'MEDIUM' ? 'bg-orange-50' : 
                             'bg-yellow-50';
              const textColor = alert.severity === 'HIGH' ? 'text-red-700' : 
                               alert.severity === 'MEDIUM' ? 'text-orange-700' : 
                               'text-yellow-700';
              
              const AlertCard = () => (
                <div className={`border-l-4 ${borderColor} ${bgColor} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white ${textColor}`}>
                      {alert.severity}
                    </span>
                    <span className="text-sm text-gray-500">{alert.timestamp}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-teal-600">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{alert.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{alert.category}</span>
                    <Activity className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              );
              
              return alert.link ? (
                <a key={alert.id} href={alert.link} target="_blank" rel="noopener noreferrer" className="block">
                  <AlertCard />
                </a>
              ) : (
                <div key={alert.id}>
                  <AlertCard />
                </div>
              );
            })}
          </div>
        </section>

        {/* Trending News Feed */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-teal-600" />
              <h2 className="text-3xl font-bold text-gray-900">Trending News Feed</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Real-time stream • Updated 30s ago</span>
              <span className="text-sm text-gray-500 ml-4">Showing 1-4 of 10 items</span>
            </div>
          </div>

          <div className="space-y-4">
            {newsItems.map((item) => {
              const scoreColor = item.score >= 80 ? 'bg-green-500' : 
                                item.score >= 60 ? 'bg-blue-500' : 
                                item.score >= 40 ? 'bg-orange-500' : 
                                'bg-red-500';
              
              return (
                <a 
                  key={item.id} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-32 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl overflow-hidden relative">
                      {item.image}
                      <div className="absolute top-2 right-2">
                        <div className={`${scoreColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                          {item.score}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-teal-600 cursor-pointer">{item.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getVerdictColor(item.verdict)}`}>
                          {item.verdict === 'True' ? '✓ ' : item.verdict === 'False' ? '✗ ' : '⚠ '}
                          {item.verdict}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.sentiment === 'Emotional' ? 'bg-purple-100 text-purple-700' : 
                          item.sentiment === 'Right' ? 'bg-blue-100 text-blue-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.sentiment}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <span>📍</span> {item.region}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <span>🌐</span> {item.language}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">🕒 {item.timestamp}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600 font-medium">📡 Propagation: {item.propagation}%</span>
                          <span className="text-teal-600 hover:text-teal-700 font-medium">View Details →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
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
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-gray-400 border border-gray-200 rounded-lg">Previous</button>
              <button className="px-4 py-2 bg-teal-500 text-white rounded-lg">{currentPage}</button>
              <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg">2</button>
              <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg">3</button>
              <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg">Next →</button>
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
            {clusters.map((cluster) => {
              const credibilityColor = cluster.credibility.includes('High') ? 'bg-green-500' :
                                      cluster.credibility.includes('Low') ? 'bg-red-500' : 
                                      'bg-orange-500';
              const trendColor = cluster.credibility.includes('High') ? 'bg-green-400' :
                                cluster.credibility.includes('Low') ? 'bg-red-400' : 
                                'bg-orange-400';
              
              return (
                <div key={cluster.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all hover:border-teal-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-14 h-14 ${cluster.iconBg} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                      {cluster.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{cluster.title}</h3>
                      <p className="text-xs text-gray-500">{cluster.category}</p>
                    </div>
                  </div>

                  <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 ${credibilityColor} text-white`}>
                    {cluster.credibility}
                  </span>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-gray-600">Activity Trend (24h)</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${cluster.trend > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {cluster.trend > 0 ? '↗' : '↘'} {cluster.trend > 0 ? '+' : ''}{cluster.trend}%
                      </span>
                    </div>
                    <div className="flex items-end gap-0.5 h-14">
                      {cluster.trendData.map((value, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 rounded-t ${trendColor} transition-all hover:opacity-75`}
                          style={{ height: `${(value / 15) * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">📡 Posts Scanned</span>
                      <span className="font-bold text-gray-900">{cluster.postsScanned} posts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">📊 Sentiment</span>
                      <span className="font-bold text-red-600">{cluster.sentiment}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full hover:bg-teal-50 hover:border-teal-500 hover:text-teal-700 transition-colors">
                    View Cluster →
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer matching home page */}
      <footer className="w-full bg-[#0D0D0D] text-gray-300">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Start Verifying Content in Real Time</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">Join newsrooms, corporations, and government agencies using Credify.AI to combat misinformation at scale</p>
            <div className="mt-6">
              <Button size="lg" className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200">Get Started Free</Button>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src="/WhatsApp Image 2025-11-07 at 6.10.42 PM.jpeg" alt="Credify.AI" className="h-10 w-auto" />
                </div>
                <p className="text-gray-400">Real-time AI verification for news, social media, and messaging platforms. Serving media organizations, corporations, government agencies, and millions of users globally.</p>
                <div className="flex gap-3 mt-6">
                  <a className="p-2 bg-gray-800 rounded flex items-center justify-center text-gray-400 hover:text-white" href="#">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a className="p-2 bg-gray-800 rounded flex items-center justify-center text-gray-400 hover:text-white" href="#">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a className="p-2 bg-gray-800 rounded flex items-center justify-center text-gray-400 hover:text-white" href="#">
                    <Github className="h-5 w-5" />
                  </a>
                  <a className="p-2 bg-gray-800 rounded flex items-center justify-center text-gray-400 hover:text-white" href="#">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="">
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Features</li>
                  <li>API Documentation</li>
                  <li>Browser Plugin</li>
                  <li>Pricing</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About Us</li>
                  <li>Blog</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-500 flex items-center justify-between">
              <div>© 2025 Credify.AI. Enterprise misinformation detection powered by Agentic AI.</div>
              <div className="flex gap-6">
                <a className="hover:underline">Privacy Policy</a>
                <a className="hover:underline">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
