import axios from "axios";
import { ILogin, IRegister, IUser } from "@/interfaces";

export const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/",
  withCredentials: true, // Importante: envía cookies HTTPOnly
});


// CLIENT
export const loginClientApi = async (values: ILogin) => {
  const res = await baseAxios.post("/auth/client/login", values);
  return res.data; // user, token, lo que tu backend retorne
};

export const registerClientApi = async (values: IRegister) => {
  const res = await baseAxios.post("/auth/client/register", values);
  return res.data;
};

// GET /auth/client/google
// GET /auth/client/google/callback


// EMPLOYEE
export const loginApi = async (values: ILogin) => {
  const res = await baseAxios.post("/auth/employee/login", values);
  return res.data; // user, token, lo que tu backend retorne
};

export const registerApi = async (values: IRegister) => {
  const res = await baseAxios.post("/auth/employee/register", values);
  return res.data;
};

// GET /auth/employee/google
// GET /auth/employee/google/callback
// PUT /employees/:id/roles


export const getUserApi = async (): Promise<IUser | null> => {
  try {
    const user = await baseAxios.get("/auth/me");
    return user.data;
  } catch (error) {
    console.error("Error al obtener usuario", error);
    return null;
  }
};

export const logoutApi = async () => {
  try {
    await baseAxios.post("/auth/logout");
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
};
;