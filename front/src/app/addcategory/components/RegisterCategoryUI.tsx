"use client"
import React from "react";
import { useState } from "react";
import Input from "../../../components/UI/Inputs/Input";
import { ButtonAccent } from "../../../components/UI/Buttons/Buttons";

const RegisterCategory = () => {
    // Estado para almacenar los datos del producto
    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        precioCompra: "",
        categoria: "",
        stock: "",
        subcategoria: "",
        marca: "",
        unidaddemedida: ""
    });

    //Función para manejar cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProducto(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //Función para enviar el formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Producto a registrar:", producto);
        //Aquí iría la lógica para enviar los datos al backend
    };

    return (
        <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
            <h2 className="text-2xl font-bold mb-10 pl-10 text-[#4e4090]">
                Registrar nueva Categoria
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-10">
                    {/* Primer bloque de inputs */}
                    <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                        <Input
                            label="Nombre del Producto:"
                            name="nombre"
                            type="text"
                            placeholder="Nombre del Producto"
                            value={producto.nombre}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Descripción:"
                            name="descripcion"
                            type="text"
                            placeholder="Descripción del Producto"
                            value={producto.descripcion}
                            onChange={handleChange}
                        />
                        <Input
                            label="Precio de Compra:"
                            name="precioCompra"
                            type="number"
                            placeholder="Precio de Compra"
                            value={producto.precioCompra}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Stock Inicial:"
                            name="stock"
                            type="number"
                            value={producto.stock}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Imagen del Producto"
                            name="image"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    console.log(file);
                                }
                            }}
                        />
                    </div>

                    {/* Segundo bloque de inputs */}
                    <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                        <Input
                            label="Categoría"
                            name="categoria"
                            type="text"
                            value={producto.categoria}
                            onChange={handleChange}
                        />
                        <Input
                            label="Sub-Categoría"
                            name="subcategoria"
                            type="text"
                            value={producto.subcategoria || ""}
                            onChange={handleChange}
                        />
                        <Input
                            label="Marca"
                            name="marca"
                            type="text"
                            value={producto.marca || ""}
                            onChange={handleChange}
                        />
                        <Input
                            label="Unidad de Medida"
                            name="unidaddemedida"
                            type="text"
                            value={producto.unidaddemedida || ""}
                            onChange={handleChange}
                        />

                    </div>
                </div>
            </form>
            <div className="flex justify-end mt-6 mr-10">
                <ButtonAccent textContent="GUARDAR" />
            </div>
        </section>
    );
};

export default RegisterCategory;