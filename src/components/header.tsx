'use client';

import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
           <div className="bg-white rounded-md p-1">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.5 16.5L6 12L7.41 10.59L10.5 13.67L16.59 7.59L18 9L10.5 16.5Z" fill="#1A237E"/>
              </svg>
          </div>
          <h1 className="text-2xl font-bold">Credify.AI</h1>
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
