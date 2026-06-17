'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Badge } from '@/components/ui/badge';
import { useSiteContent } from '@/lib/siteContent';

export default function ReviewsSection() {
  const { content } = useSiteContent();
  const r = content.reviewsSection;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  if (!r || !r.list) return null;

  return (
    <section id="reviews" className="py-24 bg-[#f5f7f2] overflow-hidden">
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
            {r.badge}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
            {r.heading1} <span className="text-gradient">{r.headingGradient}</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            {r.subtext}
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
              {r.list.map((review) => (
                <div
                  key={review.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] min-w-0 px-3 lg:px-4 flex flex-col flex-shrink-0"
                >
                  <div className="bg-white rounded-3xl border border-gray-100/50 p-8 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(118,193,34,0.08)] transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer hover:-translate-y-1">
                    <div className="space-y-5">
                      {/* User Header */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-green-50 flex-shrink-0">
                          <Image
                            src={review.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-gray-900 tracking-tight">{review.name}</h4>
                          <div className="flex gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }).map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                className={`w-3.5 h-3.5 ${
                                  starIdx < review.rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Comment with Quote Style */}
                      <div className="relative">
                        <span className="text-4xl text-[#76c122]/30 font-serif absolute -top-4 -left-1">“</span>
                        <p className="text-sm text-gray-600 leading-relaxed pl-4 pt-1 pr-2">
                          {review.comment}
                          <span className="text-4xl text-[#76c122]/30 font-serif inline-block leading-none translate-y-2.5 ml-1">”</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#76c122] text-[#76c122] hover:text-white rounded-full p-2.5 md:p-3 shadow-md hover:shadow-lg border border-gray-100 hover:border-transparent transition-all duration-200 cursor-pointer flex items-center justify-center group"
            aria-label="Əvvəlki"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#76c122] text-[#76c122] hover:text-white rounded-full p-2.5 md:p-3 shadow-md hover:shadow-lg border border-gray-100 hover:border-transparent transition-all duration-200 cursor-pointer flex items-center justify-center group"
            aria-label="Növbəti"
          >
            <ChevronRight className="w-5 h-5 md:w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
