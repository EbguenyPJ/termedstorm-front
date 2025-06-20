"use client";
import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "../../../../components/UI/Buttons/Buttons";
import toast from "react-hot-toast";
import InputFormik from "@/components/UI/Inputs/InputFormik";
import VariantProduct from "./VariantProduct";
import { baseAxios } from "@/lib/authBase";

const productoSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .trim("No se permiten espacios en blanco")
    .min(1, "El nombre no puede estar vacío"),

  descripcion: yup
    .string()
    .trim("No se permiten espacios en blanco")
    .max(300, "Máx. 300 caracteres"),

  precioCompra: yup
    .number()
    .typeError("Debe ser un número")
    .required("El precio de compra es obligatorio")
    .moreThan(0, "El precio debe ser mayor a 0"),

  precioVenta: yup
    .number()
    .typeError("Debe ser un número")
    .required("El precio de venta es obligatorio")
    .moreThan(0, "El precio debe ser mayor a 0"),

  claveProducto: yup
    .string()
    .required("La clave del producto es obligatoria")
    .trim("No se permiten espacios en blanco")
    .min(1, "La clave no puede estar vacía"),

  categoria: yup
    .string()
    .required("Selecciona una categoría")
    .trim("No se permiten espacios en blanco")
    .min(1, "La categoría no puede estar vacía"),

  subcategoria: yup
    .string()
    .required("Selecciona una Sub-Categoría")
    .trim("No se permiten espacios en blanco")
    .min(1, "La Sub-Categoría no puede estar vacía"),

  marca: yup
    .string()
    .required("Selecciona una marca")
    .trim("No se permiten espacios en blanco")
    .min(1, "La marca no puede estar vacía"),
});

const RegisterProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productoAceptado, setProductoAceptado] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [catRes, subRes, marcasRes] = await Promise.all([
          baseAxios.get("/categories"),
          baseAxios.get("/sub-categories"),
          baseAxios.get("/brands"),
        ]);

        setCategorias(catRes.data);
        setSubcategorias(subRes.data);
        setMarcas(marcasRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("Error al cargar categorías o marcas");
      }
    };

    fetchDatos();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-xl p-8 min-w-[90vw] max-w-[1100px] min-h-[80vh] max-h-[800px] overflow-auto">
      <h2 className="text-2xl font-bold text-[#4e4090]">
        Registrar nuevo Producto
      </h2>
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          precioCompra: "",
          categoria: "",
          precioVenta: "",
          claveProducto: "",
          subcategoria: "",
          marca: "",
          variantes: [],
        }}
        validationSchema={productoSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const productToSend = {
              name: values.nombre,
              description: values.descripcion,
              code: values.claveProducto,
              purchase_price: parseFloat(values.precioCompra),
              sale_price: parseFloat(values.precioVenta),
              category_id: values.categoria,
              sub_category_id: values.subcategoria,
              brand_id: values.marca,
              employee_id: "b1d2f3e4-5678-4abc-9def-1234567890ab", // momentaneo, consultar
              variants: values.variantes.map((v: any) => ({
                description: v.descripcion,
                color: v.color,
                image: v.image, 
                variant_attributes: v.variants2.map((v2: any) => ({
                  stock: parseInt(v2.stock),
                  size_id: v2.talle,
                })),
              })),
            };

            const response = await baseAxios.post("/products", productToSend);

            if (response.status === 201 || response.status === 200) {
              toast.success("Producto registrado correctamente");
              resetForm();
              setProductoAceptado(false);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            } else {
              toast.error("Error al registrar el producto");
            }
          } catch (error) {
            console.error("Error al registrar producto:", error);
            toast.error("Error al registrar el producto");
          }
        }}

      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-10">
              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <InputFormik
                  name="nombre"
                  label="Nombre del Producto:"
                  type="text"
                  placeholder="Nombre del Producto"
                />

                <InputFormik
                  name="claveProducto"
                  label="Clave del Producto:"
                  type="text"
                  placeholder="Ej: SKU123"
                />

                <InputFormik
                  name="descripcion"
                  label="Descripción:"
                  type="text"
                  placeholder="Descripción del producto"
                />

                <InputFormik
                  name="precioCompra"
                  label="Precio de Compra:"
                  type="text"
                  placeholder="Ingrese precio"
                />

                <InputFormik
                  name="precioVenta"
                  label="Precio de Venta:"
                  type="text"
                  placeholder="Ingrese precio de venta"
                />
              </div>

              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <label className="block text-md font-semibold text-[#4e4090]">
                  Categoría
                </label>
                <Field
                  as="select"
                  name="categoria"
                  className="w-full border border-gray-300 rounded p-2 text-black bg-white"
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="categoria"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">
                  Sub-Categoría
                </label>
                <Field
                  as="select"
                  name="subcategoria"
                  className="w-full border border-gray-300 rounded p-2 text-black"
                >
                  <option value="">Seleccionar Sub-Categoría</option>
                  {subcategorias.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="subcategoria"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">
                  Marca
                </label>
                <Field
                  as="select"
                  name="marca"
                  className="w-full border border-gray-300 rounded p-2  text-black"
                >
                  <option value="">Seleccionar marca</option>
                  {marcas.map((marca: any) => (
                    <option key={marca.id} value={marca.id}>
                      {marca.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="marca"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />
              </div>
            </div>
            {/* Botón aceptar, que habilita las variantes */}
            {!productoAceptado && (
              <div className="flex justify-end mt-6 mr-10">
                <button
                  type="button"
                  onClick={() => {
                    productoSchema.validate(values, { abortEarly: false })
                      .then(() => {
                        setProductoAceptado(true);
                        toast.success("Producto aceptado. Ahora agregá las variantes");
                      })
                      .catch((errors) => {
                        errors.inner.forEach((error: any) => {
                          toast.error(error.message);
                        });
                        console.log("Errores de validación:", errors.inner);
                      });
                  }}
                  className="bg-[#4e4090] text-white px-6 py-2 rounded hover:bg-[#3d3370]"
                >
                  ACEPTAR
                </button>
              </div>
            )}

            {/*Sección de variantes, solo si ya fue aceptado */}
            {productoAceptado && <VariantProduct name="variantes" />}

            {productoAceptado && (
              <div className="flex justify-end mt-6 mr-10">
                <ButtonAccent type="submit" textContent="GUARDAR" />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterProduct;
