"use server";

import { IUser } from "../interfaces";
import { getUserApi } from "@/lib/authBase";

export async function getUserAction(): Promise<IUser | null> {
  try {
    const user = await getUserApi();
    return user;
  } catch (error) {
    console.error("Error al obtener usuario", error);
    return null;
  }
}

// NO es necesario setear las cookies aqui si lo hace el backend
