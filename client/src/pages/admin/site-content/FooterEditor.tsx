import { useSiteContentForm } from "../../../hooks/useSiteContentForm";
import { DEFAULT_FOOTER, type FooterContent } from "../../../components/Footer";
import SaveBar from "./SaveBar";

export default function FooterEditor() {
  const { form, setForm, save, saving, saved, error, loading } = useSiteContentForm<FooterContent>(
    "footer",
    DEFAULT_FOOTER
  );

  if (loading) return <p className="text-sm text-ink/60">Carregando...</p>;

  return (
    <div className="space-y-5 rounded-lg bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">
          Texto de descrição (rodapé)
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
    </div>
  );
}
