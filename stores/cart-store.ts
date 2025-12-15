import { create } from "zustand";
import type { MenuItem } from "@/features/menu/types/menu-item";
import type { Extra } from "@/features/menu/api/extras";

export interface CartItem {
  id: string;
  product: MenuItem;
  extras: Extra[];
  quantity: number;
  unitPrice: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: MenuItem, extras: Extra[], quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
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
    };

    set((state) => ({ items: [...state.items, newItem] }));
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
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

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
