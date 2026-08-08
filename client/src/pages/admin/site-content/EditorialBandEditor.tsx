import { useSiteContentForm } from "../../../hooks/useSiteContentForm";
import { DEFAULT_EDITORIAL_BAND, type EditorialBandContent } from "../../../components/EditorialBand";
import SaveBar from "./SaveBar";

export default function EditorialBandEditor() {
  const { form, setForm, save, saving, saved, error, loading } = useSiteContentForm<EditorialBandContent>(
    "editorial_band",
    DEFAULT_EDITORIAL_BAND
  );

  if (loading) return <p className="text-sm text-ink/60">Carregando...</p>;

  return (
    <div className="space-y-5 rounded-lg bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Frase em destaque</label>
        <textarea
          rows={2}
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
    </div>
  );
}
