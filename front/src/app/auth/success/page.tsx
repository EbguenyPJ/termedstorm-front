"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserApi } from "@/lib/authBase";
import { useAuthStore } from "@/app/stores/authStore";
import { routes } from "../../routes/index";

export default function GoogleSuccessPage() {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  const params = useSearchParams();

  const type = params.get("type");


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserApi();
        if (user) {
          setUser(user);
          router.push(type === "employee" ? routes.categories : routes.profile);
        } else {
          router.push(routes.login);
        }
      } catch (error) {
        console.error("Error en Google Auth callback", error);
        router.push(routes.login);
      }
    };

    fetchUser();
  }, [router, setUser]);

  return <p className="text-center mt-10">Autenticando con Google...</p>;
}
