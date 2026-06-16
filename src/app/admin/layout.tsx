'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard, Users, Briefcase, BookOpen, Calendar,
  LogOut, Menu, X, ChevronRight, FileText, MessageSquare, Megaphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/admin', label: 'İcmal', icon: LayoutDashboard },
  { href: '/admin/content', label: 'Sayt Məzmunu', icon: FileText },
  { href: '/admin/doctors', label: 'Həkimlər', icon: Users },
  { href: '/admin/services', label: 'Xidmətlər', icon: Briefcase },
  { href: '/admin/blog', label: 'Bloq', icon: BookOpen },
  { href: '/admin/reviews', label: 'Rəylər', icon: MessageSquare },
  { href: '/admin/appointments', label: 'Qeydiyyatlar', icon: Calendar },
  { href: '/admin/popup', label: 'Qarşılama Ekranı', icon: Megaphone },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'true') setAuthenticated(true);
    setLoading(false);
  }, []);

  const handleLogin = () => {
    if (password === 'admin2024') {
      sessionStorage.setItem('admin-auth', 'true');
      setAuthenticated(true);
      setError('');
    } else {
      setError('Şifrə yanlışdır. Yenidən cəhd edin.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth');
    setAuthenticated(false);
    setPassword('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="w-8 h-8 border-3 border-[#76c122] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#3f7215] leading-tight">Admin Panel</p>
                <p className="text-xs text-gray-500">Reabilitasiya Mərkəzi</p>
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 text-center mb-6" style={{ fontFamily: 'Raleway, sans-serif' }}>
              Daxil Olun
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifrə</label>
                <input
                  type="password"
                  placeholder="Admin şifrəsini daxil edin"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20"
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}
              <Button
                onClick={handleLogin}
                className="w-full py-3 rounded-xl font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
              >
                Daxil Ol
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Demo şifrə: <code className="bg-gray-100 px-1.5 py-0.5 rounded">admin2024</code>
              </p>
            </div>
          </div>
          <p className="text-center mt-4">
            <Link href="/" className="text-sm text-[#76c122] hover:underline">← Sayta Qayıt</Link>
          </p>
        </div>
      </div>
    );
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#3f7215]">Admin Panel</p>
            <p className="text-[10px] text-gray-500">Reabilitasiya Mərkəzi</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              style={active ? { background: 'linear-gradient(135deg, #76c122, #3f7215)' } : {}}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Çıxış
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 bg-white border-r border-gray-100 flex-col h-screen sticky top-0 shadow-sm">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-60 bg-white h-full shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-sm font-semibold text-gray-500">
              {navItems.find(n => n.href === pathname)?.label || 'Admin Panel'}
            </h2>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">Reabilitasiya Mərkəzi</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-[#76c122] to-[#3f7215] rounded-xl flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
