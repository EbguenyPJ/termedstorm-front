"use client";

import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { usePathname } from "next/navigation";

const PUBLIC_PATHS = ["/login", "/registerclient", "/loginclient"];

export const useAuthInit = () => {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const pathname = usePathname();

  useEffect(() => {
    const isPublic = PUBLIC_PATHS.some((r) => pathname.startsWith(r));
    const hasToken = document.cookie.includes("access_token=");

    if (!user && !loading && hasToken && !isPublic) {
      fetchUser();
    }
  }, [fetchUser, pathname, user, loading]);

  return null;
};
