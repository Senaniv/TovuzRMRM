'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Save, RotateCcw, Upload, Check, AlertCircle, ChevronDown, ChevronUp,
  Layout, Cpu, Info, Grid, Users, BookOpen, Phone, ImageIcon, Eye, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent, defaultContent, SiteContent } from '@/lib/siteContent';

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

function SectionCard({
  title, icon: Icon, children, defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #76c122, #3f7215)' }}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900">{title}</span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400" />
          : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 space-y-4 border-t border-gray-50">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Logo Upload Panel ────────────────────────────────────────────────────────
function LogoUploadPanel() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [logoTs, setLogoTs] = useState(Date.now());

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file && !preview) return;
    const inputFile = fileRef.current?.files?.[0];
    if (!inputFile) { setMessage({ type: 'error', text: 'Zəhmət olmasa fayl seçin' }); return; }
    setUploading(true);
    setMessage(null);
    const fd = new FormData();
    fd.append('logo', inputFile);
    try {
      const res = await fetch('/api/upload-logo', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Loqo uğurla yükləndi!' });
        setPreview(null);
        if (fileRef.current) fileRef.current.value = '';
        setLogoTs(Date.now());
      } else {
        setMessage({ type: 'error', text: data.error || 'Xəta baş verdi' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Şəbəkə xətası baş verdi' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Current logo */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cari Loqo</p>
        <div className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
          <Image
            key={logoTs}
            src={`/logo.png?t=${logoTs}`}
            alt="Current logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-200 hover:border-[#76c122] rounded-2xl p-8 text-center cursor-pointer transition-colors group"
      >
        {preview ? (
          <div className="flex flex-col items-center gap-3">
            <Image src={preview} alt="Preview" width={80} height={80} className="object-contain rounded-xl" />
            <p className="text-xs text-gray-500">Şəkil seçildi. Yükləmək üçün "Loqonu Yüklə" düyməsini basın.</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-green-100 transition-colors">
              <ImageIcon className="w-6 h-6 text-[#76c122]" />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Loqo şəklini buraya sürükləyin</p>
            <p className="text-xs text-gray-400">və ya seçmək üçün klikləyin</p>
            <p className="text-xs text-gray-400 mt-2">PNG, JPG, SVG, WebP — maks. 5MB</p>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      {message && (
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${
          message.type === 'success'
            ? 'bg-green-50 text-green-700 border border-green-100'
            : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          {message.type === 'success'
            ? <Check className="w-4 h-4 flex-shrink-0" />
            : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          {message.text}
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={uploading || !preview}
        className="w-full py-2.5 rounded-xl font-semibold text-white disabled:opacity-50"
        style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
      >
        {uploading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Yüklənir...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Loqonu Yüklə
          </span>
        )}
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContentPage() {
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



  const handleSave = () => {
    saveContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Bütün dəyişikliklər silinəcək və default mətnlər bərpa ediləcək. Davam edilsin?')) {
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
    <div className="max-w-3xl mx-auto space-y-5 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #76c122, #3f7215)' }}>
              <Layout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Sayt Məzmunu
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Bütün başlıq, mətn və loqonu buradan redaktə edin
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
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl border border-gray-200 transition"
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

      {/* ── LOGO ──────────────────────────────────────────────── */}
      <SectionCard title="Loqo" icon={ImageIcon} defaultOpen={true}>
        <LogoUploadPanel />
      </SectionCard>

      {/* ── HEADER ────────────────────────────────────────────── */}
      <SectionCard title="Header (Yuxarı Bölmə)" icon={Layout} defaultOpen={true}>
        <Field
          label="Mərkəz adı"
          value={draft.header.centerName}
          onChange={v => update('header', 'centerName', v)}
        />
        <FieldRow>
          <Field label="Telefon" value={draft.header.phone} onChange={v => update('header', 'phone', v)} />
          <Field label="E-poçt" value={draft.header.email} onChange={v => update('header', 'email', v)} />
        </FieldRow>
        <Field label="Ünvan" value={draft.header.address} onChange={v => update('header', 'address', v)} />
      </SectionCard>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <SectionCard title="Hero Bölməsi (Əsas Ekran)" icon={Cpu}>
        <Field label="Badge mətni" value={draft.hero.badge} onChange={v => update('hero', 'badge', v)} />
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Başlıq (3 sətir)
          </label>
          <div className="space-y-2">
            <input type="text" value={draft.hero.heading1}
              onChange={e => update('hero', 'heading1', e.target.value)}
              placeholder="Sətir 1"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20 transition" />
            <input type="text" value={draft.hero.heading2}
              onChange={e => update('hero', 'heading2', e.target.value)}
              placeholder="Sətir 2 (yaşıl rəngdə görünür)"
              className="w-full px-3 py-2.5 border border-[#76c122]/40 rounded-xl text-sm text-[#3f7215] bg-green-50 focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20 transition font-semibold" />
            <input type="text" value={draft.hero.heading3}
              onChange={e => update('hero', 'heading3', e.target.value)}
              placeholder="Sətir 3"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#76c122] focus:ring-2 focus:ring-[#76c122]/20 transition" />
          </div>
        </div>
        <Field label="Alt mətn (paragraf)" value={draft.hero.subtext} onChange={v => update('hero', 'subtext', v)} multiline />
        <FieldRow>
          <Field label='Əsas düymə mətni' value={draft.hero.ctaPrimary} onChange={v => update('hero', 'ctaPrimary', v)} />
          <Field label='İkinci düymə mətni' value={draft.hero.ctaSecondary} onChange={v => update('hero', 'ctaSecondary', v)} />
        </FieldRow>
        <div className="p-4 bg-gray-50 rounded-xl space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Statistika sətiri</p>
          <FieldRow>
            <Field label="Stat 1 — Rəqəm" value={draft.hero.stat1Value} onChange={v => update('hero', 'stat1Value', v)} />
            <Field label="Stat 1 — Mətn" value={draft.hero.stat1Label} onChange={v => update('hero', 'stat1Label', v)} />
          </FieldRow>
          <FieldRow>
            <Field label="Stat 2 — Rəqəm" value={draft.hero.stat2Value} onChange={v => update('hero', 'stat2Value', v)} />
            <Field label="Stat 2 — Mətn" value={draft.hero.stat2Label} onChange={v => update('hero', 'stat2Label', v)} />
          </FieldRow>
        </div>
        <Field label="Üzən kart mətni" value={draft.hero.floatingCard} onChange={v => update('hero', 'floatingCard', v)} multiline />
        <FieldRow>
          <Field label="Lisenziya badge 1" value={draft.hero.floatingBadge1} onChange={v => update('hero', 'floatingBadge1', v)} />
          <Field label="Lisenziya badge 2" value={draft.hero.floatingBadge2} onChange={v => update('hero', 'floatingBadge2', v)} />
        </FieldRow>
      </SectionCard>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <SectionCard title="Haqqımızda Bölməsi" icon={Info}>
        <Field label="Badge mətni" value={draft.about.badge} onChange={v => update('about', 'badge', v)} />
        <FieldRow>
          <Field label="Başlıq 1" value={draft.about.heading1} onChange={v => update('about', 'heading1', v)} />
          <Field label="Başlıq 2 (yaşıl)" value={draft.about.headingGradient} onChange={v => update('about', 'headingGradient', v)} />
        </FieldRow>
        <Field label="Paragraf 1" value={draft.about.paragraph1} onChange={v => update('about', 'paragraph1', v)} multiline />
        <Field label="Paragraf 2" value={draft.about.paragraph2} onChange={v => update('about', 'paragraph2', v)} multiline />

        <div className="p-4 bg-gray-50 rounded-xl space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Stat Kartları (4 ədəd)</p>
          <FieldRow>
            <Field label="Kart 1 — Rəqəm" value={draft.about.stat1Value} onChange={v => update('about', 'stat1Value', v)} />
            <Field label="Kart 1 — Mətn" value={draft.about.stat1Label} onChange={v => update('about', 'stat1Label', v)} />
          </FieldRow>
          <FieldRow>
            <Field label="Kart 2 — Rəqəm" value={draft.about.stat2Value} onChange={v => update('about', 'stat2Value', v)} />
            <Field label="Kart 2 — Mətn" value={draft.about.stat2Label} onChange={v => update('about', 'stat2Label', v)} />
          </FieldRow>
          <FieldRow>
            <Field label="Kart 3 — Rəqəm" value={draft.about.stat3Value} onChange={v => update('about', 'stat3Value', v)} />
            <Field label="Kart 3 — Mətn" value={draft.about.stat3Label} onChange={v => update('about', 'stat3Label', v)} />
          </FieldRow>
          <FieldRow>
            <Field label="Kart 4 — Rəqəm" value={draft.about.stat4Value} onChange={v => update('about', 'stat4Value', v)} />
            <Field label="Kart 4 — Mətn" value={draft.about.stat4Label} onChange={v => update('about', 'stat4Label', v)} />
          </FieldRow>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Özəlliklər (4 kart)</p>
          <FieldRow>
            <Field label="Özəllik 1 — Başlıq" value={draft.about.feat1Title} onChange={v => update('about', 'feat1Title', v)} />
            <Field label="Özəllik 1 — Mətn" value={draft.about.feat1Text} onChange={v => update('about', 'feat1Text', v)} />
          </FieldRow>
          <FieldRow>
            <Field label="Özəllik 2 — Başlıq" value={draft.about.feat2Title} onChange={v => update('about', 'feat2Title', v)} />
            <Field label="Özəllik 2 — Mətn" value={draft.about.feat2Text} onChange={v => update('about', 'feat2Text', v)} />
          </FieldRow>
          <FieldRow>
            <Field label="Özəllik 3 — Başlıq" value={draft.about.feat3Title} onChange={v => update('about', 'feat3Title', v)} />
            <Field label="Özəllik 3 — Mətn" value={draft.about.feat3Text} onChange={v => update('about', 'feat3Text', v)} />
          </FieldRow>
          <FieldRow>
            <Field label="Özəllik 4 — Başlıq" value={draft.about.feat4Title} onChange={v => update('about', 'feat4Title', v)} />
            <Field label="Özəllik 4 — Mətn" value={draft.about.feat4Text} onChange={v => update('about', 'feat4Text', v)} />
          </FieldRow>
        </div>

        <Field label="Sitat" value={draft.about.quote} onChange={v => update('about', 'quote', v)} multiline />
        <FieldRow>
          <Field label="Sitat müəllifi" value={draft.about.quoteAuthor} onChange={v => update('about', 'quoteAuthor', v)} />
          <Field label="Müəllif vəzifəsi" value={draft.about.quoteSubtitle} onChange={v => update('about', 'quoteSubtitle', v)} />
        </FieldRow>
      </SectionCard>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <SectionCard title="Xidmətlər Bölməsi" icon={Grid}>
        <Field label="Badge mətni" value={draft.services.badge} onChange={v => update('services', 'badge', v)} />
        <FieldRow>
          <Field label="Başlıq 1" value={draft.services.heading1} onChange={v => update('services', 'heading1', v)} />
          <Field label="Başlıq 2 (yaşıl)" value={draft.services.headingGradient} onChange={v => update('services', 'headingGradient', v)} />
        </FieldRow>
        <Field label="Alt mətn" value={draft.services.subtext} onChange={v => update('services', 'subtext', v)} multiline />
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs text-blue-600 font-medium">
            💡 Xidmət kartlarının özlərini (ad, açıqlama, alt maddələr) <strong>Xidmətlər</strong> bölməsindən idarə edə bilərsiniz.
          </p>
        </div>
      </SectionCard>

      {/* ── DOCTORS ───────────────────────────────────────────── */}
      <SectionCard title="Həkimlər Bölməsi" icon={Users}>
        <Field label="Badge mətni" value={draft.doctors.badge} onChange={v => update('doctors', 'badge', v)} />
        <FieldRow>
          <Field label="Başlıq 1" value={draft.doctors.heading1} onChange={v => update('doctors', 'heading1', v)} />
          <Field label="Başlıq 2 (yaşıl)" value={draft.doctors.headingGradient} onChange={v => update('doctors', 'headingGradient', v)} />
        </FieldRow>
        <Field label="Alt mətn" value={draft.doctors.subtext} onChange={v => update('doctors', 'subtext', v)} multiline />
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs text-blue-600 font-medium">
            💡 Həkim profilləri (ad, ixtisas, şəkil) üçün <strong>Həkimlər</strong> bölməsindən istifadə edin.
          </p>
        </div>
      </SectionCard>

      {/* ── REVIEWS ───────────────────────────────────────────── */}
      <SectionCard title="Rəylər Bölməsi" icon={MessageSquare}>
        <Field
          label="Badge mətni"
          value={draft.reviewsSection.badge}
          onChange={v => update('reviewsSection', 'badge', v)}
        />
        <FieldRow>
          <Field
            label="Başlıq 1"
            value={draft.reviewsSection.heading1}
            onChange={v => update('reviewsSection', 'heading1', v)}
          />
          <Field
            label="Başlıq 2 (yaşıl)"
            value={draft.reviewsSection.headingGradient}
            onChange={v => update('reviewsSection', 'headingGradient', v)}
          />
        </FieldRow>
        <Field
          label="Alt mətn"
          value={draft.reviewsSection.subtext}
          onChange={v => update('reviewsSection', 'subtext', v)}
          multiline
        />
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs text-blue-600 font-medium">
            💡 Pasiyent rəylərinin özlərini (ad, ulduz, şərh) əlavə etmək və idarə etmək üçün sol menyudan <strong>Rəylər</strong> bölməsindən istifadə edin.
          </p>
        </div>
      </SectionCard>


      {/* ── BLOG ──────────────────────────────────────────────── */}
      <SectionCard title="Bloq Bölməsi" icon={BookOpen}>
        <Field label="Badge mətni" value={draft.blog.badge} onChange={v => update('blog', 'badge', v)} />
        <FieldRow>
          <Field label="Başlıq 1" value={draft.blog.heading1} onChange={v => update('blog', 'heading1', v)} />
          <Field label="Başlıq 2 (yaşıl)" value={draft.blog.headingGradient} onChange={v => update('blog', 'headingGradient', v)} />
        </FieldRow>
        <Field label="Alt mətn" value={draft.blog.subtext} onChange={v => update('blog', 'subtext', v)} multiline />
        <Field label="CTA düymə mətni" value={draft.blog.ctaButton} onChange={v => update('blog', 'ctaButton', v)} />
      </SectionCard>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <SectionCard title="Footer / Əlaqə" icon={Phone}>
        <Field label="Slogan (yaşıl banner)" value={draft.footer.slogan} onChange={v => update('footer', 'slogan', v)} />
        <Field label="Footer açıqlama mətni" value={draft.footer.description} onChange={v => update('footer', 'description', v)} multiline />
        <FieldRow>
          <Field label="Telefon" value={draft.footer.phone} onChange={v => update('footer', 'phone', v)} />
          <Field label="E-poçt" value={draft.footer.email} onChange={v => update('footer', 'email', v)} />
        </FieldRow>
        <Field label="Ünvan" value={draft.footer.address} onChange={v => update('footer', 'address', v)} />
        <FieldRow>
          <Field label="Həftəiçi iş saatları" value={draft.footer.workdaysHours} onChange={v => update('footer', 'workdaysHours', v)} placeholder="09:00 – 17:00" />
          <Field label="Şənbə iş saatları" value={draft.footer.saturdayHours} onChange={v => update('footer', 'saturdayHours', v)} placeholder="09:00 – 15:00" />
        </FieldRow>
        <Field label="Copyright mətni" value={draft.footer.copyright} onChange={v => update('footer', 'copyright', v)} />
      </SectionCard>

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
