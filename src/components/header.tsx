'use client';

import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M85.5,50 C85.5,70.187 69.687,86.5 50,86.5 C30.313,86.5 14.5,70.187 14.5,50 C14.5,29.813 30.313,13.5 50,13.5 C69.687,13.5 85.5,29.813 85.5,50 Z"
              stroke="#FFF"
              strokeWidth="1"
            ></path>
            <path
              d="M50,90 C27.908609,90 10,72.091391 10,50 C10,27.908609 27.908609,10 50,10 C72.091391,10 90,27.908609 90,50 C90,63.221532 83.056031,74.804862 72.834015,81.688539"
              stroke="#8BC34A"
              strokeWidth="10"
              fill="none"
            ></path>
            <path
              d="M84.448103,42.02989 C88.05284,49.950798 86.87815,59.501533 81.35515,66.581845"
              stroke="#2196F3"
              strokeWidth="10"
              fill="none"
            ></path>
            <path
              d="M33.6,35.4 C33.6,35.4 33.6,35.4 33.6,35.4 L50,25 L66.4,35.4 C66.4,35.4 66.4,35.4 66.4,35.4 L66.4,54.6 C66.4,60.6 62.4,66.6 56.4,66.6 L50,70 L43.6,66.6 C37.6,66.6 33.6,60.6 33.6,54.6 L33.6,35.4 Z"
              fill="#FFFFFF"
            ></path>
          </svg>
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
