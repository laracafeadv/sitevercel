import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import ContactSection from "../components/ContactSection";
import { WHATSAPP_URL } from "../lib/constants";

const BENEFITS = [
  {
    title: "Atendimento pessoal",
    text: "Você fala diretamente comigo, não com uma equipe. Cada caso recebe atenção próxima do início ao fim.",
  },
  {
    title: "Sigilo em cada etapa",
    text: "Questões de família envolvem informações sensíveis. Discrição não é formalidade aqui — é prioridade.",
  },
  {
    title: "Caminhos mais rápidos",
    text: "Priorizo soluções extrajudiciais e consensuais sempre que o caso permitir, reduzindo desgaste e tempo de espera.",
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

      <section className="relative overflow-hidden bg-coffee py-20 text-cream sm:py-28">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "url(/assets/pattern-monogram.jpg)",
            backgroundSize: "260px 260px",
            backgroundRepeat: "repeat",
          }}
        />
        <img
          src="/assets/monogram-outline.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-[26rem] w-auto opacity-[0.06] invert sm:h-[32rem]"
        />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8">
          <Reveal>
            <Eyebrow light>Direito de Família e Sucessões</Eyebrow>
            <h1 className="max-w-lg text-[2rem] font-normal leading-[1.2] tracking-tight sm:text-[2.5rem]">
              Antes de decidir, converse com quem vai cuidar do seu caso de perto.
            </h1>
            <p className="mt-5 max-w-md text-[0.975rem] leading-relaxed text-cream/75">
              Divórcio, inventário, partilha de bens ou planejamento preventivo — marque uma
              conversa e entenda seus próximos passos com clareza e sigilo.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contato"
                className="rounded-full bg-cream px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-coffee shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Marcar uma Conversa
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-cream/40 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-cream"
              >
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-[2rem] border border-cream/15 sm:-inset-5"
              />
              <img
                src="/assets/lara-foto-duotone.jpg"
                alt="Lara Café, advogada especialista em Direito de Família e Sucessões"
                className="aspect-[4/5] w-full rounded-[1.75rem] rounded-tr-[4.5rem] object-cover shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-5 left-6 rounded-md bg-cream px-5 py-3.5 shadow-lg"
              >
                <p className="font-serif text-base text-coffee">Lara Café</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-coffee/60">
                  Direito de Família e Sucessões
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.1}>
                <div className="border-t border-coffee/15 pt-5">
                  <h3 className="font-serif text-[1.1rem] text-coffee">{benefit.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/65">{benefit.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-coffee py-20 lg:py-24">
        <img
          src="/assets/monogram-outline.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.05] invert sm:h-[28rem]"
        />
        <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mx-auto mb-6 block h-px w-10 bg-cream/50" aria-hidden />
          <p className="font-serif text-[1.3rem] italic leading-snug text-cream sm:text-[1.5rem]">
            O primeiro passo nem sempre é o mais difícil — só precisa ser dado com orientação
            certa.
          </p>
        </Reveal>
      </section>

      <ContactSection
        eyebrow="Fale Comigo"
        heading="Vamos conversar sobre o seu caso"
        description="Conte, em poucas palavras, o que está acontecendo. Eu leio com atenção e retorno pessoalmente com os próximos passos possíveis para o seu caso."
      />
    </div>
  );
}
