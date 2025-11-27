import { useBurgers } from "./use-burgers";
import { useDesserts } from "./use-desserts";
import { useDrinks } from "./use-drinks";
import { useFrites } from "./use-frites";
import { useSauces } from "./use-sauce";
import { useSnacks } from "./use-snacks";

export function useMenu() {
  const burgers = useBurgers();
  const desserts = useDesserts();
  const drinks = useDrinks();
  const frites = useFrites();
  const sauces = useSauces();
  const snacks = useSnacks();

  const loading =
    burgers.loading ||
    desserts.loading ||
    drinks.loading ||
    frites.loading ||
    sauces.loading ||
    snacks.loading;
  const error =
    burgers.error ||
    desserts.error ||
    drinks.error ||
    frites.error ||
    sauces.error ||
    snacks.error;

  const refetch = () => {
    burgers.refetch();
    desserts.refetch();
    drinks.refetch();
    frites.refetch();
    sauces.refetch();
    snacks.refetch();
  };

  return {
    burgers: burgers.burgers,
    desserts: desserts.desserts,
    drinks: drinks.drinks,
    frites: frites.frites,
    sauces: sauces.sauces,
    snacks: snacks.snacks,
    loading,
    error,
    refetch,
  };
}
