import { useEffect, useState } from "react";
import { trpc } from "../lib/trpc";

export function useSiteContentForm<T>(key: string, defaultValue: T) {
  const { data, isLoading } = trpc.siteContent.get.useQuery({ key });
  const utils = trpc.useUtils();
  const [form, setForm] = useState<T>(defaultValue);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !loaded) {
      setForm((data as T | null) ?? defaultValue);
      setLoaded(true);
    }
  }, [data, isLoading, loaded, defaultValue]);

  const update = trpc.siteContent.update.useMutation({
    onSuccess: () => {
      utils.siteContent.get.invalidate({ key });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  function save() {
    update.mutate({ key, data: form as Record<string, unknown> });
  }

  return {
    form,
    setForm,
    save,
    saving: update.isPending,
    saved,
    error: update.error?.message,
    loading: isLoading && !loaded,
  };
}
