// RUTA: src/stores/chatStore.ts
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
  // 1. Añadimos el estado para los no leídos y la acción para limpiarlos
  unreadMessagesCount: number;
  clearUnread: () => void;
  connect: (tenantSlug: string) => void;
  disconnect: () => void;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
  sendMessage: (message: string, room: string) => void;
  resetMessages: (roomToReset?: string) => void;
};

let socket: Socket | null = null;

export const useChatStore = create<ChatStore>((set, get) => ({
  socket: null,
  messages: {},
  unreadMessagesCount: 0, // Valor inicial

  clearUnread: () => set({ unreadMessagesCount: 0 }),

  connect: (tenantSlug) => {
    if (get().socket?.connected) return;
    
    // 2. Usamos una variable de entorno para la URL del socket
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";

    socket = io(socketUrl, {
      withCredentials: true,
      auth: { tenantSlug },
      transports: ["websocket", "polling"],
    });
    
    socket.on("connect", () => {
      console.log("🟢 Conectado al socket:", socket?.id);
      set({ socket });
    });

    socket.on("disconnect", () => {
        console.log("🔴 Desconectado del socket.");
        set({ socket: null });
    });

    socket.on("new_message", (msg: ChatMessage) => {
      // 3. Incrementamos el contador al recibir un nuevo mensaje
      set((state) => ({
        messages: {
          ...state.messages,
          [msg.room]: [...(state.messages[msg.room] || []), msg],
        },
        unreadMessagesCount: state.unreadMessagesCount + 1,
      }));
    });
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
      set({ socket: null, messages: {}, unreadMessagesCount: 0 }); // También reseteamos el contador
    }
  },

  // ... (el resto de tus funciones: joinRoom, leaveRoom, etc. se quedan igual)
  joinRoom: (room) => {
    socket?.emit("event_join", room);
  },
  leaveRoom: (room) => {
    socket?.emit("event_leave", room);
  },
  sendMessage: (message, room) => {
    if (!socket || !message.trim()) return;
    const user = useAuthStore.getState().user;
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
  resetMessages: (roomToReset?: string) => {
    if (!roomToReset) {
      set({ messages: {} });
    } else {
      set((state) => {
        const newMessages = { ...state.messages };
        delete newMessages[roomToReset];
        return { messages: newMessages };
      });
    }
  },
}));