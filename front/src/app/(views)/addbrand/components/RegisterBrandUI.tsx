"use client";
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

const subCategoriaOptions = [
    { value: "trekking", label: "Trekking" },
    { value: "urbanas", label: "Urbanas" },
];

const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB

const brandSchema = yup.object().shape({
    nombreMarca: yup
        .string()
        .required("El nombre de la marca es obligatorio")
        .trim("No se permiten espacios en blanco")
        .min(1, "El nombre de la marca no puede estar vacío"),

    nombre: yup
        .string()
        .required("La clave es obligatoria")
        .trim("No se permiten espacios en blanco")
        .min(1, "La clave no puede estar vacía"),

    subCategoria: yup
        .array()
        .min(1, "Selecciona al menos una Sub-Categoría")
        .of(yup.string().required()),

    image: yup
        .mixed()
        .required("La imagen es obligatoria")
        .test("fileType", "Solo se permiten imágenes (jpeg, png)", (value) => {
            return value instanceof File && ["image/jpeg", "image/png"].includes(value.type);
        })
        .test("fileSize", "La imagen no debe superar los 2MB", (value) => {
            return value instanceof File && value.size <= FILE_SIZE_LIMIT;
        }),
});

const RegisterBrand = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
            <h2 className="text-2xl font-bold mb-10 pl-10 text-[#4e4090]">
                Registrar nueva Marca
            </h2>

            <Formik
                initialValues={{
                    nombreMarca: "",
                    nombre: "",
                    image: null,
                    subCategoria: [],
                }}
                validationSchema={brandSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log("Marca a registrar:", values);
                    // Llamada a api
                    toast.success("Marca registrada correctamente ✅");

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
                                        Nombre de la Marca:
                                    </label>
                                    <Field
                                        name="nombreMarca"
                                        type="text"
                                        placeholder="Nombre de la Marca"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <ErrorMessage
                                        name="nombreMarca"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-md font-semibold text-[#4e4090]">
                                        Clave de la Marca:
                                    </label>
                                    <Field
                                        name="nombre"
                                        type="text"
                                        placeholder="Clave de la Marca"
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
                                        Imagen de la Marca
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
                                        Sub-Categoría
                                    </label>
                                    <Select
                                        isMulti
                                        name="subCategoria"
                                        options={subCategoriaOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={(newValue: any) => {
                                            const values = newValue ? newValue.map((option: OptionType) => option.value) : [];
                                            setFieldValue("subCategoria", values);
                                        }}
                                    />
                                    <ErrorMessage
                                        name="subCategoria"
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

export default RegisterBrand;
