'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Award, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSiteContent } from '@/lib/siteContent';

export default function Hero() {
  const { content } = useSiteContent();
  const h = content.hero;

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center pt-28 pb-12 lg:pb-0 overflow-hidden bg-white border-b border-gray-100"
    >
      {/* RIGHT: Doctor Image - fills the background on the right */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 opacity-40 lg:opacity-100">
        <Image
          src={h.imageUrl || '/doctor-1.png'}
          alt="Doctor Hero"
          fill
          className="object-cover object-center lg:object-left-top select-none"
          priority
          unoptimized
        />
      </div>

      {/* MOBILE Gradient Overlay (Top to Bottom) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none lg:hidden"
        style={{
          background: 'linear-gradient(180deg, #f4fae8 0%, rgba(244, 250, 232, 0.98) 45%, rgba(244, 250, 232, 0.9) 65%, rgba(244, 250, 232, 0.3) 100%)'
        }}
      />
      
      {/* DESKTOP Gradient Overlay (Left to Right) */}
      <div 
        className="hidden lg:block absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #f4fae8 0%, #f4fae8 38%, rgba(244, 250, 232, 0.95) 48%, rgba(244, 250, 232, 0.75) 58%, rgba(244, 250, 232, 0) 100%)'
        }}
      />

      {/* Hexagonal grid pattern - layered on top of gradient, left-aligned */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] pointer-events-none opacity-[0.06] text-[#76c122] z-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-grid" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
              <path d="M 28 0 L 56 16.16 L 56 48.5 L 28 64.66 L 0 48.5 L 0 16.16 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 28 97 L 56 80.84 L 56 48.5 L 28 64.66 L 0 48.5 L 0 80.84 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="28" cy="0" r="2.5" fill="currentColor" />
              <circle cx="56" cy="16.16" r="2.5" fill="currentColor" />
              <circle cx="56" cy="48.5" r="2.5" fill="currentColor" />
              <circle cx="28" cy="64.66" r="2.5" fill="currentColor" />
              <circle cx="0" cy="48.5" r="2.5" fill="currentColor" />
              <circle cx="0" cy="16.16" r="2.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-30 pt-12 lg:pt-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: Text Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left pb-8 lg:pb-24 max-w-2xl">
            {/* Badge */}
            {h.badge && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border-0 tracking-wide"
                  style={{ backgroundColor: '#eef9df', color: '#3f7215' }}
                >
                  {h.badge}
                </Badge>
              </motion.div>
            )}

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4.5xl sm:text-5.5xl lg:text-[58px] font-black leading-[1.12] text-gray-900 tracking-tight"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              {h.heading1}
              {h.heading2 && (
                <>
                  <br />
                  <span className="text-gradient">{h.heading2}</span>
                </>
              )}
              {h.heading3 && (
                <>
                  <br />
                  <span>{h.heading3}</span>
                </>
              )}
            </motion.h1>

            {/* Subtext */}
            {h.subtext && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl"
              >
                {h.subtext}
              </motion.p>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-row space-x-3 w-full mt-4 md:flex-wrap md:gap-4 md:space-x-0"
            >
              <a
                id="hero-appointment-btn"
                href="https://wa.me/994993014444?text=Salam,%20klinikada%20qəbula%20yazılmaq%20istəyirəm."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center btn-primary px-5 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold shadow-lg text-white hover:scale-105 transition-transform cursor-pointer flex-1 md:flex-none"
              >
                {h.ctaPrimary}
                <ChevronRight className="w-4 h-4 ml-1 md:w-5 md:h-5 md:ml-1.5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-5 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold border-2 border-[#76c122] text-[#3f7215] hover:bg-green-50/50 transition-all duration-200 flex-1 md:flex-none bg-white/60"
              >
                {h.ctaSecondary}
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200/50 max-w-xl"
            >
              {/* Stat 1 */}
              <a href="#doctors" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
                <div className="flex -space-x-2.5">
                  {['/doctor-1.png', '/doctor-2.png', '/doctor-3.png'].map((src, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-sm relative">
                      <Image src={src} alt="Doctor avatar" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-950 leading-tight">{h.stat1Value}</p>
                  <p className="text-xs text-gray-500">{h.stat1Label}</p>
                </div>
              </a>

              <div className="h-8 w-px bg-gray-200/80 hidden sm:block" />

              {/* Stat 2 */}
              <a href="#reviews" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
                <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-950 leading-tight">{h.stat2Value}</p>
                  <p className="text-xs text-gray-500">{h.stat2Label}</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Optional Floating items on desktop */}
          <div className="hidden lg:block absolute bottom-12 right-12 z-30 space-y-3 pointer-events-none">
            {h.floatingBadge1 && (
              <motion.div
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-green-50/50 py-2.5 px-4 flex items-center gap-2.5 pointer-events-auto"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-[#76c122]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">{h.floatingBadge1}</p>
                  <p className="text-[9px] text-gray-500">{h.floatingBadge2}</p>
                </div>
              </motion.div>
            )}

            {h.floatingCard && (
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-green-50/50 p-3 max-w-[160px] pointer-events-auto"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold text-gray-800">5.0</span>
                </div>
                <p className="text-[9px] text-gray-500 font-medium leading-normal">{h.floatingCard}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
