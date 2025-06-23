"use client";

import { IRegister } from "@/interfaces";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import InputFormik from "@/components/UI/Inputs/InputFormik";
import { ButtonSecondary } from "@/components/UI/Buttons/Buttons";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
// import dynamic from "next/dynamic";
// import React, { useState, useEffect } from "react";
// import { getRolesApi } from "@/lib/authBase";

// const Select = dynamic(() => import("react-select"), { ssr: false });

// type OptionType = {
//   value: string;
//   label: string;
// };

export const CreateEmployeeUI = () => {
  // const [roleOptions, setRoleOptions] = useState<OptionType[]>([]);
  // const [selectedRole, setSelectedRole] = useState<OptionType[]>([]);
  const { registerEmployee } = useAuthStore();

  const validationSchema = yup.object({
    first_name: yup
      .string()
      .max(50, "El nombre debe tener 50 caracteres o menos")
      .required("El nombre es requerido"),
    last_name: yup
      .string()
      .max(50, "El apellido debe tener 50 caracteres o menos")
      .required("El apellido es requerido"),
    email: yup
      .string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es requerido"),
    password: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[a-zA-Z]/, "La contraseña debe contener al menos una letra")
      .matches(
        /[^a-zA-Z0-9]/,
        "La contraseña debe contener al menos un carácter especial"
      )
      .required("La contraseña es requerida"),
    role: yup
      .array()
      .min(1, "Selecciona al menos una Sub-Categoría")
      .of(yup.string().required()),
  });

  const handleSubmit = async (values: IRegister) => {
    try {
      await registerEmployee(values);
      toast.success("El usuario se ha creado exitosamente");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Error al crear el usuario";
      toast.error(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: [],
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => ( //setFieldValue,
        <Form>
          <div className="mb-4">
            <label className="block text-md font-semibold text-[#4e4090]">
              Rol
              {/* <Select
                isMulti
                name="role"
                options={roleOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={selectedRole}
                onChange={(newValue: any) => {
                  setSelectedRole(newValue);
                  const values = newValue
                    ? newValue.map((option: OptionType) => option.value)
                    : [];
                  setFieldValue("role", values);
                }}
              /> */}
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </label>
          </div>

          {/* FIRST NAME */}
          <InputFormik
            name="first_name"
            label="Nombre"
            type="text"
            placeholder="nombre"
          />

          {/* LAST NAME */}
          <InputFormik
            name="last_name"
            label="Apellido"
            type="text"
            placeholder="apellido"
          />

          {/* EMAIL */}
          <InputFormik
            name="email"
            label="Correo"
            type="email"
            placeholder="correo@correo.com"
          />

          {/* PASSWORD */}
          <InputFormik
            name="password"
            label="Contraseña"
            type="password"
            placeholder="contraseña"
          />

          <div className="flex items-center justify-end mt-4">
            <ButtonSecondary
              textContent="Nuevo Empleado"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
