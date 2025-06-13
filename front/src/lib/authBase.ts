import axios from "axios";
import { ILogin, IRegister } from "@/interfaces";

const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true, // Importante: envía cookies HTTPOnly
});

export const loginApi = async (values: ILogin) => {
  const res = await baseAxios.post("/users/login", values);
  return res.data; // user, token, lo que tu backend retorne
};

export const registerApi = async (values: IRegister) => {
  const res = await baseAxios.post("/users/register", values);
  return res.data;
};

export const getUserApi = async () => {
  const res = await baseAxios.post("/users/me");
  return res.data;
};
