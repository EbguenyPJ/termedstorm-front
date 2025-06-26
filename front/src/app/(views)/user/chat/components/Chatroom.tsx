"use client";

import { ButtonPrimary } from "@/components/UI/Buttons/Buttons";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useChatStore } from "@/stores/chatStore";


export default function ChatRoomLayout() {
  const [message, setMessage] = useState("");
  const unreadMessagesCount = useChatStore((s) => s.unreadMessages);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Mensaje enviado:", message);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  useEffect(() => {
  useChatStore.getState().resetUnread();
}, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "27px"; // altura base
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div
      className="flex h-screen text-[#444141]"
      style={{ backgroundColor: "var(--color-background-light, #F4F3F8)" }}
    >
      {/* 1. Barra Lateral (Lista de Chats) */}
      <aside className="w-80 flex-shrink-0 bg-[#ffffff] border-r border-[#f0f2f1]">
        <div className="p-4 border-b border-[#f0f2f1]">
          <h2 className="text-xl font-semibold text-[#0d0d0d]">Chats</h2>
        </div>
        <div className="overflow-y-auto">
          {/* Chat activo */}
          <div className="p-4 flex items-center gap-4 bg-[#6d5cc42d] border-r-4 border-[#6e5cc4]">
            <img
              width={48}
              height={48}
              className="rounded-xl"
              src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
              alt="Avatar"
            />
            <div>
              <p className="font-semibold text-[#0d0d0d]">Helene Engels</p>
              <p className="text-sm text-[#777] truncate">Hola! ¿Cómo estás?</p>
            </div>
          </div>

          {/* Chat con mensajes no leídos */}
          <div className="p-4 flex items-center gap-4 hover:bg-[#f0f2f1] cursor-pointer">
            <img
              width={48}
              height={48}
              className="rounded-xl"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Avatar"
            />
            <div className="flex-grow">
              <p className="font-semibold text-[#0d0d0d]">Robert Brown</p>
              <p className="text-sm text-[#777] truncate">
                Perfecto, nos vemos mañana.
              </p>
            </div>
            {unreadMessagesCount > 0 && (
              <div className="flex-shrink-0 w-6 h-6 bg-[#ea4029] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadMessagesCount}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 2. Ventana de Chat Principal */}
      <main className="flex-1 flex flex-col">
        {/* Cabecera del Chat: */}
        <header className="p-4 flex items-center gap-4 bg-[#ffffff] border-b border-[#f0f2f1]">
          {" "}
          {/* bg-base-100, border-base-200 */}
          <img
            width={48}
            height={48}
            className="rounded-xl"
            src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
            alt="Avatar"
          />
          <div>
            <p className="text-lg font-semibold text-[#0d0d0d]">
              Helene Engels
            </p>{" "}
            <p className="text-sm text-green-500">Online</p>
          </div>
        </header>

        {/* Área de Mensajes: */}
        <div className="flex-grow p-6 overflow-y-auto">
          {/* Mensaje Recibido: */}
          <div className="flex items-start gap-3 mb-4">
            <img
              width={40}
              height={40}
              className="rounded-xl"
              src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
              alt="Avatar"
            />
            <div className="bg-[#ffffff] p-3 rounded-lg max-w-lg shadow-sm">
              <p className="text-[#444141]">
                {" "}
                Hola! ¿Cómo estás? Quería saber si recibiste los archivos que te
                envié.
              </p>
              <p className="text-xs text-right text-[#777] mt-1">15:02</p>{" "}
            </div>
          </div>

          {/* Mensaje Enviado: */}
          <div className="flex items-start gap-3 justify-end mb-4">
            <div className="bg-[#6e5cc4] text-[#ffffff] p-3 rounded-lg max-w-lg shadow-sm">
              <p>
                ¡Hola Helene! Sí, los recibí. Todo perfecto. ¡Muchas gracias!
              </p>
              <p className="text-xs text-right text-white/80 mt-1">15:03</p>
            </div>
            <img
              width={40}
              height={40}
              className="rounded-xl"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Avatar"
            />
          </div>
        </div>

        {/* Input de mensaje */}
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

            {/* Ícono de enviar (visible en desktop) */}
            <button
              onClick={handleSend}
              className="absolute right-2 bottom-2 hidden lg:block text-[#6e5cc4] hover:text-[#4e4090] cursor-pointer"
            >
              <Send size={25} />
            </button>

            {/* Botón visible solo en móvil/tablet */}
            <div className="lg:hidden ml-2">
              <ButtonPrimary
                onClick={handleSend}
                className="px-4 py-2 bg-[#6e5cc4] text-[#ffffff] rounded-lg hover:bg-[#4e4090] cursor-pointer"
                textContent="Enviar"
              />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
