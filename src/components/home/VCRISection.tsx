import { useState } from 'react';
import { ChevronRight, Shield, Award, Sparkles, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const VCRISection = () => {
  const [activeTab, setActiveTab] = useState<'V' | 'C' | 'R' | 'I'>('V');

  const items = [
    {
      id: 'V' as const,
      title: 'Cliente Vendedor',
      question: '¿Estás buscando vender tu propiedad al mejor precio, más rápido y con la mayor seguridad?',
      description: 'Optimizamos la comercialización de tu inmueble mediante un análisis comparativo de mercado de alta precisión, planes de marketing digital segmentados y un filtro riguroso de prospectos calificados para garantizar una transacción fluida y segura.',
      details: ['Estudio de mercado profesional', 'Plan de marketing de alta gama', 'Filtro legal y comercial de prospectos', 'Acompañamiento en escrituración'],
      icon: Shield,
    },
    {
      id: 'C' as const,
      title: 'Cliente Comprador',
      question: '¿Estás buscando invertir en la mejor propiedad para tu proyecto de vida?',
      description: 'Te representamos de forma exclusiva en la búsqueda de tu propiedad ideal. Analizamos tus necesidades financieras, de estilo de vida y ubicación para presentarte un portafolio curado de opciones con alta plusvalía y certeza jurídica absoluta.',
      details: ['Búsqueda personalizada exclusiva', 'Auditoría legal de propiedades', 'Análisis de plusvalía y proyección', 'Negociación y optimización de precio'],
      icon: Award,
    },
    {
      id: 'R' as const,
      title: 'Renta & Arrendamiento',
      question: '¿Estás buscando rentar tu propiedad o encontrar la ubicación ideal para habitar?',
      description: 'Brindamos una asesoría de arrendamiento impecable. Protegemos el patrimonio de los propietarios con pólizas jurídicas robustas y estudios socioeconómicos profundos, y ayudamos a inquilinos ejecutivos a encontrar residencias de primer nivel.',
      details: ['Investigación socioeconómica profunda', 'Redacción de contratos con póliza jurídica', 'Promoción residencial ágil', 'Inventario fotográfico de entrega'],
      icon: Sparkles,
    },
    {
      id: 'I' as const,
      title: 'Inmobiliarias & Empresas',
      question: '¿Deseas promover un desarrollo inmobiliario o expandir tu marca comercial?',
      description: 'Colaboramos estratégicamente con desarrolladores inmobiliarios y marcas corporativas. Encontramos la ubicación estratégica óptima (sitios industriales, comerciales, corporativos) y aceleramos el desplazamiento de proyectos mediante alianzas clave.',
      details: ['Localización de terrenos industriales/comerciales', 'Estudios de factibilidad de sitio', 'Aceleración comercial de desarrollos', 'Alianzas B2B de alto alcance'],
      icon: Building,
    },
  ];

  const currentItem = items.find(item => item.id === activeTab)!;
  const Icon = currentItem.icon;

  return (
    <section id="servicios" className="py-24 bg-slate-50 dark:bg-slate-900/30 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="mb-16 md:flex md:justify-between md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-[10px] tracking-[0.25em] font-bold text-secondary uppercase mb-3">
              NUESTRO ENFOQUE ESTRATÉGICO
            </h2>
            <p className="font-sans font-extrabold text-3xl sm:text-4xl text-primary leading-tight">
              Estructura Inmobiliaria VCRI
            </p>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm mt-4 md:mt-0 font-medium">
            Una solución integral adaptada de forma precisa para cada perfil y necesidad dentro del mercado de bienes raíces.
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Circular Navigation Board (2 columns in LG) */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col justify-center lg:justify-start items-center lg:items-start gap-4 sm:gap-6 lg:gap-5 w-full">
            {items.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex flex-col lg:flex-row items-center gap-4 p-4 rounded-3xl transition-all duration-300 text-center lg:text-left focus:outline-none ${
                    isActive
                      ? 'bg-white dark:bg-slate-950/80 border border-white/40 dark:border-white/10 shadow-elegant scale-[1.02]'
                      : 'bg-transparent border border-transparent hover:bg-slate-200/50 dark:hover:bg-white/5'
                  }`}
                >
                  {/* Circle Indicator */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-sans font-extrabold text-lg sm:text-xl transition-all ${
                      isActive
                        ? 'bg-secondary text-white shadow-[0_4px_12px_rgba(14,165,233,0.3)]'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {item.id}
                  </div>
                  
                  {/* Label (Hidden in small mobiles, shown in lg) */}
                  <div className="hidden sm:block text-left">
                    <span className={`block font-bold text-xs uppercase tracking-wider ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                      {item.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground hidden lg:block font-medium">
                      Ver propuesta de valor
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Value Card (3 columns in LG) */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-950/40 backdrop-blur-xl border border-white/60 dark:border-white/5 rounded-3xl p-8 sm:p-10 shadow-elegant relative overflow-hidden transition-all duration-500 min-h-[420px] flex flex-col justify-between">
              
              {/* Caret watermark logo for card background */}
              <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.02] dark:opacity-[0.01] pointer-events-none select-none">
                <svg className="w-64 h-64 text-primary" viewBox="0 0 100 100" fill="none">
                  <path d="M50 15L85 45H70L50 27L30 45H15L50 15Z" fill="currentColor" />
                  <path d="M50 85L15 55H30L50 73L70 55H85L50 85Z" fill="currentColor" />
                </svg>
              </div>

              <div>
                {/* Header Icon + Label */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[9px] tracking-widest font-bold uppercase text-secondary">
                      PERFIL DE SERVICIO {currentItem.id}
                    </span>
                    <h3 className="font-sans font-bold text-xl text-primary leading-none mt-1">
                      {currentItem.title}
                    </h3>
                  </div>
                </div>

                {/* Slogan/Question */}
                <p className="font-sans font-bold text-lg text-primary leading-snug mb-4">
                  {currentItem.question}
                </p>

                {/* Detailed Pitch */}
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {currentItem.description}
                </p>

                {/* Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {currentItem.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-5 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                <span className="text-[10px] tracking-wider text-muted-foreground uppercase font-bold">
                  Consultoría Especializada
                </span>
                <Link
                  to="/solicita-inmueble"
                  className="inline-flex items-center gap-1.5 text-xs text-secondary font-bold hover:text-sky-400 transition-colors uppercase tracking-wider focus:outline-none"
                >
                  Comenzar Proceso
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VCRISection;
