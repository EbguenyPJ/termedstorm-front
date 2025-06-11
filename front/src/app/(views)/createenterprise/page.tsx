import { CreateEmployeeUI } from "./components/CreateEnterpriseUI";
import Link from "next/link";
import { routes } from "@/app/routes";

export default function RegisterPage() {
  return (
    <>
      <div className="relative h-screen w-full">

        {/* Contenedor del formulario */}
        <div className="bg-white shadow-[8px_8px_0_0_#111111] max-w-lg w-full px-8 py-4">
          <div className="mb-3">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-base-400">
              Creá la cuenta de tu cliente.
            </h2>
            <p className="text-base-400">
              Por favor completá el siguiente formulario para crear correctamente al nuevo cliente.
            </p>
          </div>

          {/* Formulario de registro */}
          <div className="py-2 sm:py-6">
            <CreateEmployeeUI />
          </div>

          <p className="text-center">
            ¿Ya tenés cuenta?{" "}
            <Link
              href={routes.login}
              className="text-primary font-semibold inline-flex space-x-1 items-center hover:text-[#0d0d0d]"
            >
              Click aquí
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
