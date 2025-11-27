import { useEffect, useState } from "react";
import { getDesserts, type Dessert } from "../api/desserts";

export function useDesserts() {
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDesserts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDesserts();
      setDesserts(data);
    } catch (err) {
      setError("Erreur lors du chargement des desserts");
      console.error(err);
      setDesserts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDesserts();
  }, []);

  return {
    desserts,
    loading,
    error,
    refetch: loadDesserts,
  };
}
