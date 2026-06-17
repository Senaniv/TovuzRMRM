'use client';

import { useState, useEffect } from 'react';
import {
  Save, RotateCcw, Check, MessageSquare, Trash2, Plus, Pencil, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useSiteContent, defaultContent, SiteContent, Review } from '@/lib/siteContent';

const AVATAR_FEMALE = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150';
const AVATAR_MALE = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';

export default function AdminReviewsPage() {
  const { content, saveContent, resetContent, loaded } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState(false);

  // Modal Dialog states
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Review & { gender: 'male' | 'female' }>>({});

  // Sync draft when content loads from context
  useEffect(() => {
    if (loaded) setDraft(content);
  }, [loaded, content]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', rating: 5, comment: '', gender: 'female' });
    setModalOpen(true);
  };

  const openEdit = (review: Review) => {
    setEditing(review);
    const isFemale = review.avatar.includes('1494790108377-be9c29b29330') || review.avatar.includes('1438761681033-6461ffad8d80');
    setForm({ ...review, gender: isFemale ? 'female' : 'male' });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDraft(prev => {
      const list = prev.reviewsSection.list.filter(r => r.id !== id);
      return {
        ...prev,
        reviewsSection: {
          ...prev.reviewsSection,
          list,
        },
      };
    });
    setDeleteId(null);
  };

  const handleModalSave = () => {
    const avatar = form.gender === 'female' ? AVATAR_FEMALE : AVATAR_MALE;
    const updatedReview: Review = {
      id: editing ? editing.id : Date.now().toString(),
      name: form.name || 'Pasiyent',
      rating: form.rating || 5,
      comment: form.comment || '',
      avatar,
    };

    setDraft(prev => {
      let list = [...prev.reviewsSection.list];
      if (editing) {
        list = list.map(r => r.id === editing.id ? updatedReview : r);
      } else {
        list = [...list, updatedReview];
      }
      return {
        ...prev,
        reviewsSection: {
          ...prev.reviewsSection,
          list,
        },
      };
    });
    setModalOpen(false);
  };

  const handleSave = () => {
    saveContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Bütün dəyişikliklər silinəcək və default rəylər bərpa ediləcək. Davam edilsin?')) {
      resetContent();
      setDraft(defaultContent);
    }
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-[#76c122] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const reviewsList = draft.reviewsSection?.list || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #76c122, #3f7215)' }}>
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Müştəri Rəyləri
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Saytda görünən pasiyent rəylərini əlavə edin, silin və redaktə edin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl border border-gray-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
            </button>
            <Button
              onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all ${
                saved ? 'bg-green-600' : ''
              }`}
              style={!saved ? { background: 'linear-gradient(135deg, #76c122, #5fa010)' } : {}}
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saxlanıldı!' : 'Saxla'}
            </Button>
          </div>
        </div>

        {saved && (
          <div className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 font-medium">
            <Check className="w-4 h-4 flex-shrink-0" />
            Dəyişikliklər saxlanıldı. Saytı yeniləyərək nəticəni görə bilərsiniz.
          </div>
        )}
      </div>

      {/* Tabular Reviews List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
            Pasiyent Rəyləri Siyahısı ({reviewsList.length})
          </h2>
          <Button
            type="button"
            size="sm"
            onClick={openCreate}
            className="flex items-center gap-1 bg-green-50 text-[#3f7215] hover:bg-green-100 border border-green-100 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Yeni Rəy
          </Button>
        </div>

        {reviewsList.length > 0 ? (
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Pasiyent</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Reytinq</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Cinsiyyət</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Şərh / Rəy</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 text-right uppercase">Əməliyyat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {reviewsList.map((review) => {
                    const isFemale = review.avatar.includes('1494790108377-be9c29b29330') || review.avatar.includes('1438761681033-6461ffad8d80');
                    return (
                      <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-gray-900">{review.name}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                className={`w-3.5 h-3.5 ${
                                  starIdx < review.rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <Badge className={`text-xs border-0 font-medium ${isFemale ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                            {isFemale ? 'Qadın' : 'Kişi'}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 text-gray-500 max-w-xs truncate">{review.comment}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(review)}
                              className="w-8 h-8 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteId(review.id)}
                              className="w-8 h-8 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500 font-medium">Hələ rəy əlavə edilməyib.</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openCreate}
              className="mt-3 text-xs text-[#76c122] hover:text-[#3f7215]"
            >
              İlk Rəyi Əlavə Et
            </Button>
          </div>
        )}
      </div>

      {/* Edit/Create Dialog Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6 border-0 shadow-2xl">
          <DialogTitle className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: 'Raleway, sans-serif' }}>
            {editing ? 'Rəyi Redaktə Et' : 'Yeni Rəy Əlavə Et'}
          </DialogTitle>
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">Pasiyent Adı</Label>
              <Input
                placeholder="Pasiyentin adı və soyadı (məs. Aysel K.)"
                value={form.name || ''}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="rounded-xl border-gray-200 focus:border-[#76c122] text-sm"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">Reytinq (Ulduz)</Label>
              <select
                value={form.rating || 5}
                onChange={e => setForm(p => ({ ...p, rating: parseInt(e.target.value) }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20 transition"
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>
                    {num} Ulduz
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">Cinsiyyət (Avatar)</Label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition font-medium text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === 'male'}
                    onChange={() => setForm(p => ({ ...p, gender: 'male' }))}
                    className="accent-[#76c122] w-4 h-4"
                  />
                  Kişi
                </label>
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition font-medium text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === 'female'}
                    onChange={() => setForm(p => ({ ...p, gender: 'female' }))}
                    className="accent-[#76c122] w-4 h-4"
                  />
                  Qadın
                </label>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1.5 block">Şərh / Rəy</Label>
              <Textarea
                placeholder="Pasiyent şərhi..."
                value={form.comment || ''}
                onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
                rows={4}
                className="rounded-xl border-gray-200 focus:border-[#76c122] resize-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1 rounded-xl">Ləğv et</Button>
            <Button
              onClick={handleModalSave}
              disabled={!form.name || !form.comment}
              className="flex-1 text-white rounded-xl"
              style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
            >
              <Check className="w-4 h-4 mr-2" /> Əlavə Et
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm rounded-2xl p-6 border-0 shadow-2xl text-center">
          <DialogTitle className="text-lg font-bold text-gray-900 mb-2">Silmək istəyirsiniz?</DialogTitle>
          <p className="text-sm text-gray-500 mb-6">Bu rəy siyahıdan silinəcəkdir.</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)} className="flex-1 rounded-xl">Xeyr</Button>
            <Button onClick={() => handleDelete(deleteId!)} className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white">Sil</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sticky Save bar at bottom */}
      <div className="sticky bottom-4 z-20">
        <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg px-5 py-3 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">Dəyişiklikləri yaddaşda saxlamağı unutmayın</p>
          <Button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold text-white transition-all ${saved ? 'bg-green-600' : ''}`}
            style={!saved ? { background: 'linear-gradient(135deg, #76c122, #5fa010)' } : {}}
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saxlanıldı!' : 'Yadda saxla'}
          </Button>
        </div>
      </div>
    </div>
  );
}
