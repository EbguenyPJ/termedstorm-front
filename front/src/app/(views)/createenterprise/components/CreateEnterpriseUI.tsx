"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/app/routes";
import { IRegister } from "@/interfaces";
import { Formik, Form } from "formik";
import * as yup from "yup";
import InputFormik from "@/components/UI/Inputs/InputFormik";
import { ButtonSecondary } from "../../../../components/UI/Buttons/Buttons";
import toast from "react-hot-toast";
import {registerApi} from "@/lib/authBase";

export const CreateEnterpriseUI = () => {
  const router = useRouter();

  const validationSchema = yup.object({
    name: yup
      .string()
      .max(40, "Debe tener 40 caracteres o menos")
      .required("Campo requerido"),
    email: yup
      .string()
      .email("Correo electrónico no válido")
      .required("Campo requerido"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .min(10, "Debe tener al menos 10 dígitos")
      .required("Campo requerido"),
    
    password: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[a-zA-Z]/, "La contraseña debe contener al menos una letra")
      .matches(
        /[^a-zA-Z0-9]/,
        "La contraseña debe contener al menos un carácter especial"
      ),
  });

  const handleSubmit = async (values: IRegister) => {
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
        name: "",
        email: "",
        phone: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* EMAIL */}
          <InputFormik
            name="email"
            label="Correo"
            type="email"
            placeholder="correo@correo.com"
          />

          {/* NOMBRE */}
          <InputFormik
            name="name"
            label="Nombre y Apellido"
            type="text"
            placeholder="Tu nombre"
          />

          {/* PHONE */}
          <InputFormik
            name="phone"
            label="Número de celular"
            type="tel"
            placeholder="(011) 1111-1111"
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
              textContent="Nuevo Cliente"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
