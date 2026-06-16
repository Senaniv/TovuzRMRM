// TypeScript types for the application

export interface Doctor {
  id: string;
  name: string;
  title: string;       // e.g. "Uzman Psixiatr"
  specialty: string;
  image: string;
  bio: string;
  experience: string;  // e.g. "12 il"
  orderIndex: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;        // Lucide icon name
  category: string;
  colorAccent: string; // Tailwind bg class
  subItems: string[];
  orderIndex: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  publishedAt: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName?: string;
  doctorId: string;
  doctorName?: string;
  preferredDate: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}
