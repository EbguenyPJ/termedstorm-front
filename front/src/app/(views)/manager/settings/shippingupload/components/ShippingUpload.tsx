"use client";

import api from "@/lib/axiosInstance";
import React, { useState } from "react";
// import axios from "@/lib/axiosInstance";

const ShippingUpload = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/shippings", {
        name,
        date,
        totalProducts,
      });

      setName("");
      setDate("");
      setTotalProducts(0);
      setSuccess("¡Entrada creada exitosamente!");
    } catch (err: any) {
      console.error("Error al crear embarque:", err);
      setError("No se pudo crear el embarque.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-4 text-primary">Cargar nueva entrada</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Fecha</label>
        <input
          type="date"
          value={date}
          required
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Total de productos</label>
        <input
          type="number"
          value={totalProducts}
          min={0}
          required
          onChange={(e) => setTotalProducts(parseInt(e.target.value))}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-white px-4 py-2 rounded hover:bg-black disabled:opacity-50"
      >
        {loading ? "Cargando..." : "Crear entrada"}
      </button>
    </form>
  );
};

export default ShippingUpload;
