
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Twitter, Linkedin, Puzzle, Mail, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0D123B] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
                <Image
                    src="/WhatsApp Image 2025-11-07 at 6.10.42 PM.jpeg"
                    alt={t('header.title', 'Credify AI')}
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                />
            </div>
            <p className="text-gray-400 max-w-md">
              {t('footer.about', 'Real-time AI verification for news, social media, and messaging platforms. Serving media organizations, corporations, government agencies, and millions of users globally.')}
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
            <h3 className="font-bold text-lg mb-4">{t('footer.product', 'Product')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-white">{t('footer.links.features','Features')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('footer.links.api','API Documentation')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('footer.links.plugin','Browser Plugin')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('footer.links.pricing','Pricing')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.company', 'Company')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-white">{t('footer.links.about','About Us')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('footer.links.blog','Blog')}</Link></li>
              <li><Link href="#" className="hover:text-white">{t('footer.links.careers','Careers')}</Link></li>
              <li><Link href="/contact" className="hover:text-white">{t('nav.contact','Contact')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex justify-between items-center">
            <p className="text-gray-500 text-sm">{t('footer.copyright', `© ${new Date().getFullYear()} Credify.AI. All rights reserved.`)}</p>
            <Button variant="outline" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20 border-white/20">
                <HelpCircle className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </footer>
  );
}
