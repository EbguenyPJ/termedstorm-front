import { create } from "zustand";
import { IUser, ILogin } from "@/interfaces";
import {getUserApi, loginApi, logoutApi} from "@/lib/authBase";

interface AuthState {
  user: IUser | null;
  loading: boolean;
  login: (values: ILogin) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: IUser | null) => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      set({ loading: true });
      const user = await getUserApi();
      set({ user, loading: false });
    } catch (err) {
      console.error("Error al obtener usuario", err);
      set({ user: null, loading: false });
    }
  },

  login: async (values: ILogin) => {
    await loginApi(values);
    const user = await getUserApi();
    set({ user });
  },

  logout: async () => {
    await logoutApi();
    set({ user: null });
  },
}));
