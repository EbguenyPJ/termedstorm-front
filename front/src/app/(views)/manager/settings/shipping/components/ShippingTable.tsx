"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axiosInstance"
import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
import Notiflix from "notiflix";
import { SquarePen, Trash2 } from "lucide-react";


type Shipping = {
  id: number;
  name: string;
  date: string;
  totalProducts: number;
};


// const fakeShippings: Shipping[] = [
//   { id: 1, name: "Entrada Inicial", date: "2024-06-01", totalProducts: 100 },
//   { id: 2, name: "Reposición Semanal", date: "2024-06-05", totalProducts: 50 },
//   { id: 3, name: "Ingreso Especial", date: "2024-06-08", totalProducts: 75 },
//   { id: 4, name: "Promo Invierno", date: "2024-06-10", totalProducts: 120 },
//   { id: 5, name: "Stock Nuevo", date: "2024-06-12", totalProducts: 60 },
//   { id: 6, name: "Reabastecimiento", date: "2024-06-14", totalProducts: 90 },
//   { id: 7, name: "Lote Extra", date: "2024-06-17", totalProducts: 30 },
//   { id: 8, name: "Entrega Urgente", date: "2024-06-20", totalProducts: 40 },
//   { id: 9, name: "Entrada Mensual", date: "2024-06-22", totalProducts: 110 },
//   { id: 10, name: "Ingreso Especial 2", date: "2024-06-24", totalProducts: 85 },
//   { id: 11, name: "Refuerzo Stock", date: "2024-06-26", totalProducts: 70 },
// ];


// CARGAR ENTRADA. POST CSV: 
// DESCRIPCION, 
// UPDATE: MISMO MODAL

const EntriesPage = () => {
  const [shippings, setShippings] = useState<Shipping[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Shipping>>({});
  const itemsPerPage = 10;


  useEffect(() => {
    fetchShippings();
  }, []);

  const fetchShippings = async () => {
    try {
      const res = await api.get("/shipments");
      setShippings(res.data);
    } catch (err) {
      console.error("Error al cargar embarques:", err);
    }
  };

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      try {
        await api.put(`/shipments/${editingId}`, formData);
        Notiflix.Notify.success("Entrada actualizada correctamente.");
        setEditingId(null);
        setShowForm(false);
        setFormData({});
        fetchShippings();
      } catch (err) {
        console.error("Error al actualizar entrada:", err);
        Notiflix.Notify.failure("No se pudo actualizar la entrada.");
      }
      return;
    }

    if (!file) return Notiflix.Notify.failure("Debés subir un archivo CSV válido.");

    const csvData = new FormData();
    csvData.append("file", file);

    try {
      await api.post("/shipments", csvData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Notiflix.Notify.success("Entrada cargada exitosamente.");
      setFile(null);
      setShowForm(false);
      fetchShippings();
    } catch (err) {
      console.error("Error al cargar entrada:", err);
      Notiflix.Notify.failure("No se pudo cargar la entrada.");
    }
  };

  const editShipping = async (id: number) => {
    try {
      const res = await api.get(`/shipments/${id}`);
      setFormData(res.data);
      setEditingId(id);
      setShowForm(true);
    } catch (err) {
      console.error("Error al obtener embarque:", err);
      Notiflix.Notify.failure("No se pudo cargar el embarque para edición.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "totalProducts" ? Number(value) : value });
  };

  const deleteShipping = async (id: number) => {
    Notiflix.Confirm.show(
      'Eliminar embarque',
      '¿Estás seguro de que querés eliminar este embarque?',
      'Sí, eliminar',
      'Cancelar',
      async () => {
        try {
          await api.delete(`/shipments/${id}`);
          fetchShippings();
          Notiflix.Notify.success("Embarque eliminado correctamente.");
        } catch (err) {
          console.error("Error al eliminar embarque:", err);
          Notiflix.Notify.failure("No se pudo eliminar el embarque.");
        }
      },
      () => {
        Notiflix.Notify.info("Eliminación cancelada.");
      }
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shippings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(shippings.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Entradas</h2>

      <div className="flex items-center justify-between mb-4">
        <ButtonAccent
          className="bg-accent hover:bg-[#0d0d0d] text-white px-4 py-2 rounded"
          textContent="Cargar Entrada"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({});
          }}
        />
      </div>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="border border-gray-300 rounded p-4 mb-6 bg-gray-50"
        >
          {editingId ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                className="border px-3 py-2 rounded"
                value={formData.name || ""}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="date"
                className="border px-3 py-2 rounded"
                value={formData.date || ""}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="totalProducts"
                placeholder="Total Productos"
                className="border px-3 py-2 rounded"
                value={formData.totalProducts || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="file"
                accept=".csv"
                className="border px-3 py-2 rounded"
                onChange={handleCsvChange}
                required
              />
            </div>
          )}
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({});
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-secondary text-white text-sm">
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
                  <td className="py-2 px-4">
                    {(currentPage - 1) * itemsPerPage + i + 1}
                  </td>
                  <td className="py-2 px-4">{ship.name}</td>
                  <td className="py-2 px-4">
                    {new Date(ship.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{ship.totalProducts}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => editShipping(ship.id)}
                    >
                      <SquarePen size={18}/>
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => deleteShipping(ship.id)}
                    >
                      <Trash2 size={18}/>
                    </button>
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

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-accent text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntriesPage;
