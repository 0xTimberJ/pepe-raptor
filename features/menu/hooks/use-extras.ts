import { useState, useEffect, useCallback, useRef } from "react";
import { getExtras, type Extra } from "../api/extras";

export function useExtras() {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetchExtras = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExtras();
      if (isMounted.current) {
        setExtras(data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError("Erreur lors du chargement des extras");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchExtras();

    return () => {
      isMounted.current = false;
    };
  }, [fetchExtras]);

  return { extras, loading, error, refetch: fetchExtras };
}
