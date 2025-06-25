"use client";

import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import axios from "axios";
import { getTotalAmount } from "@/lib/getTotalAmount";
import {ButtonSecondary} from "./UI/Buttons/Buttons";
// import { useRouter } from "next/navigation";

export const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartStore((state) => state.items);
  const total = getTotalAmount(items);

  //   const router = useRouter();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  // BOTON PARA REALIZAR LA COMPRA DEL PRODUCTO CON STRIPE
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("/api/checkout", { items });

      if (data.url) {
        window.location.href = data.url; //session.url
      }
    } catch (err) {
      console.error("Error al redirigir a Stripe:", err);
    }
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-white mx-4 p-2 rounded-lg hover:bg-[#6e5cc4] transition-colors cursor-pointer"
      >
        <ShoppingCart className="w-6 h-6 m-1" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-4 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 text-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Carrito</h3>
            <span className="text-xs text-gray-400">{totalItems} ítems</span>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500">Tu carrito está vacío.</p>
          ) : (
            <>
              <ul className="max-h-60 overflow-y-auto divide-y">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="py-3 flex justify-between items-start"
                  >
                    <div className="flex flex-col w-3/4">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-gray-500">
                        x{item.quantity} · ${item.price.toFixed(2)} c/u
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => decreaseItem(item.id)}
                          className="px-2 py-1 border rounded text-xs"
                        >
                          <Minus size={14} />
                        </button>
                        <button
                          onClick={() => increaseItem(item.id)}
                          className="px-2 py-1 border rounded text-xs"
                          disabled={
                            item.stock !== undefined &&
                            item.quantity >= item.stock
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold whitespace-nowrap">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <ButtonSecondary
                  onClick={handleCheckout}
                  className="mt-3 w-full bg-primary text-white py-2 rounded hover:bg-primary-600 text-sm"
                textContent="Finalizar compra"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
