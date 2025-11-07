'use client';

import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Credify.Ai</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">How It Works</Link>
          <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">For Enterprises</Link>
          <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Login</Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-full">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
