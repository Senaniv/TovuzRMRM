'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useSiteContent } from '@/lib/siteContent';
import { Service } from '@/lib/types';

export default function AdminServices() {
  const { services: list, saveService, deleteService } = useSiteContent();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Service & { subItemsText: string }>>({});

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', description: '', icon: 'Brain', category: '', colorAccent: '', subItemsText: '', orderIndex: list.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (svc: Service) => {
    setEditing(svc);
    setForm({ ...svc, subItemsText: svc.subItems.join('\n') });
    setModalOpen(true);
  };

  const handleSave = () => {
    const subItems = (form.subItemsText || '').split('\n').filter(Boolean);
    if (editing) {
      saveService({ ...editing, ...form, subItems } as Service);
    } else {
      saveService({ ...form, id: Date.now().toString(), subItems } as Service);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteService(id);
    setDeleteId(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>Xidmətlər</h1>
          <p className="text-sm text-gray-500 mt-1">{list.length} xidmət</p>
        </div>
        <Button onClick={openCreate} className="text-white rounded-xl font-semibold flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}>
          <Plus className="w-4 h-4" /> Xidmət Əlavə Et
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Xidmət</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kateqoriya</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Alt Xidmətlər</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map(svc => (
                <tr key={svc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">{svc.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{svc.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge className="text-xs border-0 bg-green-100 text-[#3f7215]">{svc.category}</Badge>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-xs text-gray-500">{svc.subItems.slice(0, 2).join(', ')}{svc.subItems.length > 2 ? '...' : ''}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(svc)} className="w-8 h-8 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteId(svc.id)} className="w-8 h-8 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6 border-0 shadow-2xl">
          <DialogTitle className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: 'Raleway, sans-serif' }}>
            {editing ? 'Xidməti Redaktə Et' : 'Yeni Xidmət'}
          </DialogTitle>
          <div className="space-y-4">
            {[
              { id: 'name', label: 'Ad', placeholder: 'Xidmət adı' },
              { id: 'category', label: 'Kateqoriya', placeholder: 'Nevrologiya' },
              { id: 'icon', label: 'İkon (Lucide)', placeholder: 'Brain' },
            ].map(f => (
              <div key={f.id}>
                <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">{f.label}</Label>
                <Input
                  placeholder={f.placeholder}
                  value={(form as Record<string, string>)[f.id] || ''}
                  onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                  className="rounded-xl border-gray-200 focus:border-[#76c122] text-sm"
                />
              </div>
            ))}
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">Təsvir</Label>
              <Textarea
                placeholder="Xidmət haqqında qısa təsvir..."
                value={form.description || ''}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={2}
                className="rounded-xl border-gray-200 focus:border-[#76c122] resize-none text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">Alt Xidmətlər (hər biri yeni sətirdə)</Label>
              <Textarea
                placeholder="EEQ&#10;EMQ&#10;Neyrofeedback"
                value={form.subItemsText || ''}
                onChange={e => setForm(p => ({ ...p, subItemsText: e.target.value }))}
                rows={4}
                className="rounded-xl border-gray-200 focus:border-[#76c122] resize-none text-sm font-mono"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1 rounded-xl">Ləğv et</Button>
            <Button onClick={handleSave} disabled={!form.name} className="flex-1 text-white rounded-xl" style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}>
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
