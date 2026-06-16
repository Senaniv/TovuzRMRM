'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, X, Check, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useSiteContent } from '@/lib/siteContent';
import { Doctor } from '@/lib/types';

export default function AdminDoctors() {
  const { doctors: list, saveDoctor, deleteDoctor } = useSiteContent();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Doctor>>({});

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', title: '', specialty: '', image: '/doctor-1.png', bio: '', experience: '', orderIndex: list.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (doc: Doctor) => {
    setEditing(doc);
    setForm({ ...doc });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      saveDoctor({ ...editing, ...form } as Doctor);
    } else {
      saveDoctor({ ...form, id: Date.now().toString() } as Doctor);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteDoctor(id);
    setDeleteId(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>Həkimlər</h1>
          <p className="text-sm text-gray-500 mt-1">{list.length} həkim qeydiyyatda</p>
        </div>
        <Button
          onClick={openCreate}
          className="text-white rounded-xl font-semibold flex items-center gap-2 shadow-md"
          style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
        >
          <Plus className="w-4 h-4" /> Həkim Əlavə Et
        </Button>
      </div>

      {/* Doctors grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
            <div className="relative h-52 bg-gradient-to-b from-green-50 to-green-100">
              <Image src={doc.image} alt={doc.name} fill className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(doc)}
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow text-gray-600 hover:text-[#76c122] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(doc.id)}
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="font-bold text-gray-900 text-sm">{doc.name}</p>
              <p className="text-xs text-[#76c122] font-medium mt-0.5">{doc.title}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />{doc.experience}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="w-3 h-3 text-amber-400" />5.0
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Add card */}
        <button
          onClick={openCreate}
          className="border-2 border-dashed border-green-200 rounded-2xl h-full min-h-[280px] flex flex-col items-center justify-center gap-3 hover:border-[#76c122] hover:bg-green-50 transition-all text-gray-400 hover:text-[#76c122]"
        >
          <Plus className="w-8 h-8" />
          <span className="text-sm font-medium">Həkim Əlavə Et</span>
        </button>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6 border-0 shadow-2xl">
          <DialogTitle className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: 'Raleway, sans-serif' }}>
            {editing ? 'Həkimi Redaktə Et' : 'Yeni Həkim'}
          </DialogTitle>
          <div className="space-y-4">
            {[
              { id: 'name', label: 'Ad Soyad', placeholder: 'Dr. Ad Soyad' },
              { id: 'title', label: 'Vəzifə', placeholder: 'Uzman Nevroloq' },
              { id: 'specialty', label: 'İxtisas', placeholder: 'Nevrologiya, EEQ' },
              { id: 'experience', label: 'Təcrübə', placeholder: '10 il' },
              { id: 'image', label: 'Şəkil URL', placeholder: '/doctor-1.png' },
            ].map(field => (
              <div key={field.id}>
                <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">{field.label}</Label>
                <Input
                  placeholder={field.placeholder}
                  value={(form as Record<string, string>)[field.id] || ''}
                  onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                  className="rounded-xl border-gray-200 focus:border-[#76c122] text-sm"
                />
              </div>
            ))}
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">Bio</Label>
              <Textarea
                placeholder="Həkim haqqında qısa məlumat..."
                value={form.bio || ''}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                rows={3}
                className="rounded-xl border-gray-200 focus:border-[#76c122] resize-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1 rounded-xl">Ləğv et</Button>
            <Button
              onClick={handleSave}
              disabled={!form.name}
              className="flex-1 text-white rounded-xl"
              style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
            >
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
