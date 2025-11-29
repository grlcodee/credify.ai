'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white text-black shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/WhatsApp Image 2025-11-07 at 6.10.42 PM.jpeg"
            alt="Credify AI"
            width={50}
            height={50}
            className="h-12 w-auto"
          />
          <span className="text-2xl font-bold text-gray-900">Credify.AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
            Live Dashboard
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="/for-enterprises" className="text-gray-600 hover:text-primary transition-colors">
            For Enterprises
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-600 hover:bg-gray-100 hover:text-primary">Login</Button>
          <Button className="bg-black hover:bg-gray-800 rounded-full text-white">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
