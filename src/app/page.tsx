import ContentAnalyzer from '@/components/content-analyzer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

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
      <footer className="fixed bottom-4 right-4">
          <Button variant="outline" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20 border-white/20">
            <HelpCircle className="h-5 w-5" />
          </Button>
      </footer>
    </div>
  );
}
