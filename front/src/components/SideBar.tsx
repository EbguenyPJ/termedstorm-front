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
  Settings,
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
  isSeller,
  isClient,
} from "@/app/helpers/authHelper";

interface SideBarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const SideBar = forwardRef<HTMLDivElement, SideBarProps>(
  ({ isCollapsed, toggleCollapse }, ref) => {
    const pathname = usePathname();
    const [isSubmenuOpen, setIsSubmenuOpen] = useState<
      "edit" | "settings" | "cashier" | null
    >(null);

    const user = useAuthStore((s) => s.user);

    const isInitialized = useAuthStore((s) => s.isInitialized);
    if (!isInitialized) return null;

    // Ocultamos Sidebar si es cliente o no hay sesión aún
    if (!user || isClient(user)) return null;

    const isAdminUser = isAdmin(user) || isSuperAdmin(user);
    const isSellerUser = isSeller(user);

    const isEditingActive =
      pathname === routes.manager.add.category ||
      pathname === routes.manager.add.subcategory ||
      pathname === routes.manager.add.product;

    const menuItems = [];

    if (isSellerUser || isAdminUser) {
      menuItems.push(
        { href: routes.shop.categories, icon: Store, label: "Tienda" },
        {
          href: routes.user.sales,
          icon: ChartColumnIncreasing,
          label: "Reportes",
        }
      );
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
          <div
            className={`bg-black hover:bg-[#4e4090] rounded-lg ${
              isCollapsed ? "h-6 w-6 rounded-md" : "w-16 h-16 rounded-lg"
            }`}
          ></div>
          {!isCollapsed && (
            <div className="flex flex-col gap-2 text-sm">
              <h2 className="font-semibold text-base-100 mt-2">
                NOMBRE-EMPRESA
              </h2>
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
        <nav
          className={`flex-1 overflow-y-auto py-4 ${
            isCollapsed ? "gap-1 p-0.5" : "gap-2 p-2"
          }`}
        >
          <ul className="space-y-2 font-medium">
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
                        href={routes.manager.add.category}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.category
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Categorías
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.add.subcategory}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.subcategory
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Subcategorías
                      </Link>
                    </li>
                    
                    <li>
                      <Link
                        href={routes.manager.add.brand}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.brand
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Agregar Marcas
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.add.color}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.color
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Agregar color
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.add.size}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.size
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        Agregar Medidas
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.add.product}
                        className={`block px-2 py-1 text-base-200 ${
                          pathname === routes.manager.add.product
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

            {/* SETTINGS MANAGER */}
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
                  <Settings
                    className={`text-base-100 group-hover:text-white ${
                      isCollapsed ? "h-5 w-5" : "h-6 w-6"
                    }`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="ms-3 flex-1 text-left">
                        Configuraciones
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
                        Editar precios
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.settings.pricesUpload}
                        className="block px-2 py-1 text-base-200"
                      >
                        Subir lista de precios
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
                        href={routes.manager.cashier.newCash}
                        className="block px-2 py-1 text-base-200"
                      >
                        Nueva caja
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.cashier.newShift}
                        className="block px-2 py-1 text-base-200"
                      >
                        Nuevo turno
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.manager.cashier.overview}
                        className="block px-2 py-1 text-base-200"
                      >
                        Vista general
                      </Link>
                    </li>
                  </ul>
                )}
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
          </ul>
        </nav>
      </aside>
    );
  }
);

SideBar.displayName = "SideBar";
export default SideBar;
