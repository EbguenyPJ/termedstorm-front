import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./authStore";

type ChatMessage = {
  user: string;
  message: string;
  createdAt: string;
  room: string;
};

type ChatStore = {
  socket: Socket | null;
  messages: Record<string, ChatMessage[]>;
  connect: (tenantSlug: string, room: string) => void;
  disconnect: () => void;
  sendMessage: (message: string, room: string) => void;
  resetMessages: () => void;
};



export const useChatStore = create<ChatStore>((set, get) => ({
  socket: null,
  messages: {},

connect: (tenantSlug, room) => {
    const socket = io("http://localhost:8080", {
      withCredentials: true,
      auth: { tenantSlug },
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("🟢 Conectado al socket:", socket.id);
      socket.emit("event_join", room);
    });

    socket.on("new_message", (msg: ChatMessage) => {
      set((state) => ({
        messages: {
          ...state.messages,
          [msg.room]: [...(state.messages[msg.room] || []), msg],
        },
      }));
    });

    set({ socket });
  },


 sendMessage: (message, room) => {
    const socket = get().socket;
    const user = useAuthStore.getState().user;

    if (!socket || !message.trim()) return;

    const newMessage: ChatMessage = {
      user: user?.name || "yo",
      message,
      createdAt: new Date().toISOString(),
      room,
    };

    socket.emit("event_message", { room, message });

    set((state) => ({
      messages: {
        ...state.messages,
        [room]: [...(state.messages[room] || []), newMessage],
      },
    }));
  },


  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.emit("event_leave", "general"); // Opcional: podrías enviar la room actual
      socket.disconnect();
      set({ socket: null });
    }
  },

  resetMessages: () => set({ messages: {} }),
}));