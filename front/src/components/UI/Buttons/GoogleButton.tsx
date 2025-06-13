"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"; 
import { useSearchParams } from "next/navigation";


export default function GoogleLoginButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded mt-4 hover:bg-[#f0f2f1] cursor-pointer"
    >
      <FcGoogle size={20} />
      <span>Continuar con Google</span>
    </button>
  );
}
