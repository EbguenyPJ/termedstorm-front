"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

interface ProductCSV {
  id_costo_producto: string;
  s_nombre_producto: string;
  n_costo_producto: string;
  stock: string;
  image: string;
}

const PriceUploadTable = () => {
  const [products, setProducts] = useState<ProductCSV[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse<ProductCSV>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data;
        if (data.some(d => !d.id_costo_producto || !d.s_nombre_producto || !d.n_costo_producto)) {
          toast.error("Archivo inválido o columnas incompletas");
          return;
        }

        setProducts(data);
        toast.success("Productos cargados");
      },
      error: () => toast.error("Error al procesar el archivo"),
    });
  };

  const handleSave = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/bulk`, products);
      toast.success("Precios guardados en base de datos");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar en base");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-seconady mb-4">Tabulador de Precios</h2>

      <div className="flex items-center justify-between mb-4">
        <label className="bg-accent hover:bg-[#0d0d0d] text-white px-4 py-2 rounded cursor-pointer">
          Cargar CSV
          <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
        </label>
        {fileName && <p className="text-sm text-gray-600 italic">{fileName}</p>}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-seconady text-white text-sm">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Imagen</th>
              <th className="py-2 px-4">Producto</th>
              <th className="py-2 px-4">Precio</th>
              <th className="py-2 px-4">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p, i) => (
                <tr key={i} className="text-center border-b text-sm">
                  <td className="py-2 px-4">{p.id_costo_producto}</td>
                  <td className="py-2 px-4">
                    <Image src={p.image} alt={p.s_nombre_producto} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4">{p.s_nombre_producto}</td>
                  <td className="py-2 px-4">${Number(p.n_costo_producto).toFixed(2)}</td>
                  <td className="py-2 px-4">{p.stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No hay productos cargados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          onClick={() => setProducts([])}
        >
          Limpiar
        </button>
        <button
          disabled={products.length === 0}
          className={`px-4 py-2 rounded text-white ${
            products.length === 0
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-700 hover:bg-seconady"
          }`}
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default PriceUploadTable;