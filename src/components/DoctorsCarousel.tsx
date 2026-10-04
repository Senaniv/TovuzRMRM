'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/lib/siteContent';

export default function DoctorsCarousel() {
  const { content, doctors } = useSiteContent();
  const d = content.doctors;

  const [activeDoctorId, setActiveDoctorId] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  return (
    <>
      <section id="doctors" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 px-4 py-1.5 rounded-full text-sm font-semibold border-0" style={{ backgroundColor: '#f4fae8', color: '#3f7215' }}>
              {d.badge}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
              {d.heading1} <span className="text-gradient">{d.headingGradient}</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {d.subtext}
            </p>
          </motion.div>

          {/* Carousel Wrapper */}
          <div className="relative">
            {/* Embla slider container */}
            <div
              className="embla overflow-hidden cursor-grab active:cursor-grabbing"
              ref={emblaRef}
              onMouseEnter={() => emblaApi?.plugins().autoplay?.stop()}
              onMouseLeave={() => emblaApi?.plugins().autoplay?.play()}
            >
              <div className="flex -mx-3 lg:-mx-4">
                {doctors.map((doctor) => {
                  const isSelected = activeDoctorId === doctor.id;
                  return (
                    <div
                      key={doctor.id}
                      className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] min-w-0 px-3 lg:px-4 flex flex-col items-center flex-shrink-0"
                    >
                      <div
                        onClick={() => setActiveDoctorId(prev => prev === doctor.id ? null : doctor.id)}
                        className="w-full flex flex-col items-center text-center group cursor-pointer select-none"
                      >
                        {/* Capsule/Oval shape for Doctor Image */}
                        <div className="relative w-full aspect-[3/4] max-w-[220px] rounded-[150px] overflow-hidden bg-gradient-to-b from-[#e8f5d4]/45 to-[#76c122]/10 mb-6 flex justify-center items-end shadow-inner transition-all duration-300 ease-out group-hover:shadow-xl group-hover:-translate-y-1.5">
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            fill
                            className="object-cover object-top transition-transform duration-300"
                          />

                          {/* Bio Overlay on Hover / Click: positioned at bottom with smooth gradient blur */}
                          <div
                            className={`absolute inset-0 z-10 rounded-[150px] flex flex-col justify-end px-4 pb-6 pt-16 text-center transition-all duration-300 ${
                              isSelected
                                ? 'opacity-100 pointer-events-auto'
                                : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
                            }`}
                            style={{
                              background: 'linear-gradient(to top, rgba(5, 12, 4, 0.94) 0%, rgba(5, 12, 4, 0.82) 48%, rgba(5, 12, 4, 0.35) 68%, rgba(5, 12, 4, 0) 100%)',
                            }}
                          >
                            {/* Backdrop blur masked to the bottom portion so face stays clear */}
                            <div
                              className="absolute inset-0 pointer-events-none -z-10 rounded-[150px]"
                              style={{
                                backdropFilter: 'blur(6px)',
                                WebkitBackdropFilter: 'blur(6px)',
                                maskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 80%)',
                                WebkitMaskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 80%)',
                              }}
                            />

                            {/* Bio content in bottom half */}
                            <div className="relative z-10 flex flex-col items-center">
                              <span className="text-[10px] font-bold text-[#76c122] uppercase tracking-wider mb-1 drop-shadow-sm">
                                Həkim Haqqında
                              </span>
                              <div className="max-h-[110px] overflow-y-auto px-1 scrollbar-none">
                                <p className="text-[11px] leading-relaxed text-white font-medium drop-shadow-sm">
                                  {doctor.bio || 'Həkim haqqında ətraflı məlumat tezliklə əlavə olunacaq.'}
                                </p>
                              </div>
                              {doctor.experience && (
                                <span className="mt-2 text-[9px] font-semibold text-gray-200 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                                  {doctor.experience} təcrübə
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Name */}
                        <h3 className="text-lg font-black text-[#3f7215] mb-0.5 tracking-tight uppercase group-hover:text-[#76c122] transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                          {doctor.name}
                        </h3>

                        {/* Title */}
                        <p className="text-sm font-bold text-gray-800 mb-3">
                          {doctor.title}
                        </p>

                        {/* Specialty */}
                        <p className="text-xs text-gray-500 leading-normal max-w-[220px]">
                          <span className="font-bold text-gray-700">İxtisas:</span> {doctor.specialty}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-0 md:-left-6 top-[146px] -translate-y-1/2 z-10 bg-white hover:bg-[#76c122] text-[#76c122] hover:text-white rounded-full p-2.5 md:p-3 shadow-md hover:shadow-lg border border-gray-100 hover:border-transparent transition-all duration-200 cursor-pointer flex items-center justify-center group"
              aria-label="Əvvəlki"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-0 md:-right-6 top-[146px] -translate-y-1/2 z-10 bg-white hover:bg-[#76c122] text-[#76c122] hover:text-white rounded-full p-2.5 md:p-3 shadow-md hover:shadow-lg border border-gray-100 hover:border-transparent transition-all duration-200 cursor-pointer flex items-center justify-center group"
              aria-label="Növbəti"
            >
              <ChevronRight className="w-5 h-5 md:w-6 h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* CTA at the bottom */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="https://wa.me/994993014444?text=Salam,%20klinikada%20qəbula%20yazılmaq%20istəyirəm."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center btn-primary px-8 py-3.5 rounded-full text-base font-bold shadow-lg text-white hover:scale-105 transition-transform cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
            >
              Qəbula yazıl
              <ChevronRight className="w-5 h-5 ml-1.5" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
