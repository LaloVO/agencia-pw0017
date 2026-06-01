import { Link } from 'react-router-dom';
import { Bed, Bath, Square, ChevronRight } from 'lucide-react';
import { CBFProperty, formatPrice } from '@/lib/cbf';

interface PropertyCardProps {
  property: CBFProperty;
  variant?: 'default' | 'compact';
}

const PropertyCard = ({ property, variant = 'default' }: PropertyCardProps) => {
  const image = property.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(' • ') || 'Ubicación Premium';

  if (variant === 'compact') {
    return (
      <Link
        to={`/properties/${property.id}`}
        className="group block bg-card hover:bg-slate-50 dark:hover:bg-slate-900/40 rounded-3xl overflow-hidden border border-border dark:border-white/5 shadow-card hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-1"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[1.5rem]">
          <img src={image} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-secondary text-white text-[10px] font-sans font-bold tracking-widest uppercase rounded-full shadow-[0_4px_12px_rgba(14,165,233,0.3)]">
              {badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-white font-sans font-bold text-xl drop-shadow-md">
              {formatPrice(property.precio)}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-sans font-bold text-base text-primary group-hover:text-secondary transition-colors mb-1 truncate">
            {property.nombre}
          </h3>
          <p className="font-sans text-xs text-muted-foreground mb-4 truncate">{location}</p>
          <div className="flex justify-between items-center pt-3 border-t border-border/60">
            <div className="flex gap-3.5 text-[11px] text-muted-foreground font-semibold">
              {property.habitaciones != null && (
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-secondary" />
                  {property.habitaciones} Rec
                </span>
              )}
              {property.banios != null && (
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-secondary" />
                  {property.banios} Bañ
                </span>
              )}
              {property.area != null && (
                <span className="flex items-center gap-1">
                  <Square className="w-3.5 h-3.5 text-secondary" />
                  {property.area}m²
                </span>
              )}
            </div>
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-primary group-hover:bg-secondary group-hover:text-white flex items-center justify-center transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group cursor-pointer block transform transition-all duration-500 hover:-translate-y-1 w-full"
    >
      <div className="relative aspect-[16/10] mb-5 overflow-hidden rounded-3xl border border-border dark:border-white/5 shadow-card group-hover:shadow-elegant">
        <img src={image} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
        <div className="absolute top-5 left-5">
          <span className="px-3.5 py-1.5 bg-secondary text-white text-xs font-sans font-bold tracking-widest uppercase rounded-full shadow-[0_4px_12px_rgba(14,165,233,0.35)]">
            {badge}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start px-2">
        <div className="max-w-[70%]">
          <h3 className="font-sans font-bold text-xl text-primary mb-1.5 group-hover:text-secondary transition-colors truncate">
            {property.nombre}
          </h3>
          <p className="font-sans text-xs text-muted-foreground truncate">
            {location}{property.area ? ` • ${property.area}m²` : ''}
          </p>
        </div>
        <div className="text-right">
          <span className="font-sans font-bold text-lg text-primary whitespace-nowrap block mb-1">
            {formatPrice(property.precio)}
          </span>
          <span className="text-[10px] text-secondary font-bold tracking-wider uppercase flex items-center gap-0.5 justify-end">
            Ver Detalle <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
