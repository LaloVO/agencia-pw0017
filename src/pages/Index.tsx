import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import VCRISection from '@/components/home/VCRISection';
import ObjectivesSection from '@/components/home/ObjectivesSection';
import PropertiesSection from '@/components/home/PropertiesSection';
import AgentsSection from '@/components/home/AgentsSection';
import SmartSearchCTA from '@/components/home/SmartSearchCTA';
import { useSiteUser } from '@/hooks/useSiteUser';

const Index = () => {
  const { site } = useSiteUser();

  return (
    <>
      <Helmet>
        <title>{site?.site_name ?? 'Agencia'} | Asesoría Inmobiliaria Ejecutiva Premium</title>
        <meta
          name="description"
          content="Consultoría integral y seguridad patrimonial absoluta con más de 20 años de experiencia en compra, venta, renta y administración de propiedades de alta gama."
        />
      </Helmet>

      <Navbar />

      <main id="inicio">
        <HeroSection />
        <PhilosophySection />
        <VCRISection />
        <ObjectivesSection />
        <PropertiesSection />
        <SmartSearchCTA />
        <AgentsSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;
