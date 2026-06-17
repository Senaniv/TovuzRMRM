'use client';

import React, { useState, useEffect } from 'react';
import { useSiteContent } from '@/lib/siteContent';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function WelcomePopup() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const { popupData } = useSiteContent();
  const [isOpen, setIsOpen] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      setShouldRender(false);
      return;
    }
    if (!popupData || !popupData.is_active || !popupData.image_url) {
      setShouldRender(false);
      return;
    }

    const expiresAt = popupData.expires_at ? new Date(popupData.expires_at) : null;
    if (expiresAt && new Date() > expiresAt) {
      setShouldRender(false);
      return;
    }

    setShouldRender(true);

    const interval = setInterval(() => {
      if (expiresAt && new Date() > expiresAt) {
        setShouldRender(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [popupData, isAdmin]);

  if (isAdmin || !shouldRender || !isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative max-w-[90vw] max-h-[85vh] md:max-h-[80vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-12 right-0 md:-top-4 md:-right-12 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-200 border border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            aria-label="Qapat"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Elastic Image Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={popupData.image_url}
              alt="Qarşılama Kampaniyası"
              className="max-w-[90vw] max-h-[85vh] md:max-h-[80vh] w-auto h-auto object-contain select-none"
              draggable={false}
            />
            {/* WhatsApp Appointment CTA */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10">
              <motion.a
                href="https://wa.me/994993014444?text=Salam,%20klinikada%20qəbula%20yazılmaq%20istəyirəm."
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 10px 25px -5px rgba(37,211,102,0.4), 0 0 0 0px rgba(37,211,102,0.6)",
                    "0 10px 25px -5px rgba(37,211,102,0.4), 0 0 0 20px rgba(37,211,102,0)"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-lg md:text-xl font-black shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.6)] transition-shadow duration-200 cursor-pointer"
              >
                <svg className="w-6 h-6 md:w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.466 0 9.921-4.45 9.924-9.9 0-2.64-1.03-5.117-2.905-6.99C16.423 1.847 13.96 .82 11.333.82c-5.461 0-9.915 4.45-9.918 9.9-.001 1.57.418 3.1 1.214 4.498l-1.01 3.682 3.783-.992zM17.653 14.39c-.298-.15-1.766-.87-2.04-.97-.272-.1-.47-.15-.668.15-.198.3-.765.97-.936 1.17-.17.2-.34.225-.638.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.1-.2.05-.374-.025-.524-.075-.15-.668-1.61-.915-2.203-.242-.579-.487-.5-.669-.51l-.57-.01c-.199 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.766-.72 2.013-1.415.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                Qəbula yazıl
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
