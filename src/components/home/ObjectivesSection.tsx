import { ShieldAlert, Compass, CheckCircle2, Zap, DollarSign, Activity } from 'lucide-react';

const ObjectivesSection = () => {
  const objectives = [
    {
      title: 'Mejor Asesoría',
      description: 'Consultoría personalizada basada en datos precisos del mercado y más de 20 años de experiencia acumulada.',
      icon: Compass,
      className: 'md:col-span-2 md:row-span-1 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-800/80',
      iconBg: 'bg-sky-500/10 text-sky-400',
    },
    {
      title: 'Mayor Seguridad',
      description: 'Garantía legal y comercial absoluta en cada trámite y firma contractual.',
      icon: ShieldAlert,
      className: 'md:col-span-1 md:row-span-1 bg-slate-900 border-slate-800/80',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      title: 'Más Rápido',
      description: 'Procesos de comercialización eficientes y ágiles para optimizar tus tiempos.',
      icon: Zap,
      className: 'md:col-span-1 md:row-span-1 bg-slate-900 border-slate-800/80',
      iconBg: 'bg-amber-500/10 text-amber-400',
    },
    {
      title: 'Menor Riesgo',
      description: 'Mitigación exhaustiva de riesgos patrimoniales mediante pólizas jurídicas y dictámenes.',
      icon: Activity,
      className: 'md:col-span-1 md:row-span-1 bg-slate-900 border-slate-800/80',
      iconBg: 'bg-rose-500/10 text-rose-400',
    },
    {
      title: 'Mejores Prácticas',
      description: 'Alineación estricta a los estándares éticos y de transparencia más exigentes del sector.',
      icon: CheckCircle2,
      className: 'md:col-span-2 md:row-span-1 bg-gradient-to-bl from-slate-900 via-slate-900 to-slate-950 border-slate-800/80',
      iconBg: 'bg-violet-500/10 text-violet-400',
    },
    {
      title: 'Mejor Precio',
      description: 'Análisis comercial estratégico para maximizar tu rentabilidad e inversión.',
      icon: DollarSign,
      className: 'md:col-span-1 md:row-span-1 bg-slate-900 border-slate-800/80',
      iconBg: 'bg-teal-500/10 text-teal-400',
    },
  ];

  return (
    <section id="objetivos" className="py-24 bg-slate-950 text-white font-sans overflow-hidden relative">
      {/* Background Radial Light Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-[10px] tracking-[0.3em] font-bold text-secondary uppercase mb-3">
            NUESTRAS DIRECTRICES CORE
          </h2>
          <p className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Objetivos Estratégicos Inversa
          </p>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Guiamos cada paso de nuestra consultoría comercial y patrimonial mediante 6 pilares inquebrantables de calidad y profesionalismo.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {objectives.map((obj, index) => {
            const Icon = obj.icon;
            return (
              <div
                key={index}
                className={`group rounded-3xl p-7 border transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)] flex flex-col justify-between min-h-[180px] ${obj.className}`}
              >
                {/* Header of Bento Block */}
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-secondary transition-colors leading-none">
                    {obj.title}
                  </h3>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-12 ${obj.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-4">
                  {obj.description}
                </p>

                {/* Micro Border Glow */}
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-secondary/0 to-transparent group-hover:via-secondary/40 transition-all duration-700 mt-4 rounded-full" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ObjectivesSection;
