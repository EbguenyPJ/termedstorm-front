import { create } from "zustand";
import { ILogin, IRegister, IAuthMeUser } from "@/interfaces";
import {
  getUserApi,
  logoutApi,
  loginApi,
  registerApi,
  loginClientApi,
  registerClientApi,
} from "@/lib/authBase";

type UserType = "client" | "employee";

interface AuthState {
  user: IAuthMeUser | null;
  loading: boolean;
  // setters
  setUser: (user: IAuthMeUser | null) => void;
  fetchUser: () => Promise<void>;
  login: (type: UserType, credentials: ILogin) => Promise<void>;
  logout: () => Promise<void>;
  registerClient: (data: IRegister) => Promise<void>;
  registerEmployee: (data: IRegister) => Promise<void>;

  // helpers
  hasRole: (role: string) => boolean;
  isClient: () => boolean;
  isEmployee: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      set({ loading: true });
      const user = await getUserApi();
      console.log("Usuario recibido en fetchUser:", user);
      set({ user, loading: false });
    } catch (err) {
      console.error("Error al obtener usuario", err);
      set({ user: null, loading: false });
    }
  },

  login: async (type: UserType, credentials: ILogin) => {
    if (type === "employee") await loginApi(credentials);
    else await loginClientApi(credentials);

    const user = await getUserApi();
    if (!user) throw new Error("No se pudo obtener el usuario luego del login");
    set({ user });
  },

  logout: async () => {
    await logoutApi();
    set({ user: null });
  },

  registerClient: async (data) => {
    await registerClientApi(data);
  },

  registerEmployee: async (data) => {
    await registerApi(data);
  },

  // helpers:
  hasRole: (role: string) => {
    return get().user?.roles?.includes(role.toUpperCase()) ?? false;
  },

  isClient: () => get().user?.roles.length === 0,
  isEmployee: () => (get().user?.roles?.length ?? 0) > 0,
}));
