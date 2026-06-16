'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/lib/types';

const initialAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Əli Məmmədov',
    phone: '055 123 45 67',
    email: 'ali@example.com',
    serviceId: '1',
    serviceName: 'Nevroloji Müayinə',
    doctorId: '4',
    doctorName: 'Dr. Sevinc Nəcəfova',
    preferredDate: '2024-12-20',
    message: 'Baş ağrısı problemi var',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    patientName: 'Günel Həsənova',
    phone: '070 234 56 78',
    email: '',
    serviceId: '3',
    serviceName: 'Uşaq Sensor İnteqrasiya',
    doctorId: '2',
    doctorName: 'Dr. Günay Əliyeva',
    preferredDate: '2024-12-22',
    message: 'Uşağım 4 yaşındadır, DEHB şübhəsi var',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    patientName: 'Orxan Rəsulов',
    phone: '050 345 67 89',
    email: 'orxan@example.com',
    serviceId: '2',
    serviceName: 'Fiziki Reabilitasiya',
    doctorId: '3',
    doctorName: 'Dr. Rəşad Həsənov',
    preferredDate: '2024-12-18',
    message: 'Skolioz müalicəsi istəyirəm',
    status: 'cancelled',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const statusConfig = {
  pending: { label: 'Gözləyir', icon: AlertCircle, bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  confirmed: { label: 'Təsdiqləndi', icon: CheckCircle, bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  cancelled: { label: 'Ləğv edildi', icon: XCircle, bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
};

export default function AdminAppointments() {
  const [list, setList] = useState<Appointment[]>(initialAppointments);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? list : list.filter(a => a.status === filter);

  const updateStatus = (id: string, status: Appointment['status']) => {
    setList(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const counts = {
    all: list.length,
    pending: list.filter(a => a.status === 'pending').length,
    confirmed: list.filter(a => a.status === 'confirmed').length,
    cancelled: list.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Raleway, sans-serif' }}>Qeydiyyatlar</h1>
        <p className="text-sm text-gray-500 mt-1">{list.length} qeydiyyat</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'Hamısı' },
          { key: 'pending', label: 'Gözləyir' },
          { key: 'confirmed', label: 'Təsdiqlənmiş' },
          { key: 'cancelled', label: 'Ləğv edilmiş' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filter === tab.key
                ? 'text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
            style={filter === tab.key ? { background: 'linear-gradient(135deg, #76c122, #5fa010)' } : {}}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              filter === tab.key ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {counts[tab.key as keyof typeof counts]}
            </span>
          </button>
        ))}
      </div>

      {/* Appointments list */}
      <div className="space-y-4">
        {filtered.map(apt => {
          const status = statusConfig[apt.status];
          return (
            <div key={apt.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Status indicator */}
                  <div className={`w-11 h-11 ${status.bg} border ${status.border} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <status.icon className={`w-5 h-5 ${status.text}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{apt.patientName}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${status.bg} ${status.text} ${status.border}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{apt.phone}</span>
                      <span className="flex items-center gap-1 text-[#76c122] font-medium">{apt.serviceName}</span>
                      <span className="flex items-center gap-1">{apt.doctorName}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{apt.preferredDate}</span>
                    </div>
                    {apt.message && (
                      <p className="text-xs text-gray-400 mt-2 bg-gray-50 rounded-lg px-3 py-1.5 line-clamp-1">
                        "{apt.message}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Status actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {apt.status !== 'confirmed' && (
                    <button
                      onClick={() => updateStatus(apt.id, 'confirmed')}
                      className="px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
                    >
                      Təsdiqlə
                    </button>
                  )}
                  {apt.status !== 'cancelled' && (
                    <button
                      onClick={() => updateStatus(apt.id, 'cancelled')}
                      className="px-3 py-1.5 bg-red-50 text-red-500 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
                    >
                      Ləğv et
                    </button>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(apt.createdAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="font-mono">#{apt.id}</span>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Qeydiyyat tapılmadı</p>
          </div>
        )}
      </div>
    </div>
  );
}
