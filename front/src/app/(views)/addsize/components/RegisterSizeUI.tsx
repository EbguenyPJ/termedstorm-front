"use client";
import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
import InputFormik from "@/components/UI/Inputs/InputFormik";
import toast from "react-hot-toast";
import { baseAxios } from "@/lib/authBase";

const sizeSchema = yup.object().shape({
  size_us: yup
    .number()
    .typeError("Debe ser un número")
    .required("El talle US es obligatorio"),
  size_eur: yup
    .number()
    .typeError("Debe ser un número")
    .required("El talle EUR es obligatorio"),
  size_cm: yup
    .number()
    .typeError("Debe ser un número")
    .required("El talle CM es obligatorio"),
});

const RegisterSize = () => {
  return (
    <section className="bg-white rounded-lg shadow-xl p-8 min-w-[90vw] max-w-[800px] min-h-[70vh] overflow-auto">
      <h2 className="text-2xl font-bold mb-10 text-[#4e4090]">Registrar nuevo Talle</h2>

      <Formik
        initialValues={{
          size_us: "",
          size_eur: "",
          size_cm: "",
        }}
        validationSchema={sizeSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await baseAxios.post("/sizes", {
              size_us: Number(values.size_us),
              size_eur: Number(values.size_eur),
              size_cm: Number(values.size_cm),
            });

            toast.success("Talle registrado correctamente");
            resetForm();
          } catch (error: any) {
            console.error("Error al registrar el talle:", error.response?.data || error.message);
            toast.error("Ocurrió un error al registrar el talle");
          }
        }}
      >
        {() => (
          <Form>
            <div className="border border-gray-300 p-6 bg-white rounded-lg space-y-4">
              <InputFormik
                name="size_us"
                label="Talle US:"
                type="number"
                placeholder="Ej: 8.5"
              />

              <InputFormik
                name="size_eur"
                label="Talle EUR:"
                type="number"
                placeholder="Ej: 42"
              />

              <InputFormik
                name="size_cm"
                label="Talle CM:"
                type="number"
                placeholder="Ej: 26.5"
              />
            </div>

            <div className="flex justify-end mt-6">
              <ButtonAccent type="submit" textContent="GUARDAR" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterSize;
