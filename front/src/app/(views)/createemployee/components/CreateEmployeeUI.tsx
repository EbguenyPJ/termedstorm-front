"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/app/routes";
import { IRegisterEmployee } from "@/interfaces";
import { registerApi } from "@/lib/authBase";
import { Formik, Form } from "formik";
import * as yup from "yup";
import InputFormik from "@/components/UI/Inputs/InputFormik";
import { ButtonSecondary } from "../../../../components/UI/Buttons/Buttons";
import toast from "react-hot-toast";

export const CreateEmployeeUI = () => {
  const router = useRouter();

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
  });

  const handleSubmit = async (values: IRegisterEmployee) => {
    try {
      await registerApi(values);
      toast.success("El usuario se ha creado exitosamente");
      router.push(routes.login);
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
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
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
