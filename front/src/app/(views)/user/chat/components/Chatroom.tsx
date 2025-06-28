"use client";

import { ButtonPrimary } from "@/components/UI/Buttons/Buttons";
import { useRef, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useChatStore } from "@/stores/chatStore";
import { useAuthStore } from "@/stores/authStore";

const fakeUsers = [
  { id: "user1", name: "Lucía Gómez" },
  { id: "user2", name: "Martín Pérez" },
  { id: "user3", name: "Valentina Ruiz" },
  { id: "user4", name: "Facundo López" },
  { id: "user5", name: "Sofía Torres" },
];

export default function ChatRoomLayout() {
  const { messages, connect, sendMessage, resetMessages } = useChatStore();
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const tenantSlug = "nivo-a"; //user?.tenant?.slug ?? "default-tenant"; desde back = tenant: payload.tenant,
  const room = activeRoom ?? "general";

  useEffect(() => {
    if (!tenantSlug || !activeRoom) return;

    connect(tenantSlug, activeRoom);

    return () => {
      resetMessages();
    };
  }, [tenantSlug, activeRoom]);

  // Simula mensaje inicial del otro usuario
  useEffect(() => {
  if (!activeRoom) return;

  const timeout = setTimeout(() => {
    useChatStore.setState((state) => ({
      messages: {
        ...state.messages,
        [activeRoom]: [
          ...(state.messages[activeRoom] || []),
          {
            user: activeRoom,
            message: "¡Hola! ¿Cómo estás?",
            createdAt: new Date().toISOString(),
            room: activeRoom,
          },
        ],
      },
    }));
  }, 1000);

  return () => clearTimeout(timeout);
}, [activeRoom]);


  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message, room); // Usás la misma room que en connect()
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "27px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  //   useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await api.get("/employees");
  //     setAvailableUsers(res.data); // guardás en un estado local
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <div
      className="flex text-[#444141]"
      style={{
        height: "calc(100dvh - 64px)",
        backgroundColor: "var(--color-background-light, #F4F3F8)",
      }}
    >
      {/* Sidebar */}
      <aside className="w-80 flex-shrink-0 bg-white border-r border-[#f0f2f1]">
        <div className="p-4 border-b border-[#f0f2f1]">
          <h2 className="text-xl font-semibold text-[#0d0d0d]">Chats</h2>
        </div>
        <div className="overflow-y-auto">
          {fakeUsers.map((userChat) => (
            <div
              key={userChat.id}
              onClick={() => setActiveRoom(userChat.name)}
              className={`p-4 cursor-pointer hover:bg-[#f0f2f1] flex items-center gap-4 ${
                activeRoom === userChat.name
                  ? "bg-[#6d5cc42d] border-r-4 border-[#6e5cc4]"
                  : ""
              }`}
            >
              <div>
                <p className="font-semibold text-[#0d0d0d]">{userChat.name}</p>
                <p className="text-sm text-[#777] truncate">
                  Último mensaje...
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat principal */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        {activeRoom ? (
          <>
            {/* Header */}
            <header className="p-4 bg-white border-b border-[#f0f2f1]">
              <p className="text-lg font-semibold text-[#0d0d0d]">
                {activeRoom}
              </p>
            </header>

            {/* Mensajes */}
            <div className="flex-grow p-6 overflow-y-auto">
              {(messages[room] || []).map((msg, idx) => {
                const isOwn = msg.user === user?.name;

                return (
                  <div
                    key={idx}
                    className={`flex flex-col mb-4 ${
                      isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    <span className="text-sm text-[#999] mb-1">
                      {isOwn ? user?.name ?? "Yo" : msg.user}
                    </span>
                    <div
                      className={`p-3 rounded-lg max-w-[70%] shadow-sm ${
                        isOwn
                          ? "bg-[#6e5cc4] text-white rounded-br-none"
                          : "bg-[#e8e2fa] text-[#444141] rounded-bl-none"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p
                        className={`text-xs mt-1 text-right ${
                          isOwn ? "text-white/80" : "text-[#777]"
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <footer className="p-4 bg-[#ffffff] border-t border-[#f0f2f1]">
              <div className="flex items-end gap-2 rounded-xl bg-[#f0f2f1] p-2 relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe un mensaje..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-[#444141] outline-none max-h-32 overflow-y-auto pr-10"
                  style={{ height: "27px" }}
                />

                {/* Desktop send */}
                <button
                  onClick={handleSend}
                  className="absolute right-2 bottom-2 hidden lg:block text-[#6e5cc4] hover:text-[#4e4090] cursor-pointer"
                >
                  <Send size={25} />
                </button>

                {/* Mobile send */}
                <div className="lg:hidden ml-2">
                  <ButtonPrimary
                    onClick={handleSend}
                    className="px-4 py-2 bg-[#6e5cc4] text-white rounded-lg hover:bg-[#4e4090]"
                    textContent="Enviar"
                  />
                </div>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-center text-[#888] px-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Bienvenido a NIVO</h2>
              <p>Seleccioná una conversación para comenzar a chatear</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
