import { useState, useEffect, useCallback } from "react";
import { getExtras, type Extra } from "../api/extras";

export function useExtras() {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExtras = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExtras();
      setExtras(data);
    } catch (err) {
      setError("Erreur lors du chargement des extras");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExtras();
  }, [fetchExtras]);

  return { extras, loading, error, refetch: fetchExtras };
}
