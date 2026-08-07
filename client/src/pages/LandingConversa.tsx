import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import ContactSection from "../components/ContactSection";
import { WHATSAPP_URL } from "../lib/constants";

const BENEFITS = [
  {
    title: "Atendimento pessoal",
    description:
      "Você fala diretamente comigo, não com uma equipe. Cada caso recebe atenção próxima do início ao fim.",
  },
  {
    title: "Sigilo em cada etapa",
    description:
      "Questões de família envolvem informações sensíveis. Discrição não é formalidade aqui — é prioridade.",
  },
  {
    title: "Caminhos mais rápidos, quando possíveis",
    description:
      "Priorizo soluções extrajudiciais e consensuais sempre que o caso permitir, reduzindo desgaste e tempo de espera.",
  },
];

export default function LandingConversa() {
  return (
    <div>
      <SEO
        title="Marque uma Conversa | Lara Café Advocacia"
        description="Direito de Família e Sucessões, com atendimento próximo e sigiloso. Marque uma conversa e entenda seus próximos passos com clareza."
        path="/marcar-conversa"
      />

      <section className="relative overflow-hidden bg-coffee py-24 text-cream sm:py-32">
        <img
          src="/assets/support-hands.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/70 to-coffee/40" />
        <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Eyebrow light align="center">
            Direito de Família e Sucessões
          </Eyebrow>
          <h1 className="text-[2rem] font-normal leading-[1.2] tracking-tight sm:text-[2.6rem]">
            Antes de decidir, converse com quem vai cuidar do seu caso de perto.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-cream/80">
            Divórcio, inventário, partilha de bens ou planejamento preventivo — marque uma
            conversa e entenda seus próximos passos com clareza, sigilo e atenção pessoal.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contato"
              className="w-full rounded-full bg-cream px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-coffee shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
            >
              Marcar uma Conversa
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-cream/40 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-cream sm:w-auto"
            >
              Falar no WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-3">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.1}>
                <h3 className="font-serif text-lg font-semibold text-coffee">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{benefit.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
