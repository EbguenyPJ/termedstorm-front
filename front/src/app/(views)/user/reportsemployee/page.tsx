"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axiosInstance"
import { SquarePen, Trash2 } from "lucide-react";
import Notiflix from "notiflix";

interface Client {
  first_name: string;
  last_name: string;
  email: string;
}

interface Order {
  id: string;
  folio: number;
  date: string;
  time: string;
  total_order: number;
  payment_method: string;
  status: string;
  client?: Client | null;
}

const MySales = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [statusInput, setStatusInput] = useState("");


  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const res = await api.get("/orders/my"); // <-- Endpoint que debe filtrar por employee
      setOrders(res.data);
    } catch (err) {
      console.error("Error al obtener órdenes:", err);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await api.get(`/orders/${id}`);
      setEditingOrder(res.data);
      setStatusInput(res.data.status || "");
    } catch (err) {
      console.error("Error al obtener orden:", err);
      Notiflix.Notify.failure("No se pudo obtener la orden.");
    }
  };


const handleUpdate = async () => {
    if (!editingOrder) return;
    try {
      await api.put(`/orders/${editingOrder.id}`, { status: statusInput });
      Notiflix.Notify.success("Orden actualizada.");
      setEditingOrder(null);
      fetchMyOrders();
    } catch (err) {
      console.error("Error al actualizar orden:", err);
      Notiflix.Notify.failure("No se pudo actualizar la orden.");
    }
  };

  const handleCancel = async (id: string) => {
    Notiflix.Confirm.show(
      "Cancelar orden",
      "¿Estás seguro de cancelar esta orden?",
      "Sí",
      "No",
      async () => {
        try {
          await api.delete(`/orders/${id}`);
          fetchMyOrders();
          Notiflix.Notify.success("Orden cancelada.");
        } catch (err) {
          console.error("Error al cancelar orden:", err);
          Notiflix.Notify.failure("No se pudo cancelar la orden.");
        }
      }
    );
  };


return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Mis Ventas</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-secondary text-sm">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="py-2 px-4">Fecha</th>
              <th className="py-2 px-4">Cliente</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Método</th>
              <th className="py-2 px-4">Estado</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b text-center">
                <td className="py-2 px-4">
                  {new Date(order.date + "T" + order.time).toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  {order.client
                    ? `${order.client.first_name} ${order.client.last_name}`
                    : "Sin cliente"}
                </td>
                <td className="py-2 px-4">${order.total_order.toFixed(2)}</td>
                <td className="py-2 px-4">{order.payment_method}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4 flex justify-center gap-2">
                  <button
                    className="text-blue-600"
                    onClick={() => handleEdit(order.id)}
                  >
                    <SquarePen size={18} />
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleCancel(order.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            Aún no registraste ventas.
          </p>
        )}
      </div>

      {/* Modal de edición */}
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              Editar estado orden #{editingOrder.folio}
            </h3>
            <label className="block mb-2 text-sm font-medium">Estado</label>
            <select
              className="w-full border px-3 py-2 rounded mb-4"
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
            >
              <option value="">Seleccionar estado</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditingOrder(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySales;
