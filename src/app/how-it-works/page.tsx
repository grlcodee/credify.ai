import { Header } from '@/components/header';
import { Search, Database, Target, Zap, Twitter, Linkedin, Github, Mail, Image, FileText, Link2, Shield, CheckCircle, AlertTriangle, TrendingUp, Chrome, Users, Building2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Our Mission Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <img src="/WhatsApp Image 2025-11-07 at 6.10.42 PM.jpeg" alt="Credify.AI" className="h-24 w-auto" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Mission</h1>
          <p className="text-2xl text-gray-800 max-w-4xl mx-auto mb-6 font-semibold">
            Credify.AI exists to make the internet trustworthy again.
          </p>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Misinformation spreads faster than truth — especially during elections, disasters and public crises.
          </p>
          <div className="bg-white border-l-4 border-teal-500 rounded-lg p-8 max-w-4xl mx-auto shadow-lg mb-8">
            <p className="text-xl text-gray-900 font-semibold mb-4">Our mission is simple:</p>
            <p className="text-lg text-gray-700">
              To give every user an instant, transparent and reliable way to verify any claim — across text, images and links — in seconds.
            </p>
          </div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            We combine real-time data, multimodal AI, and automated verification pipelines to stop misinformation before it spreads.
          </p>
        </div>
      </section>

      {/* Why Credify.AI Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Credify.AI</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
              The biggest problem with today's misinformation tools is that they are slow, manual and limited.
            </p>
            <p className="text-xl text-gray-900 font-semibold">Credify.AI fixes that.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-teal-600" />
                <h3 className="text-xl font-semibold text-gray-900">Instant Verifications</h3>
              </div>
              <p className="text-gray-600">No more waiting for fact-checkers</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Image className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Multimodal Analysis</h3>
              </div>
              <p className="text-gray-600">Text, URLs, images, screenshots</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Search className="h-8 w-8 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">Evidence-First Scoring</h3>
              </div>
              <p className="text-gray-600">Traceable and transparent</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900">Live Dashboard</h3>
              </div>
              <p className="text-gray-600">Real-time alerts and trending misinformation</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Chrome className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Browser Extension</h3>
              </div>
              <p className="text-gray-600">Credibility checks anywhere on the web</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-pink-600" />
                <h3 className="text-xl font-semibold text-gray-900">Fast & Accessible</h3>
              </div>
              <p className="text-gray-600">Fact-checking for everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Our Verification Pipeline Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Our Verification Pipeline Works</h2>
            <p className="text-lg text-gray-600">Our 6-stage Agentic AI pipeline processes content through multiple verification layers</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-teal-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full">
                    <span className="text-2xl font-bold text-teal-600">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-Modal Input</h3>
                  <p className="text-gray-700 mb-4">Users can verify:</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Text claims</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">News articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Social media posts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Images & screenshots</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">URLs</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">Everything converts into a standard format for analysis.</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Automatic Claim Extraction</h3>
                  <p className="text-gray-700 mb-4">
                    Our AI scans the text/image and extracts the primary factual claim.
                  </p>
                  <p className="text-gray-700">
                    If you upload a screenshot or news link, we identify the exact claim that needs verification — not the fluff.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Evidence Retrieval Engine</h3>
                  <p className="text-gray-700 mb-4">We run 4 structured searches:</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ "[claim]"</li>
                      <li>✓ "[claim] fact check"</li>
                      <li>✓ "[claim] debunk"</li>
                      <li>✓ "[claim] verified news"</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 mb-3">We retrieve sources from:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-700">Trusted publishers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-700">Fact-check databases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-700">Recent news</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-700">Government advisories</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-700">High-authority web results</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">This ensures a balanced, evidence-backed view.</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orange-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full">
                    <span className="text-2xl font-bold text-orange-600">4</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Agentic AI Reasoning</h3>
                  <p className="text-gray-700 mb-4">Our AI compares:</p>
                  <ul className="space-y-2 mb-4 text-gray-700">
                    <li>• The extracted claim</li>
                    <li>• The evidence from web search</li>
                    <li>• Source reliability</li>
                    <li>• Consensus among sources</li>
                    <li>• Emotional/bias patterns</li>
                  </ul>
                  <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-lg p-4">
                    <p className="text-gray-900 font-semibold mb-2">It then determines:</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">True</span>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">Misleading</span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">False</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">Unverified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-green-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                    <span className="text-2xl font-bold text-green-600">5</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Credibility Scoring</h3>
                  <p className="text-gray-700 mb-4">Every claim receives:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-1">Credibility Score (0–100)</p>
                      <p className="text-sm text-gray-600">Quantified trustworthiness</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-1">Transparent Verdict</p>
                      <p className="text-sm text-gray-600">Clear classification</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-1">Supporting Sources</p>
                      <p className="text-sm text-gray-600">Full reference list</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-1">Bias Indicators</p>
                      <p className="text-sm text-gray-600">Left/Right/Emotional/Neutral</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-1">Tone & Sentiment</p>
                      <p className="text-sm text-gray-600">Emotional profile</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">Users can see exactly why something is credible or not.</p>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-pink-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full">
                    <span className="text-2xl font-bold text-pink-600">6</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Dashboard & Real-Time Alerts</h3>
                  <p className="text-gray-700 mb-4">
                    Our backend pulls recent news, trends and viral content. We analyze each item using the same pipeline and display:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-pink-600" />
                      <span className="text-gray-700">Trending news</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-pink-600" />
                      <span className="text-gray-700">High-risk misinformation alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-pink-600" />
                      <span className="text-gray-700">Topic clusters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-pink-600" />
                      <span className="text-gray-700">Real-time sentiment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-pink-600" />
                      <span className="text-gray-700">Risk score by topic</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">
                    Journalists, corporates and everyday users can see what's spreading right now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Extension Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-12 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <Chrome className="h-12 w-12" />
                <h2 className="text-4xl font-bold">Browser Extension</h2>
              </div>
              <p className="text-2xl mb-6">Get instant credibility checks anywhere.</p>
              <p className="text-lg mb-8 text-white/90">
                Our Chrome extension reads the active page, extracts claims, runs verification, and shows scores instantly — no copy paste required.
              </p>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-8">
                <p className="text-lg font-semibold mb-4">Perfect for:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Journalists</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Researchers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Students</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Social media users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Corporate teams</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Install Extension
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Credify.AI Different</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
              Credify.AI isn't just another fact-checking app.
            </p>
            <p className="text-xl text-gray-900 font-semibold">
              It's a real-time, multimodal, agentic verification system built for scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-teal-500">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-8 w-8 text-teal-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Reasoning</h3>
              </div>
              <p className="text-gray-600">Not keyword matching</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <Image className="h-8 w-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Multimodal Support</h3>
              </div>
              <p className="text-gray-600">Text + images + links</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Full Transparency</h3>
              </div>
              <p className="text-gray-600">Complete source visibility</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-orange-500">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Real-Time Alerts</h3>
              </div>
              <p className="text-gray-600">Live misinformation tracking</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Multi-Platform</h3>
              </div>
              <p className="text-gray-600">Web app + extension + API</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-pink-500">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-8 w-8 text-pink-600" />
                <h3 className="text-lg font-semibold text-gray-900">Enterprise Ready</h3>
              </div>
              <p className="text-gray-600">Public safety & business use</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Help</h2>
            <p className="text-lg text-gray-600">Empowering diverse audiences with real-time verification</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-teal-200">
              <Users className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">General Public</h3>
              <p className="text-gray-600">Verify viral posts instantly</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-200">
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Journalists</h3>
              <p className="text-gray-600">Evidence-backed fact checks</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-purple-200">
              <Building2 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Corporates</h3>
              <p className="text-gray-600">Crisis monitoring & brand protection</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-orange-200">
              <Globe className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Government/NGOs</h3>
              <p className="text-gray-600">Misinformation surveillance dashboards</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-green-200">
              <Target className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Students & Educators</h3>
              <p className="text-gray-600">Learn media literacy</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-pink-200">
              <Shield className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Everyone</h3>
              <p className="text-gray-600">Make informed decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">The Vision</h2>
            <p className="text-2xl mb-6 font-semibold">
              To become the global standard for real-time credibility scoring —
            </p>
            <p className="text-xl mb-8">
              across news, social media, images, videos and AI-generated content.
            </p>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <p className="text-2xl font-semibold">
                We envision a world where misinformation can be stopped before it causes harm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise-Grade Technology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Technology</h2>
            <p className="text-lg text-gray-600">Built on advanced AI with real-time processing, multilingual support, and seamless enterprise integration</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Agentic AI Pipeline</h3>
              <p className="text-gray-600">
                Autonomous reasoning with GPT-4o for accurate claim verification and context analysis
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Global Source Network</h3>
              <p className="text-gray-600">
                Integration with Reuters, AFP, PIB, and 50+ verified fact-checking organizations
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Multilingual AI Support</h3>
              <p className="text-gray-600">
                Native support for 15+ languages including Hindi, Spanish, Arabic, Chinese, French, and more with cultural context understanding
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA Footer Section */}
      <footer className="w-full bg-[#0D0D0D] text-gray-300">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Start Verifying Content in Real Time</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">Join newsrooms, corporations, and government agencies using Credify.AI to combat misinformation at scale</p>
            <div className="mt-6">
              <Button size="lg" className="bg-white text-black px-8 py-4 rounded-full">Get Started Free</Button>
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
