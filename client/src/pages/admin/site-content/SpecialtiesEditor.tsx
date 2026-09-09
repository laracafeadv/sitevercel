import { useSiteContentForm } from "../../../hooks/useSiteContentForm";
import { DEFAULT_SPECIALTIES, type SpecialtiesContent } from "../../../components/Specialties";
import SaveBar from "./SaveBar";
import TitleTextListEditor from "./TitleTextListEditor";

export default function SpecialtiesEditor() {
  const { form, setForm, save, saving, saved, error, loading } = useSiteContentForm<SpecialtiesContent>(
    "specialties",
    DEFAULT_SPECIALTIES
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
        <label className="mb-1.5 block text-sm font-medium text-coffee">Nota</label>
        <input
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Grupos de áreas</label>
        <div className="space-y-6">
          {form.groups.map((group, gi) => (
            <div key={gi} className="rounded-sm border border-coffee-light/40 p-4">
              <div className="flex items-start justify-between gap-3">
                <input
                  value={group.label}
                  onChange={(e) => {
                    const groups = [...form.groups];
                    groups[gi] = { ...groups[gi], label: e.target.value };
                    setForm({ ...form, groups });
                  }}
                  placeholder="Nome do grupo"
                  className="w-full rounded-sm border border-coffee-light/30 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coffee/30"
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, groups: form.groups.filter((_, idx) => idx !== gi) })}
                  className="shrink-0 rounded-sm border border-red-300 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                >
                  Remover grupo
                </button>
              </div>

              <div className="mt-4">
                <TitleTextListEditor
                  label="Itens deste grupo"
                  items={group.items}
                  onChange={(items) => {
                    const groups = [...form.groups];
                    groups[gi] = { ...groups[gi], items };
                    setForm({ ...form, groups });
                  }}
                  emptyItem={{ title: "", text: "" }}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setForm({ ...form, groups: [...form.groups, { label: "", items: [] }] })}
          className="mt-3 rounded-sm border border-coffee/30 px-4 py-2 text-xs font-medium text-coffee hover:bg-coffee/5"
        >
          + Adicionar grupo
        </button>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
    </div>
  );
}
