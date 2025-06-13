import React from "react";
import LoginForm from "../components/Forms/LoginFormUI";
import Link from "next/link";
import {routes} from "./routes";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Sección izquierda: imagen o color */}
      <div className="hidden lg:block bg-[#4e4090] relative">
        {/* Imagen opcional */}

        {/* Texto */}
        <div className="relative z-10 flex items-center justify-center h-full px-10 text-base-100 text-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
            <p className="text-lg">Iniciá sesión para acceder a tu cuenta</p>
          </div>
        </div>
      </div>

      {/* Sección derecha: formulario */}
      <div className="flex flex-col items-center justify-center bg-base-100 px-6 py-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>

        <p className="text-center mt-2">
            ¿Aún no tenés cuenta?{" "}
            <Link
              href={routes.createenterprise}
              className="text-primary font-semibold inline-flex space-x-1 items-center hover:text-[#0d0d0d]"
            >
              Clickea aquí
            </Link>
          </p>

      </div>
    </div>
  );
};

export default LoginPage;
