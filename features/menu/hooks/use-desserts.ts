import { useEffect, useState, useCallback, useRef } from "react";
import { getDesserts, type Dessert } from "../api/desserts";

export function useDesserts() {
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const loadDesserts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDesserts();
      if (isMounted.current) {
        setDesserts(data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError("Erreur lors du chargement des desserts");
        setDesserts([]);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    loadDesserts();

    return () => {
      isMounted.current = false;
    };
  }, [loadDesserts]);

  return {
    desserts,
    loading,
    error,
    refetch: loadDesserts,
  };
}
