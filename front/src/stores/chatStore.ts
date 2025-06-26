import { create } from "zustand";

type ChatStore = {
  unreadMessages: number;
  setUnreadMessages: (count: number) => void;
  incrementUnread: () => void;
  resetUnread: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  unreadMessages: 0,
  setUnreadMessages: (count) => set({ unreadMessages: count }),
  incrementUnread: () =>
    set((state) => ({ unreadMessages: state.unreadMessages + 1 })),
  resetUnread: () => set({ unreadMessages: 0 }),
}));
