import Reveal from "./Reveal";
import { trpc } from "../lib/trpc";

export interface EditorialBandContent {
  quote: string;
}

export const DEFAULT_EDITORIAL_BAND: EditorialBandContent = {
  quote: "Decisões importantes merecem tempo, escuta e a orientação certa.",
};

export default function EditorialBand() {
  const { data } = trpc.siteContent.get.useQuery({ key: "editorial_band" });
  const content = (data as EditorialBandContent | null) ?? DEFAULT_EDITORIAL_BAND;

  return (
    <section className="relative overflow-hidden bg-coffee py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url(/assets/pattern-monogram.jpg)",
          backgroundSize: "260px 260px",
          backgroundRepeat: "repeat",
        }}
      />
      <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-balance font-serif text-[1.4rem] italic leading-snug text-cream sm:text-[1.65rem]">
          {content.quote}
        </p>
      </Reveal>
    </section>
  );
}
