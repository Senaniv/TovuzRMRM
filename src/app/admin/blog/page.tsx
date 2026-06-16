'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { blogPosts as initialPosts } from '@/lib/data';
import { BlogPost } from '@/lib/types';

export default function AdminBlog() {
  const [list, setList] = useState<BlogPost[]>(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', slug: '', excerpt: '', content: '', author: '', category: '', publishedAt: new Date().toISOString().split('T')[0] });
    setModalOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({ ...post });
    setModalOpen(true);
  };

  const handleSave = () => {
    const slug = form.slug || form.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '';
    if (editing) {
      setList(prev => prev.map(p => p.id === editing.id ? { ...p, ...form, slug } as BlogPost : p));
    } else {
      const newPost: BlogPost = { ...form as BlogPost, id: Date.now().toString(), slug, createdAt: new Date().toISOString() };
      setList(prev => [...prev, newPost]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setList(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  };

  const categoryColors: Record<string, string> = {
    'Reabilitasiya': 'bg-blue-100 text-blue-700',
    'Pediatriya': 'bg-pink-100 text-pink-700',
    'Nevrologiya': 'bg-violet-100 text-violet-700',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>Bloq</h1>
          <p className="text-sm text-gray-500 mt-1">{list.length} məqalə</p>
        </div>
        <Button onClick={openCreate} className="text-white rounded-xl font-semibold flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}>
          <Plus className="w-4 h-4" /> Məqalə Əlavə Et
        </Button>
      </div>

      {/* Blog cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {list.map(post => (
          <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-green-100 text-green-700'}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{post.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString('az-AZ')}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(post)} className="w-7 h-7 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button onClick={() => setDeleteId(post.id)} className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add card */}
        <button
          onClick={openCreate}
          className="border-2 border-dashed border-green-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-[#76c122] hover:bg-green-50 transition-all text-gray-400 hover:text-[#76c122]"
        >
          <Plus className="w-8 h-8" />
          <span className="text-sm font-medium">Məqalə Əlavə Et</span>
        </button>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg rounded-2xl p-6 border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: 'Raleway, sans-serif' }}>
            {editing ? 'Məqaləni Redaktə Et' : 'Yeni Məqalə'}
          </DialogTitle>
          <div className="space-y-4">
            {[
              { id: 'title', label: 'Başlıq', placeholder: 'Məqalə başlığı' },
              { id: 'author', label: 'Müəllif', placeholder: 'Dr. Ad Soyad' },
              { id: 'category', label: 'Kateqoriya', placeholder: 'Nevrologiya' },
              { id: 'publishedAt', label: 'Tarix', placeholder: '', type: 'date' },
            ].map(f => (
              <div key={f.id}>
                <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">{f.label}</Label>
                <Input
                  type={f.type || 'text'}
                  placeholder={f.placeholder}
                  value={(form as Record<string, string>)[f.id] || ''}
                  onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                  className="rounded-xl border-gray-200 focus:border-[#76c122] text-sm"
                />
              </div>
            ))}
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">Xülasə</Label>
              <Textarea
                placeholder="Məqalənin qısa xülasəsi..."
                value={form.excerpt || ''}
                onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                rows={3}
                className="rounded-xl border-gray-200 focus:border-[#76c122] resize-none text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">Məzmun</Label>
              <Textarea
                placeholder="Məqalənin tam məzmunu..."
                value={form.content || ''}
                onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                rows={6}
                className="rounded-xl border-gray-200 focus:border-[#76c122] resize-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1 rounded-xl">Ləğv et</Button>
            <Button onClick={handleSave} disabled={!form.title} className="flex-1 text-white rounded-xl" style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}>
              <Check className="w-4 h-4 mr-2" /> Saxla
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm rounded-2xl p-6 border-0 shadow-2xl text-center">
          <DialogTitle className="text-lg font-bold text-gray-900 mb-2">Silmək istəyirsiniz?</DialogTitle>
          <p className="text-sm text-gray-500 mb-6">Bu əməliyyat geri qaytarıla bilməz.</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)} className="flex-1 rounded-xl">Xeyr</Button>
            <Button onClick={() => handleDelete(deleteId!)} className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white">Sil</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
