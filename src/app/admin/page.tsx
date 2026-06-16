'use client';

import { Users, Briefcase, BookOpen, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { doctors, services, blogPosts } from '@/lib/data';

const stats = [
  { label: 'Həkimlər', value: doctors.length, icon: Users, href: '/admin/doctors', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
  { label: 'Xidmətlər', value: services.length, icon: Briefcase, href: '/admin/services', color: 'bg-violet-50 text-violet-600', border: 'border-violet-100' },
  { label: 'Blog Yazıları', value: blogPosts.length, icon: BookOpen, href: '/admin/blog', color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
  { label: 'Qeydiyyatlar', value: 1, icon: Calendar, href: '/admin/appointments', color: 'bg-green-50 text-green-600', border: 'border-green-100' },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #76c122, #3f7215)' }}>
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Xoş Gəldiniz! 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">Regional Müalicə və Reabilitasiya Mərkəzi — Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <div className={`bg-white rounded-2xl border ${stat.border} p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group`}>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xs text-[#76c122] font-medium mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                İdarə et <ArrowRight className="w-3 h-3" />
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: 'Raleway, sans-serif' }}>
          Sürətli Əməliyyatlar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Yeni Həkim Əlavə Et', href: '/admin/doctors', icon: Users, color: '#76c122' },
            { label: 'Blog Yazısı Yaz', href: '/admin/blog', icon: BookOpen, color: '#3f7215' },
            { label: 'Qeydiyyatları Gör', href: '/admin/appointments', icon: Calendar, color: '#5fa010' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: action.color }}
              >
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#3f7215]">{action.label}</span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-[#76c122] group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent doctors preview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
            Son Həkimlər
          </h2>
          <Link href="/admin/doctors" className="text-sm text-[#76c122] hover:underline font-medium">
            Hamısını gör →
          </Link>
        </div>
        <div className="space-y-3">
          {doctors.slice(0, 3).map((doc) => (
            <div key={doc.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-[#76c122] font-bold text-sm flex-shrink-0">
                {doc.name.charAt(3)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{doc.name}</p>
                <p className="text-xs text-[#76c122] truncate">{doc.title}</p>
              </div>
              <span className="text-xs text-gray-400 bg-white px-2.5 py-1 rounded-lg border border-gray-100 flex-shrink-0">
                {doc.experience}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
