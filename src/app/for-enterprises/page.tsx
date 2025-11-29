import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Code, Globe, BarChart3, Zap, Shield, Users, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function ForEnterprises() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <img src="/WhatsApp Image 2025-11-07 at 6.10.42 PM.jpeg" alt="Credify.AI" className="h-24 w-auto" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Enterprise-Grade Misinformation Detection
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Seamlessly integrate real-time verification into newsrooms, corporate communications, and public sector workflows with our AI-powered API and browser extensions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 rounded-full">
              Request Demo
            </Button>
            <Button variant="outline" className="bg-[#E8F4F8] text-gray-900 hover:bg-[#D0E8F0] border-0 text-lg px-8 py-6 rounded-full">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Enterprise Features Section */}
      <section className="py-20 bg-[#E8F4F8]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise Features</h2>
            <p className="text-lg text-gray-600">
              Everything you need to protect your organization from misinformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* API Integration */}
            <div className="bg-white rounded-xl p-8 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6">
                <Code className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">API Integration</h3>
              <p className="text-gray-600">
                RESTful API for seamless integration into CMS, newsroom tools, and communication platforms.
              </p>
            </div>

            {/* Multilingual Verification */}
            <div className="bg-white rounded-xl p-8 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6">
                <Globe className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Multilingual Verification</h3>
              <p className="text-gray-600">
                Real-time fact-checking in 15+ languages including English, Hindi, Spanish, Arabic, Chinese, French, German, Japanese, and more with cultural context awareness.
              </p>
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-white rounded-xl p-8 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6">
                <BarChart3 className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Track misinformation trends, verification metrics, and team performance in real-time.
              </p>
            </div>

            {/* Instant Processing */}
            <div className="bg-white rounded-xl p-8 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6">
                <Zap className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Instant Processing</h3>
              <p className="text-gray-600">
                Sub-second verification with credibility scores, source validation, and bias detection.
              </p>
            </div>

            {/* Enterprise Security */}
            <div className="bg-white rounded-xl p-8 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6">
                <Shield className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600">
                SOC 2 compliant infrastructure with end-to-end encryption and data privacy controls.
              </p>
            </div>

            {/* Team Management */}
            <div className="bg-white rounded-xl p-8 shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6">
                <Users className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Management</h3>
              <p className="text-gray-600">
                Role-based access, workflow automation, and collaborative verification queues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Uses Credify.AI Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Uses Credify.AI?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Media & Newsrooms */}
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Media & Newsrooms</h3>
              <p className="text-gray-600">
                Pre-publication verification and source validation
              </p>
            </div>

            {/* Corporates & PR Teams */}
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Corporates & PR Teams</h3>
              <p className="text-gray-600">
                Brand protection and reputation management
              </p>
            </div>

            {/* Government & Public Sector */}
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Government & Public Sector</h3>
              <p className="text-gray-600">
                Crisis response and public communication integrity
              </p>
            </div>

            {/* NGOs & Civil Society */}
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">NGOs & Civil Society</h3>
              <p className="text-gray-600">
                Combating disinformation in communities
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
