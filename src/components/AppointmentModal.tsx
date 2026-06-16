'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check, Calendar, User, Phone, Mail, MessageSquare, Stethoscope } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { services, doctors } from '@/lib/data';

interface Props {
  open: boolean;
  onClose: () => void;
}

const stepTitles = [
  'Xidmət Seçin',
  'Həkim Seçin',
  'Məlumatlarınız',
  'Təsdiq',
];

export default function AppointmentModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    serviceId: '',
    doctorId: '',
    patientName: '',
    phone: '',
    email: '',
    preferredDate: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedService = services.find(s => s.id === form.serviceId);
  const selectedDoctor = doctors.find(d => d.id === form.doctorId);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setSuccess(false);
      setForm({ serviceId: '', doctorId: '', patientName: '', phone: '', email: '', preferredDate: '', message: '' });
    }, 300);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500)); // Simulate API call
    setSubmitting(false);
    setSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <DialogTitle className="sr-only">Qəbula yazıl</DialogTitle>

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4" style={{ background: 'linear-gradient(135deg, #76c122, #3f7215)' }}>
          <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Raleway, sans-serif' }}>Qəbula yazıl</h2>
              <p className="text-white/70 text-xs">Onlayn müraciət sistemi</p>
            </div>
          </div>

          {/* Step progress */}
          {!success && (
            <div className="flex items-center gap-1">
              {stepTitles.map((title, i) => (
                <div key={i} className="flex items-center gap-1 flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i < step ? 'bg-white text-[#76c122]' :
                      i === step ? 'bg-white/90 text-[#3f7215]' :
                      'bg-white/25 text-white/60'
                    }`}>
                      {i < step ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-[9px] font-medium whitespace-nowrap hidden sm:block ${i === step ? 'text-white' : 'text-white/50'}`}>
                      {title}
                    </span>
                  </div>
                  {i < stepTitles.length - 1 && (
                    <div className={`h-0.5 flex-1 mb-4 transition-all ${i < step ? 'bg-white' : 'bg-white/25'}`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-[#76c122]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  Müraciətiniz Tamamlandı!
                </h3>
                <p className="text-gray-600 mb-2">
                  Müraciətiniz qəbul edildi. Tezliklə sizinlə əlaqə saxlanılacaq.
                </p>
                <p className="text-sm text-[#76c122] font-medium mb-6">099 301 44 44</p>
                <Button
                  onClick={handleClose}
                  className="btn-primary text-white px-8 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
                >
                  Bağla
                </Button>
              </motion.div>
            ) : step === 0 ? (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-sm text-gray-500 mb-4">Hansı xidmət ilə maraqlanırsınız?</p>
                <div className="grid grid-cols-1 gap-3 max-h-72 overflow-y-auto pr-1">
                  {services.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setForm(f => ({ ...f, serviceId: s.id }))}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        form.serviceId === s.id
                          ? 'border-[#76c122] bg-green-50'
                          : 'border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50/50'
                      }`}
                    >
                      <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.category}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-sm text-gray-500 mb-4">Həkim seçin:</p>
                <div className="grid grid-cols-1 gap-3 max-h-72 overflow-y-auto pr-1">
                  {doctors.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setForm(f => ({ ...f, doctorId: d.id }))}
                      className={`text-left p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        form.doctorId === d.id
                          ? 'border-[#76c122] bg-green-50'
                          : 'border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50/50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 text-[#76c122] font-bold">
                        {d.name.charAt(3)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{d.name}</p>
                        <p className="text-xs text-[#76c122]">{d.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="patientName" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1.5">
                      <User className="w-4 h-4 text-[#76c122]" /> Ad və Soyad
                    </Label>
                    <Input
                      id="patientName"
                      placeholder="Adınızı daxil edin"
                      value={form.patientName}
                      onChange={e => setForm(f => ({ ...f, patientName: e.target.value }))}
                      className="rounded-xl border-gray-200 focus:border-[#76c122] focus:ring-[#76c122]/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1.5">
                      <Phone className="w-4 h-4 text-[#76c122]" /> Telefon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0XX XXX XX XX"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="rounded-xl border-gray-200 focus:border-[#76c122] focus:ring-[#76c122]/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1.5">
                      <Mail className="w-4 h-4 text-[#76c122]" /> E-poçt (istəyə görə)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="rounded-xl border-gray-200 focus:border-[#76c122] focus:ring-[#76c122]/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredDate" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1.5">
                      <Calendar className="w-4 h-4 text-[#76c122]" /> Arzulanan Tarix
                    </Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={form.preferredDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setForm(f => ({ ...f, preferredDate: e.target.value }))}
                      className="rounded-xl border-gray-200 focus:border-[#76c122] focus:ring-[#76c122]/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1.5">
                      <MessageSquare className="w-4 h-4 text-[#76c122]" /> Qeyd (istəyə görə)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Şikayətiniz haqqında qısaca yazın..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={3}
                      className="rounded-xl border-gray-200 focus:border-[#76c122] focus:ring-[#76c122]/20 resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-sm text-gray-500 mb-4">Məlumatları yoxlayın:</p>
                <div className="bg-green-50 rounded-2xl p-4 space-y-3 border border-green-100">
                  {[
                    { label: 'Xidmət', value: selectedService?.name },
                    { label: 'Həkim', value: selectedDoctor?.name },
                    { label: 'Ad Soyad', value: form.patientName },
                    { label: 'Telefon', value: form.phone },
                    { label: 'Tarix', value: form.preferredDate },
                  ].map(item => item.value && (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-xs font-semibold text-[#3f7215] w-20 flex-shrink-0">{item.label}:</span>
                      <span className="text-sm text-gray-800 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                {form.message && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Qeyd:</p>
                    <p className="text-sm text-gray-700">{form.message}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!success && (
          <div className="px-6 pb-6 flex items-center justify-between gap-3">
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep(s => s - 1)} className="rounded-xl border-gray-200 text-gray-600">
                Geri
              </Button>
            ) : (
              <Button variant="ghost" onClick={handleClose} className="rounded-xl text-gray-500">
                Ləğv et
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={
                  (step === 0 && !form.serviceId) ||
                  (step === 1 && !form.doctorId) ||
                  (step === 2 && (!form.patientName || !form.phone))
                }
                className="btn-primary text-white px-6 rounded-xl font-semibold flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
              >
                İrəli
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary text-white px-6 rounded-xl font-semibold"
                style={{ background: 'linear-gradient(135deg, #76c122, #5fa010)' }}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Göndərilir...
                  </span>
                ) : (
                  <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Göndər</span>
                )}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
