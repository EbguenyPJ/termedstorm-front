import React from "react";
import { baseAxios } from "@/lib/authBase";

interface Size {
  id: string;
  size_us: string;
  size_eur: string;
  size_cm: string;
}

const getSizes = async (): Promise<Size[]> => {
  try {
    const response = await baseAxios.get("/sizes");
    return response.data;
  } catch (error) {
    console.error("Error al obtener talles:", error);
    return [];
  }
};

const SizesPage = async () => {
  const sizes = await getSizes();

  return (
    <section className="bg-white p-10 min-h-screen max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#4e4090] mb-8">Lista de Talles</h1>

      {sizes.length === 0 ? (
        <p className="text-gray-600">No hay talles registrados.</p>
      ) : (
        <ul className="divide-y divide-gray-200 border border-gray-300 rounded-lg">
          {sizes.map((size) => (
            <li
              key={size.id}
              className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-800">
                US: {size.size_us}
              </span>
              <span className="text-gray-600">EUR: {size.size_eur}</span>
              <span className="text-gray-600">CM: {size.size_cm}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SizesPage;
