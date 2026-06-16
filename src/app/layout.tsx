import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { SiteContentProvider, defaultContent, deepMerge } from '@/lib/siteContent';
import { supabase } from '@/lib/supabase';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

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
      <body className="antialiased">
        <SiteContentProvider initialContent={content}>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </SiteContentProvider>
      </body>
    </html>
  );
}
