// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import psLogo from '@/utils/PointSale-logo.png'
// import sideBar from '@/utils/sidebar-left.svg'
// import location from '@/utils/location-pin.svg'
// import phone from '@/utils/phone.svg'
// import list from '@/utils/list-ul.svg'
// import box from '@/utils/box.svg'
// import sale from '@/utils/sale.svg'
// import addBox from '@/utils/add-square.svg'
// import chart from '@/utils/chart.svg'
// import question from '@/utils/question-circle.svg'
// //import catgoriesToPreload from "@/helpers/categories";

// export default function SideBar() {

//     return (
//         <div className="fixed left-0 w-1/6 h-screen bg-primary text-base shadow-md">
//             <div className="border-b-2 border-base1 h-16 flex">
//                 <Image src={psLogo} alt="logo" className="h-8 w-8 my-auto ml-2"></Image>
//                 <h1 className="font-black text-xl my-auto ml-2">POINTSALE</h1>
//                 <button className="ml-auto mr-2">
//                     <Image src={sideBar} alt="logo" className="h-4 w-4"></Image>
//                 </button>
//             </div>

//             <div className="border-b-2 border-base1 flex flex-col mt-2 gap-4">
//                 {/* <Image src={""} alt="logo" className="h-8 w-8 ml-2"></Image> */} <div className="w-16 h-16 bg-black ml-2"></div>
//                 <h1 className="font-black text-xl ml-2">POINTSALE</h1>
//                 <div className="flex ml-2">
//                     <Image src={location} alt="list" className="h-7 w-7"></Image>
//                     <h2 className="">Calle Falsa 1234</h2>
//                 </div>
//                 <div className="flex ml-2">
//                     <Image src={phone} alt="list" className="h-7 w-7"></Image>
//                     <h2 className="mb-4">+54 11 5470 1111</h2>
//                 </div>
//             </div>

//             <div className="mb-auto flex flex-col mt-4 gap-4">
//                 <Link href={"/"} className="flex items-center ml-2 gap-2 hover:underline">
//                     <Image src={list} alt="list" className="h-7 w-7"></Image>
//                     <h2 className="">CATEGORIAS</h2>
//                 </Link>

//                 <Link href={"/products"} className="flex items-center ml-2 gap-2 hover:underline">
//                     <Image src={box} alt="list" className="h-7 w-7"></Image>
//                     <h2 className="">PRODUCTOS</h2>
//                 </Link>

//                 <Link href={"sales"} className="flex items-center ml-2 gap-2 hover:underline">
//                     <Image src={sale} alt="list" className="h-7 w-7"></Image>
//                     <h2 className="">VENTAS</h2>
//                 </Link>

//                 <Link href={"/newsale"} className="flex items-center ml-2 gap-2 hover:underline">
//                     <Image src={addBox} alt="list" className="h-7 w-7"></Image>
//                     <h2 className="">NUEVA VENTA</h2>
//                 </Link>

//                 <Link href={"/reports"} className="flex items-center ml-2 gap-2 hover:underline">
//                     <Image src={chart} alt="list" className="h-7 w-7"></Image>
//                     <h2 className="">EDITAR LISTAS</h2>
//                 </Link>

//                 <Link href={"/support"} className="flex items-center ml-2 gap-2 hover:underline">
//                     <Image src={question} alt="list" className="h-7 w-7"></Image>
//                     <h2 className="">SOPORTE/AYUDA</h2>
//                 </Link>
//             </div>

//         </div>
//     );
// };


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
        className={`fixed top-0 left-0 z-40 h-screen bg-primary text-base shadow-md flex flex-col 
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
              <h1 className="font-black text-xl ml-2 text-base1">POINTSALE</h1>
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
            <div className="w-16 h-16 bg-black"></div>
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
            { href: "/newsale", icon: SquarePlus, label: "NUEVA VENTA" },
            { href: "/sales", icon: ChartColumnIncreasing, label: "EDITAR LISTAS" },
            { href: "/sales", icon: CircleHelp, label: "SOPORTE/AYUDA" },
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