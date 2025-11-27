import { useEffect, useState } from "react";
import { getSauces, type Sauce } from "../api/sauce";

export function useSauces() {
  const [sauces, setSauces] = useState<Sauce[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSauces = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSauces();
      setSauces(data);
    } catch (err) {
      setError("Erreur lors du chargement des sauces");
      console.error(err);
      setSauces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSauces();
  }, []);

  return {
    sauces,
    loading,
    error,
    refetch: loadSauces,
  };
}
