
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Twitter, Linkedin, Puzzle, Mail, HelpCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0D123B] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-white rounded-md p-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.5 16.5L6 12L7.41 10.59L10.5 13.67L16.59 7.59L18 9L10.5 16.5Z" fill="#1A237E"/>
                    </svg>
                </div>
              <h1 className="text-2xl font-bold">Credify.AI</h1>
            </div>
            <p className="text-gray-400 max-w-md">
              Real-time AI verification for news, social media, and messaging platforms. Serving media organizations, corporations, government agencies, and millions of users globally.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 border-white/20">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 border-white/20">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 border-white/20">
                <Puzzle className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 border-white/20">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-white">Features</Link></li>
              <li><Link href="#" className="hover:text-white">API Documentation</Link></li>
              <li><Link href="#" className="hover:text-white">Browser Plugin</Link></li>
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Credify.AI. All rights reserved.</p>
            <Button variant="outline" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20 border-white/20">
                <HelpCircle className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </footer>
  );
}
