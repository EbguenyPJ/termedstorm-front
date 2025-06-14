"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"; 
import { useSearchParams } from "next/navigation";
import {Suspense} from "react"

function GoogleLogin() {
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

export default function GoogleLoginButton() {
  return (
    <Suspense fallback={<div>Cargando botón...</div>}>
      <GoogleLogin />
    </Suspense>
  );
}
