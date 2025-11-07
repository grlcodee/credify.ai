'use client';

import ContentAnalyzer from '@/components/content-analyzer';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1A237E] via-[#151E60] to-[#0D123B]">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4">
        <div className="w-full max-w-4xl text-center">
          <section className="mb-8">
            <div className="inline-flex items-center rounded-full bg-glass px-4 py-1.5 text-sm font-medium text-white mb-4">
              <span className="mr-2">✨</span>
              Real-Time AI Verification
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
              Combat Misinformation in Real Time
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              AI-powered credibility analysis for news, social media, and messaging apps — with verified sources, bias detection, and multilingual support.
            </p>
          </section>
          <ContentAnalyzer />
        </div>
      </main>
      <section className="w-full py-20 bg-[#0D123B] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Start Verifying Content in Real Time</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Join newsrooms, corporations, and government agencies using Credify.AI to combat misinformation at scale
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-lg text-lg">
            Get Started Free
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
