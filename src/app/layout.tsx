import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import WelcomePopup from '@/components/WelcomePopup';
import { SiteContentProvider } from '@/lib/siteContent';
import { defaultContent, deepMerge, mapDbDoctor, mapDbService, mapDbBlogPost, defaultPopupData } from '@/lib/siteContentShared';
import { supabase } from '@/lib/supabase';
import { doctors as defaultDoctors, services as defaultServices, blogPosts as defaultBlogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Regional Müalicə və Reabilitasiya Mərkəzi | Tovuz',
  description: 'Tovuz şəhərinin ən müasir tibbi reabilitasiya mərkəzi. Nevrologiya, fizioterapiya, pediatriya, psixologiya və loqopediya xidmətləri. Onlayn qeydiyyat: 099 301 44 44',
  keywords: 'reabilitasiya, tovuz, nevrologiya, fizioterapiya, pediatriya, psixologiya, loqopediya, EEQ, EMQ, neyrofeedback',
  authors: [{ name: 'Regional Müalicə və Reabilitasiya Mərkəzi' }],
  openGraph: {
    title: 'Regional Müalicə və Reabilitasiya Mərkəzi | Tovuz',
    description: 'Müasir tibb texnologiyaları ilə kompleks reabilitasiya xidmətləri.',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getSiteContent() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      return defaultContent;
    }
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .maybeSingle();
    
    if (error) {
      console.warn('Supabase fetch error, using defaults:', error.message);
      return defaultContent;
    }
    if (data && data.content) {
      return deepMerge(defaultContent, data.content);
    }
  } catch (err) {
    console.warn('Failed to fetch from Supabase, using defaults:', err);
  }
  return defaultContent;
}

async function getDoctors() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) return defaultDoctors;

    const { data, error } = await supabase.from('doctors').select('*');
    if (error) {
      console.warn('Failed to fetch doctors, using defaults:', error.message);
      return defaultDoctors;
    }
    if (data && data.length > 0) {
      return data.map(mapDbDoctor).sort((a, b) => a.orderIndex - b.orderIndex);
    }
  } catch (err) {
    console.warn('Failed to fetch doctors, using defaults:', err);
  }
  return defaultDoctors;
}

async function getServices() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) return defaultServices;

    const { data, error } = await supabase.from('services').select('*');
    if (error) {
      console.warn('Failed to fetch services, using defaults:', error.message);
      return defaultServices;
    }
    if (data && data.length > 0) {
      return data.map(mapDbService).sort((a, b) => a.orderIndex - b.orderIndex);
    }
  } catch (err) {
    console.warn('Failed to fetch services, using defaults:', err);
  }
  return defaultServices;
}

async function getBlogPosts() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) return defaultBlogPosts;

    const { data, error } = await supabase.from('blogs').select('*');
    if (error) {
      console.warn('Failed to fetch blogs, using defaults:', error.message);
      return defaultBlogPosts;
    }
    if (data && data.length > 0) {
      return data.map(mapDbBlogPost).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
  } catch (err) {
    console.warn('Failed to fetch blogs, using defaults:', err);
  }
  return defaultBlogPosts;
}

async function getPopupData() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      return defaultPopupData;
    }
    const { data, error } = await supabase
      .from('welcome_popup')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      console.warn('Failed to fetch popup data, using defaults:', error.message);
      return defaultPopupData;
    }
    if (data) {
      return {
        image_url: data.image_url || '',
        is_active: !!data.is_active,
        expires_at: data.expires_at || '',
      };
    }
  } catch (err) {
    console.warn('Failed to fetch popup data, using defaults:', err);
  }
  return defaultPopupData;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, doctors, services, blogPosts, popupData] = await Promise.all([
    getSiteContent(),
    getDoctors(),
    getServices(),
    getBlogPosts(),
    getPopupData(),
  ]);

  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Raleway:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <SiteContentProvider
          initialContent={content}
          initialDoctors={doctors}
          initialServices={services}
          initialBlogPosts={blogPosts}
          initialPopupData={popupData}
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <WelcomePopup />
        </SiteContentProvider>
      </body>
    </html>
  );
}
