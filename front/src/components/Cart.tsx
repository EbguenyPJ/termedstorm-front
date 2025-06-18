"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { ShoppingCart } from 'lucide-react';
import { useState } from "react";

export default function Cart() {
  const { items } = useCart();
  return (
    <div>
      <p className="bg-accent rounded-full text-center text-yellow-100 absolute w-4 z-10">
        {
          items.length
        }
        1
      </p>
      <Link href="/cart" className="relative">
        <ShoppingCart className="text-base-100 " />
      </Link>
    </div>
  );
};

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();




{/* HAMBURGER ICON & BADGE CART */}
      <div className="md:hidden absolute right-4 top-5 z-20 flex items-center gap-4">
        <Link
          href={routes.cart}
          aria-label="Ir al carrito"
          className="relative"
        >
          <FaShoppingBag size={18} color="#fff" />
          {itemCount > 0 && (
            <span className="absolute top-[-6px] right-[-6px] bg-orange-500 text-white text-[10px] font-bold rounded-full px-1">
              {itemCount}
            </span>
          )}
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

  function useCart(): { itemCount: any; } {
    throw new Error("Function not implemented.");
  }