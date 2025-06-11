"use client";

//import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "@/utils/cart.svg";

export default function Cart() {
    //const { items } = useCart();
    return (
        <div>
            <p className="bg-accent rounded-full text-center text-yellow-100 absolute w-4 z-10">{
            //items.length
            }1</p>
            <Link href="/cart" className="relative">
                <Image src={CartIcon} alt="cart-icon" className="w-8" />
            </Link>
        </div>
)
};