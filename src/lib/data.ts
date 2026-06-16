// Mock data — Replace with Supabase queries when ready
import { Doctor, Service, BlogPost, Appointment } from './types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Azər Bağırov',
    title: 'Uzman Psixiatr',
    specialty: 'Psixiatriya, Neyrofeedback',
    image: '/doctor-2.png',
    bio: 'Psixiatriya sahəsində 15 illik təcrübəyə malik olan Dr. Bağırov neyrofeedback və biofeedback terapiyası üzrə ixtisaslaşmışdır.',
    experience: '15 il',
    orderIndex: 1,
  },
  {
    id: '2',
    name: 'Dr. Günay Əliyeva',
    title: 'Pediatr Nevrolog',
    specialty: 'Uşaq Nevrologiyası, Sensor İnteqrasiya',
    image: '/doctor-1.png',
    bio: 'Uşaq nevrologiyası və sensor inteqrasiya terapiyası üzrə mütəxəssis. Autizm və DEHB müalicəsində geniş təcrübəyə malikdir.',
    experience: '10 il',
    orderIndex: 2,
  },
  {
    id: '3',
    name: 'Dr. Rəşad Həsənov',
    title: 'Fizioterapevt',
    specialty: 'Fiziki Reabilitasiya, İdman Travmaları',
    image: '/doctor-4.png',
    bio: 'İnme sonrası reabilitasiya, skolioz və hernia müalicəsi üzrə ixtisaslaşmış fizioterapevt.',
    experience: '12 il',
    orderIndex: 3,
  },
  {
    id: '4',
    name: 'Dr. Sevinc Nəcəfova',
    title: 'Nevroloq',
    specialty: 'Nevrologiya, EEQ, EMQ',
    image: '/doctor-3.png',
    bio: 'EEQ, EMQ müayinələri və nevroreabilitasiya sahəsində təcrübəli mütəxəssis.',
    experience: '8 il',
    orderIndex: 4,
  },
  {
    id: '5',
    name: 'Dr. Lalə Quliyeva',
    title: 'Klinik Psixoloq',
    specialty: 'Psixologiya, Loqopediya',
    image: '/doctor-5.png',
    bio: 'Uşaq inkişafı, psixoloji reabilitasiya və nitq pozuntuları ilə müalicə sahəsində mütəxəssis.',
    experience: '9 il',
    orderIndex: 5,
  },
];

export const services: Service[] = [
  {
    id: '1',
    name: 'Nevroloji Müayinə',
    description: 'EEQ, EMQ, Neyrofeedback, Biofeedback texnologiyaları ilə tam nevroloji diaqnostika.',
    icon: 'Brain',
    category: 'Nevrologiya',
    colorAccent: 'bg-violet-50 border-violet-200',
    subItems: ['EEQ (Elektroensefaloqrafiya)', 'EMQ (Elektromiоqrafiya)', 'Neyrofeedback', 'Biofeedback'],
    orderIndex: 1,
  },
  {
    id: '2',
    name: 'Fiziki & İdman Reabilitasiyası',
    description: 'İnme sonrası bərpa, skolioz, bel yırtığı və ortopedik problemlər üçün reabilitasiya.',
    icon: 'Activity',
    category: 'Reabilitasiya',
    colorAccent: 'bg-blue-50 border-blue-200',
    subItems: ['İnme sonrası reabilitasiya', 'Skolioz müalicəsi', 'Hernia bərpası', 'İdman travmaları'],
    orderIndex: 2,
  },
  {
    id: '3',
    name: 'Uşaq Sensor İnteqrasiya',
    description: 'Autizm, DEHB və inkişaf gecikməsi olan uşaqlar üçün ixtisaslaşmış terapiya proqramları.',
    icon: 'Baby',
    category: 'Pediatriya',
    colorAccent: 'bg-pink-50 border-pink-200',
    subItems: ['Autizm terapiyası', 'DEHB müalicəsi', 'İnkişaf gecikməsi', 'Sensor inteqrasiya'],
    orderIndex: 3,
  },
  {
    id: '4',
    name: 'Pediatriya, Psixologiya & Loqopediya',
    description: 'Uşaq sağlamlığı, psixoloji dəstək və nitq inkişafı üçün kompleks xidmətlər.',
    icon: 'HeartHandshake',
    category: 'Pediatriya',
    colorAccent: 'bg-green-50 border-green-200',
    subItems: ['Pediatrik müayinə', 'Klinik psixologiya', 'Loqopediya', 'Nitq terapiyası'],
    orderIndex: 4,
  },
  {
    id: '5',
    name: 'Laboratoriya & Diaqnostika',
    description: 'Müasir avadanlıqla tam laboratoriya analizi və görüntüləmə xidmətləri.',
    icon: 'Microscope',
    category: 'Diaqnostika',
    colorAccent: 'bg-amber-50 border-amber-200',
    subItems: ['Qan analizi', 'Hormon testləri', 'USM', 'Kardiologiya'],
    orderIndex: 5,
  },
  {
    id: '6',
    name: 'Ozonoterapiya & Dermatologiya',
    description: 'Ozonoterapiya, kosmetologiya və dəri müalicəsi üçün müasir prosedurlar.',
    icon: 'Sparkles',
    category: 'Kosmetologiya',
    colorAccent: 'bg-teal-50 border-teal-200',
    subItems: ['Ozonoterapiya', 'Dermatologiya', 'Kosmetologiya', 'Anti-aging'],
    orderIndex: 6,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'İnme Sonrası Reabilitasiya: Birinci İlin Əhəmiyyəti',
    slug: 'inme-sonrasi-reabilitasiya',
    excerpt: 'İnme sonrası ilk 6 ay beyin bərpası üçün kritik dövrdür. Erkən başlanmış reabilitasiya proqramları sağalma şansını əhəmiyyətli dərəcədə artırır.',
    content: '',
    coverImage: '/blog-1.jpg',
    author: 'Dr. Rəşad Həsənov',
    category: 'Reabilitasiya',
    publishedAt: '2024-11-15',
    createdAt: '2024-11-15',
  },
  {
    id: '2',
    title: 'Autizm Spektr Pozuntusu: Erkən Müdaxilənin Faydaları',
    slug: 'autizm-spektr-pozuntusu',
    excerpt: 'Erkən diaqnoz və müdaxilə autizm spektr pozuntusunun idarə edilməsində həlledici rol oynayır. Uşaqların potensialını maksimuma çatdırmaq mümkündür.',
    content: '',
    coverImage: '/blog-2.jpg',
    author: 'Dr. Günay Əliyeva',
    category: 'Pediatriya',
    publishedAt: '2024-11-08',
    createdAt: '2024-11-08',
  },
  {
    id: '3',
    title: 'Neyrofeedback Terapiyası: Beyin Dalğalarını Öyrətmək',
    slug: 'neyrofeedback-terapiyasi',
    excerpt: 'Neyrofeedback müasir neyropsixi müalicənin ən innovativ metodlarından biridir. Beyin fəaliyyətini normallaşdıraraq geniş ərazidə pozuntuları aradan qaldırır.',
    content: '',
    coverImage: '/blog-3.jpg',
    author: 'Dr. Azər Bağırov',
    category: 'Nevrologiya',
    publishedAt: '2024-10-25',
    createdAt: '2024-10-25',
  },
];

// In-memory store for admin CRUD (replace with Supabase in production)
let doctorsStore: Doctor[] = [...doctors];
let servicesStore: Service[] = [...services];
let blogPostsStore: BlogPost[] = [...blogPosts];
let appointmentsStore: Appointment[] = [
  {
    id: '1',
    patientName: 'Əli Məmmədov',
    phone: '055 123 45 67',
    email: 'ali@example.com',
    serviceId: '1',
    serviceName: 'Nevroloji Müayinə',
    doctorId: '4',
    doctorName: 'Dr. Sevinc Nəcəfova',
    preferredDate: '2024-12-20',
    message: 'Baş ağrısı problemi var',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

// Data access helpers (mock Supabase API)
export const db = {
  doctors: {
    getAll: () => [...doctorsStore].sort((a, b) => a.orderIndex - b.orderIndex),
    getById: (id: string) => doctorsStore.find(d => d.id === id),
    create: (data: Omit<Doctor, 'id'>) => {
      const doc: Doctor = { ...data, id: Date.now().toString() };
      doctorsStore.push(doc);
      return doc;
    },
    update: (id: string, data: Partial<Doctor>) => {
      doctorsStore = doctorsStore.map(d => d.id === id ? { ...d, ...data } : d);
      return doctorsStore.find(d => d.id === id);
    },
    delete: (id: string) => { doctorsStore = doctorsStore.filter(d => d.id !== id); },
  },
  services: {
    getAll: () => [...servicesStore].sort((a, b) => a.orderIndex - b.orderIndex),
    getById: (id: string) => servicesStore.find(s => s.id === id),
    create: (data: Omit<Service, 'id'>) => {
      const svc: Service = { ...data, id: Date.now().toString() };
      servicesStore.push(svc);
      return svc;
    },
    update: (id: string, data: Partial<Service>) => {
      servicesStore = servicesStore.map(s => s.id === id ? { ...s, ...data } : s);
      return servicesStore.find(s => s.id === id);
    },
    delete: (id: string) => { servicesStore = servicesStore.filter(s => s.id !== id); },
  },
  blog: {
    getAll: () => [...blogPostsStore].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    getBySlug: (slug: string) => blogPostsStore.find(p => p.slug === slug),
    create: (data: Omit<BlogPost, 'id'>) => {
      const post: BlogPost = { ...data, id: Date.now().toString() };
      blogPostsStore.push(post);
      return post;
    },
    update: (id: string, data: Partial<BlogPost>) => {
      blogPostsStore = blogPostsStore.map(p => p.id === id ? { ...p, ...data } : p);
      return blogPostsStore.find(p => p.id === id);
    },
    delete: (id: string) => { blogPostsStore = blogPostsStore.filter(p => p.id !== id); },
  },
  appointments: {
    getAll: () => [...appointmentsStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    create: (data: Omit<Appointment, 'id' | 'createdAt'>) => {
      const apt: Appointment = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
      appointmentsStore.push(apt);
      return apt;
    },
    updateStatus: (id: string, status: Appointment['status']) => {
      appointmentsStore = appointmentsStore.map(a => a.id === id ? { ...a, status } : a);
    },
  },
};
