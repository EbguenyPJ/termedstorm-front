"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputFormik from "../UI/Inputs/InputFormik";
// import { useRouter } from "next/router";

interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
});

const LoginForm: React.FC = () => {
  // const router = useRouter();

  //   await axios.post("/api/auth/login", values);
  //   router.push("/dashboard");

  const handleSubmit = (values: LoginValues) => {
    console.log("Login data", values);
    // llamada a backend con axios
    // (pasar a server component para que se pueda utilizar cookies)
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputFormik name="email" label="Correo" type="email" />

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
              className="w-full bg-[#4e4090] text-white py-2 mt-4 rounded hover:bg-[#3b3272]"
            >
              Iniciar sesión
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
