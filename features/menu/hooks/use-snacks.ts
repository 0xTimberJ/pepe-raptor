import { useEffect, useState, useCallback, useRef } from "react";
import { getSnacks, type Snack } from "../api/snacks";

export function useSnacks() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const loadSnacks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSnacks();
      if (isMounted.current) {
        setSnacks(data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError("Erreur lors du chargement des snacks");
        setSnacks([]);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    loadSnacks();

    return () => {
      isMounted.current = false;
    };
  }, [loadSnacks]);

  return {
    snacks,
    loading,
    error,
    refetch: loadSnacks,
  };
}
