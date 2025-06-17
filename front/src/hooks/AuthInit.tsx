"use client";
import { useEffect } from "react";
import { useAuthStore } from "../app/stores/authStore";

export const useAuthInit = () => {
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser(); // Llama getUserAction (usa cookie httpOnly)
  }, []);

  return null;
};