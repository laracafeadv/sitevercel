import { motion } from "framer-motion";
import { WHATSAPP_URL } from "../lib/constants";
import { trpc } from "../lib/trpc";

export interface HeroContent {
  quote: string;
  backgroundImage: string;
  subtitle?: string;
  ctaLabel?: string;
}

export const DEFAULT_HERO: HeroContent = {
  quote: "Todo compromisso — construído ou desfeito — merece ser conduzido com o mesmo cuidado.",
  backgroundImage: "/assets/support-veil-embrace.jpg",
};

export default function Hero() {
  const { data } = trpc.siteContent.get.useQuery({ key: "hero" });
  const content = (data as HeroContent | null) ?? DEFAULT_HERO;

  return (
    <section
      id="home"
      className="scroll-mt-28 lg:scroll-mt-32 relative flex min-h-[88vh] items-end overflow-hidden bg-coffee sm:min-h-[92vh]"
    >
      <img
        src={content.backgroundImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[75%_30%]"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-coffee/85 via-coffee/25 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex max-w-xl items-baseline gap-3"
        >
          <span className="font-serif text-[1.6rem] italic leading-snug text-cream sm:text-[2rem]">
            {content.quote}
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-5 w-5 shrink-0 self-center text-cream/70 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </a>

        {content.subtitle && (
          <p className="mt-4 max-w-lg text-[0.95rem] text-cream/75">{content.subtitle}</p>
        )}

        {content.ctaLabel && (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-2.5 text-[0.78rem] font-medium uppercase tracking-wider text-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-cream hover:bg-cream hover:text-coffee"
          >
            {content.ctaLabel}
          </a>
        )}
      </motion.div>

      <img
        src="/assets/mono-light.png"
        alt=""
        aria-hidden
        className="absolute right-6 top-6 h-9 w-auto opacity-70 sm:right-10 sm:top-10 sm:h-11"
      />
    </section>
  );
}
