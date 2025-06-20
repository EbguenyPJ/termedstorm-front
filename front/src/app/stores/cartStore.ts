import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock?: number; 
  //variante
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalAmount: () => number;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity:
                        i.quantity + item.quantity <= (i.stock ?? Infinity)
                          ? i.quantity + item.quantity
                          : i.quantity,
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      increaseItem: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity:
                    i.quantity + 1 <= (i.stock ?? Infinity)
                      ? i.quantity + 1
                      : i.quantity,
                }
              : i
          ),
        })),

      decreaseItem: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id && i.quantity > 1
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      totalAmount: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);