import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Sparkles, Building, MapPin, Loader2 } from 'lucide-react';

export default function PropertiesPage() {
  const { properties, isLoading } = useProperties();

  return (
    <>
      <Helmet>
        <title>Portafolio Exclusivo | Inversa Bienes Raíces</title>
        <meta
          name="description"
          content="Explora nuestra colección selecta de propiedades residenciales, comerciales e industriales en México."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 relative font-sans">
        {/* Decorative flares */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="mb-16 border-b border-slate-200/60 dark:border-white/5 pb-10">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              PORTAFOLIO ACTIVO
            </div>
            <h1 className="font-sans text-3xl md:text-5xl text-primary font-extrabold tracking-tight mb-4">
              Propiedades Exclusivas
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed font-semibold">
              Una cuidada selección de inmuebles de alto nivel con seguridad jurídica garantizada y ubicaciones de alta plusvalía.
            </p>
          </div>

          {/* Catalog content */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-500">
              <Loader2 className="w-8 h-8 text-secondary animate-spin" />
              <span className="text-xs uppercase tracking-widest font-bold">Cargando portafolio...</span>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-32 bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-white/5 rounded-3xl p-10 max-w-xl mx-auto">
              <Building className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h3 className="font-sans font-bold text-lg text-primary mb-2">No se encontraron propiedades</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-semibold">
                Actualmente no tenemos propiedades visibles en el portal. Por favor ponte en contacto directo para consultar opciones off-market.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div key={property.id} className="w-full">
                  <PropertyCard property={property} variant="compact" />
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
