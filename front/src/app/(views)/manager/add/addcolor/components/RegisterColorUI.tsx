"use client"

import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
import toast from "react-hot-toast";
import api from "@/lib/axiosInstance";
import { colorOptions } from "./options/OptionColors";
import Select from "react-select";

interface RegisterColorProps {
  onColorRegistered: () => void;
}

const colorSchema = yup.object().shape({
  color: yup

    .string()
    .required("El color es obligatorio")
    .trim("No se permiten espacios en blanco")
    .min(1, "El color no puede estar vacío"),
});

const RegisterColor = ({ onColorRegistered }: RegisterColorProps) => {
  const [selectedColor, setSelectedColor] = useState<{
    value: string;
    label: string;
  } | null>(null);

  return (
    <section>
      <Formik
        initialValues={{
          color: "",
        }}
        validationSchema={colorSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            console.log("Color a registrar:", values);
            await api.post("/colors", values);
            toast.success("Color registrado correctamente");
            resetForm();
            setSelectedColor(null);
            onColorRegistered();
          } catch (error: any) {
            console.error("Error al registrar el color:", error.response?.data || error.message);
            toast.error("Ocurrió un error al registrar el color");
          }
        }}
      >

        {({ setFieldValue }) => (
          <Form>
            <div className="w-full max-w-3xl mx-auto px-10">
              <h2 className="text-2xl font-bold mb-10 text-[#4e4090]">
                Registrar nuevo Color
              </h2>
              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090] mb-1">
                    Seleccioná un color reconocido por HTML
                  </label>
                  <Select
                    name="color"
                    options={colorOptions}
                    className="basic-single"
                    classNamePrefix="select"
                    value={selectedColor}
                    onChange={(newValue: any) => {
                      setSelectedColor(newValue);
                      setFieldValue("color", newValue.value);
                    }}
                  />
                  <ErrorMessage
                    name="color"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  {/* VISTA PREVIA DEL COLOR */}
                  {selectedColor && (
                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-gray-700">Vista previa:</span>
                      <div
                        className="w-10 h-10 rounded-full border"
                        style={{ backgroundColor: selectedColor.value }}
                      ></div>
                      <span className="text-gray-600">{selectedColor.label}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <ButtonAccent type="submit" textContent="GUARDAR" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterColor;