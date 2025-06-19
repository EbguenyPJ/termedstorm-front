"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import toast from "react-hot-toast";
import axios from "axios";
// import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
// import { baseAxios } from "@/lib/authBase";

const mockData = [
  {
    id: 1,
    name: "Zapatilla Nike Air",
    image: "/images/zapatilla.jpg",
    price: 15999,
    stock: 12,
  },
  {
    id: 2,
    name: "Remera Adidas",
    image: "/images/remera.jpg",
    price: 8999,
    stock: 5,
  },
];

const PriceTable = () => {
  const [products, setProducts] = useState(mockData);
  const [loading, setLoading] = useState(false);

  console.log(setProducts);
  console.log(setLoading);
  
  /*
  useEffect(() => {
    setLoading(true);
    baseAxios
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
        toast.error("Error al cargar productos");
      })
      .finally(() => setLoading(false));
  }, []);
  */

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (result: any) => {
          const parsedData = result.data;

          console.log("📥 CSV parseado:", parsedData);

          try {
            // const response =
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/products/bulk`,
              parsedData
            );
            toast.success("Productos cargados correctamente");
            // 👇 Podés actualizar la tabla si querés después de guardar
            // setProducts(response.data);
          } catch (error) {
            console.error(" Error al guardar productos:", error);
            toast.error("Error al guardar los productos");
          }
        },
        error: (err) => {
          console.error(" Error al leer CSV:", err);
          toast.error("Error al leer el archivo CSV");
        },
      });
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold text-purple-900 mb-4">
        📑 Tabulador <span className="text-purple-600">de precios</span>
      </h2>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-700">
          Lista actual de precios por producto:
        </p>

        <div className="flex gap-2">
          <label className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded cursor-pointer">
            Rango
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
          <label className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded cursor-pointer">
            Cargar Precios
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando productos...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-purple-800 text-white text-sm">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Imagen</th>
                <th className="py-2 px-4">Producto</th>
                <th className="py-2 px-4">Precio</th>
                <th className="py-2 px-4">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="text-center text-sm border-b">
                  <td className="py-2 px-4">{prod.id}</td>
                  <td className="py-2 px-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{prod.name}</td>
                  <td className="py-2 px-4">${prod.price.toFixed(2)}</td>
                  <td className="py-2 px-4">{prod.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PriceTable;
