import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { GLOSSARY_TERMS } from "../lib/glossary";

export default function Glossary() {
  const sorted = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term, "pt-BR"));

  return (
    <div>
      <SEO
        title="Glossário Jurídico | Lara Café Advocacia"
        description="Termos de Direito de Família e Sucessões explicados de forma simples: união estável, inventário, pacto antenupcial, testamento e mais."
        path="/glossario"
      />

      <section className="relative flex h-64 items-end overflow-hidden bg-coffee sm:h-72">
        <img
          src="/assets/monogram-texture-cream.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/60 to-coffee/20" />
        <Reveal className="relative mx-auto w-full max-w-7xl px-4 pb-9 sm:px-6 lg:px-8">
          <nav className="mb-3 text-xs text-cream/60">
            <Link to="/" className="hover:text-cream">
              Início
            </Link>{" "}
            &gt; <span className="text-cream">Glossário</span>
          </nav>
          <Eyebrow light>Glossário Jurídico</Eyebrow>
          <h1 className="text-[1.85rem] font-normal leading-[1.25] tracking-tight text-cream sm:text-[2.15rem]">
            Termos de Família e Sucessões, explicados com clareza
          </h1>
        </Reveal>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p className="max-w-2xl text-[0.975rem] leading-relaxed text-ink/70">
          Termos jurídicos que aparecem com frequência em casos de família e sucessões —
          explicados em linguagem simples, antes de você precisar deles.
        </p>

        <ul className="mt-10 divide-y divide-coffee/12 border-t border-coffee/12">
          {sorted.map((t) => (
            <li key={t.slug}>
              <Link
                to={`/glossario/${t.slug}`}
                className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-coffee"
              >
                <div>
                  <h2 className="font-serif text-lg text-coffee">{t.term}</h2>
                  <p className="mt-1 max-w-xl text-sm text-ink/65">{t.shortDefinition}</p>
                </div>
                <span className="hidden shrink-0 text-sm text-coffee/60 group-hover:text-coffee sm:block">
                  Ler mais →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
