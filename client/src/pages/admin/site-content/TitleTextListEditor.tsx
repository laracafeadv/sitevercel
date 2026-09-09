interface TitleTextItem {
  title: string;
  text: string;
}

interface TitleTextListEditorProps<T extends TitleTextItem> {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  emptyItem: T;
}

export default function TitleTextListEditor<T extends TitleTextItem>({
  label,
  items,
  onChange,
  emptyItem,
}: TitleTextListEditorProps<T>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-coffee">{label}</label>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-sm border border-coffee-light/30 p-4">
            <div className="flex items-start justify-between gap-3">
              <input
                value={item.title}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], title: e.target.value };
                  onChange(next);
                }}
                placeholder="Título"
                className="w-full rounded-sm border border-coffee-light/30 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coffee/30"
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                className="shrink-0 rounded-sm border border-red-300 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
              >
                Remover
              </button>
            </div>
            <textarea
              rows={2}
              value={item.text}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...next[i], text: e.target.value };
                onChange(next);
              }}
              placeholder="Texto"
              className="mt-2 w-full rounded-sm border border-coffee-light/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, emptyItem])}
        className="mt-3 rounded-sm border border-coffee/30 px-4 py-2 text-xs font-medium text-coffee hover:bg-coffee/5"
      >
        + Adicionar
      </button>
    </div>
  );
}
