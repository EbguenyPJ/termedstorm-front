import axios from "axios";
import { ILogin, IRegisterEmployee } from "@/interfaces";

export const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/",
  withCredentials: true, // Importante: envía cookies HTTPOnly
});

export const loginApi = async (values: ILogin) => {
  const res = await baseAxios.post("/auth/employee/login", values);
  return res.data; // user, token, lo que tu backend retorne
};

export const registerApi = async (values: IRegisterEmployee) => {
  const res = await baseAxios.post("/auth/employee/register", values);
  return res.data;
};

export const getUserApi = async () => {
  const res = await baseAxios.get("/auth/me");// o client/me según el rol
  return res.data;
};

export const logoutApi = async () => {
  await baseAxios.get("/auth/logout");// o client/me según el rol
}