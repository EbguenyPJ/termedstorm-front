import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import LayoutManager from "@/components/LayoutManager";
import ClientWrapper from "@/components/ClientWrapper"
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nivo POS",
  description: "Nivo POS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ClientWrapper/>
          <LayoutManager>{children}</LayoutManager>
          <Toaster />
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" />
      </body>
  );
}
