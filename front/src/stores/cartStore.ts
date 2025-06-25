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
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.id === item.id) {
                // Si encontramos el item, creamos una versión actualizada
                return {
                  ...i,
                  price: Number(i.price), // ⬅️ Re-aseguramos que el precio sea número
                  quantity:
                    i.quantity + item.quantity <= (i.stock ?? Infinity)
                      ? i.quantity + item.quantity
                      : i.quantity,
                };
              }
              return i; // Devolvemos los otros items sin cambios
            })
            // Pequeño truco para añadir el item si no existía
            .concat(
              !state.items.some((i) => i.id === item.id)
                ? [{ ...item, price: Number(item.price) }] // Lo añadimos con el precio ya convertido
                : []
            ),
        })),

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
    }),
    { name: "cart-storage" }
  )
);
