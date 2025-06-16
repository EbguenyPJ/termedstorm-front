"use client";

import { ILogin } from "@/interfaces";
import { Formik, Form, FormikHelpers } from "formik";

import InputFormik from "../../UI/Inputs/InputFormik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { routes } from "@/app/routes";
import GoogleLoginButton from "../../UI/Buttons/GoogleButton";
import { ButtonSecondary } from "../../UI/Buttons/Buttons";
import toast from "react-hot-toast";
import { loginApi } from "@/lib/authBase";

const LoginForm = () => {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
  });

  const handleSubmit = async (
    values: ILogin,
    { setSubmitting, setErrors }: FormikHelpers<ILogin>
  ) => {
    try {
      await loginApi(values);
      toast.success("Te has registrado exitosamente");
      router.push(routes.categories);
    } catch (error: any) {
      const message = error.response?.data?.message || "Error desconocido";
      setErrors({ password: message });
      toast.error(message.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      <GoogleLoginButton
        role="employee"
        label="Iniciar sesión como empleado con Google"
      />
      <div className="my-4 text-center text-sm text-gray-500">
        o ingresa con tu correo
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Email */}
            <InputFormik name="email" label="Correo" type="email" />

            {/* PASSWORD */}
            <InputFormik
              name="password"
              label="Contraseña"
              type="password"
              placeholder="contraseña"
            />

            <div className="flex items-center justify-center mt-4">
              <ButtonSecondary
                textContent="Iniciar Sesión"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
