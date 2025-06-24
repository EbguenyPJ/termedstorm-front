"use client"
import React from "react";
import { Formik, Form} from "formik";
import * as yup from "yup";
import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
import toast from "react-hot-toast";
import InputFormik from "@/components/UI/Inputs/InputFormik";
import api from "@/lib/axiosInstance";

const colorSchema = yup.object().shape({
  color: yup
    .string()
    .required("El color es obligatorio")
    .trim("No se permiten espacios en blanco")
    .min(1, "El color no puede estar vacío"),
});

const RegisterColor = () => {
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
          } catch (error: any) {
            console.error("Error al registrar el color:", error.response?.data || error.message);
            toast.error("Ocurrió un error al registrar el color");
          }
        }}
      >
        {() => (
          <Form>
            <div className="w-full max-w-3xl mx-auto px-10">
              <h2 className="text-2xl font-bold mb-10 text-[#4e4090]">
                Registrar nuevo Color
              </h2>
              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <div className="mb-4">
                  <InputFormik
                    name="color"
                    label="Nombre del Color:"
                    type="text"
                    placeholder="Ej: Negro"
                  />
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
  )
}

export default RegisterColor;
