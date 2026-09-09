import { useSiteContentForm } from "../../../hooks/useSiteContentForm";
import { DEFAULT_HERO, type HeroContent } from "../../../components/Hero";
import ImageUploadField from "../../../components/admin/ImageUploadField";
import SaveBar from "./SaveBar";

export default function HeroEditor() {
  const { form, setForm, save, saving, saved, error, loading } = useSiteContentForm<HeroContent>(
    "hero",
    DEFAULT_HERO
  );

  if (loading) return <p className="text-sm text-ink/60">Carregando...</p>;

  return (
    <div className="space-y-5 rounded-lg bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Frase de destaque</label>
        <textarea
          rows={2}
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Imagem de fundo</label>
        <ImageUploadField
          value={form.backgroundImage}
          onChange={(url) => setForm({ ...form, backgroundImage: url })}
        />
      </div>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
    </div>
  );
}
