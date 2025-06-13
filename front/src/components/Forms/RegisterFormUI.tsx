"use client";

import { registerAction } from "../../actions/authAction";
import { IRegister } from "@/interfaces";
import { Formik, Form, FormikHelpers } from "formik";
import InputFormik from "@/components/ui/Inputs/InputFormik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { routes } from "@/app/routes";
import toast from "react-hot-toast";

export const RegisterForm = () => {
  const router = useRouter();

  const validationSchema = yup.object({
    name: yup
      .string()
      .max(20, "Debe tener 20 caracteres o menos")
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
      .min(5, "Debe tener al menos 5 caracteres")
      .required("Campo requerido"),
  });

  const handleSubmit = async (
    values: IRegister,
    { setSubmitting, setErrors }: FormikHelpers<IRegister>
  ) => {
    try {
      const res = await registerAction(values);

      if (!res.success) {
        throw new Error(res.error || "Error desconocido");
      }

      toast.success("¡Registro exitoso!");
      router.push(routes.login);
    } catch (error: any) {
      const message = error.message || "Error desconocido";
      setErrors({ password: message }); // opcional, depende del mensaje
      toast.error(message);
    } finally {
      setSubmitting(false);
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
          <InputFormik name="email" label="Correo" type="email" />

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
            placeholder="+54 (011) 1111-1111"
          />

          {/* PASSWORD */}
          <InputFormik
            name="password"
            label="Contraseña"
            type="password"
            placeholder="contraseña"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-8 font-medium text-white bg-black rounded-lg border-black inline-flex space-x-2 items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Crear cliente</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};
