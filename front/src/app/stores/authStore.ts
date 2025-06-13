import { create } from "zustand";
import { IUser, ILogin } from "@/interfaces";
import { logout as logoutAction } from "@/actions/logout";
import { getUserAction } from "../../actions/getUserAction";
import { loginAction } from "../../actions/authAction";

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
      const user = await getUserAction();
      set({ user, loading: false });
    } catch (err) {
      console.error("Error al obtener usuario", err);
      set({ user: null, loading: false });
    }
  },

  login: async (values: ILogin) => {
    const res = await loginAction(values);
    if (!res.success) throw new Error(res.error);
    const user = await getUserAction();
    set({ user });
  },

  logout: async () => {
    await logoutAction();
    set({ user: null });
  },
}));
