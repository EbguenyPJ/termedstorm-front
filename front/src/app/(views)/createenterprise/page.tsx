import { CreateEnterpriseUI } from "./components/CreateEnterpriseUI";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Crear Cliente</h2>
          <p className="text-sm text-gray-500">
            Completá el siguiente formulario para registrar un nuevo cliente.
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          <CreateEnterpriseUI />
        </div>
      </div>
    </div>
  );
}
