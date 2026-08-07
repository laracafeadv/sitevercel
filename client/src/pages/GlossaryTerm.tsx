import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import { GLOSSARY_TERMS, getGlossaryTerm } from "../lib/glossary";

export default function GlossaryTerm() {
  const { slug } = useParams<{ slug: string }>();
  const term = slug ? getGlossaryTerm(slug) : undefined;

  if (!term) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-2xl font-semibold text-coffee">Termo não encontrado</h1>
        <Link to="/glossario" className="mt-6 inline-block text-coffee underline">
          Voltar ao glossário
        </Link>
      </div>
    );
  }

  const others = GLOSSARY_TERMS.filter((t) => t.slug !== term.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SEO
        title={`${term.term} | Glossário | Lara Café Advocacia`}
        description={term.shortDefinition}
        path={`/glossario/${term.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          name: term.term,
          description: term.shortDefinition,
          inDefinedTermSet: "https://laracafeadvocacia.com.br/glossario",
        }}
      />

      <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-ink/50">
        <Link to="/" className="hover:text-coffee">
          Início
        </Link>
        <span>&gt;</span>
        <Link to="/glossario" className="hover:text-coffee">
          Glossário
        </Link>
        <span>&gt;</span>
        <span className="text-coffee">{term.term}</span>
      </nav>

      <Reveal>
        <h1 className="text-[1.75rem] font-normal leading-[1.25] tracking-tight text-coffee sm:text-[2.1rem]">
          {term.term}
        </h1>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink/70">{term.shortDefinition}</p>

        <div className="prose-article mt-8 space-y-4">
          {term.content.map((p, i) => (
            <p key={i} className="text-[0.975rem] leading-relaxed text-ink/75">
              {p}
            </p>
          ))}
        </div>

        {term.relatedArticleSlug && (
          <Link
            to={`/blog/${term.relatedArticleSlug}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-coffee"
          >
            Ler artigo completo no blog →
          </Link>
        )}

        <Link
          to="/#contato"
          className="mt-10 block rounded-full bg-coffee px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-cream sm:inline-block"
        >
          Marcar uma Conversa
        </Link>
      </Reveal>

      <div className="mt-14 border-t border-coffee/12 pt-8">
        <h2 className="mb-4 font-serif text-lg font-semibold text-coffee">Outros termos</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                to={`/glossario/${t.slug}`}
                className="block rounded-lg border border-coffee-light/20 bg-white p-4 transition-colors hover:border-coffee"
              >
                <p className="font-serif text-coffee">{t.term}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/glossario" className="mt-6 inline-block text-sm text-coffee underline">
          Ver glossário completo
        </Link>
      </div>
    </div>
  );
}
