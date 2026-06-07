import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Heart, Shield } from "lucide-react";

export default function SmartSearchCTA() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/30 border-t border-border dark:border-white/5 relative overflow-hidden font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Column: Premium Editorial Layout */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full text-[10px] font-bold text-secondary uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              BÚSQUEDA INTELIGENTE AGENCIA
            </div>
            
            <h2 className="font-sans text-3xl md:text-5xl text-primary font-extrabold tracking-tight leading-tight">
              Encuentra la residencia ideal según tu estilo de vida
            </h2>
            
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
              Deja de buscar propiedades en listas rígidas. A través de nuestro embudo calificado de 6 pasos, define tus necesidades reales, tu presupuesto viable, tus métodos de financiamiento y documentación de forma interactiva.
            </p>
            
            <p className="text-slate-400 dark:text-slate-500 text-xs leading-relaxed">
              Nuestro motor avanzado analiza tus requerimientos comerciales, corporativos o familiares para conectar tu perfil con inmuebles de alta plusvalía y certeza legal.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border dark:border-white/5">
              <div className="flex gap-2">
                <Heart className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-primary">Análisis de Rutina</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-semibold">Conectamos tu movilidad, espacios y estilo de vida.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Shield className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-primary">Certeza Patrimonial</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-semibold">Filtro jurídico y documental centralizado y seguro.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/solicita-inmueble"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-secondary text-primary-foreground hover:text-white rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-elegant hover:scale-[1.02] focus:outline-none"
              >
                Comenzar Búsqueda Inteligente
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Image Column: Luxury Floating Card Mockup */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Main Picture */}
            <div className="aspect-[4/3] w-full max-w-lg rounded-3xl overflow-hidden shadow-elegant border border-border dark:border-white/5 relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Estate Lifestyle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            {/* Floating Glassmorphic Card (Funnel Mockup) */}
            <div className="absolute -bottom-6 left-6 md:-left-6 max-w-xs bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border border-white/40 dark:border-white/5 shadow-elegant rounded-3xl p-5 animate-float">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-2xl bg-secondary flex items-center justify-center font-sans text-xs text-white font-bold">
                  IA
                </div>
                <div>
                  <h5 className="font-sans font-bold text-xs text-primary">Perfil de Inversión</h5>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-semibold">Procesando requerimientos...</span>
                </div>
              </div>

              <p className="font-sans text-[11px] text-primary italic leading-relaxed bg-white/50 dark:bg-slate-900/50 p-3 rounded-2xl border border-white/20 dark:border-white/5 font-semibold">
                &ldquo;Cliente con expansión comercial. Requiere oficinas ejecutivas y locales con conectividad a vialidades principales, estacionamiento para clientes y alto flujo peatonal.&rdquo;
              </p>

              <div className="flex items-center justify-between mt-4 text-[10px] font-sans font-bold text-emerald-600 dark:text-emerald-400">
                <span>✓ Filtro Viable</span>
                <span>Match: 98%</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
