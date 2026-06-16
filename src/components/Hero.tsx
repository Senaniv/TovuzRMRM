'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Users, Award, ChevronRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppointmentModal from './AppointmentModal';
import { useSiteContent } from '@/lib/siteContent';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content } = useSiteContent();
  const h = content.hero;

  return (
    <>
      <section id="hero" className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center pt-32 pb-16 overflow-hidden bg-white">
        {/* Soft background decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl opacity-60 -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-50 rounded-full blur-3xl opacity-50 translate-y-1/4 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT — Text content (7 columns on desktop) */}
            <div className="lg:col-span-7 space-y-7 text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border-0"
                  style={{ backgroundColor: '#f4fae8', color: '#3f7215' }}
                >
                  {h.badge}
                </Badge>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[58px] font-black leading-[1.15] text-gray-900 tracking-tight"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                {h.heading1}<br />
                <span className="text-gradient">{h.heading2}</span><br />
                {h.heading3}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl"
              >
                {h.subtext}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  id="hero-appointment-btn"
                  onClick={() => setModalOpen(true)}
                  className="btn-primary px-8 py-4 rounded-full text-base font-bold shadow-lg text-white"
                  style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
                >
                  {h.ctaPrimary}
                  <ChevronRight className="w-5 h-5 ml-1.5" />
                </Button>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold border-2 border-[#76c122] text-[#3f7215] hover:bg-green-50 transition-all duration-200"
                >
                  {h.ctaSecondary}
                </a>
              </motion.div>

              {/* Stats & Trust row */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {['/doctor-1.png', '/doctor-2.png', '/doctor-3.png'].map((src, i) => (
                      <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-sm">
                        <Image src={src} alt="Doctor avatar" width={36} height={36} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{h.stat1Value} {h.stat1Label}</p>
                    <p className="text-xs text-gray-500">Müasir reabilitasiya komandası</p>
                  </div>
                </div>

                <div className="h-8 w-px bg-gray-200 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{h.stat2Value}</p>
                    <p className="text-xs text-gray-500">{h.stat2Label}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Single doctor with circular glow backdrop (5 columns on desktop) */}
            <motion.div
              className="lg:col-span-5 relative flex justify-center items-center mt-10 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Circular Background Glow Shape */}
              <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] bg-gradient-to-tr from-[#76c122]/15 to-[#e8f5d4]/40 rounded-full blur-sm -z-10" />

              {/* Secondary floating glow */}
              <div className="absolute top-10 right-10 w-24 h-24 bg-[#76c122]/10 rounded-full blur-xl" />

              {/* Main Doctor Image container */}
              <div className="relative w-[280px] h-[360px] sm:w-[360px] sm:h-[460px] overflow-hidden rounded-2xl">
                <Image
                  src="/doctor-1.png"
                  alt="Doctor Hero"
                  fill
                  className="object-contain object-bottom scale-105"
                  priority
                />
              </div>

              {/* Floating review card */}
              <motion.div
                className="absolute top-1/4 -left-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-green-50 p-3.5 max-w-[170px]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-800">5.0</span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium">{h.floatingCard}</p>
              </motion.div>

              {/* Floating Stat card */}
              <motion.div
                className="absolute bottom-10 -right-6 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-green-50 py-3 px-5 flex items-center gap-3"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#76c122]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">{h.floatingBadge1}</p>
                  <p className="text-[10px] text-gray-500">{h.floatingBadge2}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
