import { useEffect, useState, useCallback, useRef } from "react";
import { getFrites, type Frite } from "../api/frites";

export function useFrites() {
  const [frites, setFrites] = useState<Frite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const loadFrites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFrites();
      if (isMounted.current) {
        setFrites(data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError("Erreur lors du chargement des frites");
        setFrites([]);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    loadFrites();

    return () => {
      isMounted.current = false;
    };
  }, [loadFrites]);

  return {
    frites,
    loading,
    error,
    refetch: loadFrites,
  };
}
