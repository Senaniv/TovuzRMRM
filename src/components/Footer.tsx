'use client';

import Image from 'next/image';
import { Phone, MapPin, Mail, MessageCircle, Instagram, Share2, Heart, Clock, Facebook } from 'lucide-react';
import { useSiteContent } from '@/lib/siteContent';

const serviceLinks = [
  'Nevroloji Müayinə',
  'Fiziki Reabilitasiya',
  'Uşaq Sensor İnteqrasiya',
  'Psixologiya & Loqopediya',
  'Laboratoriya',
  'Ozonoterapiya',
];

export default function Footer() {
  const { content } = useSiteContent();
  const f = content.footer;
  const hdr = content.header;

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">

      {/* ── Slogan banner ─────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #76c122, #3f7215)' }}
        className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-bold text-base sm:text-lg tracking-wide text-center sm:text-left">
            🏥 {f.slogan}
          </p>
          <a
            href={`tel:+994${f.phone.replace(/[^0-9]/g, '').slice(-9)}`}
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-5 py-2 rounded-full transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            {f.phone}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Main grid: brand full-width on mobile, then 2-col Services+Contact, then map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── 1. Brand column ──────────────────── */}
          <div className="space-y-5 md:col-span-2 lg:col-span-1">
            <a href="#hero" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight font-black" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  Regional Müalicə və
                </p>
                <p className="text-sm font-bold text-white leading-tight font-black" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  Reabilitasiya Mərkəzi
                </p>
              </div>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              {f.description}
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/994993014444"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-[#76c122] rounded-lg flex items-center justify-center transition-colors duration-200"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/regionalmualicemerkezi/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-[#76c122] rounded-lg flex items-center justify-center transition-colors duration-200"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/regionalmualicemerkezi/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-[#76c122] rounded-lg flex items-center justify-center transition-colors duration-200"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── Xidmətlər + Əlaqə row: side-by-side on mobile ── */}
          <div className="grid grid-cols-2 gap-4 md:contents">
            {/* ── 2. Xidmətlər links ────────────────── */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Xidmətlər
              </h4>
              <ul className="space-y-2.5">
                {serviceLinks.map(link => (
                  <li key={link}>
                    <a
                      href="#services"
                      className="text-sm text-gray-400 hover:text-[#76c122] transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#76c122] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── 3. Contact (Əlaqə) ────────────────── */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Əlaqə
              </h4>
              <ul className="space-y-4">
                {/* Phone */}
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#76c122]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Telefon</p>
                    <a
                      href={`tel:+994${f.phone.replace(/[^0-9]/g, '').slice(-9)}`}
                      className="text-sm text-white font-semibold hover:text-[#76c122] transition-colors"
                    >
                      {f.phone}
                    </a>
                  </div>
                </li>

                {/* Address */}
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#76c122]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Ünvan</p>
                    <p className="text-sm text-gray-300">{f.address}</p>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#76c122]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">E-poçt</p>
                    <a
                      href={`mailto:${f.email}`}
                      className="text-sm text-gray-300 hover:text-[#76c122] transition-colors"
                    >
                      {f.email}
                    </a>
                  </div>
                </li>

                {/* Working Hours */}
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#76c122]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">İş Saatları</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-gray-400">Həftəiçi</span>
                        <span className="text-xs font-semibold text-white bg-gray-800 px-2 py-0.5 rounded-md">
                          {f.workdaysHours}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-gray-400">Şənbə</span>
                        <span className="text-xs font-semibold text-white bg-gray-800 px-2 py-0.5 rounded-md">
                          {f.saturdayHours}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ── 4. Google Maps ───────────────────── */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Biz Haradayıq
            </h4>
            <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.6768522475556!2d45.61483003199101!3d41.00977688771927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4040d100216c9d85%3A0x8893d092218f149f!2zUmVnaW9uYWwgTcO8YWxpY8mZIHbJmSBSZWFiaWxpdGFzaXlhIE3JmXJryZl6aQ!5e0!3m2!1str!2saz!4v1781338229453!5m2!1str!2saz"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Regional Müalicə və Reabilitasiya Mərkəzi xəritəsi"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Regional+Müalicə+və+Reabilitasiya+Mərkəzi+Tovuz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs text-[#76c122] hover:text-green-400 transition-colors font-medium"
            >
              <MapPin className="w-3.5 h-3.5" />
              Google Xəritədə aç ↗
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {f.copyright}
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Hazırlanmışdır <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
