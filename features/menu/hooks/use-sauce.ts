import { useEffect, useState, useCallback, useRef } from "react";
import { getSauces, type Sauce } from "../api/sauce";

export function useSauces() {
  const [sauces, setSauces] = useState<Sauce[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const loadSauces = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSauces();
      if (isMounted.current) {
        setSauces(data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError("Erreur lors du chargement des sauces");
        setSauces([]);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    loadSauces();

    return () => {
      isMounted.current = false;
    };
  }, [loadSauces]);

  return {
    sauces,
    loading,
    error,
    refetch: loadSauces,
  };
}
