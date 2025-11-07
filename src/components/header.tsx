'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/WhatsApp Image 2025-11-07 at 6.10.42 PM.jpeg"
            alt="Credify.AI Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
            <span>How It Works</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link href="/for-enterprises" className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
            <span>For Enterprises</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-300 hover:bg-white/10 hover:text-white">Login</Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-full text-primary-foreground">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
