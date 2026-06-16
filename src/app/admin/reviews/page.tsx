'use client';

import { useState, useEffect } from 'react';
import {
  Save, RotateCcw, Check, MessageSquare, Trash2, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent, defaultContent, SiteContent, Review } from '@/lib/siteContent';

// ─── Reusable Field Components ────────────────────────────────────────────────
function Field({
  label, value, onChange, multiline = false, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20 resize-none transition"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20 transition"
        />
      )}
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

export default function AdminReviewsPage() {
  const { content, saveContent, resetContent, loaded } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState(false);

  // Sync draft when content loads from localStorage
  useEffect(() => {
    if (loaded) setDraft(content);
  }, [loaded, content]);

  // Generic deep updater
  function update<S extends keyof SiteContent>(section: S, field: keyof SiteContent[S], value: string) {
    setDraft(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }

  // Update review item field
  function updateReviewField(id: string, field: keyof Review, value: any) {
    setDraft(prev => {
      const list = prev.reviewsSection.list.map(r => {
        if (r.id === id) {
          return { ...r, [field]: value };
        }
        return r;
      });
      return {
        ...prev,
        reviewsSection: {
          ...prev.reviewsSection,
          list,
        },
      };
    });
  }

  // Delete review item
  function deleteReview(id: string) {
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
  }

  // Add review item
  function addReview() {
    setDraft(prev => {
      const newReview: Review = {
        id: Date.now().toString(),
        name: 'Yeni Pasiyent',
        rating: 5,
        comment: 'Klinikadan çox məmnun qaldım. Hər şey yüksək səviyyədə idi.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      };
      return {
        ...prev,
        reviewsSection: {
          ...prev.reviewsSection,
          list: [...prev.reviewsSection.list, newReview],
        },
      };
    });
  }

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

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
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



      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
            Pasiyent Rəyləri Siyahısı
          </h2>
          <Button
            type="button"
            size="sm"
            onClick={addReview}
            className="flex items-center gap-1 bg-green-50 text-[#3f7215] hover:bg-green-100 border border-green-100 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Yeni Rəy
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {draft.reviewsSection.list.map((review, index) => (
            <div key={review.id} className="p-5 bg-gray-50/60 hover:bg-gray-50 rounded-2xl border border-gray-200/50 relative space-y-4 transition">
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => deleteReview(review.id)}
                  className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-white bg-white hover:bg-red-500 px-2.5 py-1.5 rounded-lg border border-red-200 hover:border-red-500 transition-all shadow-sm"
                >
                  <Trash2 className="w-3 h-3" /> Sil
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#76c122]/15 text-[#3f7215] font-bold text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-xs font-bold text-gray-400">Pasiyent Rəyi</span>
              </div>

              <Field
                label="Pasiyent Adı"
                value={review.name}
                onChange={v => updateReviewField(review.id, 'name', v)}
              />
              <Field
                label="Avatar Şəkli (Link)"
                value={review.avatar}
                onChange={v => updateReviewField(review.id, 'avatar', v)}
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Reytinq (1-5 ulduz)
                </label>
                <select
                  value={review.rating}
                  onChange={e => updateReviewField(review.id, 'rating', parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20 transition"
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>
                      {num} Ulduz
                    </option>
                  ))}
                </select>
              </div>

              <Field
                label="Şərh / Rəy"
                value={review.comment}
                onChange={v => updateReviewField(review.id, 'comment', v)}
                multiline
              />
            </div>
          ))}
        </div>

        {draft.reviewsSection.list.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500 font-medium">Hələ rəy əlavə edilməyib.</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addReview}
              className="mt-3 text-xs text-[#76c122] hover:text-[#3f7215]"
            >
              İlk Rəyi Əlavə Et
            </Button>
          </div>
        )}
      </div>

      {/* Sticky Save bar at bottom */}
      <div className="sticky bottom-4 z-20">
        <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg px-5 py-3 flex items-center justify-between">
          <p className="text-xs text-gray-500">Dəyişiklikləri saxlamağı unutmayın</p>
          <Button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold text-white transition-all ${saved ? 'bg-green-600' : ''}`}
            style={!saved ? { background: 'linear-gradient(135deg, #76c122, #5fa010)' } : {}}
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saxlanıldı!' : 'Saxla'}
          </Button>
        </div>
      </div>
    </div>
  );
}
