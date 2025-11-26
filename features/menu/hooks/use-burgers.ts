import { useEffect, useState } from "react";
import { getBurgers, type Burger } from "../api/burgers";

export function useBurgers() {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBurgers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBurgers();
      setBurgers(data);
    } catch (err) {
      setError("Erreur lors du chargement des burgers");
      console.error(err);
      setBurgers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBurgers();
  }, []);

  return {
    burgers,
    loading,
    error,
    refetch: loadBurgers,
  };
}
