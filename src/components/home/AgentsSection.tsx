import { useEffect, useRef, useState } from 'react';
import { useSiteUser } from '@/hooks/useSiteUser';
import { ArrowRight, Phone, MessageSquare, Award, CheckCircle } from 'lucide-react';

const AgentsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useSiteUser();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = `https://wa.me/${user?.telefono_usuario?.replace(/\D/g, '') || '521'}`;

  const values = [
    'Transparencia Absoluta',
    'Filtro Legal Riguroso',
    'Atención Inmediata 24/7',
    'Maximización de Retornos',
  ];

  return (
    <section ref={sectionRef} id="contacto" className="py-24 bg-slate-900 text-white font-sans overflow-hidden relative">
      {/* Background soft slate flares */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Portrait / Media (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className={`relative aspect-[3/4] w-full max-w-sm rounded-[2rem] overflow-hidden border border-white/10 shadow-elegant group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <img
                src={user?.imagen_perfil_usuario || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop'}
                alt={user?.nombre_usuario || 'Asesor Inversa'}
                className="w-full h-full object-cover grayscale transition-all duration-[1500ms] group-hover:scale-105 group-hover:grayscale-0"
              />
              {/* Bottom Glass Card Overlay */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/10">
                <span className="text-[9px] tracking-widest font-bold uppercase text-secondary">
                  CONSULTOR ASOCIADO
                </span>
                <h3 className="font-sans font-bold text-base text-white mt-0.5">
                  {user?.nombre_usuario || 'Inversa Bienes Raíces'}
                </h3>
              </div>
            </div>
          </div>

          {/* Column 2: Pitch & Bio (7 cols) */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 mb-6 self-start px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Award className="w-4 h-4 text-secondary" />
              <span className="text-[10px] tracking-widest font-bold uppercase text-slate-300">
                TRAYECTORIA VERIFICADA
              </span>
            </div>

            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white leading-tight mb-6">
              Nuestros Servicios Integran <br />
              <span className="text-secondary">20 Años de Experiencia</span>
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-semibold">
              Detrás de cada operación de Inversa Bienes Raíces hay dos décadas de especialización y conocimiento profundo del mercado. Ofrecemos un servicio ejecutivo ágil y riguroso que resguarda tu patrimonio en cada firma.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
              {values.map((val) => (
                <div key={val} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                  {val}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-sky-400 text-white py-4 px-8 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_8px_20px_rgba(14,165,233,0.35)] flex items-center justify-center gap-2 focus:outline-none"
              >
                <MessageSquare className="w-4 h-4" />
                Iniciar Chat en WhatsApp
              </a>
              
              <a
                href={`tel:${user?.telefono_usuario?.replace(/\D/g, '') || ''}`}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 px-8 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none"
              >
                <Phone className="w-4 h-4 text-secondary" />
                Llamar Directo
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
