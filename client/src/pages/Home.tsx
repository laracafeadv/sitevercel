import SEO from "../components/SEO";
import Hero from "../components/Hero";
import About from "../components/About";
import Specialties from "../components/Specialties";
import HowItWorks from "../components/HowItWorks";
import ContactSection from "../components/ContactSection";
import EditorialBand from "../components/EditorialBand";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "../lib/constants";

const LEGAL_SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Lara Café Advocacia",
  description:
    "Advocacia estratégica em Direito de Família e Sucessões, com discrição e proximidade em cada etapa do caso.",
  url: "https://laracafeadvocacia.com.br",
  telephone: `+${WHATSAPP_NUMBER}`,
  email: CONTACT_EMAIL,
  areaServed: "BR",
  priceRange: "$$",
  openingHours: "Mo-Fr 08:00-18:00",
  founder: {
    "@type": "Person",
    name: "Lara Café",
    jobTitle: "Advogada",
  },
  knowsAbout: ["Direito de Família", "Sucessões", "Direito Patrimonial"],
};

export default function Home() {
  return (
    <>
      <SEO
        title="Lara Café Advocacia | Direito de Família e Sucessões"
        description="Advocacia estratégica em Direito de Família e Sucessões, com discrição e proximidade em cada etapa do caso."
        path="/"
        jsonLd={LEGAL_SERVICE_JSON_LD}
      />
      <Hero />
      <About />
      <Specialties />
      <HowItWorks />
      <EditorialBand />
      <ContactSection />
    </>
  );
}
