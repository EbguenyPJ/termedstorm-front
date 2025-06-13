"use client"
import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const Select = dynamic(() => import("react-select"), { ssr: false });

type OptionType = {
    value: string;
    label: string;
};

const categoriaOptions = [
    { value: "trekking", label: "Trekking" },
    { value: "urbanas", label: "Urbanas" },
];

const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB

// Validación con Yup
const subCategorySchema = yup.object().shape({
    nombreSubCategoria: yup
        .string()
        .required("El nombre de la Sub-Categoria es obligatorio")
        .trim("No se permiten espacios en blanco")
        .min(1, "El nombre no puede estar vacío"),

    nombre: yup
        .string()
        .required("La clave es obligatoria")
        .trim("No se permiten espacios en blanco")
        .min(1, "La clave no puede estar vacía"),

    categoria: yup
        .array()
        .min(1, "Selecciona al menos una categoría")
        .of(yup.string().required()),

    image: yup
        .mixed()
        .required("La imagen es obligatoria")
        .test("fileType", "Solo se permiten imágenes (jpeg, png)", (value) => {
            return (
                !value || (value instanceof File && ["image/jpeg", "image/png"].includes(value.type))
            );
        })
        .test("fileSize", "La imagen no debe superar los 2MB", (value) => {
            return !value || (value instanceof File && value.size <= FILE_SIZE_LIMIT);
        }),
});

const RegisterSubCategory = () => {
      const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
            <h2 className="text-2xl font-bold mb-10 pl-10 text-[#4e4090]">
                Registrar nueva Sub-Categoria
            </h2>

            <Formik
                initialValues={{
                    nombreSubCategoria: "",
                    nombre: "",
                    image: null,
                    categoria: [],
                }}
                validationSchema={subCategorySchema}
                onSubmit={(values, { resetForm }) => {
                    console.log("Subcategoría a registrar:", values);
                    // Llamada a api
                    toast.success("Subcategoría registrada correctamente ✅");

                    resetForm();

                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-10">

                            <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                                <div className="mb-4">
                                    <label className="block text-md font-semibold text-[#4e4090]">
                                        Nombre de la Sub-Categoria:
                                    </label>
                                    <Field
                                        name="nombreSubCategoria"
                                        type="text"
                                        placeholder="Nombre de la Sub-Categoria"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <ErrorMessage
                                        name="nombreSubCategoria"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-md font-semibold text-[#4e4090]">
                                        Clave de la Sub-Categoria:
                                    </label>
                                    <Field
                                        name="nombre"
                                        type="text"
                                        placeholder="Clave de la Sub-Categoria"
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
                                        Imagen de la Sub-Categoria
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

                            <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                                <div className="mb-4">
                                    <label className="block text-md font-semibold text-[#4e4090]">
                                        Categoria
                                    </label>
                                    <Select
                                        isMulti
                                        name="categoria"
                                        options={categoriaOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={(newValue: any) => {
                                            const values = newValue ? newValue.map((option: OptionType) => option.value) : [];
                                            setFieldValue("categoria", values);
                                        }}
                                    />
                                    <ErrorMessage
                                        name="categoria"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6 mr-10">
                            <ButtonAccent type="submit" textContent="GUARDAR" />
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
};

export default RegisterSubCategory;
