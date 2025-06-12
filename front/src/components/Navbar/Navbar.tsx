"use client";

import Cart from "../Cart";
import SearchBar from "../SearchBar";
import { UserWidget } from "./UserWidget/UserWidget";
import menuOpen from "@/utils/menu-navigation-open.svg";
import menuClose from "@/utils/menu-navigation-closed.svg";
import Image from "next/image";

type NavbarProps = {
    isOpen: boolean;
    toggleMenu: () => void;
};

export default function Navbar({ isOpen, toggleMenu }: NavbarProps) {
    return (
        <>
        <div className="fixed top-2 right-2 z-50 md:hidden">
            <button onClick={toggleMenu} className="bg-primary p-2 rounded-lg">
            {isOpen ? (
                <Image src={menuOpen} alt="menuOpen" className="w-8" />
            ) : (
                <Image src={menuClose} alt="menuClose" className="w-8" />
            )}
            </button>
        </div>

        <nav
            className={`fixed top-0 right-0 h-full w-3/4 sm:w-2/4 md:static md:h-16 md:w-full md:flex md:items-center md:justify-around md:rounded-none z-40 bg-secondary text-base shadow-md transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0`}
        >
            <div className="flex flex-col-reverse gap-4 md:flex md:flex-row md:items-center md:justify-between md:mt-0 w-full p-4 md:gap-">
                <SearchBar />

                <div className="flex flex-row-reverse w-full md:w-auto md:justify-between mt-2 md:mt-0 md:ml-2 md:flex-row md:gap-28">
                    <div className="my-auto">
                    <Cart />
                    </div>

                    <div className="flex my-auto md:ml-auto">
                    <UserWidget />
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
};