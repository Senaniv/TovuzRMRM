import { Doctor, Service, BlogPost } from './types';
import { doctors as defaultDoctors, services as defaultServices, blogPosts as defaultBlogPosts } from './data';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface SiteContent {
  header: {
    centerName: string;
    phone: string;
    address: string;
    email: string;
  };
  hero: {
    badge: string;
    heading1: string;
    heading2: string;
    heading3: string;
    subtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    floatingCard: string;
    floatingBadge1: string;
    floatingBadge2: string;
  };
  about: {
    badge: string;
    heading1: string;
    headingGradient: string;
    paragraph1: string;
    paragraph2: string;
    stat1Value: string; stat1Label: string;
    stat2Value: string; stat2Label: string;
    stat3Value: string; stat3Label: string;
    stat4Value: string; stat4Label: string;
    quote: string;
    quoteAuthor: string;
    quoteSubtitle: string;
    feat1Title: string; feat1Text: string;
    feat2Title: string; feat2Text: string;
    feat3Title: string; feat3Text: string;
    feat4Title: string; feat4Text: string;
  };
  services: {
    badge: string;
    heading1: string;
    headingGradient: string;
    subtext: string;
  };
  doctors: {
    badge: string;
    heading1: string;
    headingGradient: string;
    subtext: string;
  };
  reviewsSection: {
    badge: string;
    heading1: string;
    headingGradient: string;
    subtext: string;
    list: Review[];
  };
  blog: {
    badge: string;
    heading1: string;
    headingGradient: string;
    subtext: string;
    ctaButton: string;
  };
  footer: {
    slogan: string;
    description: string;
    phone: string;
    address: string;
    email: string;
    workdaysHours: string;
    saturdayHours: string;
    copyright: string;
  };
}

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

function isUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export function mapDbDoctor(dbDoc: any): Doctor {
  let extra: any = {};
  if (dbDoc.specialty) {
    try {
      extra = JSON.parse(dbDoc.specialty);
    } catch {
      extra = { specialty: dbDoc.specialty };
    }
  }
  return {
    id: dbDoc.id,
    name: dbDoc.name,
    experience: dbDoc.experience || '',
    image: dbDoc.image_url || '/doctor-1.png',
    specialty: extra.specialty || dbDoc.specialty || '',
    title: extra.title || '',
    bio: extra.bio || '',
    orderIndex: typeof extra.orderIndex === 'number' ? extra.orderIndex : 0,
  };
}

export function mapDoctorToDb(doc: Doctor): any {
  const dbDoc: any = {
    name: doc.name,
    experience: doc.experience,
    image_url: doc.image,
    specialty: JSON.stringify({
      specialty: doc.specialty,
      title: doc.title,
      bio: doc.bio,
      orderIndex: doc.orderIndex,
    }),
  };
  if (isUuid(doc.id)) {
    dbDoc.id = doc.id;
  }
  return dbDoc;
}

export function mapDbService(dbSvc: any): Service {
  let extra: any = {};
  if (dbSvc.description) {
    try {
      extra = JSON.parse(dbSvc.description);
    } catch {
      extra = { description: dbSvc.description };
    }
  }
  return {
    id: dbSvc.id,
    name: dbSvc.title,
    description: extra.description || dbSvc.description || '',
    icon: dbSvc.icon || 'Brain',
    category: extra.category || '',
    colorAccent: extra.colorAccent || 'bg-blue-50 border-blue-200',
    subItems: Array.isArray(extra.subItems) ? extra.subItems : [],
    orderIndex: typeof extra.orderIndex === 'number' ? extra.orderIndex : 0,
  };
}

export function mapServiceToDb(svc: Service): any {
  const dbSvc: any = {
    title: svc.name,
    icon: svc.icon,
    description: JSON.stringify({
      description: svc.description,
      category: svc.category,
      colorAccent: svc.colorAccent,
      subItems: svc.subItems,
      orderIndex: svc.orderIndex,
    }),
  };
  if (isUuid(svc.id)) {
    dbSvc.id = svc.id;
  }
  return dbSvc;
}

export function mapDbBlogPost(dbBlog: any): BlogPost {
  let extra: any = {};
  if (dbBlog.content) {
    try {
      extra = JSON.parse(dbBlog.content);
    } catch {
      extra = { content: dbBlog.content };
    }
  }
  return {
    id: dbBlog.id,
    title: dbBlog.title || '',
    slug: dbBlog.slug || '',
    excerpt: dbBlog.excerpt || '',
    coverImage: dbBlog.image_url || '',
    content: extra.content || dbBlog.content || '',
    author: extra.author || '',
    category: extra.category || '',
    publishedAt: extra.publishedAt || dbBlog.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
    createdAt: dbBlog.created_at || new Date().toISOString(),
  };
}

export function mapBlogPostToDb(post: BlogPost): any {
  const dbBlog: any = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    image_url: post.coverImage,
    content: JSON.stringify({
      content: post.content,
      author: post.author,
      category: post.category,
      publishedAt: post.publishedAt,
    }),
  };
  if (isUuid(post.id)) {
    dbBlog.id = post.id;
  }
  return dbBlog;
}

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
