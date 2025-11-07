import ContentAnalyzer from '@/components/content-analyzer';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container mx-auto flex items-center gap-2 px-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-headline">Veritas AI</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-3 bg-gradient-to-r from-primary to-accent/80 text-transparent bg-clip-text">
              Uncover the Truth
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Paste any text, article, or link below to get an instant credibility analysis from our advanced AI engine.
            </p>
          </section>
          <ContentAnalyzer />
        </div>
      </main>
      <footer className="p-4 border-t mt-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Veritas AI. Empowering truth through technology.
        </div>
      </footer>
    </div>
  );
}
