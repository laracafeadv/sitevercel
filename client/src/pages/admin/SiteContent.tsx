import { useState } from "react";
import SEO from "../../components/SEO";
import HeroEditor from "./site-content/HeroEditor";
import AboutEditor from "./site-content/AboutEditor";
import SpecialtiesEditor from "./site-content/SpecialtiesEditor";
import HowItWorksEditor from "./site-content/HowItWorksEditor";
import EditorialBandEditor from "./site-content/EditorialBandEditor";
import FooterEditor from "./site-content/FooterEditor";

const SECTIONS = [
  { key: "hero", label: "Início (Hero)", Editor: HeroEditor },
  { key: "about", label: "Sobre mim", Editor: AboutEditor },
  { key: "specialties", label: "Áreas de Atuação", Editor: SpecialtiesEditor },
  { key: "how_it_works", label: "Como Funciona", Editor: HowItWorksEditor },
  { key: "editorial_band", label: "Frase em Destaque", Editor: EditorialBandEditor },
  { key: "footer", label: "Rodapé", Editor: FooterEditor },
] as const;

export default function SiteContent() {
  const [active, setActive] = useState<(typeof SECTIONS)[number]["key"]>("hero");
  const ActiveEditor = SECTIONS.find((s) => s.key === active)?.Editor ?? HeroEditor;

  return (
    <div>
      <SEO title="Conteúdo do Site | Painel Administrativo" />
      <h1 className="font-serif text-2xl font-semibold text-coffee">Conteúdo do Site</h1>
      <p className="mt-1.5 text-sm text-ink/60">
        Edite os textos e imagens das seções da página inicial. As alterações aparecem no site
        assim que você salvar.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {SECTIONS.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => setActive(section.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === section.key
                ? "bg-coffee text-cream"
                : "bg-white text-ink/70 hover:bg-coffee/10"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <ActiveEditor />
      </div>
    </div>
  );
}
