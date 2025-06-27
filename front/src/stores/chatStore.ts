import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./authStore";

type ChatMessage = {
  user: string;
  message: string;
  createdAt: string;
};

type ChatStore = {
  socket: Socket | null;
  messages: ChatMessage[];
  connect: (tenantSlug: string, room: string) => void;
  disconnect: () => void;
  sendMessage: (message: string, room: string) => void;
  resetMessages: () => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  socket: null,
  messages: [],

  connect: (room) => {
    const tenantSlug = "nivo-a"; // Obtener usuario actual
    const socket = io("http://localhost:8080", {
      withCredentials: true,
      auth: { tenantSlug },
    });

    socket.on("connect", () => {
      console.log("🟢 Conectado al socket:", socket.id);
      socket.emit("event_join", room);
    });

    socket.on("new_message", (msg: ChatMessage) => {
      set((state) => ({
        messages: [...state.messages, msg],
      }));
    });

    set({ socket });
  },

  sendMessage: (message, room) => {
    const socket = get().socket;
    const user = useAuthStore.getState().user;

    if (!socket || !message.trim()) return;

    socket.emit("event_message", { room, message });

    set((state) => ({
      messages: [
        ...state.messages,
        {
          user: user?.name || "yo",
          message,
          createdAt: new Date().toISOString(),
        },
      ],
    }));
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.emit("event_leave", "general");
      socket.disconnect();
      set({ socket: null });
    }
  },

  resetMessages: () => set({ messages: [] }),
}));
