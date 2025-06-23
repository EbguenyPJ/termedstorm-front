import BreadcrumbClient from "@/components/UI/Breadcrumb";
import { CreateEmployeeUI } from "./components/CreateEmployeeUI";

export default function RegisterPage() {
  return (
    <div>
      <BreadcrumbClient />
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Nuevo Empleado
          </h2>
          <p className="text-sm text-gray-500">
            Completá el siguiente formulario para registrar un nuevo usuario.
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          <CreateEmployeeUI />
        </div>
      </div>
    </div>
  );
}
