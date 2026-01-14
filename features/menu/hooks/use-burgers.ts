import { useEffect, useState, useCallback, useRef } from "react";
import { getBurgers, type Burger } from "../api/burgers";

export function useBurgers() {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const loadBurgers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBurgers();
      if (isMounted.current) {
        setBurgers(data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError("Erreur lors du chargement des burgers");
        setBurgers([]);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    loadBurgers();

    return () => {
      isMounted.current = false;
    };
  }, [loadBurgers]);

  return {
    burgers,
    loading,
    error,
    refetch: loadBurgers,
  };
}
