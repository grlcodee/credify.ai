import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send, Twitter, Linkedin, Github } from 'lucide-react';

export default function Contact() {
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
            Contact Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Questions about enterprise integration, API access, or custom solutions? Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#E8F4F8]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Enterprise Access</h2>
              <p className="text-lg text-gray-600 mb-12">
                Reach out for API documentation, pricing, or to schedule a demo with our verification experts.
              </p>

              {/* Email Card */}
              <div className="bg-white rounded-xl p-8 shadow mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                    <Mail className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">contact@credify.ai</p>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-white rounded-xl p-8 shadow">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Support</h3>
                    <p className="text-gray-600">support@credify.ai</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow">
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-gray-50 border-0 text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full bg-gray-50 border-0 text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    rows={6}
                    className="w-full bg-gray-50 border-0 text-gray-900 placeholder:text-gray-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6 rounded-lg">
                  <Send className="h-5 w-5 mr-2" />
                  Submit Inquiry
                </Button>
              </div>
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
