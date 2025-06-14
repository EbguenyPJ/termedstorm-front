"use server";

import { ILogin, IRegister } from "@/interfaces";
import { AxiosError } from "axios";
import { loginApi, registerApi } from "../lib/authBase";

export async function loginAction(values: ILogin) {
  try {
    const res = await loginApi(values);
    // Si tu backend ya setea la cookie, no tenés que hacer nada acá.
    // Pero si querés setear el token desde acá, podés:
    // cookies().set("token", res.token, { httpOnly: true });
    return { success: true, user: res.user };
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "Error desconocido",
    };
  }
}

export const registerAction = async (values: IRegister) => {
  try {
    await registerApi(values);
    return { success: true };
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "Error desconocido",
    };
  }
};
