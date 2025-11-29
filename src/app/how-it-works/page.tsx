import { Header } from '@/components/header';
import { Search, Database, Target, Zap, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Our Mission Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <img src="/WhatsApp Image 2025-11-07 at 6.10.42 PM.jpeg" alt="Credify.AI" className="h-24 w-auto" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Mission</h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Combat misinformation at scale with AI-powered real-time verification and transparent credibility analysis.
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Credify.AI solves the critical problem of slow, manual fact-checking by providing instant, multilingual verification with bias detection—empowering newsrooms, corporations, government agencies, and the public to make decisions based on verified information.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#E8F4F8]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Our Agentic AI pipeline processes content through multiple verification stages</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 mx-auto">
                <Search className="h-8 w-8 text-gray-700" />
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full mb-4 mx-auto text-sm font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Claim Extraction</h3>
              <p className="text-gray-600 text-center text-sm">
                AI identifies key claims, entities, and factual statements from submitted content.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 mx-auto">
                <Database className="h-8 w-8 text-gray-700" />
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full mb-4 mx-auto text-sm font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Multi-Source Verification</h3>
              <p className="text-gray-600 text-center text-sm">
                Cross-references claims against verified databases, news archives, and fact-checking organizations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 mx-auto">
                <Target className="h-8 w-8 text-gray-700" />
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full mb-4 mx-auto text-sm font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Credibility Scoring</h3>
              <p className="text-gray-600 text-center text-sm">
                Machine learning models analyze evidence quality, source authority, and contextual accuracy.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 mx-auto">
                <Zap className="h-8 w-8 text-gray-700" />
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full mb-4 mx-auto text-sm font-bold">4</div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Instant Results</h3>
              <p className="text-gray-600 text-center text-sm">
                Delivers credibility score, classification, verified sources, and emotional bias analysis in real-time.
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
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Agentic AI Pipeline</h3>
              <p className="text-gray-600">
                Autonomous reasoning with GPT-4o for accurate claim verification and context analysis
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Global Source Network</h3>
              <p className="text-gray-600">
                Integration with Reuters, AFP, PIB, and 50+ verified fact-checking organizations
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
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
