"use client";

import { CartDropdown } from "../CartDropdown";
import { Bell } from "../UI/Bell";
import { UserWidget } from "./UserWidget/UserWidget";
import SearchBar from "../SearchBar";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

type NavbarProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

export default function Navbar({ isOpen, toggleMenu }: NavbarProps) {
  const isEmployee = useAuthStore((s) => s.isEmployee());

  return (
    <>
      <div className="fixed top-2 right-2 z-50 md:hidden">
        <button
          onClick={toggleMenu}
          className="bg-primary p-2 rounded-lg cursor-pointer hover:bg-secondary transition-colors"
        >
          {isOpen ? (
            <X className="w-8 text-base-100" />
          ) : (
            <Menu className="w-8 text-base-100" />
          )}
        </button>
      </div>

      <nav
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-2/4 md:static md:h-16 md:w-full md:flex md:items-center md:justify-between z-[999] bg-secondary text-base shadow-md transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between w-full px-4 py-4 md:px-8 md:py-0">
          {/* Búsqueda */}
          <div className="w-full md:w-1/2">{isEmployee && <SearchBar />}</div>

          {/* Íconos */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {isEmployee && (
              <>
                <Bell />
                <CartDropdown />
              </>
            )}
            <UserWidget />
          </div>
        </div>
      </nav>
    </>
  );
};