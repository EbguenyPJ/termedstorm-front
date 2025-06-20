"use client";
import React, { useState } from "react";
import { FieldArray, Field, ErrorMessage } from "formik";
import VariantProduct2 from "./VariantProduct2";
import CloudinaryButton from "@/components/UI/Buttons/CloudinaryButton";
import Image from "next/image";

interface Props {
    name: string;
}

interface Variante {
    color: string;
    image: string; 
    descripcion: string;
    variants2: {
        talle: string;
        stock: number | string;
    }[]
}

const VariantProduct: React.FC<Props> = ({ name }) => {
    const [showVariant2, setShowVariant2] = useState<boolean[]>([]);

    return (
        <FieldArray name={name}>
            {({ push, remove, form }) => (
                <div className="border border-gray-300 p-6 rounded-lg mt-6 bg-gray-50">
                    <h3 className="text-xl font-bold text-[#4e4090] mb-4">Variantes del Producto</h3>

                    {(form.values[name] as Variante[]).map((variante, index: number) => (
                        <div
                            key={index}
                            className="border border-[#d3d3d3] p-4 rounded-lg mb-4 bg-white flex flex-col gap-2"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block font-semibold text-[#4e4090]">Color</label>
                                    <Field
                                        name={`${name}[${index}].color`}
                                        placeholder="Ej. Rojo"
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                    <ErrorMessage
                                        name={`${name}[${index}].color`}
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#4e4090]">Descripción</label>
                                    <Field
                                        name={`${name}[${index}].descripcion`}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Ej. Color vibrante ideal para verano"
                                    />
                                    <ErrorMessage
                                        name={`${name}[${index}].descripcion`}
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-md font-semibold text-[#4e4090]">
                                    Imagen de la Variante:
                                </label>
                                <CloudinaryButton
                                    onUploadSuccess={(url: string) =>
                                        form.setFieldValue(`${name}[${index}].image`, url)
                                    }
                                />
                                {variante.image && (
                                    <div className="w-20 h-20 relative border rounded overflow-hidden mt-2">
                                        <Image
                                            src={variante.image}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <ErrorMessage
                                    name={`${name}[${index}].image`}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-600 hover:underline"
                                >
                                    Eliminar variante
                                </button>
                            </div>
                            {/* Botón Aceptar para la segunda variante */}
                            {!showVariant2[index] && (
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const currentVariant = (form.values[name] as Variante[])[index];
                                            if (currentVariant.color && currentVariant.image && currentVariant.descripcion) {
                                                const newShowVariant2 = [...showVariant2];
                                                newShowVariant2[index] = true;
                                                setShowVariant2(newShowVariant2);
                                                form.setFieldValue(`${name}[${index}].variants2`, [{ talle: "", stock: "" }]); 
                                            } else {
                                                alert("Completa el color, imagen y descripción de la variante para habilitar los talles y stock.");
                                            }
                                        }}
                                        className="bg-[#4e4090] text-white px-4 py-2 rounded hover:bg-[#3d3370]"
                                    >
                                        Aceptar Variantes
                                    </button>
                                </div>
                            )}

                            {/* Sección de la segunda variante (stock y talles), solo si ha sido aceptada */}
                            {showVariant2[index] && (
                                <FieldArray name={`${name}[${index}].variants2`}>
                                    {({ push: push2, remove: remove2, form: form2 }) => (
                                        <div className="border border-gray-200 p-4 rounded-lg mt-4 bg-gray-50">
                                            <h4 className="text-lg font-bold text-[#4e4090] mb-3">Talles y Stock</h4>
                                            {(form2.values[name][index].variants2 as { talle: string; stock: number | string }[]).map((_, subIndex: number) => (
                                                <div key={subIndex} className="border border-[#ccc] p-3 rounded-lg mb-2 bg-white flex flex-col gap-2">
                                                    <VariantProduct2 name={`${name}[${index}].variants2`} index={subIndex} />
                                                    <div className="flex justify-end mt-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => remove2(subIndex)}
                                                            className="text-red-600 hover:underline text-sm"
                                                        >
                                                            Eliminar Talle/Stock
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => push2({ talle: "", stock: "" })}
                                                className="bg-[#4e4090] text-white px-3 py-1 rounded mt-2 hover:bg-[#3d3370] text-sm"
                                            >
                                                Agregar Talle/Stock
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => {
                            push({ color: "", image: "", descripcion: "", variants2: [] });
                            setShowVariant2([...showVariant2, false]); 
                        }}
                        className="bg-[#4e4090] text-white px-4 py-2 rounded mt-2 hover:bg-[#3d3370]"
                    >
                        Agregar variante
                    </button>
                </div>
            )}
        </FieldArray>
    );
};

export default VariantProduct;
