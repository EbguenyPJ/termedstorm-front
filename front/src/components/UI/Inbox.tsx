"use client";

import { Inbox as InboxIcon } from "lucide-react";
import { useChatStore } from "@/stores/chatStore";

export const Inbox = () => {
  const { unreadMessagesCount, resetUnreadCount } = useChatStore((state) => ({
    unreadMessagesCount: state.unreadMessagesCount,
    resetUnreadCount: state.resetUnreadCount,
  }));

  const handleIconClick = () => {
    console.log("Ícono de Inbox clickeado, reiniciando contador.");
    resetUnreadCount();
  };

  return (
    <button onClick={handleIconClick} className="relative">
      <InboxIcon className="w-6 h-6" />
      {unreadMessagesCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#ea4029] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {unreadMessagesCount}
        </span>
      )}
    </button>
  );
};