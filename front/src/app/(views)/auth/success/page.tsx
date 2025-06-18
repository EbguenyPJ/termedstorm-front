// src/app/auth/success/page.tsx
import { Suspense } from "react";
import GoogleSuccessClient from "./GoogleSuccess";

export default function GoogleSuccessPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Cargando...</p>}>
      <GoogleSuccessClient />
    </Suspense>
  );
}