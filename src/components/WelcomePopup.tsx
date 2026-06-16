'use client';

import React, { useState, useEffect } from 'react';
import { useSiteContent } from '@/lib/siteContent';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function WelcomePopup() {
  const { popupData } = useSiteContent();
  const [isOpen, setIsOpen] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
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
  }, [popupData]);

  if (!shouldRender || !isOpen) {
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
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={popupData.image_url}
              alt="Qarşılama Kampaniyası"
              className="max-w-[90vw] max-h-[85vh] md:max-h-[80vh] w-auto h-auto object-contain select-none"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
