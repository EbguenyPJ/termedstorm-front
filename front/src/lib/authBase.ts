import axios from "axios";
import { ILogin, IRegister, IAuthMeUser } from "@/interfaces";


console.log("La URL de la API que se usará es:", process.env.NEXT_PUBLIC_API_URL);

export const baseAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // Importante: envía cookies HTTPOnly
});

// AUTH/ME
export const getUserApi = async (): Promise<IAuthMeUser | null> => {
  console.log(baseAxios.defaults.baseURL);
  try {
    const user = await baseAxios.get("/auth/me");
    console.log(user.data);
    return user.data;
  } catch (error) {
    console.error("Error al obtener usuario", error);
    return null;
  }
};

// CERRAR SESION
export const logoutApi = async () => {
  console.log(baseAxios.defaults.baseURL);
  try {
    await baseAxios.post("/auth/logout");
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
};

// // ROLES
// export const getRolesApi = async (): Promise<IRole[]> => {
//   try {
//     const res = await baseAxios.get("/roles");
//     return res.data; // [{ id: "1", name: "SUPERADMIN" }, ...]
//   } catch (error) {
//     console.error("Error al obtener los roles", error);
//     throw new Error("No se pudieron cargar los roles");
//   }
// };

// CLIENT
export const loginClientApi = async (values: ILogin) => {
  console.log(baseAxios.defaults.baseURL);
  const res = await baseAxios.post("/auth/client/login", values);
  return res.data; // user, token, lo que tu backend retorne
};

export const registerClientApi = async (values: IRegister) => {
  console.log(baseAxios.defaults.baseURL);
  const res = await baseAxios.post("/auth/client/register", values);
  return res.data;
};

// GET /auth/client/google
// GET /auth/client/google/callback

// EMPLOYEE
export const loginApi = async (values: ILogin) => {
  console.log(baseAxios.defaults.baseURL);
  const res = await baseAxios.post("/auth/employee/login", values);
  return res.data; // user, token, lo que tu backend retorne
};

export const registerApi = async (values: IRegister) => {
  console.log(baseAxios.defaults.baseURL);
  const res = await baseAxios.post("/auth/employee/register", values);
  return res.data;
};

// GET /auth/employee/google
// GET /auth/employee/google/callback
// PUT /employees/:id/roles
