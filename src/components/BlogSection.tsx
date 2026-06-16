'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSiteContent } from '@/lib/siteContent';

const AZ_MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];

function formatDateAz(dateStr: string): string {
  if (!dateStr || typeof dateStr !== 'string') return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!month || month < 1 || month > 12) return dateStr;
  return `${day || ''} ${AZ_MONTHS[month - 1]} ${year || ''}`;
}

const categoryColors: Record<string, string> = {
  'Reabilitasiya': 'bg-blue-100 text-blue-700',
  'Pediatriya': 'bg-pink-100 text-pink-700',
  'Nevrologiya': 'bg-violet-100 text-violet-700',
};

const placeholderColors = [
  'from-violet-400 to-violet-600',
  'from-pink-400 to-pink-600',
  'from-blue-400 to-blue-600',
];

export default function BlogSection() {
  const { content, blogPosts } = useSiteContent();
  const b = content.blog;
  return (
    <section id="blog" className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 px-4 py-1.5 rounded-full text-sm font-semibold border-0" style={{ backgroundColor: '#e8f5d4', color: '#3f7215' }}>
            {b.badge}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
            {b.heading1} <span className="text-gradient">{b.headingGradient}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {b.subtext}
          </p>
        </motion.div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
            >
              {/* Cover image / placeholder gradient */}
              <div className={`relative h-52 bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]} overflow-hidden`}>
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-4 w-16 h-16 border-4 border-white rounded-full" />
                  <div className="absolute bottom-4 left-4 w-24 h-1 bg-white rounded" />
                  <div className="absolute bottom-8 left-4 w-16 h-1 bg-white rounded" />
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${categoryColors[post.category] || 'bg-green-100 text-green-700'}`}>
                    {post.category}
                  </span>
                </div>
                {/* Article icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/30" />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Read more overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
                    Oxu <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#3f7215] transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-[#76c122] font-bold text-xs">{post.author.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDateAz(post.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold border-2 border-[#76c122] text-[#3f7215] hover:bg-green-50 transition-all">
            {b.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
