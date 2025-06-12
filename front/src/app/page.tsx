import React from "react";
import LoginForm from "../components/Forms/LoginFormUI";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;


// creacion de formularios de login, register y creacion
// context que lo voy a pasar a zustand
// server components para httpOnly-cookies
