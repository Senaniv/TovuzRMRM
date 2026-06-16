'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Shield, Clock, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSiteContent } from '@/lib/siteContent';

export default function AboutSection() {
  const { content } = useSiteContent();
  const a = content.about;

  const stats = [
    { value: a.stat1Value, label: a.stat1Label },
    { value: a.stat2Value, label: a.stat2Label },
    { value: a.stat3Value, label: a.stat3Label },
    { value: a.stat4Value, label: a.stat4Label },
  ];

  const features = [
    { icon: Shield,       title: a.feat1Title, text: a.feat1Text },
    { icon: Clock,        title: a.feat2Title, text: a.feat2Text },
    { icon: Award,        title: a.feat3Title, text: a.feat3Text },
    { icon: CheckCircle,  title: a.feat4Title, text: a.feat4Text },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-4 px-4 py-1.5 rounded-full text-sm font-semibold border-0" style={{ backgroundColor: '#e8f5d4', color: '#3f7215' }}>
              {a.badge}
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Raleway, sans-serif' }}>
              {a.heading1}{' '}
              <span className="text-gradient">{a.headingGradient}</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-6">
              {a.paragraph1}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {a.paragraph2}
            </p>

            {/* Feature grid removed from here */}
          </motion.div>

          {/* Right — stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className={`rounded-2xl p-7 text-center ${
                    i === 0 || i === 3
                      ? 'text-white'
                      : 'bg-white border-2 border-green-100'
                  }`}
                  style={i === 0 || i === 3 ? { background: 'linear-gradient(135deg, #76c122, #3f7215)' } : {}}
                >
                  <p
                    className={`text-4xl font-black mb-2 ${i === 0 || i === 3 ? 'text-white' : 'text-gradient'}`}
                    style={{ fontFamily: 'Raleway, sans-serif' }}
                  >
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${i === 0 || i === 3 ? 'text-white/80' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quote card removed */}
          </motion.div>
        </div>

        {/* Feature cards — stacked on mobile, 4-col on desktop */}
        <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-3 md:items-start md:gap-3.5 p-3 md:p-5 bg-green-50 rounded-xl md:rounded-2xl border border-green-100 shadow-sm"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <feat.icon className="w-4 h-4 md:w-5 md:h-5 text-[#76c122]" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-900 leading-snug">{feat.title}</p>
                <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1 leading-normal">{feat.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
