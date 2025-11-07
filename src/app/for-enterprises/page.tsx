import { Header } from '@/components/header';

export default function ForEnterprises() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1A237E] via-[#151E60] to-[#0D123B]">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 pt-20">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            For Enterprises
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Information about enterprise solutions and plans will be displayed here.
          </p>
        </div>
      </main>
    </div>
  );
}
