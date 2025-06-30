"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { SquarePen, ChevronDown, ChevronUp } from "lucide-react";
import Notiflix from "notiflix";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ButtonAccent, ButtonPrimary } from "@/components/UI/Buttons/Buttons";
import { routes } from "@/app/routes";

interface Audit {
  id: string;
  date: string;
  note: string;
  total: number;
}

interface Cut {
  id: string;
  date: string;
  note: string;
  total: number;
  auditId: string;
}

const CashierOverview = () => {
  const router = useRouter();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [expandedAuditId, setExpandedAuditId] = useState<string | null>(null);
  const [cuts, setCuts] = useState<Record<string, Cut[]>>({});
  const [editingAudit, setEditingAudit] = useState<Audit | null>(null);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    try {
      const res = await api.get("/audits");
      setAudits(res.data);
    } catch (err) {
      console.error("Error al obtener auditorías:", err);
    }
  };

  const fetchCuts = async (auditId: string) => {
    try {
      const res = await api.get("/cuts", { params: { audit_id: auditId } });
      setCuts((prev) => ({ ...prev, [auditId]: res.data }));
    } catch (err) {
      console.error("Error al obtener cortes:", err);
    }
  };

  const handleToggle = (auditId: string) => {
    if (expandedAuditId === auditId) {
      setExpandedAuditId(null);
    } else {
      setExpandedAuditId(auditId);
      if (!cuts[auditId]) fetchCuts(auditId);
    }
  };

  const handleUpdateAudit = async () => {
  if (!editingAudit) return;

  if (!noteInput.trim()) {
    Notiflix.Notify.warning("La nota no puede estar vacía.");
    return;
  }

  try {
    await api.put(`/audits/${editingAudit.id}`, { note: noteInput });
    toast.success("Arqueo actualizado correctamente.")
    setEditingAudit(null);
    fetchAudits(); // refresca la tabla
  } catch (err) {
    console.error("Error al actualizar auditoría:", err);
    toast.error("No se pudo actualizar el arqueo.")
  }
};

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">
          Historial de Arqueos
        </h2>
        <div className="flex gap-2">
          <ButtonPrimary onClick={() => router.push(routes.manager.cashier.audits)} textContent="Nuevo Arqueo"/>
          <ButtonAccent onClick={() => router.push(routes.manager.cashier.cuts)} textContent="Crear Corte"/>
        </div>
      </div>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-secondary text-white">
          <tr>
            <th className="py-2 px-4">Fecha</th>
            <th className="py-2 px-4">Nota</th>
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <React.Fragment key={audit.id}>
              <tr className="border-b text-center text-gray-800">
                <td className="py-3 px-4">
                  {new Date(audit.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{audit.note}</td>
                <td className="py-3 px-4">${typeof audit.total === "number" ? audit.total.toFixed(2) : "0.00"}</td>
                <td className="py-3 px-4 flex justify-center gap-3">
                  <button
                    className="text-neutral-700 hover:text-neutral-800 cursor-pointer"
                    onClick={() => {
                      setEditingAudit(audit);
                      setNoteInput(audit.note || "");
                    }}
                  >
                    <SquarePen size={18} />
                  </button>
                  <button onClick={() => handleToggle(audit.id)}>
                    {expandedAuditId === audit.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </td>
              </tr>
              {expandedAuditId === audit.id && cuts[audit.id] && (
                <tr>
                  <td colSpan={4} className="bg-gray-50">
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">Cortes de Caja</h4>
                      <ul className="list-disc list-inside text-left text-sm">
                        {cuts[audit.id].length > 0 ? (
                          cuts[audit.id].map((cut) => (
                            <li key={cut.id}>
                              {new Date(cut.date).toLocaleDateString()} -{" "}
                              {cut.note} - ${typeof cut.total === "number" ? cut.total.toFixed(2) : "0.00"}
                            </li>
                          ))
                        ) : (
                          <li>No hay cortes registrados.</li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {editingAudit && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h3 className="text-lg font-bold mb-4">Editar Arqueo #{editingAudit.id}</h3>
      <label className="block mb-2 text-sm font-medium">Nota o descripción</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-4"
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="Ej: Revisión cierre turno"
      />
      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => setEditingAudit(null)}
        >
          Cancelar
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleUpdateAudit}
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

export default CashierOverview;




