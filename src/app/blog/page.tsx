import Link from 'next/link';
import { Calendar, ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { mapDbBlogPost } from '@/lib/siteContentShared';
import { blogPosts as defaultBlogPosts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

async function getBlogPosts() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*');
    if (data && data.length > 0) {
      return data.map(mapDbBlogPost).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
  } catch (err) {
    console.error('Failed to fetch blogs:', err);
  }
  return defaultBlogPosts;
}

export default async function BlogListingPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section with back button */}
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#76c122] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Ana Səhifəyə Qayıt
          </Link>
          
          <div className="text-center sm:text-left">
            <Badge className="mb-4 px-4 py-1.5 rounded-full text-sm font-semibold border-0" style={{ backgroundColor: '#e8f5d4', color: '#3f7215' }}>
              Məqalələr
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Bütün <span className="text-gradient">Faydalı Məqalələr</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Reabilitasiya, uşaq inkişafı və sağlam həyat tərzi haqqında ekspert tövsiyələri, elmi məqalələr və faydalı məlumatlar.
            </p>
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer flex flex-col h-full hover:-translate-y-1.5"
            >
              <Link href={`/blog/${post.slug}`} className="block flex-1 flex flex-col">
                {/* Cover image / placeholder gradient */}
                <div className="relative h-32 md:h-52 bg-gray-100 overflow-hidden flex-shrink-0">
                  {post.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]}`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 right-4 w-16 h-16 border-4 border-white rounded-full" />
                        <div className="absolute bottom-4 left-4 w-24 h-1 bg-white rounded" />
                        <div className="absolute bottom-8 left-4 w-16 h-1 bg-white rounded" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 md:w-16 md:h-16 text-white/30" />
                      </div>
                    </div>
                  )}
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${categoryColors[post.category] || 'bg-green-100 text-green-700'}`}>
                      {post.category}
                    </span>
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
                <div className="p-4 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-4 leading-snug group-hover:text-[#3f7215] transition-colors line-clamp-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3 hidden md:block">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-[#76c122] font-bold text-xs">{post.author.charAt(0)}</span>
                      </div>
                      <span className="font-medium hidden md:inline">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDateAz(post.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
