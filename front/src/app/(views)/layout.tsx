"use client";

import Script from "next/script";
import LayoutManager from "@/components/LayoutManager";
import ClientWrapper from "@/components/ClientWrapper";
import { useAuthStore } from "@/stores/authStore";

export default function ViewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isInitialized = useAuthStore((s) => s.isInitialized);


  return (
    <> {/* Usa un React Fragment para envolver el contenido */}
     {!isInitialized && <ClientWrapper />}
      {!isInitialized ? (
        <div className="p-10 text-center text-lg text-gray-500">
          Cargando...
        </div>
      ) : (
        // LayoutManager contiene el navbar y sidebar, lo cual es correcto.
        <LayoutManager>{children}</LayoutManager>
      )}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
    </>
  );
}