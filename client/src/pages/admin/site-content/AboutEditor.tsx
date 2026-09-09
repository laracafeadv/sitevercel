import { useSiteContentForm } from "../../../hooks/useSiteContentForm";
import { DEFAULT_ABOUT, type AboutContent } from "../../../components/About";
import ImageUploadField from "../../../components/admin/ImageUploadField";
import SaveBar from "./SaveBar";
import StringListEditor from "./StringListEditor";
import TitleTextListEditor from "./TitleTextListEditor";

export default function AboutEditor() {
  const { form, setForm, save, saving, saved, error, loading } = useSiteContentForm<AboutContent>(
    "about",
    DEFAULT_ABOUT
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
        <label className="mb-1.5 block text-sm font-medium text-coffee">Foto</label>
        <ImageUploadField value={form.photo} onChange={(url) => setForm({ ...form, photo: url })} />
      </div>

      <StringListEditor
        label="Parágrafos da biografia"
        items={form.bioParagraphs}
        onChange={(bioParagraphs) => setForm({ ...form, bioParagraphs })}
        rows={3}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">
          Título da seção "cuidado por trás de cada decisão"
        </label>
        <input
          value={form.sectionHeading}
          onChange={(e) => setForm({ ...form, sectionHeading: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-coffee">Texto dessa seção</label>
        <textarea
          rows={2}
          value={form.sectionText}
          onChange={(e) => setForm({ ...form, sectionText: e.target.value })}
          className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
        />
      </div>

      <TitleTextListEditor
        label="Pilares"
        items={form.pillars}
        onChange={(pillars) => setForm({ ...form, pillars })}
        emptyItem={{ title: "", text: "" }}
      />

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
    </div>
  );
}
