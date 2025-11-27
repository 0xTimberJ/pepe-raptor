export interface MenuItem {
  id: string;
  name: string;
  price: number | null;
  description?: string;
  image?: string;
  created: string;
  updated: string;
}

export type MenuCategory =
  | "burgers"
  | "desserts"
  | "drinks"
  | "frites"
  | "sauce"
  | "snacks";

export interface MenuSection {
  id: MenuCategory;
  title: string;
  emoji: string;
  items: MenuItem[];
}
