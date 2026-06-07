import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { site, user } = useSiteUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio', hash: '#inicio' },
    { href: '/#servicios', label: 'Servicios', hash: '#servicios' },
    { href: '/#objetivos', label: 'Objetivos', hash: '#objetivos' },
    { href: '/mapa', label: 'Mapa Interactivo' },
    { href: '/propiedades', label: 'Propiedades' },
    { href: '/#contacto', label: 'Contacto', hash: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.hash && isHomePage) {
      e.preventDefault();
      const el = document.querySelector(link.hash);
      if (el) {
        setIsMobileMenuOpen(false);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (link.hash && !isHomePage) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(link.hash!);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.08)] py-3 px-6 md:px-8'
            : 'top-0 left-0 w-full bg-transparent border-transparent py-6 px-6 md:px-12'
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          {/* Logo & Brand */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center group focus:outline-none"
          >
            {/* SVG Logo exacto con carets de Agencia */}
            <svg
              className="w-8 h-8 text-secondary mr-2 transition-transform duration-500 group-hover:rotate-180"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 15L85 45H70L50 27L30 45H15L50 15Z" fill="currentColor" />
              <path d="M50 85L15 55H30L50 73L70 55H85L50 85Z" fill="currentColor" />
            </svg>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg md:text-xl tracking-widest text-primary leading-none">
                AGENCIA
              </span>
              <span className="font-sans text-[8px] tracking-[0.25em] text-muted-foreground uppercase -mt-0.5">
                Bienes Raíces
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-7 text-xs uppercase tracking-[0.2em] font-sans font-semibold">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-primary/70 hover:text-secondary transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full focus:outline-none"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/solicita-inmueble"
              className="bg-primary hover:bg-secondary text-primary-foreground hover:text-white px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_8px_20px_rgba(14,165,233,0.25)] flex items-center gap-1.5"
            >
              Búsqueda Inteligente
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-full hover:bg-primary/5 transition-colors focus:outline-none text-primary"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Slide-out Mobile Glass Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dark blurred overlay backdrop */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Drawer container (Slide in from right) */}
        <div
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-l border-white/20 dark:border-white/5 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
            isMobileMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
          }`}
        >
          <div>
            {/* Header of Drawer */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center">
                <svg className="w-7 h-7 text-secondary mr-2" viewBox="0 0 100 100" fill="none">
                  <path d="M50 15L85 45H70L50 27L30 45H15L50 15Z" fill="currentColor" />
                  <path d="M50 85L15 55H30L50 73L70 55H85L50 85Z" fill="currentColor" />
                </svg>
                <span className="font-sans font-bold tracking-widest text-primary leading-none text-base">
                  AGENCIA
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-primary/5 transition-colors text-primary"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links inside drawer */}
            <div className="flex flex-col gap-6 font-sans">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                  className={`text-lg font-medium text-primary hover:text-secondary tracking-wide transition-all ${
                    isMobileMenuOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Drawer CTA */}
          <div
            className={`transition-all duration-500 delay-300 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              to="/solicita-inmueble"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary hover:bg-secondary text-primary-foreground hover:text-white w-full py-4 rounded-full font-sans font-semibold tracking-wider text-xs uppercase transition-colors shadow-elegant flex items-center justify-center gap-2"
            >
              Búsqueda Inteligente
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="text-center mt-6 text-[10px] tracking-widest text-muted-foreground uppercase font-sans">
              AGENCIA © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
