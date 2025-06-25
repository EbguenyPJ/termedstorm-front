"use client";

import { Inbox as InboxIcon } from "lucide-react";
// import { useState } from "react";

export const Inbox = () => {
//   const [hasNotifications, setHasNotifications] = useState(true); // cambiar lógica real según tu app

  return (
    <div className="relative mx-2 flex justify-center items-center">
      <button
        className="relative text-white p-2 rounded-lg hover:bg-[#6e5cc4] transition-colors cursor-pointer"
        aria-label="Notificaciones"
      >
        <InboxIcon className="w-6 h-6" />
       
          <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            7
          </span>
      
      </button>
    </div>
  )
};
