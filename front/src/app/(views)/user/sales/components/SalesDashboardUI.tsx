"use client";

import React, { useEffect, useState } from "react";
// import axios from "axios";

type Sale = {
  id: number;
  client: string;
  email: string;
  date: string;
  total: number;
  status: "PAID" | "PENDING" | "UNPAID" | "OVERDUE";
};

// const dateRanges = [
//   { label: "Últimos 30 días", value: "30" },
//   { label: "Últimos 90 días", value: "90" },
//   { label: "Último año", value: "365" },
// ];

const mockSales: Sale[] = [
  {
    id: 1,
    client: "Juan Pérez",
    email: "juan@gmail.com",
    date: "2024-06-01T15:00:00Z",
    total: 15500,
    status: "PAID",
  },
  {
    id: 2,
    client: "Ana Gómez",
    email: "ana@gmail.com",
    date: "2024-06-10T15:00:00Z",
    total: 7200,
    status: "PENDING",
  },
  {
    id: 3,
    client: "Carlos López",
    email: "carlos@gmail.com",
    date: "2024-05-28T12:00:00Z",
    total: 4600,
    status: "UNPAID",
  },
  {
    id: 4,
    client: "María Rodríguez",
    email: "maria@gmail.com",
    date: "2024-04-15T10:00:00Z",
    total: 19000,
    status: "OVERDUE",
  },
  {
    id: 5,
    client: "Sofía Martínez",
    email: "sofia@gmail.com",
    date: "2024-06-16T08:00:00Z",
    total: 8500,
    status: "PAID",
  },
  {
    id: 6,
    client: "Luciano Vega",
    email: "luciano@gmail.com",
    date: "2024-06-17T13:30:00Z",
    total: 3000,
    status: "PENDING",
  },
  {
    id: 7,
    client: "Florencia Ruiz",
    email: "florencia@gmail.com",
    date: "2024-03-01T09:30:00Z",
    total: 14200,
    status: "OVERDUE",
  },
];

const SalesDashboard = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  // const [range, setRange] = useState("30");

  useEffect(() => {
    // axios
    //   .get(`${process.env.NEXT_PUBLIC_API_URL}/sales/my-sales?days=${range}`)
    //   .then((res) => setSales(res.data))
    //   .catch((err) => console.error("Error al obtener ventas:", err));
    setSales(mockSales); // Usar datos simulados en lugar de la API
  }, []); //range

  const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
  const paid = sales.filter((s) => s.status === "PAID").length;
  const pending = sales.filter((s) => s.status === "PENDING").length;
  const overdue = sales.filter((s) => s.status === "OVERDUE").length;

  const statusLabels: Record<Sale["status"], string> = {
    PAID: "Pagado",
    PENDING: "Pendiente",
    UNPAID: "No Pagado",
    OVERDUE: "Vencido",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Mis Ventas</h2>
        {/* <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {dateRanges.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select> */}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl border-primary-20 shadow">
          <p className="text-sm">Total vendido</p>
          <h3 className="text-xl font-bold">${totalSales.toFixed(2)}</h3>
        </div>
        <div className="p-4 rounded-xl border-primary-20 shadow">
          <p className="text-sm">Ventas pagadas</p>
          <h3 className="text-xl font-bold">{paid}</h3>
        </div>
        <div className="p-4 rounded-xl border-primary-20 shadow">
          <p className="text-sm">Pendientes</p>
          <h3 className="text-xl font-bold">{pending}</h3>
        </div>
        <div className="p-4 rounded-xl border-primary-20 shadow">
          <p className="text-sm">Vencidas</p>
          <h3 className="text-xl font-bold">{overdue}</h3>
        </div>
      </div>

      {/* Tabla de ventas */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Cliente</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Fecha</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b text-center text-gray-800">
                <td className="py-3 px-4">#{sale.id}</td>
                <td className="py-3 px-4">{sale.client}</td>
                <td className="py-3 px-4">{sale.email}</td>
                <td className="py-3 px-4">
                  {new Date(sale.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">${sale.total.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-2 rounded-full text-xs font-bold ${
                      sale.status === "PAID"
                        ? "bg-green-100 text-green-800"
                        : sale.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : sale.status === "OVERDUE"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {statusLabels[sale.status]}
                  </span>
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
