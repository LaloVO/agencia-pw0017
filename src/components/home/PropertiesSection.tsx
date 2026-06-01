import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const SkeletonCard = () => (
  <div className="w-full animate-pulse rounded-3xl border border-slate-200 p-4">
    <div className="aspect-[4/3] rounded-[1.5rem] bg-slate-200 mb-5" />
    <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
    <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
    <div className="h-10 bg-slate-100 rounded-full w-full" />
  </div>
);

const PropertiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { properties, isLoading } = useProperties({ limit: 6 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 dark:bg-slate-950 font-sans relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
          <div>
            <span className="text-[10px] tracking-[0.25em] font-bold text-secondary uppercase block mb-3">
              INVENTARIO EXCLUSIVO
            </span>
            <h2
              className={`font-sans font-extrabold text-3xl sm:text-4xl text-primary transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Propiedades Destacadas
            </h2>
          </div>
          <Link
            to="/propiedades"
            className={`group text-xs uppercase tracking-widest font-bold text-primary hover:text-secondary flex items-center gap-1.5 transition-colors ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Ver Todo el Portafolio
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : properties.slice(0, 3).map((property, index) => (
                <div
                  key={property.id}
                  className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <PropertyCard property={property} variant="compact" />
                </div>
              ))}
        </div>

        {/* Dynamic CTA for high-volume listings */}
        <div className="mt-16 text-center">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-secondary text-white py-4 px-8 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_8px_20px_rgba(14,165,233,0.25)] focus:outline-none"
          >
            Explorar en Mapa Interactivo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PropertiesSection;
