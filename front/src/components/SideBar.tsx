"use client";

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
} from "lucide-react";
import logo from "@/../public/logoNivo.jpeg";
import { forwardRef } from "react";

interface SideBarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const SideBar = forwardRef<HTMLDivElement, SideBarProps>(
  ({ isCollapsed, toggleCollapse }, ref) => {
    return (
      <aside
        ref={ref}
        className={`fixed top-0 left-0 z-40 h-screen bg-primary text-base1 shadow-md flex flex-col 
        ${isCollapsed ? "w-20" : "w-64"} overflow-y-auto`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between h-16 p-2 border-b-2 border-base1">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="logo"
              className={`h-8 w-8 rounded-lg transition-all duration-300 ${
                isCollapsed ? "mx-auto" : ""
              }`}
            />
            {!isCollapsed && (
              <h1 className="font-black text-xl ml-2">POINTSALE</h1>
            )}
          </div>

          <button
            onClick={toggleCollapse}
            className="p-1 rounded-md hover:bg-base3"
          >
            <PanelRight className="h-5 w-5" />
          </button>
        </div>

        {!isCollapsed && (
          <div className="p-3 border-b-2 border-base1 flex flex-col gap-3">
            <div className="w-16 h-16 bg-black">Logo Empresa</div>
            <h1 className="font-black text-xl text-base1">POINTSALE</h1>
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              <h2 className="text-base1">Calle Falsa 1234</h2>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6" />
              <h2 className="text-base1">+54 11 5470 1111</h2>
            </div>
          </div>
        )}

        <ul className="space-y-2 font-medium p-3">
          {[
            { href: "/", icon: List, label: "CATEGORIAS" },
            { href: "/products", icon: Box, label: "PRODUCTOS" },
            { href: "/sales", icon: SquarePlus, label: "NUEVA VENTA" },
            { href: "/reports", icon: ChartColumnIncreasing, label: "REPORTES" },
            { href: "/help", icon: CircleHelp, label: "SOPORTE/AYUDA" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center p-2 text-base1 rounded-lg hover:bg-base3 group ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <item.icon className="h-7 w-7" />
                {!isCollapsed && (
                  <span className="ms-3 whitespace-nowrap overflow-hidden">
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
);

SideBar.displayName = "SideBar";
export default SideBar;