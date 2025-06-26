"use client";

import { routes } from "@/app/routes";
import { Inbox as InboxIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/stores/chatStore";

// import { useState } from "react";

export const Inbox = () => {
  const router = useRouter();
  const unreadMessagesCount = useChatStore((s) => s.unreadMessages);

  //   const [hasNotifications, setHasNotifications] = useState(true); // cambiar lógica real según tu app

  const handleClick = () => {
    router.push(routes.user.chat);
  };

  return (
    <div className="relative mx-2 flex justify-center items-center">
      <button
        onClick={handleClick}
        className="relative text-white p-2 rounded-lg hover:bg-[#6e5cc4] transition-colors cursor-pointer"
        aria-label="Notificaciones"
      >
        <InboxIcon className="w-6 h-6" />

        {unreadMessagesCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#ea4029] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadMessagesCount}
          </span>
        )}
      </button>
    </div>
  );
};
