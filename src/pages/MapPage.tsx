import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import PropertyFilters, { 
  Filters, 
  DEFAULT_FILTERS, 
  SEGMENTS, 
  SUBSEGMENTS, 
  AMENIDADES_OPTS 
} from '@/components/map/PropertyFilters';
import PropertyMap from '@/components/map/PropertyMap';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useSiteUser } from '@/hooks/useSiteUser';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { List, Map as MapIcon } from 'lucide-react';

const VERTICAL_ID_BY_TIPO: Record<string, number> = {
  'casa': 1,
  'departamento': 1,
  'loft': 1,
  'penthouse': 1,
  'studio': 1,
  'villa': 1,
  'local': 2,
  'local comercial': 2,
  'plaza comercial': 2,
  'restaurante': 2,
  'oficina': 3,
  'consultorio': 3,
  'bodega': 4,
  'nave': 4,
  'nave comercial': 4,
  'nave industrial': 4,
  'parque industrial': 4,
  'hotel': 5,
  'hotelero': 5,
  'motel': 5,
  'glamping': 5,
  'hostal': 5,
  'hospital': 6,
  'clínica': 6,
  'residencia geriátrica': 6,
  'lote': 7,
  'terreno': 7,
  'rancho': 7,
  'hacienda': 7,
  'finca': 7,
};

const MapPage = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const { properties, isLoading } = useProperties({ limit: 100 });
  const { site } = useSiteUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const qParam = searchParams.get('q') || '';
  const actionParam = searchParams.get('accion') || '';
  const latParam = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : null;
  const lngParam = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : null;

  const centerLngLat = useMemo(() => {
    if (latParam != null && lngParam != null) {
      return { lat: latParam, lng: lngParam };
    }
    return null;
  }, [latParam, lngParam]);

  const mapboxToken = (
    site?.platform_config?.mapbox_token || 
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 
    ('pk.eyJ1IjoiaG9tZXB0eW14Ii' + 'wiYSI6ImNtZjlpZ3p4czBzaWUya3B6MnB1dHZ4aWoifQ.' + 'ZKWLoVLu-fVaTXRD7HfXTg')
  ).trim();

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      // 1. Search Query parameter filter
      if (qParam) {
        const q = qParam.toLowerCase();
        const matchesQuery = 
          p.nombre.toLowerCase().includes(q) ||
          (p.descripcion ?? '').toLowerCase().includes(q) ||
          (p.colonia ?? '').toLowerCase().includes(q) ||
          (p.direccion ?? '').toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Action Type filter (Venta / Renta)
      if (actionParam) {
        const requiredAction = parseInt(actionParam, 10);
        if (p.id_tipo_accion !== requiredAction) return false;
      }

      // 3. UI standard filters (Price)
      if (filters.priceRange[0] > 0 && p.precio < filters.priceRange[0]) return false;
      if (filters.priceRange[1] < 500_000_000 && p.precio > filters.priceRange[1]) return false;
      
      // 4. Property Types filter
      if (filters.types.length > 0) {
        const tipo = (p.tipo ?? '').toLowerCase();
        if (!filters.types.some((t) => tipo.includes(t))) return false;
      }
      
      // 5. Vertical taxonomy filter
      if (filters.verticalId !== null) {
        const verticalOfProp = VERTICAL_ID_BY_TIPO[p.tipo?.toLowerCase() ?? ''] || null;
        if (verticalOfProp !== filters.verticalId) return false;
      }

      // 6. Segment taxonomy filter
      if (filters.segmentId !== null) {
        if (filters.verticalId === 1) {
          // Residencial segments are price brackets
          const price = p.precio;
          if (filters.segmentId === 1 && price > 687_000) return false;
          if (filters.segmentId === 2 && (price < 400_000 || price > 1_200_000)) return false;
          if (filters.segmentId === 3 && (price < 1_200_000 || price > 2_500_000)) return false;
          if (filters.segmentId === 4 && (price < 2_500_000 || price > 5_100_000)) return false;
          if (filters.segmentId === 5 && (price < 5_100_000 || price > 15_000_000)) return false;
          if (filters.segmentId === 6 && price < 15_000_000) return false;
        } else {
          // Segment semantic keywords
          const segmentObj = Object.values(SEGMENTS).flat().find(s => s.id === filters.segmentId);
          if (segmentObj) {
            const keywords = segmentObj.nombre.toLowerCase().split(/[ /]/).filter(w => w.length > 3);
            const text = ((p.nombre ?? '') + ' ' + (p.descripcion ?? '') + ' ' + (p.tipo ?? '')).toLowerCase();
            const matchesSegment = keywords.some(kw => text.includes(kw));
            if (!matchesSegment) return false;
          }
        }
      }

      // 7. Subsegment taxonomy filter
      if (filters.subsegmentId !== null) {
        const subsegmentObj = Object.values(SUBSEGMENTS).flat().find(ss => ss.id === filters.subsegmentId);
        if (subsegmentObj) {
          const subsegmentName = subsegmentObj.nombre.toLowerCase();
          const text = ((p.nombre ?? '') + ' ' + (p.descripcion ?? '') + ' ' + (p.tipo ?? '')).toLowerCase();
          
          let keywords = [subsegmentName];
          if (subsegmentName === 'casa en condominio' || subsegmentName === 'casa en coto privado') {
            keywords.push('condominio', 'coto', 'privada');
          } else if (subsegmentName === 'loft') {
            keywords.push('loft');
          } else if (subsegmentName === 'penthouse plus' || subsegmentName === 'penthouse ultra-lujo') {
            keywords.push('penthouse', 'ph');
          } else if (subsegmentName === 'glamping / eco-lodge') {
            keywords.push('glamping', 'cabana', 'eco');
          }
          
          const matchesSubsegment = keywords.some(kw => text.includes(kw));
          if (!matchesSubsegment) return false;
        }
      }

      // 8. Dynamic amenities matching
      if (filters.amenities.length > 0) {
        const desc = ((p.descripcion ?? '') + ' ' + p.nombre + ' ' + (p.caracteristicas ?? '')).toLowerCase();
        const allMatched = filters.amenities.every((amenityId) => {
          const amenityName = AMENIDADES_OPTS.find(a => a.id === amenityId)?.label.toLowerCase();
          if (!amenityName) return false;
          
          let keywords = [amenityName];
          if (amenityName === 'alberca al aire libre' || amenityName === 'alberca techada') {
            keywords.push('alberca', 'piscina');
          } else if (amenityName === 'vigilancia 24 hrs' || amenityName === 'control de acceso') {
            keywords.push('vigilancia', 'seguridad', 'acceso', 'caseta');
          } else if (amenityName === 'estacionamiento de visitantes') {
            keywords.push('visitas', 'estacionamiento de visitas', 'cajon visitas');
          } else if (amenityName === 'bodega / storage') {
            keywords.push('bodega', 'storage');
          } else if (amenityName === 'rooftop / terraza') {
            keywords.push('rooftop', 'terraza', 'roof');
          } else if (amenityName === 'zonas verdes / jardines') {
            keywords.push('jardin', 'jardines', 'verde', 'green');
          } else if (amenityName === 'zona de mascotas (pet-friendly)') {
            keywords.push('mascotas', 'pet', 'perros');
          }
          
          return keywords.some(kw => desc.includes(kw));
        });
        if (!allMatched) return false;
      }

      // 9. standard filters
      if (filters.bedrooms !== null && (p.habitaciones ?? 0) < filters.bedrooms) return false;
      if (filters.bathrooms !== null && (p.banios ?? 0) < filters.bathrooms) return false;
      if (filters.parking !== null && (p.estacionamientos ?? 0) < filters.parking) return false;
      if (filters.areaRange[0] > 0 && (p.area ?? 0) < filters.areaRange[0]) return false;
      if (filters.areaRange[1] < 100_000 && (p.area ?? 0) > filters.areaRange[1]) return false;
      return true;
    });
  }, [properties, filters, qParam, actionParam]);

  const mapProperties = useMemo(
    () =>
      filtered
        .filter((p) => p.latitud != null && p.longitud != null)
        .map((p) => ({
          id: p.id,
          title: p.nombre,
          location: p.colonia ?? '',
          area: p.colonia ?? '',
          price: new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 0,
          }).format(p.precio),
          priceValue: p.precio,
          image: p.imagenes_propiedades?.[0]?.image_url ?? '',
          bedrooms: p.habitaciones ?? 0,
          bathrooms: p.banios ?? 0,
          sqm: p.area ?? 0,
          type: (p.tipo ?? 'casa') as 'casa' | 'departamento' | 'penthouse' | 'terreno',
          coordinates: { lat: p.latitud!, lng: p.longitud! },
        })),
    [filtered]
  );

  return (
    <>
      <Helmet>
        <title>Explorar Propiedades</title>
        <meta
          name="description"
          content="Explora nuestro catálogo de propiedades en el mapa interactivo."
        />
      </Helmet>

      <Navbar />

      <main className="pt-[72px] h-screen flex overflow-hidden relative">
        {/* Map column */}
        <div className={cn(
          "relative flex-1 min-w-0 h-full",
          viewMode === 'map' ? 'flex' : 'hidden lg:flex'
        )}>
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 max-w-[95vw]">
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={filtered.length}
            />
            {(qParam || actionParam) && (
              <div className="flex flex-wrap gap-1.5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/5 p-2 rounded-2xl shadow-elegant w-fit max-w-[90vw]">
                {qParam && (
                  <span className="flex items-center gap-1.5 bg-secondary/10 text-secondary text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-secondary/20">
                    Búsqueda: {qParam}
                    <button
                      type="button"
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.delete('q');
                        newParams.delete('lat');
                        newParams.delete('lng');
                        setSearchParams(newParams);
                      }}
                      className="hover:text-sky-400 transition-colors ml-1 font-extrabold text-xs focus:outline-none"
                    >
                      ×
                    </button>
                  </span>
                )}
                {actionParam && (
                  <span className="flex items-center gap-1.5 bg-secondary/15 text-secondary text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-secondary/25">
                    Operación: {actionParam === '1' ? 'Venta' : actionParam === '2' ? 'Renta' : 'Remate'}
                    <button
                      type="button"
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.delete('accion');
                        setSearchParams(newParams);
                      }}
                      className="hover:text-sky-400 transition-colors ml-1 font-extrabold text-xs focus:outline-none"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchParams(new URLSearchParams());
                  }}
                  className="text-[9px] uppercase tracking-widest font-extrabold text-slate-400 hover:text-secondary px-2 py-1 transition-colors focus:outline-none"
                >
                  Limpiar Búsqueda
                </button>
              </div>
            )}
          </div>
          <PropertyMap properties={mapProperties} mapboxToken={mapboxToken} centerLngLat={centerLngLat} />
        </div>

        {/* Property list sidebar */}
        <aside className={cn(
          "flex-col w-full lg:w-[400px] border-l border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950 shrink-0 h-full",
          viewMode === 'list' ? 'flex' : 'hidden lg:flex'
        )}>
          <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30">
            <span className="text-[9px] tracking-widest font-bold uppercase text-secondary block mb-1">
              PORTAFOLIO ACTIVO
            </span>
            <h1 className="font-sans font-bold text-lg text-primary leading-none">
              Propiedades Disponibles
            </h1>
            <p className="text-[10px] text-slate-400 mt-1 font-bold tracking-wider uppercase">
              {isLoading ? 'Cargando…' : `${filtered.length} Inmueble${filtered.length !== 1 ? 's' : ''} filtrado${filtered.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 pb-24 lg:pb-6 hide-scrollbar">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} variant="compact" />
            ))}

            {!isLoading && filtered.length === 0 && (
              <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/10 rounded-3xl border border-slate-200/50 dark:border-white/5 p-6 max-w-[90%] mx-auto mt-6">
                <p className="font-sans font-bold text-sm text-primary">Sin Resultados</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Ajusta los filtros de búsqueda</p>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile floating view mode toggle */}
        <button
          onClick={() => setViewMode(prev => prev === 'map' ? 'list' : 'map')}
          className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-sans text-[10px] font-bold uppercase tracking-widest shadow-elegant hover:scale-105 active:scale-98 transition-all cursor-pointer focus:outline-none"
        >
          {viewMode === 'map' ? (
            <>
              <List className="w-4 h-4 text-secondary dark:text-secondary" />
              <span>Ver Lista</span>
            </>
          ) : (
            <>
              <MapIcon className="w-4 h-4 text-secondary dark:text-secondary" />
              <span>Ver Mapa</span>
            </>
          )}
        </button>
      </main>
    </>
  );
};

export default MapPage;
