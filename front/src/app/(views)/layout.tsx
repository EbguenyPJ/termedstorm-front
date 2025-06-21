"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import LayoutManager from "@/components/LayoutManager";
import ClientWrapper from "@/components/ClientWrapper";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ViewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  
  const isLoading = loading || !user;

  
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper />
        {isLoading ? (
          <div className="p-10 text-center text-lg text-gray-500">
            Cargando...
          </div>
        ) : (
          <LayoutManager>{children}</LayoutManager>
        )}
        <Toaster />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
      </body>
    </html>
  );
}





