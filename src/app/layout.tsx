import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
