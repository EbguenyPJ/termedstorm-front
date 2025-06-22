import React from "react";
import { baseAxios } from "@/lib/authBase";

interface Color {
  id: string;
  color: string;
}

const getColors = async (): Promise<Color[]> => {
  try {
    const response = await baseAxios.get("/colors");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los colores:", error);
    return [];
  }
};

const ColorsPage = async () => {
  const colors = await getColors();

  return (
    <section className="bg-white p-10 min-h-screen max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#4e4090] mb-8">Lista de Colores</h1>

      {colors.length === 0 ? (
        <p className="text-gray-600">No hay colores registrados.</p>
      ) : (
        <ul className="divide-y divide-gray-200 border border-gray-300 rounded-lg">
          {colors.map((color, index) => (
            <li
              key={color.id || index}
              className="p-4 text-gray-800 font-medium hover:bg-gray-50 transition"
            >
              {color.color}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ColorsPage;
