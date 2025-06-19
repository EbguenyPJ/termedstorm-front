"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type Sale = {
  id: number;
  client: string;
  email: string;
  date: string;
  total: number;
  status: "PAID" | "PENDING" | "UNPAID" | "OVERDUE";
};

const dateRanges = [
  { label: "Últimos 30 días", value: "30" },
  { label: "Últimos 90 días", value: "90" },
  { label: "Último año", value: "365" },
];


// const mockSales: Sale[] = [
//   {
//     "id": 1,
//     "client": "Juan Pérez",
//     "email": "juan@gmail.com",
//     "date": "2024-06-01T15:00:00Z",
//     "total": 15500,
//     "status": "PAID"
//   },
//   {
//     "id": 2,
//     "client": "Ana Gómez",
//     "email": "ana@gmail.com",
//      "date": "2024-06-01T15:00:00Z",
//     "total": 15500,
//     "status": "PAID",
//   }
// ]

    
const SalesDashboard = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [range, setRange] = useState("30");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/sales/my-sales?days=${range}`)
      .then((res) => setSales(res.data))
      .catch((err) => console.error("Error al obtener ventas:", err));
  }, [range]);

  const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
  const paid = sales.filter((s) => s.status === "PAID").length;
  const pending = sales.filter((s) => s.status === "PENDING").length;
  const overdue = sales.filter((s) => s.status === "OVERDUE").length;

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800">📊 Mis Ventas</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {dateRanges.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
          <p className="text-sm">Total vendido</p>
          <h3 className="text-xl font-bold">${totalSales.toFixed(2)}</h3>
        </div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow">
          <p className="text-sm">Ventas pagadas</p>
          <h3 className="text-xl font-bold">{paid}</h3>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow">
          <p className="text-sm">Pendientes</p>
          <h3 className="text-xl font-bold">{pending}</h3>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow">
          <p className="text-sm">Vencidas</p>
          <h3 className="text-xl font-bold">{overdue}</h3>
        </div>
      </div>

      {/* Tabla de ventas */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Cliente</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Fecha</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Estado</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b text-center">
                <td className="py-2 px-4">#{sale.id}</td>
                <td className="py-2 px-4">{sale.client}</td>
                <td className="py-2 px-4">{sale.email}</td>
                <td className="py-2 px-4">
                  {new Date(sale.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">${sale.total.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      sale.status === "PAID"
                        ? "bg-green-200 text-green-800"
                        : sale.status === "PENDING"
                        ? "bg-yellow-200 text-yellow-800"
                        : sale.status === "OVERDUE"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {sale.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button className="text-blue-600 hover:underline mr-2">Ver</button>
                  <button className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sales.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No hay ventas en este período.
          </p>
        )}
      </div>
    </div>
  );
};

export default SalesDashboard;
