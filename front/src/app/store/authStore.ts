import { create } from "zustand";
import { IUser, ILogin } from "@/interfaces";
import { logout as logoutAction } from "@/services/logout";
import { getUser } from "../../services/getUsers";
import { loginAction } from "../../services/auth";
// import { routes } from "@/app/routes";
// import { useRouter } from "next/navigation";

interface AuthState {
  user: IUser | null;
  loading: boolean;
  login: (values: ILogin) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: IUser | null) => void; 
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      const user = await getUser();
      set({ user, loading: false });
    } catch (err) {
      console.error("Error al obtener usuario", err);
      set({ user: null, loading: false });
    }
  },

  login: async (values: ILogin) => {
    const res = await loginAction(values);
    if (!res.success) throw new Error(res.error);
    const user = await getUser();
    set({ user });
  },

  logout: async () => {
    await logoutAction();
    set({ user: null });
  },
}));
