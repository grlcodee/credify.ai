'use client';

import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-900 rounded-md">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Credify.Ai</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors relative group">
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors relative group">
            <span>How It Works</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors relative group">
            <span>For Enterprises</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors relative group">
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-600 hover:bg-gray-100 hover:text-primary">Login</Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-full text-primary-foreground">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
