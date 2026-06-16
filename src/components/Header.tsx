'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronRight, MapPin, Mail, User, Instagram, MessageCircle, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useSiteContent } from '@/lib/siteContent';

const navLinks = [
  { label: 'Haqqımızda', href: '#about' },
  { label: 'Xidmətlər', href: '#services' },
  { label: 'Həkimlər', href: '#doctors' },
  { label: 'Bloq', href: '#blog' },
  { label: 'Əlaqə', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { content } = useSiteContent();
  const hdr = content.header;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Bar */}
        <div className={`hidden lg:block bg-gray-50/95 backdrop-blur-sm border-b border-gray-100 text-xs text-gray-500 py-2 transition-all duration-300 ${
          scrolled ? 'max-h-0 py-0 opacity-0 overflow-hidden border-b-0' : 'max-h-10 opacity-100'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#76c122]" />
                {hdr.address}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Mail className="w-3.5 h-3.5 text-[#76c122]" />
                {hdr.email}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/994993014444" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#76c122] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/regionalmualicemerkezi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#76c122] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/regionalmualicemerkezi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#76c122] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-green-100/30 border-b border-gray-100'
              : 'bg-white/90 backdrop-blur-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-18 py-3">
              {/* Logo */}
              <a href="#hero" className="flex items-center gap-3 group">
                <div className="relative w-11 h-11 flex-shrink-0">
                  <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                {/* Mobile-only brand name beside logo */}
                <span className="block md:hidden text-sm font-bold ml-2 max-w-[190px] leading-tight" style={{ color: '#3f7215', fontFamily: 'Raleway, sans-serif' }}>
                  Regional Müalicə və Reabilitasiya Mərkəzi
                </span>
                {/* Desktop brand name (hidden on mobile) */}
                <div className="hidden sm:block">
                  <span className="block text-[13px] leading-tight" style={{ fontFamily: 'Raleway, sans-serif', color: '#3f7215', fontWeight: 800 }}>
                    Regional Müalicə və
                  </span>
                  <span className="block text-[13px] leading-tight" style={{ fontFamily: 'Raleway, sans-serif', color: '#3f7215', fontWeight: 800 }}>
                    Reabilitasiya Mərkəzi
                  </span>
                </div>
              </a>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#76c122] rounded-full hover:bg-green-50 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Right side */}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:+994${hdr.phone.replace(/[^0-9]/g, '').slice(-9)}`}
                  className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#3f7215] hover:text-[#76c122] transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#76c122]" />
                  </div>
                  <span>{hdr.phone}</span>
                </a>

                <a
                  id="header-appointment-btn"
                  href="https://wa.me/994993014444?text=Salam,%20klinikada%20qəbula%20yazılmaq%20istəyirəm."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center justify-center btn-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
                >
                  Qəbula yazıl
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>

                {/* Mobile menu */}
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger
                    render={
                      <button className="lg:hidden p-2 text-gray-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
                        <Menu className="w-5 h-5" />
                      </button>
                    }
                  />
                  <SheetContent side="right" className="w-72">
                    <div className="flex flex-col gap-4 mt-8">
                      <a
                        href="#hero"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 pb-4 border-b border-green-100 group"
                      >
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#3f7215]">Regional Müalicə və</p>
                          <p className="text-xs font-bold text-[#3f7215]">Reabilitasiya Mərkəzi</p>
                        </div>
                      </a>
                      {navLinks.map(link => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-gray-700 hover:text-[#76c122] hover:bg-green-50 rounded-lg font-medium transition-all"
                        >
                          <ChevronRight className="w-4 h-4 text-[#76c122]" />
                          {link.label}
                        </a>
                      ))}
                      <a
                        href="tel:+994993014444"
                        className="flex items-center gap-2 px-3 py-2.5 mt-2 bg-green-50 rounded-xl font-semibold text-[#3f7215]"
                      >
                        <Phone className="w-4 h-4" />
                        099 301 44 44
                      </a>
                      <a
                        href="https://wa.me/994993014444?text=Salam,%20klinikada%20qəbula%20yazılmaq%20istəyirəm."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center btn-primary text-white py-3 rounded-full font-semibold cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
                      >
                        Qəbula yazıl
                      </a>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
