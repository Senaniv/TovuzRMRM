// ─────────────────────────────────────────────────────────────
//  Site Content — single source of truth for all editable text
//  Admin edits → saved to Supabase → components re-render
// ─────────────────────────────────────────────────────────────
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface SiteContent {
  // ── Header ──────────────────────────────────────────────────
  header: {
    centerName: string;       // "Regional Müalicə və Reabilitasiya Mərkəzi"
    phone: string;            // "099 301 44 44"
    address: string;          // top-bar address
    email: string;            // top-bar email
  };

  // ── Hero Section ────────────────────────────────────────────
  hero: {
    badge: string;            // "⭐ Tovuz Şəhərinin №1 Reabilitasiya Mərkəzi"
    heading1: string;         // "Sağlamlığınız üçün"
    heading2: string;         // "ən yaxşı müalicə"
    heading3: string;         // "burada başlayır"
    subtext: string;          // paragraph under heading
    ctaPrimary: string;       // "Qeydiyyat Et"
    ctaSecondary: string;     // "Xidmətlərə Bax"
    stat1Value: string;       // "+15"
    stat1Label: string;       // "Peşəkar Həkim"
    stat2Value: string;       // "4.9 / 5.0"
    stat2Label: string;       // "500+ pasiyent rəyi"
    floatingCard: string;     // floating review card text
    floatingBadge1: string;   // "Lisenziyalı"
    floatingBadge2: string;   // "Səhiyyə Nazirliyi"
  };

  // ── About Section ───────────────────────────────────────────
  about: {
    badge: string;
    heading1: string;         // "Tovuzun ən müasir"
    headingGradient: string;  // "reabilitasiya mərkəzi"
    paragraph1: string;
    paragraph2: string;
    stat1Value: string;  stat1Label: string;
    stat2Value: string;  stat2Label: string;
    stat3Value: string;  stat3Label: string;
    stat4Value: string;  stat4Label: string;
    quote: string;
    quoteAuthor: string;
    quoteSubtitle: string;
    feat1Title: string;  feat1Text: string;
    feat2Title: string;  feat2Text: string;
    feat3Title: string;  feat3Text: string;
    feat4Title: string;  feat4Text: string;
  };

  // ── Services Section ─────────────────────────────────────────
  services: {
    badge: string;
    heading1: string;         // "Biz Nə"
    headingGradient: string;  // "Təklif Edirik?"
    subtext: string;
  };

  // ── Doctors Section ──────────────────────────────────────────
  doctors: {
    badge: string;
    heading1: string;
    headingGradient: string;
    subtext: string;
  };

  // ── Reviews Section ──────────────────────────────────────────
  reviewsSection: {
    badge: string;
    heading1: string;
    headingGradient: string;
    subtext: string;
    list: Review[];
  };

  // ── Blog Section ─────────────────────────────────────────────
  blog: {
    badge: string;
    heading1: string;
    headingGradient: string;
    subtext: string;
    ctaButton: string;
  };

  // ── Footer / Contact ─────────────────────────────────────────
  footer: {
    slogan: string;         // "Sağlamlıq artıq uzaqda deyil!"
    description: string;
    phone: string;
    address: string;
    email: string;
    workdaysHours: string;  // "09:00 – 17:00"
    saturdayHours: string;  // "09:00 – 15:00"
    copyright: string;
  };
}

// ── DEFAULT VALUES ────────────────────────────────────────────
export const defaultContent: SiteContent = {
  header: {
    centerName: 'Regional Müalicə və Reabilitasiya Mərkəzi',
    phone: '099 301 44 44',
    address: 'H.Əliyev pros., 298, Tovuz',
    email: 'info@reabilitasiya.az',
  },
  hero: {
    badge: '⭐ Tovuz Şəhərinin №1 Reabilitasiya Mərkəzi',
    heading1: 'Sağlamlığınız üçün',
    heading2: 'ən yaxşı müalicə',
    heading3: 'burada başlayır',
    subtext:
      'Regional Müalicə və Reabilitasiya Mərkəzimiz müasir tibb texnologiyaları, ixtisaslı mütəxəssislər və fərdi yanaşma ilə hər bir xəstənin tam sağalmasına dəstək verir.',
    ctaPrimary: 'Qəbula yazıl',
    ctaSecondary: 'Xidmətlərə Bax',
    stat1Value: '+15',
    stat1Label: 'Peşəkar Həkim',
    stat2Value: '4.9 / 5.0',
    stat2Label: '500+ pasiyent rəyi',
    floatingCard: 'Həkimlərimiz pasiyentlər tərəfindən yüksək qiymətləndirilir',
    floatingBadge1: 'Lisenziyalı',
    floatingBadge2: 'Səhiyyə Nazirliyi',
  },
  about: {
    badge: 'Haqqımızda',
    heading1: 'Tovuzun ən müasir',
    headingGradient: 'reabilitasiya mərkəzi',
    paragraph1:
      'Regional Müalicə və Reabilitasiya Mərkəzi Tovuz şəhərinin əhalisinə ən yüksək keyfiyyətli tibbi xidmətlər göstərmək məqsədi ilə fəaliyyət göstərir.',
    paragraph2:
      'Müasir avadanlıq, ixtisaslı həkimlər və fərdi müalicə proqramları ilə hər bir xəstənin sağalması üçün əlimizdən gələni edirik.',
    stat1Value: '+3000', stat1Label: 'Müalicə olunan xəstə',
    stat2Value: '+15',   stat2Label: 'İxtisaslı həkim',
    stat3Value: '10+',   stat3Label: 'İllik təcrübə',
    stat4Value: '4.9',   stat4Label: 'Ortalama reytinq',
    quote:
      'Sağlamlığınız bizim əsas prioritetimizdir. Hər bir xəstəyə fərdi, hərtərəfli tibbi yanaşma ilə ən yaxşı nəticəyə nail olmağa çalışırıq.',
    quoteAuthor: 'Baş Həkim',
    quoteSubtitle: 'Regional Reabilitasiya Mərkəzi',
    feat1Title: 'Akkreditasiya',
    feat1Text: 'Azərbaycan Səhiyyə Nazirliyinin lisenziyasına malikdir',
    feat2Title: '7/7 Açıqdır',
    feat2Text: 'Həftənin 7 günü, hər gün xidmətinizdəyik',
    feat3Title: 'Sertifikatlı Həkimlər',
    feat3Text: 'Beynəlxalq sertifikatlara malik mütəxəssislər',
    feat4Title: 'Fərdi Yanaşma',
    feat4Text: 'Hər xəstə üçün ayrıca müalicə proqramı',
  },
  services: {
    badge: 'Xidmətlərimiz',
    heading1: 'Biz Nə',
    headingGradient: 'Təklif Edirik?',
    subtext:
      'Müasir avadanlıqlar və peşəkar reabilitasiya üsulları ilə sağlamlığınıza qovuşmağınıza dəstək oluruq.',
  },
  doctors: {
    badge: 'Mütəxəssislərimiz',
    heading1: 'Peşəkar',
    headingGradient: 'Həkimlərimiz',
    subtext:
      'Hər biri öz sahəsinin mütəxəssisi olan komandamız sizin sağalmanız üçün əliavər olacaq.',
  },
  reviewsSection: {
    badge: 'Rəylər',
    heading1: 'Pasiyentlərimiz Bizim',
    headingGradient: 'Haqqımızda Nə Deyir?',
    subtext: 'Müalicə alan pasiyentlərimizin real təcrübələri və fikirləri.',
    list: [
      {
        id: '1',
        name: 'Aysel K.',
        rating: 5,
        comment: 'Çox peşəkar komanda və olduqca səmimi atmosfer. Hər şey ətraflı şəkildə izah olundu, reabilitasiya prosesi tam ağrısız və stressiz keçdi. Hər kəsə tövsiyə edirəm.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
      {
        id: '2',
        name: 'Nicat P.',
        rating: 5,
        comment: 'Müasir klinika, həkimlərin pasiyentə yanaşması mükəmməldir. Hər detal incəliyinə qədər düşünülüb. Müalicədən tam razı qaldım, ağrılarım keçdi.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      },
      {
        id: '3',
        name: 'Elvin M.',
        rating: 5,
        comment: 'Uşağımın sensor inteqrasiya terapiyası üçün müraciət etdik. Cəmi bir neçə seansdan sonra müsbət dəyişiklikləri hiss etdik. Həkimlərə çox təşəkkür edirik.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      }
    ]
  },
  blog: {
    badge: '+ Bloq',
    heading1: 'Faydalı',
    headingGradient: 'Məqalələr',
    subtext:
      'Reabilitasiya, uşaq inkişafı və sağlam həyat tərzi haqqında ekspert tövsiyələri.',
    ctaButton: 'Bütün Məqalələri Gör',
  },
  footer: {
    slogan: 'Sağlamlıq artıq uzaqda deyil!',
    description:
      'Tovuz şəhərinin ən müasir tibbi reabilitasiya mərkəzi. İxtisaslı həkimlər, müasir avadanlıq, fərdi yanaşma.',
    phone: '099 301 44 44',
    address: 'H.Əliyev pros., 298, Tovuz',
    email: 'info@reabilitasiya.az',
    workdaysHours: '09:00 – 17:00',
    saturdayHours: '09:00 – 15:00',
    copyright: 'Regional Müalicə və Reabilitasiya Mərkəzi. Bütün hüquqlar qorunur.',
  },
};

const SiteContentContext = createContext<{
  content: SiteContent;
  saveContent: (updated: SiteContent) => Promise<void>;
  resetContent: () => Promise<void>;
  loaded: boolean;
}>({
  content: defaultContent,
  saveContent: async () => {},
  resetContent: async () => {},
  loaded: false,
});

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function SiteContentProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode;
  initialContent: SiteContent;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent || defaultContent);
  const [loaded, setLoaded] = useState(true);

  // Sync client-side state if initialContent changes (e.g. server-side fetches)
  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const saveContent = useCallback(async (updated: SiteContent) => {
    setContent(updated);
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, content: updated, updated_at: new Date().toISOString() });
      if (error) {
        console.error('Failed to save content to Supabase:', error.message);
      }
    } catch (err) {
      console.error('Failed to save content to Supabase:', err);
    }
  }, []);

  const resetContent = useCallback(async () => {
    setContent(defaultContent);
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, content: defaultContent, updated_at: new Date().toISOString() });
      if (error) {
        console.error('Failed to reset content in Supabase:', error.message);
      }
    } catch (err) {
      console.error('Failed to reset content in Supabase:', err);
    }
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, saveContent, resetContent, loaded }}>
      {children}
    </SiteContentContext.Provider>
  );
}

// ── Deep merge helper ────────────────────────────────────────────
export function deepMerge<T extends object>(defaults: T, overrides: Partial<T>): T {
  const result = { ...defaults };
  for (const key in overrides) {
    const k = key as keyof T;
    if (
      overrides[k] !== undefined &&
      typeof overrides[k] === 'object' &&
      !Array.isArray(overrides[k]) &&
      typeof defaults[k] === 'object'
    ) {
      result[k] = deepMerge(defaults[k] as object, overrides[k] as object) as T[keyof T];
    } else if (overrides[k] !== undefined) {
      result[k] = overrides[k] as T[keyof T];
    }
  }
  return result;
}
