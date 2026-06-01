import { useEffect, useRef, useState } from 'react';
import { Landmark, Globe, Store, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const verticals = [
    {
      title: 'Compra-Venta',
      subtitle: 'Residencial, Comercial, Terrenos',
      desc: 'Soluciones financieras e inmobiliarias para adquirir o vender tu patrimonio inmobiliario con la mayor plusvalía y total seguridad legal.',
      icon: Landmark,
      color: 'border-sky-500/20 group-hover:border-secondary',
    },
    {
      title: 'Renta & Arrendamiento',
      subtitle: 'Hogares & Espacios Comerciales',
      desc: 'Asesoría especializada para arrendar tu propiedad de forma segura con pólizas jurídicas robustas e investigación exhaustiva de prospectos.',
      icon: Globe,
      color: 'border-emerald-500/20 group-hover:border-emerald-500',
    },
    {
      title: 'Expansión Comercial',
      subtitle: 'Marcas & Desarrollo Industrial',
      desc: 'Búsqueda estratégica de locales comerciales, terrenos e infraestructura comercial/industrial ideal para la expansión de tu marca en México.',
      icon: Store,
      color: 'border-purple-500/20 group-hover:border-purple-500',
    },
    {
      title: 'Administración',
      subtitle: 'Gestión Integral de Propiedades',
      desc: 'Administramos tu propiedad para que goces de rendimientos seguros y constantes sin preocupaciones operativas ni logísticas.',
      icon: Scale,
      color: 'border-amber-500/20 group-hover:border-amber-500',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-slate-950 font-sans relative overflow-hidden">
      
      {/* Background soft lighting */}
      <div className="absolute right-0 top-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span
            className={`text-secondary text-[10px] uppercase tracking-[0.25em] font-bold block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            PORTAFOLIO DE SOLUCIONES
          </span>
          <h2
            className={`font-sans font-extrabold text-3xl sm:text-4xl text-primary leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Nuestros Verticales de Negocio
          </h2>
          <p
            className={`text-slate-500 text-xs sm:text-sm mt-4 leading-relaxed max-w-xl transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Ofrecemos un ecosistema de servicios integrales que cubren todas las facetas del mercado inmobiliario corporativo y de alta gama.
          </p>
        </div>

        {/* CSS Diamond Diamond/Verticals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {verticals.map((vert, idx) => {
            const Icon = vert.icon;
            return (
              <div
                key={vert.title}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`group rounded-3xl p-7 bg-slate-50 dark:bg-slate-900/20 border transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-elegant flex flex-col justify-between min-h-[300px] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${vert.color}`}
              >
                <div>
                  {/* Icon Card Header */}
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-950 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>

                  <span className="text-[9px] tracking-widest font-bold uppercase text-slate-400">
                    {vert.subtitle}
                  </span>
                  <h3 className="font-sans font-bold text-lg text-primary mt-1.5 mb-4 group-hover:text-secondary transition-colors">
                    {vert.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-semibold">
                    {vert.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200/50 dark:border-white/5 flex justify-end">
                  <Link
                    to="/solicita-inmueble"
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-secondary flex items-center justify-center text-slate-400 group-hover:bg-secondary group-hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PhilosophySection;
