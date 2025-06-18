import React from "react";
import {RegisterFormClient} from "../../../components/Auth/Client/RegisterFormClientUI";
import Link from "next/link";
import { routes } from "../../routes/index";

const LoginPageClient = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1">

      {/* Sección derecha: formulario */}
      <div className="flex flex-col items-center justify-center bg-base-100 px-6 py-12">
        <div>
            <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
            <p className="text-lg">
              Crea tu cuenta CLIENTE
            </p>
          </div>
        <div className="w-full max-w-md">
          <RegisterFormClient />
        </div>

          <p className="text-center mt-2">
            ¿Ya tenes cuenta?{" "}
            <Link
              href={routes.loginclient}
              className="text-primary font-semibold inline-flex space-x-1 items-center hover:text-[#0d0d0d]"
            >
              Clickea aquí
            </Link>
          </p>

      </div>
    </div>
  );
};

export default LoginPageClient;
