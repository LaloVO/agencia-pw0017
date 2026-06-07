import { Link } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const { user } = useSiteUser();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-100 pt-20 pb-10 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Slogan Column */}
          <div className="md:col-span-1">
            <Link to="/" onClick={handleScrollTop} className="flex items-center mb-6 focus:outline-none">
              <svg className="w-8 h-8 text-secondary mr-2" viewBox="0 0 100 100" fill="none">
                <path d="M50 15L85 45H70L50 27L30 45H15L50 15Z" fill="currentColor" />
                <path d="M50 85L15 55H30L50 73L70 55H85L50 85Z" fill="currentColor" />
              </svg>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-lg tracking-widest text-slate-100 leading-none">
                  AGENCIA
                </span>
                <span className="font-sans text-[8px] tracking-[0.25em] text-slate-400 uppercase -mt-0.5">
                  Bienes Raíces
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Nuestros servicios son el resultado de 20 años de experiencia que integran toda la oferta inmobiliaria. Tu inversión segura es nuestra máxima prioridad.
            </p>
          </div>

          {/* Model VCRI Column */}
          <div>
            <h3 className="text-slate-300 font-bold uppercase tracking-widest text-xs mb-6">Estructura VCRI</h3>
            <ul className="space-y-3 text-slate-400 text-xs font-medium">
              <li>
                <span className="text-secondary font-semibold mr-1.5">V</span> Cliente Vendedor
              </li>
              <li>
                <span className="text-secondary font-semibold mr-1.5">C</span> Cliente Comprador
              </li>
              <li>
                <span className="text-secondary font-semibold mr-1.5">R</span> Arrendamiento
              </li>
              <li>
                <span className="text-secondary font-semibold mr-1.5">I</span> Inmobiliarias y Empresas
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-slate-300 font-bold uppercase tracking-widest text-xs mb-6">Explorar</h3>
            <ul className="space-y-3 text-slate-400 text-xs font-semibold">
              <li>
                <Link to="/mapa" className="hover:text-secondary transition-colors">Mapa Interactivo</Link>
              </li>
              <li>
                <Link to="/propiedades" className="hover:text-secondary transition-colors">Portafolio</Link>
              </li>
              <li>
                <Link to="/solicita-inmueble" className="hover:text-secondary transition-colors">Búsqueda Inteligente</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-slate-300 font-bold uppercase tracking-widest text-xs mb-6">Contacto Directo</h3>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed font-semibold">
              ¿Listo para dar el siguiente paso? Escríbenos o llámanos directamente.
            </p>
            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-slate-300">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                Instagram
              </a>
              <span className="text-slate-700">|</span>
              <a
                href={`https://wa.me/${user?.telefono_usuario?.replace(/\D/g, '') || '521'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} AGENCIA. TODOS LOS DERECHOS RESERVADOS.</span>
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 hover:text-secondary transition-colors bg-slate-900 border border-slate-800 hover:border-secondary/40 py-2 px-4 rounded-full"
          >
            Volver Arriba
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
