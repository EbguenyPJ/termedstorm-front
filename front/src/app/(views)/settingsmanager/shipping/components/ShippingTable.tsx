"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type Shipping = {
  id: number;
  name: string;
  date: string;
  totalProducts: number;
};

const ShippingTable = () => {
  const [shippings, setShippings] = useState<Shipping[]>([]);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/shippings`)
      .then((res) => setShippings(res.data))
      .catch((err) => console.error("Error al cargar embarques:", err));
  }, []);

  const filtered = shippings.filter((ship) =>
    ship.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white rounded-md shadow max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Entradas
      </h2>

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar"
          className="border-b border-gray-400 px-2 py-1 focus:outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button className="bg-accent hover:bg-[#0d0d0d] text-white px-4 py-2 rounded">
          Cargar Entrada
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-purple-800 text-white text-sm">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Fecha</th>
              <th className="py-2 px-4">Total Productos</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((ship, i) => (
                <tr key={ship.id} className="text-center border-b text-sm">
                  <td className="py-2 px-4">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td className="py-2 px-4">{ship.name}</td>
                  <td className="py-2 px-4">{new Date(ship.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{ship.totalProducts}</td>
                  <td className="py-2 px-4">
                    <button className="text-black hover:underline mr-2">Ver</button>
                    <button className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No hay embarques disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Items per page:&nbsp;
          <select
            className="border rounded px-2 py-1"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50].map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ◀
          </button>
          <span>
            {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingTable;
