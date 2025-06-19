"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
  name: string;
  email: string;
  role: "admin" | "cliente" | "gerente";
};

type Order = {
  id: number;
  date: string;
  total: number;
  status: string;
  paymentMethod: string;
};

const ProfileClient = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulación - Reemplazá por axios.get("/user/me") si tenés token
    const mockUser: User = {
      name: "Juan Pérez",
      email: "juanperez@gmail.com",
      role: "cliente", // o admin, gerente
    };

    // const mockOrders: Order[] = [
    //   {
    //     id: 1,
    //     date: "2023-10-01T12:00:00Z",
    //     total: 59.99,
    //     status: "Completada",
    //     paymentMethod: "Tarjeta de crédito",
    //   },
    //   {
    //     id: 2,
    //     date: "2023-10-05T15:30:00Z",
    //     total: 89.5,
    //     status: "Pendiente",
    //     paymentMethod: "MercadoPago",
    //   },
    // ];

    setUser(mockUser);

    if (mockUser.role === "cliente") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error al obtener órdenes:", err));
    }
  }, []);

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-bold mb-4 text-purple-800">
        Perfil de Usuario
      </h2>

      <div className="mb-6">
        <p>
          <span className="font-semibold text-gray-700">Nombre:</span>{" "}
          {user.name}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Email:</span>{" "}
          {user.email}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Rol:</span> {user.role}
        </p>
      </div>

      {user.role === "cliente" && (
        <>
          <h3 className="text-xl font-semibold mb-3 text-purple-700">
            🧾 Historial de Órdenes
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-purple-800 text-white text-sm">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Fecha</th>
                  <th className="py-2 px-4">Método de pago</th>{" "}
                  {/* 👈 nueva columna */}
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="text-center border-b text-sm">
                      <td className="py-2 px-4">{order.id}</td>
                      <td className="py-2 px-4">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">{order.paymentMethod}</td>{" "}
                      {/* 👈 aquí también */}
                      <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                      <td className="py-2 px-4">{order.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      No hay órdenes registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileClient;
