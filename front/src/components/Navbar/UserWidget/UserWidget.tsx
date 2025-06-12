"use client";

import Link from 'next/link';
//import { useAuth } from '@/contexts/AuthContext';
//import { useCart } from '@/contexts/CartContext';

export const UserWidget = () => {
    //const { user, logout } = useAuth();

    //const { emptyCart } = useCart()
    return (
        // user ? (
        //     <div className="flex flex-col my-auto">
        //         <button onClick={() => {
        //             logout();
        //             emptyCart();
        //         }} className='bg-accent rounded-full text-base-100 px-2 text-center'>
        //             LOG OUT
        //         </button>
        //     </div>
        // ) : 
        (
            <div className='flex flex-col my-auto gap-2'>
                <Link href={"/login"} className='bg-cyan-600 rounded-full text-base-100 text-center'>LOG IN</Link>
                <Link href={"/register"} className='bg-teal-700 rounded-full text-base-100 text-center px-2'>SIGN IN</Link>
            </div>
        )
    )
};