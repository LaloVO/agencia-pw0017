import { Search, MapPin, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [query, setQuery] = useState('');
  const [action, setAction] = useState('1'); // '1' = Venta, '2' = Renta
  const navigate = useNavigate();
  const { site } = useSiteUser();

  const mapboxToken = (
    site?.platform_config?.mapbox_token || 
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 
    ('pk.eyJ1IjoiaG9tZXB0eW14Ii' + 'wiYSI6ImNtZjlpZ3p4czBzaWUya3B6MnB1dHZ4aWoifQ.' + 'ZKWLoVLu-fVaTXRD7HfXTg')
  ).trim();

  // Suggestions and Autocomplete State
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to clicks outside to close suggestions dropdown
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Fetch suggestions with debounce as the user types
  useEffect(() => {
    if (!query.trim() || !mapboxToken) {
      setSuggestions([]);
      return;
    }

    if (selectedCoords && query === selectedCoords.name) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${mapboxToken}&limit=5&types=neighborhood,locality,place,address&country=mx&proximity=-99.1332,19.4326`
        );
        if (response.ok) {
          const data = await response.json();
          let features = data.features || [];
          setSuggestions(features);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, mapboxToken, selectedCoords]);

  const handleSuggestionClick = (feature: any) => {
    const [lng, lat] = feature.center;
    const name = feature.place_name;
    setQuery(name);
    setSelectedCoords({ lat, lng, name });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('accion', action);
    
    if (selectedCoords) {
      params.set('lat', String(selectedCoords.lat));
      params.set('lng', String(selectedCoords.lng));
    } else if (query.trim() && mapboxToken) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${mapboxToken}&limit=1&country=mx`
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            params.set('lat', String(lat));
            params.set('lng', String(lng));
          }
        }
      } catch (error) {
        console.error('Error geocoding in HeroSection:', error);
      }
    }
    
    navigate(`/mapa?${params.toString()}`);
  };

  return (
    <header className="relative w-full h-[95vh] min-h-[650px] overflow-hidden flex items-center justify-center bg-slate-950 font-sans">
      {/* Background Architectural Image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div
          className="w-full h-[115%] bg-cover bg-center transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2200&auto=format&fit=crop')`,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        {/* Deep Executive Slate & Black Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/70 to-slate-950" />
      </div>

      {/* Sutil Caret Watermark Floating in Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03] select-none">
        <svg className="w-[120vh] h-[120vh] text-white animate-float" viewBox="0 0 100 100" fill="none">
          <path d="M50 15L85 45H70L50 27L30 45H15L50 15Z" fill="currentColor" />
          <path d="M50 85L15 55H30L50 73L70 55H85L50 85Z" fill="currentColor" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center">
        {/* Small Intro Badge */}
        <div
          className={`transition-all duration-1000 delay-100 mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-slate-300">
            20 AÑOS DE ASESORÍA EJECUTIVA
          </span>
        </div>

        {/* Monumental Centered Title */}
        <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-8 max-w-4xl drop-shadow-md">
          <span
            className={`block transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            El Arte de la
          </span>
          <span
            className={`block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-sky-400 to-white transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            Inversión Inteligente
          </span>
        </h1>

        {/* Elegant Minimalist Subcopy */}
        <p
          className={`font-sans text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-12 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          Brindamos una consultoría integral premium y de máxima seguridad en la compra, venta, renta y administración de propiedades residenciales, comerciales e industriales.
        </p>

        {/* Search Bar Capsule Container */}
        <div
          className={`w-full max-w-3xl transition-all duration-1000 delay-500 relative ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Action Toggle (Comprar / Rentar) */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => setAction('1')}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 border backdrop-blur-md ${
                action === '1'
                  ? 'bg-secondary text-white border-secondary shadow-[0_4px_12px_rgba(14,165,233,0.3)]'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              Comprar / Adquirir
            </button>
            <button
              type="button"
              onClick={() => setAction('2')}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 border backdrop-blur-md ${
                action === '2'
                  ? 'bg-secondary text-white border-secondary shadow-[0_4px_12px_rgba(14,165,233,0.3)]'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              Rentar / Arrendar
            </button>
          </div>

          {/* Glassmorphic Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex flex-col sm:flex-row gap-2.5 p-2 rounded-3xl sm:rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            <div className="flex-1 flex items-center bg-white/5 rounded-full px-5 py-3.5 border border-white/5 focus-within:border-secondary/40 focus-within:bg-white/10 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (selectedCoords && e.target.value !== selectedCoords.name) {
                    setSelectedCoords(null);
                  }
                }}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                placeholder="Ingresa colonia, ciudad, zona o código postal..."
                className="bg-transparent w-full outline-none text-white placeholder-slate-400 font-sans text-sm focus:outline-none"
              />
            </div>
            
            <button
              type="submit"
              className="px-8 py-4 sm:py-3.5 rounded-full bg-secondary hover:bg-sky-400 text-white font-sans uppercase text-[10px] tracking-widest font-bold hover:shadow-[0_8px_20px_rgba(14,165,233,0.3)] active:scale-98 transition-all shrink-0 flex items-center justify-center gap-1.5"
            >
              Consultar Inventario
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Suggestions Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden z-50 transition-all max-h-72 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-6 py-4 text-left flex items-start gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans font-bold text-white text-sm">
                        {suggestion.text}
                      </p>
                      <p className="font-sans text-slate-400 text-xs mt-0.5 truncate max-w-md">
                        {suggestion.place_name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
