interface StringListEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  rows?: number;
}

export default function StringListEditor({ label, items, onChange, rows = 3 }: StringListEditorProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-coffee">{label}</label>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              rows={rows}
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="w-full rounded-sm border border-coffee-light/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="shrink-0 self-start rounded-sm border border-red-300 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-3 rounded-sm border border-coffee/30 px-4 py-2 text-xs font-medium text-coffee hover:bg-coffee/5"
      >
        + Adicionar
      </button>
    </div>
  );
}
