export const IMAGES = {
  burgers: [
    require("@/assets/images/burgers/alley-oop.webp"),
    require("@/assets/images/burgers/bacon-compton.webp"),
    require("@/assets/images/burgers/dr-jack.jpeg"),
  ],
  desserts: [
    require("@/assets/images/desserts/fondant-chocolat.jpeg"),
    require("@/assets/images/desserts/tiramisu.jpeg"),
  ],
  frites: [require("@/assets/images/fries/fries.jpeg")],
  drinks: [
    require("@/assets/images/drinks/coca-cola.jpeg"),
    require("@/assets/images/drinks/coca-zero.jpeg"),
    require("@/assets/images/drinks/cristaline-petillante.jpeg"),
  ],
};

export interface RewardTier {
  points: number;
  title: string;
  emoji: string;
  images: any[];
}

export const REWARDS: RewardTier[] = [
  {
    points: 25,
    title: "Boissons",
    emoji: "🥤",
    images: IMAGES.drinks,
  },
  {
    points: 45,
    title: "Frites & Desserts",
    emoji: "🍟",
    images: [...IMAGES.frites, ...IMAGES.desserts],
  },
  {
    points: 75,
    title: "Burgers",
    emoji: "🍔",
    images: IMAGES.burgers,
  },
];

export interface RewardItem {
  id: string;
  name: string;
  image: any;
  category: string;
}

export const REWARD_ITEMS: Record<string, RewardItem[]> = {
  "25": [
    {
      id: "drink-1",
      name: "Coca-Cola",
      image: require("@/assets/images/drinks/coca-cola.jpeg"),
      category: "Boisson",
    },
    {
      id: "drink-2",
      name: "Coca-Cola Zero",
      image: require("@/assets/images/drinks/coca-zero.jpeg"),
      category: "Boisson",
    },
    {
      id: "drink-3",
      name: "Cristaline Pétillante",
      image: require("@/assets/images/drinks/cristaline-petillante.jpeg"),
      category: "Boisson",
    },
  ],
  "45": [
    {
      id: "fries-1",
      name: "Frites Maison",
      image: require("@/assets/images/fries/fries.jpeg"),
      category: "Accompagnement",
    },
    {
      id: "dessert-1",
      name: "Fondant Chocolat",
      image: require("@/assets/images/desserts/fondant-chocolat.jpeg"),
      category: "Dessert",
    },
    {
      id: "dessert-2",
      name: "Tiramisu",
      image: require("@/assets/images/desserts/tiramisu.jpeg"),
      category: "Dessert",
    },
  ],
  "75": [
    {
      id: "burger-1",
      name: "Alley-Oop",
      image: require("@/assets/images/burgers/alley-oop.webp"),
      category: "Burger",
    },
    {
      id: "burger-2",
      name: "Bacon Compton",
      image: require("@/assets/images/burgers/bacon-compton.webp"),
      category: "Burger",
    },
    {
      id: "burger-3",
      name: "Dr. Jack",
      image: require("@/assets/images/burgers/dr-jack.jpeg"),
      category: "Burger",
    },
  ],
};

export const TIER_INFO: Record<string, { title: string; emoji: string }> = {
  "25": { title: "Boissons", emoji: "🥤" },
  "45": { title: "Frites & Desserts", emoji: "🍟" },
  "75": { title: "Burgers", emoji: "🍔" },
};
