"use client";

import { useEffect } from "react";
import { useAuthStore } from "../app/stores/authStore";

export const useAuthInit = () => {
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    console.log("Ejecutando fetchUser")
    fetchUser(); 
  }, [fetchUser]);

  return null;
};