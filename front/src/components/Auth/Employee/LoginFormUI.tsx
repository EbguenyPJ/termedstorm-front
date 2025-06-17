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
import { useAuthStore } from "../../../app/stores/authStore";

const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Requerido"),
    password: Yup.string().required("Requerido"),
  });

  const handleSubmit = async (
    values: ILogin,
    { setSubmitting, setErrors }: FormikHelpers<ILogin>
  ) => {
    try {
<<<<<<< HEAD
      await login("employee", values);
      toast.success("Has ingresado exitosamente");
=======
      await loginApi(values);
      toast.success("Has iniciado sesión exitosamente");
>>>>>>> 14434e0f21c2d3d4e0bc50eb52c9618e04bc69f0
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
      <GoogleLoginButton role="employee" label="Continuar con Google" />
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
            <InputFormik name="email" label="Correo" type="email" placeholder="correo@correo.com"/>

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
