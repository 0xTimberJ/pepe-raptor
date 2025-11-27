import { useEffect, useState } from "react";
import { getDrinks, type Drink } from "../api/drinks";

export function useDrinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDrinks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDrinks();
      setDrinks(data);
    } catch (err) {
      setError("Erreur lors du chargement des boissons");
      console.error(err);
      setDrinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrinks();
  }, []);

  return {
    drinks,
    loading,
    error,
    refetch: loadDrinks,
  };
}
