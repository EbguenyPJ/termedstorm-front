'use client';

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MapPin,
  PanelRight,
  Box,
  List,
  SquarePlus,
  ChartColumnIncreasing,
  CircleHelp,
  Sliders,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import logo from "@/../public/logoNivo.jpeg";
import { forwardRef, useState } from "react";
import { usePathname } from "next/navigation";

interface SideBarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const menuItems = [
  { href: "/categories", icon: List, label: "Categorías" },
  { href: "/products", icon: Box, label: "Productos" },
  { href: "/sales", icon: SquarePlus, label: "Nueva Venta" },
  { href: "/reports", icon: ChartColumnIncreasing, label: "Reportes" },
  { href: "/help", icon: CircleHelp, label: "Soporte / Ayuda" },
];

const SideBar = forwardRef<HTMLDivElement, SideBarProps>(
  ({ isCollapsed, toggleCollapse }, ref) => {
    const pathname = usePathname();
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    return (
      <aside
        ref={ref}
        className={`fixed top-0 left-0 z-40 h-screen bg-primary text-base-100 shadow-md flex flex-col transition-all duration-300 ${isCollapsed ? "w-10 sm:w-20" : "w-64"}`}
        aria-label="Sidebar"
      >
        {/* HEADER */}
        <div className={`flex items-center justify-between h-16 border-b border-base1${isCollapsed ? "gap-1 p-0.5" : "gap-2 p-2"}`}>
          <div className={`flex items-center`}>
            <Image src={logo} alt="logo" className={`${isCollapsed ? "h-6 w-6 rounded-md" : "h-8 w-8 rounded-lg mr-4"}`} />
            {!isCollapsed && (
              <span className="font-bold text-xl text-base-100">POINTSALE</span>
            )}
          </div>

          <button
            onClick={toggleCollapse}
            className="rounded hover:bg-base3 transition"
          >
            <PanelRight className={`text-base-100 ${isCollapsed ? "h-4 w-4" : "h-5 w-5"}`} />
          </button>
        </div>

        {/* COMPANY INFO */}
          <div className={`py-3 border-b border-base1 ${isCollapsed ? "mx-auto" : "px-4"}`}>
            <div className={`bg-black rounded-lg ${isCollapsed ? "h-6 w-6 rounded-md" : "w-16 h-16 rounded-lg"}`}></div>
        {!isCollapsed && (
            <div className="flex flex-col gap-2 text-sm">
              <h2 className="font-semibold text-base-100">POINTSALE</h2>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-base-100" />
                <span className="text-base-100">Calle Falsa 1234</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-base-100" />
                <span className="text-base-100">+54 11 5470 1111</span>
              </div>
            </div>
        )}
          </div>

        {/* MENU */}
        <nav className={`flex-1 overflow-y-auto py-4 ${isCollapsed ? "gap-1 p-0.5" : "gap-2 p-2"}`}>
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                className={`flex items-center p-2 w-full rounded-lg hover:bg-base3 transition group text-base-100 ${isCollapsed ? "justify-center" : ""}`}
              >
                <Sliders className={`text-base-100 group-hover:text-white ${isCollapsed ? "h-5 w-5" : "h-6 w-6"}`} />
                {!isCollapsed && (
                  <>
                    <span className="ms-3 flex-1 text-left">Editar Listas</span>
                    {isSubmenuOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </>
                )}
              </button>
              {!isCollapsed && isSubmenuOpen && (
                <ul className="ml-10 mt-2 space-y-1 text-sm">
                  <li>
                    <Link
                      href="/dashboard/categories"
                      className={`block px-2 py-1 rounded hover:bg-base3 ${
                        pathname === "/dashboard/categories" ? "font-bold" : ""
                      }`}
                    >
                      Categorías
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/subcategories"
                      className={`block px-2 py-1 rounded hover:bg-base3 ${
                        pathname === "/dashboard/subcategories" ? "font-bold bg-base3" : ""
                      }`}
                    >
                      Subcategorías
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/products"
                      className={`block px-2 py-1 rounded hover:bg-base3 ${
                        pathname === "/dashboard/products" ? "font-bold bg-base3" : ""
                      }`}
                    >
                      Productos
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg hover:bg-base3 transition group text-base-100 ${
                    isCollapsed ? "justify-center p-0.5" : "p-2"
                  }`}
                >
                  <item.icon className={`text-base-100 group-hover:text-white${isCollapsed ? "h-5 w-5" : "h-6 w-6"}`} />
                  {!isCollapsed && (
                    <span className="ms-3 whitespace-nowrap overflow-hidden">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  }
);

SideBar.displayName = "SideBar";
export default SideBar;