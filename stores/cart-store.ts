import { create } from "zustand";
import type { MenuItem } from "@/features/menu/types/menu-item";
import type { Extra } from "@/features/menu/api/extras";
import { useAuthStore } from "./auth-store";

export interface CartItem {
  id: string;
  product: MenuItem;
  extras: Extra[];
  quantity: number;
  unitPrice: number;
  isReward?: boolean;
  rewardPointsCost?: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: MenuItem, extras: Extra[], quantity: number) => void;
  addRewardItem: (name: string, category: string, pointsCost: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getPaidTotal: () => number;
  getItemCount: () => number;
  hasOnlyRewards: () => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product, extras, quantity) => {
    const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = (product.price ?? 0) + extrasTotal;

    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      extras,
      quantity,
      unitPrice,
      isReward: false,
    };

    set((state) => ({ items: [...state.items, newItem] }));
  },

  addRewardItem: (name, category, pointsCost) => {
    const rewardItem: CartItem = {
      id: `reward-${Date.now()}`,
      product: {
        id: `reward-${Date.now()}`,
        name: `🎁 ${name}`,
        price: 0,
        description: `${category} offert(e) avec vos points fidélité`,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
      extras: [],
      quantity: 1,
      unitPrice: 0,
      isReward: true,
      rewardPointsCost: pointsCost,
    };

    set((state) => ({ items: [...state.items, rewardItem] }));
  },

  removeItem: (id) => {
    const item = get().items.find((i) => i.id === id);

    if (item?.isReward && item.rewardPointsCost) {
      const { addPoints } = useAuthStore.getState();
      addPoints(item.rewardPointsCost);
    }

    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
  },

  getPaidTotal: () => {
    return get()
      .items.filter((item) => !item.isReward)
      .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  hasOnlyRewards: () => {
    const items = get().items;
    return items.length > 0 && items.every((item) => item.isReward);
  },
}));
