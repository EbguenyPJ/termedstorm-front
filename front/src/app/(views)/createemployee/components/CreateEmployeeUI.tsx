"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/app/routes";
import { IRegister } from "@/interfaces";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { registerAction } from "@/actions/authAction";
import InputFormik from "@/components/ui/Inputs/InputFormik";
import { ButtonSecondary } from "../../../../components/ui/Buttons/Buttons";
import toast from "react-hot-toast";

export const CreateEmployeeUI = () => {
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

  const handleSubmit = async (values: IRegister) => {
    try {
      await registerAction(values);
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
          {/* TIPO DE EMPLEADO */}
          <InputFormik
            name="role"
            label="Tipo de empleado"
            type="select"
            options={[
              { label: "Ventas", value: "ventas" },
              { label: "Contabilidad", value: "contabilidad" },
              { label: "Producción", value: "produccion" },
              { label: "Otro", value: "otro" },
            ]}
          />

          {/* EMAIL */}
          <InputFormik name="email" label="Correo" type="email" placeholder="correo@correo.com"/>

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
