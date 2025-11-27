import { useEffect, useState } from "react";
import { getFrites, type Frite } from "../api/frites";

export function useFrites() {
  const [frites, setFrites] = useState<Frite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFrites = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFrites();
      setFrites(data);
    } catch (err) {
      setError("Erreur lors du chargement des frites");
      console.error(err);
      setFrites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFrites();
  }, []);

  return {
    frites,
    loading,
    error,
    refetch: loadFrites,
  };
}
