import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";
import { useSiteUser } from "@/hooks/useSiteUser";
import { Sparkles } from "lucide-react";

export default function SolicitaInmueble() {
  const { user, site } = useSiteUser();

  return (
    <>
      <Helmet>
        <title>Búsqueda Inteligente | {site?.site_name ?? "Inversa Bienes Raíces"}</title>
        <meta
          name="description"
          content="Completa nuestra solicitud inteligente de 6 pasos para encontrar tu propiedad ideal. Evaluamos tu estilo de vida para una recomendación perfecta."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 relative overflow-hidden font-sans">
        {/* Background soft glowing lights */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              PATRIMONIO A TU MEDIDA
            </div>
            <h1 className="font-sans text-3xl md:text-5xl text-primary font-extrabold tracking-tight">
              Búsqueda Inteligente Inmobiliaria
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
              Define tu presupuesto, expediente y cuéntanos sobre tu rutina diaria. Nuestro motor buscará y filtrará las mejores residencias exclusivas para ti.
            </p>
          </div>

          {/* Glass Card Container for Formulario */}
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-3xl p-6 md:p-10 shadow-elegant">
            <FormularioMultiStep />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
