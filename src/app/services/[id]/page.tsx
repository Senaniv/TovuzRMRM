import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Brain, Activity, Baby, HeartHandshake, Microscope, Sparkles, Stethoscope, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { mapDbService } from '@/lib/siteContentShared';
import { services as defaultServices } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-12 h-12 text-[#76c122]" />,
  Activity: <Activity className="w-12 h-12 text-[#76c122]" />,
  Baby: <Baby className="w-12 h-12 text-[#76c122]" />,
  HeartHandshake: <HeartHandshake className="w-12 h-12 text-[#76c122]" />,
  Microscope: <Microscope className="w-12 h-12 text-[#76c122]" />,
  Sparkles: <Sparkles className="w-12 h-12 text-[#76c122]" />,
  Stethoscope: <Stethoscope className="w-12 h-12 text-[#76c122]" />,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  let service = null;

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (data) {
      service = mapDbService(data);
    }
  } catch (err) {
    console.error('Failed to fetch service from DB:', err);
  }

  // Fallback to default mock data if not found in DB
  if (!service) {
    service = defaultServices.find((s) => s.id === id);
  }

  if (!service) {
    notFound();
  }

  const iconElement = iconMap[service.icon] || <Activity className="w-12 h-12 text-[#76c122]" />;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#76c122] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Geri Qayıt
        </Link>

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 border-b border-gray-100 pb-8">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-[#f4fae8] flex items-center justify-center shadow-inner flex-shrink-0">
              {iconElement}
            </div>

            {/* Title & Category */}
            <div>
              <Badge className="mb-2 px-3 py-1 bg-[#f4fae8] hover:bg-[#f4fae8] text-[#3f7215] border-0 text-xs font-semibold rounded-full">
                {service.category}
              </Badge>
              <h1
                className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                {service.name}
              </h1>
            </div>
          </div>

          {/* Details Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Xidmət Haqqında
              </h2>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                {service.description}
              </p>
            </div>

            {/* Custom styled CTA */}
            <div className="bg-[#f4fae8]/50 border border-[#76c122]/10 rounded-2xl p-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#3f7215]">Bu xidmət üzrə qəbula yazılmaq istəyirsiniz?</p>
                <p className="text-xs text-gray-500 mt-0.5">WhatsApp vasitəsilə sürətli onlayn növbə götürün.</p>
              </div>
              <a
                href={`https://wa.me/994993014444?text=Salam,%20${encodeURIComponent(service.name)}%20xidməti%20üzrə%20qəbula%20yazılmaq%20istəyirəm.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm whitespace-nowrap"
              >
                Qəbula yazıl
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
