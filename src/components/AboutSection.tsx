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
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Raleway, sans-serif' }}>
              {a.heading1}{' '}
              <span className="text-gradient">{a.headingGradient}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {a.paragraph1}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {a.paragraph2}
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100"
                >
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    <feat.icon className="w-4 h-4 text-[#76c122]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{feat.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{feat.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                    i % 2 === 0
                      ? 'text-white'
                      : 'bg-white border-2 border-green-100'
                  }`}
                  style={i % 2 === 0 ? { background: 'linear-gradient(135deg, #76c122, #3f7215)' } : {}}
                >
                  <p
                    className={`text-4xl font-black mb-2 ${i % 2 === 0 ? 'text-white' : 'text-gradient'}`}
                    style={{ fontFamily: 'Raleway, sans-serif' }}
                  >
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${i % 2 === 0 ? 'text-white/80' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-5 p-6 bg-gray-900 rounded-2xl"
            >
              <p className="text-white/90 text-sm italic leading-relaxed mb-4">
                "{a.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#76c122] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {a.quoteAuthor.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{a.quoteAuthor}</p>
                  <p className="text-white/50 text-xs">{a.quoteSubtitle}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
