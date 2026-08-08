import { useSiteContentForm } from "../../../hooks/useSiteContentForm";
import { DEFAULT_HOW_IT_WORKS, type HowItWorksContent } from "../../../components/HowItWorks";
import SaveBar from "./SaveBar";

export default function HowItWorksEditor() {
  const { form, setForm, save, saving, saved, error, loading } = useSiteContentForm<HowItWorksContent>(
    "how_it_works",
    DEFAULT_HOW_IT_WORKS
  );

  if (loading) return <p className="text-sm text-ink/60">Carregando...</p>;

  return (
    <div className="space-y-5 rounded-lg bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Eyebrow</label>
        <input
          value={form.eyebrow}
          onChange={(e) => setForm({ ...form, eyebrow: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Título</label>
        <textarea
          rows={2}
          value={form.heading}
          onChange={(e) => setForm({ ...form, heading: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Descrição</label>
        <textarea
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Texto do botão</label>
        <input
          value={form.ctaText}
          onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Etapas</label>
        <div className="space-y-4">
          {form.steps.map((step, i) => (
            <div key={i} className="rounded-sm border border-coffee-light/30 p-4">
              <div className="flex items-start gap-3">
                <input
                  value={step.number}
                  onChange={(e) => {
                    const steps = [...form.steps];
                    steps[i] = { ...steps[i], number: e.target.value };
                    setForm({ ...form, steps });
                  }}
                  placeholder="Nº"
                  className="w-16 shrink-0 rounded-sm border border-coffee-light/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
                />
                <input
                  value={step.title}
                  onChange={(e) => {
                    const steps = [...form.steps];
                    steps[i] = { ...steps[i], title: e.target.value };
                    setForm({ ...form, steps });
                  }}
                  placeholder="Título"
                  className="w-full rounded-sm border border-coffee-light/30 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coffee/30"
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, steps: form.steps.filter((_, idx) => idx !== i) })}
                  className="shrink-0 rounded-sm border border-red-300 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                >
                  Remover
                </button>
              </div>
              <textarea
                rows={2}
                value={step.text}
                onChange={(e) => {
                  const steps = [...form.steps];
                  steps[i] = { ...steps[i], text: e.target.value };
                  setForm({ ...form, steps });
                }}
                placeholder="Texto"
                className="mt-2 w-full rounded-sm border border-coffee-light/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              steps: [
                ...form.steps,
                { number: String(form.steps.length + 1).padStart(2, "0"), title: "", text: "" },
              ],
            })
          }
          className="mt-3 rounded-sm border border-coffee/30 px-4 py-2 text-xs font-medium text-coffee hover:bg-coffee/5"
        >
          + Adicionar etapa
        </button>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
    </div>
  );
}
