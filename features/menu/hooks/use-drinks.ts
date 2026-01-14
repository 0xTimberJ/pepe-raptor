import { useEffect, useState, useCallback, useRef } from "react";
import { getDrinks, type Drink } from "../api/drinks";

export function useDrinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const loadDrinks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDrinks();
      if (isMounted.current) {
        setDrinks(data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError("Erreur lors du chargement des boissons");
        setDrinks([]);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    loadDrinks();

    return () => {
      isMounted.current = false;
    };
  }, [loadDrinks]);

  return {
    drinks,
    loading,
    error,
    refetch: loadDrinks,
  };
}
