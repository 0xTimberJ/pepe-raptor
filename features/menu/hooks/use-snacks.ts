import { useEffect, useState } from "react";
import { getSnacks, type Snack } from "../api/snacks";

export function useSnacks() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSnacks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSnacks();
      setSnacks(data);
    } catch (err) {
      setError("Erreur lors du chargement des snacks");
      console.error(err);
      setSnacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSnacks();
  }, []);

  return {
    snacks,
    loading,
    error,
    refetch: loadSnacks,
  };
}
