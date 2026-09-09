interface SaveBarProps {
  saving: boolean;
  saved: boolean;
  error?: string;
  onSave: () => void;
}

export default function SaveBar({ saving, saved, error, onSave }: SaveBarProps) {
  return (
    <div className="mt-6 flex items-center gap-4 border-t border-black/10 pt-5">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="rounded-sm bg-coffee px-8 py-3 text-sm font-semibold uppercase tracking-wide text-cream hover:bg-coffee/90 disabled:opacity-60"
      >
        {saving ? "Salvando..." : "Salvar alterações"}
      </button>
      {saved && <span className="text-sm text-green-700">Salvo com sucesso.</span>}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
