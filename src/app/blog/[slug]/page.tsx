import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
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
  'Reabilitasiya': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  'Pediatriya': 'bg-pink-100 text-pink-700 hover:bg-pink-100',
  'Nevrologiya': 'bg-violet-100 text-violet-700 hover:bg-violet-100',
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let post = null;

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (data) {
      post = mapDbBlogPost(data);
    }
  } catch (err) {
    console.error('Failed to fetch blog post from DB:', err);
  }

  // Fallback to default mock data if not found in DB
  if (!post) {
    post = defaultBlogPosts.find((p) => p.slug === slug);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#76c122] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Geri Qayıt
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)]">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative w-full h-64 sm:h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body padding */}
          <div className="p-6 sm:p-12">
            {/* Meta header */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <Badge className={`text-xs border-0 font-semibold rounded-full px-3 py-1 ${categoryColors[post.category] || 'bg-green-100 text-green-700 hover:bg-green-100'}`}>
                {post.category}
              </Badge>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{formatDateAz(post.publishedAt)}</span>
              </div>

              {post.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-700">{post.author}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight mb-8"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-gray-500 italic text-base sm:text-lg border-l-4 border-[#76c122] pl-4 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Main Content Body */}
            <div className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line space-y-6">
              {post.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
