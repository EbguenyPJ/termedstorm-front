"use client";

import { useState } from "react";
import Cart from "../Cart";
import SearchBar from "../SearchBar";
import { UserWidget } from "./UserWidget/UserWidget";
import menuOpen from '@/utils/menu-navigation-open.svg';
import menuClose from '@/utils/menu-navigation-closed.svg';
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="relative bg-secondary text-base w-full md:w-10/12 md:fixed md:right-0 md:flex md:items-center md:justify-around md:h-16 md:px-2 md:rounded-none text-base1 rounded-lg">
            <div className="absolute p-2 rounded-lg mt-2 right-2 bg-secondary md:hidden">
                <button onClick={toggleMenu} className="text-2xl m-auto">
                    {isOpen ? (
                        <Image src={menuOpen} alt="menuOpen" className="w-8" />
                    ) : (
                        <Image src={menuClose} alt="menuClose" className="w-8" />
                    )}
                </button>
            </div>

            <div className={`${isOpen ? "flex" : "hidden"} flex-col-reverse gap-4 md:flex md:flex-row md:items-center md:justify-between md:mt-0 md:gap-0 w-full md:w-auto`}>
                
                    <SearchBar 
                    />

                <div className="flex flex-row-reverse w-1/2 justify-between mt-2 ml-2 md:flex-row">
                    <div className="my-auto">
                        <Cart />
                    </div>

                    <div className="flex my-auto md:ml-auto">
                        <UserWidget />
                    </div>
                </div>

            </div>
        </nav>
    );
};