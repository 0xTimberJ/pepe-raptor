import { useCartStore } from "../stores/cart-store";
import type { MenuItem } from "../features/menu/types/menu-item";
import type { Extra } from "../features/menu/api/extras";

// Mock product data
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

// Reset store before each test
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
      expect(updatedItems[0].unitPrice).toBe(11.5); // 10 + 1.5
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
      expect(total).toBe(20.0); // 10 * 2
    });

    it("should calculate total for multiple items with extras", () => {
      const { addItem } = useCartStore.getState();
      addItem(mockProduct, [], 2); // 10 * 2 = 20
      addItem(mockProduct, [mockExtra], 1); // 11.5 * 1 = 11.5

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
});
