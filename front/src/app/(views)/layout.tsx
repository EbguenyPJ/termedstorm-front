"use client";

import Script from "next/script";
import LayoutManager from "@/components/LayoutManager";
import ClientWrapper from "@/components/ClientWrapper";
import { useAuthStore } from "@/stores/authStore";
import { usePathname } from "next/navigation";


export default function ViewsLayout({ children }: { children: React.ReactNode }) {
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const pathname = usePathname();

  const isChatRoom = pathname === "/user/chat";

  return (
    <>
      {!isInitialized && <ClientWrapper />}
      {!isInitialized ? (
        <div className="p-10 text-center text-lg text-gray-500">
          Cargando...
        </div>
      ) : (
        <LayoutManager showBreadcrumb={!isChatRoom} showContainer={!isChatRoom ? true : false}>

            {children}
          <div id="portal-root" />
        </LayoutManager>
      )}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
    </>
  );
}
