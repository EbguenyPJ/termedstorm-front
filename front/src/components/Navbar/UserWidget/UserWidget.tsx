"use client";

import { useState } from "react";
import { useAuthStore } from "../../../stores/authStore";
import { useRouter } from "next/navigation";
import { routes } from "@/app/routes";
import { ChevronDown, LogOut, User, LifeBuoy } from "lucide-react";

export const UserWidget = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push(routes.public.login);
  };

  if (!user) return null;
 
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white"
      >
        <div className="flex flex-col items-start gap-1 leading-tight">
          <span className="font-semibold">{user.name}</span>
          <span className="text-gray-300">{user.roles}</span>
        </div>
        <div className="p-1 rounded-lg hover:bg-[#6e5cc4]">
          <ChevronDown size={20} className="cursor-pointer" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => router.push(routes.user.profile)}
                className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-[#0d0d0d] cursor-pointer flex items-center gap-2"
              >
                <User size={16} />
                Mi perfil
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push(routes.user.support)}
                className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-[#0d0d0d] cursor-pointer flex items-center gap-2"
              >
                <LifeBuoy size={16} />
                Soporte
              </button>
            </li>
            <li className="border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-[#0d0d0d] cursor-pointer flex items-center gap-2"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
