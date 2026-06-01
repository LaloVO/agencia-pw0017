import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Bed, Bath, Square, Car, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperty, formatPrice } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSiteUser();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const whatsappNumber = user?.telefono_usuario?.replace(/\D/g, '') ?? '';
  const whatsappMsg = property
    ? encodeURIComponent(`Hola, me interesa la propiedad: ${property.nombre}`)
    : '';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-background px-6 md:px-12 luxury-container animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-8" />
          <div className="aspect-video bg-muted rounded-xl mb-8" />
          <div className="h-10 bg-muted rounded w-1/2 mb-4" />
          <div className="h-4 bg-muted rounded w-1/3" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="font-serif text-2xl text-muted-foreground mb-4">Propiedad no encontrada</p>
            <Link to="/mapa" className="text-sm underline hover:text-primary transition-colors">
              Ver todas las propiedades
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = property.imagenes_propiedades ?? [];
  const mainImage = images[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(', ');

  return (
    <>
      <Helmet>
        <title>{property.nombre} | {user?.nombre_usuario ?? 'Agencia'}</title>
        <meta name="description" content={property.descripcion ?? property.nombre} />
      </Helmet>

      <Navbar />

      <main className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
        {/* Back */}
        <div className="px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-secondary transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Mapa
          </Link>
        </div>

        {/* Images */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-3xl overflow-hidden shadow-elegant border border-slate-200 dark:border-white/5">
            <div className="aspect-[4/3] md:aspect-auto md:row-span-2 overflow-hidden">
              <img src={mainImage} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
            </div>
            {images.slice(1, 3).map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden">
                <img src={img.image_url} alt={`${property.nombre} ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3.5 py-1.5 bg-secondary text-white text-xs font-sans font-bold tracking-widest uppercase rounded-full shadow-[0_4px_12px_rgba(14,165,233,0.3)]">
                    {badge}
                  </span>
                  {property.tipo && (
                    <span className="px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-primary text-xs font-sans font-bold uppercase tracking-widest rounded-full">
                      {property.tipo}
                    </span>
                  )}
                </div>

                <h1 className="font-sans font-extrabold text-3xl md:text-4xl text-primary mb-3 leading-tight">
                  {property.nombre}
                </h1>

                {location && (
                  <p className="flex items-center gap-1.5 text-slate-400 font-sans text-xs sm:text-sm font-semibold">
                    <MapPin className="w-4 h-4 text-secondary shrink-0" />
                    {location}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.habitaciones != null && (
                  <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-center shadow-sm">
                    <Bed className="w-5 h-5 mx-auto mb-2 text-secondary" />
                    <p className="font-sans font-bold text-lg text-primary">{property.habitaciones}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Recámaras</p>
                  </div>
                )}
                {property.banios != null && (
                  <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-center shadow-sm">
                    <Bath className="w-5 h-5 mx-auto mb-2 text-secondary" />
                    <p className="font-sans font-bold text-lg text-primary">{property.banios}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Baños</p>
                  </div>
                )}
                {property.area != null && (
                  <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-center shadow-sm">
                    <Square className="w-5 h-5 mx-auto mb-2 text-secondary" />
                    <p className="font-sans font-bold text-lg text-primary">{property.area} m²</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Superficie</p>
                  </div>
                )}
                {property.estacionamientos != null && (
                  <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-center shadow-sm">
                    <Car className="w-5 h-5 mx-auto mb-2 text-secondary" />
                    <p className="font-sans font-bold text-lg text-primary">{property.estacionamientos}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cajones</p>
                  </div>
                )}
              </div>

              {property.descripcion && (
                <div className="pt-6 border-t border-slate-200/60 dark:border-white/5">
                  <h2 className="font-sans font-bold text-lg text-primary mb-4">Descripción General</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {property.descripcion}
                  </p>
                </div>
              )}
            </div>

            {/* Contact Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-elegant space-y-6">
                <div>
                  <span className="text-[9px] tracking-widest font-bold uppercase text-slate-400 block mb-1">
                    VALOR DE MERCADO
                  </span>
                  <p className="font-sans font-extrabold text-3xl text-primary">{formatPrice(property.precio)}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                    {badge === 'Renta' ? 'arrendamiento mensual' : 'precio de adquisición'}
                  </p>
                </div>

                {user && (
                  <div className="flex items-center gap-3 py-4 border-y border-slate-100 dark:border-white/5">
                    {user.imagen_perfil_usuario ? (
                      <img
                        src={user.imagen_perfil_usuario}
                        alt={user.nombre_usuario}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-white/10"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center font-sans font-bold text-lg">
                        {user.nombre_usuario[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-sans font-bold text-sm text-primary">{user.nombre_usuario}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Asesor Inmobiliario</p>
                    </div>
                  </div>
                )}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm focus:outline-none"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar por WhatsApp
                </a>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-4">
                  <h4 className="font-sans font-bold text-sm text-primary">¿Buscas otro espacio?</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed font-semibold">
                    Si esta propiedad no cumple tus expectativas, completa nuestra solicitud inteligente en 6 pasos para perfilar el espacio ideal según tu rutina diaria.
                  </p>
                  <Link
                    to="/solicita-inmueble"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full font-sans font-bold text-[10px] uppercase tracking-wider transition-all duration-300"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Búsqueda Inteligente
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PropertyDetail;
