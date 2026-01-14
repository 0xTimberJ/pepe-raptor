jest.mock("../stores/auth-store", () => ({
  useAuthStore: {
    getState: () => ({
      addPoints: jest.fn(),
    }),
  },
}));

import { useCartStore } from "../stores/cart-store";
import type { MenuItem } from "../features/menu/types/menu-item";
import type { Extra } from "../features/menu/api/extras";

const mockProduct: MenuItem = {
  id: "burger-1",
  name: "Classic Burger",
  description: "A delicious burger",
  price: 10.0,
  image: "burger.jpg",
  created: "2024-01-01T00:00:00.000Z",
  updated: "2024-01-01T00:00:00.000Z",
};

const mockExtra: Extra = {
  id: "extra-1",
  name: "Extra Cheese",
  price: 1.5,
  created: "2024-01-01T00:00:00.000Z",
  updated: "2024-01-01T00:00:00.000Z",
};

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe("Cart Store", () => {
  describe("addItem", () => {
    it("should add a product to the cart", () => {
      const { addItem } = useCartStore.getState();

      addItem(mockProduct, [], 1);

      const updatedItems = useCartStore.getState().items;
      expect(updatedItems).toHaveLength(1);
      expect(updatedItems[0].product.name).toBe("Classic Burger");
      expect(updatedItems[0].quantity).toBe(1);
    });

    it("should calculate unit price with extras", () => {
      const { addItem } = useCartStore.getState();

      addItem(mockProduct, [mockExtra], 1);

      const updatedItems = useCartStore.getState().items;
      expect(updatedItems[0].unitPrice).toBe(11.5);
    });
  });

  describe("removeItem", () => {
    it("should remove a product from the cart", () => {
      const { addItem } = useCartStore.getState();
      addItem(mockProduct, [], 1);

      const itemId = useCartStore.getState().items[0].id;
      useCartStore.getState().removeItem(itemId);

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe("updateQuantity", () => {
    it("should update the quantity of an item", () => {
      const { addItem } = useCartStore.getState();
      addItem(mockProduct, [], 1);

      const itemId = useCartStore.getState().items[0].id;
      useCartStore.getState().updateQuantity(itemId, 5);

      expect(useCartStore.getState().items[0].quantity).toBe(5);
    });

    it("should remove item when quantity is set to 0", () => {
      const { addItem } = useCartStore.getState();
      addItem(mockProduct, [], 1);

      const itemId = useCartStore.getState().items[0].id;
      useCartStore.getState().updateQuantity(itemId, 0);

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe("getTotal", () => {
    it("should calculate total for single item", () => {
      const { addItem } = useCartStore.getState();
      addItem(mockProduct, [], 2);

      const total = useCartStore.getState().getTotal();
      expect(total).toBe(20.0);
    });

    it("should calculate total for multiple items with extras", () => {
      const { addItem } = useCartStore.getState();
      addItem(mockProduct, [], 2);
      addItem(mockProduct, [mockExtra], 1);

      const total = useCartStore.getState().getTotal();
      expect(total).toBe(31.5);
    });

    it("should return 0 for empty cart", () => {
      const total = useCartStore.getState().getTotal();
      expect(total).toBe(0);
    });
  });

  describe("getItemCount", () => {
    it("should return total item count", () => {
      const { addItem } = useCartStore.getState();
      addItem(mockProduct, [], 3);
      addItem(mockProduct, [], 2);

      const count = useCartStore.getState().getItemCount();
      expect(count).toBe(5);
    });
  });

  describe("clearCart", () => {
    it("should clear all items from cart", () => {
      const { addItem, clearCart } = useCartStore.getState();
      addItem(mockProduct, [], 1);
      addItem(mockProduct, [], 2);

      clearCart();

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe("addRewardItem", () => {
    it("should add a reward item with isReward flag", () => {
      const { addRewardItem } = useCartStore.getState();

      addRewardItem("Coca-Cola", "Boisson", 25);

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].isReward).toBe(true);
      expect(items[0].unitPrice).toBe(0);
      expect(items[0].rewardPointsCost).toBe(25);
    });
  });

  describe("getPaidTotal", () => {
    it("should exclude reward items from total", () => {
      const { addItem, addRewardItem } = useCartStore.getState();

      addItem(mockProduct, [], 1);
      addRewardItem("Coca-Cola", "Boisson", 25);

      const paidTotal = useCartStore.getState().getPaidTotal();
      expect(paidTotal).toBe(10.0);
    });
  });

  describe("hasOnlyRewards", () => {
    it("should return true if cart has only rewards", () => {
      const { addRewardItem } = useCartStore.getState();

      addRewardItem("Coca-Cola", "Boisson", 25);

      expect(useCartStore.getState().hasOnlyRewards()).toBe(true);
    });

    it("should return false if cart has paid items", () => {
      const { addItem, addRewardItem } = useCartStore.getState();

      addRewardItem("Coca-Cola", "Boisson", 25);
      addItem(mockProduct, [], 1);

      expect(useCartStore.getState().hasOnlyRewards()).toBe(false);
    });
  });
});
