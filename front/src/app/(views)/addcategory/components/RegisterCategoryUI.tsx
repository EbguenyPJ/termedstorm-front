"use client"
import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "../../../../components/ui/Buttons/Buttons";
import toast from "react-hot-toast";

const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB

const categorySchema = yup.object().shape({
  nombreCategoria: yup
    .string()
    .required("El nombre de la categoría es obligatorio")
    .trim("No se permiten espacios en blanco")
    .min(1, "El nombre de la categoría no puede estar vacío"),

  nombre: yup
    .string()
    .required("La clave es obligatoria")
    .trim("No se permiten espacios en blanco")
    .min(1, "La clave no puede estar vacía"),

  image: yup
    .mixed()
    .required("La imagen es obligatoria")
    .test("fileType", "Solo se permiten imágenes (jpeg, png)", (value) => {
      return (
        value instanceof File &&
        ["image/jpeg", "image/png"].includes(value.type)
      );
    })
    .test("fileSize", "La imagen no debe superar los 2MB", (value) => {
      return value instanceof File && value.size <= FILE_SIZE_LIMIT;
    }),
});

const RegisterCategory = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
      <h2 className="text-2xl font-bold mb-10 pl-38 text-[#4e4090]">
        Registrar nueva Categoria
      </h2>

      <Formik
        initialValues={{
          nombre: "",
          nombreCategoria: "",
          image: null,
        }}
        validationSchema={categorySchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Categoría a registrar:", values);
          // Llamada a api
          toast.success("Categoría registrada correctamente ✅");

          resetForm();

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="w-full max-w-4xl mx-auto px-10">
              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Nombre de la Categoria:
                  </label>
                  <Field
                    name="nombreCategoria"
                    type="text"
                    placeholder="Nombre de la Categoria"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="nombreCategoria"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Clave de la Categoria:
                  </label>
                  <Field
                    name="nombre"
                    type="text"
                    placeholder="Clave de la Categoria"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Imagen de la Categoria
                  </label>
                  <input
                    name="image"
                    type="file"
                    className="w-full border border-gray-300 rounded p-2"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      setFieldValue("image", file);
                    }}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 mr-38">
              <ButtonAccent type="submit" textContent="GUARDAR" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterCategory;
