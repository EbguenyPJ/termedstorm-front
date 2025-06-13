"use client";

import { useAuthStore } from "../../app/stores/authStore";
import { ILogin } from "@/interfaces";
import { Formik, Form, FormikHelpers } from "formik";
import InputFormik from "../ui/Inputs/InputFormik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { routes } from "@/app/routes";
import GoogleLoginButton from "../ui/Buttons/GoogleButton";
import { ButtonSecondary } from "../../components/ui/Buttons/Buttons";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

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
      await login(values);
      toast.success("Te has registrado exitosamente");
      router.push(routes.profile);
    } catch (error: any) {
      const message = error.message || "Error desconocido";
      setErrors({ password: message });
      toast.error(message.error ?? "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      <GoogleLoginButton />
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

            <div className="flex items-center justify-end mt-4">
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
