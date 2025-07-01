"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MapPin,
  PanelRight,
  Store,
  ChartColumnIncreasing,
  Sliders,
  Wallet,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import logo from "@/../public/logoNivo.jpeg";
import { forwardRef, useState } from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/app/routes";
import { useAuthStore } from "@/stores/authStore";
import {
  isAdmin,
  isSuperAdmin,
  isCashier,
  isClient,
} from "@/app/helpers/authHelper";
import { Inbox } from "./UI/Inbox";
import { useCompany } from "@/hooks/useCompany";

interface SideBarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const SideBar = forwardRef<HTMLDivElement, SideBarProps>(
  ({ isCollapsed, toggleCollapse }, ref) => {
    const { company, loading } = useCompany();

    const pathname = usePathname();
    const [isSubmenuOpen, setIsSubmenuOpen] = useState<
      "edit" | "settings" | "cashier" | null
    >(null);
    const user = useAuthStore((s) => s.user);
    const isInitialized = useAuthStore((s) => s.isInitialized);

    if (!isInitialized) return null;
    if (!user || isClient(user)) return null;

    const isAdminUser = isAdmin(user) || isSuperAdmin(user);
    const isCashierUser = isCashier(user);

    const isEditingActive =
      pathname === routes.manager.add.category ||
      pathname === routes.manager.add.subcategory ||
      pathname === routes.manager.add.product;

    const menuItems = [];

    if (loading) return null;

    if (isCashierUser || isAdminUser) {
      menuItems.push({
        href: routes.shop.categories,
        icon: Store,
        label: "Tienda",
      });
    }

    return (
      <aside
        ref={ref}
        className={`fixed top-0 left-0 z-40 h-screen bg-primary text-base-100 shadow-md flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-10 sm:w-20" : "w-64"
        }`}
        aria-label="Sidebar"
      >
        {/* HEADER */}
        <div
          className={`flex items-center justify-between h-16 border-b border-base-100 px-2`}
        >
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="logo"
              className={`h-6 w-6 sm:h-8 sm:w-8 rounded-md sm:rounded-lg`}
            />
            {!isCollapsed && (
              <span className="font-bold text-xl text-base-100">NIVO</span>
            )}
          </div>

          <button
            onClick={toggleCollapse}
            className="rounded hover:bg-[#4e4090] p-1 transition cursor-pointer"
          >
            <PanelRight
              className={`text-base-100 ${isCollapsed ? "h-5 w-5" : "h-6 w-6"}`}
            />
          </button>
        </div>

        {/* COMPANY INFO */}
        <div className={`py-3 border-b  ${isCollapsed ? "mx-auto" : "px-4"}`}>
          {!isCollapsed && company && (
            <div className="flex flex-col gap-2 text-sm">
              <h2 className="text-lg font-semibold text-base-100 mt-2">
                {company.name}
              </h2>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-base-100" />
                <span className="text-base-100">{company.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-base-100" />
                <span className="text-base-100">{company.phone_number}</span>
              </div>
            </div>
          )}
        </div>

        {/* MENU */}
        <nav
          className={`flex-1 overflow-y-auto py-4 ${
            isCollapsed ? "gap-1 p-0.5" : "gap-2 p-2"
          }`}
        >
          <ul className="space-y-2 font-medium">
            {/* MENSAJERIA */}
            {(isAdminUser || isCashierUser) && (
              <li>
                <Link
                  href={routes.user.chat}
                  className={`flex items-center rounded-lg hover:bg-[#4e4090] transition group text-base-100 ${
                    isCollapsed ? "justify-center p-0.5" : "p-2"
                  } ${
                    pathname === routes.user.chat
                      ? "bg-[#4e4090] font-bold"
                      : ""
                  }`}
                >
                  <Inbox />
                  {!isCollapsed && (
                    <span className="ms-3 whitespace-nowrap overflow-hidden">
                      Mensajería
                    </span>
                  )}
                </Link>
              </li>
            )}

            {/* MENÚ GENERAL */}
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg hover:bg-[#4e4090] transition group text-base-100 ${
                    isCollapsed ? "justify-center p-0.5" : "p-2"
                  } ${pathname === item.href ? "bg-[#4e4090] font-bold" : ""}`}
                >
                  <item.icon
                    className={`text-base-100 group-hover:text-white ${
                      isCollapsed ? "h-5 w-5" : "h-6 w-6"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ms-3 whitespace-nowrap overflow-hidden">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}

            {/* CASHIER */}
            {isCashierUser && (
              <li>
                <Link
                  href={routes.user.reportsemployee}
                  className={`flex items-center rounded-lg hover:bg-[#4e4090] transition group text-base-100 ${
                    isCollapsed ? "justify-center p-0.5" : "p-2"
                  } ${
                    pathname === routes.user.reportsemployee
                      ? "bg-[#4e4090] font-bold"
                      : ""
                  }`}
                >
                  <ChartColumnIncreasing
                    className={`text-base-100 group-hover:text-white ${
                      isCollapsed ? "h-5 w-5" : "h-6 w-6"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ms-3 whitespace-nowrap overflow-hidden">
                      Mis Ventas
                    </span>
                  )}
                </Link>
              </li>
            )}

            {/* EDITAR LISTAS */}
            {isAdminUser && (
              <li>
                <button
                  onClick={() =>
                    setIsSubmenuOpen((prev) =>
                      prev === "edit" ? null : "edit"
                    )
                  }
                  className={`group flex items-center p-2 w-full text-base-100 rounded-lg transition-colors cursor-pointer
                  ${isCollapsed ? "justify-center" : ""}
                  ${isEditingActive ? "bg-[#4e4090]" : "hover:bg-[#4e4090]"}`}
                >
                  <Sliders
                    className={`text-base-100 group-hover:text-white ${
                      isCollapsed ? "h-5 w-5" : "h-6 w-6"
                    }`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="ms-3 flex-1 text-left">
                        Editar Listas
                      </span>
                      {isSubmenuOpen === "edit" ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </>
                  )}
                </button>
                {!isCollapsed && isSubmenuOpen === "edit" && (
                  <ul className="ml-10 mt-2 space-y-1 text-sm">
                    <li>
                      <Link
                        href={routes.manager.add.tablecategory}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.tablecategory
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Categorías
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.add.tablesubcategory}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.tablesubcategory
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Subcategorías
                      </Link>
                    </li>

                    <li>
                      <Link
                        href={routes.manager.add.tablebrand}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.tablebrand
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Agregar Marcas
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.add.tablecolor}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.tablecolor
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Agregar color
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.add.tablesize}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.tablesize
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Agregar Medidas
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.add.tableproduct}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.tableproduct
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Productos
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* CASHIER */}
            {isAdminUser && (
              <li>
                <button
                  onClick={() =>
                    setIsSubmenuOpen((prev) =>
                      prev === "cashier" ? null : "cashier"
                    )
                  }
                  className={`group flex items-center p-2 w-full text-base-100 rounded-lg transition-colors cursor-pointer
          ${isCollapsed ? "justify-center" : ""}
          ${
            pathname.startsWith("/manager/cashier")
              ? "bg-[#4e4090]"
              : "hover:bg-[#4e4090]"
          }`}
                >
                  <Wallet
                    className={`text-base-100 group-hover:text-white ${
                      isCollapsed ? "h-5 w-5" : "h-6 w-6"
                    }`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="ms-3 flex-1 text-left">Caja</span>
                      {isSubmenuOpen === "cashier" ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </>
                  )}
                </button>
                {!isCollapsed && isSubmenuOpen === "cashier" && (
                  <ul className="ml-10 mt-2 space-y-1 text-sm">
                    <li>
                      <Link
                        href={routes.manager.cashier.overview}
                        className="block px-2 py-1 text-base-200"
                      >
                        Vista general
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.cashier.audits}
                        className="block px-2 py-1 text-base-200"
                      >
                        Nuevo Arqueo
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.cashier.cuts}
                        className="block px-2 py-1 text-base-200"
                      >
                        Crear Corte
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* MANAGMENT MANAGER */}
            {isAdminUser && (
              <li>
                <button
                  onClick={() =>
                    setIsSubmenuOpen((prev) =>
                      prev === "settings" ? null : "settings"
                    )
                  }
                  className={`group flex items-center p-2 w-full text-base-100 rounded-lg transition-colors cursor-pointer
          ${isCollapsed ? "justify-center" : ""}
          ${
            pathname.startsWith("/manager/settings")
              ? "bg-[#4e4090]"
              : "hover:bg-[#4e4090]"
          }`}
                >
                  <ChartColumnIncreasing
                    className={`text-base-100 group-hover:text-white ${
                      isCollapsed ? "h-5 w-5" : "h-6 w-6"
                    }`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="ms-3 flex-1 text-left">
                        Gestión de negocio
                      </span>
                      {isSubmenuOpen === "settings" ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </>
                  )}
                </button>

                {!isCollapsed && isSubmenuOpen === "settings" && (
                  <ul className="ml-10 mt-2 space-y-1 text-sm">
                    <li>
                      <Link
                        href={routes.user.reports}
                        className="block px-2 py-1 text-base-200"
                      >
                        Reportes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.settings.createEmployee}
                        className="block px-2 py-1 text-base-200"
                      >
                        Crear empleado
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.settings.prices}
                        className="block px-2 py-1 text-base-200"
                      >
                        Precios
                      </Link>
                    </li>
                    
                    <li>
                      <Link
                        href={routes.manager.settings.shipping}
                        className="block px-2 py-1 text-base-200"
                      >
                        Embarques
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </aside>
    );
  }
);

SideBar.displayName = "SideBar";
export default SideBar;
