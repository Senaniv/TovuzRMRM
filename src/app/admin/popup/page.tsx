'use client';

import { useState, useEffect } from 'react';
import { Megaphone, Save, Check, AlertCircle, Eye, Trash2, Calendar, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/lib/siteContent';
import { uploadImage } from '@/lib/supabase';

function toLocalDatetimeString(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    return '';
  }
}

export default function AdminPopupPage() {
  const { popupData, savePopup, loaded } = useSiteContent();
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [expiresAt, setExpiresAt] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (loaded && popupData) {
      setImageUrl(popupData.image_url || '');
      setIsActive(!!popupData.is_active);
      setExpiresAt(toLocalDatetimeString(popupData.expires_at));
    }
  }, [loaded, popupData]);

  const handleSave = async () => {
    setError('');
    if (!imageUrl) {
      setError('Zəhmət olmasa şəkil linkini (URL) daxil edin.');
      return;
    }
    if (!expiresAt) {
      setError('Zəhmət olmasa bitmə tarixini seçin.');
      return;
    }

    try {
      const expirationIso = new Date(expiresAt).toISOString();
      await savePopup({
        image_url: imageUrl,
        is_active: isActive,
        expires_at: expirationIso,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err?.message || 'Yadda saxlayan zaman xəta baş verdi.');
    }
  };

  const handleClear = () => {
    setImageUrl('');
    setIsActive(false);
    setExpiresAt('');
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-[#76c122] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate status badge
  const isExpired = expiresAt ? new Date() > new Date(expiresAt) : false;
  const showActiveStatus = isActive && imageUrl && expiresAt && !isExpired;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #76c122, #3f7215)' }}>
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Qarşılama Ekranı (Welcome Popup)
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Sayt açılarkən görünən elan/kampaniya pəncərəsini tənzimləyin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition"
            >
              <Eye className="w-3.5 h-3.5" /> Sayta bax
            </a>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl border border-gray-200 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Təmizlə
            </button>
            <Button
              onClick={handleSave}
              disabled={saved || isUploadingImage}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer ${
                saved ? 'bg-green-600' : ''
              }`}
              style={!saved ? { background: 'linear-gradient(135deg, #76c122, #5fa010)' } : {}}
            >
              {isUploadingImage ? (
                <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Yüklənir...</span>
              ) : (
                <>{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />} {saved ? 'Saxlanıldı!' : 'Saxla'}</>
              )}
            </Button>
          </div>
        </div>

        {saved && (
          <div className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 font-medium">
            <Check className="w-4 h-4 flex-shrink-0" />
            Dəyişikliklər uğurla yadda saxlanıldı!
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Controls Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-3">Tənzimləmələr</h2>
            
            {/* Image Upload Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Kampaniya Şəkli
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setIsUploadingImage(true);
                    setError('');
                    try {
                      const url = await uploadImage(file, 'popup');
                      setImageUrl(url);
                    } catch (err: any) {
                      setError(err.message || 'Şəkil yüklənərkən xəta baş verdi');
                    } finally {
                      setIsUploadingImage(false);
                    }
                  }}
                  disabled={isUploadingImage}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20 transition cursor-pointer"
                />
              </div>
              {isUploadingImage && <p className="text-xs text-[#76c122] mt-1">Şəkil yüklənir...</p>}
              <p className="text-[11px] text-gray-400">
                Açılan modal pəncərədə nümayiş olunacaq kampaniya şəklini yükləyin.
              </p>
            </div>

            {/* Expiration DateTime Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Bitmə Tarixi və Saatı
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20 transition"
                />
                <Calendar className="absolute left-3 top-3 w-4.5 h-4.5 text-gray-400" />
              </div>
              <p className="text-[11px] text-gray-400">
                Bu tarixdən sonra pəncərə saytda avtomatik olaraq gizlədiləcəkdir.
              </p>
            </div>

            {/* Manual Toggle Switch */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <p className="text-sm font-semibold text-gray-800">Statusu Aktiv Et</p>
                <p className="text-xs text-gray-500">Qarşılama ekranının saytda görünməsini əllə idarə edin</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#76c122]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Info & Status Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-3">Cari Status</h2>
            
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">Hazırkı Vəziyyət:</span>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${showActiveStatus ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm font-bold text-gray-800">
                  {showActiveStatus ? 'Aktiv (Saytda göstərilir)' : 'Deaktiv (Göstərilmir)'}
                </span>
              </div>
            </div>

            {isExpired && expiresAt && (
              <div className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                ⚠️ Seçilmiş bitmə tarixi keçmiş zamandadır, buna görə də popup deaktivdir.
              </div>
            )}
          </div>

          {/* Live Preview Card */}
          {imageUrl && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-3">Şəkil Önizləməsi</h2>
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center max-h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Popup Preview"
                  className="object-contain max-h-48 w-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=400';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="sticky bottom-4 z-20">
        <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg px-5 py-3 flex items-center justify-between">
          <p className="text-xs text-gray-500">Məlumatları yadda saxlamağı unutmayın</p>
          <Button
            onClick={handleSave}
            disabled={saved || isUploadingImage}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer ${
              saved ? 'bg-green-600' : ''
            }`}
            style={!saved ? { background: 'linear-gradient(135deg, #76c122, #5fa010)' } : {}}
          >
            {isUploadingImage ? (
              <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Yüklənir...</span>
            ) : (
              <>{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />} {saved ? 'Saxlanıldı!' : 'Saxla'}</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
