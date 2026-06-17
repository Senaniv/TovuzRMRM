'use client';

import { motion } from 'framer-motion';
import { Brain, Activity, Baby, HeartHandshake, Microscope, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSiteContent } from '@/lib/siteContent';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6 text-[#76c122] group-hover:text-[#3f7215] transition-colors duration-300" />,
  Activity: <Activity className="w-6 h-6 text-[#76c122] group-hover:text-[#3f7215] transition-colors duration-300" />,
  Baby: <Baby className="w-6 h-6 text-[#76c122] group-hover:text-[#3f7215] transition-colors duration-300" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-[#76c122] group-hover:text-[#3f7215] transition-colors duration-300" />,
  Microscope: <Microscope className="w-6 h-6 text-[#76c122] group-hover:text-[#3f7215] transition-colors duration-300" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#76c122] group-hover:text-[#3f7215] transition-colors duration-300" />,
};

export default function ServicesGrid() {
  const { content, services } = useSiteContent();
  const s = content.services;
  return (
    <section id="services" className="py-24 bg-[#f5f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 px-4 py-1.5 rounded-full text-sm font-semibold border-0" style={{ backgroundColor: '#f4fae8', color: '#3f7215' }}>
            {s.badge}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
            {s.heading1} <span className="text-gradient">{s.headingGradient}</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            {s.subtext}
          </p>
        </motion.div>

        {/* Uniform Grid — 2-col on mobile, 3-col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {services.map((service, i) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white hover:bg-[#f4fae8] rounded-2xl md:rounded-3xl border border-gray-200/50 p-4 md:p-8 flex flex-col items-center text-center shadow-[0_8px_30px_-5px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(118,193,34,0.22)] hover:border-[#76c122]/40 transition-all duration-300 ease-out hover:-translate-y-2.5 group relative cursor-pointer"
              >
                {/* Icon Wrapper (Centered Circle) */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#f4fae8] group-hover:bg-white flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-all duration-300 shadow-inner">
                  {iconMap[service.icon]}
                </div>

                {/* Title */}
                <h3
                  className="text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#3f7215] transition-colors"
                  style={{ fontFamily: 'Raleway, sans-serif' }}
                >
                  {service.name}
                </h3>

                {/* Description */}
                <p className="hidden md:block text-xs md:text-sm text-gray-500 group-hover:text-[#3f7215]/80 transition-colors duration-300 leading-relaxed mb-4 md:mb-6 max-w-xs">
                  {service.description}
                </p>


                {/* View Details Link */}
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#76c122] group-hover:text-[#3f7215] mt-auto transition-colors group-hover:underline">
                  Ətraflı
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Small Category tag */}
                <div className="absolute top-4 right-4 bg-gray-50 group-hover:bg-white group-hover:text-[#3f7215] text-[10px] text-gray-500 font-semibold px-2.5 py-1 rounded-full border border-gray-100/50 transition-colors duration-300">
                  {service.category}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
